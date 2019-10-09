<template>
  <v-card class='my-2 mx-4 elevation-4'>
    <v-layout row wrap>
      <v-flex>
        <v-card-text xs6 sm4 md3>
          <div class="caption tertiary--text">Date</div>
          <div class="subheading">{{ sub.date }}</div>
        </v-card-text>
      </v-flex>
      <v-flex>
        <v-card-text xs6 sm4 md3>
          <div class="caption tertiary--text">Cost</div>
          <div class="subheading">{{ sub.cost }}</div>
        </v-card-text>
      </v-flex>
      <v-flex>
        <v-card-text>
          <div class="caption tertiary--text">User</div>
          <div class="subheading">{{ sub.userId }}</div>
        </v-card-text>
      </v-flex>
      <v-flex>
        <v-card-text>
          <div class="caption tertiary--text">Description</div>
          <div class="subheading">{{ sub.description }}</div>
        </v-card-text>
      </v-flex>
      <v-flex>
        <v-card-text>
          <div class="caption tertiary--text">Links</div>
          <div class="subheading">{{ sub.links }}</div>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    sub: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      
    }
  }
}
</script>
