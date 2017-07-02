window.onload = init;

function init() {
	setTrackData;	
	document.getElementById("addNewTrack").onclick = addTrack;
	document.getElementById("fraction1").onchange = setTrackData;
	document.getElementById("fraction2").onchange = setTrackData;
	document.getElementById("tempo").onchange = setTrackData;
	
}

function setTrackData() {
	var lines = document.getElementsByName("trackDescriptor");
	var currentLine = lines[lines.length - 1];
	var fr1 = document.getElementById("fraction1").value;
	var fr2 = document.getElementById("fraction2").value;
	var tmp = document.getElementById("tempo").value;
	currentLine.value = fr1 + "/" + fr2 + "; " + tmp;
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
	var newTrackLi = document.createElement("li");
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
	newTrackLi.appendChild(newTrack);
	trackList.appendChild(newTrackLi);
	setTrackData();
}

