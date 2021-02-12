<template>
    <div class="q-mt-xl">
        <div class="row justify-center text-bold text-primary text-h4">All users complaints</div>
        <div class="row justify-around q-gutter-lg">
            <complaint-card :object="c" v-for="c in data" :key="c.id"></complaint-card>
        </div>
    </div>
</template>

<script>
import ComplaintCard from './../../components/ComplaintCard'
import ComplaintService from './../../services/ComplaintService'

export default {
  components: { ComplaintCard },
  data () {
    return {
      data: []
    }
  },
  async beforeMount () {
    this.data = await ComplaintService.allComplaints()
  }
}
</script>
