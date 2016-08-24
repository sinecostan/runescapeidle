//community drop rate guide for combat: http://services.runescape.com/m=rswiki/en/Community_-_Drop_Rate_Guide

// http://stackoverflow.com/questions/12612391/javascript-use-getelementbyid-to-populate-multiple-divs
// http://stackoverflow.com/questions/11515383/why-is-element-innerhtml-bad-code

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
	fishing : {tools : {}, raw_fish_types : {}}, //all raw fish, equipment, bait, feathers
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
items['woodcutting']['log_types'] = { //I can probably get rid of all fm_experience entries
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
	max_durability:1,
	durability:1
	},
	bronze:{
	name:'bronze hatchet',
	total:0,
	level:1,
	price:179,
	accuracy:110,
	max_durability:500,
	durability:500
	},
	iron:{
	name:'iron hatchet',
	total:0,
	level:10,
	price:279,
	accuracy:202,
	max_durability:900,
	durability:900
	},
	steel:{
	name:'steel hatchet',
	total:0,
	level:20,
	price:749,
	accuracy:316,
	max_durability:1600,
	durability:1600
	},
	black:{
	name:'black hatchet',
	total:0,
	level:25,
	price:822,
	accuracy:381,
	max_durability:2200,
	durability:2200
	},
	mithril:{
	name:'mithril hatchet',
	total:0,
	level:30,
	price:1252,
	accuracy:454,
	max_durability:2900,
	durability:2900
	},
	adamant:{
	name:'adamant hatchet',
	total:0,
	level:40,
	price:2219,
	accuracy:628,
	max_durability:5300,
	durability:5300 
	},
	rune:{
	name:'rune hatchet',
	total:0,
	level:50,
	price:7377,
	accuracy:850,
	max_durability:9500,
	durability:9500
	},
	dragon:{
	name:'dragon hatchet',
	total:0,
	level:60,
	price:1971989,
	accuracy:1132,
	max_durability:17100,
	durability:17100
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
	max_durability:1,
	durability:1
	},
	bronze:{
	name:'bronze pickaxe',
	total:0,
	level:1,
	price:179,
	accuracy:110,
	max_durability:500,
	durability:500
	},
	iron:{
	name:'iron pickaxe',
	total:0,
	level:10,
	price:279,
	accuracy:202,
	max_durability:900,
	durability:900
	},
	steel:{
	name:'steel pickaxe',
	total:0,
	level:20,
	price:749,
	accuracy:316,
	max_durability:1600,
	durability:1600
	},
	mithril:{
	name:'mithril pickaxe',
	total:0,
	level:30,
	price:1252,
	accuracy:454,
	max_durability:2900,
	durability:2900
	},
	adamant:{
	name:'adamant pickaxe',
	total:0,
	level:40,
	price:2219,
	accuracy:628,
	max_durability:5300,
	durability:5300 
	},
	rune:{
	name:'rune pickaxe',
	total:0,
	level:50,
	price:7377,
	accuracy:850,
	max_durability:9500,
	durability:9500
	},
	dragon:{
	name:'dragon pickaxe',
	total:0,
	level:60,
	price:1971989,
	accuracy:1132,
	max_durability:17100,
	durability:17100
	}
};

items['fishing']['tools'] = {
	//tools in fishing work a little differently from those used for mining and woodcutting
	//fishing tools can just be bought at a shop - they can't be made
	//fishing already consumes bait/feathers/minerals in order to catch fish, except net/cage fishing.
	//the tools can probably remain indestructable, and the consumables stay for catching fish
	//since there is no type of crafting mechanic and thus no REAL need to remove them from the game.
	//NOTE: none of these are actually set up yet (below)
	big_fishing_net:{
	name:'Big Fishing Net',
	total:1,
	durability:'n/a'
	},
	feather:{
	name:'Feather',
	total:0,
	durability:'n/a'
	},
	fishing_bait:{
	name:'Fishing Bait',
	total:0,
	durability:'n/a'
	},
	fishing_rod:{
	name:'Fishing Rod',
	total:1,
	durability:'n/a'
	},
	fly_fishing_rod:{
	name:'Fly Fishing Rod',
	total:1,
	durability:'n/a'
	},
	harpoon:{
	name:'Harpoon',
	total:1,
	durability:'n/a'
	},
	living_minerals:{
	name:'Living Minerals',
	total:0,
	durability:'n/a'
	},
	lobster_pot:{
	name:'Lobster Pot',
	total:1,
	durability:'n/a'
	},
	small_fishing_net:{
	name:'Small Fishing Net',
	total:1,
	durability:'n/a'
	}
};

