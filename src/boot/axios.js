import Vue from "vue";
import axios from "axios";
import authService from "../services/auth.service";
import env from '../enviroments/env'

const instance = axios.create({
  baseURL: env.baseURL
});

const validateToken = async () => {
  const user = authService.getUserFromLocalStorage();
  if (user) {
    const valido = await instance.post("validate_token", {
      accessToken: user.token
    });
    if (!valido.data) {
      authService.logout();
      window.location.reload();
    } else {
     // console.log("Token válido");
    }
  }
};

instance.interceptors.request.use(async request => {
  const user = authService.getUserFromLocalStorage();
  if (user) {
    
    if (
      !request.url.includes("login") &&
      !request.url.includes("validate_token")
    ) {
      request.headers.Authorization = `Bearer ${user.token}`;
    }
   
    if (!request.url.includes("validate_token")) {
      const valido = await instance.post("validate_token", {
        accessToken: user.token
      });

      if (valido.data) {
        return request;
      } else {
        authService.logout();
        window.location.reload();
      }
    }
  }

  return request;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    console.log("erro", err);
    if (!err.response) {
      return Promise.reject({
        response: {
          data: { statusCode: 0, message: "Sem comunicação com o servidor" }
        }
      });
    }
    return Promise.reject(err);
  }
);

setInterval(async () => {
  await validateToken();
}, 60000);

Vue.prototype.$axios = instance;
