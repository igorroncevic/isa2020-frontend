<template>
    <div class="q-mt-xl">
        <div class="row justify-center text-bold text-primary text-h4">All users complaints</div>
        <div class="row justify-around q-gutter-lg">
            <complaint-card></complaint-card>
        </div>
    </div>
</template>

<script>
import ComplaintCard from './../../components/ComplaintCard'

export default {
  components: { ComplaintCard },
  data () {
    return {

    }
  }
}
</script>