items['fishing']['raw_fish_types'] = {
	raw_shrimps:{
	name:'Raw Shrimps',
	total:0,
	level:1,
	defence:45,
	active:false,
	node:'small_net',
	experience:10
	},
	raw_sardine:{
	name:'Raw Sardine',
	total:0,
	level:5,
	defence:61,
	active:false,
	node:'bait_rod_salt',
	experience:20
	},
	raw_herring:{
	name:'Raw Herring',
	total:0,
	level:10,
	defence:81,
	active:false,
	node:'bait_rod_salt',
	experience:30
	},
	raw_anchovies:{
	name:'Raw Anchovies',
	total:0,
	level:15,
	defence:103,
	active:false,
	node:'small_net',
	experience:40
	},
	raw_mackerel:{
	name:'Raw Mackerel',
	total:0,
	level:16,
	defence:108,
	active:false,
	node:'big_net',
	experience:20
	},
	raw_trout:{
	name:'Raw Trout',
	total:0,
	level:20,
	defence:127,
	active:false,
	node:'fly_rod',
	experience:50
	},
	raw_cod:{
	name:'Raw Cod',
	total:0,
	level:23,
	defence:142,
	active:false,
	node:'big_net',
	experience:45
	},
	raw_pike:{
	name:'Raw Pike',
	total:0,
	level:25,
	defence:153,
	active:true,
	node:'bait_rod_fresh',
	experience:60
	},
	raw_salmon:{
	name:'Raw Salmon',
	total:0,
	level:30,
	defence:182,
	active:false,
	node:'fly_rod',
	experience:70
	},
	raw_tuna:{
	name:'Raw Tuna',
	total:0,
	level:35,
	defence:215,
	active:false,
	node:'harpoon',
	experience:80
	},
	raw_lobster:{
	name:'Raw Lobster',
	total:0,
	level:40,
	defence:252,
	active:true,
	node:'cage',
	experience:90
	},
	raw_bass:{
	name:'Raw Bass',
	total:0,
	level:46,
	defence:302,
	active:false,
	node:'big_net',
	experience:100
	},
	raw_swordfish:{
	name:'Raw Swordfish',
	total:0,
	level:50,
	defence:340,
	active:false,
	node:'harpoon',
	experience:100
	},
	raw_monkfish:{
	name:'Raw Monkfish',
	total:0,
	level:62,
	defence:479,
	active:false,
	node:'small_net',
	experience:120
	},
	raw_shark:{
	name:'Raw Shark',
	total:0,
	level:76,
	defence:696,
	active:false,
	node:'harpoon',
	experience:110
	},
	raw_cavefish:{
	name:'Raw Cavefish',
	total:0,
	level:85,
	defence:872,
	active:true,
	node:'rock_bait',
	experience:300
	},
	raw_rocktail:{
	name:'Raw Rocktail',
	total:0,
	level:90,
	defence:984,
	active:true,
	node:'rock_minerals',
	experience:380
	},
	//here begins the workaround for the complicated name of these nodes:
	//the node names will be defined here with the level of their lowest-level fish
	small_net:{
	total:'none',
	level:1
	},
	bait_rod_salt:{
	total:'none',
	level:5
	},
	bait_rod_fresh:{
	total:'none',
	level:25
	},
	big_net:{
	total:'none',
	level:16
	},
	fly_rod:{
	total:'none',
	level:20
	},
	harpoon:{
	total:'none',
	level:35
	},
	cage:{
	total:'none',
	level:40
	},
	rock_bait:{
	total:'none',
	level:85
	},
	rock_minerals:{
	total:'none',
	level:90
	}
};



// define a set of properties for each skill
var skillprops = {
woodcutting : {}, mining : {}, fishing : {}
//, farming : {}, hunter : {}, divination : {}, herblore : {}, crafting : {}, fletching : {}, smithing : {}, cooking : {}, firemaking : {}, runecrafting : {}, construction : {}, agility : {}, thieving : {}, slayer : {}, dungeoneering : {}, melee : {}, defence : {}, ranged : {}, prayer : {}, magic : {}, constitution : {}, summoning : {}
} //this is split: we remove skills that aren't yet implemented.

