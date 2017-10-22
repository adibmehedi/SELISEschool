(function () {
    "use strict";
    var numberOfRow;
    var numberOfColumn;

    var tableData = function () {
        return [
            ["Data 1", "Data 2", "Data 3"],
            ["Data A", "Data B", "Data C"],
            ["Data 9", "Data 8", "Data 7"],
            ["Data X", "Data Y",  "Data Z"],
        ];
    }

    var initializeRowColumnCount = function () {
        numberOfRow = tableData().length;
        numberOfColumn = tableData()[0].length;
        console.log("Row Count:" + numberOfRow + " Column count:" + numberOfColumn);
    }

    var getTableData = function (row, col) {
        //If data exists 
        if (tableData()[row][col]!=undefined){
            return tableData()[row][col];
        }else
            return "Data not avaiable"; 

    }

    var drawTable = function () {
        var table = document.createElement("table");
        table.className = "table table-bordered";
        document.body.appendChild(table);
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
        for (var i = 0; i < numberOfRow; i++) {
            var tr = document.createElement("tr");
            for (var j = 0; j < numberOfColumn; j++) {
                var td = document.createElement("td");
                td.innerText = getTableData(i, j);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    }

    function init() {
        initializeRowColumnCount();
        drawTable();
    }

    init();
}).call(this);