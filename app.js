
    var ref = new Firebase("https://mwaleh001.firebaseio.com/");
    
highestPriority = 0;



var setAppointment = function(){
	 		var parents= $("#appdate").val();
			var childref=ref.child(parents);//this is the parent node :Date
          
			var tasks 	= 	$("#task").val();
			var start 	=	$("#starttime").val();
			var title 	=	$("#title").val();
			var finish	=	$("#finishtime").val(); 
			
		childref.child(start).setPriority(highestPriority+111)	
			
			
			childref.child(start).set({
                			
                   Task	:	tasks,
				   Title:	title,
				   Finish: finish,
				   
                

            });
			
;
};


ref.on("child_added", function (snapshot) {
    console.log( snapshot.key() +' '+ snapshot.getPriority());
});


ref.orderByValue().on("value", function(snapshot) {
  snapshot.forEach(function(data) {
    console.log("The " + data.key() + " dinosaur's score is " + snapshot.getPriority());
  });
});