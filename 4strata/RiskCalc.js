// ID for result boxes
const riskTitle = ["COMPERA"];
var riskID = ["result_Compera"];
const riskTitle_f = [];
var riskID_f = [];
// Number of risk calculations
var numOfRisks = riskID.length;
var numOfRisks_f = riskID_f.length;
let riskValue = new Array(numOfRisks).fill(0);
let riskValue_f = new Array(numOfRisks_f).fill(0);


// Array of all parameters
let params = [];
// Create params with buttons and add to array of params
const WHO_FC = {
	name: "WHO_FC", group: "WHO_walk", meta_group: "Modifiable", weight: [1], weight_f: [1, 1], value: [1, 0, 3, 4],
	title: "WHO functional class", btnText: ["I, II", "-", "III", "IV"],
	title_m: "WHO_FC", btnText_m:  ["I, II", "-", "III", "IV"],
	title_c: "", btnText_c: [],
	title_p: "", btnText_p: []
};
params.push(WHO_FC);
// 6MWT
const MWT = {
	name: "MWT", group: "WHO_walk", meta_group: "Modifiable", weight: [1], weight_f: [1, 1], value: [1, 2, 3, 4],
	title: "Six-minute walking distance", btnText: ["> 440 m", "440 - 320 m", "319 - 165 m", "< 165 m"],
	title_m: "6MWD (m)", btnText_m:  ["> 440", "320 - 440", "165 - 319", "< 165"],
	title_c: "", btnText_c: [],
	title_p: "", btnText_p: []
};
params.push(MWT);
// ProBNP
const proBNP = {
	name: "proBNP", group: "Biochem", meta_group: "Modifiable", weight: [1], weight_f: [0, 1], value: [1, 2, 3, 4],
	title: "NT-proBNP", btnText: ["NT-proBNP &nbsp;< 300 ng/l", "NT-proBNP 300 - 649 ng/l", "NT-proBNP 650 - 1100 ng/l", "NT-proBNP &nbsp;> 1100 ng/l"],
	title_m: "NT-proBNP (ng/L) <sup>*</sup>", btnText_m:  ["< 300", "300 - 649", "650 - 1100", "> 1100"],
	title_c: "", btnText_c: [],
	title_p: "", btnText_p: []
};
params.push(proBNP);
// BNP
const BNP = {
	name: "BNP", group: "Biochem", meta_group: "Modifiable", weight: [1], weight_f: [0, 1], value: [1, 2, 3, 4],
	title: "BNP", btnText: ["BNP &nbsp;< 50 ng/l", "BNP 50 - 199 ng/l", "BNP 200 - 800 ng/l", "BNP &nbsp;> 800 ng/l"],
	title_m: "BNP (ng/L) <sup>*</sup>", btnText_m:  ["< 50", "50 - 199", "200 - 800", "> 800"],
	title_c: "", btnText_c: [],
	title_p: "", btnText_p: []
};
params.push(BNP);
//
// Set group titles
const groupTitle = {
	Cardiopulmonary: "Cardiopulmonary excercise testing", Biochem: "Biochemical markers <sup>*</sup>",
	Imaging: "Imaging", Haemodynamics: "Haemodynamics"
};
const metaGroupTitle = { Clinical: "Clinical Observations", Modifiable: "Modifiable Parameters" };

// Number of params in array
const numOfParams = params.length;

// Create array with test values
let testValue = new Array(numOfParams).fill(0);




