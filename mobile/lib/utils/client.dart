import 'package:dio/dio.dart';
import './service.dart';

Future<String> userSignUp(name, password) async {
  var dio = Dio();
  Response res = await dio
      .post(path['user']['signup'], data: {"name": name, "password": password});
  return res.data.toString();
}

Future<String> userLogin(name, password) async {
  var dio = Dio();
  Response res = await dio
      .post(path['user']['login'], data: {"name": name, "password": password});
  return res.data.toString();
}
