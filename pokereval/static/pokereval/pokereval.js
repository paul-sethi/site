var mouseIsDown = false;
var handDictionary = Object.create(null); // this is a true dictionary that has no prototype
var cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

document.addEventListener("DOMContentLoaded", function (event) {
	//document.body.appendChild("<button> blah </button>");

	setupHandGrid();

	document.addEventListener("mousedown", function () { mouseIsDown = true; });
	document.addEventListener("mouseup", function () { mouseIsDown = false; });
	document.addEventListener("mouseup", updateRangeSelection);
	document.getElementById("me").addEventListener("click", asyncTest);
	document.getElementById("clear").addEventListener("click", clearAllSelectedHands);

});

function asyncTest() {
	document.getElementById("me").innerHTML = "Loading...";
	var request = new XMLHttpRequest();
	request.onreadystatechange = asyncHandler(request);
	request.open('POST', '/pokereval/eval/', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


	request.send("asdf=ATs");
}

function asyncHandler(xhttp) {
	return function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
		}
	};
}

function setupHandGrid() {
	var elements = new Array(cards.length);
	var allHandElements = new Array(cards.length);
	for (var i = 0; i < cards.length; i++) {
		allHandElements[i] = new Array(cards.length);
		//allHandElements[i][0] = "<tr>"
		for (var j = 0; j < cards.length; j++) {
			var handText = "";
			var suited = "";
			var cssClass = "";
			if (i < j) {

				suited = "s";
				// it is convention to display the higher card first
				handText = cards[i] + cards[j] + suited;
				cssClass = "suited"

			}


			else if (i == j) {

				// we don't want to display the suit character with pocket pairs

				handText = cards[i] + cards[j];
				cssClass = "pocketPair"
			}


			else if (i > j) {

				suited = "o"

				handText = cards[j] + cards[i] + suited;
				cssClass = "offsuit"

			}
			var handObject = {
				"row": i,
				"column": j,
				"isSelected": false,
				"cssClass": cssClass
			}

			handDictionary[handText] = handObject;
			//create handText to object dictionary (store selected, possibly row/col)
			//need to handle onmousedown also (otherwise click + drag only works for element next to first clicked),itd

			//set id, class, mousedown, mouseover variables and concatenate with variables instead of this long string (just for readability)
			allHandElements[i][j] = "<td><button id=\"" + handText + "\" class=\"" + cssClass + "\"" + " onmousedown=\"mousedownHand(this);\" onmouseover=\"mouseoverHand(this);\">" + handText + "</button></td>"
			// I decided to use inline javascript events so I didn't have to add event listeners to all these button elements immediately after setting the innerHTML.
			// Furthermore, since these are dynamically created elements in a loop, we shouldn't have any issues with maintainability - but I do understand that, in
			// general, we want to separate javascript behavior from the markup.
		}

		elements[i] = "<tr>" + allHandElements[i].join("") + "</tr>";
	}
	document.getElementById("handGrid").innerHTML = elements.join("");
	//var all
	//document.querySelectorAll("#handGrid button").addEventListener("click", function(){alert("asdf");});
	//document.getElementById("handGrid").innerHTML = elements.join("")
}

function clearAllSelectedHands() {
	for (var hand in handDictionary) {
		var handObject = handDictionary[hand];
		if (handObject.isSelected) {
			deselectHand(document.getElementById(hand), handObject);
		}
	}
}

function mousedownHand(handElement) {
	flipHandSelection(handElement);
}

function mouseoverHand(handElement) {
	if (mouseIsDown) {
		flipHandSelection(handElement);
	}
}

function flipHandSelection(handElement) {
	var handObject = handDictionary[handElement.id];

	if (handObject.isSelected) {
		deselectHand(handElement, handObject);
	}
	else {
		selectHand(handElement, handObject);
	}

	//updateRangeSelection(handObject);
}

function deselectHand(handElement, handObject) {
	handObject.isSelected = false;
	handElement.className = handObject.cssClass;
}

function selectHand(handElement, handObject) {
	handObject.isSelected = true;
	handElement.className = "handSelected";
}

//add event listener for mouseUp to update range selection!
function updateRangeSelection() {
	// there is likely a smarter way to do this, but recalculating the entire row or entire hand range is a bit more straight forward
	var allHands = getPocketPairs();
	allHands += getSuitedCards();
	//allHands += getOffsuitCards();
	document.getElementById("range").innerHTML = allHands;
}

//TODO: this function needs to handle continuous selections
//TODO: implement getOffsuitCards()
function getPocketPairs() {
	var allPocketPairs = "";
	for (var i = 0; i < cards.length; i++) {
		var handText = cards[i] + cards[i]; // pocket pairs have two of the same hand values without a suit character attached
		var handObject = handDictionary[handText];
		if (handObject.isSelected) {
			allPocketPairs += handText;
		}
	}
	return allPocketPairs;
}

//TODO: this is definitely broken
function getSuitedCards() {
	var allSuitedCards = "";
	for (var row = 0; row < cards.length; row++) {
		var continuousSelection = false;
		var continuousSelectionStart;
		var continuousSelectionEnd;
		for (var column = row + 1; column < cards.length; column++) { // we want to get all hands to the right of the pocket pairs (located when row=column)
			var handText = cards[row] + cards[column] + "s";
			var handObject = handDictionary[handText];

			if (handObject.isSelected) {
				if (continuousSelection) {
					continuousSelectionEnd = column;
				}
				else {
					continuousSelection = true;
					continuousSelectionStart = column;
					continuousSelectionEnd = continuousSelectionStart;
				}
			}
			else {
				if (continuousSelection) {
					continuousSelection = false;
					if (allSuitedCards != "") {
						allSuitedCards += ", ";
					}

					if (continuousSelectionStart == continuousSelectionEnd) {
						allSuitedCards += cards[row] + cards[continuousSelectionStart] + "s";
					}
					else {
						allSuitedCards += cards[row] + cards[continuousSelectionStart] + "s-" + cards[row] + cards[continuousSelectionEnd] + "s";
				    }
				}
			}
		}
	}
	return allSuitedCards;
}

/*
function selectHand(handElement) {
	if (isMouseDown)
	{
		if (handDictionary[handElement.id].selected)
		{
				handDictionary[handElement.id].selected = false;
				handElement.className = handDictionary[handElement.id].cssClass;
		}
		else
		{
			handDictionary[handElement.id].selected = true;
			handElement.className = "handSelected";
		}
	}
}
*/

/*
function getHand
function getSuitedness(row, column) {
	
	return {"suitText": 
}

stuff.myEnum {
function cardToRow(card)
{
	
}
*/

/*
var CardEnum = {
	2: 0,
	3: 1,
	4: 2,
	4: 2,
	4: 2,
	4: 2,
	4: 2,
}*/

// card text dictionary to card object (row/column/selected bool)
