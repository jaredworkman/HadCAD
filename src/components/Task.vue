<template>
  <v-expansion-panel class='ma-2' :class="`task ${task.status}`">
    <v-expansion-panel-content>
      <div slot='header' :id='task.id'>
        <v-layout row>
          <v-flex xs12 sm4 md3>
            <div class="caption tertiary--text">Name</div>
            <div class="subheading">{{ task.name }}</div>
          </v-flex>
          <v-flex xs12 sm3 md2>
            <div class="caption tertiary--text">Deadline</div>
            <div class="subheading">{{ task.deadline | date }}</div>
          </v-flex>
          <v-flex xs12 sm3 md2>
            <v-menu
              transition="slide-x-transition"
              bottom
              right
            >
              <v-list>
                <v-list-tile
                  v-for="(item, i) in items"
                  :key="i"
                  @click='changeStatus(item)'
                >
                  <v-list-tile-title
                  >{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
          </v-menu>
        </v-flex>
          <v-flex xs12 sm4 md3>
            <div class="caption tertiary--text">List</div>
            <div class="subheading">{{ task.list.name }}</div>
          </v-flex>
          <v-flex xs12 sm2 md1 v-if='client'>
            <div class="caption tertiary--text">Start Timer</div>
            <v-btn icon @click='addTimer(task.id)' color='green--text'><v-icon>play_arrow</v-icon></v-btn>
          </v-flex>
        </v-layout>
      </div>
      <v-divider class='mx-5'></v-divider>
      <v-card>
        <v-layout row wrap>
          <v-flex xs11>
            <v-card-text>
              <div class="caption tertiary--text">Description</div>
              <div class="subheading">{{ task.description }}</div>
            </v-card-text>
          </v-flex>
          <v-flex xs1>
            <v-btn flat fab>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-card-text>
            <div class="caption tertiary--text">Estimated Time</div>
            <div class="subheading">{{ task.estHours }}</div>
          </v-card-text>
          <v-card-text>
            <div class="caption tertiary--text">Current Time</div>
            <div class="subheading">{{ getTime || '0' }}</div>
          </v-card-text>
        </v-layout>
        <h3 class='ml-3 my-2 font-weight-medium' v-if='task.timeSubmissions.length > 0'>Time Submissions</h3>
        <v-divider></v-divider>
        <v-layout
          v-for='sub in task.timeSubmissions'
          :key='sub.id'
        >
          <v-flex>
            <TimeSub :sub='sub'/>
          </v-flex>
        </v-layout>
        <h3 class='ml-3 my-2 font-weight-medium' v-if='task.expenseSubmissions.length > 0'>Expense Submissions</h3>
        <v-divider></v-divider>
        <v-layout
          v-for='sub in task.expenseSubmissions'
          :key='sub.id'
          row wrap
        >
          <v-flex>
            <ExpenseSub :sub='sub'/>
          </v-flex>
        </v-layout>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import TimeSub from '@/components/TimeSub.vue'
import ExpenseSub from '@/components/ExpenseSub.vue'
import { mapState } from 'vuex'

export default {
  // id, name, description, estHours, status, timeSubmissions[], expenseSubmissions[], list{}
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  components: {
    TimeSub,
    ExpenseSub
  },
  data() {
    return {
      items: [
        { title: 'ongoing' },
        { title: 'completed' },
        { title: 'stuck' },
      ]
    }
  },
  computed: {
    ...mapState({
      currentProject : 'currentProject',
      projectMap : 'projectMap',
    }),
    client () {
      if (this.$route.name === 'Client') {
        return false;
      } else {
        return true;
      }
    },
    getTime () {
      let t = 0;
      this.task.timeSubmissions.forEach((sub) => {
        t += sub.time
      });
      return parseInt(t);
    }
  },
  methods: {
		changeStatus(item){
      const newStatus = item.title;
      const id = this.task.id
      const sendTask = {id, newStatus};
      this.$emit('updateStatus', sendTask);
    },
    stopOpen () {
      document.getElementById(this.task.id).click();
    },
    addTimer (id) {
      document.getElementById(id).click();
      this.$store.commit('timerModule/createTimer', {id: id, name: this.task.name });
      this.$emit('start-timer', id);
    }
  }
}
</script>

<style>
.task.completed{
  border-left: 4px solid #3CD1C2;
}
.task.ongoing{
  border-left: 4px solid orange;
}
.task.overdue{
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
.v-chip.completed {
  background: red;
}
</style>