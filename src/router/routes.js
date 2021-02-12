const routes = [
  {
    path: '/',
    component: () => import('layouts/NoAuthLayout.vue'),
    children: [
      { path: 'pharmacies', component: () => import('pages/PharmaciesList.vue') },
      { path: 'medicines', component: () => import('pages/medicines/SearchMedicines.vue') },
      { path: '', component: () => import('pages/homePages/NoAuthHome.vue') }
    ]
  },
  {
    path: '/ostali',
    component: () => import('layouts/DoctorDermLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
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
        path: '/vacations',
        component: () => import('pages/VacationList.vue')
      },
      {
        path: '/pricings',
        component: () => import('pages/Pricings.vue')
      },
      {
        path: '/pharmacyMedicines',
        component: () => import('pages/PharmacyMedicines.vue')
      },
      {
        path: '/promotions',
        component: () => import('pages/Promotions.vue')
      },
      {
        path: '/orders',
        component: () => import('pages/Orders.vue')
      },
    ]
  },
  {
    path: '/patient',
    component: () => import('layouts/PatientLayout.vue'),
    children: [
      { path: 'calendar', component: () => import('pages/PatientCalendar.vue') },
      { path: 'history', component: () => import('pages/PatientHistory.vue') },
      { path: 'profile', component: () => import('pages/profiles/PatientProfile.vue') },
      { path: 'medicines', component: () => import('pages/medicines/PatientMedicines.vue') },
      { path: 'medicines/reserve', component: () => import('pages/medicines/ReserveMedicines.vue') },
      { path: 'pharmacies', component: () => import('pages/PharmaciesList.vue') },
      { path: 'schedule/checkups', component: () => import('pages/terms/ScheduleCheckup.vue') },
      { path: 'schedule/counselings', component: () => import('pages/terms/ScheduleCounseling.vue') },
      { path: 'mark', component: () => import('pages/Mark.vue') },
      { path: '', component: () => import('pages/homePages/PatientHome.vue') }
    ]
  },
  {
    path: '/doctor/derm',
    component: () => import('layouts/DoctorDermLayout.vue'),
    children: [
      { path: '', component: () => import('pages/homePages/DoctorDermHomepage.vue') },
      { path: 'acc', component: () => import('pages/profiles/DoctorProfile.vue') },
      { path: 'startcheckup/:id', component: () => import('pages/termReports/Checkup.vue') },
      { path: 'patients', component: () => import('pages/DoctorPatients.vue') },
      { path: 'schedule', component: () => import('pages/DermSchedule.vue') }
    ]
  },
  {
    path: '/doctor/pharm',
    component: () => import('layouts/DoctorPharmLayout.vue'),
    children: [
      { path: '', component: () => import('pages/homePages/DoctorPharmHomepage.vue') },
      { path: 'acc', component: () => import('pages/profiles/DoctorProfile.vue') },
      { path: 'dispenseMedicine', component: () => import('pages/DispensingMedicine.vue') },
      { path: 'startcounseling/:id', component: () => import('pages/termReports/Counseling.vue') },
      { path: 'patients', component: () => import('pages/DoctorPatients.vue') },
      { path: 'schedule', component: () => import('pages/PharmSchedule.vue') }
    ]
  },
  {
    path: '/sysadmin',
    component: () => import('layouts/SysAdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/sysAdmin/SysAdminUserRegistration.vue') },
      { path: 'loyalty', component: () => import('pages/sysAdmin/LoyaltyProgramme.vue') },
      { path: 'codebook', component: () => import('pages/sysAdmin/MedicinesCodebook.vue') },
      { path: 'complaints', component: () => import('pages/sysAdmin/UsersComplaints.vue') }
    ]
  },
  {
    path: '/supplier',
    component: () => import('layouts/SupplierLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PurchaseOrders.vue') },
      { path: 'acc', component: () => import('pages/profiles/SupplierProfile.vue') },
      { path: 'meds', component: () => import('pages/SupplierMedicines.vue') },
      { path: 'purchaseorders', component: () => import('pages/SupplierPurchaseOrders.vue') },
      { path: 'allpurchaseorders', component: () => import('pages/PurchaseOrders.vue') }
    ]
  },
  {
    path: '/register',
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
