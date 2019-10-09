import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';
import { attempt } from 'when';
import { CodeCommit } from 'aws-sdk';

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersistence({
  key: 'caddy',
  storage: localStorage,
});

const timerModule = {
  namespaced: true,
  state: {
    mainTimer: {
      t: null,
      time: null,
      sec: 0,
      min: 0,
      hr: 0,
      timerState: 'stopped'
    },
    timers: [],
  },
  mutations: {
    playMain (state, payload) {
      state.mainTimer.timerState = 'playing';
      state.mainTimer.T = payload;
    },
    pauseMain (state) {
      state.mainTimer.timerState = 'stopped';
      clearInterval(state.mainTimer.T);
    },
    resetMain (state) {
      clearInterval(state.mainTimer.T);
      state.mainTimer.sec = 0;
      state.mainTimer.min = 0;
      state.mainTimer.hr = 0;
      state.mainTimer.time = null;
      state.mainTimer.timerState = 'stopped';
    },
    addMain (state) {
      state.mainTimer.sec++;
      if (state.mainTimer.sec >= 60) {
        state.mainTimer.sec = 0;
        state.mainTimer.min++;
        if (state.mainTimer.min >= 60) {
          state.mainTimer.min = 0;
          state.mainTimer.hr++;
        }
      }
      state.mainTimer.time = (state.mainTimer.hr ? (state.mainTimer.hr > 9 ? state.mainTimer.hr : "0" + state.mainTimer.hr) : "00")
      + ":" + (state.mainTimer.min ? (state.mainTimer.min > 9 ? state.mainTimer.min : "0" + state.mainTimer.min) : "00")
      + ":" + (state.mainTimer.sec > 9 ? state.mainTimer.sec : "0" + state.mainTimer.sec);      
    },
    // General Timer mutations
    createTimer (state, payload) {
      // Check if timer has already been created
      for (let i = 0; i < state.timers.length; i++) {
        if (payload.id === state.timers[i].taskId) {
          return ''
        }
      }

      let timer = {
        t: null,
        time: '',
        sec: 0,
        min: 0,
        hr: 0,
        timerState: 'stopped',
        taskName: payload.name,
        taskId: payload.id
      }
      state.timers.push(timer);
    },
    cred (state, payload) {
      state.cred = payload
    },
    playTimer (state, payload) {
      state.timers.forEach((timer) => {
        timer.timerState = 'stopped';
        clearInterval(timer.t);
        timer.t = null;
      })
      let timer = state.timers.find(t => t.taskId === payload.id);
      timer.timerState = 'playing';
      timer.t = payload.t;
    },
    pauseTimer (state, payload) {
      let timer = state.timers.find(t => t.taskId === payload.id);
      timer.timerState = 'stopped';
      clearInterval(timer.t);
      timer.t = null;
    },
    addTimer (state, payload) {
      let timer = state.timers.find(t => t.taskId === payload);
      timer.sec++;
      if (timer.sec >= 60) {
        timer.sec = 0;
        timer.min++;
        if (timer.min >= 60) {
          timer.min = 0;
          timer.hr++;
        }
      }
      timer.time = (timer.hr ? (timer.hr > 9 ? timer.hr : "0" + timer.hr) : "00")
      + ":" + (timer.min ? (timer.min > 9 ? timer.min : "0" + timer.min) : "00")
      + ":" + (timer.sec > 9 ? timer.sec : "0" + timer.sec); 
    },
    resetTimer (state, payload) {
      let tim = state.timers.find(timer => timer.taskId === payload);
      clearInterval(tim.t);
      tim.t = null;
      tim.time = '';
      tim.sec = 0;
      tim.min = 0;
      tim.hr = 0;
      tim.timerState = 'stopped';
    },
    deleteTimer (state, payload) {
      let i = state.timers.indexOf(payload);
      state.timers.splice(i, ++i)
    }
  }
};

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  modules: {
    timerModule: timerModule
  },
  state: {
    user: {
      id: '',
      name: '',
      profile: {}, // Other data ? Location, job title, etc.
      projects: [], // Array of project ID's
      groups: [], // Array of group ID's
      settings: {} // Object with user preferences
    },
    groups: [],
    cred: null,
    groupMap: {},
    group: {
      id: '',
      name: '',
      projects: [], // Array of project ID's
      members: [], // Array of member ID's
      owners: [], // Array of owner ID's
    },
    currentProject: '',
    currentCategory: '',
    currentGroup: '',
    currentMember: '',
    projects: [],
    projectMap: {},
    // Timer
    time: null,
    sec: 0,
    min: 0,
    hr: 0,
    t: [],
    timerState: 'stopped',
    expenses: 1,
    percentComplete: 1,
    remainingBudget: 1,
    userTime: 1, 
    wage: 1,
    projectTime: 1,
    projectExpenses: 1,
    totalProjectExpenses: 1,
    totalTime: 1,
    totalExpenses: 1,
  },
  getters: {
    getGroupById: (state) => (id) => {
      return state.groups.find(group => group.id === id);
    },
    // getGroupInfo: (state, getters) => {
    //   let totalTime;
    //   let totalExpenses;
    //   state.groupMap[state.currentGroup].projects.forEach( project => {
    //       let {time, expenses} = getters.getProjectInfo(project);
    //       totalExpenses += expenses;
    //       totalTime += time;
    //   });
    //   return {totalTime, totalExpenses}
    // },
    // getUserInfo: (state, payload) => {
    //   let time;
    //   state.projectMap[state.currentProject].tasks.forEach(task => {
    //       task.timeSubmissions.forEach( submission =>{
    //           if (submission.userId == state.user.id){
    //               time += submission.time;
    //           }
    //       });
    //   });
  
    //   let wage = time * user.hourlyRate;
  
    //   return {time, wage}
    // },
    // getProjectInfo: (state) => {
    //   let time;
    //   let expenses;
    //   let percentComplete;
    //   let remainingBudget;
    //   let totalTasks;
    //   let completedTasks;
  
    //   state.projectMap[state.currentProject].tasks.forEach(task => {
    //       task.timeSubmissions.forEach( submission =>{
    //           time += submission.time;
    //       });
    //       task.expenseSubmissions.forEach( submission =>{
    //           expenses += submission.time;
    //       });
    //       totalTasks += 1;
    //       if(task.status == 'completed'){
    //           completedTasks += 1;
    //       }
    //   });
    //   percentComplete = completedTasks/totalTasks;
  
    //   remainingBudget = project.budget - expenses;
  
    //   return {time, expenses, percentComplete, remainingBudget}
    // },
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
    logout (state) {
      state.user.id = '';
      state.user.name = '';
      state.user.groups = [];
      state.user.projects = [];
      state.user.settings = {};
      state.groups = [];
      state.cred = null;
      state.groupMap = {};
      state.group = {
        id: '',
        name: '',
        projects: [], // Array of project ID's
        members: [], // Array of member ID's
        owners: [], // Array of owner ID's
      };
      state.currentProject = '';
      state.currentCategory = '';
      state.currentGroup = '';
      state.currentMember = '';
      state.projects = [];
      state.projectMap = {};
      // Timer
      state.time = null;
      state.sec = 0;
      state.min = 0;
      state.hr = 0;
      state.t = [];
      setTimeout(() => {
        window.localStorage.clear();
      }, 500)
    },
    createGroup (state, payload) {

      let found = false;
      for (let i = 0; i < state.groups.length; ++i) {
        if (state.groups[i].id == payload.id) {
          found = true;
          break;
        }
      }
      
      if (!found) {
        state.groupMap[payload.id] = payload;
        state.groups.push(payload);
      }
    },
    addProjectToGroup (state, payload) {
      state.groupMap[payload.groupId].projects.push(payload.id);
    },
    // Group
    setCurrentGroup (state, payload) {
      state.currentGroup = payload;
    },
    addMemberToGroup (state, payload) {
      let g = state.groupMap[state.currentGroup];
      g.members.push(payload);
    },
    setCurrentMember (state, payload) {
      state.currentMember = payload;
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
        tasks: [],
        lists: null,
        group: [],
        users: null,
      }
      // Pass in information for new project
      newProj.id = payload.id;
      newProj.name = payload.name;
      newProj.description = payload.description
      newProj.status = payload.status;
      newProj.clients = payload.clients;
      newProj.budget = payload.budget;
      newProj.deadline = payload.deadline;
      newProj.tasks = payload.tasks;
      newProj.lists = payload.lists;
      newProj.group = payload.group;
      newProj.users = payload.users;
      state.projectMap[payload.id] = newProj;

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
    setCurrentProject (state, payload) {
      state.currentProject = payload;
    },
    createList (state, payload) {
      let proj = state.projectMap[state.currentProject];
      proj.lists.push(payload);
    },
    // Task
    createTask (state, payload) {
     state.projectMap[state.currentProject].tasks.push(payload);
    },
    toggleStatus(state, payload) {
        //
    },
    // Submissions
    createTimeSubmission (state, payload) {
      const tasks = state.projectMap[state.currentProject].tasks;
      for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].id === payload.task) {
              tasks[i].timeSubmissions.push(payload.timeSub);
          }
        }
    },
    // Expense Record
    createExpenseSubmission (state, payload) {
      const tasks = state.projectMap[state.currentProject].tasks;
      for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].id === payload.task){
              tasks[i].expenseSubmissions.push(payload.expenseSub);
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
    },
    getGroupInfo (state) {
      state.groupMap[state.currentGroup].projects.forEach( project => {
          state.totalExpenses += state.expenseTime;
          state.totalTime += state.projectTime;
      });

    },
    getUserInfo (state) {
      state.projectMap[state.currentProject].tasks.forEach(task => {
          task.timeSubmissions.forEach( submission =>{
              if(submission.userId == state.user.id){
                state.userTime += submission.time;
              }
          });
      });
      state.wage = state.userTime * 15;//state.user.hourlyRate;
    },
    getProjectInfo (state) {
      state.projectExpenses = 0;
      let completedTasks = 0;
      let totalTasks = 0;
      state.projectMap[state.currentProject].tasks.forEach(task => {
          task.timeSubmissions.forEach( submission =>{
              state.projectTime = parseInt(state.projectTime) + parseInt(submission.time);
          });
          task.expenseSubmissions.forEach( submission =>{
              state.projectExpenses = parseInt(state.projectExpenses) + parseInt(submission.cost);
          });
          totalTasks += 1;
          if(task.status == 'completed'){
              completedTasks += 1;
          }
      });
      state.totalProjectExpenses = parseInt(state.projectExpenses) + parseInt(state.projectTime )* 15;
      state.percentComplete = completedTasks/totalTasks;
      state.remainingBudget = state.projectMap[state.currentProject].budget - state.totalProjectExpenses;

    },
  },
  actions: {

  }
})



