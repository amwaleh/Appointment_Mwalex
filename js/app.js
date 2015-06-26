
document.getElementById('data').style.display='none';

var ref = new Firebase("https://mwaleh001.firebaseio.com/");
 highestPriority = 0;
 
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
  } 

if(mm<10) {
    mm='0'+mm
  } 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById('appdate').value=today;


	
ref.child(today).orderByChild("priority").on("value", function (snapshot) {
 ;
 var div = document.getElementById('reminder');;
 var firstnode = snapshot.val();
 //if(firstnode!==null)return;;

 div.innerHTML ='<div class="Events">';
   var icons='';
//gets the title of the task 
for ( title in firstnode) {
 div.innerHTML = div.innerHTML+ icons +'<div class="title"><h2>Tasks for Today</h2>'+ title.toUpperCase() ;

//gets propertis firstnod[title][pro]= value of property

  for (pro in firstnode[title]){
  	
    var childtext = "\""+today +"\",\""+ title+"\"".toString();
    icons="<a href='#' ><img id='edit' src='images/edit.png' onclick='editChildky(" + childtext +")';'><img id='edit' src='images/delete.png' onclick='removeChildky(" + childtext +")';'></a>"
    div.innerHTML = div.innerHTML +'<div  class="property"><li>' + pro +'</li> <li> '+ firstnode[title][pro]+'</li></div>';
	}
    div.innerHTML = div.innerHTML +'</div>'
    }
       
    div.innerHTML = div.innerHTML +'</div>'
    });

var setAppointment = function() {
  var parents = $("#appdate").val();
  var childref = ref.child(parents);//this is the parent node :Date
  var tasks = $("#task").val();
  var start = $("#starttime").val();
  var title = $("#title").val();
  var finish = $("#finishtime").val();
  var priority = $("#priority").val();
			


childref.child(title).setWithPriority(priority,priority)	
	
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

//retrieves data for editing

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

 document.getElementById('addtask').style.display='none';
 document.getElementById('Btnupdate').style.display='block';
 document.getElementById('button2').style.display='none';
 document.getElementById('data').style.display='block';
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

document.getElementById('Btnupdate').style.display='none';
document.getElementById('button2').style.display='block';
document.getElementById('addtask').style.display='block';
document.getElementById('data').style.display='none';
document.getElementById('data').reset();
}

	
function checkTitle(){
 var title = $("#title").val();
 var parents = $("#appdate").val();
 var childref = ref.child(parents);//this is the parent node :Date
childref.child(title).on( "value", function (snapshot){
		
if( document.getElementById('Btnupdate').style.display==='none'){
  if(snapshot.val() !== null){
    document.getElementById('warning-title').innerHTML="the following event already exist choose unique title";
    document.getElementById('button2').style.display='none';
   }
else {
	document.getElementById('warning-title').innerHTML=''
	document.getElementById('button2').style.display='block';
}
	}
	})

}

	
