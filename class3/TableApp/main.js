(function(){
    "use strict";
    var numberOfRow=2;
    var numberOfColumn=3;
    var tableData=function(){
        return [
            ["Data 1","Data 2","Data 3"],
            ["Data A","Data B","Data C"],
        ];
    }

    var getTableData=function(row,col){
        return tableData()[row][col];
    }

    var drawTable=function(){
        var table = document.createElement("table");
        table.className="table";
        document.body.appendChild(table);
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
        for (var i=0; i<numberOfRow; i++){
            var tr = document.createElement("tr");
            for (var j=0; j<numberOfColumn; j++){
                var td = document.createElement("td");
                td.innerText = getTableData(i,j);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    }

    function init(){
        drawTable();
    }

    init();
}).call(this);