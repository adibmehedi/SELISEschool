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

        //Set Button Opacity Value
        var setButtonOpacity = function (btnFilterAllValue, btnFilterActiveValue, btnFilterCompletedValue) {
            btnFilterAll.style.opacity = btnFilterAllValue;
            btnFilterActive.style.opacity = btnFilterActiveValue;
            btnFilterCompleted.style.opacity = btnFilterCompletedValue;
        }

        //Make Filter Active
        var makeFilterButtonActive = function (btnName) {
            if (btnName == 'all') {
                setButtonOpacity(1, 0.7, 0.7);
            }
            if (btnName == 'active') {
                setButtonOpacity(0.7, 1, 0.7);
            }
            if (btnName == 'complete') {
                setButtonOpacity(0.7, 0.7, 1);
            }
        }

        var createElement = function (tagName, className = null, parentTag = null, id = null, value = null) {
            var elem = document.createElement(tagName);
            elem.className = className;
            elem.value = value;
            elem.id = id;
            parentTag.appendChild(elem);

            return elem;
        }

        //Create Div Element 
        var createDiv = function (className, parentTag, id) {
            return createElement('div', className, parentTag, id);
        }

        var createButton = function (className, parentTag, id, btnText,value=null) {
            var elem = createElement('button', className, parentTag, id, value);
            elem.innerText = btnText;
            return elem;
        }

        var createInput = function (className, parentTag, id, placeholder) {
            var elem = createElement('input', className, parentTag, id);
            elem.type = "text";
            elem.placeholder = placeholder;
            return elem;
        }

        var createCheckbox=function(className, parentTag, id){
            var elem = createElement('input', className, parentTag, id);
            elem.type = "checkbox";
            return elem;
        }

        var createSpan=function(innerText, parentTag){
            var elem = createElement('span','', parentTag);
            elem.innerText=innerText;   
            return elem;
        }



        //Display Static Parts
        var displayStaticParts = function (_callback) {
            var div_container_fluid = createDiv("container-fluid", document.body, );
            var div_row = createDiv("row", div_container_fluid);
            var div_col_md_6_first = createDiv("col-md-6", div_row);
            var div_form_group_inputDiv = createDiv("form-group inputDiv", div_col_md_6_first);
            var input_inputTask = createInput('form-control input-lg', div_form_group_inputDiv, 'inputTask', 'type task');
            var button_btnInput = createButton('btn btn-success', div_form_group_inputDiv, 'btnInput', 'Add Task');
            var div_col_md_6_second = createDiv("col-md-6", div_row);
            var div_form_group_form_inline = createDiv("form-group form-inline", div_col_md_6_second);
            var button_all = createButton('btn btn-success', div_form_group_form_inline, 'btnFilterAll', 'All');
            var button_active = createButton('btn btn-success', div_form_group_form_inline, 'btnFilterActive', 'Active');
            var button_complete = createButton('btn btn-success', div_form_group_form_inline, 'btnFilterCompleted', 'Completed');
            var div_panel = createDiv("panel", div_col_md_6_second, 'taskList');

            _callback();
        }

        //Display Tasks Function
        var displayTasks = function () {
            clearDisplay();
            //Filing Global Task Array accoring to choice
            if (!(localStorage.getItem("task-filter") === null)) {
                //Get Every taskFrom Local Storage
                initStorageTaskDataToArray();
                if (localStorage.getItem("task-filter") == "all") {
                    makeFilterButtonActive("all");
                }
                if (localStorage.getItem("task-filter") == "active") {
                    //Filter
                    taskArray = taskArray.filter(function (task) {
                        return task.type == 'active';
                    });
                    makeFilterButtonActive("active");
                }
                if (localStorage.getItem("task-filter") == "complete") {
                    //Filter
                    taskArray = taskArray.filter(function (task) {
                        return task.type == 'complete';
                    });
                    makeFilterButtonActive("complete");
                }
            }

            //Write New Elements
            taskArray.forEach(function (task) {
                taskListDiv = document.getElementById("taskList");
                var div = createDiv("panel-body task", taskListDiv);
                var checkbox = createCheckbox('checkbox',div,task.id);
                if (task.type == "complete") {
                    checkbox.checked = true;
                } else {
                    checkbox.checked = false;
                }
                var span =createSpan(task.name,div);
                var btnDelete = createButton('btn btn-danger delete',div,'delete','Delete',task.id);
                var btnEdit = createButton('btn btn-warning edit',div,'edit','Edit',task.id);
                console.log(task);
            }, this);
            //BInding event with new doms
            domBinding();
        }

        return {
            'displayStaticParts': displayStaticParts,
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
        //Check if input is empty
        if(inputTask.value==""){
            alert("Type Something !");
            return;
        }
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
        if(isEditMode){
            isEditMode=false;
            inputTask.value=null;
            btnInput.innerText = "Add Task";
        }
       
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
        console.log("in Dom binding function");
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
        render.displayStaticParts(domBinding);
        //domBinding();
        render.displayTasks();

    }
    init();
})();