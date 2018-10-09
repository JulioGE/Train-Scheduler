


var config = {
    apiKey: "AIzaSyA6m24KmCCR10KJdH1NY4855iJxUdOPhVQ",
    authDomain: "train-scheduler-e36c8.firebaseapp.com",
    databaseURL: "https://train-scheduler-e36c8.firebaseio.com",
    projectId: "train-scheduler-e36c8",
    storageBucket: "",
    messagingSenderId: "871131783672"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  //Grabs user input
  var trainName= $("#train-name-input").val().trim();

  var trainDest= $("#dest-input").val().trim();

  var trainStart= $("#first-train-input").val().trim();

  var trainFreq= $("#freq-input").val().trim();

  //Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    start: trainStart,
    frequency: trainFreq
  };

  // Uploads train data to database
  database.ref().push(newTrain);

  //Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  //Clears all of the text boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#first-train-input").val("");
  $("#freq-input").val("");
});

//Create Firebase event for adding train to database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot){
  console.log(childSnapshot.val());

  //Store everything into a variable
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().frequency;

  //Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainStart);
  console.log(trainFreq);
  
  //Prettify the train start

  var trainStartPretty = moment.unix(trainStart).format("HH:mm");

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainStartPretty),
    $("<td>").text(trainFreq)
  );

  //Append the new row to the table
  $("#train-table > tbody").append(newRow);

});
