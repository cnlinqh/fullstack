import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  var body = request();
  body.then((value) {
    var obj = jsonDecode(value);
    print(obj["token"]);
  });
}

Future<String> request() async {
  var url = 'http://localhost:3001/user/accesstoken';
  var response = await http.post(url, body: {"name": 'aaa', "password": 'aaa'});
  return response.body;
}
