#! /usr/bin/env dart

import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:test/test.dart';
import 'package:web_socket_channel/status.dart' as status;
import 'package:web_socket_channel/web_socket_channel.dart';

const String protocol = 'http';
const int load = 10;

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
    final url = Uri.parse('$protocol://localhost:8888');
    final response = await http.get(url);
    expect(response.statusCode, equals(200));
    expect(
      response.body.substring(0, 21),
      equals('<!DOCTYPE html PUBLIC'),
    );
  });

  test('get echo', () async {
    final url = Uri.parse('$protocol://localhost:8888/echo.gs?foo=bar');
    final response = await http.get(url);
    expect(response.statusCode, equals(200));
    final obj = jsonDecode(response.body);
    expect(obj['foo'], equals('bar'));
  });

  test('post echo', () async {
    final url = Uri.parse('$protocol://localhost:8888/echo.gs');
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'a': '1', 'b': '2'}),
    );
    expect(response.statusCode, equals(200));
    final obj = jsonDecode(response.body);
    expect(obj['a'], equals('1'));
    expect(obj['b'], equals('2'));
  });

  test('get load', () async {
    final url = Uri.parse('$protocol://localhost:8888/echo.gs?foo=bar');
    final timer = Stopwatch()..start();
    var sent = 0;
    var received = 0;
    for (var i = 0; i < load; ++i) {
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
    final ms = timer.elapsed.inMilliseconds / sent;
    expect(ms, lessThan(3.0));
  });

  test('readFile', () async {
    final url = Uri.parse('$protocol://localhost:8888/tests/test.txt');
    final response = await http.get(url);
    expect(response.statusCode, equals(200));
    expect(response.body, equals('Hello, World!\n'));
  });

  test('writeFile', () async {
    final url = Uri.parse('$protocol://localhost:8888/uploadFile.gs');
    final request = http.MultipartRequest('POST', url);
    request.files.add(
      http.MultipartFile(
        'file1',
        File('../Html4Element.gs').readAsBytes().asStream(),
        File('../Html4Element.gs').lengthSync(),
        filename: 'Html4Element.gs',
      ),
    );
    request.files.add(
      http.MultipartFile(
        'file2',
        File('../HtmlElement.gs').readAsBytes().asStream(),
        File('../HtmlElement.gs').lengthSync(),
        filename: 'HtmlElement.gs',
      ),
    );
    final response = await request.send();
    expect(response.statusCode, equals(200));
    final body = await response.stream.bytesToString();
    final data = jsonDecode(body);
    expect(data['HtmlElement.gs'], equals(5058));
    expect(data['Html4Element.gs'], equals(94714));
  });

  test('webSocket', () async {
    final url = Uri.parse('ws://localhost:8888/webSocket.gs');
    final channel = WebSocketChannel.connect(url);
    String? received;
    channel.stream.listen((message) {
      received = message;
    });
    channel.sink.add('foo');
    var count = 0;
    while (++count < 100 &&
        received != null &&
        !received!.startsWith("'foo' at ")) {
      await Future.delayed(Duration(milliseconds: 20));
    }
    await channel.sink.close(status.goingAway);
  });
}
