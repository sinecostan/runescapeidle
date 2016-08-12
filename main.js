//community drop rate guide for combat: http://services.runescape.com/m=rswiki/en/Community_-_Drop_Rate_Guide

// http://stackoverflow.com/questions/12612391/javascript-use-getelementbyid-to-populate-multiple-divs
// http://stackoverflow.com/questions/11515383/why-is-element-innerhtml-bad-code
// consider this to populate hero_location - getelementbyid may not be a good way to do this.

//styling of the tabs begins here - eventually change this to a bunch of skill buttons from runescape

//the active_skill will be used to update the skill's display
var active_skill = ['woodcutting', '_hatchet'];

function openskill(evt, skillname, toolname) {
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
	//add the 'active_skill' variable
	active_skill[0] = skillname;
	active_skill[1] = toolname; //passed from the HTML Tag! name of the tool
}

//styling of the tabs ends here

var xp_table = [0,83,174,276,388,512,650,801,969,1154,1562,2014,2512,3060,3668,4338,5076,5892,6792,7786,	8882,	10700,	12701,	14912,	17354,	20048,	23018,	26300,	29921,	33917,	38327,	43196,	50360,	58268,	66996,	76632,	87264,	99004,	111964,	126268,	142056,	159488,	178728,	205278,	234593,	266948,	302668,	342103,	385638,	433698,	486758,	545333,	610003,	681393,	775977,	880401,	995685,	1122957,	1263477,	1418613,	1589889,	1778985,	1987755,	2218251,	2472729,	2800511,	3162404,	3561957,	4003090,	4490122,	5027848,	5621532,	6276998,	7000679,	7799680,	8681834,	9794938,	11023890,	12380754,	13878834,	15532834,	17358986,	19375202,	21601274,	24059042,	26772626,	29768642,	33489980,	37598651,	42134984,	47143475,	52673273,	58778657,	65519522,	72962018,	81179189,	90251657,	100268450,	112556700,	126123990,	141103480,	157642150,	175902310,	196063120,	218322450,	242898710,270033080,299991820,333068930,373241007,417594547,466564787,520632295,580327634,646236609,719005976,799349844,888056638,985996843,1094131573];

//items will hold every object in the game: http://stackoverflow.com/questions/7942398/nested-objects-in-javascript-best-practices
//Level 1-2-3: items - main categories - subcategories
var items = {
	currency : {}, //anything in runescape (coins, tokkul) used as a currency. No levels below this
	mining : {tools : {}, ore_types : {}, uncut_gems : {}}, //will include anything gathered directly by mining (incl. rune essence), and pickaxes
	fishing : {tools : {}, raw_fish : {}, bait : {}}, //all raw fish, equipment, bait, feathers
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
	farming: {seeds : {}, compost : {}}, //all seeds, compost. most farming tools will be ignored since seeds are expendable. no need for farmers to watch your crops... you have your own farmers!
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
	defence:45,
	price:97,
	experience:25,
	fm_experience:50
	},
	oak:{
	name:'oak logs',
	total:0,
	level:15,
	defence:103,
	price:77,
	experience:37.5,
	fm_experience:85
	},
	willow:{
	name:'willow logs',
	total:0,
	level:30,
	defence:182,
	price:23,
	experience:67.5,
	fm_experience:105
	},
	teak:{
	name:'teak logs',
	total:0,
	level:35,
	defence:215,
	price:98,
	experience:85,
	fm_experience:120
	},
	maple:{
	name:'maple logs',
	total:0,
	level:45,
	defence:293,
	price:25,
	experience:100,
	fm_experience:155
	},
	mahogany:{
	name:'mahogany logs',
	total:0,
	level:50,
	defence:340,
	price:508,
	experience:125,
	fm_experience:180
	},
	yew:{
	name:'yew logs',
	total:0,
	level:60,
	defence:453,
	price:174,
	experience:175,
	fm_experience:240
	},
	magic:{
	name:'magic logs',
	total:0,
	level:75,
	defence:678,
	price:628,
	experience:250,
	fm_experience:309.5
	},
	elder:{
	name:'elder logs',
	total:0,
	level:90,
	defence:984,
	price:4967,
	experience:325,
	fm_experience:449
	}
};

