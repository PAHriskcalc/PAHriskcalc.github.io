// ID for result boxes
const riskTitle = ["Extended", "COMPERA", "SPAHR"];//["Extended", "COMPERA", "SPAHR", "Weighted"];
var riskID = ["result_Full", "result_Compera", "result_SPAHR"];//["result_Full", "result_Compera", "result_SPAHR", "result_Weighted"];
const riskTitle_f = ["French Invasive", "French Non-Invasive"];
var riskID_f = ["result_french1", "result_french2"];
// Number of risk calculations
var numOfRisks = riskID.length;
var numOfRisks_f = riskID_f.length;
let riskValue = new Array(numOfRisks).fill(0);
let riskValue_f = new Array(numOfRisks_f).fill(0);

// Array of all parameters
let params = [];
// Create params with buttons and add to array of params
/*
const PH_NAME = {name:"PH_NAME", group:"", meta_group:"", weight:[1,0,0,0], weight_f:[0,0], value:[1,2,3], 
title:"", btnText:["BTN1","BTN2","BTN3"],
title_c:"", btnText_c:["","",""],
title_p:"", btnText_p:[]};
params.push(PH_NAME);
*/
//RV Failure
const RV_Fail = {
	name: "RV_Fail", group: "Sympt", meta_group: "Clinical", weight: [1, 0, 0, 0], weight_f: [0, 0], value: [1, 0, 3],
	title: "Signs of right heart failure", btnText: ["Absent", "-", "Present"],
	title_m: "", btnText_m: ["", "", ""],
	title_c: "", btnText_c: ["", "", ""],
	title_p: "", btnText_p: []
};
params.push(RV_Fail);
// Progression of Symptoms
const Sympt_Prog = {
	name: "Sympt_Prog", group: "Sympt", meta_group: "Clinical", weight: [1, 0, 0, 0], weight_f: [0, 0], value: [1, 2, 3],
	title: "Progression of symptoms and clinical manifestation", btnText: ["No", "Slow", "Rapid"],
	title_m: "Progression of symptoms", btnText_m: ["", "", ""],
	title_c: "", btnText_c: ["", "", ""],
	title_p: "", btnText_p: []
};
params.push(Sympt_Prog);
// Syncope
const Syncope = {
	name: "Syncope", group: "Sympt", meta_group: "Clinical", weight: [1, 0, 0, 0], weight_f: [0, 0], value: [1, 2, 3],
	title: "Syncope", btnText: ["No", "Occasionally", "Repeated syncope"],
	title_m: "", btnText_m: ["No", "Occasionally", "Repeated"],
	title_c: "", btnText_c: ["", "", ""],
	title_p: "", btnText_p: []
};
params.push(Syncope);
// WHO-FC
const WHO_FC = {
	name: "WHO_FC", group: "WHO_walk", meta_group: "Modifiable", weight: [1, 1, 1, 2], weight_f: [1, 1], value: [1, 2, 3],
	title: "WHO functional class <sup>¤ #</sup>", btnText: ["I, II", "III", "IV"],
	title_m: "WHO-FC <sup>¤ #</sup>", btnText_m: ["", "", ""],
	title_c: "WHO functional class", btnText_c: ["", "", ""],
	title_p: "", btnText_p: []
};
params.push(WHO_FC);
// 6MWT
const MWT = {
	name: "MWT", group: "WHO_walk", meta_group: "Modifiable", weight: [1, 1, 1, 1], weight_f: [1, 1], value: [1, 2, 3],
	title: "Six-minute walking distance <sup>¤ #</sup>", btnText: ["> 440 m", "165 - 440 m", "< 165 m"],
	title_m: "6MWD (m)", btnText_m: [">440", "165-440", "<165"],
	title_c: "Six-minute walking distance", btnText_c: ["", "", ""],
	title_p: "", btnText_p: []
};
params.push(MWT);

