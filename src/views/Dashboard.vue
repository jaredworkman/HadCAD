<template>
  <div class="dashboard">
    <h1 class='mx-3 tertiary--text font-weight-light'>Dashboard</h1>
    <!-- Snackbars -->
    <v-snackbar color='secondary primary--text' v-model='projSnackbar' :timeout='3000' top>
      <span>Project added successfully!</span>
      <v-btn flat color='primary' @click='projSnackbar = false'>Close</v-btn>
    </v-snackbar>
    <v-snackbar color='secondary primary--text' v-model='groupSnackbar' :timeout='3000' top>
      <span>Group added successfully!</span>
      <v-btn flat color='primary' @click='groupSnackbar = false'>Close</v-btn>
    </v-snackbar>

    <v-container class='my-3'>
      <addGroup @groupAdded='groupSnackbar = true' />
      <v-card v-if='groups.length ===0' class='text-xs-center pa-5'>
        <h3 class='font-weight-light title'>Create a group above to get started</h3>
      </v-card>
      <v-expansion-panel>
        <v-expansion-panel-content
          v-for='(group, i) in groups'
          :key='group.name + i'
        >
          <div slot='header' @click='setGroup(group.id)'>
            <v-layout row wrap>
              <v-flex xs4 sm1>
                <v-responsive>
                  <v-avatar class='white'>
                    <img :src="`/logo${(i % 2)}.png`">
                  </v-avatar>
                </v-responsive>
              </v-flex>
              <v-flex xs8 sm3>
                <div class="caption grey--text">Name</div>
                <div class='subheading'>{{ group.name }}</div>
              </v-flex>  
              <v-flex xs4 sm3>
                <div class="caption grey--text">Owner</div>
                <span v-for='o in group.owners' :key='o' class='subheading text-lowercase text-truncate mr-2'>
                  <v-avatar size='24' color='primary'>
                    <span class='white--text subheading text-capitalize'>{{ o[0] }}</span>
                  </v-avatar>
                </span>
              </v-flex>
              <v-flex xs8 sm3>
                <div class="caption grey--text">Members</div>
                <span v-for='(m, i) in memberIcons(group)' :key='i' class='subheading text-lowercase text-truncate mr-2'>
                  <v-avatar size='24' color='primary'>
                    <span class='white--text subheading text-capitalize'>{{ m[0] }}</span>
                  </v-avatar>
                </span>
              </v-flex>
              <v-flex xs4 sm1>
                <div class="caption grey--text">Projects</div>
                <div class='subheading'>{{ group.projects.length }}</div>
              </v-flex>           
              <v-flex xs8 sm1>
                <v-btn fab flat small @click='toGroup(group.id)'><v-icon small>open_in_new</v-icon></v-btn>
              </v-flex>           
            </v-layout>
          </div>
          <addProject @projectAdded='projSnackbar = true' v-if='group.owners.includes(user.id)'/>
          <template v-for='project in groupProjects'>
            <CardProject :project='project' :key='project.id' class='ml-5 mr-2'/>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import addProject from '@/components/addProject.vue'
import addGroup from '@/components/addGroup.vue'
import CardProject from '@/components/CardProject.vue'
import {mapState} from 'vuex'
import {createGroup, getGroup, deleteGroup, updateGroup} from '../modules/groupController.js';
import {createProject, getProject, updateProject, deleteProject} from '../modules/projectController.js';

export default {
  components: {
    addProject,
    addGroup,
    CardProject
  },
	data() {
		return {
      projSnackbar: false,
      groupSnackbar: false,
      groupsF: []
		}
  },
  computed: {
    ...mapState({
      user: 'user',
      groups: 'groups',
      projects: 'projects',
      currentGroup: 'currentGroup',
      group: state => state.groupMap[state.currentGroup],
      project: state => state.projectMap[state.currentProject]
    }),
    groupProjects () {
      return this.projects.filter(p => p.group === this.currentGroup)
    },
    randomColor () {
      let num = Math.round(0xffffffff * Math.random());
      let r = num >> 16;
      let g = num >> 8 & 255;
      let b = num & 255;
      return `rgb(${r}, ${g}, ${b})`;
    }
  },
	methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
    },
    findProject(id) {
      const project = getProject(id);
      this.$store.commit('createProject', project);
    },
    findGroup(id) {
      const group = getGroup(id);
      this.$store.commit('createGroup', group);
    },
    setGroup(id) {
      this.$store.commit('setCurrentGroup', id);
    },
    toGroup(id) {
      this.$store.commit('setCurrentGroup', id);
      if (this.group.owners.includes(this.user.id)) {
        this.$router.push('/manager');
      } else if (this.group.members.includes(this.user.id)) {
        this.$router.push('/team');
      } else {
        alert('You\'re not a member of this group')
      }
    },
    memberIcons (group) {
      return group.members.filter(m => !group.owners.includes(m))
    }
  },
}
</script>