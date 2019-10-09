var firebase = require("firebase/app");
require('firebase/auth');

async function createGroup(id, name, owners, projects, members) {
    db.collection('groups').doc(id).set({
        id: id,
        name: name,
        owners: owners,
        projects: projects,
        clients: clients
    });
}
async function updateGroup(id, project) {
    db.collection('projects').doc(cred.user.uid).set({

    });
}

async function addMemberToGroup(id, email) {

}


async function deleteGroup(groupId) {


}


async function getGroup(id) {
    
}

export {createGroup, getGroup, deleteGroup, updateGroup, addMemberToGroup};