/* Navigation functions */
function goToStart() {
    document.location = "../index.html";
}

function goTo3Strata() {
    if (screen.width <= 800) {
		document.location = "3strata/calculator_mobile.html";
	} else {
		document.location = "3strata/calculator.html";
	}
}

function goTo4Strata () {
    if (screen.width <= 800) {
		document.location = "4strata/calculator_mobile.html";
	} else {
		document.location = "4strata/calculator.html";
	}
}

function goToREVEAL () {
    if (screen.width <= 800) {
        document.location = "reveal/calculator_mobile.html";
    } else {
        document.location = "reveal/calculator.html";
    }
}

/* Utility functions */
function collapseContent(btn) {
	btn.classList.toggle("collapsible_open");
	var content = btn.nextElementSibling;
	/*
	if (content.style.display === "none") {
		content.style.display = "block";

	} else {
		content.style.display = "none";
	}
	*/
	//console.log(content.style.maxHeight);
	if (content.style.maxHeight) {
		content.style.maxHeight = null;
		//console.log("Closed collapsible!");
	} else {
		content.style.maxHeight = content.scrollHeight + "px";
		//console.log(`Opened collapsible! ${content.scrollHeight}`);
	}
}