// Peak VO_2
const Peak_VO2 = {
	name: "Peak_VO2", group: "Cardiopulmonary", meta_group: "Modifiable", weight: [1, 0, 0, 0], weight_f: [0, 0], value: [1, 2, 3],
	title: "Peak VO2", btnText: ["Peak VO<sub>2</sub> &nbsp;> 15 ml/min/kg", "Peak VO<sub>2</sub>&nbsp;11 - 15 ml/min/kg", "Peak VO<sub>2</sub> &nbsp;< 11 ml/min/kg"],
	title_m: "Peak VO<sub>2</sub> (ml/min/kg)", btnText_m: ["> 15", "11 - 15", "< 11"],
	title_c: "", btnText_c: [">15 ml/min/kg", "11-15 ml/min/kg", "< 11 ml/min/kg"],
	title_p: "", btnText_p: []
};
params.push(Peak_VO2);
/* Predicted VO2
const Predicted_VO2 = {name:"Predicted_VO2", group:"Cardiopulmonary", meta_group:"Modifiable", weight:[1,0,0,0], weight_f:[0,0], value:[1,2,3], 
title:"Predicted VO_2", btnText:["> 65% of predicted","35 - 65% of predicted","< 35% of predicted"],
title_c:"", btnText_c:["","",""],
title_p:"", btnText_p:[]};
params.push(Predicted_VO2); Removed in new update */
// VE / VO_2 slope
const VE_slope = {
	name: "VE_slope", group: "Cardiopulmonary", meta_group: "Modifiable", weight: [1, 0, 0, 0], weight_f: [0, 0], value: [1, 2, 3],
	title: "VE/VO2-slope", btnText: ["VE/VO<sub>2</sub>-slope &nbsp;< 36", "VE/VO<sub>2</sub>-slope 36 - 44.9", "VE/VO<sub>2</sub>-slope &nbsp;&GreaterEqual; 45"],
	title_m: "VE/VE<sub>2</sub>", btnText_m: ["< 36", "36-44.9", "&GreaterEqual; 45"],
	title_c: "VE/VO_2 -slope", btnText_c: ["< 36", "36-44.9", "=> 45"],
	title_p: "", btnText_p: []
};
params.push(VE_slope);

// proBNP
const proBNP = {
	name: "proBNP", group: "Biochem", meta_group: "Modifiable", weight: [1, 1, 1, 1], weight_f: [0, 1], value: [1, 2, 3],
	title: "NT-proBNP", btnText: ["NT-proBNP &nbsp;< 300 ng/L", "NT-proBNP 300 - 1100 ng/L", "NT-proBNP &nbsp;> 1100 ng/L"],
	title_m: "NT-proBNP (ng/L) <sup>¤ # *</sup>", btnText_m: ["< 300", "300-1100", "> 1100"],
	title_c: "", btnText_c: ["< 300 ng/L", "300-1100 ng/L", "> 1100 ng/L"],
	title_p: "", btnText_p: []
};
params.push(proBNP);
// BNP
const BNP = {
	name: "BNP", group: "Biochem", meta_group: "Modifiable", weight: [1, 1, 1, 1], weight_f: [0, 1], value: [1, 2, 3],
	title: "BNP", btnText: ["BNP &nbsp;< 50 ng/L", "BNP 50 - 800 ng/L", "BNP &nbsp;> 800 ng/L"],
	title_m: "BNP (ng/L) <sup>¤ # *</sup>", btnText_m: ["< 50", "50-800", "> 800"],
	title_c: "", btnText_c: ["< 50 ng/L", "50-800 ng/L", "> 800 ng/L"],
	title_p: "", btnText_p: []
};
params.push(BNP);

// RAarea
const RAarea = {
	name: "RAarea", group: "Imaging", meta_group: "Modifiable", weight: [1, 0, 1, 0], weight_f: [0, 0], value: [1, 2, 3],
	title: "RA area", btnText: ["RA area &nbsp;< 18 cm<sup>2</sup>", "RA area 18 - 26 cm<sup>2</sup>", "RA area &nbsp;> 26 cm<sup>2</sup>"],
	title_m: "Right atrial area (cm<sup>2</sup>) <sup>¤</sup>", btnText_m: ["< 18", "18-26", "> 26"],
	title_c: "", btnText_c: ["< 18 cm^2", "18-26 cm^2", "> 26 cm^2"],
	title_p: "", btnText_p: []
};
params.push(RAarea);
// sPAP
const sPAP = {
	name: "sPAP", group: "Imaging", meta_group: "Modifiable", weight: [1, 0, 0, 0], weight_f: [0, 0], value: [1, 2, 3],
	title: "TAPSE/sPAP", btnText: ["TAPSE/sPAP &nbsp; >0.32 mm/mmHg", "TAPSE/sPAP 0.19 - 0.32 mm/mmHg", "TAPSE/sPAP &nbsp;< 0.19 mm/mmHg"],
	title_m: "TAPSE/sPAP (mm/mmHg) <sup>¤</sup>", btnText_m: ["< 0.32", "0.19 - 0.32", "< 0.19"],
	title_c: "TAPSE/sPAP", btnText_c: [">0.32 mm/mmHg", "0.19-0.32 mm/mmHg", "<0.19 mm/mmHg"],
	title_p: "", btnText_p: []
};
params.push(sPAP);
// Pericardial effusion
const Pericardial_Effusion = {
	name: "Pericardial_Effusion", meta_group: "Modifiable", group: "Imaging", weight: [1, 0, 1, 0], weight_f: [0, 0], value: [1, 2, 3],
	title: "Pericardial effusion", btnText: ["No pericardial effusion", "Minimal pericardial effusion", "Pericardial effusion"],
	title_m: "Pericardial Effusion <sup>¤</sup>", btnText_m: ["None", "Minimal", "Significant"],
	title_c: "", btnText_c: ["", "", ""],
	title_p: "", btnText_p: []
};
params.push(Pericardial_Effusion);

