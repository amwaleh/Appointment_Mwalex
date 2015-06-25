var ref = new Firebase("https://mwaleh001.firebaseio.com/");
 highestPriority = 0;

var setAppointment = function() {
  var parents = $("#appdate").val();
  var childref = ref.child(parents);//this is the parent node :Date
  var tasks = $("#task").val();
  var start = $("#starttime").val();
  var title = $("#title").val();
  var finish = $("#finishtime").val();
  var priority = $("#priority").val();
			
childref.child(title).setWithPriority(true,highestPriority + priority)	

 childref.child(title).set({
 start:start,
 tasks:tasks,
 title:title,
 finish:finish,
 priority:priority
 	});
};
//retrieve data using for specific date
function getAppointment(){
ref.orderByPriority().on("value", function (snapshot) {
 var adate = document.getElementById("appdate").value;
 var div = document.getElementById('show');;
 var a = snapshot.val();
 var firstnod = a[adate]; 

div.innerHTML ='<div class="Events">';
var icons='';
//gets the title of the task 
for ( title in firstnod) {
 div.innerHTML = div.innerHTML +'<div class="title">'+ title.toUpperCase();

//gets propertis firstnod[title][pro]= value of property

  for (pro in firstnod[title]){ 
    var childtext = "\""+adate +"/"+ title+"\"".toString();;
    icons="<a ><img id='edit' src='images/edit.png' onclick='editChildky(" + childtext +")';'><img id='edit' src='images/delete.png' onclick='removeChildky(" + childtext +")';'></a>"
   div.innerHTML = div.innerHTML +'<div  class="property"><li>' + pro +'</li> <li> '+ firstnod[title][pro] +'</li></div>';
	}
  div.innerHTML = div.innerHTML + icons+'</div>'
}
       
  div.innerHTML = div.innerHTML +'</div>'
});
}


function getAllAppointment(){
 ref.on("value", function (snapshot) {
  
  var div = document.getElementById('show');;
  var a = snapshot.val();
     
  div.innerHTML ='<div class="Events">';
//gets the title of the task 
for (adate in a){
 var firstnod = a[adate]; 
 div.innerHTML = div.innerHTML +'<div class="title"> '+ adate.toUpperCase()+'</date>';
for ( title in firstnod) {
 div.innerHTML = div.innerHTML +'<div class="title"> '+ title.toUpperCase();

//gets propertis firstnod[title][pro]= value of property

  for (pro in firstnod[title]){ 
   div.innerHTML = div.innerHTML + '<div  class="property"><li>' + pro +'</li> <li>'+ firstnod[title][pro] +'</li></div>';
  }
   div.innerHTML = div.innerHTML +'</div>'
}
div.innerHTML = div.innerHTML +'</div>'
}

});

}

//check if appointment exist

//
function removeChildky(childnode){
  //childon=childon.replace('!','/').toString
  ref.child(childon).remove();
  console.log(childon);
  //
}
function editChildky(childnode){
  ref.child(childnode).on("value", function (snapshot) {
    //for( key in snapshot.val()){
      console.log(snapshot.val()["finish"]);
   // }
  //
});
}

