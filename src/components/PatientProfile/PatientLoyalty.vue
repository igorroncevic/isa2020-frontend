<template>
  <div class="patient-loyalty-wrapper q-mt-xs">
    <div class="text-h6" style="text-align: left;">Loyalty status: {{ loyalty.category }}</div>
    <div class="text-body2" style="text-align: left;">Loyalty points: {{ points }}<br/>Next rank: {{loyalty.maxPoints - points + 1}} points to go</div>
    <div class="text-body2" style="text-align: left;">
      Commodities: {{ loyalty.discount }}% discount
    </div>
  </div>
</template>

<script>
export default {
    props: ["loyalty", "points"]
};
</script>

<style>
</style>