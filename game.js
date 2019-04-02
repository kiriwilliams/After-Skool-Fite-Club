//VARIABLES
var fighterChosen = false;
var defenderChosen = false;
var player = {};
var defender = {};


//CHARACTER CONSTRUCTOR
function Character(name, minHP, maxHP, minAtk, maxAtk){
    this.name = name,
    this.hp = 0,
    this.atk = 0,
    this.minHP = minHP,
    this.maxHP = maxHP,
    this.minAtk = minAtk,
    this.maxAtk = maxAtk,
    this.rollStats = function(){
        this.hp = Math.floor(Math.random() * (this.maxHP - this.minHP) ) + this.minHP;
        this.atk = Math.floor(Math.random() * (this.maxAtk - this.minAtk) ) + this.minAtk;
    },
    this.attack = function(defender){
        defender.hp = defender.hp - this.atk;
        this.atk = this.atk + this.atk;
        $("#defender").text(defender.hp);
    },
    this.counter = function(player){
        player.hp = player.hp - this.atk;
        $("#playerHP").text(player.hp);
    }
}
//INITIALIZE CHARACTER OBJECTS
var mark = new Character("Mark",70,300,100,140);
var jacoby = new Character("Jacoby",100,300,10,30);
var whytte = new Character("Whytte",100,300,10,30);
var lemon = new Character("Lemon",100,300,10,30);


reset();

//FUNCTIONS
//start game
function reset(){
    mark.rollStats();
    jacoby.rollStats();
    whytte.rollStats();
    lemon.rollStats();
    $("#mark > .hp").text(mark.hp);
    $(".token").attr({ "data-status": "neutral"}).appendTo($("#character-selection"));
}

//Select Fighter
function selectFighter(character) {
    fighterChosen = true; //fighter has been chosen
    var character = $(character); //store the chosen character as player
    character.attr({ "data-status": "player" }); //set the data-status to player
    character.appendTo($("#player"));//move to the player div
    character.off("click");

    if(character.attr("id") == "mark"){
        player = mark;
    }
    else if(character.attr("id") =="jacoby"){
        player = jacoby;
    }
    else if(character.attr("id") == "whytte"){
        player  = whytte;
    }
    else{
        player = lemon;
    }
    $("[data-status='neutral']").appendTo($("#enemies"));//move non-player tokens to defenders
}

//Select Defender
function selectDefender(character) {
    defenderChosen = true;
    var character = $(character);
    character.attr({ "data-status": "defender" });
    character.appendTo($("#defender"));
    if(character.attr("id") == "mark"){
        defender = mark;
    }
    else if(character.attr("id") =="jacoby"){
        defender = jacoby;
    }
    else if(character.attr("id") == "whytte"){
        defender  = whytte;
    }
    else{
        defender = lemon;
    }
}
//Add event listener to character tokens
$(".token").on("click", function () {
    //if no fighter has been chosen
    if (!fighterChosen) {
        selectFighter(this);
    }
    //if fighter has been chosen
    else {
        if (!defenderChosen) {
            selectDefender(this);
        }
        $(".attack").on("click", function () {
            console.log(defender.name+"heo"+defender.hp);
            player.attack(defender);
            defender.counter(player);
                console.log(player.name+" hp: "+player.hp);
                console.log(player.name+" atk: "+player.atk);
                console.log(defender.name+" hp: "+defender.hp);
            if(defender.hp < 0){
                $("#defender").empty();
                defenderChosen = false;
            }       
        });
    }
});
