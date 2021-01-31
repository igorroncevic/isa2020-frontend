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
        path: '/counselings/patient/:patientId',
        component: () => import('pages/terms/CancelCounseling.vue')
      },
      {
        path: '/phadmin/profile',
        component: () => import('pages/profiles/PharmacyAdminProfile.vue')
      },
      {
        path: '/pharmacists',
        component: () => import('pages/PharmacistsList.vue')
      },
      {
        path: '/dermatologists',
        component: () => import('pages/DermatologistsList.vue')
      }
    ]
  },
  {
    path: '/doctor',
    component: () => import('layouts/DoctorLayout.vue'),
    children: [
      { path: 'derm', component: () => import('pages/homePages/DoctorDermHomepage.vue') },
      { path: 'pharm', component: () => import('pages/homePages/DoctorPharmHomepage.vue') },
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
