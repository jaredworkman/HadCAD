var firebase = require("firebase/app");
require('firebase/auth');

async function createProject(id, name, description, status, clients, budget, deadline, members, tasks, lists, group, users ) {
  db.collection('projects').doc(id).set({
    id: id,
    name: name,
    status: status,
    clients: clients,
    budget: budget,
    deadline: deadline,
    tasks: tasks,
    members: members,
    milestones: milestones,
    groups: groups,
    rate: rate,
    projectManagers: projectManagers
});
}

async function getProject(id) {
  
};
async function updateProject(id, tasks) {

}

async function updateListsProject(id, lists) {

}

async function deleteProject(id) {

}

export {createProject, getProject, updateProject, deleteProject, updateListsProject};