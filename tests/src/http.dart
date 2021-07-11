import 'package:test/test.dart';
import 'package:http/http.dart' as http;

const String PROTOCOL = 'http';

/*
HttpServer supportedLogTypes: #(#'startup' #'debug' #'warning' #'error').
HttpServer debug: true.
WebApp run.
*/

void main() {
  test('WebGS', () async {
    var url = Uri.parse(PROTOCOL + '://localhost:8888');
    var response = await http.get(url);
    expect(response.statusCode, equals(200));
    expect(
      response.body,
      equals('<html>\n <head>\n </head>\n <body>\n'
          '   <h1>WebApp is running!<h1>\n </body>\n</html>'),
    );
  });
}
