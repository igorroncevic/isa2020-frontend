<template>
    <div class="q-pa-xl row justify-center">
    <q-card class="my-card" style="width:900px">
      <q-card-section class="bg-primary text-white">
        <div class="text-h4 text-bold">Welcome to ISA Pharmacy</div>
        <div class="text-subtitle1">Account confirmation</div>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section>
        <div class="row">
            <div class="col-9 text-h5 text-bold text-center q-mt-lg text-grey-8">Your ISA Pharmacy online account has been created</div>
            <div class="col-3 q-mt-md" align="right">
                <q-img src="../../assets/pictures/verified-account.png"
                    height="100px"
                    width="100px"
                />
            </div>
        </div>
        <div class="text-h6 q-mt-md q-ml-xl text-grey-6">You have been successfully registered!</div>
        <div class="text-h6 q-mt-md q-ml-xl text-grey-6">Now you can log in to your account and use our services.</div>
        <div class="row justify-center q-mt-xl q-mb-sm">
            <q-btn v-on:click="logIn" push color="primary" label="Log in" />
        </div>
      </q-card-section>
    </q-card>
    </div>
</template>

<script>

export default {
  mounted () {
    this.$axios.put('http://localhost:8085/api/patients/activate/' + this.$route.params.id)
  },
  methods: {
    logIn () {
      this.$router.push('/register')
    }
  }
}
</script>
