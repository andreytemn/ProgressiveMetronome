window.onload = init;
var trackArray = [];
var currentTrack;

function Track(fraction1, fraction2, tempo, count, line) {
	this.fraction1 = fraction1;
	this.fraction2 = fraction2;
	this.tempo = tempo;
	this.count = count;
	this.line = line;
	
	this.setLineValue = function(){
		var thisLine = line.getElementsByTagName("trackDescriptor");
		thisLine.value = this.fraction1 + "/" + this.fraction2 + "; " + this.tempo;
	}
}

function getTrackById(id)
{
	for (var track in trackArray)
	{
		if (track.line == id)
		{
			return track;
		}
	}
	return null;
}


function init() {
	addTrack();
	document.getElementById("addNewTrack").onclick = addTrack;
	document.getElementById("fraction1").onchange = function(){
		currentLine.fr1 = document.getElementById("fraction1").value;
		currentLine.setLineValue();
	};
	document.getElementById("fraction2").onchange = function(){
		currentLine.fr2 = document.getElementById("fraction2").value;
		currentLine.setLineValue();
	};
	document.getElementById("tempo").onchange = function(){
		currentLine.tempo = document.getElementById("tempo").value;
		currentLine.setLineValue();
	};
}

function onFr1Changed()
{
	var fr1 = document.getElementById("fraction1").value;
}

function switchLamp() {
	var lamp = document.getElementById("lamp1");
	if (window.getComputedStyle(lamp, null).getPropertyValue('background-color') == 'rgb(255, 255, 0)')
		lamp.style.backgroundColor = "grey";
	else
		lamp.style.backgroundColor = "yellow";
}

function addTrack() {
	
	var trackList = document.getElementById("trackList");
	var newLine = createTrackLine();
	newLine.onclick = function (newLine)
	{
		alert(newLine);
		newLine.style.border = "1px solid black";
		currentLine = track;
	};
	trackList.appendChild(newLine);
	
	var fr1 = document.getElementById("fraction1").value;
	var fr2 = document.getElementById("fraction2").value;
	var tmp = document.getElementById("tempo").value;
	
	var track = new Track(fr1, fr2, tmp, 1, newLine);
	track.setLineValue();
	trackArray.push(track);
	currentTrack = track;
}

function createTrackLine() {
	var trackList = document.getElementById("trackList");
	var newTrack = document.createElement("div");
	newTrack.setAttribute("name", "track");
	var newDescriptor = document.createElement("input");
	newDescriptor.setAttribute("type", "text");
	newDescriptor.setAttribute("name", "trackDescriptor");
	newDescriptor.setAttribute("readonly", true);
	newTrack.appendChild(newDescriptor);
	var newRepeatCount = document.createElement("input");
	newRepeatCount.setAttribute("type", "number");
	newRepeatCount.setAttribute("name", "repeatNumber");
	newRepeatCount.setAttribute("min", "1");
	newRepeatCount.setAttribute("max", "1000");
	newRepeatCount.setAttribute("value", "1");
	newTrack.appendChild(newRepeatCount);
	return newTrack;
}

