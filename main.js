var hero_wc_xp = 0;

var hero_wc_lvl = 1;
var hero_fm_xp = 0;
var hero_fm_lvl = 1;
var firemakers = 0;
var hatchet_durability = 100; //durability of currently equipped hatchet
var xp_table = [0,83,174,276,388,512,650,801,1137,1507,	1915,	2367,	2865,	3413,	4021,	4691,	5429,	6245,	7595,	9086,	10730,	12548,	14549,	16760,	19202,	21896,	24866,	28148,	32976,	38304,	44184,	50676,	57840,	65748,	74476,	84112,	94744,	106484,	122684,	140564,	160299,	182089,	206139,	232689,	262004,	294359,	330079,	369514,	421756,	479428,	543100,	613390,	690994,	776662,	871246,	975670,	1090954,	1218226,	1382166,	1563158,	1762980,	1983592,	2227157,	2496069,	2792960,	3120742,	3482635,	3882188,	4386340,	4942948,	5557492,	6235988,	6985092,	7812156,	8725300,	9733476,	10846580,	12075532,	13602004,	15287344,	17148094,	19202515,	21470758,	23975089,	26740078,	29792860,	33163378,	36884716,	41449906,	46490276,	52055266,	58199486,	64983246,	72473096,	80742536,	89872726,	99953246,	111083016,	124600091];

var woodcutters = 0; //number of idle woodcutters
var tree_woodcutters = 0; //number of woodcutters at regular trees
var oak_woodcutters = 0; //number of woodcutters at oak trees

var logs = {
	name:'logs',
	total:0,
	level:1,
	price:97,
	wc_experience:25,
	fm_experience:50
};

var oak_logs = {
	name:'oak logs',
	total:0,
	level:15,
	price:77,
	wc_experience:37.5,
	fm_experience:85
};

var willow_logs = {
	name:'willow logs',
	total:0,
	level:30,
	price:23,
	wc_experience:67.5,
	fm_experience:105
};

var teak_logs = {
	name:'teak logs',
	total:0,
	level:35,
	price:98,
	wc_experience:85,
	fm_experience:120
};

var maple_logs = {
	name:'maple logs',
	total:0,
	level:45,
	price:25,
	wc_experience:100,
	fm_experience:155
};

var mahogany_logs = {
	name:'mahogany logs',
	total:0,
	level:50,
	price:508,
	wc_experience:125,
	fm_experience:180
};

var yew_logs = {
	name:'yew logs',
	total:0,
	level:60,
	price:174,
	wc_experience:175,
	fm_experience:240
};

var magic_logs = {
	name:'magic logs',
	total:0,
	level:75,
	price:628,
	wc_experience:250,
	fm_experience:309.5
};

var elder_logs = {
	name:'elder logs',
	total:0,
	level:90,
	price:4967,
	wc_experience:325,
	fm_experience:449
};

var no_hatchet = {
	name:'no_hatchet',
	total:1,
	level:0,
	price:0,
	accuracy:0,
	damage:0,
	speed:4
};

var bronze_hatchet = {
	name:'bronze hatchet',
	total:1,
	level:1,
	price:179,
	accuracy:110,
	damage:30,
	speed:5
};

var iron_hatchet = {
	name:'iron hatchet',
	total:0,
	level:10,
	price:279,
	accuracy:202,
	damage:61,
	speed:5
};

var steel_hatchet = {
	name:'steel hatchet',
	total:0,
	level:20,
	price:749,
	accuracy:316,
	damage:122,
	speed:5
};

var black_hatchet = {
	name:'black hatchet',
	total:0,
	level:25,
	price:822,
	accuracy:381,
	damage:147,
	speed:5
};

var mithril_hatchet = {
	name:'mithril hatchet',
	total:0,
	level:30,
	price:1252,
	accuracy:454,
	damage:183,
	speed:5
};

var adamant_hatchet = {
	name:'adamant hatchet',
	total:0,
	level:40,
	price:2219,
	accuracy:628,
	damage:245,
	speed:5
};

var rune_hatchet = {
	name:'rune hatchet',
	total:0,
	level:50,
	price:7377,
	accuracy:850,
	damage:306,
	speed:5
};

var dragon_hatchet = {
	name:'dragon hatchet',
	total:0,
	level:60,
	price:1971989,
	accuracy:1132,
	damage:367,
	speed:5
};

var cursors = 0; 
var hero_location = "none";
	document.getElementById("hero_location").innerHTML = hero_location; //display hero's location
var current_hatchet = bronze_hatchet; //should be no_hatchet to start; figure equipping hatchets later
	document.getElementById("current_hatchet.name").innerHTML = current_hatchet.name; //display hero's equipped hatchet
	document.getElementById("logs.total").innerHTML = logs.total;
	document.getElementById("oak_logs.total").innerHTML = oak_logs.total;
	document.getElementById("woodcutters").innerHTML = woodcutters;
	document.getElementById("hero_wc_lvl").innerHTML = hero_wc_lvl;
	document.getElementById("hero_wc_xp").innerHTML = hero_wc_xp;
	
