//VARIABLES
var fighterChosen = false;
var defenderChosen = false;
var player = {};
var defender = {};
var enemies = 3;


//CHARACTER CONSTRUCTOR
function Character(name, minHP, maxHP, minAtk, maxAtk){
    this.name = name,
    this.hp = 0,
    this.atk = 0,
    this.atkMod = 0,
    this.minHP = minHP,
    this.maxHP = maxHP,
    this.minAtk = minAtk,
    this.maxAtk = maxAtk,
    this.rollStats = function(){
        this.hp = Math.floor(Math.random() * (this.maxHP - this.minHP) ) + this.minHP;
        this.atkMod = Math.floor(Math.random() * (this.maxAtk - this.minAtk) ) + this.minAtk;
    },
    this.attack = function(defender){
        defender.hp = defender.hp - this.atk;
        this.atk += this.atkMod;
        $("#attack").text(this.name+" attacks "+defender.name+" for "+this.atk+" damage.");
        $("#"+defender.name+"HP").text(defender.hp);
    },
    this.counter = function(player){
        player.hp = player.hp - this.atk;
        $("#"+player.name+"HP").text(player.hp);
        $("#counterattack").text(this.name+" counter attacks "+player.name+" for "+this.atk+" damage.");
    }
    this.showHP = function(){
        var hpDiv = "#"+this.name+"HP";
        $(hpDiv).text(this.hp);
    }
    this.hide = function(){
        $("#"+this.name).addClass("d-none")
    }
    this.show = function(){
        $("#"+defender.name).removeClass("d-none")
    }
}
//INITIALIZE CHARACTER OBJECTS
var kevin = new Character("kevin",70,300,100,140);
var jacoby = new Character("jacoby",100,300,10,30);
var whytte = new Character("whytte",100,300,10,30);
var lemon = new Character("lemon",100,300,10,30);


reset();

//FUNCTIONS
//start game
function reset(){

    fighterChosen = false;
    defenderChosen = false;
    player = {};
    defender = {};
    enemies = 3;

    kevin.rollStats();
    jacoby.rollStats();
    whytte.rollStats();
    lemon.rollStats();
    kevin.showHP();
    jacoby.showHP();
    whytte.showHP();
    lemon.showHP();


    $(".token")
    .attr({ "data-status": "neutral"})
    .removeClass("d-none")
    .removeClass("col-md-5 col-md-12 col-md-4")
    .addClass("col-md-3")
    .appendTo($("#character-selection"));


    $("#hooligans").hide();
    $("#arena").hide();
    $("#attack").empty();
    $("#counterattack").empty();
    $("#enemies").empty();
}

//Select Fighter
function selectFighter(character) {
    $("#arena").show();
    fighterChosen = true; //fighter has been chosen
    var character = $(character); //store the chosen character as player
    character.attr({ "data-status": "player" }); //set the data-status to player
    character.removeClass("col-md-3").addClass("col-md-12");
    character.appendTo($("#player"));//move to the player div

    if(character.attr("id") == "kevin"){
        player = kevin;
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
    $("#hooligans").show();
    $("[data-status='neutral']").removeClass("col-md-3").addClass("col-md-4").appendTo($("#enemies"));//move non-player tokens to defenders
}

//Select Defender
function selectDefender(character) {
    defenderChosen = true;
    var character = $(character);
    character.attr({ "data-status": "defender" });
    character.removeClass("col-md-3").addClass("col-md-12")
    $("#enemies").append("<div class='col-md-4'></div>");
    character.appendTo($("#defender"));

    if(character.attr("id") == "kevin"){
        defender = kevin;
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
    defender.atk = defender.atkMod;
}
//Add event listener to character tokens
$(".token").on("click", function () {
    console.log("fighter: "+fighterChosen);
    console.log("defender: "+defenderChosen);
    //if no fighter has been chosen
    if (!fighterChosen) {
        selectFighter(this);
    }
    //if fighter has been chosen
    else {
        if(!defenderChosen){
            $("#attack").empty();
            $("#counterattack").empty();
            selectDefender(this);
        }
    }
    if(fighterChosen && defenderChosen){
        $(".attack").on("click", function () {
            player.attack(defender);
            defender.counter(player);
            if(defender.hp < 1){
                enemies --;
                defender.hide();
                defenderChosen = false;
                $(".attack").off("click");
                console.log("enemies: "+enemies);
            } 
            if(player.hp < 1){
                $(".attack").off("click");
                if(defender.hp < 1){
                    setTimeout(gameOver("You knocked each other out!"),1000);
                }
                else{
                setTimeout(gameOver("You lost."),1000);
                }
            }
            if(enemies < 1){
                setTimeout(gameOver("You won!"),1000);
            }     
        });
    }
});


//
function gameOver(msg){
        if(confirm(msg+" Play again?")){
        reset();
    }
}