//define a list of all skills
var skill_list = ['woodcutting', 'mining', 'fishing'
//,  'farming',  'hunter',  'divination',  'herblore',  'crafting',  'fletching',  'smithing',  'cooking',  'firemaking',  'runecrafting',  'construction',  'agility',  'thieving',  'slayer',  'dungeoneering',  'melee',  'defence',  'ranged', 'prayer',  'magic',  'constitution',  'summoning'
] //this is split: we remove skills that aren't yet implemented.

//define woodcutting-specific variables
skillprops['woodcutting'] = {
	workers:[1,0,0,0,0,0,0,0,0,0], //number of woodcutters @ idle, tree, oak, willow, teak, maple, mahogany, yew, magic, elder
	nodenames:['idle','logs','oak','willow','teak','maple','mahogany','yew','magic','elder'], //tree names, the first entry is idle workers, then trees, then oak trees. following the variable convention, logs, oak_logs will create the right variable names
	tooltype:['no','bronze','iron','steel','black','mithril','adamant','rune','dragon'], //hatchet metal types
	current_tool:['No hatchet', 'no'] //tool name and tool type
};

//define mining-specific variables
skillprops['mining'] = {
	locations:{},
	workers:[1,0,0,0,0,0,0,0,0,0], //number of miners @ each location 
	nodenames:['idle', 'copper', 'tin', 'iron', 'silver', 'coal', 'gold', 'mithril', 'adamantite', 'runite'], //rock names, the first entry is idle workers, then trees, then oak trees. following the variable convention, logs, oak_logs will create the right variable names
	tooltype:['no','bronze','iron','steel','mithril','adamant','rune','dragon'], //pickaxe metal types
	current_tool:['No pickaxe', 'no'] //tool name and tool type
};

skillprops['fishing'] = {
	workers:[1,0,0,0,0,0,0,0,0,0],
	nodenames:{
		small_net:['raw_shrimps','raw_anchovies','raw_monkfish'],
		bait_rod_salt:['raw_sardine','raw_herring'],
		bait_rod_fresh:['raw_pike'],
		big_net:['raw_mackerel','raw_cod','raw_bass'],
		fly_rod:['raw_trout','raw_salmon'],
		harpoon:['raw_tuna','raw_swordfish','raw_shark'],
		cage:['raw_lobster'],
		rock_bait:['raw_cavefish'],
		rock_minerals:['raw_rocktail']
	}
};

//loop through and set all experience and levels to 0/1; equip no tools
for (i = 0; i <= skill_list.length - 1; i++){
	skillprops[skill_list[i]]['experience'] = 0;
	skillprops[skill_list[i]]['level'] = 1;
}

//loop to give the player some tools for DEBUGGING PURPOSES!!!!!!
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
// e.g. skill = 'mining', itemclass = 'ore_types' node = 1 (copper), nodenamein = 'copper'
function addworker(skill, itemclass, node, nodenamein){ 
	if (skillprops[skill]['workers'][0] > 0 && skillprops[skill]['level'] >= items[skill][itemclass][nodenamein]['level']){ //must have at least 1 idle worker and the required level
		skillprops[skill]['workers'][node]++ //add one worker to the location
		skillprops[skill]['workers'][0]-- //remove 1 idle worker
		var workerlocname = 'idle_' + active_skill[0] + '_workers';
		document.getElementById(workerlocname).innerHTML = skillprops[active_skill[0]]['workers'][0];
		workerlocname = nodenamein + '_' + active_skill[0] + '_workers';
		document.getElementById(workerlocname).innerHTML = skillprops[active_skill[0]]['workers'][node];
	}
	else {alert('You do not have any idle workers or the required level to gather this resource.');}
}

//function to remove a worker from a location (node)
// e.g. skill = 'mining', itemclass = 'ore_types', node = 1 (copper)
function removeworker(skill, itemclass, node, nodenamein){
	if (skillprops[skill]['workers'][node] > 0){ //must have at least 1 worker at that node
		skillprops[skill]['workers'][node]-- //remove one worker from the location
		skillprops[skill]['workers'][0]++ //add 1 idle worker
		var workerlocname = 'idle_' + active_skill[0] + '_workers';
		document.getElementById(workerlocname).innerHTML = skillprops[active_skill[0]]['workers'][0];
		workerlocname = nodenamein + '_' + active_skill[0] + '_workers';
		document.getElementById(workerlocname).innerHTML = skillprops[active_skill[0]]['workers'][node];		
	}
	else {alert('You do not have any workers at that resource');}
}

