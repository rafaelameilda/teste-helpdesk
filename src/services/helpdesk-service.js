import { HttpClientService } from "./http-client.service";
export class HelpDeskService extends HttpClientService {
  listAll(params) {
    return new Promise((resolve, reject) => {
      this.axios
        .get("/all-tickets", { params: params })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  loadTimeLines(params) {
    return new Promise((resolve, reject) => {
      this.axios
        .get("/timeline", { params: params })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getFiltersUsuario(params) {
    return new Promise((resolve, reject) => {
      this.axios
        .get("/filters/usuario", { params })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getFiltersRotinas(params) {
    return new Promise((resolve, reject) => {
      this.axios
        .get("/filters/rotinas", { params })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  sendNewticketUser(selection, params) {
    return new Promise(async (resolve, reject) => {
      const data = [];
      const retorno = {};
      try {
        if (selection.includes("Spark")) {
          data.prepareTicketSpark = {
            categoria: { value: 1 },
            subCategoria: { value: 4 },
            title: `NOVO USUÁRIO DE SPARK`,
            description: `<b>Por favor, criar um usuário do Spark com os dados abaixo:</b><br/>
            <b>Nome:</b> ${params.name}<br/>
            <b>Setor:</b> ${params.setor}<br/>
            <b>Apelido:</b> ${params.sparkApelido}<br/>
            <b>Ramal:</b> ${params.sparkRamal}<br/>`,
            prioridade: { value: "B" }
          };

          const url = "/ticket/new";
          retorno.spark = await this.axios.post(url, {
            params: data.prepareTicketSpark
          });
        }
        if (selection.includes("Rede")) {
          const pastas = params.redefoldersSelected.map(
            (item, indice) =>
              `${indice + 1}: ${item.path} - ${
                item.acesso === "apenasLeitura"
                  ? "Apenas Leitura"
                  : "Leitura e Gravação"
              }<br/>`
          );
          data.prepareTicketrRede = {
            categoria: { value: 1 },
            subCategoria: { value: 3 },
            title: `NOVO USUÁRIO DE REDE`,
            description: `<b>Por favor, criar um usuário de Rede com os dados abaixo:</b><br/>
            <b>Nome:</b> ${params.name}<br/>
            <b>Setor:</b> ${params.setor}<br/>
            <b>Pastas a Serem liberadas para o usuário:</b><br/> ${pastas}
            <b>Observação:</b> ${
              !params.redeObservacao ? "Não Possui" : params.redeObservacao
            }
   `,
            prioridade: { value: "B" }
          };

          const url = "/ticket/new";
          retorno.rede = await this.axios.post(url, {
            params: data.prepareTicketrRede
          });
        }
        if (selection.includes("Winthor")) {
          const rotinas = params.winthorRotinasLiberar.map(
            (item, indice) => `${indice}º: ${item.Rotina}, <br/>`
          );
          data.prepareTicketWinthor = {
            categoria: { value: 1 },
            subCategoria: { value: 1 },
            title: `NOVO USUÁRIO DE WINTHOR`,
            description: `<b>Por favor, criar um usuário do Winthor com os dados abaixo:</b><br/>
            <b>Nome:</b> ${params.name}<br/>
            <b>Setor:</b> ${params.setor}<br/>
            ${
              params.winthorUserReferencia
                ? "<b>Copiar os acessos do usuário:</b><br/>" +
                  params.winthorUserReferencia.Nome
                : "<b>Liberar as Rotinas:</b><br/>" + rotinas
            }
            `,
            prioridade: { value: "B" }
          };

          const url = "/ticket/new";
          retorno.winthor = await this.axios.post(url, {
            params: data.prepareTicketWinthor
          });
        }

        resolve(retorno);
      } catch (error) {
        reject(error);
      }
    });
  }

  insertNewTimeLine(params) {
    return new Promise((resolve, reject) => {
      this.axios
        .post("/timeline", { params })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  }
  updateTimeLine(params) {
    return new Promise((resolve, reject) => {
      this.axios
        .put("/timeline", { params })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  }
}

export default new HelpDeskService();
