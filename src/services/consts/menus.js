export const cardHomeMenus = [
  {
    title: "Novo Chamado",
    subTitle: "Abrir novo chamado",
    icon: "fas fa-file-alt",
    color: "deep-orange-6",
    path: "new-ticket",
    lorem:
      "Nossos Técnicos Estão Preparados e dispostos a receber sua solicitação, e a te ajudar a solucionar as suas demandas de tecnologia."
  },

  {
    title: "Histórico",
    subTitle: "Visualizar chamados abertos anteriormente",
    icon: "fas fa-history",
    color: "brown",
    path: "history/ticket/general",
    lorem:
      "Nossos Técnicos Estão Preparados e dispostos a receber sua solicitação, e a te ajudar a solucionar as suas demandas de tecnologia."
  }
];

export const categoryTree = [
  {
    label: "CATEGORIA DE CHAMADO",
    story: "Escolha uma categoria de acordo com a sua necessidade!",
    header: "root",
    children: [
      {
        label: "INFRA ESTRUTURA",
        icon: "fas fa-cogs",
        children: [
          {
            label: "Infra de Rede",
            story: "Solicitar novo ponto de rede ou similar.",
            link: true,
            codSubCategoria: 22,
            codCategoria: { label: "Infra Estrutura", value: 7 }
          },
          {
            label: "Circuito Fechado de Televisão (CFTV)",
            story: "Assuntos relacionados ao monitoramento",
            link: true,
            codSubCategoria: 21,
            codCategoria: { label: "Infra Estrutura", value: 7 }
          },
          {
            label: "Controle de Acesso",
            story: "Vídeo Porteiro",
            link: true,
            codSubCategoria: 24,
            codCategoria: { label: "Infra Estrutura", value: 7 }
          }
        ]
      },
      {
        label: "NOVO USUÁRIO",
        icon: "fas fa-user-plus",
        children: [
          {
            label: "Usuário de Winthor / Rede / Spark",
            story: "Solicitar a criação de usuário no Winthor, Rede e Spark",
            link: true,
            codSubCategoria: 27,
            codCategoria: { label: "Novo Usuário", value: 1 }
          },

          {
            label: "Rodopar",
            story: "Solicitar a criação de usuário no Rodopar",
            link: true,
            codSubCategoria: 5,
            codCategoria: { label: "Novo Usuário", value: 1 }
          }
        ]
      },
      {
        label: "INTERNET",
        icon: "fab fa-internet-explorer",
        children: [
          {
            label: "Liberar Acesso",
            link: true,
            story: "Solicitar acesso a um Site ou Link específico",
            codSubCategoria: 9,
            codCategoria: { label: "Internet", value: 3 }
          },
          {
            label: "Retirar Acesso",
            link: true,
            story: "Solicitar a remoção de acesso a um Site ou Link específico",
            codSubCategoria: 10,
            codCategoria: { label: "Internet", value: 3 }
          },
          {
            label: "Problemas",
            link: true,
            story: "Algum Site que não esteja abrindo ou outros problemas",
            codSubCategoria: 16,
            codCategoria: { label: "Internet", value: 3 }
          }
        ]
      },
      {
        label: "COMPRAS",
        icon: "fas fa-cart-plus",
        children: [
          {
            label: "Nova Impressora",
            link: true,
            story: "Impressora Zebra ou Cartucho de Tinta",
            codSubCategoria: 25,
            codCategoria: { label: "Compras", value: 5 }
          },
          {
            label: "Novo PC",
            link: true,
            story: "Nova máquina ou troca por novo equipamento",
            codSubCategoria: 11,
            codCategoria: { label: "Compras", value: 5 }
          },
          {
            label: "Novo Telefone",
            link: true,
            story: "SmartPhone ou Ramal",
            codSubCategoria: 12,
            codCategoria: { label: "Compras", value: 5 }
          },
          {
            label: "Outros Equipamentos",
            link: true,
            story: "Equipamentos relacionados a técnologia",
            codSubCategoria: 13,
            codCategoria: { label: "Compras", value: 5 }
          }
        ]
      },
      {
        label: "WINTHOR",
        icon: "fab fa-weebly",
        children: [
          {
            label: "Erro ou Dúvida",
            link: true,
            story: "Informar inconsistências ou dúvidas no ERP",
            codSubCategoria: 6,
            codCategoria: { label: "Winthor", value: 2 }
          },
          {
            label: "Liberar Rotinas",
            link: true,
            story: "Solicitar acesso a rotinas do sistema",
            codSubCategoria: 7,
            codCategoria: { label: "Winthor", value: 2 }
          },
          {
            label: "Melhorias",
            link: true,
            story: "Solicitar melhorias ou alterações no sistema",
            codSubCategoria: 8,
            codCategoria: { label: "Winthor", value: 2 }
          },
          {
            label: "Retirar Acesso a Rotinas",
            link: true,
            story: "Solicitar a remoção de acesso de rotinas",
            codSubCategoria: 15,
            codCategoria: { label: "Winthor", value: 2 }
          }
        ]
      },
      {
        label: "E-MAIL",
        icon: "fas fa-mail-bulk",
        children: [
          {
            label: "Alteração de Senha",
            link: true,
            story: "Alterar senha do e-mail",
            codSubCategoria: 19,
            codCategoria: { label: "E-Mail", value: 4 }
          },
          {
            label: "Outro",
            link: true,
            story: "Caixa de E-mail cheia p/Ex",
            codSubCategoria: 20,
            codCategoria: { label: "E-Mail", value: 4 }
          },
          {
            label: "Novo E-mail",
            link: true,
            story: "Criar novo endereço de E-mail",
            codSubCategoria: 2,
            codCategoria: { label: "E-Mail", value: 1 }
          }
        ]
      },
      {
        label: "OUTROS",
        icon: "fas fa-asterisk",
        children: [
          {
            label: "Pastas de Rede",
            link: true,
            story: "Solicitar acesso a pastas de rede (Ex: U:\\*)",
            codSubCategoria: 26,
            codCategoria: { label: "Outros", value: 8 }
          },
          {
            label: "Suporte Geral",
            link: true,
            story: "Situações não relacionadas acima (Suporte em Geral)",
            codSubCategoria: 23,
            codCategoria: { label: "Outros", value: 8 }
          }
        ]
      }
    ]
  }
];

