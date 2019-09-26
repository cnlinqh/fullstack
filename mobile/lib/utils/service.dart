const serviceUrl = 'http://10.0.2.2:3001/'; // Android simulator
// const serviceUrl = 'http://localhost:3001/'; // iOS simulator
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
  },
  "douban": {
    "movie_tags":
        "https://movie.douban.com/j/search_tags?type=movie&source=index",
    "movie_subjects":
        "https://movie.douban.com/j/search_subjects?type=movie&tag=<tag>&page_limit=<limit>&page_start=<start>",
  }
};
