console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // Establish Click Listeners
  setupClickListeners();
  // load existing tasks on page load
  getTasks();

  // Listeners for complete and delete buttons
  $("#tasks tbody").on("click", ".completeBtn", changeCompletionStatus);
  $("#tasks tbody").on("click", ".deleteBtn", deleteTask);
});

// Function to set up click listeners
function setupClickListeners() {
  $('#new-task-form').on('submit', function(event) {
    event.preventDefault();
    console.log('in addButton on submit');
    let taskToSend = {
      description: $("#task-description").val(),
    };

    saveTask(taskToSend); 
  });
}

// Function to append tasks to the DOM
function appendTasksToDOM(tasks) {
  $("#tasks tbody").empty();

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    $("#tasks tbody").append(`
      <tr class="${task.is_complete ? 'complete' : ''}">
        <td>${task.description}</td>
        <td>${new Date(task.created_at).toLocaleString()}</td>
        <td>${task.is_complete ? "Completed" : "Incomplete"}</td>
        <td>
          ${task.is_complete ? "" : `<button class="completeBtn" data-id=${task.id}>Mark as Complete</button>`}
          <button class="deleteBtn" data-id=${task.id}>Delete</button>
        </td>
      </tr>
    `);
  }
}

// Function to change the completion status of a task
function changeCompletionStatus(event) {
  const taskId = $(event.target).data("id");
  console.log("Change completion status for task id:", taskId);

  $.ajax({
    type: "PUT",
    url: `/tasks/${taskId}`,
    data: { is_complete: true },
  })
    .then(function (response) {
      console.log('Response from server.', response);
      getTasks();
    })
    .catch((err) => console.log("Error in PUT", err));
}

// Function to get all tasks
function getTasks() {
  console.log("in getTasks");
  $.ajax({
    type: "GET",
    url: "/tasks",
  })
    .then(function (response) {
      console.log(response);
      appendTasksToDOM(response);
    })
    .catch((err) => console.log("Error in GET", err));
}

// Function to save a new task
function saveTask(newTask) {
  console.log("in saveTask", newTask);
  $.ajax({
    type: "POST",
    url: "/tasks",
    data: newTask,
  })
    .then(function (response) {
      $("#task-description").val(""); // clear the input field
      getTasks();
    })
    .catch((err) => console.log("Error in POST", err));
}

// Function to delete a task
const deleteTask = (event) => {
  const id = $(event.target).data("id");

  $.ajax({
    method: "DELETE",
    url: `/tasks/${id}`,
  })
    .then(() => {
      getTasks();
    })
    .catch((err) => console.log(err));
};


