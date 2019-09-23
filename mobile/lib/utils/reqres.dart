String name = "";
String token = "";

String prepareRequestHeaders() {
  return "";
}

Object checkResponseError(error) {
  if (error.toString().indexOf("Connection refused") != 0) {
    return {"success": false, "message": "Error: Network Error!"};
  }
  return {"success": false, "message": "Error: Unknown Error!"};
}
