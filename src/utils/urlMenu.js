export const menuItems = [
  // {
  //   label: 'Inicio',
  //   icon: 'rotate-180',
  //   subMenuLinks: [
  //     { label: 'Dashboard', href: '/dashboard' },
  //     { label: 'Marketing', href: '/marketing' }

  //   ]
  // },
  {
    label: 'Productos',
    icon: 'rotate-180',
    subMenuLinks: [
      { label: 'Categorías', href: '/categories' },

      { label: 'Productos', href: '/inventory' },
      // { label: 'Órdenes de reabastecimiento', href: '/replenishment_orders' }
      { label: 'Registro de compras', href: '/purchase_register' }

    ]
  },
  {
    label: 'Reposiciones',
    icon: 'rotate-180',
    subMenuLinks: [
      { label: 'Reponer tienda', href: '/restock' },
      // { label: 'Reponer tienda V.1', href: '/restock_copy' },

      { label: 'Historial de reposiciones', href: '/replacements' },
      { label: 'Lista de compras y reposición', href: '/shop_list' }
    ]
  },
  {
    label: 'Tiendas',
    icon: 'rotate-180',
    subMenuLinks: [
      // { label: 'Stock por máquina', href: '/stock_request' },
      { label: 'Ajuste de Stock y Precios', href: '/stock_adjustment' },
      // { label: 'Informe de Inventario', href: '/stock_overview' },
      { label: 'Ver detalle de tiendas', href: '/stores' }

    ]
  },
  {
    label: 'Layout',
    icon: 'rotate-180',
    subMenuLinks: [
      { label: 'Crear/Editar layout', href: '/layout' },
      { label: 'Generar Flejes', href: '/strap' }
    ]
  },
  {
    label: 'Clientes',
    icon: 'rotate-180',
    subMenuLinks: [
      { label: 'Listado', href: '/client/table-client' }
    ]
  },
  {
    label: 'Usuarios',
    icon: 'rotate-180',
    subMenuLinks: [
      { label: 'Listado', href: '/users' },
      { label: 'Crear Usuario', href: '/users/create' }
    ]
  }
  // {
  //   label: 'Tareas',
  //   icon: 'rotate-180',
  //   subMenuLinks: [
  //     { label: 'Listado Tareas', href: '/tasks' }
  //   ]
  // }
]
