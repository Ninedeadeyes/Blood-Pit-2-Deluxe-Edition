let herbPower=200;
let root="images/";
let monster;
let hero = getHero();
let strong=false;
let powerful=false;
let crit=false;
let focusPoint=false;
//text boes 
let text=document.getElementById("text");
let foe=document.getElementById("foe-info");
let stats=document.getElementById("stats");
//image
let image=document.getElementById("foe-image");
image.src=root+"demon7.png";

let heroImage=document.getElementById("hero-image");
heroImage.src=root+"hero.png";

//buttons

let buyHerbButton=document.getElementById("buyHerb")
let buyArmourButton=document.getElementById("buyArmour")
let buySwordButton=document.getElementById("buySword")
let buyDaggerButton=document.getElementById("buyDagger")

let fightButton=document.getElementById("fight");
let herbButton=document.getElementById("herb");
let defendButton=document.getElementById("defend");
let runButton=document.getElementById("run");
let deathGripButton=document.getElementById("deathGrip");
let focusButton=document.getElementById("focus");
let okButton=document.getElementById("ok");
let ripButton=document.getElementById("gameOver");

const bkMusic = document.getElementById("backgroundMusic");
const endMusic = document.getElementById("ending");
const rip= document.getElementById("rip");

rip.volume = 0.4;
rip.controls = false;
endMusic.controls = false;

let shopIsClosed=document.getElementById("closed");

let ripIsOverLayed=document.getElementById("ripOverLay")

const audioAttack= new Audio();
audioAttack.src="sounds/attack.mp3";
audioAttack.volume = 0.5;

const audioDefend= new Audio();
audioDefend.src="sounds/defend.wav";
audioDefend.volume = 0.5;

const audioBuy= new Audio();
audioBuy.src="sounds/coin.wav";
audioBuy.volume = 0.5;

const audioFocus= new Audio();
audioFocus.src="sounds/focus.mp3";
audioFocus.volume = 0.4;

const audioRage= new Audio();
audioRage.src="sounds/rage.mp3";
audioRage.volume = 0.5;

const audioHeal=new Audio();
audioHeal.src="sounds/heal.wav";
audioHeal.volume = 0.5;

const audioQuit= new Audio();
audioQuit.src="sounds/quit.wav";
audioQuit.volume = 0.5;

const audioLevelUp= new Audio();
audioLevelUp.src="sounds/levelUp.mp3";
audioLevelUp.volume = 0.5;



buyHerbButton.onclick=BuyHerbfunc;
buyArmourButton.onclick=BuyArmourfunc;
buySwordButton.onclick=BuySwordfunc;
buyDaggerButton.onclick=BuyDaggerfunc;

focusButton.onclick=focus;
deathGripButton.onclick=deathGripAttack;
fightButton.onclick=fight;
herbButton.onclick=herb;
defendButton.onclick =defend;
runButton.onclick=run;
okButton.onclick= startGame;
ripButton.onclick=clearRip;

let info ="<h3>Welcome to the Blood Pit </h3>";          // connects to css code 
info +="<p>Falsely accused of heinous crimes.";                 // <p> =html code 
info +=" You demand a trial by combat.</p> ";
info +=" <p> You are thrown into the Blood Pit along with 100 demons." 
info +=" Defeat the 100 demons and win your freedom. </p> ";
info +="<p> Click ready to begin the slaughter.</p>";
text.innerHTML =info;

const showOk=(show)=> show===true ? okButton.style.display="block" : okButton.style.display="none";  //css code 
showOk(true);


const showRip=(show)=> show===true ? ripButton.style.display="block" : ripButton.style.display="none";  //css code 
showRip(false);

const showBuyHerb=(show)=>show===true?buyHerbButton.style.display="block" : buyHerbButton.style.display="none"; 

const showBuyArmour=(show)=>show===true?buyArmourButton.style.display="block" : buyArmourButton.style.display="none"; 

const showBuySword=(show)=>show===true?buySwordButton.style.display="block" : buySwordButton.style.display="none"; 

const showBuyDagger=(show)=>show===true?buyDaggerButton.style.display="block" : buyDaggerButton.style.display="none"; 

const showClosed=(show)=> show===true ? shopIsClosed.style.display="block" : shopIsClosed.style.display="none";  //css code 
showClosed(true);

const showRipIsOverLayed=(show)=> show===true ? ripIsOverLayed.style.display="block" : ripIsOverLayed.style.display="none";  //css code 
showRipIsOverLayed(false);




let armourPaid=false
let daggerPaid=false
let swordPaid=false

