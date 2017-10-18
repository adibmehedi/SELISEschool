
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
  var obj1=new valueFunction();
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

    
    //console.log(globalArray[0]);


})();