function selectnoderesource(skill, itemclass, itemname){
	var itemid = itemname + "_button"; //fetch the ID of the element by adding button to the item name
	var classcheck = document.getElementById(itemid).className; //fetch the class from the element
	if (classcheck === "itemicon" && skillprops['fishing']['level'] >= items[skill][itemclass][itemname]['level']) { //the hero's level must be high enough & the node must be inactive to toggle
		document.getElementById(itemid).className =  "itemicon_active";
		items[skill][itemclass][itemname]['active'] = true;
	}
	else {
		document.getElementById(itemid).className =  "itemicon";
		items[skill][itemclass][itemname]['active'] = false;
	}
}

//splitting functions individually allows me to call them more dynamically. I will call woodcutting separately.
function woodcutting(){
	//using the workers @ each node, choose how often to run gather_resource
	for (i=1; i <= skillprops['woodcutting']['nodenames'].length - 1; i++){
		var nodename = skillprops['woodcutting']['nodenames'][i];
		if (skillprops['woodcutting']['workers'][i] > 0) { //only if the workers are here
			var hero_pow = Math.pow(skillprops['woodcutting']['level'], 3); //only need to do the hero power calculations once for each node
			var accuracy = (0.0008*hero_pow+4*skillprops['woodcutting']['level']+40)+2.5*items['woodcutting']['tools'][skillprops['woodcutting']['current_tool'][1]]['accuracy'];	
			var gatherchance = 0.04*accuracy/items['woodcutting']['log_types'][nodename]['defence']; //figure out the chance of gathering from node per tick
			for (j = 1; j <= skillprops['woodcutting']['workers'][i]; j++){ //try gathering from node once per worker
				if (skillprops['woodcutting']['current_tool'][1] !== 'no') { //skip all of the durability code if there is no tool equipped
						process_durability('woodcutting');
				}
				if (Math.random() < gatherchance) {
					gainxpandlevel('woodcutting', 'log_types', nodename);
					items['woodcutting']['log_types'][nodename]['total']++ //gain a resource
				}
			}
		}
	}
}

function mining(){
	//using the workers @ each node, choose how often to run gather_resource
	//mine_gem(); each tick when calling the gather_resource function
	for (i=1; i <= skillprops['mining']['nodenames'].length - 1; i++){
		var nodename = skillprops['mining']['nodenames'][i];
		if (skillprops['mining']['workers'][i] > 0) { //only if the workers are here
			var hero_pow = Math.pow(skillprops['mining']['level'], 3); //only need to do the hero power calculations once for each node
			var accuracy = (0.0008*hero_pow+4*skillprops['mining']['level']+40)+2.5*items['mining']['tools'][skillprops['mining']['current_tool'][1]]['accuracy'];	
			var gatherchance = 0.04*accuracy/items['mining']['ore_types'][nodename]['defence']; //figure out the chance of gathering from node per tick
			for (j = 1; j <= skillprops['mining']['workers'][i]; j++){ //try gathering from node once per worker
				if (skillprops['mining']['current_tool'][1] !== 'no') { //skip all of the durability code if there is no tool equipped
						process_durability('mining');
				}
				if (Math.random() < gatherchance) {
					mine_gem(); //chance to mine a gem if rock is successful (1/282)
					gainxpandlevel('mining', 'ore_types', nodename);
					items['mining']['ore_types'][nodename]['total']++ //gain a resource
				}
			}
		}
	}	
}

//TESTING PURPOSES ONLY: give bait
items['fishing']['tools']['fishing_bait']['total'] = 1000;


