 function getTrashIcon(newDiv) {
  const trashIcon = document.createElement("i");
  trashIcon.className = "fa-solid fa-trash-can";
  trashIcon.addEventListener("click", async (e) => {
    newDiv.classList.add("item-delete")
      setTimeout(() => {
        newDiv.remove();
        updateStoredTasks();
      }, 1000);
      
   
    // now that we have deleted the desired element 
    // we need to update it 
    // so the deleted item should also get deleted from local storage.
    updateStoredTasks();
  });

  return trashIcon;
}

function completeTask(newDiv) {
  const taskCompleted = document.createElement("i");
  taskCompleted.className ="fa-regular fa-circle-check";
  taskCompleted.addEventListener("click", async (e) => {
    // storing the completed task for the future
    const completed = newDiv.textContent;
    console.log(completed);
    newDiv.classList.add("task-completed")
    // wait for some time then remove the elemnt 
      setTimeout(() => {
        newDiv.remove();
         // now that we have deleted the desired element 
    // we need to update it 
    // so the deleted item should also get deleted from local storage.
        updateStoredTasks();
      }, 1000);
      
   
   
    
  });
  

  return taskCompleted;
}

// Function to update stored tasks in local storage
// it also stores the task if it is empty.
function updateStoredTasks() {
  // selects the newDiv and all of them
  const taskDivs = document.querySelectorAll(".item-list-container");
  // Array.from is a method for accesing all the array in that div or element
  //after storing all newDiv in taskDivs then applying the Array.from method
  // we use map method on that and select the h3 tag in it which was created
  //.map method will select all the input in the h3 tags.
  // store all the input text present in the h3 tag in the variable tasks.

  const tasks = Array.from(taskDivs).map(div => div.querySelector("h3").textContent);

  // now we have accesed all the input or text content in the h3 tag within all the divs.
  // now to set this values in the chromes storage we use local storage. setItems("task", tasks).
  // we will give key name tasks to all the array input.
  // and parder thar aarray input into jsonObjet with the help of (JSON.stringify(tasks))method.
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load stored tasks from local storage on page load
// when page gets reloded we use event listner on that so that it can reteive all the data we have stored above 
// it will also add the task if it found some task in the memory
window.addEventListener("load", () => {
 // we make a cons t variable name called (storedTasksJSON) it will get the element stored in storage.
 // with the name of tasks by using getItem method.
  const storedTasksJSON = localStorage.getItem("tasks");
  // now we convert storedTasksJSON to javascript object
  // we are storing it in the storedTasks.. if we dont found any data in storage we will return an empty array.
  const storedTasks = storedTasksJSON ? JSON.parse(storedTasksJSON) : [];
  // if found something in it we will run an for each loop in it 
  // to tiger the add_task function with stored input named (task) in this case.
  storedTasks.forEach((task) => {
    add_task(task);
  });
});

function add_task(input) {
  const itemList = document.querySelector(".item-list");
  const newDiv = document.createElement("div");
  newDiv.className = "item-list-container";
  const heading = document.createElement("h3");
  heading.textContent = input;
  newDiv.appendChild(heading);
  newDiv.appendChild(completeTask(newDiv));
  newDiv.appendChild(getTrashIcon(newDiv));
  itemList.appendChild(newDiv);

  // after adding the div we store it in the memory so we called this method
  updateStoredTasks();
}

function submitForm(event) {
  // form should not reload the page after clicking 
  // accessing the input field with it id 
  event.preventDefault();
  const input = document.getElementById("task-name");
  // passing the the captured input to the function which will add the task with the help of this input .
  // passing its value not the tag present inside it.
  add_task(input.value);
  // removing the text value so the user can write the new value or the textformField get empty
  input.value = "";
}
