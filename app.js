
var ref = new Firebase("https://mwaleh001.firebaseio.com/");
 highestPriority = 0;

var setAppointment = function() {
  var parents= $("#appdate").val();
  var childref=ref.child(parents);//this is the parent node :Date
    var tasks = $("#task").val();
      var start = $("#starttime").val();
       var title = $("#title").val();
        var finish= $("#finishtime").val();  
			
childref.child(title).setWithPriority(true,highestPriority+500)	

 childref.child(title).set({
  Start: start,		
   tasks:	tasks,
    Title:	title,
     Finish: finish
      });
      };

function getAppointment(){
 ref.on("value", function (snapshot) {
  var adate = document.getElementById("appdate").value;
   var div = document.getElementById('show');;
    var a = snapshot.val();
     var firstnod = a[adate]; 
      div.innerHTML='<div class="Events">';
//gets the title of the task 
for ( title in firstnod) {
 div.innerHTML = div.innerHTML+'<div class="title"> '+ title.toUpperCase();

//gets propertis firstnod[title][pro]= value of property

  for (pro in firstnod[title]){ 
   div.innerHTML = div.innerHTML + '<div  class="property"><li>'+pro +'</li> <li>'+ firstnod[title][pro] +'</li></div>';
	}
     div.innerHTML = div.innerHTML +'</div>'
      }
       div.innerHTML = div.innerHTML +'</div>'
        });
         }