function fishing(){
	//note: fishing doesn't use an idle worker object, so the indices will be offset by -1, but the worker array still has the first entry as idle!
	for (i=0; i <= Object.keys(skillprops['fishing']['nodenames']).length; i++){
		var fish_counter = 0; //used to count the # of fish active at each node
		if (skillprops['fishing']['workers'][i+1] > 0){
			fish_names_object = Object.getOwnPropertyNames(skillprops['fishing']['nodenames']);
			for (let fish_name of skillprops['fishing']['nodenames'][fish_names_object[i]]) {
				//bug in the above line? skillprops ['small_net'][0] should return 'raw_shrimps' but it can't read property '0' of undefined.
				if (items['fishing']['raw_fish_types'][fish_name]['active'] === true){
					fish_counter++ //the fish counter is used to divide the probability of success for each active fish
				}	
			}
			for (let fish_name of skillprops['fishing']['nodenames'][fish_names_object[i]]) { //now we run through a catch chance for each fish
				if (items['fishing']['raw_fish_types'][fish_name]['active'] === true){
					var hero_pow = Math.pow(skillprops['fishing']['level'], 3); //only need to do the hero power calculations once for each node
					var accuracy = (0.0008*hero_pow+4*skillprops['fishing']['level']+40)*3.5;	
					var gatherchance = 0.04*accuracy/(items['fishing']['raw_fish_types'][fish_name]['defence']*fish_counter); //figure out the chance of gathering from node per tick
					for (j = 1; j <= skillprops['fishing']['workers'][i+1]; j++){ //try gathering from node once per worker
					//note: this doesn't yet check to make sure bait is available.
					//need to unassign all workers when I reach 0 bait (make them all idle)
						if (Math.random() < gatherchance) {
							if (fish_name === 'raw_sardine' && items['fishing']['tools']['fishing_bait']['total'] > 0 || fish_name === 'raw_herring' && items['fishing']['tools']['fishing_bait']['total'] > 0 ||fish_name === 'raw_pike' && items['fishing']['tools']['fishing_bait']['total'] > 0 || fish_name === 'raw_cavefish' && items['fishing']['tools']['fishing_bait']['total'] > 0) { //remove a consumable bait if the fish is caught (as applicable)
								gainxpandlevel('fishing', 'raw_fish_types', fish_name);
								items['fishing']['raw_fish_types'][fish_name]['total']++ //gain a resource	
								items['fishing']['tools']['fishing_bait']['total']--
							}
							else if (fish_name === 'raw_salmon' && items['fishing']['tools']['feather']['total'] > 0 || fish_name === 'raw_trout' && items['fishing']['tools']['feather']['total'] > 0) {
								gainxpandlevel('fishing', 'raw_fish_types', fish_name);
								items['fishing']['raw_fish_types'][fish_name]['total']++ //gain a resource
								items['fishing']['tools']['feather']['total']--	
							}
							else if (fish_name === 'raw_rocktail' && items['fishing']['tools']['living_minerals']['total'] > 0) {
								gainxpandlevel('fishing', 'raw_fish_types', fish_name);
								items['fishing']['raw_fish_types'][fish_name]['total']++ //gain a resource
								items['fishing']['tools']['living_minerals']['total']--	
							}
							else if (fish_names_object[i] !== 'bait_rod_fresh' && fish_names_object[i] !== 'bait_rod_salt' && fish_names_object[i] !== 'rock_bait' && fish_names_object[i] !== 'rock_minerals' && fish_names_object[i] !== 'fly_rod') {
								gainxpandlevel('fishing', 'raw_fish_types', fish_name);
								items['fishing']['raw_fish_types'][fish_name]['total']++ //gain a resource
							}
						}
					}
				}
			}
		}
	}
}

//NOTE: per the durability and xp functions, all that's left in the  gather_resource function is passing through a counter
//realistically, once I have checkboxes for each node and up/down arrows for the workers, I can skip all of the looping
//remember, the calculation on each mine will be x swings of each resource per y ticks
//e.g. run gather_resource(mining, iron, 2) [skill/node] every X ticks rather than iterating through the array

