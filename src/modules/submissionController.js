module.exports = {
    createTimeRecord: function(links){
        const username = this.user.name;
        const uuidv4 = require('uuid/v4');
        const time = this.min + (this.hr * 60);
        const d = new Date();
        const date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
        const groupId = this.group.groupId;
        const task = document.querySelector('#time-task').value;
        const projectId = this.projects[this.projectTab].projectId;
        const taskDescription = document.querySelector('#time-description').value;
        const timeRecordId = uuidv4();
        const newSubmission = { timeRecordId, task, taskDescription, time, projectId, groupId, links, date, username};
        document.getElementById('timeForm').reset();
        this.reset();
        this.$store.commit('createTimeSubmission', newSubmission);
        this.updateProject();
    },
    createExpenseRecord: function(){
        const uuidv4 = require('uuid/v4');
        const task = document.querySelector('#expense-task').value;
        const groupId = this.group.groupId;
        const d = new Date();
        const date = d.getDate + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
        const projectId = this.projects[this.projectTab].projectId;
        const expenseDescription = document.querySelector('#expense-description').value;
        const expenseDate = document.querySelector('#expense-date').value;
        const expenseCost = document.querySelector('#expense-cost').value;
        const expensesRecordId = uuidv4();
        const newSubmission = { expensesRecordId, expenseCost, expenseDate, expenseDescription, task, projectId, groupId, date};
        document.getElementById('expenseForm').reset();
  
        this.$store.commit('createExpenseSubmission', newSubmission);
        console.log(newSubmission);
        this.updateProject();
      },
      addFile: function(){
        let links = [];
        const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
        try {
          const images = document.querySelector('#images').files;
          const processImage = (files, valid) => {
            const promise = Array.from(files).map(async (file) => {
              const Key = `${'hadcad'}-${'job'}-${file.name}`;
  
              const imageParams = {
                ACL: 'public-read',
                Bucket: 'hadcad-files',
                Key,
                Body: file,
              };
              console.log(imageParams);
              links.push('https://s3.amazonaws.com/' +  'hadcad-files' + '/' + Key);
              await s3.upload(imageParams).promise();
            });
  
            return promise;
          };
  
          const imagePromises = processImage(images);
          console.log(links);
  
  
          try {
            await Promise.all(imagePromises.concat(imagePromises));
            this.createTimeRecord(links)
  
          } catch (error) {
            console.error(error);
          }
        } catch (error) {
          console.error(error);
        }
      },
  };