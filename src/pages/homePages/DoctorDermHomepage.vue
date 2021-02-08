<template>
<q-page padding>
  <VacationDialog :vacation="vacation"/>
    <div class="row justify-around q-gutter-y-xl">
    <div class="column col-md-4 col-sm-6 items-center">
      <q-card
            class="my-card text-white"
            style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);max-width:400px"
          >
          <router-link to="patients" style="text-decoration:none;color:white">
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
          <router-link to="startChekup" style="text-decoration:none;color:white">
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
      <q-card-section @click="vacation=false;vacation=true" >
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
          <router-link to="derm/schedule" style="text-decoration:none;color:white">
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
          <router-link to="acc" style="text-decoration:none;color:white">
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
import VacationDialog from '../../components/VacationRequestDialog'
export default {
  components: {
    VacationDialog
  },
  data () {
    return {
      vacation: false
    }
  }
}
</script>
