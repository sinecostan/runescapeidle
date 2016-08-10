//community drop rate guide for combat: http://services.runescape.com/m=rswiki/en/Community_-_Drop_Rate_Guide

// http://stackoverflow.com/questions/12612391/javascript-use-getelementbyid-to-populate-multiple-divs
// http://stackoverflow.com/questions/11515383/why-is-element-innerhtml-bad-code
// consider this to populate hero_location - getelementbyid may not be a good way to do this.

//styling of the tabs begins here - eventually change this to a bunch of skill buttons from runescape

function openskill(evt, skillname) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class='tabcontent' and hide them
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    // Get all elements with class='tablinks' and remove the class 'active'
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    // Show the current tab, and add an 'active' class to the link that opened the tab
    document.getElementById(skillname).style.display = 'block';
    evt.currentTarget.className += ' active';
}

//styling of the tabs ends here

var xp_table = [0,83,174,276,388,512,650,801,969,1154,1562,2014,2512,3060,3668,4338,5076,5892,6792,7786,	8882,	10700,	12701,	14912,	17354,	20048,	23018,	26300,	29921,	33917,	38327,	43196,	50360,	58268,	66996,	76632,	87264,	99004,	111964,	126268,	142056,	159488,	178728,	205278,	234593,	266948,	302668,	342103,	385638,	433698,	486758,	545333,	610003,	681393,	775977,	880401,	995685,	1122957,	1263477,	1418613,	1589889,	1778985,	1987755,	2218251,	2472729,	2800511,	3162404,	3561957,	4003090,	4490122,	5027848,	5621532,	6276998,	7000679,	7799680,	8681834,	9794938,	11023890,	12380754,	13878834,	15532834,	17358986,	19375202,	21601274,	24059042,	26772626,	29768642,	33489980,	37598651,	42134984,	47143475,	52673273,	58778657,	65519522,	72962018,	81179189,	90251657,	100268450,	112556700,	126123990,	141103480,	157642150,	175902310,	196063120,	218322450,	242898710,270033080,299991820,333068930,373241007,417594547,466564787,520632295,580327634,646236609,719005976,799349844,888056638,985996843,1094131573];

//items will hold every object in the game: http://stackoverflow.com/questions/7942398/nested-objects-in-javascript-best-practices
//Level 1-2-3: items - main categories - subcategories
var items = {
	currency : {}, //anything in runescape (coins, tokkul) used as a currency. No levels below this
	mining : {tools : {}, ore_types : {}, uncut_gems : {}}, //will include anything gathered directly by mining (incl. rune essence), and pickaxes
	fishing : {tools{}, raw_fish : {}, bait : {}}, //all raw fish, equipment, bait, feathers
	woodcutting : {tools : {}, log_types : {}}, //all logs and hatchets
	hunter: {tools: {}, goods : {}}, //tools used for hunting and drops from the creatures
	divination: {energy : {}, signs : {}, portents : {}}, // divine energy and signs of the porter, and portents of restoration
	smithing: {bars : {}}, //all bars (note: gear will be handled separately) (note2: arrowheads, unfletched bolts go to fletching)
	cooking: {cooked_fish : {}, baked_goods : {}}, //cooked fish. later on I'll add baking (bread, pies etc.)
	runecrafting: {talismans : {}}, //talismans here. (this may be an unnecessary category - evaluate w/ rc skill)
	fletching: {strings : {}, unstrungs : {}, projectiles : {}}, //bowstrings, unstrung bows, crossbow limbs+stocks, unfinished arrow parts
	herblore: {herbs : {}, seconds : {}, potions : {}}, //herbs and potions. seconds when not in other use.
	magic: {weapons : {}, armor : {}, accessories : {}}, //runes, staves, and magic equipment (note: will include enchanted jewellery)
	melee: {weapons : {}, armor : {}, accessories : {}}, //melee equipment, weapons
	ranged: {weapons : {}, armor : {}, accessories : {}}, //ranged equipment, weapons
	summoning: {charms : {}, thirds : {}, pouches : {}}, //pouches, shards, and thirds that don't fall in another category
	crafting: {leather : {}, pottery : {}, loom : {}, jewellery : {}}, //leather, pottery, flax, jewellery,
	farming: {seeds : {}, compost : {)}, //all seeds, compost. most farming tools will be ignored since seeds are expendable. no need for farmers to watch your crops... you have your own farmers!
	construction: {materials : {}, furniture : {}}, //planks and flatpack furniture, construction supplies
	quest: {}, //items used for quests and nothing else.
	miscellaneous: {}, //catch-all for other items until I need to define a new category.
	// most items dropped uniquely from monsters will fall in to one of these categories.
};

