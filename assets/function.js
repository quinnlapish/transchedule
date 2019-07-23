$(document).ready(function() {

	// 1. Initialize Firebase
  var config = {
      apiKey: "AIzaSyDdJH0aSu7LEh4YWhi8EQv0dwfEYIj8WEs",
      authDomain: "trainschedule-fea86.firebaseapp.com",
      databaseURL: "https://trainschedule-fea86.firebaseio.com",
      projectId: "trainschedule-fea86",
      storageBucket: "trainschedule-fea86.appspot.com",
      messagingSenderId: "797946263349",
      appId: "1:797946263349:web:ebf4f3c9d44eb3d1"
    };
  
  firebase.initializeApp(config);

  var database = firebase.database();

 
   
  // adding Trains
  $("#add-train-btn").on("click", function(event) {
  		event.preventDefault();

	 //input
	  var trainName = $("#train-name-input").val().trim();
	  var trainDest = $("#dest-input").val().trim();
	  var firstTrain = $("#firstTrain-input").val().trim();
	  var trainFreq = $("#freq-input").val().trim();

	  // train data
	  var newTrain = {
	  	name: trainName,
	  	destination: trainDest,
	  	start: firstTrain,
	  	frequency: trainFreq
	  };

	
  		database.ref().push(newTrain);


	  
  		alert("Train successfully added");

	
	  $("#train-name-input").val("");
	  $("#dest-input").val("");
	  $("#firstTrain-input").val("");
	  $("#freq-input").val("");
  	});

  	// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {
     

	  // Store everything into a variable.
	  var trainName = childSnapshot.val().name;
	  var trainDest = childSnapshot.val().destination;
	  var firstTrain = childSnapshot.val().start;
	  var trainFreq = childSnapshot.val().frequency;


	 
  		var trainFreq;

 
   		 var firstTime = 0;

	   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	    var currentTime = moment();
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		
	    var tRemainder = diffTime % trainFreq;

	    var tMinutesTillTrain = trainFreq - tRemainder;
	 
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	   

	  
	  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + 
	   "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
	});

});