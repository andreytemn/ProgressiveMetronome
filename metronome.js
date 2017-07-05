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
		var thisLine = line.firstChild;
		thisLine.value = this.fraction1 + "/" + this.fraction2 + "; " + this.tempo;
	}
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


function init() {
	addTrack();
	document.getElementById("addNewTrack").onclick = addTrack;
	document.getElementById("fraction1").onchange = function(){
		currentTrack.fraction1 = document.getElementById("fraction1").value;
		currentTrack.setLineValue();
	};
	document.getElementById("fraction2").onchange = function(){
		currentTrack.fraction2 = document.getElementById("fraction2").value;
		currentTrack.setLineValue();
	};
	document.getElementById("tempo").onchange = function(){
		currentTrack.tempo = document.getElementById("tempo").value;
		currentTrack.setLineValue();
	};
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
	newLine.getElementsByTagName("input")[0].onclick = function()
	{
		chooseLine(track);
	}
	newLine.getElementsByTagName("input")[1].onclick = function()
	{
		chooseLine(track);
	}

	trackList.appendChild(newLine);
	
	var fr1 = document.getElementById("fraction1").value;
	var fr2 = document.getElementById("fraction2").value;
	var tmp = document.getElementById("tempo").value;
	
	var track = new Track(fr1, fr2, tmp, 1, newLine);
	track.setLineValue();
	trackArray.push(track);
	chooseLine(track);
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
		var trackObj = getTrackByLine(newTrack);
		for (var i = 0; i < trackArray.length; i++)
		{
			if (trackArray[i].line == newTrack)
			{
				if (("undefined" !== typeof currentTrack) && (currentTrack === newTrack)) 
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
	newTrack.appendChild(removeLine);
	return newTrack;
}