class Enemy {
    constructor(name,src,hpMax,gold,xp,attack,defense){
        this.name=name;
        this.src=src;
        this.hpMax=hpMax;
        this.gold=gold;
        this.xp=xp;
        this.attack=attack;
        this.defense=defense;
    }
}

function getHero(){
    let hero={
        name:"Nine Dead Eyes",
        hp:100,
        hpMax:100,
        attack:12,
        defense:10,
        defending:false,
        herbs:3,
        xp:0,
        accXp:0,
        level:1,
        gold:0,
        rage:0,
        enemies:0,
        leftHandWeapon:"Glass Shank",
        rightHandWeapon:"Crude Blade",
        armour:"Leather"

    };

    return hero;
}

function BuyDaggerfunc() {

    if (hero.gold >= 400) {
        audioBuy.play();
        hero.gold -= 400; // Deduct cost
        hero.attack +=10; // Increase defense
        daggerPaid=true
        showBuyDagger(false)
        text.innerHTML = "You have gained a Fine Dagger +10 attack ";
        hero.leftHandWeapon="Fine Dagger"
        
    } else {
        text.innerHTML = "Not enough gold to buy a Fine Dagger +10 attack ";
    }
    showStats();
}

function BuySwordfunc() {

    if (hero.gold >= 800) {
        audioBuy.play();
        hero.gold -= 800; // Deduct cost
        hero.attack +=20; // Increase defense
        swordPaid=true
        showBuySword(false)
        text.innerHTML = "You have gained a Long Sword +20 attack";
        hero.rightHandWeapon="Long Sword"
        
    } else {
        text.innerHTML = "Not enough gold to buy a Long Sword +20 attack";
    }
    showStats();
}


function BuyArmourfunc() {

    console.log("Buy Armour button clicked!");
    if (hero.gold >= 1200) {
        audioBuy.play();
        hero.gold -= 1200; // Deduct cost
        hero.defense +=30; // Increase defense
        heroImage.src = root + "hero2.png"; // Update image
        armourPaid=true
        showBuyArmour(false)
        text.innerHTML = "You have gained Plate Mail Armour +30 def ";
        hero.armour="Plate Mail"
        
    } else {
        text.innerHTML = "Not enough gold to buy Plate Mail Armour +30 def";
    }
    showStats();
}

function BuyHerbfunc(){

    console.log("BuyHerb button clicked!");

    if (hero.gold>=250){
          audioBuy.play();
          hero.gold-=250
          hero.herbs+=1
        }

    else {
        text.innerHTML = "Not enough gold to buy herbs!";
    }

    showStats()

}

function stopAudio(sound){
    sound.pause();
    sound.currentTime = 0
  }

function endGame(){   
    showOk(true);
}   

function clearRip(){
    showRip(false);
    showRipIsOverLayed(false)
}
   
function startGame(){
    heroImage.src=root+"hero.png";  
    showOk(false);
    stopAudio(rip);
    bkMusic.play();
    okButton.onclick=nextMonster;
    okButton.innerHTML="Ready";
    text.innerHTML="";
    hero=getHero();
    monster= getMonster();
    showStats();
}    

if (hero.herbs===0)
    {
        text.innerHTML= "You do not have any herbs";
    }

function showStats(){

    if (hero.hp < 40) {
        stats.innerHTML = "<span style='color:red'>HP: " + hero.hp + "/" + hero.hpMax + "</span>";
    } else {
        stats.innerHTML = "HP: " + hero.hp + "/" + hero.hpMax;
    }

    stats.innerHTML+="<br><span style='color:green'>Herbs: "+hero.herbs+"</span>";
    
    if (hero.rage>=5){
        stats.innerHTML+="<br><span style='color:red'>Rage: "+hero.rage+"</span>";
    }
    else{
     stats.innerHTML+="<br>Rage: "+hero.rage;

    }

    stats.innerHTML+="<br>LH Weapon: "+hero.leftHandWeapon;
    stats.innerHTML+="<br>RH Weapon: "+hero.rightHandWeapon;
    stats.innerHTML+="<br>Armour: "+hero.armour+"</br>";

    stats.innerHTML+="<br>Attack: "+hero.attack;
    stats.innerHTML+="<br>Defense: "+hero.defense;
    stats.innerHTML+="<br>XP: "+hero.accXp;
    stats.innerHTML+="<br>Gold: "+hero.gold;
    stats.innerHTML+="<br>Level: "+hero.level;
    stats.innerHTML+="<br>Defeated: "+hero.enemies;

    foe.innerHTML=monster.name;
    foe.innerHTML+="<br>HP: "+monster.hp+"/"+monster.hpMax;
    foe.innerHTML+="<br>Attack: "+monster.attack;

    if (monster.defense>100){

       foe.innerHTML+="<br><span style='color:red'> Defense: "+monster.defense+"</span>";

    }

    else{


        foe.innerHTML+="<br> Defense: "+monster.defense;


    }
}

