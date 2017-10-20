(function () {
    "use strict";

    var taskArray = [];
    if (!(localStorage.getItem("tasks") === null)) {
        taskArray = JSON.parse(localStorage.tasks);
    }
    console.log("Task Array Initialized as", taskArray);

    //Render Functions
    var renderFunctions = function () {
        var taskListDiv = document.getElementById("taskList");
        var taskDivs = document.getElementsByClassName("task");
        
        //Clear Display Elements
        var clearDisplay=function(){
            while (taskDivs[0]) {
                taskDivs[0].parentNode.removeChild(taskDivs[0]);
            }
        }
       
        //Display Tasks Function
        var displayTasks = function () {
            clearDisplay();
            //Filing Global Task Array accoring to choice
            if (!(localStorage.getItem("task-filter") === null)) {
                if (localStorage.getItem("task-filter") == "all") {
                    //Get Every taskFrom Local Storage
                    if (!(localStorage.getItem("tasks") === null)) {
                        taskArray = JSON.parse(localStorage.tasks);
                    }
                }
                if (localStorage.getItem("task-filter") == "active") {
                    //Get Every taskFrom Local Storage
                    if (!(localStorage.getItem("tasks") === null)) {
                        taskArray = JSON.parse(localStorage.tasks);
                    }
                    //Filter
                    taskArray = taskArray.filter(function (task) {
                        return task.type == 'active';
                    });
                }
                if (localStorage.getItem("task-filter") == "complete") {
                    //Get Every taskFrom Local Storage
                    if (!(localStorage.getItem("tasks") === null)) {
                        taskArray = JSON.parse(localStorage.tasks);
                    }
                    //Filter
                    taskArray = taskArray.filter(function (task) {
                        return task.type == 'complete';
                    });
                }
            }

            //Write New Elements
            var counter = 0;
            taskArray.forEach(function (task) {
                var div = document.createElement("div");
                div.className = "panel-body task";
                //Span
                var span=document.createElement("span");
                span.innerHTML = task.name;
                div.appendChild(span);
                //Edit Button
                var btnEdit=document.createElement("button");
                btnEdit.innerHTML = "Edit";
                btnEdit.className = "btn btn-warning edit";
                btnEdit.id="edit";
                btnEdit.value=counter;
                div.appendChild(btnEdit);
                //Edit Button
                var btnDelete=document.createElement("button");
                btnDelete.innerHTML = "Delete";
                btnDelete.className = "btn btn-danger delete";
                btnDelete.id="delete";
                btnDelete.value=counter;
                div.appendChild(btnDelete);

                taskListDiv.appendChild(div);

                console.log(task);
                counter++;
            }, this);

            //BInding event with new doms
            domBinding();
        }

        return {
            'displayTasks': displayTasks
        }
    }
    var render = new renderFunctions;


    var createNewTask = function (value) {
        return {
            'name': value,
            'type': "active"
        }
    }

    var addTaskToStorage = function (value) {
        //fill global Task Array from data of Local Storage
        //Get Every taskFrom Local Storage
        if (!(localStorage.getItem("tasks") === null)) {
            taskArray = JSON.parse(localStorage.tasks);
        }

        //Adding task to global task array
        taskArray.push(createNewTask(value));
        //Before Adding task to storage, sorting takes place
        function compare(a, b) {
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        }
        taskArray.sort(compare);

        console.log("Going to local", taskArray);
        localStorage.setItem("tasks", JSON.stringify(taskArray));
    }

    var btnInputEvent = function () {
        var inputValue = inputTask.value;
        console.log("Input Button Presed");
        addTaskToStorage(inputValue);
        inputTask.value = "";
        render.displayTasks();
    }

    var btnFilterAllEvent = function () {
        localStorage.setItem("task-filter", "all");
        render.displayTasks();
    }
    var btnFilterActiveEvent = function () {
        localStorage.setItem("task-filter", "active");
        render.displayTasks();

    }
    var btnFilterCompletedEvent = function () {
        localStorage.setItem("task-filter", "complete");
        render.displayTasks();
    }

    var btnDeleteEvent=function(){
       console.log(this.value);
    }

    var domBinding = function () {
        //Doms
        var inputTask = document.getElementById('inputTask');
        var btnInput = document.getElementById('btnInput');
        var btnFilterAll = document.getElementById('btnFilterAll');
        var btnFilterActive = document.getElementById('btnFilterActive');
        var btnFilterCompleted = document.getElementById('btnFilterCompleted');

         var deleteButtons = document.querySelectorAll(".delete");
         for(var i=0;i<deleteButtons.length;i++){
            deleteButtons[i].addEventListener('click',btnDeleteEvent);
         }
        //Events
        btnInput.addEventListener('click', btnInputEvent);
        btnFilterAll.addEventListener('click', btnFilterAllEvent);
        btnFilterActive.addEventListener('click', btnFilterActiveEvent);
        btnFilterCompleted.addEventListener('click', btnFilterCompletedEvent);
    }



    function init() {
        domBinding();
        render.displayTasks();
        //localStorage.setItem("tasks", JSON.stringify(taskArray));
        //var t = JSON.parse(localStorage.taskArray);
        //console.log(t);
    }
    init();
})();