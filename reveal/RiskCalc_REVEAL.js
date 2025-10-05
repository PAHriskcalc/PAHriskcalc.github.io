// ID for result boxes
const riskTitle = ["REVEAL", "REVEAL_Lite"];
var riskID = ["result_REVEAL", "result_REVEAL_Lite"];
// Number of risk calculations
var numOfRisks = riskID.length;
var riskValue = new Array(numOfRisks).fill(0);

// Array of all parameters
let params = [];
// Create params with buttons and add to array of params
const WHO = {
	name: "WHO", group: "", meta_group: "", weight: [1, 0], value: [NaN, NaN, 0, 1, 2, 3],
	title: "WHO group I subgroup", btnText: ["", "", "Other", "CTD", "Heritable", "PoPH"],
	title_c: "", btnText_c: [],
	title_p: "", btnText_p: []
};
const MALE = {
	name: "Male", group: "", meta_group: "", weight: [1, 0], value: [NaN, NaN, 0, NaN, 2, NaN],
	title: "Male > 60 years", btnText: ["", "", "No", "", "Yes", ""],
	title_c: "", btnText_c: ["", "", "", "", "", ""],
	title_p: "", btnText_p: ["", "", "", "", "", ""]
};
const RECENT_HOSPITALIZATION = {
	name: "Hospitalization", group: "", meta_group: "", weight: [1, 0], value: [NaN, NaN, 0, 1, NaN, NaN],
	title: "All-cause hospitalizations within 6 months", btnText: ["", "", "No", "Yes", "", ""],
	title_c: "", btnText_c: ["", "", "", "", "", ""],
	title_p: "", btnText_p: ["", "", "", "", "", ""]
};const eGFR = {
	name: "eGFR", group: "", meta_group: "", weight: [1, 1], value: [NaN, NaN, 0, 1, NaN, NaN],
	title: "eGFR < 60 ml/min/1.73m<sup>2</sup> or renal insufficiency <span style='color: orange'>&#9679</span>*", btnText: ["", "", "No", "Yes", "", ""],
	title_c: "", btnText_c: ["", "", "", "", "", ""],
	title_p: "", btnText_p: ["", "", "", "", "", ""]
};
const BLOOD_PRESSURE = {
	name: "BloodPressure", group: "", meta_group: "", weight: [1, 1], value: [NaN, NaN, 0, 1, NaN, NaN],
	title: "Systolic blood pressure (mmHg) <span style='color: orange'>&#9679</span>", btnText: ["", "", "&GreaterEqual; 110", "< 110", "", ""],
	title_c: "", btnText_c: ["", "", "", "", "", ""],
	title_p: "", btnText_p: ["", "", "", "", "", ""]
};
const HEART_RATE = {
	name: "HeartRate", group: "", meta_group: "", weight: [1, 1], value: [NaN, NaN, 0, 1, NaN, NaN],
	title: "Heart rate (beats/min) <span style='color: orange'>&#9679</span>", btnText: ["", "", "&le; 96", "> 96", "", ""],
	title_c: "", btnText_c: ["", "", "", "", "", ""],
	title_p: "", btnText_p: ["", "", "", "", "", ""]
};
const NYHA = {
	name: "NYHA", group: "", meta_group: "", weight: [1, 1], value: [NaN, -1, 0, 1, 2, NaN],
	title: "NYHA/WHO functional class <span style='color: orange'>&#9679</span>^", btnText: ["", "I", "II", "III", "IV", ""],
	title_c: "", btnText_c: ["", "", "", "", "", ""],
	title_p: "", btnText_p: ["", "", "", "", "", ""]
};
const WALK = {
	name: "Walk", group: "", meta_group: "", weight: [1, 1], value: [-2, -1, 0, 1, NaN, NaN],
	title: "Six-minute walking distance (m) <span style='color: orange'>&#9679</span>^", btnText: ["&GreaterEqual; 440", " 439 - 320", "319 - 165", "< 165", "", ""],
	title_c: "", btnText_c: ["", "", "", "", "", ""],
	title_p: "", btnText_p: ["", "", "", "", "", ""]
};
const proBNP = {
	name: "proBNP", group: "", meta_group: "", weight: [1, 1], value: [-2, NaN, 0, NaN, 2, NaN],
	title: "NT-proBNP (ng/L)  <span style='color: orange'>&#9679</span>^#", btnText: ["< 300", "", "300 - 1099", "", "&GreaterEqual; 1100", ""],
	title_c: "", btnText_c: ["", "", "", "", "", ""],
	title_p: "", btnText_p: ["", "", "", "", "", ""]
};
const BNP = {
	name: "BNP", group: "", meta_group: "", weight: [1, 1], value: [-2, NaN, 0, 1, 2, NaN],
	title: "BNP (ng/L)  <span style='color: orange'>&#9679</span>^#", btnText: ["< 50", "", "50 - 199", "200 - 799", "&GreaterEqual; 800", ""],
	title_c: "", btnText_c: ["", "", "", "", "", ""],
	title_p: "", btnText_p: ["", "", "", "", "", ""]
};
const ECHOCARDIO = {
	name: "Echocardio", group: "", meta_group: "", weight: [1, 0], value: [NaN, NaN, 0, 1, NaN, NaN],
	title: "Pericardial effusion on echocardiogram", btnText: ["", "", "No", "Yes", "", ""],
	title_c: "", btnText_c: ["", "", "", "", "", ""],
	title_p: "", btnText_p: ["", "", "", "", "", ""]
};
const DLco = {
	name: "DLco", group: "", meta_group: "", weight: [1, 0], value: [NaN, NaN, 0, 1, NaN, NaN],
	title: "DLco (% predicted) < 40%", btnText: ["", "", "No", "Yes", "", ""],
	title_c: "", btnText_c: ["", "", "", "", "", ""],
	title_p: "", btnText_p: ["", "", "", "", "", ""]
};
const RAP = {
	name: "RAP", group: "", meta_group: "", weight: [1, 0], value: [NaN, NaN, 0, 1, NaN, NaN],
	title: "mRAP > 20 mmHg within 1 year", btnText: ["", "", "No", "Yes", "", ""],
	title_c: "", btnText_c: ["", "", "", "", "", ""],
	title_p: "", btnText_p: ["", "", "", "", "", ""]
};
const PVR = {
	name: "PVR", group: "", meta_group: "", weight: [1, 0], value: [NaN, -1, 0, NaN, NaN, NaN],
	title: "PVR < 5 WU", btnText: ["", "Yes", "No", "", "", ""],
	title_c: "", btnText_c: ["", "", "", "", "", ""],
	title_p: "", btnText_p: ["", "", "", "", "", ""]
};

