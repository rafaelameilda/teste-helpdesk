import Vue from 'vue'
export class HttpClientService {

  get axios() {
    return Vue.prototype.$axios;
  }

  get notify() {
    return Vue.prototype.$messages
  }

  errorType(status) {
    if(`${status}`.startsWith(5)) {
      return 'error';
    }else if(`${status}`.startsWith(4)) {
      return 'warn'
    }else if(`${status}`.startsWith(2)) {
      return 'success'
    }
  }

  handleError(err) {
    
    if(err.response) {
      let type = this.errorType(err.response.status);
      
      return {
        type: type,
        message: err.response.data.message,
        title: `${err.response.status}: ${type !== 'error' ? 'Atenção' : 'Ocorreu um erro durante a execução.'}`,
        status: err.response.status
      }
    }else {
      return {
        type: 'error',
        status: 0,
        message: 'Ocorreu um erro inesperado! Verifique sua conexão e tente novamente.',
        title: `0: Ocorreu um erro durante execução.`
      }
    }
  }

  
}
