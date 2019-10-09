<template>
  <v-app>
    <Navbar />

    <v-content class='ma-4'>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
    }
  }
}
// Notes
// Add id to v-for's to get task/proj/employee by id
// Hover to show ... and choose edit or delete
// Alert to confirm delete
</script>

<style lang="scss">

</style>

