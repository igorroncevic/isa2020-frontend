<template>
<q-page padding>
  <q-dialog v-model="startDialog">
      <q-card style="width:400px;height:120px">
        <q-card-section class="row items-center text-center bg-primary text-white q-pb-none">
          <div class="text-h6 text-center">Start counseling from</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="row items-center justify-around">
          <q-btn color="primary" > <router-link  style="text-decoration:none;color:white" to="pharm/schedule"> My calendar </router-link> </q-btn>
          <q-btn color="primary"> <router-link  style="text-decoration:none;color:white" to="pharm/patients">patient search </router-link> </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  <VacationDialog :vacation="vacation"/>
    <div class="row justify-around q-gutter-y-xl">
    <div class="column col-md-3 col-sm-6 items-center">
      <q-card
            class="my-card text-white"
            style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);max-width:400px"
          >
          <router-link to="pharm/patients" style="text-decoration:none;color:white">
    <q-card-section>
              <div class="row justify-center">
                <div class="text-h4">My patients</div>
              </div>
              <div class="row justify-center">
                  <q-img src="./../../assets/pictures/patients.jpg"
                    height="250px"
                    width="300px"></q-img>
                </div>
            </q-card-section>
          </router-link>
      </q-card>
    </div>
    <div class="column col-md-3 col-sm-6 items-center">
      <q-card
            class="my-card text-white"
            style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);max-width:400px"
          >
    <q-card-section @click="vacationDialog=false;startDialog=true">
              <div class="row justify-center">
                <div class="text-h4">Start counseling</div>
              </div>
              <div class="row justify-center">
                  <q-img src="./../../assets/pictures/startCheckup.jpg"
                    height="250px"
                    width="300px"></q-img>
                </div>
            </q-card-section>
      </q-card>
    </div>
     <div class="column col-md-3 col-sm-6 items-center">
      <q-card
            class="my-card text-white"
            style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);max-width:400px"
          >
          <router-link to="pharm/dispenseMedicine" style="text-decoration:none;color:white">
    <q-card-section>
              <div class="row justify-center">
                <div class="text-h4">Dispense medicine</div>
              </div>
              <div class="row justify-center">
                  <q-img src="./../../assets/pictures/drug.jpg"
                    height="250px"
                    width="300px"></q-img>
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
                    width="300px"></q-img>
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
          <router-link to="pharm/schedule" style="text-decoration:none;color:white">
      <q-card-section >
              <div class="row justify-center">
                <div class="text-h4">My calendar</div>
              </div>
              <div class="row justify-center">
                  <q-img src="./../../assets/pictures/calendar.jpg"
                    height="250px"
                    width="300px"></q-img>
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
          <router-link to="pharm/acc" style="text-decoration:none;color:white">
      <q-card-section >
              <div class="row justify-center">
                <div class="text-h4">My profile</div>
              </div>
              <div class="row justify-center">
                  <q-img src="./../../assets/pictures/doctor1.png"
                    height="250px"
                    width="300px"></q-img>
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
      vacation: false,
      startDialog: false
    }
  }
}
</script>
