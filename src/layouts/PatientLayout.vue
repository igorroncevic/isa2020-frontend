<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawerOpen = !drawerOpen" />

        <q-toolbar-title>
          <q-avatar size="32px">
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          ISA Pharmacy
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="drawerOpen"
      side="left"
      behavior="desktop"
      bordered
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <MenuCard
            v-for="link in menuItems"
            :key="link.title"
            :link="link.link"
            :title="link.title"
            :icon="link.icon"
            :active="activeDrawerItem(link.link)"
          />
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="./../../public/icons/avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Patient Name</div>
          <div>patientemail@gmail.com</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuCard from "components/MenuCard.vue";

export default {
  components: { MenuCard },
  data() {
    return {
      drawerOpen: false,
      menuItems: [
        {
          title: "Home",
          icon: "home",
          link: "/patient/home",
        },
        {
          title: "Upcoming Terms",
          icon: "event",
          link: "/patient/calendar",
        },
        {
          title: "Schedule Term",
          icon: "schedule_send",
          link: "/patient/schedule",
        },
        {
          title: "Medicines",
          icon: "medication",
          link: "/patient/medicines",
        },
        {
          title: "Pharmacies",
          icon: "home_work",
          link: "/patient/pharmacies",
        },
        {
          title: "My profile",
          icon: "account_circle",
          link: "/patient/profile",
        },
        {
          title: "Log out",
          icon: "logout",
        },
      ],
    };
  },
  methods:{
      activeDrawerItem(link){
        return this.$router.currentRoute.fullPath == link
      }
  }
};
</script>