var tree_woodcutters = 0;
	document.getElementById("tree_woodcutters").innerHTML = tree_woodcutters;
var oaktree_woodcutters = 0;
	document.getElementById("oaktree_woodcutters").innerHTML = oaktree_woodcutters;

function treeClickup(){
	if (woodcutters > 0){
		tree_woodcutters = tree_woodcutters + 1;
		woodcutters = woodcutters - 1;
		document.getElementById("woodcutters").innerHTML = woodcutters;
		document.getElementById("tree_woodcutters").innerHTML = tree_woodcutters;
	}
	else {alert("You do not have any idle woodcutters");}
}
function treeClickdown(){
	if (tree_woodcutters > 0){
		tree_woodcutters = tree_woodcutters - 1;
		woodcutters = woodcutters + 1;
		document.getElementById("woodcutters").innerHTML = woodcutters;
		document.getElementById("tree_woodcutters").innerHTML = tree_woodcutters;
	}
	else {alert("You do not have any woodcutters at the tree");}
}

function oaktreeClickup(){
	if (woodcutters > 0 && hero_wc_lvl >= 15){
		oaktree_woodcutters = oaktree_woodcutters + 1;
		woodcutters = woodcutters - 1;
		document.getElementById("woodcutters").innerHTML = woodcutters;
		document.getElementById("oaktree_woodcutters").innerHTML = oaktree_woodcutters;
	}
	else if (hero_wc_lvl < 15){alert("You need 15 woodcutting to chop down oak trees.")}
	else {alert("You do not have any idle woodcutters");}
}
function oaktreeClickdown(){
	if (oaktree_woodcutters > 0){
		oaktree_woodcutters = oaktree_woodcutters - 1;
		woodcutters = woodcutters + 1;
		document.getElementById("woodcutters").innerHTML = woodcutters;
		document.getElementById("oaktree_woodcutters").innerHTML = oaktree_woodcutters;
	}
	else {alert("You do not have any woodcutters at the oak tree");}
}

function tree(){
	if (tree_woodcutters > 0) { //only if the woodcutters are here
		for (i = 1; i <= tree_woodcutters; i++){
			var hero_pow = Math.pow(hero_wc_lvl, 3);
			var accuracy = (0.0008*hero_pow+4*hero_wc_lvl+40)+2.5*current_hatchet.accuracy;
			var cutchance = 0.05*accuracy/110; //figure out the chance of cutting a log per tick
			if (Math.random() < cutchance) {
				var helperflag = false;
				var last_wc_digit = finaldigit(hero_wc_lvl);
				if  (last_wc_digit == 8) {
					helperflag = true; //this checks to see if levelling up to 9, we gain a wc follower
				}
				logs.total = logs.total + 1; //gain a log
				document.getElementById("logs.total").innerHTML = logs.total; //display # of logs
				hero_wc_xp = hero_wc_xp + 25; //gain xp for cutting the log
				document.getElementById("hero_wc_xp").innerHTML = hero_wc_xp; //display xp
				if (hero_wc_xp > xp_table[hero_wc_lvl]) {
					hero_wc_lvl = hero_wc_lvl + 1; //if xp overflows in to the next level, add a new level
					document.getElementById("hero_wc_lvl").innerHTML = hero_wc_lvl; //display new level
				}
				last_wc_digit = finaldigit(hero_wc_lvl);
				if (helperflag == true && last_wc_digit == 9) {
					woodcutters = woodcutters + 1; //if dinged level 9, add a woodcutter
					document.getElementById("woodcutters").innerHTML = woodcutters; //add an idle woodcutter
				}
			}
		}
	}
}

function oaktree(){
	if (oaktree_woodcutters > 0) { //only if the woodcutters are here
		for (i = 1; i <= oaktree_woodcutters; i++){
			var hero_pow = Math.pow(hero_wc_lvl, 3);
			var accuracy = (0.0008*hero_pow+4*hero_wc_lvl+40)+2.5*current_hatchet.accuracy;
			var cutchance = 0.05*accuracy/257; //figure out the chance of cutting a log per tick
			if (Math.random() < cutchance) {
				var helperflag = false;
				var last_wc_digit = finaldigit(hero_wc_lvl);
				if  (last_wc_digit == 8) {
					helperflag = true; //this checks to see if levelling up to 9, we gain a wc follower
				}
				oak_logs.total = oak_logs.total + 1; //gain a log
				document.getElementById("oak_logs.total").innerHTML = oak_logs.total; //display # of logs
				hero_wc_xp = hero_wc_xp +37.5; //gain xp for cutting the log
				document.getElementById("hero_wc_xp").innerHTML = hero_wc_xp; //display xp
				if (hero_wc_xp > xp_table[hero_wc_lvl]) {
					hero_wc_lvl = hero_wc_lvl + 1; //if xp overflows in to the next level, add a new level
					document.getElementById("hero_wc_lvl").innerHTML = hero_wc_lvl; //display new level
				}
				last_wc_digit = finaldigit(hero_wc_lvl);
				if (helperflag == true && last_wc_digit == 9) {
					woodcutters = woodcutters + 1; //if dinged level 9, add a woodcutter
					document.getElementById("woodcutters").innerHTML = woodcutters; //add an idle woodcutter
				}
			}
		}
	}
}

