
/*
* Task: Object Reader
*/

/*
(function(){
    "use strict";
    
    var objectFactory=function(name,age){
        return {
            'name':name,
            'age':age
        }
    }

    var objectReader=function(obj){
        console.log("Name:",obj.name);
        console.log("Age:",obj.age);
    }

    var obj1=new objectFactory('Harry',20);
    objectReader(obj1);

})();
*/



/*
* Task: Closure
*/

/*
(function(){
    "use strict";

    function valueFunction(){
        var value;
      
        var getter=function(){
            return value;
        }
        var setter=function(newValue){
            value=newValue;
        }

        return {
            get:getter,
            set:setter
        }
    }

  var obj=new valueFunction();
  obj.set(2);
  console.log(obj.get());

})();
*/


/*
* Task: Array
*/

(function(){
    "use strict";

    var globalArray=[2,3,4];
    
    var addMethods=function(){
        return {
            first:function(val){
                globalArray.unshift(val);
            },
            last:function(val){
                globalArray.push(val);
            },
            specific:function(val,index){
                globalArray.splice(index,0,val);
            }
        }
    }

    var delMethods=function(){
        return {
            first:function(){
                globalArray.shift();
            },
            last:function(){
                globalArray.pop();
            },
            specific:function(index){
                globalArray.splice(index,1);
            }
        }
    }

    var updateMethods=function(){
        return{
            specific:function(val,index){
                globalArray[index]=val;
            }
        }
    }

    var add=new addMethods();
    var del=new delMethods();
    var updt=new updateMethods();

    console.log('Array:',globalArray);
    //del.specific(0);
    //add.last(3);
    //del.last();
    //updt.specific(100,2);
    console.log(globalArray); 
})();
