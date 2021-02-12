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
        </q-toolbar-title>

        <q-icon name="account_circle" size="md"/>
        <div>Supplier</div>
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
    link: '/supplier/acc'
  },
  {
    title: 'My medicines',
    caption: 'quasar.dev',
    icon: 'medical_services',
    link: '/supplier/meds'
  },
  {
    title: 'Create new purchase offer',
    caption: 'quasar.dev',
    icon: 'post_add',
    link: '/supplier/allpurchaseorders'
  },
  {
    title: 'My purchase offers',
    caption: 'quasar.dev',
    icon: 'list_alt',
    link: '/supplier/purchaseorders'
  },
  {
    title: 'Log out',
    caption: 'quasar.dev',
    icon: 'logout'
  }
]

export default {
  name: 'InformationalSystemAdminLayout',
  components: { MenuCard },
  data () {
    return {
      leftDrawerOpen: false,
      menuItems: menuData
    }
  }
}
</script>
