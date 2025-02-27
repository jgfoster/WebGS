import 'dart:async';
import 'dart:convert';

import 'package:web_socket_channel/web_socket_channel.dart';

class GciError extends StateError {
  GciError(Map<String, dynamic> gciError)
      : error = gciError,
        super(gciError['message']);
  late final Map<String, dynamic> error;
}

class JadeServer {
  JadeServer([var address = 'localhost:50378']) {
    final uriString = 'ws://$address/webSocket.gs';
    final uri = Uri.parse(uriString);
    _channel = WebSocketChannel.connect(uri);
    _channel.stream.listen(
      _onData,
      onDone: _onDone,
      onError: _onError,
    );
  }
  final _buffer = <Map<String, dynamic>>[];
  late final WebSocketChannel _channel;
  String? _error;

  Future<void> _onData(dynamic data) async {
    final x = jsonDecode(data);
    _buffer.add(x);
  }

  Future<void> _onDone() async {
    _error = 'Connection to server is closed!';
    await _channel.sink.close();
  }

  Future<void> _onError(var error) async {
    _error = error.toString();
    await _channel.sink.close();
  }

  Future<Map<String, dynamic>> _read() async {
    while (_buffer.isEmpty) {
      if (_error != null) {
        throw GciError({'message': _error});
      }
      await Future.delayed(const Duration(milliseconds: 10));
    }
    final result = _buffer.removeAt(0);
    if (result['type'] == 'error') {
      throw GciError(result);
    }
    return result;
  }

  Future<void> _write(var map) async {
    _channel.sink.add(jsonEncode(map));
  }

  // @override
  void close() {
    unawaited(_channel.sink.close());
  }

// Public API

  // @override
  Future<bool> abort(String session) async {
    await _write({'request': 'abort', 'session': session});
    final data = await _read();
    return data['result'];
  }

  // @override
  Future<bool> begin(String session) async {
    await _write({'request': 'begin', 'session': session});
    final data = await _read();
    return data['result'];
  }

  // @override
  Future<bool> doBreak(String session, bool isHard) async {
    await _write({'request': 'break', 'session': session, 'isHard': isHard});
    final data = await _read();
    return data['result'];
  }

  // @override
  Future<String> charToOop(int anOop) async {
    await _write({'request': 'charToOop', 'char': anOop});
    return (await _read())['oop'];
  }

  // @override
  Future<bool> commit(String session) async {
    await _write({'request': 'commit', 'session': session});
    final data = await _read();
    return data['result'];
  }

  // @override
  Future<String> doubleToOop(String session, double value) async {
    await _write(
      {'request': 'doubleToOop', 'session': session, 'double': value},
    );
    return (await _read())['oop'];
  }

  // @override
  Future<String> doubleToSmallDouble(double value) async {
    await _write({'request': 'doubleToSmallDouble', 'double': value});
    return (await _read())['oop'];
  }

  // @override
  Future<String> encrypt(String password) async {
    await _write({'request': 'encrypt', 'password': password});
    return (await _read())['result'];
  }

  // @override
  Future<bool> execute(String session, String code) async {
    await _write({'request': 'execute', 'session': session, 'string': code});
    return (await _read())['result'];
  }

  // @override
  Future<String> fetchSpecialClass(String anOop) async {
    await _write({'request': 'fetchSpecialClass', 'oop': anOop});
    return (await _read())['oop'];
  }

  // @override
  Future<String> fetchUnicode(String session, String anOop) async {
    await _write({'request': 'fetchUnicode', 'session': session, 'oop': anOop});
    return (await _read())['result'];
  }

  // @override
  Future<List<String>> getFreeOops(String session, int count) async {
    await _write(
      {'request': 'getFreeOops', 'session': session, 'count': count},
    );
    final result = <String>[];
    (await _read())['result'].forEach((each) {
      result.add(each as String);
    });
    return result;
  }

  // @override
  Future<String> getGciVersion() async {
    await _write({'request': 'getGciVersion'});
    final data = await _read();
    return data['version'];
  }