//constructor(name,src,hpMax,gold,xp,attack,defense)

   function getMonster(){
    let mon={};
    let pick = Math.floor(Math.random()*(hero.level+1));

    if (hero.level<=5){

        pick===0 ?  mon= new Enemy ("Fire Imp","demon1.png",40,10,4,7,3):
        pick===1 ?   mon= new Enemy ("Spawn of Cthulhu","demon2.png",60,20,6,10,10):
        pick===2 ?  mon= new Enemy ("Death Knight","demon0.png",70,30,12,12,25):
        pick===3 ?  mon= new Enemy ("Rag Man ","demon4.png",80,40,14,20,5):
        pick===4 ? mon= new Enemy ("Possessed","possessed.png",120,45,16,18,15):
        mon= new Enemy ("Damaged Chaos Engine","relic.png",150,50,18,5,150);
    }

    else if (hero.level>6 && hero.level<=10){
        pick===0 || pick===1 ? mon= new Enemy ("Doom Paladin","doom.png",100,40,15,25,30):
        pick===2 || pick===3 ? mon= new Enemy ("Damaged Chaos Engine","relic.png",150,50,18,5,150):
        pick===4 || pick===5 ? mon= new Enemy ("Possessed","possessed.png",120,52,16,18,15):
        pick===6 || pick===7 ? mon= new Enemy ("Cyber Warrior","hunter.png",150,55,18,30,30):  
        pick===8 || pick===9 ? mon= new Enemy ("Chaos Engine","demon3.png",170,58,20,25,150):
        pick===9 || pick===10 ? mon= new Enemy ("Soul Eater","demon7.png",150,60,25,35,50):
        mon= new Enemy ("Harbinger Of Doom","demon8.png",180,80,35,25,120);
         }

    else

    {
        pick===0 || pick===1 ? mon= new Enemy ("Soul Eater","demon7.png",170,60,25,40,50):
        pick===2 || pick===3 || pick===4  ? mon= new Enemy ("Blood Gazer","demon5.png",120,70,30,50,60):    
        pick===5 || pick===6 || pick===7  ? mon= new Enemy ("Harbinger of Doom","demon8.png",180,80,35,25,120):
        pick===8 || pick===9 || pick===10  ? mon= new Enemy ("Butcher of Tristram","demon6.png",350,100,45,70,200):
        mon= new Enemy ("Chaos War Machine","demon9.png",400,120,50,75,270);
    }

    image.src=root+mon.src;
    mon.hp=mon.hpMax;
    text.innerHTML+="<h3> A " +mon.name+" enter the blood pit. </h3>";
    return mon;
}

function nextMonster(){
    showOk(false);
    showClosed(true)
    buyHerbButton
    okButton.innerHTML="OK";
    text.innerHTML="";
    monster=getMonster();
    showStats();

}

function fight(){
    audioAttack.currentTime = 0;   // sounds resets everytime you click it as sound is too long. 
    // Play the audio
    audioAttack.play().catch((error) => {
        console.error("Failed to play attack sound:", error);
    });
    text.innerHTML="";
    doBattle(hero,monster);
    checkMonster();
    
    showStats();
}

function deathGripAttack(){
    text.innerHTML="";
    hardBattle(hero,monster);
    checkMonster();
    showStats();
}

function herb(){
    if (hero.herbs===0)
    {
        text.innerHTML= "You do not have any herbs";
    }

    else
    {   audioHeal.play();
        text.innerHTML="You used a herb.";
        hero.herbs--;
        hero.hp+=herbPower;
        hero.hp=Math.min(hero.hp,hero.hpMax)
    }

    monsterTurn();
}

function focus(){
    audioFocus.currentTime = 0;    
    audioFocus.play();
    focusPoint=true;
    text.innerHTML="You pause for a moment to focus. Your next attack will ignore your opponent's defense. ";
    monsterTurn();
}

function monsterTurn(){
    enemyBattle(monster,hero);
    checkHero();
    showStats();
}

