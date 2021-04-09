<template>
  <div ref="root" class="root q-ma-xs">
    <div class="header">
      <div class="title">
        <span>{{title}}</span>
        <small>{{caption}}</small>
      </div>

      <div class="close">
        <button @click="close">
          <i aria-hidden="true" role="img" class="material-icons q-icon notranslate">close</i>
        </button>
        <!-- <button>
          <i aria-hidden="true" role="img" class="material-icons q-icon notranslate config">build</i>
        </button>-->
      </div>
    </div>
    <!-- <div class="body"></div> -->
    <div class="content">
      <div ref="body" class="body">
        <div class="actions">
          <slot v-if="!isMobile" name="actions"></slot>

          <q-page-sticky class="page-stick" v-if="isMobile" position="bottom" :offset="[18, 18]">
            <q-fab icon="keyboard_arrow_up" direction="up" class="float-action">
              <slot name="actions"></slot>
            </q-fab>
          </q-page-sticky>
        </div>
        <div class="q-pt-sm q-pl-md q-pr-md q-pb-sm">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isMobile", "title", "caption"],
  data() {
    return {
      height: "70px",
    };
  },
  async created() {
    //this.height = await this.getHeight();
  },
  async mounted() {
    //this.setheightBody();
  },
  methods: {
    close() {
      let cancelar = false;
      this.$q.notify({
        message: "Você será redirecionado para a tela home",
        color: "color1",
        timeout: 1000,
        position: "center",
        progress: true,
        actions: [
          {
            label: "Cancelar",
            color: "white",
            handler: () => (cancelar = true),
          },
        ],
        onDismiss: () => {
          if (!cancelar) {
            this.$router.push("/");
          }
        },
      });
    },

    async setheightBody() {
      this.height = await this.getHeight();
    },
    getHeight() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const height = parseInt(this.$refs.body.clientHeight);
          resolve(height - 100);
        }, 100);
      });
    },
  },

  computed: {
    contentStyle() {
      return {
        height: `${this.height}px`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap");

@media (min-width: 320px) and (max-width: 480px) {
  .body {
    width: 95% !important;
    margin-left: 2.5% !important;
    margin-right: 2.5% !important;
  }
}

$primaryColor: #042f4d;
$secondaryColor: #0057d0;

.float-action {
  z-index: 1;
  background: #fff;
  border-radius: 10px;
  box-shadow: 10px 10px 59px 2px rgba(0, 0, 0, 1);
}

.page-stick {
  z-index: 1;
}

.root {
  display: flex;
  flex-direction: column;

  border-radius: 10px;
  

  .header {
    border-radius: 10px;
    height: 200px;
    width: 100%;
    background: $primaryColor;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .close {
      height: 60px;
      color: #fff;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: ceter;
      padding-right: 10px;
      padding-top: 5px;

      button {
        background: $primaryColor;
        border: none;
        outline: 0;
        height: 38px;
        width: 40px;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;

        .config {
          font-size: 18px !important;
        }

        &:active {
          box-shadow: 0px 4px 8px #0065c8;
          -webkit-transform: scale(0.98);
          transform: scale(0.9);
        }
        &:hover {
          opacity: 0.8;
          box-shadow: inset 10px 10px 53px 32px rgba(4, 47, 77, 1);
        }
        i {
          font-size: 25px;
          font-weight: bold;
          color: #fff;
        }
      }
    }

    .title {
      height: 60px;
      font-family: "Montserrat", sans-serif;
      color: #fff;
      font-weight: bold;
      font-size: 24px;
      width: 100%;
      padding-left: 20px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      small {
        font-size: 12px;
      }
      span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }

  .content {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .body {
    box-shadow: 10px 10px 74px -12px rgba(0, 0, 0, 1);
    background: #fff;
    position: absolute;
    width: 99%;
    top: -130px;
    border-radius: 20px;
    .actions {
      height: 60px;
      position: absolute;
      background: white;
      border-radius: 10px;
      top: -50px;
      right: 100px;
    }
  }

  /* .body {
    background: #fff;
    height: 400px;
    width: 97%;
    margin-left: 1.5%;
    margin-right: 1.5%;

    position: relative;
    bottom: 130px;
    
 
    
    border-radius: 5px;
    border-top-right-radius: 100px;
  } */
}
</style>