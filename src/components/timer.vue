<template>
<div>
  <v-btn fab flat @click.stop='timerDrawer = !timerDrawer'>
    <v-icon>timer</v-icon>
  </v-btn>

  <v-navigation-drawer
    v-model='timerDrawer'
    right
  >
    <h2>This is a timer drawer</h2>
  </v-navigation-drawer>
</div>
</template>

<script>
export default {
  data() {
    return {
      timerDrawer: false
    }
  }
}
</script>