// level 3-4-5: individual items and their values
items['woodcutting']['log_types'] = {
	logs:{
	name:'logs',
	total:0,
	level:1,
	price:97,
	wc_experience:25,
	fm_experience:50
	},
	oak:{
	name:'oak logs',
	total:0,
	level:15,
	price:77,
	wc_experience:37.5,
	fm_experience:85
	},
	willow:{
	name:'willow logs',
	total:0,
	level:30,
	price:23,
	wc_experience:67.5,
	fm_experience:105
	},
	teak:{
	name:'teak logs',
	total:0,
	level:35,
	price:98,
	wc_experience:85,
	fm_experience:120
	},
	maple:{
	name:'maple logs',
	total:0,
	level:45,
	price:25,
	wc_experience:100,
	fm_experience:155
	},
	mahogany:{
	name:'mahogany logs',
	total:0,
	level:50,
	price:508,
	wc_experience:125,
	fm_experience:180
	},
	yew:{
	name:'yew logs',
	total:0,
	level:60,
	price:174,
	wc_experience:175,
	fm_experience:240
	},
	magic:{
	name:'magic logs',
	total:0,
	level:75,
	price:628,
	wc_experience:250,
	fm_experience:309.5
	},
	elder:{
	name:'elder logs',
	total:0,
	level:90,
	price:4967,
	wc_experience:325,
	fm_experience:449
	},
};

items['woodcutting']['tools'] = {
	no:{
	name:'no hatchet',
	total:1, //this means the hatchet will always exit loops that require a hatchet equipped
	level:1,
	price:1,
	accuracy:0,
	damage:1,
	speed:5,
	durability:1
	},
	bronze:{
	name:'bronze hatchet',
	total:0,
	level:1,
	price:179,
	accuracy:110,
	damage:30,
	speed:5,
	durability:110
	},
	iron:{
	name:'iron hatchet',
	total:0,
	level:10,
	price:279,
	accuracy:202,
	damage:61,
	speed:5,
	durability:202
	},
	steel:{
	name:'steel hatchet',
	total:0,
	level:20,
	price:749,
	accuracy:316,
	damage:122,
	speed:5,
	durability:316
	},
	black:{
	name:'black hatchet',
	total:0,
	level:25,
	price:822,
	accuracy:381,
	damage:147,
	speed:5,
	durability:381
	},
	mithril:{
	name:'mithril hatchet',
	total:0,
	level:30,
	price:1252,
	accuracy:454,
	damage:183,
	speed:5,
	durability:454
	},
	adamant:{
	name:'adamant hatchet',
	total:0,
	level:40,
	price:2219,
	accuracy:628,
	damage:245,
	speed:5,
	durability:628 
	},
	rune:{
	name:'rune hatchet',
	total:0,
	level:50,
	price:7377,
	accuracy:850,
	damage:306,
	speed:5,
	durability:850
	},
	dragon:{
	name:'dragon hatchet',
	total:0,
	level:60,
	price:1971989,
	accuracy:1132,
	damage:367,
	speed:5,
	durability:1132
	},
};

items['mining']['ore_types'] = {
	copper:{
	name:'Copper Ore',
	total:0,
	level:1,
	price:45,
	mining_experience:17.5
	},
	tin:{
	name:'Tin Ore',
	total:0,
	level:1,
	price:65,
	mining_experience:17.5
	},
	iron:{
	name:'Iron Ore',
	total:0,
	level:15,
	price:329,
	mining_experience:35
	},
	silver:{
	name:'Silver Ore',
	total:0,
	level:20,
	price:67,
	mining_experience:40
	},
	coal:{
	name:'Coal',
	total:0,
	level:30,
	price:187,
	mining_experience:50
	},
	gold:{
	name:'Gold Ore',
	total:0,
	level:40,
	price:144,
	mining_experience:65
	},
	mithril:{
	name:'Mithril Ore',
	total:0,
	level:55,
	price:207,
	mining_experience:80
	},
	adamantite:{
	name:'Adamantite Ore',
	total:0,
	level:70,
	price:1018,
	mining_experience:95
	},
	runite:{
	name:'Runite Ore',
	total:0,
	level:85,
	price:11304,
	mining_experience:125
	},
};

