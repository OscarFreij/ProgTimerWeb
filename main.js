var startTimeRaw = GetStartTime();
var startTimeParsed;

var currentTimeRaw = GetCurrentTime();
var currentTimeParsed;

var pauseTimeRaw = 0;

var totalPassedTime = 0;

var timerLoop;

function GetStartTime()
{
    var t = new Date().getTime();
    return t;
}

function GetCurrentTime()
{
    var t = new Date().getTime();
    return t;
}

function parseTime()
{
    var mili = timePassed;
    var miliR = mili%1000;
    var sec = (mili-miliR)/1000;
    var secR = sec%60;
    var min = (sec-secR)/60;
    var minR = min%60;
    var h = (min-minR)/60;
    var hR = h%24;
    var d = (h-hR)/24;

    var miliS = miliR.toString();
    for (let  index = miliS.length; index < 3; index = miliS.length) {
        miliS = "0"+miliS;
    }
    var secS = secR.toString();
    for (let  index = secS.length; index < 2; index = secS.length) {
        secS = "0"+secS;
    }
    var minS = minR.toString();
    for (let  index = minS.length; index < 2; index = minS.length) {
        minS = "0"+minS;
    }
    var hS = hR.toString();
    for (let  index = hS.length; index < 2; index = hS.length) {
        hS = "0"+hS;
    }
    var dS = d.toString();
    for (let  index = dS.length; index < 3; index = dS.length) {
        dS = "0"+dS;
    }
    
    document.getElementById("timer-clock-value").innerText = (dS + ":" + hS + ":" + minS + ":" + secS + ":" + (miliS));
}

function timer()
{
    currentTimeRaw = GetCurrentTime();
    timePassed = currentTimeRaw-startTimeRaw;
    timePassed += totalPassedTime;
    parseTime();
    console.log(timePassed);  
}

function timerToggle(action)
{
    console.log(action);
    if (action == "start")
    {
        
        startTimeRaw = GetStartTime();
        
        document.getElementById('SPR').setAttribute("onclick", 'timerToggle("pause")');
        document.getElementById('SPR').setAttribute("state", 'pause');
        document.getElementById('SPR').firstChild.innerText = "Pause"; 

        document.getElementById('SR').firstChild.innerText = "Stop"; 
        document.getElementById('SR').disabled = false;

        timerLoop = setInterval(() => { timer() }, 1);
        
    }
    else if (action == "pause")
    {
        totalPassedTime = timePassed;

        document.getElementById('SPR').setAttribute("onclick", 'timerToggle("start")');
        document.getElementById('SPR').setAttribute("state", 'resume');
        document.getElementById('SPR').firstChild.innerText = "Resume"; 

        document.getElementById('SR').firstChild.innerText = "Reset"; 
        document.getElementById('SR').disabled = false;

        clearInterval(timerLoop);
        
    }
    else if (action == "stop")
    {

        clearInterval(timerLoop);   

        document.getElementById('SPR').setAttribute("onclick", 'timerToggle("start")');
        document.getElementById('SPR').setAttribute("state", 'start');
        document.getElementById('SPR').firstChild.innerText = "Start"; 

        if (document.getElementById('SR').firstChild.innerText == "Reset")
        {
            document.getElementById("timer-clock-value").innerText = "000:00:00:00:000";
        }

        document.getElementById('SR').firstChild.innerText = "Reset"; 
        document.getElementById('SR').disabled = true;

        totalPassedTime = 0;
        timePassed = 0;
        
    }
}