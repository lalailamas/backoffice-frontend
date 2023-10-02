export const menuItems = [
  {
    label: 'Dashboard',
    icon: 'rotate-180',
    subMenuLinks: [
      { label: 'Dashboard', href: '/dashboard' }
    ]
  },
  {
    label: 'Inventario',
    icon: 'rotate-180',
    subMenuLinks: [
      { label: 'Productos', href: '/inventory' },
      { label: 'Órdenes de reabastecimiento', href: '/replenishment_orders' }
    ]
  },
  {
    label: 'Reposiciones',
    icon: 'rotate-180',
    subMenuLinks: [
      { label: 'Reponer tienda', href: '/restock' },
      { label: 'Historial de reposiciones', href: '/replacements' }
    ]
  },
  {
    label: 'Tiendas',
    icon: 'rotate-180',
    subMenuLinks: [
      { label: 'Stock actual productos', href: '/stock' },
      { label: 'Stock por maquina', href: '/stock_request' }
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
