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
  },
  created() {
    document.title = 'Caddy Workflow';
  },
}
</script>

<style lang="scss">

</style>