// RVEF
const RVEF = {
	name: "RVEF", group: "cMRI", meta_group: "Modifiable", weight: [1, 0, 0, 0], weight_f: [0, 0], value: [1, 2, 3],
	title: "RVEF", btnText: ["RVEF &nbsp;> 54%", "RVEF 37 - 54%", "RVEF &nbsp;< 37%"],
	title_m: "RVEF (cMRI, %)", btnText_m: ["> 54", "37-54", "< 37"],
	title_c: "", btnText_c: ["", "", ""],
	title_p: "", btnText_p: []
};
params.push(RVEF);
// SVI
const SVI_MRI = {
	name: "SVI_MRI", group: "cMRI", meta_group: "Modifiable", weight: [1, 0, 0, 0], weight_f: [0, 0], value: [1, 2, 3],
	title: "SVI", btnText: ["SVI &nbsp;> 40 mL/m<sup>2</sup>", "SVI 26 - 40 mL/m<sup>2</sup>", "SVI &nbsp;< 26 mL/m<sup>2</sup>"],
	title_m: "SVI (cMRI, mL/m<sup>2</sup>)", btnText_m: ["> 40", "26-40", "< 26"],
	title_c: "", btnText_c: ["", "", ""],
	title_p: "", btnText_p: []
};
params.push(SVI_MRI);
// RVESVI
const RVESVI = {
	name: "RVESVI", group: "cMRI", meta_group: "Modifiable", weight: [1, 0, 0, 0], weight_f: [0, 0], value: [1, 2, 3],
	title: "RVESVI", btnText: ["RVESVI &nbsp;< 42 mL/m<sup>2</sup>", "RVESVI 42 - 54 mL/m<sup>2</sup>", "RVESVI &nbsp;> 54 mL/m<sup>2</sup>"],
	title_m: "RVESVI (cMRI, mL/m<sup>2</sup>)", btnText_m: ["< 42", "42 - 54", "> 54"],
	title_c: "", btnText_c: ["", "", ""],
	title_p: "", btnText_p: []
};
params.push(RVESVI);

