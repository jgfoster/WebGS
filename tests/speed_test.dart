#! /usr/bin/env dart
// requires runAsyncSample.sh or runSyncSample.sh to be running in a separate session

// import package to make HTTP requests
import 'dart:async';

import 'package:http/http.dart' as http;

Future<void> main(List<String> args) async {
  await ajaxRequests();
  await fileRequests();
  await sleepRequests();
  await cpuRequests();
}

Future<void> ajaxRequests() async {
  await request('/add.gs?x=1&y=2');
}

Future<void> fileRequests() async {
  await request('/index.html');
}

Future<void> sleepRequests() async {
  await request('/sleep.gs?ms=20');
}

Future<void> cpuRequests() async {
  await request('/cpu.gs?ms=20');
}

Future<void> request(String path) async {
  final uri = Uri.parse('http://localhost:8888$path');
  final stopwatch = Stopwatch()..start();
  final targetCount = 1000;
  var requestCount = 0;
  var responseCount = 0;
  while (requestCount < targetCount) {
    while (requestCount - responseCount > 50) {
      await Future.delayed(Duration(milliseconds: 1));
    }
    Future<void> issueRequest(Uri uri) async {
      requestCount += 1;
      await http.get(uri);
      responseCount += 1;
    }

    unawaited(issueRequest(uri));
  }
  while (responseCount < targetCount) {
    await Future.delayed(Duration(milliseconds: 1));
  }
  final requestsPerSecond =
      (requestCount * 1000 / stopwatch.elapsed.inMilliseconds).round();
  print(
    '1000 requests for ${'$path     '.substring(0, 15)} completed '
    'in ${stopwatch.elapsed.inMilliseconds} ms ('
    '$requestsPerSecond requests per second)',
  );
}