// const PH_NAME = {
// 	name: "", group: "", meta_group: "", weight: [1], weight_f: [1, 1], value: [-2, -1, 0, 1, 2, 3],
// 	title: "", btnText: [],
// 	title_c: "", btnText_c: [],
// 	title_p: "", btnText_p: []
// };

params.push(WHO);
params.push(MALE);
params.push(RECENT_HOSPITALIZATION);
params.push(eGFR);
params.push(BLOOD_PRESSURE);
params.push(HEART_RATE);
params.push(NYHA);
params.push(WALK);
params.push(proBNP);
params.push(BNP);
params.push(ECHOCARDIO);
params.push(DLco);
params.push(RAP);
params.push(PVR);
//
// Set group titles
const groupTitle = {};
const metaGroupTitle = {};

// Number of params in array
const numOfParams = params.length;

// Create array with test values
var testValue = new Array(numOfParams).fill(NaN);


// Update all risks
function updateRisk() {

	let sum = new Array(numOfRisks).fill(0);
	let w = new Array(numOfRisks).fill(0);
	let paramCount = new Array(numOfRisks).fill(0); // Count the number of used params
	let paramTotal = new Array(numOfRisks).fill(0); // Count total available params
	const paramMin = [7, 3]; // The minimum number of params for which a value is displayed.

	// Add up the sum and weights of all params for each risk
	for (let i = 0; i < numOfRisks; i++) {
		for (let j = 0; j < numOfParams; j++) {
			if (!Number.isNaN(testValue[j])) {
				sum[i] += params[j].weight[i] * testValue[j];
				w[i] += params[j].weight[i];
				paramCount[i] += (params[j].weight[i] != 0);
			}
			paramTotal[i] += (params[j].weight[i] != 0);
		}
	}

	// Special code for BNP/proBNP hierarchy
	// let BNP_index;
	// let proBNP_index;
	// for (let j = 0; j < numOfParams; j++) {
	// 	if (params[j].name === "BNP") {
	// 		BNP_index = j;
	// 	} else if (params[j].name === "proBNP") {
	// 		proBNP_index = j;
	// 	}
	// }
	// if (!Number.isNaN(testValue[BNP_index]) && !Number.isNaN(testValue[proBNP_index])) {
	// 	for (let i = 0; i < numOfRisks; i++) {
	// 		sum[i] -= testValue[BNP_index] * params[BNP_index].weight[i];
	// 		w[i] -= params[BNP_index].weight[i];
	// 		paramCount[i] -= (params[BNP_index].weight[i] != 0);
	// 	}
	// }

	// Calculate the sum of all params (+ correction factor)
	let correction_factor = 6;
	for (let i = 0; i < numOfRisks; i++) {
		riskValue[i] = 0;
		if (w[i] !== 0) {
			riskValue[i] = sum[i] + correction_factor;
		}
	}

	for (let i = 0; i < numOfRisks; i++) {
		//Set param count for each risk
		document.getElementById(riskID[i] + "_count").innerHTML = `${paramCount[i]}/${paramTotal[i]}`;
		if (riskValue[i] && paramCount[i] >= paramMin[i]) {
			const riskRate = ["&nbsp;<small>(Low risk)</small>", "&nbsp;<small>(Intermediate risk)</small>", "&nbsp;<small>(High risk)</small>"];

			if (riskValue[i] <= 6) {
				// Low risk (<= 6)
				document.getElementById(riskID[i]).style.backgroundColor = "var(--low-green)";
				document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(0) + riskRate[0];
			} else if (riskValue[i] <= 8) {
				// Medium risk (7-8)
				document.getElementById(riskID[i]).style.backgroundColor = "var(--mid-yellow)";
				document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(0) + riskRate[1];
			} else if (riskValue[i] >= 9) {
				// High risk (>= 9)
				document.getElementById(riskID[i]).style.backgroundColor = "var(--high-red)";
				document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(0) + riskRate[2];
			}
		} else { // Do if too few parameters were used.
			document.getElementById(riskID[i]).innerHTML = `Use &ge; ${paramMin[i]} parameters`;
			document.getElementById(riskID[i]).style.backgroundColor = "white";
		}

	}
}