items['woodcutting']['tools'] = {
	no:{
	name:'no hatchet',
	total:1, //this means the hatchet will always exit loops that require a hatchet equipped
	level:1,
	price:1,
	accuracy:0,
	durability:1
	},
	bronze:{
	name:'bronze hatchet',
	total:0,
	level:1,
	price:179,
	accuracy:110,
	durability:110
	},
	iron:{
	name:'iron hatchet',
	total:0,
	level:10,
	price:279,
	accuracy:202,
	durability:202
	},
	steel:{
	name:'steel hatchet',
	total:0,
	level:20,
	price:749,
	accuracy:316,
	durability:316
	},
	black:{
	name:'black hatchet',
	total:0,
	level:25,
	price:822,
	accuracy:381,
	durability:381
	},
	mithril:{
	name:'mithril hatchet',
	total:0,
	level:30,
	price:1252,
	accuracy:454,
	durability:454
	},
	adamant:{
	name:'adamant hatchet',
	total:0,
	level:40,
	price:2219,
	accuracy:628,
	durability:628 
	},
	rune:{
	name:'rune hatchet',
	total:0,
	level:50,
	price:7377,
	accuracy:850,
	durability:850
	},
	dragon:{
	name:'dragon hatchet',
	total:0,
	level:60,
	price:1971989,
	accuracy:1132,
	durability:1132
	}
};

items['mining']['ore_types'] = {
	copper:{
	name:'Copper Ore',
	total:0,
	level:1,
	defence:45,
	price:45,
	experience:17.5
	},
	tin:{
	name:'Tin Ore',
	total:0,
	level:1,
	defence:45,
	price:65,
	experience:17.5
	},
	iron:{
	name:'Iron Ore',
	total:0,
	level:15,
	defence:103,
	price:329,
	experience:35
	},
	silver:{
	name:'Silver Ore',
	total:0,
	level:20,
	defence:127,
	price:67,
	experience:40
	},
	coal:{
	name:'Coal',
	total:0,
	level:30,
	defence:182,
	price:187,
	experience:50
	},
	gold:{
	name:'Gold Ore',
	total:0,
	level:40,
	defence:252,
	price:144,
	experience:65
	},
	mithril:{
	name:'Mithril Ore',
	total:0,
	level:55,
	defence:394,
	price:207,
	experience:80
	},
	adamantite:{
	name:'Adamantite Ore',
	total:0,
	level:70,
	defence:595,
	price:1018,
	experience:95
	},
	runite:{
	name:'Runite Ore',
	total:0,
	level:85,
	defence:872,
	price:11304,
	experience:125
	}
};

items['mining']['uncut_gems'] = {
	uncut_sapphire:{
	name:'Uncut Sapphire',
	total:0,
	price:971,
	},
	uncut_emerald:{
	name:'Uncut Emerald',
	total:0,
	price:1808,
	},
	uncut_ruby:{
	name:'Uncut Ruby',
	total:0,
	price:3328,
	},
	uncut_diamond:{
	name:'Uncut Diamond',
	total:0,
	price:4036, 
	}
}

