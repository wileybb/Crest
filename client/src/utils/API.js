import axios from "axios";


export default {
  createUser: function(userdata) {
    return axios.post("/user/signup", userdata);
  },
  loginUser: function(userdata) {
    return axios.post("/user/login", userdata);
  },
  singleStock: function(symbol){
    return axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news,chart&range=1m&last=10`)
  },
};
