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
            @clicked="(title) => menuCardClicked(title)"
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
          <div class="text-weight-bold">{{ name }} {{ surname }}</div>
          <div>{{ email }}</div>
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
import { mapActions } from "vuex";
import { successfullyLoggedOut } from "./../notifications/patients";

export default {
  components: { MenuCard },
  mounted() {
    if (this.$store.getters.getJwt != "") {
      this.email = this.$store.getters.getEmail;
      this.name = this.$store.getters.getName;
      this.surname = this.$store.getters.getSurname;
    }
  },
  data() {
    return {
      email: "",
      name: "",
      surname: "",
      drawerOpen: false,
      anyOtherActive: false,
      menuItems: [
        {
          title: "Home",
          icon: "home",
          link: "/patient/",
        },
        {
          title: "Upcoming Terms",
          icon: "event",
          link: "/patient/calendar",
        },
        {
          title: "Term History",
          icon: "history",
          link: "/patient/history",
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
          link: "/patient/",
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      setJwt: "setJwt",
      setEmail: "setEmail",
      setName: "setName",
      setSurname: "setSurname",
      setId: "setId",
      setRole: "setRole",
    }),
    activeDrawerItem(link) {
      if (link == "/patient/") return false;
      let rest = String(link).substr("/patient/".length);
      return this.$route.path.includes(rest);
    },
    menuCardClicked(title) {
      if (title == "Log out") {
        this.setJwt("");
        this.setEmail("");
        this.setName("");
        this.setSurname("");
        this.setId("");
        this.setRole("");
        sessionStorage.clear();
        successfullyLoggedOut();
        // setTimeout(() => this.$router.push({ path: "/patient" }), 2000);
      }
    },
  },
};
</script>