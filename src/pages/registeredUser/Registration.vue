<template>
<div class="q-pa-xl row justify-center">
    <div class="q-gutter-y-md" style="max-width: 700px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Prijavite se" />
          <q-tab name="register" label="Registrujte se" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <div class="q-pa-md row items-center q-gutter-md">
                <q-card class="my-card">
                    <q-card-section>
                       <h4 class="text-primary text-center text-bold">Prijavite se</h4>
                    </q-card-section>
                    <q-separator></q-separator>
                    <q-card-section>
                    <div class="q-pa-md" style="width:600px">
                        <q-form class="q-gutter-md">
                            <q-input
                                filled
                                label="E-mail *"
                                hint="Unesite Vašu e-mail adresu"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Obavezno je popuniti ovo polje!']"
                            />
                            <q-input
                                filled
                                label="Lozinka *"
                                hint="Unesite Vašu lozinku"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Obavezno je popuniti ovo polje!']"
                            />
                            <div>
                                <q-btn label="Prijavi se" type="submit" color="primary"/>
                            </div>
                        </q-form>
                    </div>
                </q-card-section>
                </q-card>
            </div>
          </q-tab-panel>

          <q-tab-panel name="register">
            <div class="q-pa-md q-gutter-md col justify-end">
                <q-card class="my-card">
                    <q-card-section>
                       <h4 class="text-primary text-center text-bold">Registrujte se</h4>
                    </q-card-section>
                    <q-separator></q-separator>
                    <q-card-section>
                         <div class="q-pa-md" style="width:600px">
                            <q-form class="q-gutter-md">
                            <q-input
                                filled
                                label="Ime *"
                                hint="Unesite Vaše ime"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Obavezno je popuniti ovo polje!']"
                            />

                            <q-input
                                filled
                                label="Prezime *"
                                hint="Unesite Vaše prezime"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Obavezno je popuniti ovo polje!']"
                            />

                            <q-input
                                filled
                                label="Adresa *"
                                hint="Unesite Vašu adresu stanovanja"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Obavezno je popuniti ovo polje!']"
                            />

                            <q-input
                                filled
                                label="Grad *"
                                hint="Unesite naziv grada"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Obavezno je popuniti ovo polje!']"
                            />

                            <q-input
                                filled
                                label="Država *"
                                hint="Unesite naziv države"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Obavezno je popuniti ovo polje!']"
                            />

                            <q-input
                                filled
                                type="number"
                                label="Broj telefona *"
                                hint="Unesite Vaš broj telefona"
                                lazy-rules
                                :rules="[ val => val !== null && val !== '' || 'Unesite Vaš broj telefona',
                                         val => val > 0 && val < 100 || 'Obavezno je popuniti ovo polje!'
                                ]"
                            />

                            <q-input
                                filled
                                label="E-mail *"
                                hint="Unesite Vašu e-mail adresu"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Obavezno je popuniti ovo polje!']"
                            />

                            <q-input
                                filled
                                label="Lozinka *"
                                hint="Unesite lozinku"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Obavezno je popuniti ovo polje!']"
                            />

                             <q-input
                                filled
                                label="Lozinka *"
                                hint="Ponovite lozinku"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Obavezno je popuniti ovo polje!']"
                            />

                            <div>
                                <q-btn label="Registruj se" type="submit" color="primary"/>
                            </div>
                            </q-form>
                         </div>
                    </q-card-section>
                </q-card>
            </div>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      tab: 'login'
    }
  }
}
</script>
