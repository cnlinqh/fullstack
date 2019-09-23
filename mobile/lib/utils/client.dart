import 'package:dio/dio.dart';
import 'package:mobile/utils/service.dart';
import 'package:mobile/utils/reqres.dart';

Future userSignUp(name, password) async {
  try {
    var dio = Dio();
    Response res = await dio.post(path['user']['signup'],
        data: {"name": name, "password": password});
    return res.data;
  } catch (error) {
    return "";
  }
}

Future userLogin(name, password) async {
  try {
    var dio = Dio();
    Response res = await dio.post(path['user']['login'],
        data: {"name": name, "password": password});
    return res.data;
  } catch (error) {
    return "";
  }
}
