<template>
  <v-card class='my-2 mx-4 elevation-4'>
    <v-layout row wrap>
      <v-flex>
        <v-card-text>
          <div class="caption tertiary--text">Date</div>
          <div class="subheading">{{ sub.date }}</div>
        </v-card-text>
      </v-flex>
      <v-flex>
        <v-card-text>
          <div class="caption tertiary--text">Time</div>
          <div class="subheading">{{ sub.time }}</div>
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
            <img v-for='img in sub.links'
            :id='img'
            :key='img'
            width="100"
            height="100"
            >
        </v-card-text>
      </v-flex>
      <v-btn icon @click='getPhoto'>
        <v-icon>photo</v-icon>
      </v-btn>
    </v-layout>
  </v-card>
</template>

<script>
import {storage} from '../modules/firebaseController.js';
import {mapState} from 'vuex'

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
  },
  computed: {
    ...mapState({
        currentProject: 'currentProject',
        projectsMap: 'projectMap',
        currentTask: 'currentTask'
    })
  },
  methods: {
    getPhoto(){
      this.sub.links.forEach(link => {
          var Ref = storage.ref(link);
          let val = link;
          console.log(link)
          console.log(Ref)
          Ref.getDownloadURL().then(function(url) {
            console.log('here')
            console.log(val)
            var img = document.getElementById(val);
            img.src = url;
            console.log(img.src)
          }).catch(function(error) {
            console.log(error)
          })
      });
    }
  }
}
</script>