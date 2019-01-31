import axios from "axios";

export default {
  //Singup New User
  createUser: function(userdata) {
    return axios.post("/user/signup", userdata);
  },
  //Login User
  loginUser: function(userdata) {
    return axios.post("/user/login", userdata);
  },
  //Sign Out Logged in User
  signOutUser: function(){
    return axios.get("/user/logout")
  },
  //Get Single Stock Data
  singleStock: function(symbol){
    return axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news,chart&range=1m&last=10`)
  },


  createPurchase: function(userData){
    return axios.post("/user/home/:id", userData);
  },
  getCashValue: function(userData){
    return axios.get("user/home/:id", userData);
  }

};
