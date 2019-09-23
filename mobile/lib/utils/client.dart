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
    return checkResponseError(error);
  }
}

Future userLogin(name, password) async {
  try {
    var dio = Dio();
    Response res = await dio.post(path['user']['login'],
        data: {"name": name, "password": password});
    return res.data;
  } catch (error) {
    return checkResponseError(error);
  }
}

Future userGetList() async {
  try {
    var dio = Dio();
    dio.options.headers = prepareRequestHeaders();
    Response res = await dio.get(path['user']['list']);
    return res.data;
  } catch (error) {
    return checkResponseError(error);
  }
}

Future userDelete(name) async {
  try {
    var dio = Dio();
    dio.options.headers = prepareRequestHeaders();
    Response res = await dio.delete(path['user']['delete'] + "?name=" + name);
    return res.data;
  } catch (error) {
    return checkResponseError(error);
  }
}
