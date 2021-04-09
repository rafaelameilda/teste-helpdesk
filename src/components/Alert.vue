<template>
  <div ref="alert" class="alert">
    <div class="left">
      <span class="border" :class="'bg-'+color"></span>
      <span class="icon" :class="color">
        <q-icon :name="icon" />
      </span>
    </div>

    <div class="content">
      <div class="msg">
        <span class="title">{{title}}</span>
        <span class="caption">{{caption}}</span>
      </div>

      <div class="close">
        <button @click="close">
          <i aria-hidden="true" role="img" class="material-icons q-icon notranslate">close</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    caption: String,
    title: String,
    type: {
      type: String,
      default: "info",
    },
  },
  mounted() {
  //  console.log(this.color)
  },
  methods: {
    close() {
      this.$refs.alert.remove()
      this.$emit('close')
    }
  },
  computed: {
    icon() {
      switch (this.type) {
        case "info":
          return "info";
        case "warn":
          return "warning";
        case "error":
          return "error";
        case "help":
          return "help";
        case "success":
          return "check_circle";
        default:
          return "info";
      }
    },
    color() {
      switch (this.type) {
        case "info":
          return "info";
        case "warn":
          return "warn";
        case "error":
          return "error";
        case "help":
          return "help";
        case "success":
          return "success";
        default:
          return "info";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hide {
  display: none;
}
.warn {
  color: #f0a92e;
}
.success {
  color: #21a67a;
}
.info {
  color: #007bc2;
}

.help {
  color: #007bc2;
}
.error {
  color: #e82e25;
}

.bg-warn {
  background: #f0a92e;
}
.bg-success {
  background: #21a67a;
}
.bg-info {
  background: #007bc2 !important;
}

.bg-help {
  background: #007bc2;
}
.bg-error {
  background: #e82e25;
}

.alert {
  font-family: "Montserrat", sans-serif;
 transition: all 3s ease;
  background: white;
  display: flex;
  width: 50%;
  justify-content: flex-start;
  height: 90px;
  box-shadow: -1px 2px 31px -6px rgba(0, 0, 0, 1);
  border-radius: 6px;

  .content {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .close {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-right: 15px;
      button {
        border: none;
        outline: 0;
        cursor: pointer;
        background: transparent;
        i {
          font-weight: bold;
          font-size: 18px;
          color: #b9babe;
        }
        &:active {
          -webkit-transform: scale(0.98);
          transform: scale(0.9);
        }
        &:hover {
          opacity: 0.8;
        }
      }
    }

    .msg {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      .title {
        font-weight: bold;
        font-size: 18px;
      }
      .caption {
        color: #b9babe;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  .left {
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .icon {
      font-size: 45px;
      // color: #007bc2;
      margin-left: 15px;
      margin-right: 15px;
    }
    .border {
      border-radius: 30px;
      //border-left: 7px solid #007bc2;
      width: 7px;
      height: 85%;
    }
  }
}
</style>