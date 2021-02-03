<template>
  <router-link style="text-decoration: none;color:black" v-bind:to="link">
  <q-item
    clickable
    tag="a"
    target="_blank"
    :active="active"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
  </router-link>
</template>

<script>
export default {
  name: 'MenuCard',
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      default: ''
    },
    active:{
      type: Boolean,
      default: false
    }
  }
}
</script>
