window.onload = init;
var trackArray = [];
var currentTrack;

function init() {
	addTrack();
	document.getElementById("addNewTrack").onclick = addTrack;
	document.getElementById("play").onclick = playTracks;
	document.getElementById("fractionCount").onchange = function(){
		currentTrack.fractionCount = document.getElementById("fractionCount").value;
		currentTrack.setLineValue();
	};
	document.getElementById("fractionSize").onchange = function(){
		currentTrack.fractionSize = document.getElementById("fractionSize").value;
		currentTrack.setLineValue();
	};
	document.getElementById("tempo").onchange = function(){
		currentTrack.tempo = document.getElementById("tempo").value;
		currentTrack.setLineValue();
	};
}

function Track(fractionCount, fractionSize, tempo, count, line) {
	this.fractionCount = fractionCount;
	this.fractionSize = fractionSize;
	this.tempo = tempo;
	this.count = count;
	this.line = line;
	
	this.setLineValue = function(){
		var thisLine = line.firstChild;
		thisLine.value = this.fractionCount + "/" + this.fractionSize + "; " + this.tempo;
	}
}

function addTrack() {
	var trackList = document.getElementById("trackList");
	var newLine = createTrackLine();
	newLine.getElementsByTagName("input")[0].onclick = function()
	{
		chooseLine(track);
	}
	newLine.getElementsByTagName("input")[1].onclick = function()
	{
		chooseLine(track);
	}

	trackList.appendChild(newLine);
	
	var fr1 = document.getElementById("fractionCount").value;
	var fr2 = document.getElementById("fractionSize").value;
	var tmp = document.getElementById("tempo").value;
	
	var track = new Track(fr1, fr2, tmp, 1, newLine);
	track.setLineValue();
	trackArray.push(track);
	chooseLine(track);
}

function createTrackLine() {
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
	var removeLine = document.createElement("button");
	removeLine.setAttribute("name", "removeButton");
	removeLine.innerHTML = "-";
	removeLine.onclick = function()
	{
		onRemoveLine(newTrack);
	}
	newTrack.appendChild(removeLine);
	return newTrack;
}

function onRemoveLine(newTrack)
{
	var trackObj = getTrackByLine(newTrack);
		for (var i = 0; i < trackArray.length; i++)
		{
			if (trackArray[i].line == newTrack)
			{
				if (("undefined" !== typeof currentTrack) && (currentTrack.line === newTrack)) 
				{
					if (i > 0)
					{
						var newChoosenTrack = trackArray[i - 1];
						chooseLine(newChoosenTrack);
					} else if (i < trackArray.length - 1)
					{
						var newChoosenTrack = trackArray[i + 1];
						chooseLine(newChoosenTrack);
					}
				}				
				trackArray.splice(i, 1);
				break;
			}
		}
		
		var trackList = document.getElementById("trackList");
		trackList.removeChild(newTrack);
}

function chooseLine(track)
{
	if ("undefined" !== typeof currentTrack) 
	{
		currentTrack.line.classList.remove("choosenLine");	
	}
	track.line.classList.add("choosenLine");
	currentTrack = track;
}

function getTrackByLine(line)
{
	for (var track in trackArray)
	{
		if (track.line == line)
		{
			return track;
		}
	}
	return null;
}

function switchLamp() {
	var lamp = document.getElementById("lamp1");
	if (window.getComputedStyle(lamp, null).getPropertyValue('background-color') == 'rgb(255, 255, 0)')
		lamp.style.backgroundColor = "grey";
	else
		lamp.style.backgroundColor = "yellow";
}

function playTracks() {
	switchLamp();
}

