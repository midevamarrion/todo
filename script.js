
function fetchTodos() {
    const userId = document.getElementById("userId").value;
  
    fetch(`https://dummyjson.com/todos/user/${userId}`)
      .then(response => response.json())
      .then(todos => displayTodos(todos))
      .catch(error => console.error(error));
  }
  
  
  function displayTodos(todos) {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
  
    todos.forEach(todo => {
      const listItem = document.createElement("li");
      listItem.textContent = todo.todo;
      if (todo.completed) {
        listItem.classList.add("completed");
      }
  
      const completeButton = document.createElement("button");
      completeButton.textContent = "Complete";
      completeButton.addEventListener("click", () => completeTask(todo.id));
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteTask(todo.id));
  
      listItem.appendChild(completeButton);
      listItem.appendChild(deleteButton);
  
      todoList.appendChild(listItem);
    });
  }
  
  
  function completeTask(todoId) {
    fetch(`https://dummyjson.com/todos/${todoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed: true
      })
    })
      .then(response => response.json())
      .then(updatedTodo => {
        const todoItem = document.getElementById(todoId);
        todoItem.classList.add("completed");
        console.log(updatedTodo);
      })
      .catch(error => console.error(error));
  }
  
  
  function deleteTask(todoId) {
    fetch(`https://dummyjson.com/todos/${todoId}`, {
      method: 'DELETE'
    })
      .then(response => {
        const todoItem = document.getElementById(todoId);
        todoItem.remove();
        console.log("Task deleted successfully.");
      })
      .catch(error => console.error(error));
  }
  
  
  function addTask() {
    const userId = document.getElementById("userId").value;
    const newTaskInput = document.getElementById("newTaskInput");
    const task = newTaskInput.value;
  
    fetch(`https://dummyjson.com/todos/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: task,
        completed: false,
        userId: userId,
      })
    })
      .then(response => response.json())
      .then(addedTodo => {
        newTaskInput.value = ""; 
        const todoList = document.getElementById("todoList");
        const listItem = document.createElement("li");
        listItem.id = addedTodo.id;
        listItem.textContent = addedTodo.todo;
        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.addEventListener("click", () => completeTask(addedTodo.id));
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(addedTodo.id));
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
        console.log("Task added successfully.");
      })
      .catch(error => console.error(error));
  }
  