#! /usr/bin/env dart

import 'package:test/test.dart';
import 'dart:convert';

import 'jade_server.dart';

/*
Log instance logTypes: #(#'startup' #'debug' #'request' #'warning' #'error').
Log instance haltOnError: true.
GciLibraryApp run.
*/

void main() {
  final server = JadeServer('localhost:50378');
  var session1 = '0';
  var session2 = '0';

// pre-login
  test('getGciVersion', () async {
    var version = await server.getGciVersion();
    expect(version, startsWith('3.6.'));
  });

  test('encrypt', () async {
    var encrypted = await server.encrypt('swordfish');
    expect(encrypted, equals('GT543NBVJJUQK7ICC7CZTWAHPE'));
  });

  test('oopIsSpecial', () async {
    expect(await server.oopIsSpecial('0000000000000014'), true); // nil
    expect(await server.oopIsSpecial('000000000000010C'), true); // true
    expect(await server.oopIsSpecial('0000000000000002'), true); // 0
    expect(await server.oopIsSpecial('000000000000611C'), true); // $a
    expect(await server.oopIsSpecial('7F40000000000006'), true); // 1.25
    expect(await server.oopIsSpecial('000000080000022C'), true); // 1/2
    expect(await server.oopIsSpecial('0000000002AFB901'), false); // Object new
  });

  test('fetchSpecialClass', () async {
    expect(await server.fetchSpecialClass('0000000000000014'), '12A01'); // nil
    expect(await server.fetchSpecialClass('000000000000010C'), '10A01'); // true
    expect(await server.fetchSpecialClass('0000000000000002'), '12201'); // 0
    expect(await server.fetchSpecialClass('000000000000611C'), '10B01'); // $a
    expect(await server.fetchSpecialClass('7F40000000000006'), '1DA01'); // 1.25
    expect(await server.fetchSpecialClass('000000080000022C'), '26201'); // 1/2
  });

  test('oopToChar', () async {
    expect(await server.oopToChar('0014'), -0x1); // nil
    expect(await server.oopToChar('411C'), 0x41); // $A
    expect(await server.oopToChar('7A1C'), 0x7A); // $z
  });

  test('charToOop', () async {
    expect(await server.charToOop(0x41), '411C'); // $A
    expect(await server.charToOop(0x7A), '7A1C'); // $z
  });

  test('doubleToSmallDouble', () async {
    expect(await server.doubleToSmallDouble(1.25), '7F40000000000006');
    expect(await server.doubleToSmallDouble(0.00), '6');
    expect(await server.doubleToSmallDouble(-3.5), '80C000000000000E');
  });

  test('i32ToOop', () async {
    expect(await server.i32ToOop(0x7FFFFFFF), '3FFFFFFFA');
    expect(await server.i32ToOop(0), '2');
    expect(await server.i32ToOop(-0x80000000), 'FFFFFFFC00000002');
  });

// login
  test('login with invalid password', () async {
    var flag = false;
    try {
      session1 = await server.login('DataCurator', 'spearfish');
      // print(session1);
    } on GciError catch (ex) {
      expect(ex.error['type'], equals('error'));
      expect(ex.error['error'], equals(4051));
      expect(ex.error['message'], startsWith('Login failed'));
      flag = true;
    }
    expect(flag, isTrue);
  });

  test('login with valid password', () async {
    session1 = await server.login('DataCurator', 'swordfish');
    expect(session1, isA<String>());
  });

  test('second login should succeed', () async {
    session2 = await server.login('DataCurator', 'swordfish');
    expect(session2, isA<String>());
    expect(session1, isNot(session2));
  });

///////////////////////
// while logged in
  test('hardBreak', () async {
    expect(await server.doBreak(session1, true), isTrue);
  });

  test('softBreak', () async {
    expect(await server.doBreak(session1, false), isTrue);
  });

  test('abort', () async {
    expect(await server.abort(session1), isTrue);
  });

  test('begin', () async {
    expect(await server.begin(session1), isTrue);
  });

  test('commit', () async {
    expect(await server.commit(session1), isTrue);
  });

  test('sessionIsRemote', () async {
    expect(await server.sessionIsRemote(session1), isTrue);
  });

  test('doubleToOop', () async {
    var x = await server.doubleToOop(session1, 1.25);
    expect(x, equals('7F40000000000006'));
    x = await server.doubleToOop(session1, 0.00);
    expect(x, equals('6'));
    x = await server.doubleToOop(session1, -3.5);
    expect(x, equals('80C000000000000E'));
  });

  test('oopToDouble', () async {
    var x = await server.oopToDouble(session1, '7F40000000000006');
    expect(x, equals(1.25));
    x = await server.oopToDouble(session1, '6');
    expect(x, equals(0.00));
    x = await server.oopToDouble(session1, '80C000000000000E');
    expect(x, equals(-3.5));
  });

  test('i64ToOop', () async {
    var x = await server.i64ToOop(session1, BigInt.from(0x0FFFFFFFFFFFFFFF));
    expect(x, '7FFFFFFFFFFFFFFA');
    x = await server.i64ToOop(session1, BigInt.from(0x1000000000000000));
    expect(x, isA<String>()); // LargeInteger, so generic OOP
  });

  test('oopToI64', () async {
    BigInt x;
    x = await server.oopToI64(session1, '2A');
    expect(x, equals(BigInt.from(5)));
    x = await server.oopToI64(session1, '07FFFFFFFFFFFFFA');
    expect(x, equals(BigInt.from(0x0FFFFFFFFFFFFFF)));
    x = await server.oopToI64(session1, '7FFFFFFFFFFFFFFA');
    expect(x, equals(BigInt.from(0xFFFFFFFFFFFFFFF)));
  });

  test('resolveSymbol', () async {
    String x;
    x = await server.resolveSymbol(session1, 'Array');
    expect(x, '10501');
    x = await server.resolveSymbol(session1, 'size');
    expect(x, '1');
  });

  test('resolveSymbolObj', () async {
    String x;
    // look for #'Array' in current SymbolList
    x = await server.resolveSymbolObj(session1, '1C6401');
    expect(x, '10501');
    // look for #'Array' in DataCurator's SymbolList
    // (AllUsers userWithId: 'DataCurator' ifAbsent: [nil])
    //     symbolList asOop printStringRadix: 16.
    x = await server.resolveSymbolObj(session1, '1C6401', '288B01');
    expect(x, '10501');
    x = await server.resolveSymbolObj(session1, '2A9701'); // #'size'
    expect(x, '1');
  });

  test('nbResult with nothing', () async {
    var x = await server.nbResult(session1, 0);
    expect(x['type'], equals('timeout after 0ms'));
  });

  test('getFreeOops', () async {
    var x = await server.getFreeOops(session1, 2);
    expect(x.length, equals(2));
  });

  test('newObj', () async {
    var x = await server.newObj(session1, '10501');
    expect(x, isA<String>());
  });

  test('newByteArray', () async {
    var x = await server.newByteArray(
      session1,
      [0, 1, 2, 3, 243, 244, 245],
    );
    expect(x, isA<String>());
  });

  test('newString', () async {
    var x = await server.newString(session1, 'abc');
    expect(x, isA<String>());
  });

  test('newSymbol', () async {
    var x = await server.newString(session1, 'foo');
    expect(x, isA<String>());
  });

  test('newUnicodeString', () async {
    var x = await server.newUnicodeString(session1, utf8.encode('foo'));
    expect(x, isA<String>());
  });

  test('newUtf8String', () async {
    var x = await server.newUtf8String(session1, utf8.encode('foo'));
    expect(x, isA<String>());
  });

  test('fetchUnicode', () async {
    // Since Dart doesn't support UTF-16, we just get a
    // base64 encoded string of the bytes
    var dbfHistory = await server.resolveSymbol(session1, 'DbfHistory');
    var x = await server.fetchUnicode(session1, dbfHistory);
    expect(x, isA<String>());
  });

  test('executeString returning nil', () async {
    var flag = await server.execute(session1, 'nil');
    expect(flag, isTrue);
    var result = await server.nbResult(session1, 200);
    expect(result['result'], isNull);
  });

  test('executeString returning Boolean', () async {
    var flag = await server.execute(session1, 'true');
    expect(flag, isTrue);
    var result = await server.nbResult(session1, 200);
    expect(result['result'], isTrue);
  });

  test('executeString returning Character', () async {
    var flag = await server.execute(session1, '\$a');
    expect(flag, isTrue);
    var result = await server.nbResult(session1, 200);
    expect(result['result'], equals('a'));
  });

  test('executeString returning SmallInteger', () async {
    var flag = await server.execute(session1, "'foo' size");
    expect(flag, isTrue);
    var result = await server.nbResult(session1, 200);
    expect(result['result'], equals(3));
  });

  test('executeString returning SmallDouble', () async {
    var flag = await server.execute(session1, '1.25');
    expect(flag, isTrue);
    var result = await server.nbResult(session1, 200);
    expect(result['result'], equals(1.25));
  });

  test('executeString returning String', () async {
    var flag = await server.execute(session1, '1.25 printString');
    expect(flag, isTrue);
    var result = await server.nbResult(session1, 200);
    expect(result['string'], equals('1.25'));
  });

  test('executeString returning ByteArray', () async {
    var flag = await server.execute(session1, '#[0 1 2 3]');
    expect(flag, isTrue);
    var result = await server.nbResult(session1, 200);
    expect(result['bytes'], equals('AAECAw=='));
  });

///////////////////////
// logout
  test('logout session 1', () async {
    expect(await server.logout(session1), isTrue);
  });

  test('logout session 2', () async {
    expect(await server.logout(session2), isTrue);
  });

// after logout
  test('logout second time should fail', () async {
    try {
      await server.logout(session2);
      expect(false, isTrue);
    } on GciError catch (ex) {
      expect(
        ex.error['message'],
        equals('argument is not a valid GciSession pointer'),
      );
    }
  });

  test('sessionIsRemote after logout', () async {
    expect(await server.sessionIsRemote(session1), isFalse);
  });
}
