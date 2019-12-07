
export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },

  // user
  {
    path: '/Home',
    component: '../layouts/BlankLayout',
    routes: [
      { path: '/Home', redirect: '/Home/HomePage' },
      { path: '/Home/HomePage', name: 'HomePage', component: './Home/HomePage' },

      {
        component: '404',
      },
    ],
  },

  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // Entrustment
      { path: '/', redirect: '/Company/PreCompany',authority: ['admin', 'user']},


      {
        path: '/Cargo',
        icon: 'profile',
        name: 'Cargo',
        routes: [



          {
            path: '/Cargo/CargoInfo',
            name: 'CargoInfo',
            component: './Cargo/CargoInfo',
          },
          {
            path: '/Cargo/ItemList',
            name: 'ItemList',
            component: './Cargo/ItemList',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/Cargo/StandardList',
            name: 'StandardList',
            component: './Cargo/StandardList',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },


          {
            path: '/Cargo/CargoSort1',
            name: 'CargoSort1',
            component: './Cargo/CargoSort1',
          },

          {
            path: '/Cargo/CargoSort2',
            name: 'CargoSort2',
            component: './Cargo/CargoSort2',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },




          {
            path: '/Cargo/CNASTwo',
            name: 'CNASTwo',
            component: './Cargo/CNASTwo',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            path: '/Cargo/CNASThree',
            name: 'CNASThree',
            component: './Cargo/CNASThree',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },


          {
            path: '/Cargo/CNASOne',
            name: 'CNASOne',
            component: './Cargo/CNASOne',
          },

          {
            path: '/Cargo/CNASFour',
            name: 'CNASFour',
            component: './Cargo/CNASFour',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },


        ],
      },

      {
        path: '/Company',
        icon: 'file',
        name: 'Company',
        routes: [

          {
            path: '/Company/PreCompany',
            name: 'PreCompany',
            component: './Company/PreCompany',
          },

          {
            path: '/Company/Company',
            name: 'Company',
            component: './Company/Company',
          },

          {
            path: '/Company/CNASCheckFourCertCode',
            name: 'CNASCheckFourCertCode',
            component: './Company/CNASCheckFourCertCode',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
        ],
      },



      {
        component: '404',
      },
    ],
  },
];
