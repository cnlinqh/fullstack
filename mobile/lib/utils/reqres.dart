var currentUser = {"name": "", "token": ""};

void setCurrentUser(name, token) {
  currentUser["name"] = name;
  currentUser["token"] = token;
}

Object prepareRequestHeaders() {
  if(currentUser["token"]!= ""){
    return {
      'Authorization': currentUser["token"]
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