function herotreeClick(){
	hero_location = "tree";
	document.getElementById("hero_location").innerHTML = hero_location; //display hero's location
}

function herooaktreeClick(){
	if(hero_wc_lvl >= 15){hero_location = "oaktree";}
	else{alert("You need 15 woodcutting to chop down oak trees.")}
	document.getElementById("hero_location").innerHTML = hero_location; //display hero's location
}

function herotree(){
	if (hero_location == "tree") { //only if the hero is currently cutting here
		var hero_pow = Math.pow(hero_wc_lvl, 3);
		var accuracy = (0.0008*hero_pow+4*hero_wc_lvl+40)+2.5*current_hatchet.accuracy;
		var cutchance = 0.05*accuracy/110; //figure out the chance of cutting a log per tick
		if (Math.random() < cutchance) {
			var helperflag = false;
			var last_wc_digit = finaldigit(hero_wc_lvl);
			if  (last_wc_digit == 8) {
				helperflag = true; //this checks to see if levelling up to 9, we gain a wc follower
			}
			logs.total = logs.total + 1; //gain a log
			document.getElementById("logs.total").innerHTML = logs.total; //display # of logs
			hero_wc_xp = hero_wc_xp + 25; //gain xp for cutting the log
			document.getElementById("hero_wc_xp").innerHTML = hero_wc_xp; //display xp
			if (hero_wc_xp > xp_table[hero_wc_lvl]) {
				hero_wc_lvl = hero_wc_lvl + 1; //if xp overflows in to the next level, add a new level
				document.getElementById("hero_wc_lvl").innerHTML = hero_wc_lvl; //display new level
			}
			last_wc_digit = finaldigit(hero_wc_lvl);
			if (helperflag == true && last_wc_digit == 9) {
				woodcutters = woodcutters + 1; //if dinged level 9, add a woodcutter
				document.getElementById("woodcutters").innerHTML = woodcutters; //add an idle woodcutter
			}
		}
	}
}

function herooaktree(){
	if (hero_location == "oaktree") { //only if the hero is currently cutting here
	var hero_pow = Math.pow(hero_wc_lvl, 3);
		var accuracy = (0.0008*hero_pow+4*hero_wc_lvl+40)+2.5*current_hatchet.accuracy;
		var cutchance = 0.05*accuracy/257; //figure out the chance of cutting an oak log per tick
		if (Math.random() < cutchance) {
			var helperflag = false;
			var last_wc_digit = finaldigit(hero_wc_lvl);
			if  (last_wc_digit == 8) {
				helperflag = true; //this checks to see if levelling up to 9, we gain a wc follower
			}
			oak_logs.total = oak_logs.total + 1; //gain an oak log
			document.getElementById("oak_logs.total").innerHTML = oak_logs.total; //display # of oak logs
			hero_wc_xp = hero_wc_xp + 37.5; //gain xp for cutting the log
			document.getElementById("hero_wc_xp").innerHTML = hero_wc_xp; //display xp
			if (hero_wc_xp > xp_table[hero_wc_lvl]) {
				hero_wc_lvl = hero_wc_lvl + 1; //if xp overflows in to the next level, add a new level
				document.getElementById("hero_wc_lvl").innerHTML = hero_wc_lvl; //display new level
			}
			last_wc_digit = finaldigit(hero_wc_lvl);
			if (helperflag == true && last_wc_digit == 9) {
				woodcutters = woodcutters + 1; //if dinged level 9, add a woodcutter
				document.getElementById("woodcutters").innerHTML = woodcutters; //add an idle woodcutter
			}
		}
	}
}

function prettify(input){
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

function finaldigit(numberin){
	numberin = prettify(numberin); // round the number
	var toText = numberin.toString(); //convert to string
	var lastchar = toText.slice(-1); //gets last character
	var lastdigit = +(lastchar); //convert last character to number
	return lastdigit;
}

window.setInterval(function(){
	
	herotree();
	tree();
	herooaktree();
	oaktree();
	
}, 60);