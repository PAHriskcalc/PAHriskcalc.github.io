// ID for result boxes
const riskTitle = ["COMPERA"];
var riskID = ["result_Compera"];
// Number of risk calculations
var numOfRisks = riskID.length;
let riskValue = new Array(numOfRisks).fill(0);

// Array of all parameters
let params = [];
// Create params with buttons and add to array of params
const WHO_FC = {name:"WHO_FC", group:"WHO_walk", meta_group:"Modifiable", weight:[1], weight_f:[1,1], value:[1,0,3,4], 
title:"WHO functional class", btnText:["I, II","-","III","IV"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(WHO_FC);
// 6MWT
const MWT = {name:"MWT", group:"WHO_walk", meta_group:"Modifiable", weight:[1], weight_f:[1,1], value:[1,2,3,4], 
title:"Six-minute walking distance", btnText:["> 440 m","320 - 440 m","319 - 165 m","< 165 m"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(MWT);
// ProBNP
const proBNP = {name:"proBNP", group:"Biochem", meta_group:"Modifiable", weight:[1], weight_f:[0,1], value:[1,2,3,4], 
title:"NT-proBNP", btnText:["NT-proBNP < 300 ng/l","NT-proBNP 300 - 649 ng/l","NT-proBNP 650 - 1100 ng/l","NT-proBNP > 1100 ng/l"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(proBNP);
// BNP
const BNP = {name:"BNP", group:"Biochem", meta_group:"Modifiable", weight:[1], weight_f:[0,1], value:[1,2,3,4], 
title:"BNP", btnText:["BNP < 50 ng/l","BNP 50 - 199 ng/l","BNP 200 - 800 ng/l","BNP > 800 ng/l"],
title_c:"", btnText_c:[]
title_p:"", btnText_p:[]};
params.push(BNP);
//
// Set group titles
const groupTitle = {Cardiopulmonary:"Cardiopulmonary excercise testing", Biochem:"Biochemical markers", 
			Imaging:"Imaging", Haemodynamics:"Haemodynamics"};
const metaGroupTitle = {Clinical:"Clinical Observations", Modifiable:"Modifiable Parameters"};

// Number of params in array
const numOfParams = params.length;

// Create array with test values
let testValue = new Array(numOfParams).fill(0);