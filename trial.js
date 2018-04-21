class Trial {
  constructor(container, nextHandler){
  this.container = container;
  this.next = nextHandler;
  }

  press(){

  }

  single(val, reveal, side){
    container.innerHTML = "";
    this.createClickArea(side, val, reveal);
    this.addStart();
    this.runTrial()
  }

  double(val1, val2, reveal){
    container.innerHTML = "";
    this.createClickArea("left", val1, true);
    this.createClickArea("right", val2, true);
    this.addStart();
    this.runTrial()

  }


  //-----------------------SUPPOSED TO BE PRIVATE-----------------------//
  runTrial(){
    //this.ptimes = [];
    this.mouse = [];
    this.mtimes = [];
    this.choice = 0;
    this.timers = [];
    this.startTime = Date.now();
    this.myBody = document.getElementsByTagName("BODY")[0];
  }

  startTrial(){
    var start = this.start;
    var timers = this.timers;
    var _myself = this;
    start.removeEventListener("click", this.starter);
    start.innerHTML = "5<br />Seconds"
    //setupChoices();
    start.style.background='#27e800';
    this.myBody.onmousemove = function(e){
      _myself.mouseDetect(e).bind(this);
    };


    timers.push(setTimeout(function(){ start.innerHTML = "4<br />Seconds" }, 1000));
    timers.push(setTimeout(function(){ start.innerHTML = "3<br />Seconds" }, 2000));
    timers.push(setTimeout(function(){ start.innerHTML = "2<br />Seconds" }, 3000));
    timers.push(setTimeout(function(){ start.innerHTML = "1<br />Seconds" }, 4000));
    timers.push(setTimeout(function(){
      _myself.finish().bind(_myself);
      document.getElementById("submitButton").style.display="none";
    }, 5000));

  }

  createClickArea(gravity, cash, reveal){
    var div = document.createElement("DIV");
    var _myself = this;
    div.className = "clickarea";
    div.cash = cash;
    div.style.float = gravity;
    div.onmouseover = function(e){
      _myself.hitDetect(e).bind(this);
      console.log("detected");
    };

    if(reveal){
      var rgb = "#0000" + (Math.round(255*cash)).toString(16);
      div.style.background = rgb;
    }
    this.container.appendChild(div);
  }

  addStart(){
    var start = document.createElement("DIV");
    start.id = "startarea";
    start.innerHTML = "Click here to start.";
    this.starter = this.startTrial.bind(this);
    start.addEventListener("click", this.starter);
    container.appendChild(start);
    this.start = start;
  }

  mouseDetect(e){
    var x = e.clientX;
    var y = e.clientY;
    var coor = "{" + x + "," + y + "}";
    this.mouse.push(coor);
    this.mtimes.push(Date.now() - this.startTime);
  }

  hitDetect(event) {

    var x = event.target;
    this.choice = x.cash;

    this.finish();
  }

  finish(){
    this.myBody.onmousemove = null;
    this.start.innerHTML = "You won:<br />$" + this.choice;
    document.getElementById("submitButton").style.display="inherit";

    //document.getElementById("demo").innerHTML = document.getElementById("mturk_form").choicedata;
    for(var i = 0; i <  this.timers.length; i++){
      clearTimeout(this.timers[i]);
    }
    var ret = [this.mtimes, this.mouse, this.choice];
    setTimeout(function(){ this.next(ret);  }, 1000) //runs next trial

  }

}
