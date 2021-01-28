<template>
<q-page padding>
    <div class="row justify-around q-gutter-y-xl">
    <div class="column col-md-4 col-sm-6 items-center">
      <q-card
            class="my-card text-white"
            style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);max-width:400px"
          >
          <router-link to="doctor/patients" style="text-decoration:none;color:white">
    <q-card-section>
              <div class="row justify-center">
                <div class="text-h4">My patients</div>
              </div>
              <div class="row justify-center">
                  <q-img src="./../../assets/pictures/patients.jpg"
                    height="250px"
                    width="350px"></q-img>
                </div>
            </q-card-section>
          </router-link>
      </q-card>
    </div>
    <div class="column col-md-4 col-sm-6 items-center">
      <q-card
            class="my-card text-white"
            style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);max-width:400px"
          >
          <router-link to="doctor/startChekup" style="text-decoration:none;color:white">
    <q-card-section>
              <div class="row justify-center">
                <div class="text-h4">Start checkup</div>
              </div>
              <div class="row justify-center">
                  <q-img src="./../../assets/pictures/startCheckup.jpg"
                    height="250px"
                    width="350px"></q-img>
                </div>
            </q-card-section>
          </router-link>
      </q-card>
    </div>
    <div class="column col-md-4 col-sm-6 items-center">
      <q-card
            class="my-card text-white"
            style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);max-width:400px"
          >
          <router-link to="doctor/newCheckup" style="text-decoration:none;color:white">
      <q-card-section >
              <div class="row justify-center">
                <div class="text-h4">New chekup</div>
                <q-icon name="add_circle" size="md"/>
              </div>
              <div class="row justify-center">
                  <q-img src="./../../assets/pictures/addCheckup.png"
                    height="250px"
                    width="350px"></q-img>
                </div>
            </q-card-section>
          </router-link>
      </q-card>
    </div>
    <div class="column col-md-4 col-sm-6 items-center">
      <q-card
            class="my-card text-white"
            style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);max-width:400px"
          >
          <router-link to="vacationRequest" style="text-decoration:none;color:white">
      <q-card-section >
              <div class="row justify-center">
                <div class="text-h4">Vacation request</div>
                <q-icon name="add_circle" size="md"/>
              </div>
              <div class="row justify-center">
                  <q-img src="./../../assets/pictures/vacation.jpg"
                    height="250px"
                    width="350px"></q-img>
                </div>
            </q-card-section>
          </router-link>
      </q-card>
    </div>
    <div class="column col-md-4 col-sm-6 items-center">
      <q-card
            class="my-card text-white"
            style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);max-width:400px"
          >
          <router-link to="doctor/calendar" style="text-decoration:none;color:white">
      <q-card-section >
              <div class="row justify-center">
                <div class="text-h4">My calendar</div>
              </div>
              <div class="row justify-center">
                  <q-img src="./../../assets/pictures/calendar.jpg"
                    height="250px"
                    width="350px"></q-img>
                </div>
            </q-card-section>
          </router-link>
      </q-card>
    </div>
    <div class="column col-md-4 col-sm-6 items-center">
      <q-card
            class="my-card text-white"
            style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);max-width:400px"
          >
          <router-link to="doctor/acc" style="text-decoration:none;color:white">
      <q-card-section >
              <div class="row justify-center">
                <div class="text-h4">My profile</div>
              </div>
              <div class="row justify-center">
                  <q-img src="./../../assets/pictures/doctor1.png"
                    height="250px"
                    width="350px"></q-img>
                </div>
            </q-card-section>
          </router-link>
      </q-card>
    </div>
    </div>
</q-page>
</template>

<script>
import DoctorService from './../../services/DoctorService'
export default {
  data () {
    return {
      doctor: {},
      edit: false
    }
  },
  async mounted () {
    this.doctor = await DoctorService.getMyData()
  },
  methods: {
    async onSubmit () {
      var res = await DoctorService.updateUserData(this.doctor)
      if (res === 'err') {
        this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
      this.edit = false
    }
  }
}
</script>
