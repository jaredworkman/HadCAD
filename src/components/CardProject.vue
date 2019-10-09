<template>
  <v-card 
    class='my-1'
    hover
  >
    <v-layout row wrap :class="`pa-3 project ${project.status}`">
      <v-flex xs5 sm3 md4>
        <div class="caption grey--text">Project Title</div>
        <div class='subheading'>{{ project.name }}</div>
      </v-flex>
      <v-flex xs7 sm3 md4>
        <div class="caption grey--text">Client</div>
        <div v-for='(client, i) in project.clients' :key='i' class='subheading text-truncate mr-2'>{{ client || 'N/A' }}</div>
      </v-flex>
      <v-flex xs5 sm2 md4>
        <div class="caption grey--text">Deadline</div>
        <div class='subheading'>{{ project.deadline || 'N/A' }}</div>
      </v-flex>
      <v-flex xs5 sm3 md10>
        <div class="caption grey--text">Project Managers</div>
          <span v-for='(pm, i) in pm' :key='i' class='subheading text-lowercase text-truncate mr-2'>
            <v-avatar size='24' color='primary'>
              <span class='white--text subheading text-capitalize'>{{ pm }}</span>
            </v-avatar>
          </span>      
        </v-flex>
      <v-flex xs2 sm1 md2>
        <v-btn fab flat small @click='setProject(project.id)'><v-icon small>open_in_new</v-icon></v-btn>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
  </v-card> 
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    pm () {
      return ['r', 'j']
    }
  },
  methods: {
    setProject(id) {
      this.$store.commit('setCurrentProject', id);
      if (this.project.clients.includes(this.user.id)) {
        this.$router.push('/client');
      } else {
        this.$router.push('/projects');
      }
    },
  }
}
</script>

<style>
.project.completed{
  border-left: 4px solid #3CD1C2;
}
.project.ongoing{
  border-left: 4px solid orange;
}
.project.overdue{
  border-left: 4px solid tomato;
}
</style>