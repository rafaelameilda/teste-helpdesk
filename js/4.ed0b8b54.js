(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{2740:function(e,t,a){"use strict";a.d(t,"a",(function(){return f}));a("7514"),a("7f7f");var r=a("970b"),n=a.n(r),i=a("5bc3"),s=a.n(i),o=a("9523"),l=a.n(o),c=[{name:"id",label:"#",align:"left",sortable:!0,field:"id"},{name:"data",label:"Data",align:"left",sortable:!0,field:"data"},{name:"usuario",label:"Usuário",align:"left",sortable:!0,field:"usuario"},{name:"categoria",label:"Categoria",align:"left",sortable:!0,field:"categoria"},{name:"subcategoria",label:"Sub - Categoria",align:"left",sortable:!0,field:"subcategoria"},{name:"titulo",label:"Título",align:"left",sortable:!0,field:"titulo"},{name:"status",label:"Status",align:"left",sortable:!0,field:"status"},{name:"prioridade",label:"Prioridade",align:"left",sortable:!0,field:"prioridade"},{name:"tecnico",label:"Técnico",align:"left",sortable:!0,field:"tecnico"},{name:"datafechamento",label:"Data Fechamento",align:"left",sortable:!0,field:"datafechamento"}],u=[{name:"nummdf",label:"Nº MDFe",align:"left",sortable:!0,field:"nummdf"}],d=function(){function e(){n()(this,e),l()(this,"keyGridCargas","@helpdesk/ordenacao-grid-tickets");var t=localStorage.getItem(this.keyGridCargas);t||this.saveGridCargas(c.map((function(e){return e.name})))}return s()(e,[{key:"getGrid",value:function(e){return"helpdesk"===e?c:"importacao"===e?u:void 0}},{key:"saveGridCargas",value:function(e){localStorage.setItem(this.keyGridCargas,JSON.stringify(e))}},{key:"redefinir",value:function(){localStorage.setItem(this.keyGridCargas,JSON.stringify(c.map((function(e){return e.name}))))}},{key:"loadGridCargas",value:function(){var e=[],t=JSON.parse(localStorage.getItem(this.keyGridCargas));return t.forEach((function(t){var a=c.find((function(e){return e.name===t}));e.push(a)})),e}},{key:"grids",get:function(){return[{label:"Cargas",value:"cargas"},{label:"Importação Cargas",value:"importacao"}]}}]),e}(),f=new d},"37dc":function(e,t,a){"use strict";var r=a("d062"),n=a.n(r);n.a},4639:function(e,t,a){"use strict";var r=a("e25a"),n=a.n(r);n.a},"98ab":function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"alert",staticClass:"alert"},[a("div",{staticClass:"left"},[a("span",{staticClass:"border",class:"bg-"+e.color}),a("span",{staticClass:"icon",class:e.color},[a("q-icon",{attrs:{name:e.icon}})],1)]),a("div",{staticClass:"content"},[a("div",{staticClass:"msg"},[a("span",{staticClass:"title"},[e._v(e._s(e.title))]),a("span",{staticClass:"caption"},[e._v(e._s(e.caption))])]),a("div",{staticClass:"close"},[a("button",{on:{click:e.close}},[a("i",{staticClass:"material-icons q-icon notranslate",attrs:{"aria-hidden":"true",role:"img"}},[e._v("close")])])])])])},n=[],i={props:{caption:String,title:String,type:{type:String,default:"info"}},mounted:function(){},methods:{close:function(){this.$refs.alert.remove(),this.$emit("close")}},computed:{icon:function(){switch(this.type){case"info":return"info";case"warn":return"warning";case"error":return"error";case"help":return"help";case"success":return"check_circle";default:return"info"}},color:function(){switch(this.type){case"info":return"info";case"warn":return"warn";case"error":return"error";case"help":return"help";case"success":return"success";default:return"info"}}}},s=i,o=(a("37dc"),a("2877")),l=a("0016"),c=a("eebe"),u=a.n(c),d=Object(o["a"])(s,r,n,!1,null,"b8d0040e",null);t["a"]=d.exports;u()(d,"components",{QIcon:l["a"]})},c7e9:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("cc-page",{attrs:{title:"Configurações da GRID"},scopedSlots:e._u([{key:"actions",fn:function(){return[a("div",{staticClass:"q-gutter-sm q-pa-sm"},[a("q-btn",{attrs:{color:"color1",label:"Redefinir"},on:{click:e.redefinir}}),a("q-btn",{attrs:{to:"/history/ticket/general",color:"color1",label:"Voltar"}})],1)]},proxy:!0}])},[a("div",{staticClass:"q-pa-md page"},[a("Alert",{staticClass:"q-mb-md",attrs:{title:"Dica",type:"help",caption:"Selecione uma coluna depois arraste para a posição desejada"}}),e.redefinicaoOK?a("Alert",{staticClass:"col-12",attrs:{title:"Colunas Redefinidas",type:"success",caption:"As colunas foram redefinidas para o padrão"}}):e._e(),e.rows?a("q-draggable-rows",{staticClass:"drag-rows q-pa-md",model:{value:e.order,callback:function(t){e.order=t},expression:"order"}},e._l(e.order,(function(t){return a("q-draggable-row",{key:t,staticClass:"drag",attrs:{id:t}},[a("div",{staticClass:"column"},[a("div",{staticClass:"label"},[e._v(e._s(e.getLabel(e.rows[t],t)))])])])})),1):e._e()],1)])},n=[],i=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("9523")),s=a.n(i),o=(a("7514"),a("7f7f"),a("2740")),l=a("98ab");function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function u(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){s()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var d={components:{Alert:l["a"]},mounted:function(){this.generateOrders()},data:function(){return{order:o["a"].loadGridCargas().map((function(e){return e.name})),depth:0,rows:null,grids:o["a"].grids,redefinicaoOK:!1,columns:o["a"].loadGridCargas(),form:{grid:null}}},watch:{order:function(e){o["a"].saveGridCargas(e)},form:{deep:!0,handler:function(e){var t=e.grid.value;this.columns=o["a"].getGrid(t),this.order=this.columns.map((function(e){return e.name})),this.generateOrders()}}},methods:{redefinir:function(){this.redefinicaoOK=!0,o["a"].redefinir(),this.order=o["a"].loadGridCargas().map((function(e){return e.name})),this.columns=o["a"].loadGridCargas(),this.generateOrders(),o["a"].saveGridCargas(this.order)},getLabel:function(e,t){return e.label},generateOrders:function(){var e=this,t={};this.order.forEach((function(a){var r=e.columns.find((function(e){return e.name===a}));t[a]=u({depth:0},r)})),this.rows=t,this.order=this.columns.map((function(e){return e.name}))}}},f=d,g=(a("4639"),a("2877")),p=a("9c40"),m=a("eebe"),b=a.n(m),h=Object(g["a"])(f,r,n,!1,null,"5fc3d7f0",null);t["default"]=h.exports;b()(h,"components",{QBtn:p["a"]})},d062:function(e,t,a){},e25a:function(e,t,a){}}]);