items['mining']['tools'] = {
	no:{
	name:'no pickaxe',
	total:1, //this means the pickaxe will always exit loops that require a pickaxe equipped
	level:1,
	price:1,
	accuracy:0,
	damage:1,
	speed:5,
	durability:1
	},
	bronze:{
	name:'bronze pickaxe',
	total:0,
	level:1,
	price:179,
	accuracy:110,
	damage:30,
	speed:5,
	durability:110
	},
	iron:{
	name:'iron pickaxe',
	total:0,
	level:10,
	price:279,
	accuracy:202,
	damage:61,
	speed:5,
	durability:202
	},
	steel:{
	name:'steel pickaxe',
	total:0,
	level:20,
	price:749,
	accuracy:316,
	damage:122,
	speed:5,
	durability:316
	},
	black:{
	name:'black pickaxe',
	total:0,
	level:25,
	price:822,
	accuracy:381,
	damage:147,
	speed:5,
	durability:381
	},
	mithril:{
	name:'mithril pickaxe',
	total:0,
	level:30,
	price:1252,
	accuracy:454,
	damage:183,
	speed:5,
	durability:454
	},
	adamant:{
	name:'adamant pickaxe',
	total:0,
	level:40,
	price:2219,
	accuracy:628,
	damage:245,
	speed:5,
	durability:628 
	},
	rune:{
	name:'rune pickaxe',
	total:0,
	level:50,
	price:7377,
	accuracy:850,
	damage:306,
	speed:5,
	durability:850
	},
	dragon:{
	name:'dragon pickaxe',
	total:0,
	level:60,
	price:1971989,
	accuracy:1132,
	damage:367,
	speed:5,
	durability:1132
	},
};

// define a set of properties for each skill
var skillprops = {
woodcutting : {}, mining : {}
//, fishing : {}, farming : {}, hunter : {}, divination : {}, herblore : {}, crafting : {}, fletching : {}, smithing : {}, cooking : {}, firemaking : {}, runecrafting : {}, construction : {}, agility : {}, thieving : {}, slayer : {}, dungeoneering : {}, melee : {}, defence : {}, ranged : {}, prayer : {}, magic : {}, constitution : {}, summoning : {}
} //this is split: we remove skills that aren't yet implemented.

//define a list of all skills
var skill_list = ['woodcutting', 'mining',  
//'fishing',  'farming',  'hunter',  'divination',  'herblore',  'crafting',  'fletching',  'smithing',  'cooking',  'firemaking',  'runecrafting',  'construction',  'agility',  'thieving',  'slayer',  'dungeoneering',  'melee',  'defence',  'ranged', 'prayer',  'magic',  'constitution',  'summoning'
] //this is split: we remove skills that aren't yet implemented.

//loop through and set all experience and levels to 0/1; equip no tools
for (i = 0; i <= skill_list.length - 1; i++){
	skillprops[skill_list[i]]['experience'] = 0;
	skillprops[skill_list[i]]['level'] = 1;
	skillprops[skill_list[i]]['current_tool'] = 'no';
}

//define woodcutting-specific variables
skillprops['woodcutting'] = {
	workers:[0,0,0,0,0,0,0,0,0,0], //number of woodcutters @ idle, tree, oak, willow, teak, maple, mahogany, yew, magic, elder
	nodenames:['idle','logs','oak','willow','teak','maple','mahogany','yew','magic','elder'], //tree names, the first entry is idle workers, then trees, then oak trees. following the variable convention, logs, oak_logs will create the right variable names
	tooltype:['no','bronze','iron','steel','black','mithril','adamant','rune','dragon'], //hatchet metal types
	current_tool = ['Bronze Hatchet', 'bronze'] //tool name and tool type
};

//define mining-specific variables
skillprops['mining'] = {
	workers:[0,0,0,0,0,0,0,0,0,0], //number of miners @ idle, tin, copper, iron, silver, coal, gold, mithril, adamantite, runite
	nodenames:['idle', 'copper', 'tin', 'iron', 'silver', 'coal', 'gold', 'mithril', 'adamantite', 'runite'], //tree names, the first entry is idle workers, then trees, then oak trees. following the variable convention, logs, oak_logs will create the right variable names
	tooltype:['no','bronze','iron','steel','mithril','adamant','rune','dragon'] //pickaxe metal types
	current_tool = ['Bronze Pickaxe', 'bronze'] //tool name and tool type
}

//set starting hero location & equipped tool
var hero_location = ['idle',0];
document.getElementById('hero_location').innerHTML = hero_location[0]; //display hero's location