export const historyMenus = [
  {
    title: "Infra Estrutura",
    categoria: 7,
    relatorios: [
      {
        subcategoria: 22,
        titleRel: "Infra de Rede",
        icon: "fas fa-cogs",
        descriptionRel: "Visualizar apenas chamados de infra de rede"
      },
      {
        subcategoria: 21,
        titleRel: "Circuito Fechado de Televisão (CFTV)",
        icon: "fas fa-cogs",
        descriptionRel: "Visualizar apenas chamados de CFTV"
      },
      {
        subcategoria: 24,
        titleRel: "Controle de Acesso",
        icon: "fas fa-cogs",
        route: "history/ticket/general",
        descriptionRel: "Visualizar apenas chamados de Controle de Acesso"
      },
      {
        categoria: 7,
        titleRel: "Todos",
        icon: "fas fa-cogs",
        descriptionRel: "Visualizar todos os chamados de Infra Estrutura"
      }
    ]
  },
  {
    title: "Novo Usuário",
    categoria: 1,
    relatorios: [
      {
        subcategoria: 1,
        titleRel: "Usuário de Winthor",
        icon: "fas fa-user-plus",
        descriptionRel: "Visualizar chamados de novo usuário de Winthor"
      },
      {
        subcategoria: 2,
        titleRel: "E-Mails",
        icon: "fas fa-user-plus",
        descriptionRel: "Visualizar chamados de E-Mail"
      },
      {
        subcategoria: "3,4",
        titleRel: "Rede/Spark",
        icon: "fas fa-user-plus",
        descriptionRel: "Visualizar chamados de Rede e/ou Spark"
      },
      {
        categoria: 1,
        titleRel: "Todos",
        icon: "fas fa-user-plus",
        descriptionRel: "Visualizar todos os chamados de Novo Usuário"
      }
    ]
  },
  {
    title: "Internet",
    categoria: 3,
    relatorios: [
      {
        subcategoria: 9,
        titleRel: "Liberar Acesso",
        icon: "fab fa-internet-explorer",
        descriptionRel: "Visualizar chamados de Liberação de Acesso"
      },
      {
        subcategoria: 10,
        titleRel: "Retirar Acesso",
        icon: "fab fa-internet-explorer",
        descriptionRel: "Visualizar chamados de Revogação de Acesso"
      },
      {
        subcategoria: 16,
        titleRel: "Problemas",
        icon: "fab fa-internet-explorer",
        descriptionRel: "Visualizar chamados de Problemas de Internet"
      },
      {
        categoria: 3,
        titleRel: "Todos",
        icon: "fab fa-internet-explorer",
        descriptionRel: "Visualizar todos os chamados de Internet"
      }
    ]
  },
  {
    title: "Compras",
    categoria: 5,
    relatorios: [
      {
        subcategoria: 25,
        titleRel: "Nova Impressora",
        icon: "fas fa-cart-plus",
        descriptionRel: "Visualizar chamados de Nova Impressora"
      },
      {
        subcategoria: 11,
        titleRel: "Novo PC",
        icon: "fas fa-cart-plus",
        descriptionRel: "Visualizar chamados de Novo PC"
      },
      {
        subcategoria: 12,
        titleRel: "Novo Telefone",
        icon: "fas fa-cart-plus",
        descriptionRel: "Visualizar chamados de Novo Telefone"
      },
      {
        subcategoria: 13,
        titleRel: "Outros Equipamentos",
        icon: "fas fa-cart-plus",
        descriptionRel: "Visualizar chamados de Outros Equipamentos"
      },
      {
        categoria: 5,
        titleRel: "Todos",
        icon: "fas fa-cart-plus",
        descriptionRel: "Visualizar todos os chamados de Internet"
      }
    ]
  },
  {
    title: "Winthor",
    categoria: 2,
    relatorios: [
      {
        subcategoria: 6,
        titleRel: "Erro ou Dúvida",
        icon: "fab fa-weebly",
        descriptionRel: "Visualizar chamados de Erro ou Dúvida"
      },
      {
        subcategoria: 7,
        titleRel: "Liberar Rotinas",
        icon: "fab fa-weebly",
        descriptionRel: "Visualizar chamados de Liberação de Rotinas"
      },
      {
        subcategoria: 8,
        titleRel: "Melhorias",
        icon: "fab fa-weebly",
        descriptionRel: "Visualizar chamados de Melhorias"
      },
      {
        subcategoria: 15,
        titleRel: "Retirar Acesso a Rotinas",
        icon: "fab fa-weebly",
        descriptionRel: "Visualizar chamados de Revogação de Rotinas"
      },
      {
        categoria: 2,
        titleRel: "Todos",
        icon: "fab fa-weebly",
        descriptionRel: "Visualizar todos os chamados de Winthor"
      }
    ]
  },
  {
    title: "E-Mail",
    categoria: 4,
    relatorios: [
      {
        subcategoria: 19,
        titleRel: "Alteração de Senha",
        icon: "fas fa-mail-bulk",
        descriptionRel: "Visualizar chamados de Alteração de Senha"
      },
      {
        subcategoria: 20,
        titleRel: "Outro",
        icon: "fas fa-mail-bulk",
        descriptionRel: "Visualizar chamados de Outros"
      },
      {
        categoria: 4,
        titleRel: "Todos",
        icon: "fas fa-mail-bulk",
        descriptionRel: "Visualizar todos os chamados de Winthor"
      }
    ]
  },
  {
    title: "Outros",
    categoria: 8,
    relatorios: [
      {
        subcategoria: 26,
        titleRel: "Pastas de Rede",
        icon: "fas fa-asterisk",
        descriptionRel: "Visualizar chamados de Pastas de Rede"
      },
      {
        subcategoria: 23,
        titleRel: "Suporte Geral",
        icon: "fas fa-asterisk",
        descriptionRel: "Visualizar chamados de Suporte Geral"
      },
      {
        categoria: 8,
        titleRel: "Todos",
        icon: "fas fa-asterisk",
        descriptionRel: "Visualizar todos os chamados de Outros"
      }
    ]
  },
  {
    title: "Todos",
    categoria: "1,2,3,4,5,6,7,8",
    relatorios: [
      {
        categoria: "1,2,3,4,5,6,7,8",
        titleRel: "Todas as Categorias",
        icon: "fas fa-globe-americas",
        descriptionRel: "Visualizar todas as categorias de chamados"
      }
    ]
  }
];
