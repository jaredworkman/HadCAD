module.exports = {
  createTask: function() {
    this.closeTaskModal();
    const d = new Date();
    const taskId = this.projects[this.projectTab].projectName + '_' +  this.taskName + '_' + (d.getMonth() + 1) + '_' + d.getFullYear();
    const name = this.taskName;
    const description = this.description;
    const deadline = document.getElementById('deadline').value;
    const estHours = this.estHours;
    const completed = false;
    const timeSubmissions = [];
    const expenseSubmissions = [];
    const newTask = {taskId, name, description, deadline, estHours, completed, timeSubmissions, expenseSubmissions};
    this.$store.commit('createTask', newTask);
    this.updateProject();
  },

};