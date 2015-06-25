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
			
childref.child(title).on( "value", function (snapshot){
  if(snapshot){
    alert("the following event already exist choose unique title");
    getAppointment();
  console.log (snapshot.val());
}

})

/*childref.child(title).setWithPriority(priority, priority)	

 childref.child(title).set({
 start:start,
 tasks:tasks,
 title:title,
 finish:finish,
 priority:priority
 	});*/
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
    var childtext = "\""+adate +"\",\""+ title+"\"".toString();
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
function removeChildky(parent,child){
  var childnode=parent +"/"+ child
  //childon=childon.replace('!','/').toString
  ref.child(childnode).remove();
  console.log(childnode);
  //
}

var updatenode=''
function editChildky(parent,child){
  var childnode=parent +"/"+ child
 updatenode=childnode;
  var table=document.getElementById('form');
  ref.child(childnode).on("value", function (snapshot) {
    var open ="<tr>";
    
    document.getElementById('appdate').value=parent;
    document.getElementById('title').value=child;
    document.getElementById('starttime').value=snapshot.val()['start'];
    
    document.getElementById('finishtime').value=snapshot.val()['finish'];
     
    document.getElementById('priority').value=snapshot.val()['priority'];
    document.getElementById('task').value=snapshot.val()['tasks'];

  })

  
 
}


function updatechild(){
  if(!updatenode) {
    alert('cannot alert')
    return;}
  var parents = $("#appdate").val();
  var childref = ref.child(parents);//this is the parent node :Date
  var tasks = $("#task").val();
  var start = $("#starttime").val();
  var title = $("#title").val();
  var finish = $("#finishtime").val();
  var priority = $("#priority").val();
console.log(updatenode);

 

  ref.child(updatenode).update({
    start:start,
    tasks:tasks,
    title:title,
    finish:finish,
    priority:priority
  });



}
