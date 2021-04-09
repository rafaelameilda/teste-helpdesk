<template>
  <div class="j-container">
    <div class="content">
      <div class="left">
        <div class="left-container">
          <div class="image-container">
            <!-- <img class="image" src="~assets/shipment-truck_2x.png" /> -->
              <q-icon class="image" style="font-size: 20rem" color="light-blue-10" name="support_agent" />
          </div>

          <div class="bottom">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#0059D4"
                fill-opacity="1"
                d="M0,288L80,288C160,288,320,288,480,250.7C640,213,800,139,960,128C1120,117,1280,171,1360,197.3L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
              />
            </svg>
          </div>
        </div>

        <div class="circle">
          <img src="~assets/packaging.gif" />
        </div>
      </div>

      <div class="right">
        <div class="title">
          <span>Bem vindo de volta</span>
          <small>Use o usuário e senha do WinThor</small>
        </div>

        <q-form @submit="login" class="form">
          <div class="textfield">
            <q-input
              v-model="form.username"
              :rules="[val => !!val || 'Informe o usuário']"
              label="Usuário"
            />
          </div>

          <span class="separator"></span>

          <div class="textfield">
            <q-input
              v-model="form.password"
              :rules="[val => !!val || 'Informe a senha']"
              type="password"
              label="Senha"
            />
          </div>

          <div class="actions">
            <button :disabled="loading" type="submit">{{loading ? 'Aguarde...' : 'Entrar'}}</button>
            <div class="footer">
              <a @click="showMsgForgetPassword">Esqueceu sua senha ?</a>
              <a @click="showMsgNoHaveUser">Não tem usuário ?</a>
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import authService from "../services/auth.service";
export default {
  data() {
    return {
      loading: false,
      form: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    showMsgNoHaveUser() {
      this.$q.dialog({
        message:
          "A aplicação usa o mesmo usuário e senha do winthor, caso nao tenha usuário do winthor, entre em contato com o suporte.",
        title: "Informação",
      });
    },

    showMsgForgetPassword() {
      this.$q.dialog({
        message:
          "Se voce esqueceu a senha do WinThor. Entre em contato com o suporte pra resetar sua senha.",
        title: "Informação",
      });
    },

    async login() {
      this.loading = true;
      try {
        const res = await authService.login(this.form);
        authService.saveLocalStorage(res.data);
        this.$router.push("/");
         this.$q.notify({
          message: `Seja Bem Vindo ${res.data.name}`,
          type: "positive",
          position: "center",
          progress: true,
          timeout: 3000,
        });
      } catch (error) {
        let message = null;
        if (error.response) {
          message = error.response.data.message;
        } else if (error.message) {
          message = error.message;
        } else {
          message = error;
        }

        this.$q.notify({
          message: message,
          type: "warning",
          position: "center",
          progress: true,
          timeout: 3000,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap");

$color: #6b29f8;
html,
body {
  height: 100%;
  min-height: 100%;
  display: flex;
}

@media (min-width: 320px) and (max-width: 480px) {
  .left {
    display: none;
  }
  .right {
    width: 100% !important;
  }
}

@media (min-width: 320px) and (max-width: 480px) {
  .j-container {
    padding-left: 10px;
    padding-right: 10px;
  }
}

.j-container {
  height: 100%;
  min-height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  font: 15px arial;
  color: rgba(0, 0, 0, 0.7);
  box-shadow: inset -172px 0px 241px -21px rgba(158, 178, 230, 1);

  .content {
    background: #043150;
    height: 500px;
    width: 850px;
    border-radius: 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;

    box-shadow: 11px 7px 62px -10px rgba(0, 0, 0, 0.75);

    .right {
      width: 50%;
      height: 100%;
      background: #fff;

      .form {
        font-family: "Montserrat", sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 50px;

        .separator {
          margin: 10px;
        }

        .textfield {
          width: 90%;
        }
        .actions {
          padding-top: 25px;
          width: 90%;
          .footer {
            padding-top: 10px;
            display: flex;
            justify-content: space-between;
            font-size: 13px;

            a {
              cursor: pointer;
              color: #20356d;
              font-weight: bold;
              &:hover {
                opacity: 0.8;
              }
            }
          }
          button {
            width: 100%;
            padding: 15px;
            background-color: #3e2abe;
            font-weight: bold;
            color: #fff;
            border: none;
            outline: 0;
            border-radius: 10px;
            transition: all 0.3s ease;
            cursor: pointer;
            &:hover {
              background-color: #411db7;
            }
            &:active {
              box-shadow: 0px 4px 8px #0065c8;
              -webkit-transform: scale(0.98);
              transform: scale(0.9);
            }
          }
        }
      }

      .title {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding-top: 10%;
        padding-left: 5%;
        font-family: "Montserrat", sans-serif;

        span {
          font-size: 30px;

          color: #20356d;
          font-weight: bold;
        }
        small {
          color: #adb5c9;
          font-weight: bold;
          font-size: 14px;
          margin-top: 12px;
        }
      }
    }
    .left {
      width: 50%;
      height: 100%;

      .left-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;

        .image-container {
          height: 70%;
          width: 100%;

          .image {
            width: 100%;
            background-color: #fff;
            height: 100%;
            background-size: cover;
            border-bottom-right-radius: 50%;
            border-top-left-radius: 50%;
           // box-shadow: 10px 10px 61px 2px rgba(0, 0, 0, 0.75);
          }
        }
        .bottom {
          background: #74beed;
          width: 100%;

          height: 30%;

          @keyframes animateWave {
            0% {
              transform: scale(1, 0);
            }
            100% {
              transform: scale(1, 1);
            }
          }

          svg {
            transform-origin: top;
            animation: animateWave 1000ms cubic-bezier(0.23, 1, 0.32, 1);
          }
        }
      }

      .circle {
        /* height: 200px;
        width: 200px; */

        position: absolute;
        bottom: 18%;
        left: 29%;

        img {
          background-size: contain;
          height: 150px;
          width: 150px;
          border-radius: 50%;
          /* border-top-right-radius: 100%;
          border-top-left-radius: 100%; */
          box-shadow: 10px 10px 61px 2px rgba(0, 0, 0, 0.75);
        }
      }
    }
  }
}
</style>