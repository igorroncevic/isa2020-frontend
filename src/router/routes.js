const routes = [
  {
    path: '/',
    component: () => import('layouts/DoctorLayout.vue'),
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
        path: '/counselings/schedule',
        component: () => import('pages/terms/ScheduleCounseling.vue')
      },
      {
        path: '/phadmin/profile',
        component: () => import('pages/terms/PharmacyAdminProfile.vue')
      }
    ]
  },
  {
    path: '/doctor',
    component: () => import('layouts/DoctorLayout.vue'),
    children: [
      { path: 'derm', component: () => import('pages/homePages/DoctorDermHomepage.vue') },
      { path: 'acc', component: () => import('pages/profiles/DoctorProfile.vue') }
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
