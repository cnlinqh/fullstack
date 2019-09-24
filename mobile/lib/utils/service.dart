const serviceUrl = 'http://localhost:3001/';
const path = {
  "user": {
    "signup": serviceUrl + "user/signup",
    "login": serviceUrl + "user/accesstoken",
    "list": serviceUrl + "user/list",
    "delete": serviceUrl + "user/delete"
  },
  "data": {
    "paged": serviceUrl + "api/getPagedData"
  }
};
