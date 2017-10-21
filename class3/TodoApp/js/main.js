(function () {
    "use strict";

    var taskArray = [];
    var isEditMode = false;
    var inputTask;
    var btnInput;
    var btnFilterAll;
    var btnFilterActive;
    var btnFilterCompleted;

    //Initialize all storage data to Array
    var initStorageTaskDataToArray = function () {
        if (!(localStorage.getItem("tasks") === null)) {
            taskArray = JSON.parse(localStorage.tasks);
        }
        console.log("Task Array Initialized as", taskArray);
    }

    //Add task-filter property to storage data with value 'all'
    var initFilterStorage = function () {
        if ((localStorage.getItem("task-filter") === null)) {
            localStorage.setItem("task-filter", 'all');
        }
    }

    //Render Functions Collection
    var renderFunctions = function () {
        var taskListDiv = document.getElementById("taskList");
        var taskDivs = document.getElementsByClassName("task");

        //Clear Display Elements
        var clearDisplay = function () {
            while (taskDivs[0]) {
                taskDivs[0].parentNode.removeChild(taskDivs[0]);
            }
        }

        //Make Filter Active
        var makeFilterButtonActive = function (btnName) {
            if (btnName == 'all') {
                btnFilterAll.style.opacity = "1";
                btnFilterActive.style.opacity = "0.5";
                btnFilterCompleted.style.opacity = "0.5";
            }
            if (btnName == 'active') {
                btnFilterAll.style.opacity = "0.5";
                btnFilterActive.style.opacity = "1";
                btnFilterCompleted.style.opacity = "0.5";
            }
            if (btnName == 'complete') {
                btnFilterAll.style.opacity = "0.5";
                btnFilterActive.style.opacity = "0.5";
                btnFilterCompleted.style.opacity = "1";
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
                    makeFilterButtonActive("all");
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
                    makeFilterButtonActive("active");
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
                    makeFilterButtonActive("complete");
                }
            }

            //Write New Elements
            taskArray.forEach(function (task) {
                var div = document.createElement("div");
                div.className = "panel-body task";

                //Checkbox
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.className = "checkbox";
                checkbox.id = task.id;
                if (task.type == "complete") {
                    checkbox.checked = true;
                } else {
                    checkbox.checked = false;
                }
                div.appendChild(checkbox);
                //Span
                var span = document.createElement("span");
                span.innerHTML = task.name;
                div.appendChild(span);
                //Delete Button
                var btnDelete = document.createElement("button");
                btnDelete.innerHTML = "Delete";
                btnDelete.className = "btn btn-danger delete";
                btnDelete.id = "delete";
                btnDelete.value = task.id;
                div.appendChild(btnDelete);
                //Edit Button
                var btnEdit = document.createElement("button");
                btnEdit.innerHTML = "Edit";
                btnEdit.className = "btn btn-warning edit";
                btnEdit.id = "edit";
                btnEdit.value = task.id;
                div.appendChild(btnEdit);

                taskListDiv.appendChild(div);

                console.log(task);
            }, this);

            //BInding event with new doms
            domBinding();
        }

        return {
            'displayTasks': displayTasks,
            'makeFilterButtonActive': makeFilterButtonActive
        }
    }
    var render = new renderFunctions;

    //Get Last task ID function 
    var getLastTaskIdFromStorage = function () {
        var taskId = 0;
        if (!(localStorage.getItem("tasks") === null)) {
            taskArray = JSON.parse(localStorage.tasks);
            for (var i = 0; i < taskArray.length; i++) {
                if (taskId < taskArray[i].id) {
                    taskId = taskArray[i].id;
                }
            }

        }
        return taskId;
    }

    var createNewTask = function (value, taskId) {
        //Get Last task ID
        var taskId = getLastTaskIdFromStorage() + 1;
        console.log("Task Id:", taskId);
        return {
            'id': taskId,
            'name': value,
            'type': "active"
        }
    }

    var addTaskToStorage = function (value) {
        //fill global Task Array from data of Local Storage
        //Get Every taskFrom Local Storage
        initStorageTaskDataToArray();

        var newTask = createNewTask(value);
        //Adding task to global task array
        taskArray.push(newTask);
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
        if (isEditMode == false) {
            var inputValue = inputTask.value;
            console.log("Input Button Presed");
            addTaskToStorage(inputValue);
            inputTask.value = "";
            render.displayTasks();
        } //EDITING
        else {
            var editTaskId = inputTask.getAttribute('data');
            console.log("Editing: ", editTaskId);

            //Get Every taskFrom Local Storage
            initStorageTaskDataToArray();
            //Find and insert to temporary
            var i;
            for (i = 0; i < taskArray.length; i++) {
                if (taskArray[i].id == editTaskId) {
                    taskArray[i].name = inputTask.value;
                }
            }
            //Before Adding task to storage, sorting takes place
            function compare(a, b) {
                if (a.name < b.name)
                    return -1;
                if (a.name > b.name)
                    return 1;
                return 0;
            }
            taskArray.sort(compare);

            localStorage.setItem("tasks", JSON.stringify(taskArray));
            inputTask.value = "";
            btnInput.innerText = "Add Task";
            //After editing done. set mode to false
            isEditMode = false;
            render.displayTasks();
        }
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

    var btnDeleteEvent = function () {
        var deleteItemId = this.value;
        //Get Every taskFrom Local Storage
        initStorageTaskDataToArray();
        var i;
        for (i = 0; i < taskArray.length; i++) {
            if (taskArray[i].id == deleteItemId) {
                taskArray.splice(i, 1);
            }
        }
        localStorage.setItem("tasks", JSON.stringify(taskArray));
        render.displayTasks();
        console.log("Delete Button Pressed", this.value);
    }

    var checkboxButtonEvent = function () {
        var changeItemId = this.id;
        //Get Every taskFrom Local Storage
        initStorageTaskDataToArray();
        var i;
        for (i = 0; i < taskArray.length; i++) {
            if (taskArray[i].id == changeItemId) {
                if (taskArray[i].type == 'active') {
                    taskArray[i].type = 'complete';
                }
                else
                    taskArray[i].type = 'active';
            }
        }
        localStorage.setItem("tasks", JSON.stringify(taskArray));
        console.log("CheckboxEffect", taskArray);
        render.displayTasks();
    }

    var btnEditEvent = function () {
        console.log("Edit:", this.value);
        var editItemId = this.value;
        //Get Every taskFrom Local Storage
        initStorageTaskDataToArray();
        var i;
        for (i = 0; i < taskArray.length; i++) {
            if (taskArray[i].id == editItemId) {
                inputTask.value = taskArray[i].name;
                inputTask.setAttribute('data', editItemId);
            }
        }
        btnInput.innerText = "Save Change";
        isEditMode = true;
    }

    var domBinding = function () {
        //Doms
        inputTask = document.getElementById('inputTask');
        btnInput = document.getElementById('btnInput');
        btnFilterAll = document.getElementById('btnFilterAll');
        btnFilterActive = document.getElementById('btnFilterActive');
        btnFilterCompleted = document.getElementById('btnFilterCompleted');

        var deleteButtons = document.querySelectorAll(".delete");
        for (var i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener('click', btnDeleteEvent);
        }

        var checkboxButtons = document.querySelectorAll(".checkbox");
        for (var i = 0; i < checkboxButtons.length; i++) {
            checkboxButtons[i].addEventListener('change', checkboxButtonEvent);
        }

        var editButtons = document.querySelectorAll(".edit");
        for (var i = 0; i < editButtons.length; i++) {
            editButtons[i].addEventListener('click', btnEditEvent);
        }
        //Events
        btnInput.addEventListener('click', btnInputEvent);
        btnFilterAll.addEventListener('click', btnFilterAllEvent);
        btnFilterActive.addEventListener('click', btnFilterActiveEvent);
        btnFilterCompleted.addEventListener('click', btnFilterCompletedEvent);
    }



    function init() {
        initStorageTaskDataToArray();
        initFilterStorage();
        domBinding();
        render.displayTasks();
    }
    init();
})();