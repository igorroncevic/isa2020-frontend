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
      },
      {
        path: '/pharmacies',
        component: () => import('pages/PharmaciesList.vue')
      },
      {
        path: '/vacations',
        component: () => import('pages/VacationList.vue')
      },
      {
        path: '/mark',
        component: () => import('pages/Mark.vue')
      }
    ]
  },
  {
    path: '/patient',
    component: () => import('layouts/PatientLayout.vue'),
    children: [
      { path: 'profile', component: () => import('pages/profiles/PatientProfile.vue') },
      { path: 'medicines', component: () => import('pages/medicines/PatientMedicines.vue') },
      { path: 'medicines/reserve', component: () => import('pages/medicines/ReserveMedicines.vue') },
      { path: 'medicines/cancel', component: () => import('pages/medicines/CancelMedicines.vue') },
    ]
  },
  {
    path: '/doctor',
    component: () => import('layouts/DoctorLayout.vue'),
    children: [
      { path: 'derm', component: () => import('pages/homePages/DoctorDermHomepage.vue') },
      { path: 'pharm', component: () => import('pages/homePages/DoctorPharmHomepage.vue') },
      { path: 'acc', component: () => import('pages/profiles/DoctorProfile.vue') },
      { path: 'dispenseMedicine', component: () => import('pages/DispensingMedicine.vue') },
      { path: 'derm/startCheckup/:id', component: () => import('pages/termReports/Checkup.vue') },
      { path: 'pharm/startCounseling/:id', component: () => import('pages/termReports/Counseling.vue') },
      { path: 'patients', component: () => import('pages/DoctorPatients.vue') },
      { path: 'pharm/schedule', component: () => import('pages/DoctorSchedule.vue') }
    ]
  },
  {
    path: '/sysadmin',
    component: () => import('layouts/SysAdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/sysAdmin/SysAdminUserRegistration.vue') },
      { path: 'loyalty', component: () => import('pages/sysAdmin/LoyaltyProgramme.vue') },
      { path: 'codebook', component: () => import('pages/sysAdmin/MedicinesCodebook.vue') }
    ]
  },
  {
    path: '/patients/register',
    component: () => import('pages/registeredUser/Registration.vue')
  },
  {
    path: '/activate/:id',
    component: () => import('pages/registeredUser/AccountConfirmation.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
