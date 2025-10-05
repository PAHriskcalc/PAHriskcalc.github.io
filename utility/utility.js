
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