// MRAP
const MRAP = {
	name: "MRAP", group: "Haemodynamics", meta_group: "Modifiable", weight: [1, 1, 1, 0], weight_f: [1, 0], value: [1, 2, 3],
	title: "MRAP", btnText: ["RAP &nbsp;< 8 mmHg", "RAP 8 - 14 mmHg", "RAP &nbsp;> 14 mmHg"],
	title_m: "RAP (RHC, mmHg) <sup>¤ #</sup>", btnText_m: ["< 8", "8 - 14", "> 14"],
	title_c: "", btnText_c: ["=< 8 mmHg", "8-14 mmHg", "> 14 mmHg"],
	title_p: "", btnText_p: []
};
params.push(MRAP);
// CI
const CI = {
	name: "CI", group: "Haemodynamics", meta_group: "Modifiable", weight: [1, 1, 1, 0], weight_f: [1, 0], value: [1, 2, 3],
	title: "CI", btnText: ["CI &nbsp;&GreaterEqual; 2.5 l/min/m<sup>2</sup>", "CI 2.0 - 2.4 l/min/m<sup>2</sup>", "CI &nbsp;< 2.0 l/min/m<sup>2</sup>"],
	title_m: "CI (RHC, L/min/m<sup>2</sup>) <sup>¤ #</sup>", btnText_m: ["&GreaterEqual; 2.5", "2.0 - 2.4", "< 2.0"],
	title_c: "", btnText_c: [">= 2.5 l/min/m^2", "2.0-2.4 l/min/m^2", "< 2.0 l/min/m^2"],
	title_p: "", btnText_p: []
};
params.push(CI);
// SVI
const SVI = {
	name: "SVI", group: "Haemodynamics", meta_group: "Modifiable", weight: [1, 0, 0, 0], weight_f: [0, 0], value: [1, 2, 3],
	title: "SVI", btnText: ["SVI &nbsp;> 38 mL/m<sup>2</sup>", "SVI 31 - 38 mL/m<sup>2</sup>", "SVI &nbsp;< 31 mL/m<sup>2</sup>"],
	title_m: "SVI (RHC, mL/m<sup>2</sup>) <sup>¤ #</sup>", btnText_m: ["> 38", "31 - 38", "< 31"],
	title_c: "", btnText_c: ["", "", ""],
	title_p: "", btnText_p: []
};
params.push(SVI);
// SvO2
const SvO2 = {
	name: "SvO2", group: "Haemodynamics", meta_group: "Modifiable", weight: [1, 1, 1, 0], weight_f: [0, 0], value: [1, 2, 3],
	title: "SvO2", btnText: ["SvO<sub>2</sub> &nbsp; > 65%", "SvO<sub>2</sub> &nbsp; 60% - 65%", "SvO<sub>2</sub> &nbsp; < 60%"],
	title_m: "SvO<sub>2</sub> (RHC, %) <sup>¤ #</sup>", btnText_m: ["> 65", "60 - 65", "< 60"],
	title_c: "SvO_2", btnText_c: ["> 65%", "60%-65%", "< 60%"],
	title_p: "", btnText_p: []
};
params.push(SvO2);
//
// Set group titles
const groupTitle = {
	Cardiopulmonary: "Cardiopulmonary excercise testing", Biochem: "Biochemical markers <sup>¤ # *</sup>",
	Imaging: "Echocardiography <sup>¤</sup>", cMRI: "Cardiac magnetic resonance imaging", Haemodynamics: "Haemodynamics <sup>¤ #</sup>"
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
		if (document.getElementById(riskID[i] + "_count")) {
			document.getElementById(riskID[i] + "_count").innerHTML = `${paramCount[i]}/${paramTotal[i]}`;
		}
		if (riskValue[i] && paramCount[i] >= paramMin) {
			const riskRate = ["<br><small>(Low)</small>", "<br><small>(Interm.-Low)</small>", "<br><small>(Interm.-High)</small>", "<br><small>(High)</small>"];
			//const riskRate = [" (Low risk)", " (Low-intermediate risk)"," (High-intermediate risk)", " (High risk)"];
			if (riskValue[i] < 1.5) {
				// If riskValue rounds to 1
				document.getElementById(riskID[i]).style.backgroundColor = "var(--low-green)";
				document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(2) + riskRate[0];
			} else if (riskValue[i] < 2.0) {
				// If riskValue rounds to 2
				document.getElementById(riskID[i]).style.backgroundColor = "var(--mid-yellow)";
				document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(2) + riskRate[1];
			} else if (riskValue[i] < 2.5) {
				// If riskValue rounds to 2
				document.getElementById(riskID[i]).style.backgroundColor = "var(--mid-orange)";
				document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(2) + riskRate[2];
			} else if (riskValue[i] <= 3) {
				// If riskValue rounds to 3
				document.getElementById(riskID[i]).style.backgroundColor = "var(--high-red)";
				document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(2) + riskRate[3];
			}
		} else { // Do if too few parameters were used.
			document.getElementById(riskID[i]).innerHTML = `Use &geq; ${paramMin} parameters`;
			document.getElementById(riskID[i]).style.backgroundColor = "white";
		}

	}
}
// Update risks from french strategy
function updateRisk_f() {

	let sum = new Array(numOfRisks_f).fill(0);
	let paramCount = new Array(numOfRisks_f).fill(0); // Count the number of used params
	let paramTotal = new Array(numOfRisks_f).fill(0); // Total available of params
	const paramMin = [4, 3]; // The minimum number of params for which a value is displayed.

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
			if (testValue[BNP_index] == 1) {
				sum[i] -= params[BNP_index].weight_f[i];
			}
			paramCount[i] -= (params[BNP_index].weight_f[i] != 0);
		}
	}
	// Set risk value
	riskValue_f[0] = sum[0];
	riskValue_f[1] = sum[1];
	// French invasive
	//var riskRate = ["&nbsp;<small>(Low)</small>", "&nbsp;<small>(Intermediate)</small>", "&nbsp;<small>(High)</small>"];
	var riskRate = ["&nbsp;", "&nbsp;", "&nbsp;"];
	//Set param count for each risk
	if (document.getElementById(riskID_f[0] + "_count")) {
		document.getElementById(riskID_f[0] + "_count").innerHTML = `${paramCount[0]}/${paramTotal[0]}`;
	}
	//var riskRate = [" (Low risk)", " (Intermediate risk)", " (High risk)"];
	if (paramCount[0] >= paramMin[0]) {
		if (riskValue_f[0] >= 3) {
			// If 3-4 low risk parameters
			//document.getElementById(riskID_f[0]).style.backgroundColor = "var(--low-green)";
			document.getElementById(riskID_f[0]).innerHTML = sum[0] + riskRate[0];
		} else if (riskValue_f[0] >= 1) {
			// If 1-2 low risk parameters
			//document.getElementById(riskID_f[0]).style.backgroundColor = "var(--mid-yellow)";
			document.getElementById(riskID_f[0]).innerHTML = sum[0] + riskRate[1];
		} else {
			// If 0 low risk parameters
			//document.getElementById(riskID_f[0]).style.backgroundColor = "var(--high-red)";
			document.getElementById(riskID_f[0]).innerHTML = sum[0] + riskRate[2];
		}
	} else { // Do if too few parameters were used.
		document.getElementById(riskID_f[0]).innerHTML = `Use ${paramMin[0]} parameters`;
		document.getElementById(riskID_f[0]).style.backgroundColor = "white";
	}
	// French non-invasive
	//riskRate = ["&nbsp;<small>(Low)</small>", "&nbsp;<small>(N/A)</small>", "&nbsp;<small>(High)</small>"];
	riskRate = ["&nbsp;", "&nbsp;", "&nbsp;"];
	//Set param count for each risk
	if (document.getElementById(riskID_f[1] + "_count")) {
		document.getElementById(riskID_f[1] + "_count").innerHTML = `${paramCount[1]}/${paramTotal[1]}`;
	}
	//var riskRate = [" (Low risk)", " (N/A)", " (High risk)"];
	if (paramCount[1] >= paramMin[1]) {
		if (riskValue_f[1] >= 3) {
			// If 3-4 low risk parameters
			//document.getElementById(riskID_f[1]).style.backgroundColor = "var(--low-green)";
			document.getElementById(riskID_f[1]).innerHTML = sum[1] + riskRate[0];
		} else if (riskValue_f[1] >= 1) {
			// If 1-2 low risk parameters
			//document.getElementById(riskID_f[1]).style.backgroundColor = "lightgrey";
			document.getElementById(riskID_f[1]).innerHTML = sum[1] + riskRate[1];
		} else {
			// If 0 low risk parameters
			//document.getElementById(riskID_f[1]).style.backgroundColor = "var(--high-red)";
			document.getElementById(riskID_f[1]).innerHTML = sum[1] + riskRate[2];
		}
	} else { // Do if too few parameters were used.
		document.getElementById(riskID_f[1]).innerHTML = `Use ${paramMin[1]} parameters`;
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
				//console.log(`Updated test ${name} value to ${testValue[i]}!`)
			} else {
				testValue[i] = val;
				//console.log(`Updated test ${name} value to ${testValue[i]}!`)
			}
		}
	}
	updateRisk();
	updateRisk_f();
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
	updateRisk_f();
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
	riskGroup = ["Low risk", "Low risk", "High risk"];
	copyStr += "\nFrench Risk Strategy";
	for (let i = 0; i < riskID_f.length; i++) {
		risk_group = riskGroup[Math.round(riskValue_f[i])];
		copyStr += `\n${riskTitle_f[i]}\t${risk_group}\t${riskValue_f[i]}`;
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
	const max_btns = 3;
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
		console.log(`Meta-group ${meta_id} count ${metaGroupCount[meta_id]}`)
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
	const max_btns = 3;
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

		var btn_row = document.createElement("TR");
		btn_row.setAttribute("class", "btn-row");
		btn_row.setAttribute("id", params[i].name);

		var title_row = document.createElement("TR");
		title_row.setAttribute("class", "btn-row");
		var title_text =  param.title;
		if (param.title_m) {
			title_text = param.title_m;
		}
		var title_cell = createTitleCell(title_text);
		title_cell.setAttribute("colspan", "3");
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