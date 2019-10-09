var firebase = require("firebase/app");
require('firebase/auth');

async function login(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
      document.getElementById('display_error').style.display = 'block';
    }).then(() => {
      let userRef = db.collection('users').doc(cred.user.id);
      console.log('in then2')
      userRef.get().then((doc) => {
        return doc;
      })
  }).catch((err) => {
    console.log('bad fetch');
    //this.$refs.signUp.reset();
    this.loading = false;
    alert(err.message);
  })
}
async function register(email, password, settings, name, groups, projects, type, status, timeclock, files)  {
  let id = email;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
      db.collection('users').doc(cred.user.id).set({
          id: id,
          name: name,
          groups: groups,
          projects: projects,
          files: files,
          settings: settings,
          timeclock: timeclock,
          type: type,
          status: status
      }).then(() => {
        console.log('here1')
          let userRef = db.collection('users').doc(cred.user.id);
          console.log('here2')
          userRef.get().then((doc) => {
            console.log('here3')
              return doc
          })
      })
  }).catch((err) => {
    console.log('here4')
      //this.$refs.signUp.reset();
      this.loading = false;
      alert(err.message);
  })
}

async function updateUserGroup(userId, groupId){
return userId, groupId
}
async function updateUserProject(userId, projectId){
return userId, projectId
}
  
export {login, register, updateUserGroup, updateUserProject};