// Update all risks
function updateRisk() {

	let sum = new Array(numOfRisks).fill(0);
	let w = new Array(numOfRisks).fill(0);
	let paramCount = new Array(numOfRisks).fill(0); // Count the number of used params
	let paramTotal = new Array(numOfRisks).fill(0); // Count total available params
	const paramMin = 3; // The minimum number of params for which a value is displayed.

	// Add up the sum and weights of all params for each risk
	for (let i = 0; i < numOfRisks; i++) {
		for (let j = 0; j < numOfParams; j++) {
			sum[i] += params[j].weight[i] * testValue[j];
			w[i] += (testValue[j] != 0) * params[j].weight[i];
			paramCount[i] += (testValue[j] != 0) * (params[j].weight[i] != 0);
			paramTotal[i] += (params[j].weight[i] != 0) * (params[j].name != "BNP");
		}
	}

	// Special code for BNP/proBNP hierarchy
	let BNP_index;
	let proBNP_index;
	for (let j = 0; j < numOfParams; j++) {
		if (params[j].name === "BNP") {
			BNP_index = j;
		} else if (params[j].name === "proBNP") {
			proBNP_index = j;
		}
	}
	if (testValue[BNP_index] > 0 && testValue[proBNP_index] > 0) {
		for (let i = 0; i < numOfRisks; i++) {
			sum[i] -= testValue[BNP_index] * params[BNP_index].weight[i];
			w[i] -= params[BNP_index].weight[i];
			paramCount[i] -= (params[BNP_index].weight[i] != 0);
		}
	}

	// Calculate the average of all params
	for (let i = 0; i < numOfRisks; i++) {
		riskValue[i] = 0;
		if (w[i] !== 0) {
			riskValue[i] = sum[i] / w[i];
		}
	}

	for (let i = 0; i < numOfRisks; i++) {
		//Set param count for each risk
		document.getElementById(riskID[i] + "_count").innerHTML = `${paramCount[i]}/${paramTotal[i]}`;
		if (riskValue[i] && paramCount[i] >= paramMin) {
			const riskRate = ["&nbsp;<small>(Low)</small>", "&nbsp;<small>(Intermediate-Low)</small>", "&nbsp;<small>(Intermediate-High)</small>", "&nbsp;<small>(High)</small>"];

			if (riskValue[i] < 1.5) {
				// If riskValue rounds to 1
				document.getElementById(riskID[i]).style.backgroundColor = "var(--low-green)";
				document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(2) + riskRate[0];
			} else if (riskValue[i] < 2.5) {
				// If riskValue rounds to 2
				document.getElementById(riskID[i]).style.backgroundColor = "var(--mid-yellow)";
				document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(2) + riskRate[1];
			} else if (riskValue[i] < 3.5) {
				// If riskValue rounds to 2
				document.getElementById(riskID[i]).style.backgroundColor = "var(--mid-orange)";
				document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(2) + riskRate[2];
			} else if (riskValue[i] >= 3.5) {
				// If riskValue rounds to 3
				document.getElementById(riskID[i]).style.backgroundColor = "var(--high-red)";
				document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(2) + riskRate[3];
			}
		} else { // Do if too few parameters were used.
			document.getElementById(riskID[i]).innerHTML = `Use ${paramMin} parameters`;
			document.getElementById(riskID[i]).style.backgroundColor = "white";
		}

	}
}
// Update risks from french strategy
function updateRisk_f() {

	let sum = new Array(numOfRisks_f).fill(0);
	let paramCount = new Array(numOfRisks_f).fill(0); // Count the number of used params
	let paramTotal = new Array(numOfRisks_f).fill(0); // Total available of params
	const paramMin = 3; // The minimum number of params for which a value is displayed.

	// Add up the sum and weights of all params for each risk
	for (let i = 0; i < numOfRisks_f; i++) {
		for (let j = 0; j < numOfParams; j++) {
			if (params[j].weight_f[i]) {
				sum[i] += (testValue[j] == 1);
				paramCount[i] += (testValue[j] != 0) * (params[j].weight_f[i] != 0);
				paramTotal[i] += (params[j].weight[i] != 0) * (params[j].name != "BNP");
			}
		}
	}

	// Special code for BNP/proBNP hierarchy
	let BNP_index;
	let proBNP_index;
	for (let j = 0; j < numOfParams; j++) {
		if (params[j].name === "BNP") {
			BNP_index = j;
		} else if (params[j].name === "proBNP") {
			proBNP_index = j;
		}
	}
	if (testValue[BNP_index] > 0 && testValue[proBNP_index] > 0) {
		for (let i = 0; i < numOfRisks_f; i++) {
			sum[i] -= params[BNP_index].weight_f[i];
			paramCount[i] -= (params[BNP_index].weight_f[i] != 0);
		}
	}
	// Set risk value
	riskValue_f[0] = sum[0];
	riskValue_f[1] = sum[1];
	// French invasive
	var riskRate = ["<br><small>(Low)</small>", "<br><small>(Intermediate)</small>", "<br><small>(High)</small>"];
	//Set param count for each risk
	document.getElementById(riskID_f[0] + "_count").innerHTML = `${paramCount[0]}/${paramTotal[0]}`;
	//var riskRate = [" (Low risk)", " (Intermediate risk)", " (High risk)"];
	if (paramCount[0] >= paramMin) {
		if (riskValue_f[0] >= 3) {
			// If 3-4 low risk parameters
			document.getElementById(riskID_f[0]).style.backgroundColor = "var(--low-green)";
			document.getElementById(riskID_f[0]).innerHTML = sum[0] + riskRate[0];
		} else if (riskValue_f[0] >= 1) {
			// If 1-2 low risk parameters
			document.getElementById(riskID_f[0]).style.backgroundColor = "var(--mid-yellow)";
			document.getElementById(riskID_f[0]).innerHTML = sum[0] + riskRate[1];
		} else {
			// If 0 low risk parameters
			document.getElementById(riskID_f[0]).style.backgroundColor = "var(--high-red)";
			document.getElementById(riskID_f[0]).innerHTML = sum[0] + riskRate[2];
		}
	} else { // Do if too few parameters were used.
		document.getElementById(riskID_f[0]).innerHTML = `Use &geq; ${paramMin} parameters`;
		document.getElementById(riskID_f[0]).style.backgroundColor = "white";
	}
	// French non-invasive
	riskRate = ["&nbsp;<small>(Low)</small>", "&nbsp;<small>(N/A)</small>", "&nbsp;<small>(High)</small>"];
	//Set param count for each risk
	document.getElementById(riskID_f[1] + "_count").innerHTML = `${paramCount[1]}/${paramTotal[1]}`;
	//var riskRate = [" (Low risk)", " (N/A)", " (High risk)"];
	if (paramCount[1] >= paramMin) {
		if (riskValue_f[1] >= 3) {
			// If 3-4 low risk parameters
			document.getElementById(riskID_f[1]).style.backgroundColor = "var(--low-green)";
			document.getElementById(riskID_f[1]).innerHTML = sum[1] + riskRate[0];
		} else if (riskValue_f[1] >= 1) {
			// If 1-2 low risk parameters
			document.getElementById(riskID_f[1]).style.backgroundColor = "lightgrey";
			document.getElementById(riskID_f[1]).innerHTML = sum[1] + riskRate[1];
		} else {
			// If 0 low risk parameters
			document.getElementById(riskID_f[1]).style.backgroundColor = "var(--high-red)";
			document.getElementById(riskID_f[1]).innerHTML = sum[1] + riskRate[2];
		}
	} else { // Do if too few parameters were used.
		document.getElementById(riskID_f[1]).innerHTML = `Use &geq; ${paramMin} parameters`;
		document.getElementById(riskID_f[1]).style.backgroundColor = "white";
	}
}


