const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: '/checkups/schedule',
        component: () => import('pages/terms/ScheduleCheckup.vue')
      },
      {
        path: '/checkups/patient/:patientId',
        component: () => import('pages/terms/CancelCheckup.vue')
      },
      {
        path: '/phadmin/profile',
        component: () => import('pages/terms/PharmacyAdminProfile.vue')
      },
      {
        path: 'users/register',
        component: () => import('pages/registeredUser/Registration.vue')
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
