import axios from "axios";


export default {
  createUser: function(userdata) {
    return axios.post("/user/signup", userdata);
  },
  loginUser: function(userdata) {
    return axios.post("/user/login", userdata);
  },
};