function inputButton(name, val) {
	//updateButton(id, testNum, btnNum);
	for (let i = 0; i < numOfParams; i++) {
		if (name === params[i].name) {
			if (testValue[i] == val) {
				var radio = document.querySelector(`input[type=radio][name=${name}]:checked`);
				radio.checked = false;
				testValue[i] = 0;
			} else {
				testValue[i] = val;
			}
		}
	}
	if (numOfRisks) { updateRisk(); }
	//if ( numOfRisks_f ){updateRisk_f();}

}

function highlightParam(id = null) {
	var btn_row;
	if (id) {
		// Find the position of risk id
		let j;
		for (j = 0; j < numOfRisks; j++) {
			if (riskID[j] == id) {
				break;
			}
		}
		for (let i = 0; i < numOfParams; i++) {
			if (params[i].weight[j]) {
				btn_row = document.getElementById(params[i].name);
				btn_row.classList.toggle("highlight-active");
			}
		}
	} else {
		for (let i = 0; i < numOfParams; i++) {
			btn_row = document.getElementById(params[i].name);
			if (btn_row.classList.contains("highlight-active")) {
				btn_row.classList.toggle("highlight-active");
			}
		}
	}
}

function highlightParam_f(id = null) {
	var btn_row;
	if (id) {
		// Find the position of risk id
		let j;
		for (j = 0; j < numOfRisks_f; j++) {
			if (riskID_f[j] == id) {
				break;
			}
		}
		for (let i = 0; i < numOfParams; i++) {
			if (params[i].weight_f[j]) {
				btn_row = document.getElementById(params[i].name);
				btn_row.classList.toggle("highlight-active");
			}
		}
	} else {
		for (let i = 0; i < numOfParams; i++) {
			btn_row = document.getElementById(params[i].name);
			if (btn_row.classList.contains("highlight-active")) {
				btn_row.classList.toggle("highlight-active");
			}
		}
	}
}

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
	if (content.style.maxHeight) {
		content.style.maxHeight = null;
	} else {
		content.style.maxHeight = content.scrollHeight + "px";
	}
}

