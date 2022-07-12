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
const PH_NAME = {name:"PH_NAME", weight:[0,0,0], value:[1,2,3], title:"", btnText:["BTN1","BTN2","BTN3"]};
params.push(PH_NAME);
*/
//RV Failure
const RV_Fail = {name:"RV_Fail", group:"Sympt", meta_group:"Clinical", weight:[1,0,0,0], weight_f:[0,0], value:[1,0,3], 
title:"Clinical signs of right heart failure", btnText:["Absent","-","Present"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(RV_Fail);
// Progression of Symptoms
const Sympt_Prog = {name:"Sympt_Prog", group:"Sympt", meta_group:"Clinical", weight:[1,0,0,0], weight_f:[0,0], value:[1,2,3], 
title:"Progression of symptoms", btnText:["No","Slow","Rapid"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(Sympt_Prog);
// Syncope
const Syncope = {name:"Syncope", group:"Sympt", meta_group:"Clinical", weight:[1,0,0,0], weight_f:[0,0], value:[1,2,3], 
title:"Syncope", btnText:["No","Occasionally","Repeated syncope"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(Syncope);
// WHO-FC
const WHO_FC = {name:"WHO_FC", group:"WHO_walk", meta_group:"Modifiable", weight:[1,1,1,2], weight_f:[1,1], value:[1,2,3], 
title:"WHO functional class <sup>¤ #</sup>", btnText:["I, II","III","IV"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(WHO_FC);
// 6MWT
const MWT = {name:"MWT", group:"WHO_walk", meta_group:"Modifiable", weight:[1,1,1,1], weight_f:[1,1], value:[1,2,3], 
title:"Six-minute walking distance <sup>¤ #</sup>", btnText:["> 440 m","165 - 440 m","< 165 m"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(MWT);
// Peak VO_2
const Peak_VO2 = {name:"Peak_VO2", group:"Cardiopulmonary", meta_group:"Modifiable", weight:[1,0,0,0], weight_f:[0,0], value:[1,2,3], 
title:"Peak VO2", btnText:["Peak VO<sub>2</sub>&nbsp;> 15 ml/min/kg","Peak VO<sub>2</sub>&nbsp;11 - 15 ml/min/kg","Peak VO<sub>2</sub>&nbsp;< 11 ml/min/kg"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(Peak_VO2);
//
const Predicted_VO2 = {name:"Predicted_VO2", group:"Cardiopulmonary", meta_group:"Modifiable", weight:[1,0,0,0], weight_f:[0,0], value:[1,2,3], 
title:"Predicted VO2", btnText:["> 65% of predicted","35 - 65% of predicted","< 35% of predicted"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(Predicted_VO2);
// VE / VO_2 slope
const VE_slope = {name:"VE_slope", group:"Cardiopulmonary", meta_group:"Modifiable", weight:[1,0,0,0], weight_f:[0,0], value:[1,2,3], 
title:"VE/VO2-slope", btnText:["VE/VO<sub>2</sub>-slope < 36","VE/VO<sub>2</sub>-slope 36 - 44.9","VE/VO<sub>2</sub>-slope &GreaterEqual; 45"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(VE_slope);
//
const proBNP = {name:"proBNP", group:"Biochem", meta_group:"Modifiable", weight:[1,1,1,1], weight_f:[0,1], value:[1,2,3], 
title:"NT-proBNP", btnText:["NT-proBNP < 300 ng/l","NT-proBNP 300 - 1400 ng/l","NT-proBNP > 1400 ng/l"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(proBNP);
//
const BNP = {name:"BNP", group:"Biochem", meta_group:"Modifiable", weight:[1,1,1,1], weight_f:[0,1], value:[1,2,3], 
title:"BNP", btnText:["BNP < 50 ng/l","BNP 50 - 300 ng/l","BNP > 300 ng/l"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(BNP);
//
const RAarea = {name:"RAarea", group:"Imaging", meta_group:"Modifiable", weight:[1,0,1,0], weight_f:[0,0], value:[1,2,3], 
title:"RA area", btnText:["RA area < 18 cm<sup>2</sup>","RA area 18 - 26 cm<sup>2</sup>","RA area > 26 cm<sup>2</sup>"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(RAarea);
//
const Pericardial_Effusion = {name:"Pericardial_Effusion", meta_group:"Modifiable", group:"Imaging", weight:[1,0,1,0], weight_f:[0,0], value:[1,2,3], 
title:"Pericardial effusion", btnText:["No pericardial effusion","Minimal pericardial effusion","Pericardial effusion"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(Pericardial_Effusion);
//
const MRAP = {name:"MRAP", group:"Haemodynamics", meta_group:"Modifiable", weight:[1,1,1,0], weight_f:[1,0], value:[1,2,3], 
title:"MRAP", btnText:["RAP &leq; 8 mmHg","RAP 8 - 14 mmHg","RAP > 14 mmHg"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(MRAP);
//
const CI = {name:"CI", group:"Haemodynamics", meta_group:"Modifiable", weight:[1,1,1,0], weight_f:[1,0], value:[1,2,3], 
title:"CI", btnText:["CI &GreaterEqual; 2.5 l/min/m<sup>2</sup>","CI 2.0 - 2.4 l/min/m<sup>2</sup>","CI < 2.0 l/min/m<sup>2</sup>"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(CI);
//
const SvO2 = {name:"SvO2", group:"Haemodynamics", meta_group:"Modifiable", weight:[1,1,1,0], weight_f:[0,0], value:[1,2,3], 
title:"SvO2", btnText:["SvO<sub>2</sub>&nbsp;> 65%","SvO<sub>2</sub>&nbsp;60% - 65%","SvO<sub>2</sub>&nbsp;< 60%"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(SvO2);
//
// Set group titles
const groupTitle = {Cardiopulmonary:"Cardiopulmonary excercise testing", Biochem:"Biochemical markers <sup>¤ # *</sup>", 
			Imaging:"Imaging <sup>¤</sup> <small>(echocardiography, cardiac magnetic resonance)</small>", Haemodynamics:"Haemodynamics <sup>¤ #</sup>"};
const metaGroupTitle = {Clinical:"Clinical Observations", Modifiable:"Modifiable Parameters"};

// Number of params in array
const numOfParams = params.length;

// Create array with test values
let testValue = new Array(numOfParams).fill(0);