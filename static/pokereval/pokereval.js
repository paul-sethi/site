var isMouseDown = false;
document.addEventListener("DOMContentLoaded", function (event) {
    //document.body.appendChild("<button> blah </button>");

    setupHandGrid();


});


function setupHandGrid() {
    var cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
    var elements = new Array(cards.length);
    var allHandElements = new Array(cards.length);
    for (var i = 0; i < cards.length; i++) {
        allHandElements[i] = new Array(cards.length);
        //allHandElements[i][0] = "<tr>"
        for (var j = 0; j < cards.length; j++) {
            if (j == 0) {
                allHandElements[i][0] = "<tr>"
            }
            else {
                allHandElements[i][j] = ""
            }

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

            //if (!allHandElements[i][j]) {
            //    allHandElements[i][j] = ""
            //}

            allHandElements[i][j] += "<td><button class=" + cssClass + ">" + handText + "</button></td>"

            if (j == (cards.length - 1)) {
                //allHandElements[i][j] += "</tr>"
            }

        }

        allHandElements[i][cards.length - 1] += "</tr>";
        //document.getElementById("handGridblah").innerHTML += allHandElements[i].join("");

        elements[i] = allHandElements[i].join("")
    }

    document.getElementById("handGrid").innerHTML = elements.join("")
}