function inputButton(name, val) {
	//updateButton(id, testNum, btnNum);
	for (let i = 0; i < numOfParams; i++) {
		if (name === params[i].name) {
			// If selected: uncheck; else: check
			if (testValue[i] == val) {
				var radio = document.querySelector(`input[type=radio][name=${name}]:checked`);
				radio.checked = false;
				testValue[i] = NaN;
			} else {
				var radio = document.querySelector(`input[type=radio][name=${name}]:checked`);
				radio.checked = true;
				testValue[i] = val;
			}
		}
	}
	if (numOfRisks) { updateRisk(); }
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
		testValue[i] = NaN;
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
	if(!Number.isNaN(value)) {
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
	const max_btns = 6;
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
		/*
			If "misc" is the only meta group, don't create the meta-titles.
		*/
		if (metaGroupCount[meta_id] > 0) {
			// Create cell for meta title with rowspan equal to meta count.
			var meta_cell = document.createElement("TD");
			meta_cell.setAttribute("class", "meta-cell");
			meta_cell.setAttribute("style", "border-right: 2px solid black");
			meta_cell.setAttribute("rowspan", metaGroupCount[meta_id]);
			if (meta_id = "misc") {
				meta_cell.style.backgroundColor = "var(--background-blue";
				meta_cell.innerHTML = `<p class="meta-text"></p>`;
			} else {
				meta_cell.innerHTML = `<p class="meta-text">${metaGroupTitle[meta_id]}</p>`;
			}
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
}
function createTable_m() {
	let groups = ["misc"];
	let groupCount = { misc: 0 };
	var group_id;
	const max_btns = 6;
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
			if (!document.getElementById(group_id).hasChildNodes() && groupTitle[group_id]) {
				var title_row = document.createElement("TR");
				title_row.setAttribute("class", "btn-row");
				var title_cell = createTitleCell(groupTitle[group_id]);
				title_cell.setAttribute("colspan", max_btns);
				title_row.appendChild(title_cell);
			}
		} else {
			group_id = "misc";
		}
		var btn_row = document.createElement("TR");
		btn_row.setAttribute("class", "btn-row");
		btn_row.setAttribute("id", params[i].name);

		if (!groupTitle[group_id]) {
			var title_row = document.createElement("TR");
			title_row.setAttribute("class", "btn-row");
			var title_cell = createTitleCell(param.title);
			title_cell.setAttribute("colspan", max_btns);
			title_row.appendChild(title_cell);
		}

		for (let j = 0; j < max_btns; j++) {
			btnCell = createButton(params[i].name, params[i].value[j], params[i].btnText[j]);
			btn_row.appendChild(btnCell);
		}
		if (title_row) {
			document.getElementById(group_id).appendChild(title_row);
		}
		document.getElementById(group_id).appendChild(btn_row);
	}
}