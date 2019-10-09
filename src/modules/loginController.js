var baseUrl = 'https://414qofs2j8.execute-api.us-east-1.amazonaws.com/dev/';

async function login(email, password) {
        let returnError = 'go';
        try{
            const loginUser = { email, password }
            const res = await fetch(`${baseUrl}users/auth`, {
                  method: 'POST',
                  body: JSON.stringify(loginUser)
            }).then(function(response) {
                    return response.json();
                  }).then(function(data) {
                    returnError = data.body.error;
                  });
            if(returnError != 'Not the correct password'){
              try {
                  let returnName = '';
                  let returnEmail = '';
                  let returnSettings = null;
                  let returnGroups = [];
                  let returnProjects = [];
                  const res = await fetch(`${baseUrl}users/${email}`, {
                    method: 'GET',
                  }).then(function(response) {
                    return response.json();
                  }).then(function(data) {
                    returnEmail = data.body.userId;
                    returnName = data.body.name;
                    returnSettings = data.body.settings;
                    returnGroups = data.body.groups;
                    returnProjects = data.body.projects;
                  });
                  return {returnName, returnEmail, returnSettings, returnGroups, returnProjects};

                } catch (error) {
                    return;
                  }
                }

          }catch(error){
                return;
        }
      }
async function register(email, password, settings, name, groups, projects)  {
  try {
        const userId = email;
        const newUser = { userId, name, groups, projects, settings, password }
        const res = await fetch(`${baseUrl}users`, {
            method: 'POST',
            body: JSON.stringify(newUser)
          })
          if (!res.ok) {
            throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)
          }
          else{
            return true;
          }
      } catch (error) {
        return 'error';
       }
}
async function updateUser(user){
  console.log('updainging user');
  try{
    console.log(user);
    const userId = user.id
    console.log(userId);
    const res = await fetch(`${baseUrl}users/update/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(user)
    })
    if(!res.ok){
      throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)
    }

  }catch(error){
    return 'error';
  }
}
async function updateUserGroup(userId, groupId){
  console.log('updating group user');
  try{
    const res = await fetch(`${baseUrl}users/update/group/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(groupId)
    })
    if(!res.ok){
      throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)
    }

  }catch(error){
    return 'error';
  }
}
  
export {login, register, updateUser, updateUserGroup};