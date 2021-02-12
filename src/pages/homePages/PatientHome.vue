<template>
  <q-page>
    <div id="home-grid-wrapper">
      <div id="home-grid-title">
        <div class="text-h4 text-weight-regular text-primary">
          Welcome Slobodanka
        </div>
      </div>
      <div id="home-grid-content">
        <div id="home-grid-content-terms">
          <div id="home-grid-content-terms-title">
            <div class="text-h5 text-primary">Upcoming Terms</div>
          </div>

          <div id="home-grid-content-terms-cards">
            <term-card
              v-for="term in terms"
              :key="term.id"
              :term="term"
              :cancelling="false"
            />
            <div
              v-if="terms.length == 0"
              class="text-subtitle1 font-weight-medium"
            >
              You have no upcoming terms.
            </div>
          </div>

          <div id="home-grid-content-terms-seemore">
            <q-btn
              flat
              color="primary"
              label="See more"
              @click="navigateToCalendar"
            />
          </div>
        </div>

        <div id="home-grid-content-promotions">
          <div id="home-grid-content-promotions-title">
            <div class="text-h5 text-primary">Ongoing Promotions</div>
          </div>
          <div id="home-grid-content-promotions-cards">
            <promotion-card
              v-for="promotion in promotions"
              :key="promotion.id"
              :promotion="promotion"
            />
          </div>
        </div>

        <div id="home-grid-side-actions">
          <div id="home-grid-side-actions-penalties">
            <div class="text-subtitle1">
              <span class="text-primary">Your penalties:</span>
              {{ penalties }}
            </div>
          </div>
          <div id="home-grid-side-actions-mark">
            <div id="home-grid-side-actions-mark-title">
              <div class="text-h6 text-weight-regular">
                You are pleased with our service?
              </div>
            </div>
            <div id="home-grid-side-actions-mark-btn">
              <q-btn
                bordered
                color="primary"
                label="Rate us"
                @click="navigateToMark"
              />
            </div>
          </div>
          <div id="home-grid-side-actions-complaint">
            <div id="home-grid-side-actions-complaint-title">
              <div class="text-h6 text-weight-regular">
                Something that you disliked?
              </div>
            </div>
            <div id="home-grid-side-actions-complaint-btn">
              <q-btn bordered @click="complaint = true" color="primary" label="Write a Complaint" />
              <q-dialog  v-model="complaint">
                <writing-complaint-card></writing-complaint-card>
              </q-dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import TermService from './../../services/TermService'
import PromotionService from './../../services/PromotionService'
import PatientService from './../../services/PatientService'
import TermCard from './../../components/TermCard'
import PromotionCard from './../../components/PromotionCard'
import WritingComplaintCard from './../../components/WritingComplaintCard'

export default {
  components: { TermCard, PromotionCard, WritingComplaintCard },
  async beforeMount () {
    this.patientId = this.$store.getters.getId
    this.patientName = this.$store.getters.getName

    let response = await TermService.getAllPatientsUpcomingTerms(
      this.patientId
    )

    if (response) {
      if (response.status == 200) this.terms = [...response.data]
    }

    response = await PromotionService.getAllPatientsPromotions(this.patientId)

    if (response) {
      if (response.status == 200) this.promotions = [...response.data]
    }

    response = await PatientService.getPatientPenalties(this.patientId)

    if (response) {
      if (response.status == 200) this.penalties = response.data
    }
  },
  data () {
    return {
      terms: [],
      promotions: [],
      patientId: '',
      patientName: '',
      penalties: 0,
      complaint: false
    }
  },
  methods: {
    navigateToCalendar () {
      this.$router.push({ path: '/patient/calendar' })
    },
    navigateToMark () {
      this.$router.push({ path: '/patient/mark' })
    }
  }
}
</script>

<style scoped>
#home-grid-wrapper {
  display: grid;
  grid-template-rows: 6rem auto;
}

#home-grid-title {
  grid-row: 1;
  width: 100%;
  padding: 15px;
}

#home-grid-content {
  grid-row: 2;
  display: grid;
  grid-template-rows: repeat(2, 0.5fr);
  grid-template-columns: repeat(10, 1fr);
  padding: 15px;
  row-gap: 50px;
}

#home-grid-content-terms {
  grid-row: 1;
  grid-column: 1/8;
  display: grid;
  grid-template-rows: 3rem auto;
  grid-template-columns: auto 10rem;
  row-gap: 5px;
  column-gap: 5px;
}

#home-grid-content-terms-title {
  grid-row: 1;
  grid-column: 1/2;
}

#home-grid-content-terms-cards {
  grid-column: 1;
  grid-row: 2;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  column-gap: 10px;
}

#home-grid-content-terms-seemore {
  grid-column: 2;
  grid-row: 2;
  display: flex;
  align-items: center;
}

#home-grid-content-promotions {
  grid-row: 2;
  grid-column: 1/7;
  display: grid;
  grid-template-rows: 3rem auto;
  row-gap: 5px;
}

#home-grid-content-promotions-title {
  grid-row: 1;
}

#home-grid-content-promotions-cards {
  grid-row: 2;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
}

#home-grid-side-actions {
  grid-row: 1/3;
  grid-column: 8/10;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-content: flex-start;
}

#home-grid-side-actions-penalties {
  display: inline-block;
}

#home-grid-side-actions-mark {
  display: table;
  text-align: center;
  row-gap: 20px;
}

#home-grid-side-actions-mark-title {
  grid-row: 1;
}

#home-grid-side-actions-mark-btn {
  grid-row: 2;
  margin-top: 10px;
}

#home-grid-side-actions-complaint {
  display: table;
  text-align: center;
  row-gap: 20px;
  border-spacing: 20px;
}

#home-grid-side-actions-complaint-title {
  grid-row: 1;
  margin: 0 auto;
}

#home-grid-side-actions-complaint-btn {
  grid-row: 2;
  margin-top: 10px;
}
</style>
