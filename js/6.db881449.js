(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"37dc":function(e,t,a){"use strict";var i=a("d062"),o=a.n(i);o.a},"98ab":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"alert",staticClass:"alert"},[a("div",{staticClass:"left"},[a("span",{staticClass:"border",class:"bg-"+e.color}),a("span",{staticClass:"icon",class:e.color},[a("q-icon",{attrs:{name:e.icon}})],1)]),a("div",{staticClass:"content"},[a("div",{staticClass:"msg"},[a("span",{staticClass:"title"},[e._v(e._s(e.title))]),a("span",{staticClass:"caption"},[e._v(e._s(e.caption))])]),a("div",{staticClass:"close"},[a("button",{on:{click:e.close}},[a("i",{staticClass:"material-icons q-icon notranslate",attrs:{"aria-hidden":"true",role:"img"}},[e._v("close")])])])])])},o=[],s={props:{caption:String,title:String,type:{type:String,default:"info"}},mounted:function(){},methods:{close:function(){this.$refs.alert.remove(),this.$emit("close")}},computed:{icon:function(){switch(this.type){case"info":return"info";case"warn":return"warning";case"error":return"error";case"help":return"help";case"success":return"check_circle";default:return"info"}},color:function(){switch(this.type){case"info":return"info";case"warn":return"warn";case"error":return"error";case"help":return"help";case"success":return"success";default:return"info"}}}},r=s,n=(a("37dc"),a("2877")),c=a("0016"),l=a("eebe"),u=a.n(l),d=Object(n["a"])(r,i,o,!1,null,"b8d0040e",null);t["a"]=d.exports;u()(d,"components",{QIcon:c["a"]})},bb5b:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-dialog",{ref:"dialog",attrs:{"full-width":e.fullWidth},on:{hide:e.onDialogHide}},[a("q-card",{staticClass:"q-dialog-plugin",style:e.getSize},[a("Alert",{staticClass:"full-width",attrs:{title:e.title,caption:e.message,type:e.type},on:{close:e.onCancelClick}})],1)],1)},o=[],s=a("98ab"),r={components:{Alert:s["a"]},props:{message:String,title:String,fullWidth:Boolean,size:{type:String,default:"md"},type:String,detail:Boolean,color:{type:String,default:"bg-negative"}},computed:{getSize:function(){if("md"===this.size)return[{width:"700px"},{"max-width":"80vw"}]}},methods:{show:function(){this.$refs.dialog.show()},hide:function(){this.$refs.dialog.hide()},onDialogHide:function(){this.$emit("hide")},onOKClick:function(){this.$emit("ok"),this.hide()},onDetailClick:function(){this.$emit("detail")},onCancelClick:function(){this.hide()}}},n=r,c=a("2877"),l=a("24e8"),u=a("f09f"),d=a("eebe"),f=a.n(d),p=Object(c["a"])(n,i,o,!1,null,null,null);t["a"]=p.exports;f()(p,"components",{QDialog:l["a"],QCard:u["a"]})},d062:function(e,t,a){},e4a2:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{staticClass:"q-pa-sm q-gutter-sm"},[a("q-toolbar",{class:e.$q.dark.isActive?"shadow bg-dark text-white rounded-borders":"rounded-borders bg-deep-orange-6  text-white text-subtitle1"},[e._v("\n    Abrir uma Nova Solicitação de Acesso a Pastas\n\n    "),a("q-space")],1),a("q-card",[a("q-card-section",[a("cc-input",{staticClass:"col-12 col-lg-12 col-md-12",attrs:{color:e.$q.dark.isActive?"white":"grey",label:"Usuário",required:!0,placeholder:"Nome Completo",help:"Nome completo do funcionário que receberá o acesso das pastas"},model:{value:e.form.redeFuncionario,callback:function(t){e.$set(e.form,"redeFuncionario",t)},expression:"form.redeFuncionario"}}),a("r-frm-rede",{model:{value:e.form,callback:function(t){e.form=t},expression:"form"}}),a("q-card-actions",[a("q-btn",{attrs:{color:e.$q.dark.isActive?"white":"positive",outline:"",disable:e.validarFormulario(),loading:e.submitting,icon:"fas fa-paper-plane",label:"Enviar","no-caps":""},on:{click:e.enviarChamado},scopedSlots:e._u([{key:"loading",fn:function(){return[a("q-spinner-facebook")]},proxy:!0}])},[a("q-tooltip",{attrs:{"transition-show":"rotate","transition-hide":"rotate","content-class":"bg-accent"}},[e._v("Enviar Chamado")])],1),a("q-btn",{attrs:{to:"/new-ticket","no-caps":"",outline:"",color:e.$q.dark.isActive?"grey-6":"negative",icon:"fas fa-ban",label:"Cancelar"}},[a("q-tooltip",{attrs:{"transition-show":"rotate","transition-hide":"rotate","content-class":"bg-accent"}},[e._v("Cancelar e Voltar")])],1)],1)],1)],1)],1)},o=[],s=a("a34a"),r=a.n(s),n=(a("96cf"),a("c973")),c=a.n(n),l=a("bb5b"),u=function(){return{redefoldersSelected:[],typeAcessofoldersRede:"apenasLeitura",categoria:{label:"",value:0},subCategoria:{label:"",value:0},title:"LIBERAR ACESSO A PASTAS DE REDE",prioridade:{label:"Baixa",value:"B"},description:""}},d={name:"FormularioNewUsers",data:function(){return{form:u(),submitting:!1}},methods:{enviarChamado:function(){var e=this;return c()(r.a.mark((function t(){var a,i,o;return r.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,e.validarFormulario()){t.next=11;break}return e.prepareToSendTicket(),a="/ticket/new",t.next=6,e.$axios.post(a,{params:e.form});case 6:i=t.sent,e.submitting=!1,e.loading=!1,e.exibirMensagem(i.data,"success","Chamado Criado com Sucesso!"),e.$router.push("/new-ticket");case 11:t.next=19;break;case 13:t.prev=13,t.t0=t["catch"](0),o=t.t0.response?t.t0.response.data.message:"Sem comucação com servidor",e.exibirMensagem(o,"error","Erro"),e.submitting=!1,e.loading=!1;case 19:case"end":return t.stop()}}),t,null,[[0,13]])})))()},prepareToSendTicket:function(){this.submitting=!0,this.loading=!0;var e=this.form.redefoldersSelected.map((function(e,t){return"".concat(t+1,": ").concat(e.path," - ").concat("apenasLeitura"===e.acesso?"Apenas Leitura":"Leitura e Gravação","<br/>")}));this.form.categoria={label:this.$store.state.Ticket.items.codCategoria.label,value:this.$store.state.Ticket.items.codCategoria.value},this.form.subCategoria={label:this.$store.state.Ticket.items.label,value:this.$store.state.Ticket.items.codSubCategoria},this.form.description="\n      <b>Por favor, Liberar acesso as pastas de Rede com os dados a baixo:</b><br/>\n      <b>Pastas a Serem liberadas:</b><br/> ".concat(e,"\n      <b>Observação:</b> ").concat(this.form.redeObservacao?this.form.redeObservacao:"Não possui","\n      \n      ")},exibirMensagem:function(e,t,a){this.$q.dialog({component:l["a"],message:e,html:!0,type:t,title:a})},validarFormulario:function(){return!this.form.redefoldersSelected.length||!this.form.redeFuncionario}},created:function(){this.$store.state.Ticket.items.label?(this.form.categoria=this.$store.state.Ticket.items.codCategoria.label,this.form.subCategoria=this.$store.state.Ticket.items.label):this.$router.push("/new-ticket")}},f=d,p=a("2877"),m=a("9989"),h=a("65c6"),b=a("2c91"),g=a("f09f"),v=a("a370"),C=a("4b7e"),k=a("9c40"),w=a("e669"),S=a("05c0"),$=a("eebe"),q=a.n($),x=Object(p["a"])(f,i,o,!1,null,null,null);t["default"]=x.exports;q()(x,"components",{QPage:m["a"],QToolbar:h["a"],QSpace:b["a"],QCard:g["a"],QCardSection:v["a"],QCardActions:C["a"],QBtn:k["a"],QSpinnerFacebook:w["a"],QTooltip:S["a"]})}}]);