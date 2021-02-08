<template>
<q-page padding>
<term-report :derm="true" termType="checkup"/>
</q-page>

</template>
<script>
import TermReport from './../../components/TermReport.vue'
export default {
  components: {
    TermReport
  }
}
</script>
