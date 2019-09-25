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

Future dataGetPagedData(filter, skip, limit) async {
  try {
    var dio = Dio();
    dio.options.headers = prepareRequestHeaders();
    Response res = await dio.post(path['data']['paged'],
        data: {"filter": filter, "skip": skip, "limit": limit});
    return res.data;
  } catch (error) {
    return checkResponseError(error);
  }
}

Future dataAdd(message) async {
  try {
    var dio = Dio();
    dio.options.headers = prepareRequestHeaders();
    Response res =
        await dio.post(path['data']['add'], data: {"message": message});
    return res.data;
  } catch (error) {
    return checkResponseError(error);
  }
}

Future dataDeleteAll() async {
  try {
    var dio = Dio();
    dio.options.headers = prepareRequestHeaders();
    Response res = await dio.delete(path['data']['deleteAll']);
    return res.data;
  } catch (error) {
    return checkResponseError(error);
  }
}

Future dataPrepare(count, random) async {
  try {
    var dio = Dio();
    dio.options.headers = prepareRequestHeaders();
    Response res = await dio.post(path['data']['prepare'],
        data: {"count": count, "random": random});
    return res.data;
  } catch (error) {
    return checkResponseError(error);
  }
}
