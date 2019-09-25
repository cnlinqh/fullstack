import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:dio/dio.dart';
import 'package:mobile/utils/service.dart';

final _storage = new FlutterSecureStorage();

var currentUser = {"name": "", "token": ""};

void setCurrentUser(name, token) {
  currentUser["name"] = name;
  currentUser["token"] = token;

  _storage.write(key: "name", value: name);
  _storage.write(key: "token", value: token);
}

Future checkSecureStorage() async {
  final all = await _storage.readAll();
  return all;
}

Future validateSecureStorage(name, token) async {
  try {
    var dio = Dio();
    dio.options.headers = {'Authorization': token};
    Response res = await dio.get(path['user']['info']);
    return res.data;
  } catch (error) {
    return checkResponseError(error);
  }
}

Object prepareRequestHeaders() {
  if (currentUser["token"] != "") {
    return {
      'Authorization': currentUser["token"],
    };
  }
  return {};
}

Object checkResponseError(error) {
  if (error.toString().indexOf("Connection refused") != 0) {
    return {"success": false, "message": "Error: Network Error!"};
  }
  return {"success": false, "message": "Error: Unknown Error!"};
}