//loop to initialize display of all good types and worker locations
// pass in the variable name for goods, e.g. items['mining']['ore_types']
// e.g. category = 'mining', subcategory = 'ore_types', skillprop = 'nodenames', could be 'hatchet_type
//obviously I want to get away from getelementbyid later
//this will eventually be called by the timer (every .6 seconds)
//the category will be based on a variable that holds the value of the currently selected skill
function display_goods (category, subcategory, skillprop) {
	for (i = 1; i <= skillprops[category][skillprop].length - 1; i++){ //we cycle through the size of the nodes. first one always 'idle', first tool always 'no' tool etc.
		var goods = skillprops[category][skillprop][i].concat('.total'); //should return 'tin.total' etc.
		document.getElementById(goods).innerHTML = items[category][subcategory][skillprops[category][skillprop][i]]['total'];
	}
}

//loop to give the player some hatchets for DEBUGGING PURPOSES!!!!!!
for (i = 1; i <= skillprops['woodcutting']['tooltype'].length - 1; i++){ 
	items['woodcutting']['tools'][skillprops['woodcutting']['tooltype'][i]]['total'] = 5; 
}

//function to equip a tool
// e.g. skill = 'mining', toolvalue = 1 (any number, e.g. 1 will refer to bronze later)
function equip_tool(skill, toolvalue){
	if (items[skill]['tools'][skillprops[skill][tooltype][toolvalue]]['total'] > 0 || hatchet_type === 'no'){  //checks to make sure we have the tool
		if (items[skill]['tools'][skillprops[skill][tooltype][toolvalue]]['level'] <= skillprops[skill]['level'] ){ //hero must be the required level to equip it
			skillprops[skill]['current_tool'][0] = hatchet_type items[skill]['tools'][skillprops[skill][tooltype][toolvalue]]['name']; //add the name of the hatchet
			skillprops[skill]['current_tool'][1] = skillprops[skill][tooltype][toolvalue]; //add the metal/type of the tool
			var skilltool = skill.concat('_tool'); //set a variable to determine which tool to update e.g. woodcutting_tool
			document.getElementById(skilltool).innerHTML = skillprops[skill]['current_tool'][0]; //display hero's equipped tool
		}
		else {alert('You do not have the required level to equip this tool.');}
	}
	else {alert('You do not have any of these tools.');}
}

//function to add a worker to a location (node)
// e.g. skill = 'mining', itemclass = 'ore_types' node = 1 (copper)
function addworker(skill, itemclass, node){ 
	if (skillprops[skill]['workers'][0] > 0 && skillprops[skill]['level'] >= items[skill][itemclass][skillprops[skill][nodename][node]]['level']){ //must have at least 1 idle worker and the required level
		skillprops[skill]['workers'][node] = skillprops[skill]['workers'][node] + 1; //add one worker to the location
		skillprops[skill]['workers'][0] = skillprops[skill]['workers'][0] - 1; //remove 1 idle worker
	}
	else {alert('You do not have any idle workers or the required level to gather this resource.');}
}

//function to remove a worker from a location (node)
// e.g. skill = 'mining', itemclass = 'ore_types', node = 1 (copper)
function removeworker(skill, itemclass, node){
	if (skillprops[skill]['workers'][node] > 0){ //must have at least 1 worker at that node
		skillprops[skill]['workers'][node] = skillprops[skill]['workers'][node] - 1; //remove one worker from the location
		skillprops[skill]['workers'][0] = skillprops[skill]['workers'][0] + 1; //add 1 idle worker
	}
	else {alert('You do not have any workers at that resource');}
}

/* FUNCTIONS NEED FIXING STARTING HERE!!! */

