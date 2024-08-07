module.exports = [
  {
    key: 'almacen',
    name: 'Almacen',
    icon: 'inventory',
    child:[
      {
        key: 'almacen',
        name: 'Administrar Almacén',
        link: '/app/almacen',
        icon: 'inventory',
      },
    ]
  },
  {
    key: 'pages',
    name: 'Requisiciones',
    icon: 'ion-ios-paper-outline',
    child: [
      /*{
        key: 'main_page',
        name: 'Opciones',
        title: true,
      },*/
      {
        key: 'nueva-requisicion',
        name: 'Crear Requisición',
        link: '/app/requisiciones/Requisiciones',
        icon: 'ion-ios-home-outline',
      },
      {
        key: 'SolicitudRequisicion',
        name: 'Solicitud de Permiso',
        link: '/app/solicitud-requisicion',
        icon: 'ion-ios-home-outline',
      },
      {
        key: 'Lista Requisiciones',
        name: 'Lista Requisiciones',
        link: '/app/lista-requisiciones/Lista-requisiciones',
        icon: 'ion-ios-list-box-outline',
      },
      
      /*{
        key: 'maintenance',
        name: 'Maintenance',
        link: '/maintenance',
        icon: 'ion-ios-build-outline'
      },
      {
        key: 'coming_soon',
        name: 'Coming Soon',
        link: '/coming-soon',
        icon: 'ion-ios-bonfire-outline'
      },*/
    ]
  },
  /*{
    key: 'auth',
    name: 'Auth Page',
    icon: 'ion-ios-contact-outline',
    child: [
      {
        key: 'auth_page',
        name: 'User Authentication',
        title: true,
      },
      {
        key: 'login',
        name: 'Login',
        link: '/login',
        icon: 'ion-ios-person-outline'
      },
      {
        key: 'register',
        name: 'Register',
        link: '/register',
        icon: 'ion-ios-key-outline'
      },
      {
        key: 'reset',
        name: 'Reset Password',
        link: '/reset-password',
        icon: 'ion-ios-undo-outline'
      },
    ]
  },
  {
    key: 'errors',
    name: 'Errors',
    icon: 'ion-ios-paw-outline',
    child: [
      {
        key: 'errors_page',
        name: 'Errors Pages',
        title: true,
      },
      {
        key: 'not_found_page',
        name: 'Not Found Page',
        link: '/app/pages/not-found',
        icon: 'ion-ios-warning-outline'
      },
      {
        key: 'error_page',
        name: 'Error Page',
        link: '/app/pages/error',
        icon: 'ion-ios-warning-outline'
      },
    ]
  },
  {
    key: 'menu_levels',
    name: 'Menu Levels',
    multilevel: true,
    icon: 'ion-ios-menu-outline',
    child: [
      {
        key: 'level_1',
        name: 'Level 1',
        link: '/#'
      },
      {
        key: 'level_2',
        keyParent: 'menu_levels',
        name: 'Level 2',
        child: [
          {
            key: 'sub_menu_1',
            name: 'Sub Menu 1',
            link: '/#'
          },
          {
            key: 'sub_menu_2',
            name: 'Sub Menu 2',
            link: '/#'
          },
        ]
      },
    ]
  },
  {
    key: 'no_child',
    name: 'One Level Menu',
    icon: 'ion-ios-document-outline',
    linkParent: '/app/blank-page',
  }*/
];
