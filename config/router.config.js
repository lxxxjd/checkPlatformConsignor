
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
      { path: '/', redirect: 'Applicant/Application',authority: ['admin', 'user']},

      // {
      //   path: '/Company',
      //   icon: 'file',
      //   name: 'Company',
      //   routes: [

      //     {
      //       path: '/Company/PreCompany',
      //       name: 'PreCompany',
      //       component: './Company/PreCompany',
      //     },

      //   ],
      // },
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
          {
            path: '/Applicant/CopyApplication',
            name: 'CopyApplication',
            component: './Applicant/CopyApplication',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/Applicant/ModifyApplication',
            name: 'ModifyApplication',
            component: './Applicant/ModifyApplication',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/Applicant/Accept',
            name: 'Accept',
            component: './Applicant/Accept',
          },
          {
            path: '/Applicant/UnAccept',
            name: 'UnAccept',
            component: './Applicant/UnAccept',
          },
          {
            path: '/Applicant/DetailForUnAccept',
            name: 'DetailForUnAccept',
            component: './Applicant/DetailForUnAccept',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/Applicant/ModifyRecord',
            name: 'ModifyRecord',
            component: './Applicant/ModifyRecord',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/Applicant/AddAttention',
            name: 'AddAttention',
            component: './Applicant/AddAttention',
          },
          {
            path: '/Applicant/DetailForAccept',
            name: 'DetailForAccept',
            component: './Applicant/DetailForAccept',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/Applicant/CertificateDetail',
            name: 'CertificateDetail',
            component: './Applicant/CertificateDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/Applicant/SearchCert',
            name: 'SearchCert',
            component: './Applicant/SearchCert',
          },
        ],
      },

      {
        path: '/Manage',
        icon: 'file',
        name: 'Manage',
        routes: [

          {
            path: '/Manage/ManagePlace',
            name: 'ManagePlace',
            component: './Manage/ManagePlace',
          },
          {
            path: '/Manage/ManageCargo',
            name: 'ManageCargo',
            component: './Manage/ManageCargo',
          },
          {
            path: '/Manage/UserInfo',
            name: 'UserInfo',
            component: './Manage/UserInfo',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