//function to gather a resource - running at all times for all gathering skills
// e.g. category = 'mining', subcategory = 'ore_types', skillprop = 'nodenames'
function gather_resource(category, subcategory, skillprop){
	for (i = 1; i <= 9; i++){ //run through every tree type - no idle trees
		if (woodcutters[i] > 0) { //only if the woodcutters are here
			var hero_pow = Math.pow(hero_wc_lvl, 3); //only need to do the hero power calculations once for each tree
			var accuracy = (0.0008*hero_pow+4*hero_wc_lvl+40)+2.5*hatchet_types[current_hatchet]['accuracy'];
			hero_pow = Math.pow(log_types[treenames[i]]['level'], 3); //re-used for the log's value
			var defense = (0.0008*hero_pow+4*log_types[treenames[i]]['level']+40); 		
			var cutchance = 0.04*accuracy/defense; //figure out the chance of cutting a log per tick
			for (j = 1; j <= woodcutters[i]; j++){ //try chopping a log once per woodcutter
				if (Math.random() < cutchance) {
					var helperflag = false;
					if  (hero_wc_lvl % 11 !== 0) {
						helperflag = true; //this checks to see if levelling up to a multiple of 11, we gain a wc followerr
					}
					log_types[treenames[i]]['total'] = log_types[treenames[i]]['total'] + 1; //gain a log
					var logtype = treenames[i].concat('.total');
					document.getElementById(logtype).innerHTML = log_types[treenames[i]]['total']; //display # of logs 
					
					if (current_hatchet !== 'no') { //skip all of the durability code if there is no hatchet equipped
						hatchet_types[current_hatchet]['durability'] = hatchet_types[current_hatchet]['durability'] -1; //remove 1 durability after cutting a log
						var hatchet_type = current_hatchet.concat('_hatchet.durability'); //we use this variable to refer to the HTML ID for the hatchets
						document.getElementById(hatchet_type).innerHTML = hatchet_types[current_hatchet]['durability']; //display hatchet durability
						if (hatchet_types[current_hatchet]['durability'] === 0) { //check to see if durability is down to 0 after cutting that log
							hatchet_types[current_hatchet]['total'] = hatchet_types[current_hatchet]['total']-1;  //subtract a hatchet for breaking
							hatchet_types[current_hatchet]['durability'] = hatchet_types[current_hatchet]['durability'] + hatchet_types[current_hatchet]['accuracy']; //set the durability for the next hatchet to its maximum value
							hatchet_type = current_hatchet.concat('_hatchet.durability'); //we use this variable to refer to the HTML ID for the hatchets
							document.getElementById(hatchet_type).innerHTML = hatchet_types[current_hatchet]['durability']; //display hatchet durability
							hatchet_type = current_hatchet.concat('_hatchet.total'); 
							document.getElementById(hatchet_type).innerHTML = hatchet_types[current_hatchet]['total'] //display number of current hatchets
							if (hatchet_types[current_hatchet]['total'] === 0){ //unequip the hatchet if there are none left
								for (k = 0; k <= 8; k++) { //loop that equips the highest possible level hatchet if the last current one breaks
									if (hatchet_types[hatchet_metaltype[k]]['total'] > 0 && hero_wc_lvl >= hatchet_types[hatchet_metaltype[k]]['level']) { //makes sure there is a spare hatchet that the hero is high enough to use
										current_hatchet = hatchet_metaltype[k]; //equip new hatchet
									}
								}
								document.getElementById('current_hatchet.name').innerHTML = hatchet_types[current_hatchet]['name'];
							}
						}
					}

					hero_wc_xp = hero_wc_xp + log_types[treenames[i]]['wc_experience']; //gain xp for cutting the log
					document.getElementById('hero_wc_xp').innerHTML = hero_wc_xp; //display xp
					
					if (hero_wc_xp > xp_table[hero_wc_lvl]) {
						hero_wc_lvl = hero_wc_lvl + 1; //if xp overflows in to the next level, add a new level
						document.getElementById('hero_wc_lvl').innerHTML = hero_wc_lvl; //display new level
						if (helperflag === true && hero_wc_lvl % 11 === 0) {
							woodcutters[0] = woodcutters[0] + 1; //if dinged level XX, add a woodcutter
							document.getElementById('idle_tree_woodcutters').innerHTML = woodcutters[0]; //add an idle woodcutter
						}	
					}
				}
			}
		}
	}
}


function herotreeClick(treeid){
	if (hero_wc_lvl >= log_types[treenames[treeid]]['level']){ 
		hero_location[0] = treenames[treeid].concat(' tree'); //make sure this doesn't need to be two lines. hero_location is already declared.	
		document.getElementById('hero_location').innerHTML = hero_location[0]; //display hero's location	
		hero_location[0] = treenames[treeid]; //we now no longer need to write out the tree type in full
		hero_location[1] = treeid; //set the treeid of the hero location

	}
	else{alert('You do not have the required level to chop down these trees.')}
}

