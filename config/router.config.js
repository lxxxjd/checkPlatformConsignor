
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
        path: '/Company',
        icon: 'file',
        name: 'Company',
        routes: [

          {
            path: '/Company/PreCompany',
            name: 'PreCompany',
            component: './Company/PreCompany',
          },

        ],
      },
      {
        path: '/Applicant',
        icon: 'file',
        name: 'Applicant',
        routes: [
          {
            path: '/Applicant/Application',
            name: 'Application',
            component: './Applicant/Application',
          },
        ],
      },


      {
        component: '404',
      },
    ],
  },
];
