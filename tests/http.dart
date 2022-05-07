#! /usr/bin/env dart

import 'dart:convert';
import 'dart:io';
import 'package:test/test.dart';
import 'package:http/http.dart' as http;
import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:web_socket_channel/status.dart' as status;

const String PROTOCOL = 'http';
const int LOAD = 10;

/*
Log instance logTypes: #(#'startup' #'debug' #'request' #'warning' #'error').
Log instance logTypes: #(#'startup' #'request' #'error').
Log instance haltOnError: true.
Sample runHttp.
Sample runHttps.
Sample runDistributedHttps.
*/

void main() {
  test('index', () async {
    var url = Uri.parse(PROTOCOL + '://localhost:8888');
    var response = await http.get(url);
    expect(response.statusCode, equals(200));
    expect(
      response.body.substring(0, 21),
      equals('<!DOCTYPE html PUBLIC'),
    );
  });

  test('get echo', () async {
    var url = Uri.parse(PROTOCOL + '://localhost:8888/echo.gs?foo=bar');
    var response = await http.get(url);
    expect(response.statusCode, equals(200));
    var obj = jsonDecode(response.body);
    expect(obj['foo'], equals('bar'));
  });

  test('post echo', () async {
    var url = Uri.parse(PROTOCOL + '://localhost:8888/echo.gs');
    var response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'a': '1', 'b': '2'}),
    );
    expect(response.statusCode, equals(200));
    var obj = jsonDecode(response.body);
    expect(obj['a'], equals('1'));
    expect(obj['b'], equals('2'));
  });

  test('get load', () async {
    var url = Uri.parse(PROTOCOL + '://localhost:8888/echo.gs?foo=bar');
    final timer = Stopwatch()..start();
    var sent = 0;
    var received = 0;
    for (var i = 0; i < LOAD; ++i) {
      ++sent;
      // ignore: unawaited_futures
      http.get(url).then((http.Response response) {
        ++received;
        expect(response.statusCode, equals(200));
      });
    }
    while (received < sent) {
      await Future.delayed(Duration(milliseconds: 5));
    }
    var ms = timer.elapsed.inMilliseconds / sent;
    expect(ms, lessThan(3.0));
  });

  test('readFile', () async {
    var url = Uri.parse(PROTOCOL + '://localhost:8888/tests/test.txt');
    var response = await http.get(url);
    expect(response.statusCode, equals(200));
    expect(response.body, equals('Hello, World!\n'));
  });

  test('writeFile', () async {
    var url = Uri.parse(PROTOCOL + '://localhost:8888/uploadFile.gs');
    var request = http.MultipartRequest('POST', url);
    request.files.add(http.MultipartFile(
      'file1',
      File('../Html4Element.gs').readAsBytes().asStream(),
      File('../Html4Element.gs').lengthSync(),
      filename: 'Html4Element.gs',
    ));
    request.files.add(http.MultipartFile(
      'file2',
      File('../HtmlElement.gs').readAsBytes().asStream(),
      File('../HtmlElement.gs').lengthSync(),
      filename: 'HtmlElement.gs',
    ));
    var response = await request.send();
    expect(response.statusCode, equals(200));
    var body = await response.stream.bytesToString();
    var data = jsonDecode(body);
    expect(data['HtmlElement.gs'], equals(5058));
    expect(data['Html4Element.gs'], equals(94714));
  });

  test('webSocket', () async {
    var url = Uri.parse('ws://localhost:8888/webSocket.gs');
    var channel = WebSocketChannel.connect(url);
    var received;
    channel.stream.listen((message) {
      received = message;
    });
    channel.sink.add('foo');
    var count = 0;
    while (++count < 100 &&
        received != null &&
        !received.startsWith("'foo' at ")) {
      await Future.delayed(Duration(milliseconds: 20));
    }
    await channel.sink.close(status.goingAway);
  });
}
