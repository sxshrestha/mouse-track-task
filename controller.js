var trial = new Trial(document.getElementById('container'), next);
var trials = [];
var results = [];
var count = 0;

pushTrial("double", 0.36, 0.74, true);
pushTrial("single", 0.43, true, "left");
startTrial();

function pushTrial(){
  trials.push(arguments);
}

function startTrial(){
  if(trials.length > 0){
    var info = trials.shift();
    if(info[0] === "double"){
      trial.double(info[1], info[2], info[3]);
    } else if(info[0] === "single"){
      trial.single(info[1], info[2], info[3]);
    }
  } else {
    console.log("Done!");
    for(var i = 0; i < results.length; i++){
      console.log(results[i]);
      console.log("\n");
    }
  }
}

function next(){
  results[count] = arguments;
  count++;
  startTrial();
}
