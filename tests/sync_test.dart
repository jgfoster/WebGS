#! /usr/bin/env dart
// requires runAsyncSample.sh or runSyncSample.sh to be running in a separate session

// import package to make HTTP requests
import 'dart:async';

import 'package:http/http.dart' as http;

Future<void> main(List<String> args) async {
  await ajaxRequests();
  await fileRequests();
}

Future<void> ajaxRequests() async {
  // final uri = Uri.parse('http://localhost:8888/add.gs?x=1&y=2');
  final uri = Uri.parse('http://localhost:8888/sleep.gs?ms=2');
  final stopwatch = Stopwatch()..start();
  final requestCount = 2000;
  for (var i = 0; i < requestCount; i++) {
    await http.get(uri);
  }
  final requestsPerSecond =
      (requestCount * 1000 / stopwatch.elapsed.inMilliseconds).round();
  print('$requestsPerSecond AJAX requests per second');
}

Future<void> fileRequests() async {
  final uri = Uri.parse('http://localhost:8888/index.html');
  final stopwatch = Stopwatch()..start();
  final count = 5000;
  for (var i = 0; i < count; i++) {
    await http.get(uri);
  }
  final requestsPerSecond =
      (count * 1000 / stopwatch.elapsed.inMilliseconds).round();
  print('$requestsPerSecond file requests per second');
}
