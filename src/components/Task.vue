<template>
  <v-expansion-panel class='ma-2'>
    <v-expansion-panel-content>
      <div slot='header'>
        <v-layout row>
          <v-flex>
            Name
          </v-flex>
          <v-flex>
            Deadline
          </v-flex>
          <v-flex>
            Completed
          </v-flex>
        </v-layout>
      </div>
      <v-divider></v-divider>
      <v-card>
        <v-card-text>
          Description
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>
      <v-layout class='pa-3' row>
        <v-layout column>
          <v-flex>
            <timeSub/>
          </v-flex>
          <v-flex>
            <timeSub/>
          </v-flex>
          <v-flex>
            <timeSub/>
          </v-flex>
        </v-layout>
        <v-layout column>
          <v-flex>
            <timeSub/>
          </v-flex>
          <v-flex>
            <timeSub/>
          </v-flex>
          <v-flex>
            <timeSub/>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import timeSub from '@/components/timeSub.vue'

export default {
  components: {
    timeSub
  },
  data() {
    return {

    }
  }
}
</script>