function resetCalc() {

	for (let i = 0; i < numOfParams; i++) {
		var name = params[i].name;
		var radio;
		if (radio = document.querySelector(`input[type=radio][name=${name}]:checked`)) {
			radio.checked = false;
		}
		testValue[i] = 0;
	}
	updateRisk();
}

function copyData() {
	let copyStr = "";// = `Parameter\tDiagnosis\tValue`;
	let paramTitle; let paramText; let testVal;
	for (let i = 0; i < numOfParams; i++) {
		testVal = testValue[i];
		if (params[i].title_c) {
			paramTitle = params[i].title_c;
		} else {
			paramTitle = params[i].title;
		}
		if (params[i].btnText_c[testValue[i] - 1]) {
			paramText = params[i].btnText_c[testValue[i] - 1];
		} else {
			paramText = params[i].btnText[testValue[i] - 1];
		}
		if (testVal == 0) {
			paramText = " ";
		}
		// BNP exeption
		if (params[i].title == "BNP") {
			if (testValue[i - 1]) {
				testVal = 0;
				paramText = " ";
			}
		}

		copyStr += `\n${paramTitle}\t${paramText}\t${testVal}`;
	}
	var riskGroup = ["Low risk", "Intermediate-Low risk", "Intermediate-High risk", "High risk"];
	var risk_group;
	copyStr += "\nRisk Group";
	for (let i = 0; i < riskID.length; i++) {
		risk_group = riskGroup[Math.round(4 * riskValue[i] / 3) - 1];
		copyStr += `\n${riskTitle[i]}\t${risk_group}\t${riskValue[i].toFixed(2)}`;
	}
	//riskGroup = ["Low risk", "Low risk", "High risk"];
	//copyStr += "\nFrench Risk Strategy";
	//for ( let i = 0; i<riskID_f.length; i++) {
	//	risk_group = riskGroup[Math.round(riskValue_f[i])];
	//	copyStr += `\n${riskTitle_f[i]}\t${risk_group}\t${riskValue_f[i]}`;
	//}
	navigator.clipboard.writeText(copyStr);
}

function createButton(name, value, btn_text) {
	// Creates cell for button
	var cell = document.createElement("TD")
	cell.setAttribute("class", "btn-cell")
	// Create label with type radioButton
	var label = document.createElement("LABEL");
	label.setAttribute("class", "radioButton");
	// Create radio button with name and val
	if (value) {
		var btn = document.createElement("INPUT");
		btn.setAttribute("type", "radio");
		btn.setAttribute("name", name);
		btn.setAttribute("value", value);
		btn.setAttribute("onclick", "inputButton(this.name, this.value)");
		label.appendChild(btn);
	}
	// Create span with type checkmark
	var span = document.createElement("SPAN");
	span.setAttribute("class", "checkmark");
	span.innerHTML = btn_text;
	label.appendChild(span);
	// Add btn and span to label node
	cell.appendChild(label);

	return cell;
}