items['mining']['tools'] = {
	no:{
	name:'no pickaxe',
	total:1, //this means the pickaxe will always exit loops that require a pickaxe equipped
	level:1,
	price:1,
	accuracy:0,
	durability:1
	},
	bronze:{
	name:'bronze pickaxe',
	total:0,
	level:1,
	price:179,
	accuracy:110,
	durability:110
	},
	iron:{
	name:'iron pickaxe',
	total:0,
	level:10,
	price:279,
	accuracy:202,
	durability:202
	},
	steel:{
	name:'steel pickaxe',
	total:0,
	level:20,
	price:749,
	accuracy:316,
	durability:316
	},
	mithril:{
	name:'mithril pickaxe',
	total:0,
	level:30,
	price:1252,
	accuracy:454,
	durability:454
	},
	adamant:{
	name:'adamant pickaxe',
	total:0,
	level:40,
	price:2219,
	accuracy:628,
	durability:628 
	},
	rune:{
	name:'rune pickaxe',
	total:0,
	level:50,
	price:7377,
	accuracy:850,
	durability:850
	},
	dragon:{
	name:'dragon pickaxe',
	total:0,
	level:60,
	price:1971989,
	accuracy:1132,
	durability:1132
	}
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

//define woodcutting-specific variables
skillprops['woodcutting'] = {
	workers:[0,0,0,0,0,0,0,0,0,0], //number of woodcutters @ idle, tree, oak, willow, teak, maple, mahogany, yew, magic, elder
	nodenames:['idle','logs','oak','willow','teak','maple','mahogany','yew','magic','elder'], //tree names, the first entry is idle workers, then trees, then oak trees. following the variable convention, logs, oak_logs will create the right variable names
	tooltype:['no','bronze','iron','steel','black','mithril','adamant','rune','dragon'], //hatchet metal types
	current_tool:['No hatchet', 'no'] //tool name and tool type
};

//define mining-specific variables
skillprops['mining'] = {
	workers:[0,0,0,0,0,0,0,0,0,0], //number of miners @ idle, tin, copper, iron, silver, coal, gold, mithril, adamantite, runite
	nodenames:['idle', 'copper', 'tin', 'iron', 'silver', 'coal', 'gold', 'mithril', 'adamantite', 'runite'], //tree names, the first entry is idle workers, then trees, then oak trees. following the variable convention, logs, oak_logs will create the right variable names
	tooltype:['no','bronze','iron','steel','mithril','adamant','rune','dragon'], //pickaxe metal types
	current_tool:['No pickaxe', 'no'] //tool name and tool type
}

//loop through and set all experience and levels to 0/1; equip no tools
for (i = 0; i <= skill_list.length - 1; i++){
	skillprops[skill_list[i]]['experience'] = 0;
	skillprops[skill_list[i]]['level'] = 1;
}

//set starting hero location
var hero_location = ['idle', 0, 'woodcutting', 'log_types']; //default set the hero to woodcutting
document.getElementById('hero_woodcutting_location').innerHTML = hero_location[0]; //display hero's location

//loop to give the player some hatchets for DEBUGGING PURPOSES!!!!!!
for (i = 1; i <= skillprops['woodcutting']['tooltype'].length - 1; i++){ 
	items['woodcutting']['tools'][skillprops['woodcutting']['tooltype'][i]]['total'] = 2;
	if (i < 8){
		items['mining']['tools'][skillprops['mining']['tooltype'][i]]['total'] = 2; 
	}
}

//function to equip a tool
// e.g. skill = 'mining', toolvalue = 1 (any number, e.g. 1 will refer to bronze later)
function equip_tool(skill, toolvalue){
	if (items[skill]['tools'][skillprops[skill]['tooltype'][toolvalue]]['total'] > 0 || toolvalue === 0){  //checks to make sure we have the tool
		if (items[skill]['tools'][skillprops[skill]['tooltype'][toolvalue]]['level'] <= skillprops[skill]['level'] ){ //hero must be the required level to equip it
			skillprops[skill]['current_tool'][0] = items[skill]['tools'][skillprops[skill]['tooltype'][toolvalue]]['name']; //add the name of the hatchet
			skillprops[skill]['current_tool'][1] = skillprops[skill]['tooltype'][toolvalue]; //add the metal/type of the tool
			var skilltool = skill + '_tool'; //set a variable to determine which tool to update e.g. woodcutting_tool
			document.getElementById(skilltool).innerHTML = skillprops[skill]['current_tool'][0]; //display hero's equipped tool
		}
		else {alert('You do not have the required level to equip this tool.');}
	}
	else {alert('You do not have any of these tools.');}
}

//function to add a worker to a location (node)
// e.g. skill = 'mining', itemclass = 'ore_types' node = 1 (copper)
function addworker(skill, itemclass, node){ 
	if (skillprops[skill]['workers'][0] > 0 && skillprops[skill]['level'] >= items[skill][itemclass][skillprops[skill]['nodenames'][node]]['level']){ //must have at least 1 idle worker and the required level
		skillprops[skill]['workers'][node]++ //add one worker to the location
		skillprops[skill]['workers'][0]-- //remove 1 idle worker
		var workerlocname = 'idle_' + active_skill[0] + '_workers';
		document.getElementById(workerlocname).innerHTML = skillprops[active_skill[0]]['workers'][0];
		workerlocname = skillprops[skill]['nodenames'][node] + '_' + active_skill[0] + '_workers';
		document.getElementById(workerlocname).innerHTML = skillprops[active_skill[0]]['workers'][node];
	}
	else {alert('You do not have any idle workers or the required level to gather this resource.');}
}

//function to remove a worker from a location (node)
// e.g. skill = 'mining', itemclass = 'ore_types', node = 1 (copper)
function removeworker(skill, itemclass, node){
	if (skillprops[skill]['workers'][node] > 0){ //must have at least 1 worker at that node
		skillprops[skill]['workers'][node]-- //remove one worker from the location
		skillprops[skill]['workers'][0]++ //add 1 idle worker
		var workerlocname = 'idle_' + active_skill[0] + '_workers';
		document.getElementById(workerlocname).innerHTML = skillprops[active_skill[0]]['workers'][0];
		workerlocname = skillprops[skill]['nodenames'][node] + '_' + active_skill[0] + '_workers';
		document.getElementById(workerlocname).innerHTML = skillprops[active_skill[0]]['workers'][node];		
	}
	else {alert('You do not have any workers at that resource');}
}

//function to gather a resource - running at all times for all gathering skills
// e.g. category = 'mining', subcategory = 'ore_types', skillprop = 'nodenames'
function gather_resource(category, subcategory){
	for (i = 1; i <= skillprops[category]['nodenames'].length - 1; i++){ //run through every node type - no idle node
		var nodename = skillprops[category]['nodenames'][i];
		if (skillprops[category]['workers'][i] > 0) { //only if the workers are here
			var hero_pow = Math.pow(skillprops[category]['level'], 3); //only need to do the hero power calculations once for each node
			var accuracy = (0.0008*hero_pow+4*skillprops[category]['level']+40)+2.5*items[category]['tools'][skillprops[category]['current_tool'][1]]['accuracy'];	
			var cutchance = 0.04*accuracy/items[category][subcategory][nodename]['defence']; //figure out the chance of gathering from node per tick
			for (j = 1; j <= skillprops[category]['workers'][i]; j++){ //try gathering from node once per worker
				var current_tool = skillprops[category]['current_tool'][1];
				if (Math.random() < cutchance) {
					var helperflag = false;
					if  (skillprops[category]['level'] % 11 !== 0) {
						helperflag = true; //this checks to see if levelling up to a multiple of 11, we gain a worker
					}
					skillprops[category]['experience'] += items[category][subcategory][nodename]['experience']; //gain xp for gathering
					if (skillprops[category]['experience'] > xp_table[skillprops[category]['level']]) {
						skillprops[category]['level']++ //if xp overflows in to the next level, add a new level
						if (helperflag === true && skillprops[category]['level'] % 11 === 0) {
							skillprops[category]['workers'][0]++ //if dinged level XX, add an idle worker
						}	
					}
					items[category][subcategory][nodename]['total']++ //gain a resource
					if (current_tool !== 'no') { //skip all of the durability code if there is no tool equipped
						items[category]['tools'][current_tool]['durability']-- //remove 1 durability after gathering
						if (items[category]['tools'][current_tool]['durability'] === 0) { //check to see if durability is down to 0 after gathering
							items[category]['tools'][current_tool]['total']--  //subtract a tool for breaking
							items[category]['tools'][current_tool]['durability'] += items[category]['tools'][current_tool]['accuracy']; //set the durability for the next tool to its maximum value
							if (items[category]['tools'][current_tool]['total'] === 0){ //unequip the tool if there are none left
								for (k = 0; k <= skillprops[category]['tooltype'].length - 1; k++) { //loop that equips the highest possible level tool if the last current one breaks
									var toolname = skillprops[category]['tooltype'][k];
									if (items[category]['tools'][toolname]['total'] > 0 && skillprops[category]['level'] >= items[category]['tools'][toolname]['level']) { //makes sure there is a spare tool that the hero is high enough to use
										skillprops[category]['current_tool'][1] = toolname; //equip new tool
										skillprops[category]['current_tool'][0] = items[category]['tools'][toolname]['name']; //equip new tool (show name)
									}
								}
							}
						}
					}
				}
				//if mining, there is a chance to randomly generate a gem
				if (category === 'mining') {
					mine_gem();
				}				
			}
		}
	}
}


// this function will assign your hero to gather from a specific node.
//e.g. category = 'mining', subcategory = 'ore_types' nodename = 'copper', nodeindex = 1;
function heronode(category, subcategory, nodename, nodeindex){
	if (skillprops[category]['level'] >= items[category][subcategory][nodename]['level']){ 
		hero_location[0] = nodename; //make sure this doesn't need to be two lines. hero_location is already declared.	
		hero_location[1] = nodeindex; //set the treeid of the hero location	
		hero_location[2] = category; //set the skill the hero is working on
		hero_location[3] = subcategory; //set the category the hero is gathering from
		var herolocname = 'hero_' + active_skill[0] + '_location'; //note: this doesn't give the proper location for other skills.
		/* !!! FIX ME SEE ABOVE LINE !!! */
		document.getElementById(herolocname).innerHTML = items[category][subcategory][nodename]['name']; //display hero's location	
	}
	else{alert('You do not have the required level to gather from this node.')}
}

//this function will gather resources at the hero's current location.
//uses existing information from hero_location.
//e.g. [0] = 'copper', [1] = 1, [2] = , [3] = ;
function hero_gather_resource(){
	if (hero_location[1] !== 0) { //only if the hero is not idle
		// set the variables below to reduce calls to the array
		var nodename = hero_location[0]; 	
		var nodeindex = hero_location[1]; 
		var category = hero_location[2]; 
		var subcategory = hero_location[3]; 
		var hero_pow = Math.pow(skillprops[category]['level'], 3); //only need to do the hero power calculations once for each node
		var accuracy = (0.0008*hero_pow+4*skillprops[category]['level']+40)+2.5*items[category]['tools'][skillprops[category]['current_tool'][1]]['accuracy'];	
		var cutchance = 0.04*accuracy/items[category][subcategory][nodename]['defence']; //figure out the chance of gathering from node per tick
		var current_tool = skillprops[category]['current_tool'][1];
		if (Math.random() < cutchance) {
			var helperflag = false;
			if  (skillprops[category]['level'] % 11 !== 0) {
				helperflag = true; //this checks to see if levelling up to a multiple of 11, we gain a worker
			}
			skillprops[category]['experience'] += items[category][subcategory][nodename]['experience']; //gain xp for gathering
			if (skillprops[category]['experience'] > xp_table[skillprops[category]['level']]) {
				skillprops[category]['level']++ //if xp overflows in to the next level, add a new level
				if (helperflag === true && skillprops[category]['level'] % 11 === 0) {
					skillprops[category]['workers'][0]++ //if dinged level XX, add an idle worker
				}	
			}
			items[category][subcategory][nodename]['total']++ //gain a resource
			if (current_tool !== 'no') { //skip all of the durability code if there is no tool equipped
				items[category]['tools'][current_tool]['durability']-- //remove 1 durability after gathering
				if (items[category]['tools'][current_tool]['durability'] === 0) { //check to see if durability is down to 0 after gathering
					items[category]['tools'][current_tool]['total']--  //subtract a tool for breaking
					items[category]['tools'][current_tool]['durability'] += items[category]['tools'][current_tool]['accuracy']; //set the durability for the next tool to its maximum value
					if (items[category]['tools'][current_tool]['total'] === 0){ //unequip the tool if there are none left
						for (k = 0; k <= skillprops[category]['tooltype'].length - 1; k++) { //loop that equips the highest possible level tool if the last current one breaks
							var toolname = skillprops[category]['tooltype'][k];
							if (items[category]['tools'][toolname]['total'] > 0 && skillprops[category]['level'] >= items[category]['tools'][toolname]['level']) { //makes sure there is a spare tool that the hero is high enough to use
								skillprops[category]['current_tool'][1] = toolname; //equip new tool
								skillprops[category]['current_tool'][0] = items[category]['tools'][toolname]['name']; //equip new tool (show name)
							}
						}
					}
				}
			}
			//if mining, there is a chance to randomly generate a gem
			if (category === 'mining') {
				mine_gem();
			}
		}
	}
}

//this function is used to randomly generate a gem from mining
function mine_gem (){
	if (Math.random() < 0.00355){
		var gem_value = Math.round(Math.random() * 3 + 1);
		if (gem_value === 1){
			items['mining']['uncut_gems']['uncut_diamond']['total']++
		} else if (gem_value === 2) {
			items['mining']['uncut_gems']['uncut_emerald']['total']++
		} else if (gem_value === 3) {
			items['mining']['uncut_gems']['uncut_sapphire']['total']++
		} else {
			items['mining']['uncut_gems']['uncut_ruby']['total']++
		}
	}
}

//loop to initialize display of all good types and worker locations
//obviously I want to get away from getelementbyid later
//this will eventually be called by the timer (every .6 seconds)
//the category will be based on a variable that holds the value of the currently selected skill
function update_display () {
	var goodname = ''; //this will be the name of the thing we're redisplaying
	for (var subcategory in items[active_skill[0]]){ //we cycle through the different classes of items
		for (var item in items[active_skill[0]][subcategory]) { //we cycle through the different items in each class
			if (item === 'no'){} //do not execute for 'no' item
			else {
				if (subcategory === 'tools') {
					goodname = item + active_skill[1] + '.total'; //e.g. bronze_pickaxe.total
					document.getElementById(goodname).innerHTML = items[active_skill[0]][subcategory][item]['total'];
					goodname = item + active_skill[1] + '.durability'; //e.g. bronze_pickaxe.durability
					document.getElementById(goodname).innerHTML = items[active_skill[0]][subcategory][item]['durability'];
				} else {
					goodname = item + '.total'; //e.g. copper.total
					document.getElementById(goodname).innerHTML = items[active_skill[0]][subcategory][item]['total'];
				}
			}
		}
	}
	// display idle workers
	goodname = 'idle_' + active_skill[0] + '_workers';
	document.getElementById(goodname).innerHTML = skillprops[active_skill[0]]['workers'][0];
	
	//display equipped tool, level, XP
	goodname = active_skill[0] + '_tool';
	document.getElementById(goodname).innerHTML = skillprops[active_skill[0]]['current_tool'][0];
	goodname = 'hero_' + active_skill[0] + '_level';
	document.getElementById(goodname).innerHTML = skillprops[active_skill[0]]['level'];
	goodname = 'hero_' + active_skill[0] + '_xp';
	document.getElementById(goodname).innerHTML = skillprops[active_skill[0]]['experience'];
}

window.setInterval(function(){
	
	update_display();
	hero_gather_resource();
	gather_resource('woodcutting', 'log_types');
	gather_resource('mining', 'ore_types');
	
}, 10);

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
