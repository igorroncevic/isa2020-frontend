<template>
  <div class="patient-loyalty-wrapper">
    <div class="text-h6" style="text-align: left;">Loyalty status: {{ loyalty.status }}</div>
    <div class="text-body2" style="text-align: left;">Points: {{ loyalty.points }}</div>
    <div class="text-body2" style="text-align: left;">
      Commodities: {{ loyalty.discount }}% discount
    </div>
  </div>
</template>

<script>
export default {
    props: ["loyalty"]
};
</script>

<style>
</style>