  // @override
  Future<String> i32ToOop(int value) async {
    await _write({'request': 'i32ToOop', 'int': value});
    return (await _read())['oop'];
  }

  // @override
  Future<String> i64ToOop(String session, BigInt value) async {
    await _write({
      'request': 'i64ToOop',
      'i64': value.toRadixString(16),
      'session': session,
    });
    final x = await _read();
    return x['oop'];
  }

  // @override
  Future<String> login(String username, String password) async {
    await _write({
      'request': 'login',
      'username': username,
      'password': password,
    });
    return (await _read())['result'];
  }

  // @override
  Future<bool> logout(String session) async {
    await _write({'request': 'logout', 'session': session});
    final data = await _read();
    return data['result'] ?? false;
  }

  // @override
  Future<Map<String, dynamic>> nbResult(
    String session, [
    int timeoutMs = -1,
  ]) async {
    await _write({
      'request': 'nbResult',
      'session': session,
      'timeout': timeoutMs,
    });
    return _read();
  }

  // @override
  Future<String> newByteArray(String session, List<int> bytes) async {
    await _write({
      'request': 'newByteArray',
      'bytes': base64Encode(bytes),
      'session': session,
    });
    return (await _read())['oop'];
  }

  // @override
  Future<String> newObj(String session, String classOop) async {
    await _write({'request': 'newObj', 'session': session, 'class': classOop});
    return (await _read())['oop'];
  }

  // @override
  Future<String> newString(String session, String string) async {
    await _write(
      {'request': 'newString', 'session': session, 'string': string},
    );
    return (await _read())['oop'];
  }

  // @override
  Future<String> newSymbol(String session, String string) async {
    await _write(
      {'request': 'newSymbol', 'session': session, 'string': string},
    );
    return (await _read())['oop'];
  }

  // @override
  Future<String> newUnicodeString(String session, List<int> bytes) async {
    // GciTs returns UTF-16 but Dart only supports UTF-8
    // so we just give back the base64 encoded sequence
    await _write({
      'request': 'newUnicodeString',
      'bytes': base64Encode(bytes),
      'session': session,
    });
    return (await _read())['oop'];
  }

  // @override
  Future<String> newUtf8String(String session, List<int> bytes) async {
    await _write({
      'request': 'newUtf8String',
      'bytes': base64.encode(bytes),
      'session': session,
    });
    return (await _read())['oop'];
  }

  // @override
  Future<bool> oopIsSpecial(String anOop) async {
    await _write({'request': 'oopIsSpecial', 'oop': anOop});
    return (await _read())['result'];
  }

  // @override
  Future<int> oopToChar(String anOop) async {
    await _write({'request': 'oopToChar', 'oop': anOop});
    return (await _read())['result'];
  }

  // @override
  Future<num> oopToDouble(String session, String anOop) async {
    await _write({'request': 'oopToDouble', 'session': session, 'oop': anOop});
    return (await _read())['result'];
  }

  // @override
  Future<BigInt> oopToI64(
    String session,
    String anOop, [
    String symbolList = '14',
  ]) async {
    await _write({'request': 'oopToI64', 'session': session, 'oop': anOop});
    final data = await _read();
    return BigInt.parse(data['result']);
  }

  // @override
  Future<String> resolveSymbol(
    String session,
    String symbol, [
    String symbolList = '14',
  ]) async {
    await _write({
      'request': 'resolveSymbol',
      'symbol': symbol,
      'symbolList': symbolList,
      'session': session,
    });
    return (await _read())['oop'];
  }

  // @override
  Future<String> resolveSymbolObj(
    String session,
    String anOop, [
    String symbolList = '14',
  ]) async {
    await _write({
      'request': 'resolveSymbolObj',
      'oop': anOop,
      'symbolList': symbolList,
      'session': session,
    });
    return (await _read())['oop'];
  }

  // @override
  Future<bool> sessionIsRemote(String session) async {
    await _write({'request': 'sessionIsRemote', 'session': session});
    final data = await _read();
    return data['result'];
  }
}
