#! /usr/bin/env dart
// requires runAsyncSample.sh to be running in a separate session

// import package to make HTTP requests
import 'dart:async';
import 'package:http/http.dart' as http;

Future<void> main(List<String> args) async {
  await ajaxRequests();
}

Future<void> ajaxRequests() async {
  // final uri = Uri.parse('http://localhost:8888/add.gs?x=1&y=2');
  final uri = Uri.parse('http://localhost:8888/sleep.gs?ms=8');
  final stopwatch = Stopwatch()..start();
  final requestCount = 2000;
  var responseCount = 0;
  for (var i = 0; i < requestCount; i++) {
    unawaited(http.get(uri).then((_) => responseCount += 1));
    await Future.delayed(Duration(milliseconds: 1));
  }
  while (responseCount < requestCount) {
    await Future.delayed(Duration(microseconds: 10));
  }
  final requestsPerSecond =
      (requestCount * 1000 / stopwatch.elapsed.inMilliseconds).round();
  print('$requestsPerSecond AJAX requests per second');
}