function doBattle(attacker,defender){
    audioAttack.play()
    text.innerHTML+="<p>"+attacker.name+" attacks.</p>";
    let attack=attacker.attack;
    let dice=Math.floor(Math.random()*12)+1;
    attack=attack+dice;
    let damage ;

    if (focusPoint===true){
        damage=Math.floor(attack)
        text.innerHTML+="<p> Your attack penetrates through the demon's defense. </p>";
        focusPoint=false;
    }

    else{
        let defense=defender.defense;
        let random2=Math.floor(Math.random()*10)  // only 20% chance of a bonus or penalty  (10% each) add variety to stats  
        random2===0? defense+=3:
        random2===1 && (defense-=3);

        damage=Math.floor(attack-(defense/2));
    }
    
    if (damage>0){
        text.innerHTML+=attacker.name+" deals ";
        text.innerHTML+=damage+" point";
        
        if (damage>1){
            text.innerHTML +="s";
        }

        text.innerHTML+=" of damage against ";
        text.innerHTML+=defender.name+".";
        defender.hp-=damage;
        defender.hp=Math.max(defender.hp,0);
    }

    else{
        text.innerHTML+=attacker.name+" misses!";
    }

    attacker.rage+=1
    attacker.rage>10&& (attacker.rage=10);
}

function enemyBattle(attacker,defender){
    text.innerHTML+="<p>"+attacker.name+" attacks.</p>";
    let attack=attacker.attack;
    let dice=Math.floor(Math.random()*12)+1;
    attack=attack+dice;
    let defense=defender.defense;
    let random2=Math.floor(Math.random()*10)

    random2===0? defense+=3:
    random2===1 && (defense-=3);   

    if (defender.defending){
            text.innerHTML +="<p>"+defender.name+" is defending.</p>";
            defense*=5;
            defender.defending=false; 
        }
    
    let damage=Math.floor(attack-(defense/2));

    if (strong===true){
        damage=damage+5
        text.innerHTML+="<p> The demon performs a strong attack. </p>";
    }

    else if (powerful===true){
        damage=damage*2+5   
        text.innerHTML+="<p> The demon performs a powerful attack. </p>";
    }

    else if (crit===true){
        damage=damage*3+10   
        text.innerHTML+="<p> The demon performs a critical hit. </p>";
    }
    
    if (damage>0){
        text.innerHTML+=attacker.name+" scores ";
        text.innerHTML+=damage+" point";
        
        if (damage>1){
            text.innerHTML +="s";
        }

        text.innerHTML+=" of damage against ";
        text.innerHTML+=defender.name+".";
        defender.hp-=damage;
        defender.hp=Math.max(defender.hp,0);
    }

    else{
        text.innerHTML+=attacker.name+" misses!";
    }

    strong=false;
    powerful=false;
    crit=false;
    let chance=Math.floor(Math.random()*10)+1;

    if (chance===1){
        strong=true;
        text.innerHTML+="<p>The next attack from your opponent will be a strong attack. </p>";
    }
    
    else if (chance===2){
        powerful=true;
        text.innerHTML+="<p>The next attack from your opponent  will be a <span style='color: red;'>powerful</span> attack. </p>";
    }

    else if (chance===3){
        crit=true;
        text.innerHTML += "<p>The next attack from your opponent will be a <span style='color: red;'>critical</span> hit.</p>";
    }
    
    else{
        text.innerHTML+="<p>The next attack from your opponent will be a weak attack </p>";
    }
}

function hardBattle(attacker,defender){
    if (attacker.rage>=5){
        audioRage.play();
        text.innerHTML+="<p>"+attacker.name+" execute the ancient secret technique of the Shadow Hunter 'DEATH GRIP'. </p>";
        let attack=attacker.attack;
        let dice=Math.floor(Math.random()*10)+10;           
        attack=(attack*2)+dice;        
        let damage ;

        if (focusPoint===true){
                damage=Math.floor(attack)
                text.innerHTML+="<p> The crushing attack penetrates through the demon's defense. </p>";
                focusPoint=false;
            }
        
        else{       
                let defense=defender.defense;
            
                let random2=Math.floor(Math.random()*10)
                
                if (random2===0){
                          defense+=3;
                    }
            
                else if (random2===1){
                        defense-=3;
                    }
        
                damage=Math.floor(attack-(defense/2));
            }
        
            if (damage>0){
                text.innerHTML+=attacker.name+" scores ";
                text.innerHTML+=damage+" point";
                
                if (damage>1){
                    text.innerHTML +="s";
                }
        
                text.innerHTML+=" of damage against ";
                text.innerHTML+=defender.name+".";
                defender.hp-=damage;
                defender.hp=Math.max(defender.hp,0);        
            }
        
            else{
                text.innerHTML+=attacker.name+" misses!";
            }
        
            attacker.rage-=5
      
            if (attacker.rage>10){
                    attacker.rage=10        
                }   
    }

    else{
        text.innerHTML+=" You do not have enough Rage (requires 5 Rage points), prepare for pain. ";
    }
}