//this will process the durability of the equipped tool. run when you gather a resource
//ex: categoryin = 'woodcutting', 
function process_durability(categoryin){ 
	var current_tool = skillprops[categoryin]['current_tool'][1];
	items[categoryin]['tools'][current_tool]['durability']-- //remove 1 durability after gathering
	if (items[categoryin]['tools'][current_tool]['durability'] === 0) { //check to see if durability is down to 0 after gathering
		items[categoryin]['tools'][current_tool]['total']--  //subtract a tool for breaking
		items[categoryin]['tools'][current_tool]['durability'] += items[categoryin]['tools'][current_tool]['max_durability']; //set the durability for the next tool to its maximum value
		if (items[categoryin]['tools'][current_tool]['total'] === 0){ //unequip the tool if there are none left
			for (k = 0; k <= skillprops[categoryin]['tooltype'].length - 1; k++) { //loop that equips the highest possible level tool if the last current one breaks
				var toolname = skillprops[categoryin]['tooltype'][k];
				if (items[categoryin]['tools'][toolname]['total'] > 0 && skillprops[categoryin]['level'] >= items[categoryin]['tools'][toolname]['level']) { //makes sure there is a spare tool that the hero is high enough to use
					skillprops[categoryin]['current_tool'][1] = toolname; //equip new tool
					skillprops[categoryin]['current_tool'][0] = items[categoryin]['tools'][toolname]['name']; //equip new tool (show name)
				}
			}
		}
	}
}

//this will gain xp for the user and add a level if xp is exceeded
//ex: categoryin = 'woodcutting', nodename='oak' (comes from gather_resource function)
function gainxpandlevel(categoryin, subcategoryin, nodenamein){
	var helperflag = false;
	if  (skillprops[categoryin]['level'] % 11 !== 0) {
		helperflag = true; //this checks to see if levelling up to a multiple of 11, we gain a worker
	}
	skillprops[categoryin]['experience'] += items[categoryin][subcategoryin][nodenamein]['experience']; //gain xp for gathering
	if (skillprops[categoryin]['experience'] > xp_table[skillprops[categoryin]['level']]) {
		skillprops[categoryin]['level']++ //if xp overflows in to the next level, add a new level
		if (helperflag === true && skillprops[categoryin]['level'] % 11 === 0) {
			skillprops[categoryin]['workers'][0]++ //if dinged level XX, add an idle worker
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
				} else if (items[active_skill[0]][subcategory][item]['total'] !== 'none') {
					goodname = item + '.total'; //e.g. copper.total
					document.getElementById(goodname).innerHTML = items[active_skill[0]][subcategory][item]['total'];
				}
			}
		}
	}
	// display idle workers
	goodname = 'idle_' + active_skill[0] + '_workers';
	document.getElementById(goodname).innerHTML = skillprops[active_skill[0]]['workers'][0];
	
	//display equipped tool (gathering skills), level, XP
	if (active_skill[0] === 'woodcutting' || active_skill[0] === 'mining'){
		goodname = active_skill[0] + '_tool';
		document.getElementById(goodname).innerHTML = skillprops[active_skill[0]]['current_tool'][0];
	}
	goodname = 'hero_' + active_skill[0] + '_level';
	document.getElementById(goodname).innerHTML = skillprops[active_skill[0]]['level'];
	goodname = 'hero_' + active_skill[0] + '_xp';
	document.getElementById(goodname).innerHTML = skillprops[active_skill[0]]['experience'];
}

//this bit of code is to initialize zeroes for all of the icons that aren't regularly updated by update_display()
//for example, the number of workers at each node.
function initialize_display(){
	var goodname = ''//this will be the name of the thing we're displaying
	var skillnamesobject = Object.getOwnPropertyNames(skillprops); //should return: 0:'woodcutting', 1:'mining' etc.
	for (i = 0; i < skillnamesobject.length; i++){
		var nodenamesobject = Object.getOwnPropertyNames(skillprops[skillnamesobject[i]]['nodenames']); //should return: 0:'logs', 1:'oak' for the first iteration
		if (skillnamesobject[i] === 'fishing'){
			for (j=0; j < nodenamesobject.length; j++){
				goodname = nodenamesobject[j] + '_' + skillnamesobject[i] + '_workers';
				document.getElementById(goodname).innerHTML = skillprops[skillnamesobject[i]]['workers'][j+1];
			}
		}
		else {
			for (j=1; j < nodenamesobject.length - 1; j++){
				goodname = skillprops[skillnamesobject[i]]['nodenames'][j] + '_' + skillnamesobject[i] + '_workers';
				document.getElementById(goodname).innerHTML = skillprops[skillnamesobject[i]]['workers'][j];
			}
		}
	}
}
initialize_display();

window.setInterval(function(){
	
	update_display();
	woodcutting();
	mining();
	fishing();
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
