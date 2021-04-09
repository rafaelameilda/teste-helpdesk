export const columnsPageListagemTicket = [
  {
    name: "id",
    label: "#",
    align: "left",
    sortable: true,
    field: "id",
  },

  {
    name: "data",
    label: "Data",
    align: "left",
    sortable: true,
    field: "data",
  },
  {
    name: "usuario",
    label: "Usuário",
    align: "left",
    sortable: true,
    field: "usuario",
  },
  {
    name: "categoria",
    label: "Categoria",
    align: "left",
    sortable: true,
    field: "categoria",
  },

  {
    name: "subcategoria",
    label: "Sub - Categoria",
    align: "left",
    sortable: true,
    field: "subcategoria",
  },

  {
    name: "titulo",
    label: "Título",
    align: "left",
    sortable: true,
    field: "titulo",
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    sortable: true,
    field: "status",
  },
  {
    name: "prioridade",
    label: "Prioridade",
    align: "left",
    sortable: true,
    field: "prioridade",
  },
  {
    name: "tecnico",
    label: "Técnico",
    align: "left",
    sortable: true,
    field: "tecnico",
  },
  {
    name: "datafechamento",
    label: "Data Fechamento",
    align: "left",
    sortable: true,
    field: "datafechamento",
  }
  
];

export const columnsPageExemple = [
  {
    name: "nummdf",
    label: "Nº MDFe",
    align: "left",
    sortable: true,
    field: "nummdf",
  }
];


export class GridService {

constructor() {
  const orders = localStorage.getItem(this.keyGridCargas)
  if(!orders) {
    this.saveGridCargas(columnsPageListagemTicket.map(col=> col.name))
  }
}

  keyGridCargas = '@helpdesk/ordenacao-grid-tickets'

  get grids() {
    return [
      { label: 'Cargas', value: 'cargas' },
      { label: 'Importação Cargas', value: 'importacao' },
    ]
  }

  getGrid(grid) {
    if (grid === 'helpdesk') {
      return columnsPageListagemTicket
    } else if (grid === 'importacao') {
      return columnsPageExemple
    }
  }

  saveGridCargas(orders) {
    localStorage.setItem(this.keyGridCargas, JSON.stringify(orders))
  }

  redefinir() {
    localStorage.setItem(this.keyGridCargas, JSON.stringify(columnsPageListagemTicket.map(col => col.name)))
  }
  loadGridCargas() {
    const columns = []
    const orders = JSON.parse(localStorage.getItem(this.keyGridCargas))
    
   orders.forEach(order => {
     const col = columnsPageListagemTicket.find(col => col.name === order)
     columns.push(col)
   });

    return columns
  }
}

const gridService = new GridService();

export { gridService }