function createTitleCell(title, span = 1) {
	var title_cell = document.createElement("TD");
	title_cell.setAttribute("class", "title-cell");
	title_cell.innerHTML = title;
	if (span > 1) {
		title_cell.setAttribute("rowspan", span);
	}

	return title_cell;
}
function createTable() {
	let groups = ["misc"];
	let groupCount = { misc: 0 };
	let metaGroupCount = { misc: 0 };
	var group_id;
	var meta_id;
	const max_btns = 4;
	// Count content of group and meta-group.
	for (let i = 0; i < numOfParams; i++) {
		// Count meta-groups, add tbody for each new group.
		if (meta_id = params[i].meta_group) {
			if (metaGroupCount[meta_id]) {
				// If meta-group tbody already created,
				// increase counter by 1.
				metaGroupCount[meta_id] += 1;
			} else {
				// If no tbody, create one for meta-group and add before "misc".
				var body = document.createElement("TBODY");
				body.setAttribute("class", "solid-border");
				body.setAttribute("id", meta_id);
				misc_body = document.getElementById("misc");
				document.getElementById("mainTable").insertBefore(body, misc_body);
				// Add meta-group to counter.
				metaGroupCount[meta_id] = 1;
			}
		} else {
			// Add counter to misc meta-group if meta-group tag is missing.
			metaGroupCount["misc"] += 1;
		}
		// Count title groups.
		if (group_id = params[i].group) {
			if (groupCount[group_id]) {
				// If group in counter, increase by 1.
				groupCount[group_id] += 1;
			} else {
				// Add group to counter of not included.
				groupCount[group_id] = 1;
			}
		} else {
			// If no group tag, add to misc counter.
			groupCount["misc"] += 1;
		}
	}
	// Add group titles
	for (let i = 0; i < numOfParams; i++) {
		param = params[i];
		// Create a new row for buttons.
		var row = document.createElement("TR");
		row.setAttribute("class", "btn-row");
		row.setAttribute("id", params[i].name);
		// Check if meta-group title cell should be appended.
		/*
			Check if meta-group count is larger than 0,
			then add a meta-group cell if it is.
			After that, set the count for that meta-group to 0.
		*/
		if (meta_id = params[i].meta_group) {
		} else {
			params[i].meta_group = "misc";
			meta_id = "misc";
		}
		if (metaGroupCount[meta_id] > 0) {
			// Create cell for meta title with rowspan equal to meta count.
			var meta_cell = document.createElement("TD");
			meta_cell.setAttribute("class", "meta-cell");
			meta_cell.setAttribute("style", "border-right: 2px solid black");
			meta_cell.setAttribute("rowspan", metaGroupCount[meta_id]);
			meta_cell.innerHTML = `<p class="meta-text">${metaGroupTitle[meta_id]}</p>`;
			row.appendChild(meta_cell);
			// Set counter for meta group to 0.
			metaGroupCount[meta_id] = 0;
		}

		// Check if group title cell or individual title cell should be appended.
		if (group_id = params[i].group) {
			if (groupCount[group_id] > 0) {
				// Create border separating new group.
				row.setAttribute("style", "border-top: 2px solid black");
				// If there is a group title, apply it.
				if (groupTitle[group_id]) {
					row.appendChild(createTitleCell(groupTitle[group_id], groupCount[group_id]));
				}
				// Set counter for group to 0.
				groupCount[group_id] = 0;
			}
		}
		if (!groupTitle[group_id]) {
			row.appendChild(createTitleCell(params[i].title));
		}
		// Append button cells.
		for (let j = 0; j < max_btns; j++) {
			btnCell = createButton(params[i].name, params[i].value[j], params[i].btnText[j]);
			row.appendChild(btnCell);
		}

		document.getElementById(meta_id).appendChild(row);
	}
	resetCalc();
}
function createTable_m() {
	let groups = ["misc"];
	let groupCount = { misc: 0 };
	var group_id;
	const max_btns = 4;
	for (let i = 0; i < numOfParams; i++) {
		if (group_id = params[i].group) {
			if (groupCount[group_id]) {
				groupCount[group_id] += 1;
			} else {
				var body = document.createElement("TBODY");
				body.setAttribute("class", "solid-border");
				body.setAttribute("id", group_id);
				misc_body = document.getElementById("misc");
				document.getElementById("mainTable").insertBefore(body, misc_body);

				groupCount[group_id] = 1;
			}
		} else {
			groupCount["misc"] += 1;
		}
	}
	// Add group titles
	for (let i = 0; i < numOfParams; i++) {
		var param = params[i];
		var title_row = 0;

		if (group_id = params[i].group) {
		} else {
			group_id = "misc";
		}
		var btn_row = document.createElement("TR");
		btn_row.setAttribute("class", "btn-row");
		btn_row.setAttribute("id", params[i].name);

		var title_row = document.createElement("TR");
		title_row.setAttribute("class", "btn-row");
		var title_text = param.title;
		if (param.title_m) {
			title_text = param.title_m;
		}
		var title_cell = createTitleCell(title_text);
		title_cell.setAttribute("colspan", max_btns);
		title_row.appendChild(title_cell);

		for (let j = 0; j < max_btns; j++) {
			var button_text = params[i].btnText[j];
			if (params[i].btnText_m[j]) {
				button_text = params[i].btnText_m[j];
			}
			btnCell = createButton(params[i].name, params[i].value[j], button_text);
			btn_row.appendChild(btnCell);
		}
		if (title_row) {
			document.getElementById(group_id).appendChild(title_row);
		}
		document.getElementById(group_id).appendChild(btn_row);
	}
	resetCalc();
}