function checkMonster(){
    if (monster.hp===0){
        text.innerHTML+="<p>"+monster.name+" has been defeated.</p>";
        hero.enemies+=1
        awardPrizes();
    }

    else{
        monsterTurn();
    }
}

function awardPrizes(){
    text.innerHTML+="<br>"+monster.xp+" XP earned<br>";
    text.innerHTML+=monster.gold+" gold found<br>";
    text.innerHTML+="<p>You defeated "+hero.enemies+" enemies </p>";
    powerful=false;     // resets when enemy dies so the next enemy won't do power attack 
    crit=false;
    focusPoint=false;
    hero.xp+=monster.xp;
    hero.accXp+=monster.xp;
    hero.gold+= monster.gold;
    checkLevelUp();
    
    if (Math.random()<0.10){                                // 10% chance of getting herb
        text.innerHtml+= "Herb found!";
        hero.herbs++;
    }
    text.innerHTML+= "Get ready for your next battle.";
    showStats();
    showOk(true);
    showClosed(false)
    showBuyHerb(true);  

    if (armourPaid==false){
    showBuyArmour(true);   
    }

    if (swordPaid==false){
        showBuySword(true);   
        }

    if (daggerPaid==false){
        showBuyDagger(true);   
        }

    if (hero.enemies===100){
     youWin();
    }
}

function checkHero(){
    if (hero.hp===0){
        text.innerHTML+="<br>"+hero.name;
        text.innerHTML+=" has been slain.";
        gameOver();
    }
}

function gameOver(){
    showRip(true);
    showRipIsOverLayed(true)
    heroImage.src=root+"rip.png";
    stopAudio(bkMusic);
    rip.play();
    showOk(true);
    showBuySword(true);
    showBuyArmour(true);
    showBuyDagger(true);
    okButton.onclick=startGame;
    text.innerHTML="<h3> You defeated "+hero.enemies+" enemies. <h3>";
    text.innerHTML+="<h3>Can you do better ?</h3>";
    text.innerHTML+="<h3> Click OK to play again.</h3>";
}

function youWin(){
    showClosed(true)
    showOk(true);
    okButton.onclick=endGame;
    stopAudio(bkMusic);
    bkMusic.controls = false;
    endMusic.play();
    heroImage.src = root + "win.png"; // Update image
    text.innerHTML="<p>You defeated "+hero.enemies+" demons.  </p>";
    text.innerHTML+="<p> As you tore the 100th demon asunder, the crowd cheers your supremacy of the pit. You collect your "+hero.gold+ " gold gained from the slaughter. </p>";
    text.innerHTML+="<p> You walk towards your freedom with bloody hands and a violent grin.</p>";
    text.innerHTML+="<p>The Gods favour your might !!!!!! </p> ";
    text.innerHTML+="<p> Congratulations (Refresh page to play again) </p> ";
    okButton.innerHTML="                                 You Win"                                        ;
}
function run(){
    audioQuit.play();
    if (Math.random()<0.34){   // 1/3 chance to escape  if Math.random()*monster.maxHP<hero.maxHP*0.5)
        text.innerHTML=" You raise your white flag and the crowd approves.";
        okButton.onclick= nextMonster;
        showOk(true);
    }
    
    else{
    text.innerHTML=" You raise your white flag but the crowd wants more blood. .";
    monsterTurn();    
    }
}

function defend(){
    audioDefend.play();
    text.innerHTML=hero.name+" defends";
    hero.defending=true;
    monsterTurn();
}

function checkLevelUp(){
    if (hero.xp>15*hero.level){
        audioLevelUp.play();
        text.innerHTML+="<h3> you have leveled up! </h3>";
        text.innerHTML+="<h3> You grow stronger with each victory. </h3>";
        let attack =Math.floor(Math.random()*6)+2;
        let defense=Math.floor(Math.random()*6)+2;
        text.innerHTML += "Attack increased by "+attack+". <br>";
        text.innerHTML += "Defense increased by "+defense+". <br>";
        hero.hpMax+=20;
        hero.hp=hero.hpMax;
        hero.attack+=attack;
        hero.defense+=defense;
        hero.level++;
        hero.xp=0;
        
        okButton.innerHTML="LEVEL UP!";
    }
}

