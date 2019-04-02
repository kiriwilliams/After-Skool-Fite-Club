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
        $("#"+defender.name+"HP").text(defender.hp);
    },
    this.counter = function(player){
        player.hp = player.hp - this.atk;
        $("#"+player.name+"HP").text(player.hp);
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
var mark = new Character("mark",70,300,100,140);
var jacoby = new Character("jacoby",100,300,10,30);
var whytte = new Character("whytte",100,300,10,30);
var lemon = new Character("lemon",100,300,10,30);


reset();

//FUNCTIONS
//start game
function reset(){

    mark.rollStats();
    jacoby.rollStats();
    whytte.rollStats();
    lemon.rollStats();
    mark.showHP();
    jacoby.showHP();
    whytte.showHP();
    lemon.showHP();

    fighterChosen = false;
    defenderChosen = false;
    player = {};
    defender = {};
    enemies = 3;
    console.log("enemies: "+enemies);
    
    $(".token")
        .attr({ "data-status": "neutral"})
        .removeClass("d-none")
        .removeClass("col-md-5 col-md-12")
        .addClass("col-md-3")
        .appendTo($("#character-selection"));
}

//Select Fighter
function selectFighter(character) {
    fighterChosen = true; //fighter has been chosen
    var character = $(character); //store the chosen character as player
    character.attr({ "data-status": "player" }); //set the data-status to player
    character.removeClass("col-md-3").addClass("col-md-12");
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
    console.log($("[data-status='neutral']"));
    $("[data-status='neutral']").appendTo($("#enemies"));//move non-player tokens to defenders
}

//Select Defender
function selectDefender(character) {
    defenderChosen = true;
    var character = $(character);
    character.attr({ "data-status": "defender" });
    character.removeClass("col-md-3").addClass("col-md-12")
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
    console.log("fighter: "+fighterChosen);
    console.log("defender: "+defenderChosen);
    //if no fighter has been chosen
    if (!fighterChosen) {
        selectFighter(this);
    }
    //if fighter has been chosen
    else {
        if(!defenderChosen){
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
                    gameOver("You knocked each other out!")
                }
                else{
                gameOver("You lost.");
                }
            }
            if(enemies < 1){
                gameOver("You won!");
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