import 'dart:convert';
import 'package:test/test.dart';
import 'package:http/http.dart' as http;

const String PROTOCOL = 'https';

/*
HttpServer supportedLogTypes: #(#'startup' #'debug' #'warning' #'error').
HttpServer debug: true.
WebAppSample run.
*/

void main() {
  test('index', () async {
    var url = Uri.parse(PROTOCOL + '://localhost:8888');
    var response = await http.get(url);
    expect(response.statusCode, equals(200));
    expect(
      response.body,
      equals('<html>\n <head>\n </head>\n <body>\n'
          '   <h1>WebApp is running!<h1>\n </body>\n</html>'),
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
    for (var i = 0; i < 100; ++i) {
      ++sent;
      // ignore: unawaited_futures
      http.get(url).then((http.Response response) {
        ++received;
        expect(response.statusCode, equals(200));
      });
    }
    while (received < sent) {
      await Future.delayed(Duration(milliseconds: 20));
    }
    print('$sent HTTPS requests executed in ${timer.elapsed}');
  });
}
