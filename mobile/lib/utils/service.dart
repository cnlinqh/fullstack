const serviceUrl = 'http://localhost:3001/';
const path = {
  "user": {
    "signup": serviceUrl + "user/signup",
    "login": serviceUrl + "user/accesstoken",
    "info": serviceUrl + "user/user_info",
    "list": serviceUrl + "user/list",
    "delete": serviceUrl + "user/delete"
  },
  "data": {
    "paged": serviceUrl + "api/getPagedData",
    "add": serviceUrl + "api/putMessage",
    "deleteAll": serviceUrl + "api/deleteAll",
    "prepare": serviceUrl + "api/prepareData"
  }
};
