import 'dart:math';

import 'package:test/test.dart';
import 'package:http/http.dart' as http;

void main() {
  test('WebGS', () async {
    var url = Uri.parse('http://localhost:8888');
    var response = await http.get(url);
    expect(response.statusCode, equals(200));
    expect(
      response.body,
      equals('<html>\n <head>\n </head>\n <body>\n'
          '   <h1>WebApp is running!<h1>\n </body>\n</html>'),
    );
  });
}
