<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Pharmacy
        </q-toolbar-title>

        <q-icon name="account_circle" size="md"/>
        <div>Pera Peric</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
        <p class="text-center">
          Menu
        </p>
        </q-item-label>
        <MenuCard
          v-for="link in menuItems"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuCard from 'components/MenuCard.vue'

const menuData = [
  {
    title: 'My profile',
    caption: 'quasar.dev',
    icon: 'account_circle',
    link: '/doctor/acc'
  },
  {
    title: 'My calendar',
    caption: 'quasar.dev',
    icon: 'event',
    link: '/doctor/calendar'
  },
  {
    title: 'My patients',
    caption: 'quasar.dev',
    icon: 'people',
    link: '/doctor/patients'
  },
  {
    title: 'Log out',
    caption: 'quasar.dev',
    icon: 'logout'
  }
]

export default {
  name: 'DoctorLayout',
  components: { MenuCard },
  data () {
    return {
      leftDrawerOpen: false,
      menuItems: menuData
    }
  }
}
</script>
