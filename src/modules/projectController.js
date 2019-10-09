var baseUrl = 'https://mgg7ne9n6g.execute-api.us-east-1.amazonaws.com/dev/';

async function createProject(id, name, description, status, clients, budget, deadline, members, data, lists, group ) {
      try {
        console.log('here4');
          const newProject = {id, name, description, status, clients, budget, deadline, data, members, lists, group }
          const res = await fetch(`${baseUrl}data/project`, {
              method: 'POST',
              body: JSON.stringify(newProject)
          })
          console.log('here5');

          if (!res.ok) {
          console.log(res)
              throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)
          }

      } catch (error) {
          console.error(error)
      }
};
async function getProject(id) {
  try {
    let name = '';
    let status = '';
    let description = '';
    let clients = null;
    let budget = null;
    let deadline = '';
    let data = null;
    let members = null;
    let lists = null;
    let group = null;
    const res = await fetch(`${baseUrl}data/project/${id}`, {
      method: 'GET',
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
      lists = data.body.lists;
      group = data.body.group;
      members = data.body.members;
      id = data.body.id;
      status = data.body.status;
      name = data.body.name;
      description = data.body.description;
      clients = data.body.clients;
      budget = data.body.budget;
      deadline = data.body.deadline;
      data = data.body.data;
    });
    const project = { id, name, status, description, clients, budget, deadline, data, members, lists, group };
    return project;
  } catch (error) {
    console.error(error)
  }
};
async function updateProject(id, data) {
  try {
      const updatedProject = {data};
      const res = await fetch(`${baseUrl}data/project/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedProject)

    })
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)
    }

  } catch (error) {
  }
};
async function deleteProject(id) {
  try {
      const res = await fetch(`${baseUrl}data/project/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)
    }

  } catch (error) {
  }
};

export {createProject, getProject, updateProject, deleteProject};