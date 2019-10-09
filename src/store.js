import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersistence({
  key: 'caddy',
  storage: sessionStorage
});

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    user: {
      id: '',
      name: '',
      profile: {}, // Other data ? Location, job title, etc.
      projects: [], // Array of project ID's
      groups: [], // Array of group ID's
      settings: {} // Object with user preferences
    },
    groupNames: [],
    groups: {},
    group: {
      id: '',
      name: '',
      projects: [], // Array of project ID's
      members: [], // Array of member ID's
      owners: [], // Array of owner ID's
    },
    projects: [],
    // Timer
    time: null,
    sec: 0,
    min: 0,
    hr: 0,
    t: [],
    timerState: 'stopped'
  },
  mutations: {
    // User
    signInUser(state, payload) {
      state.user.id = payload.returnEmail;
      state.user.name = payload.returnName;
      state.user.groups = payload.returnGroups;
      state.user.projects = payload.returnProjects;
      state.user.settings = payload.returnSettings;
    },
    createGroup (state, payload) {
      state.groups[payload.id] = payload;
      state.groupByNames.push(payload.name);
    },
    addProjectToGroup (state, payload) {
      state.group[payload.id].projects.push(payload);
    },
    // Projects
    createProject (state, payload) {
      let newProj = {
        id: null,
        name: null,
        description: null,
        status: null,
        clients: [],
        budget: null,
        deadline: null,
        members: [],
        data: null,
        lists: [],
        group: null,
      }
      // Pass in information for new project
      newProj.id = payload.id;
      newProj.name = payload.name;
      newProj.description = payload.description
      newProj.status = payload.status;
      newProj.clients = payload.clients;
      newProj.budget = payload.budget;
      newProj.deadline = payload.deadline;
      newProj.data = payload.data;
      newProj.lists = payload.lists;
      newProj.group = payload.group;

      // Add to projects list
      let found = false;
      for (let i = 0; i < state.projects.length; ++i) {
        if (state.projects[i].id == newProj.id) {
          found = true;
          break;
        }
      }
      if (!found) {
        state.projects.push(newProj);
      }
      if (state.group.projects.indexOf(newProj.id) == -1) {
        state.group.projects.push(newProj.id);
      }

    },
    // Task
    createTask (state, payload) {
      const proj = state.projects[state.projectTab];
      proj.data.push(payload);
    },
    toggleStatus(state, payload) {
        //
    },
    // Submissions
    createTimeSubmission (state, payload) {
      const tasks = state.projects[state.projectTab].data;
      for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].taskId === payload.task) {
              tasks[i].timeSubmissions.push(payload);
          }
        }
    },
    // Expense Record
    createExpenseSubmission (state, payload) {
      const tasks = state.projects[state.projectTab].data;
      for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].taskId.includes(payload.task)) {
              tasks[i].expenseSubmissions.push(payload);
          }
        }
    },
        // Timer Mutations
        play (state, payload) {
          state.timerState = 'playing';
          state.t.push(payload);
        },
        pause (state) {
          state.timerState = 'stopped';
          for (let i = 0; i < state.t.length; i++) {
            clearInterval(state.t[i]);
          }
        },
        reset (state) {
          for (let i = 0; i < state.t.length; i++) {
            clearInterval(state.t[i]);
          }
          state.sec = 0;
          state.min = 0;
          state.hr = 0;
          state.time = null;
          state.timerState = 'stopped';
        },
        add (state) {
          state.sec++;
          if (state.sec >= 60) {
            state.sec = 0;
            state.min++;
            if (state.min >= 60) {
              state.min = 0;
              state.hr++;
            }
          }
          state.time = (state.hr ? (state.hr > 9 ? state.hr : "0" + state.hr) : "00")
          + ":" + (state.min ? (state.min > 9 ? state.min : "0" + state.min) : "00")
          + ":" + (state.sec > 9 ? state.sec : "0" + state.sec);
        }
  },
  actions: {

  }
})
