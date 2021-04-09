import { Notify } from "quasar";
import Vue from "vue";

const typeMessage = (obj) => {

  const {status} = obj.response

  if(`${status}`.startsWith(5)) {
    return 'negative';
  }else if(`${status}`.startsWith(4)) {
    return 'warning'
  }else if(`${status}`.startsWith(2)) {
    return 'positive'
  }
}

const error = obj => {
  if (typeof obj === "string") {
    Notify.create({
      message: obj,
      type: "negative",
      progress: true,
      position: "center"
    });
    return;
  }
  if (obj.response) {
    if (obj.response.data.statusCode === 401) {
      Notify.create({
        message: obj.response.data.message,
        type: typeMessage(obj),
        progress: true,
        position: "center",
        timeout: 1500
      });
    } else {
      Notify.create({
        message: obj.response.data.message,
        type: typeMessage(obj),
        progress: true,
        position: "center",
        timeout: 5000,
        
      });
    }
  } else {
    Notify.create({
      message: "Erro ao conectar-se com o servidor",
      type: "negative",
      progress: true,
      position: "center"
    });
  }
};

const success = (msg, position = 'center') => {

  Notify.create({
    message: msg,
    type: 'positive',
    position: position,
    timeout: 1500
  })
}

Vue.prototype.$messages = { error, success };
