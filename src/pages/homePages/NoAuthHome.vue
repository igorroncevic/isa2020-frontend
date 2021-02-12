<template>
  <q-page class="q-pa-xl noauth-grid">
    <div class="text-h4 text-primary noauth-title">Welcome to our ISA pharmacy!</div>
    <div class="text-h5 centralize-text">
      As an unauthorized user, feel free to explore our medicines and
      pharmacies, but before you go on and actually interact with them, you
      should <router-link to="/register" style="text-decoration: none;" > log in.</router-link>
    </div>
    <div class="text-h5 row justify-center">
      <q-icon name="keyboard_backspace" size="100px" color="primary" />
    </div>
  </q-page>
</template>

<script>
export default {
  methods: {
    navigateToLogin () {
      this.$router.push({ path: '/register' })
    }
  }
}
</script>

<style scoped>
.noauth-grid{
    display: grid;
    grid-template-rows: 5rem 10rem 10rem;
    justify-items: center;
}

.noauth-title{
    grid-row: 1;
}

.centralize-text {
  max-width: 70%;
  text-align: center;
  vertical-align: center;
  grid-row: 2;
}

</style>
