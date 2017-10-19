(function(){
    "use strict";

    var globalArray=[2,3,4];

    //Add Methods Collection
    var addMethods=function(){
        var view=new viewController();
        
        return {
            first:function(){
                var val=view.getInput();
                globalArray.unshift(val);
                view.updateDisplay();
            },
            last:function(){
                var val=view.getInput();
                globalArray.push(val);
                view.updateDisplay();
            },
            specific:function(){
                var val=view.getInput();
                var index=view.getIndex();
                globalArray.splice(index,0,val);
                view.updateDisplay();
            }
        }
    }

    //Delete Methods Collection
    var delMethods=function(){
        var view=new viewController();

        return {
            first:function(){
                globalArray.shift();
                console.log(globalArray);
                view.updateDisplay();
            },
            last:function(){
                globalArray.pop();
                view.updateDisplay();
            },
            specific:function(){
                var index=view.getIndex();
                globalArray.splice(index,1);
                view.updateDisplay();
            }
        }
    }

    //Update Methods Collection
    var updateMethods=function(){
        var view=new viewController();

        return{
            specific:function(){
                var val=view.getInput();
                var index=view.getIndex();
                globalArray[index]=val;
                view.updateDisplay();
            }
        }
    }

    //View Controller
    var viewController=function(){
        return {
            updateDisplay:function(){
                document.getElementById("arrayContainer").innerHTML="Array: "+ globalArray.toString();
            },

            getInput:function(){
                return document.getElementById("input").value;
            },

            getIndex:function(){
                return document.getElementById("index").value;
            },

            buttonEventListenerBinder:function(add, del, update){
                //Add Events
                document.getElementById("addFirst").addEventListener("click",add.first);
                document.getElementById("addLast").addEventListener("click",add.last);
                document.getElementById("addSpecific").addEventListener("click",add.specific);
                //Delete Events
                document.getElementById("delFirst").addEventListener("click",del.first);
                document.getElementById("delLast").addEventListener("click",del.last);
                document.getElementById("delSpecific").addEventListener("click",del.specific);
                //Update Events
                document.getElementById("updateSpecific").addEventListener("click",update.specific);
                console.log("listener Added");
            }
        }
    }

    //Initials
    function init(){
        var view=new viewController();
        view.updateDisplay();
        view.buttonEventListenerBinder(new addMethods(), new delMethods(), new updateMethods());
    }

    init();

})();



