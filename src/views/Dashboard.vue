<template>
  <div class="dashboard">
    <!-- Snackbars -->
    <v-snackbar color='secondary primary--text' v-model='projSnackbar' :timeout='3000' top>
      <span>Project added successfully!</span>
      <v-btn flat color='primary' @click='projSnackbar = false'>Close</v-btn>
    </v-snackbar>
    <v-snackbar color='secondary primary--text' v-model='groupSnackbar' :timeout='3000' top>
      <span>Group added successfully!</span>
      <v-btn flat color='primary' @click='groupSnackbar = false'>Close</v-btn>
    </v-snackbar>

    <!-- Display Projects -->
    <v-container class="my-3 text-capitalize">
      <h2 class='font-weight-light headline'>Projects</h2>
      <v-layout row>
        <v-tooltip top>
          <v-btn small fab flat color="tertiary" @click="sortBy('projectName')" slot="activator">
            <v-icon small>folder_open</v-icon>
          </v-btn>
          <span>Sort by project name</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn fab small flat color="tertiary" @click="sortBy('client')" slot="activator">
            <v-icon small>person</v-icon>
          </v-btn>
          <span>Sort by client</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn fab small flat color="tertiary" @click="sortBy('deadline')" slot="activator">
            <v-icon small>date_range</v-icon>
          </v-btn>
          <span>Sort by date</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <addProject @projectAdded='projSnackbar = true' />
      </v-layout>
      <v-card flat v-for="project in projects" :key="project.id">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs6 sm3 md3>
            <div class="caption grey--text">Project Title</div>
            <div class='subheading'>{{ project.name }}</div>
          </v-flex>
          <v-flex xs6 sm3 md2>
            <div class="caption grey--text">Description</div>
            <div class='subheading'>{{ project.description }}</div>
          </v-flex>
          <v-flex xs6 sm3 md2>
            <div class="caption grey--text">Group</div>
            <div class='subheading'>{{ project.group }}</div>
          </v-flex>
          <v-flex xs6 sm2 md2>
            <div class="caption grey--text">Deadline</div>
            <div class='subheading'>{{ project.deadline }}</div>
          </v-flex>
          <v-flex xs6 md1 class='hidden-sm-and-down'>
            <div>
              <v-chip small :class="`${project.status} white--text caption my-2`">{{ project.status }}</v-chip>
            </div>
          </v-flex>
          <v-flex xs6 sm2 md1>
						<v-btn fab small flat class='ml-5' to='/projects'>
							<v-icon>open_in_new</v-icon>
						</v-btn>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>

    <!-- Display Employees -->
    <v-container class="my-3 text-capitalize">
      <h2 class='font-weight-light headline'>Groups</h2>
      <!-- Sorting Buttons -->
      <v-layout row>
        <v-tooltip top>
          <v-btn fab small flat color="tertiary" slot="activator">
            <v-icon small>person</v-icon>
          </v-btn>
          <span>Sort by name</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn fab small flat color="tertiary" slot="activator">
            <v-icon small>build</v-icon>
          </v-btn>
          <span>Sort by role</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <addGroup @groupAdded='groupSnackbar = true' />
      </v-layout>
      <!-- Content -->
      <v-card flat v-for="p in groups" :key="p.name" class='py-2'>
        <v-layout row wrap>
          <v-flex xs12 sm2>
            <v-responsive>
              <v-avatar size='60' class='white'>
                <!-- <img :src='p.avatar'> -->
              </v-avatar>
            </v-responsive>
          </v-flex>
          <v-flex xs6 sm5>
            <div class="caption grey--text">Name</div>
            <div class='subheading'>{{ p.name }}</div>
          </v-flex>
          <!-- <v-flex xs6 sm4>
            <div class="caption grey--text">Role</div>
            <div class='subheading'>{{ p. }}</div>
          </v-flex> -->
          <v-flex xs6 sm1>
						<v-btn fab small flat class='ma-0' to='/projects'>
							<v-icon>open_in_new</v-icon>
						</v-btn>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import addProject from '@/components/addProject.vue'
import addGroup from '@/components/addGroup.vue'
import {mapState} from 'vuex'
import {createGroup, getGroup, deleteGroup, updateGroup} from '../modules/groupController.js';
import {createProject, getProject, updateProject, deleteProject} from '../modules/projectController.js';
export default {
  components: {
    addProject,
    addGroup
  },
	data() {
		return {
      projSnackbar: false,
      groupSnackbar: false,
		}
  },
  computed: {
    ...mapState({
      user: 'user',
      groups: 'groups',
      projects: 'projects',
    })
  },
	methods: {
    sortBy(prop) {
        this.projects.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
      },
    created() {
      // Get projects here
    },
    findProject(id) {
      const project = getProject(id);
      this.$store.commit('createProject', project);
    },
    findGroup(id) {
      const group = getGroup(id);
      this.$store.commit('createGroup', group);
    },

  },
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
.v-chip.completed {
  background: #3CD1C2;
}
.v-chip.ongoing {
  background: orange;
}
.v-chip.overdue {
  background: tomato;
}
</style>