var baseUrl = 'https://mgg7ne9n6g.execute-api.us-east-1.amazonaws.com/dev/';

async function createGroup(id, name, owners, projects, members) {
    try {
        const group = { id,name, owners, projects, members}
        const res = await fetch(`${baseUrl}data/group`, {
            method: 'POST',
            body: JSON.stringify(group)
        })
        if(res.ok){
            return group;
        }
        if (!res.ok) {
            throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)
        }
    } catch (error) {
        console.error(error)
    }
};


async function updateGroup(id, projects) {
      try {
          const updatedGroup = {projects};
          const res = await fetch(`${baseUrl}data/group/${id}`, {
              method: 'PUT',
              body: JSON.stringify(updatedGroup)
          })
          if (!res.ok) {
              throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)
          }
      } catch (error) {
      }
  };


async function deleteGroup(groupId) {
    try {
        const res = await fetch(`${baseUrl}data/group/${groupId}`, {
          method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)
      }

    } catch (error) {
    }

  };


async function getGroup(id) {
    let owners = '';
    let projects = '';
    let members = '';
    let name = '';
    try {
      const res = await fetch(`${baseUrl}data/group/${id}`, {
        method: 'GET',
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log('group data');
        console.log(data);
        name = data.body.name;
        owners = data.body.owners;
        projects = data.body.projects;
        members = data.body.members;

      });
      let group = {id, name, owners, projects, members};
      return group;

    } catch (error) {
    } 
  };
export {createGroup, getGroup, deleteGroup, updateGroup};