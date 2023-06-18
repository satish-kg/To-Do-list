let tasks = [];
console.log("js working");
document.getElementById('submit-button').addEventListener('click', function(event){
    event.preventDefault();

    const taskname = document.getElementById('task').value;
    const datetimelcl = document.getElementById('datetime-lcl').value;

    if(!taskname || !datetimelcl){
        showError('Error : Please fill both - "Task" & "Time" !!');
        return;
    }

    const task = {
        id : generateUniqueId(),
        taskname : taskname,
        datetimelcl : datetimelcl
    }

    tasks.push(task);

    showSuccess('Task Added Successfully !!');
    displayTasks();

    document.getElementById('task').innerText = '';
    document.getElementById('datetime-lcl').innerText = '';
});

function generateUniqueId(){
    return tasks.length > 0 ? tasks[tasks.length-1].id+1 : 1;
}

function displayTasks(){
    const outputbox = document.getElementById('output-box');
    outputbox.innerText = '';

    tasks.forEach(function(task){
        console.log(task.taskname);
        const taskbox = document.createElement('div');
        taskbox.setAttribute('id', 'taskbox');
        const serialnumbox = document.createElement('div');
        serialnumbox.setAttribute('id', 'serialnumbox')
        const p1 = document.createElement('p');
        p1.innerHTML = `${task.id}. `;
        serialnumbox.appendChild(p1);
        const tasknamebox = document.createElement('div');
        tasknamebox.setAttribute('id', 'tasknamebox')
        const p2 = document.createElement('p');
        p2.innerHTML = ' Task : '+`${task.taskname} `;
        tasknamebox.appendChild(p2);
        const datetimebox = document.createElement('div');
        datetimebox.setAttribute('id', 'datetimebox')
        const p3 = document.createElement('p');
        p3.innerHTML = ' Time : '+`${task.datetimelcl} `;
        datetimebox.appendChild(p3);

        taskbox.appendChild(serialnumbox);
        taskbox.appendChild(tasknamebox);
        taskbox.appendChild(datetimebox);

        outputbox.appendChild(taskbox);

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', 'delete-button');
        deleteButton.innerText = 'Delete Task';
        deleteButton.addEventListener('click', function(){
            deleteTask(task.id);
            taskbox.remove();
            displayTasks();
        });
        taskbox.appendChild(deleteButton);
    });   
}

function deleteTask(id){
    tasks = tasks.filter(function(task){
        return task.id!==id;
    });
    for(let i = 0; i < tasks.length; i++){
        tasks[i].id = i+1;
    }
    displayTasks();
    // console.log(tasks);
}

function showSuccess(message) {
    const successMessage = document.getElementById('successMessage');
    successMessage.innerHTML = message;
    successMessage.classList.add('success');
  
    setTimeout(function() {
      successMessage.innerHTML = '';
      successMessage.classList.remove('success');
    }, 3000);
}
  
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerHTML = message;
    errorMessage.classList.add('error');

    setTimeout(function() {
        errorMessage.innerHTML = '';
        errorMessage.classList.remove('error');
    }, 3000);
}

displayTasks();