function herotree(){
	if (hero_location[1] !== 0) { //only if the hero is not idle

			var hero_pow = Math.pow(hero_wc_lvl, 3); //only need to do the hero power calculations once for each tree
			var accuracy = (0.0008*hero_pow+4*hero_wc_lvl+40)+2.5*hatchet_types[current_hatchet]['accuracy'];
			hero_pow = Math.pow(log_types[hero_location[0]]['level'], 3); //re-used for the log's value
			var defense = (0.0008*hero_pow+4*log_types[hero_location[0]]['level']+40); 		
			var cutchance = 0.04*accuracy/defense; //figure out the chance of cutting a log per tick
			if (Math.random() < cutchance) {
				var helperflag = false;
				if  (hero_wc_lvl % 11 !== 0) {
					helperflag = true; //this checks to see if levelling up to a multiple of 11, we gain a wc followerr
				}
				log_types[hero_location[0]]['total'] = log_types[hero_location[0]]['total'] + 1; //gain a log
				var logtype = hero_location[0].concat('.total');
				document.getElementById(logtype).innerHTML = log_types[hero_location[0]]['total']; //display # of logs
				if (current_hatchet !== 'no') { //skip all of the durability code if there is no hatchet equipped
					hatchet_types[current_hatchet]['durability'] = hatchet_types[current_hatchet]['durability'] -1; //remove 1 durability after cutting a log
					var hatchet_type = current_hatchet.concat('_hatchet.durability'); //we use this variable to refer to the HTML ID for the hatchets
					document.getElementById(hatchet_type).innerHTML = hatchet_types[current_hatchet]['durability']; //display hatchet durability
					if (hatchet_types[current_hatchet]['durability'] === 0) { //check to see if durability is down to 0 after cutting that log
						hatchet_types[current_hatchet]['total'] = hatchet_types[current_hatchet]['total']-1;  //subtract a hatchet for breaking
						hatchet_types[current_hatchet]['durability'] = hatchet_types[current_hatchet]['durability'] + hatchet_types[current_hatchet]['accuracy']; //set the durability for the next hatchet to its maximum value
						hatchet_type = current_hatchet.concat('_hatchet.durability'); //we use this variable to refer to the HTML ID for the hatchets
						document.getElementById(hatchet_type).innerHTML = hatchet_types[current_hatchet]['durability']; //display hatchet durability
						hatchet_type = current_hatchet.concat('_hatchet.total'); 
						document.getElementById(hatchet_type).innerHTML = hatchet_types[current_hatchet]['total'] //display number of current hatchets
						if (hatchet_types[current_hatchet]['total'] === 0){ //unequip the hatchet if there are none left
							for (k = 0; k <= 8; k++) { //loop that equips the highest possible level hatchet if the last current one breaks
								if (hatchet_types[hatchet_metaltype[k]]['total'] > 0 && hero_wc_lvl >= hatchet_types[hatchet_metaltype[k]]['level']) { //makes sure there is a spare hatchet that the hero is high enough to use
									current_hatchet = hatchet_metaltype[k]; //equip new hatchet
								}
							}
							document.getElementById('current_hatchet.name').innerHTML = hatchet_types[current_hatchet]['name'];
						}
					}
				}
				
				hero_wc_xp = hero_wc_xp + log_types[hero_location[0]]['wc_experience']; //gain xp for cutting the log
				document.getElementById('hero_wc_xp').innerHTML = hero_wc_xp; //display xp
				
				if (hero_wc_xp > xp_table[hero_wc_lvl]) {
					hero_wc_lvl = hero_wc_lvl + 1; //if xp overflows in to the next level, add a new level
					document.getElementById('hero_wc_lvl').innerHTML = hero_wc_lvl; //display new level
					if (helperflag === true && hero_wc_lvl % 11 === 0) {
						woodcutters[0] = woodcutters[0] + 1; //if dinged level XX, add a woodcutter
						document.getElementById('idle_tree_woodcutters').innerHTML = woodcutters[0]; //add an idle woodcutter
					}	
				}
			}
		
	}
}

/* NOTE! I NEED TO ADD A FUNCTION TO RE-DISPLAY THE VALUES OF THE CURRENT VARIABLES, but only those in the currently active tab! */

window.setInterval(function(){
	
	herotree();
	cut_trees();
	
}, 30);

function prettify(input){ //currently not used, I'll have to see if I get any weird decimals in important values later.
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

function finaldigit(numberin){ //currently not used for anything; keeping it just in case
	numberin = prettify(numberin); // round the number
	var toText = numberin.toString(); //convert to string
	var lastchar = toText.slice(-1); //gets last character
	var lastdigit = +(lastchar); //convert last character to number
	return lastdigit;
}
