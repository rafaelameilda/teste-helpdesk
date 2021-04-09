const Index = () => import("pages/Index.vue");
const MainLayout = () => import("layouts/MainLayout.vue");
const MainNewTicket = () => import("pages/NewTicket/Main.vue");
const OptionMenu = () => import("pages/NewTicket/OptionMenu.vue");
const FormularioNewTicket = () =>
  import("pages/NewTicket/FormularioNewTicket.vue");
const FormularioNewUsers = () =>
  import("pages/NewTicket/FormularioNewUsers.vue");
const FormularioAcessoFolders = () =>
  import("pages/NewTicket/FormularioAcessoFolders.vue");
const MainHistoryTicket = () => import("pages/HistoryTicket/Main.vue");
const HistoryTicket = () => import("pages/HistoryTicket/HistoryTicket.vue");
const DetailTicket = () => import("pages/DetailTicket/DetailTicket.vue");
const MainGrid = () => import("pages/configuracoes/grid/Main.vue");
const ConfigGridTicket = () =>
  import("pages/configuracoes/grid/ConfigGridTicket.vue");
const TimeLine = () => import("pages/TimeLine/TimeLine.vue");
const MainTimeLine = () => import("pages/TimeLine/Main.vue");
const Login = () => import("pages/Login.vue");

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: Index },
      {
        path: "new-ticket",
        component: MainNewTicket,
        children: [
          {
            path: "",
            component: OptionMenu
          },
          {
            path: "formulario",
            component: FormularioNewTicket
          },
          {
            path: "newuser",
            component: FormularioNewUsers
          },
          {
            path: "access-folder",
            component: FormularioAcessoFolders
          }
        ]
      },
      {
        path: "history/ticket",
        component: MainHistoryTicket,
        children: [
          {
            path: "general",
            component: HistoryTicket
          }
        ]
      },

      {
        path: "history/ticket/view/detail/ticket/:id",
        component: DetailTicket
      },

      {
        path: "configuracoes/grid",
        component: MainGrid,
        children: [
          {
            path: "ticket",
            component: ConfigGridTicket
          }
        ]
      },
      {
        path: "history/ticket/view",
        component: MainTimeLine,
        children: [
          {
            path: "detail/ticket/timeline/:id",
            component: TimeLine
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    component: Login
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
