window.addEventListener("load", sidenVises);

// Opretter global variables
let point;
let liv;
let myRand;
let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

// Opretter global konstanter
const godContainer = document.querySelector("#god_genstand_container");
const godContainer2 = document.querySelector("#god_genstand_container2");
const godContainer3 = document.querySelector("#god_genstand_container3");

const badContainer = document.querySelector("#bad_genstand_container");
const badContainer2 = document.querySelector("#bad_genstand_container2");
const badContainer3 = document.querySelector("#bad_genstand_container3");

// Opretter burger menu
menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("open");
};

// Spil
function sidenVises() {
  console.log("sidenVises");
  //Skjul andre skærme
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#exit3").classList.add("hide");

  //Vis start skærm
  document.querySelector("#start").classList.remove("hide");

  document.querySelector("#info_knap").addEventListener("click", on);

  //Klik på start_knap
  document.querySelector("#start_knap").addEventListener("click", startGame);
}

function on() {
  document.querySelector("#info_img").style.display = "block";
  document.querySelector("#exit3").classList.remove("hide");
  document.querySelector("#exit3").addEventListener("click", off);
}

function off() {
  document.querySelector("#info_img").style.display = "none";
  document.querySelector("#exit3").classList.add("hide");
}

// Opretter start game
function startGame() {
  console.log("startGame");
  document.querySelector("#sound_bag").volume = 0.3;
  document.querySelector("#sound_bag").play();

  //Skjul andre skærme
  document.querySelector("#start").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");

  //Nulstil point og udskriv
  point = 0;
  document.querySelector("#point").innerHTML = point;

  //reset liv til 3
  liv = 3;
  document.querySelector("#liv").innerHTML = liv;

  //Start timer
  document.querySelector("#indhold").classList.add("timer");
  document.querySelector("#indhold").addEventListener("animationend", stopSpillet);

  //Giv en random position, random delay til container og speed, start shrink-turn-animationer
  godContainer.classList.add("pos" + newRandNum(9), "delay" + newRandNum(4), "fald");
  godContainer2.classList.add("pos" + newRandNum(9), "delay" + newRandNum(4), "fald");
  godContainer3.classList.add("pos" + newRandNum(9), "delay" + newRandNum(4), "fald");

  //Lyt efter shrink-turn-animationer er kørt en gang
  godContainer.addEventListener("animationiteration", godReset);
  godContainer2.addEventListener("animationiteration", godReset);
  godContainer3.addEventListener("animationiteration", godReset);

  //Lyt efter klik
  godContainer.addEventListener("mousedown", clickGoodHandler);
  godContainer2.addEventListener("mousedown", clickGoodHandler);
  godContainer3.addEventListener("mousedown", clickGoodHandler);

  //Giv en random position, random delay til container og speed, start explode-animationer
  badContainer.classList.add("pos" + newRandNum(9), "delay" + newRandNum(4), "fald");
  badContainer2.classList.add("pos" + newRandNum(9), "delay" + newRandNum(4), "fald");
  badContainer3.classList.add("pos" + newRandNum(9), "delay" + newRandNum(4), "fald");

  //Lyt efter explode-animationer er er kørt en gang
  badContainer.addEventListener("animationiteration", badReset);
  badContainer2.addEventListener("animationiteration", badReset);
  badContainer3.addEventListener("animationiteration", badReset);

  //Lyt efter klik
  badContainer.addEventListener("mousedown", clickBadHandler);
  badContainer2.addEventListener("mousedown", clickBadHandler);
  badContainer3.addEventListener("mousedown", clickBadHandler);
}

function clickGoodHandler() {
  console.log(this);
  console.log("clickGoodHandler");
  //ryd op, så man ikke kan kilkke på den samme flere gange
  this.removeEventListener("mousedown", clickGoodHandler);

  // TODO: Spil lyd til aries-perle
  document.querySelector("#sound_aries").volume = 0.8;
  document.querySelector("#sound_aries").currentTime = 0;
  document.querySelector("#sound_aries").play();

  //frys (pause), fald-animationen
  this.classList.add("frys");

  //Tæl en op på points og udskriv
  point++;
  console.log(point);
  document.querySelector("#point").textContent = point;

  //Start shrink-and-turn-animationer på sprite element (firstElementChild er sprite elementet)
  this.firstElementChild.classList.add("shrink-and-turn");

  //Lyt efter forsvind-animationer er færdig
  this.addEventListener("animationend", godReset);
}

function godReset() {
  console.log(this);
  console.log("godReset");
  //ryd op, fjern alt der er på container og sprite
  this.classList = "";
  this.firstElementChild.classList = "";

  //For at kunne genstarte fald animationen, da vi fjener og tilføjer den i samme function
  this.offsetLeft;

  //Giv en random position til container, delay og fald-animationer på element
  this.classList.add("pos" + newRandNum(9), "delay" + newRandNum(4), "fald");

  //Lyt efter klik på element
  this.addEventListener("mousedown", clickGoodHandler);
}

function clickBadHandler() {
  console.log(this);
  console.log("clickBadHandler");
  //ryd op, så man ikke kan kilkke på den samme flere gange
  this.removeEventListener("mousedown", clickBadHandler);

  // TODO: Spil lyd til skellet-perle
  document.querySelector("#sound_skellet").volume = 0.8;
  document.querySelector("#sound_skellet").currentTime = 0;
  document.querySelector("#sound_skellet").play();

  //frys (pause), fald-animationen
  this.classList.add("frys");

  //Start forsvind-animationer på sprite element (firstElementChild er sprite elementet)
  this.firstElementChild.classList.add("explode");

  //Lyt efter forsvind-animationer er færdig
  this.addEventListener("animationend", badReset);

  //Tæl en ned på liv og udskriv
  liv--;
  document.querySelector("#liv").textContent = liv;
  if (liv <= 0) {
    console.log("ikke flere liv");
    stopSpillet();
  }
}

function badReset() {
  console.log(this);
  console.log("badReset");

  //ryd op, fjern alt er på container og sprite
  this.classList = "";
  this.firstElementChild.classList = "";

  //For at kunne genstarte op_ned animationen, da vi fjener og tilføjer den i samme function
  this.offsetLeft;

  //Giv en random position til container, delay og fald-animationer på element
  this.classList.add("pos" + newRandNum(9), "delay" + newRandNum(4), "fald");

  //Lyt efter klik på element
  this.addEventListener("mousedown", clickBadHandler);
}

function stopSpillet() {
  console.log("stopSpillet");

  // Stop the timer
  document.querySelector("#indhold").classList.remove("timer");
  document.querySelector("#indhold").removeEventListener("animationend", stopSpillet);

  //godContainer
  godContainer.classList = "";
  godContainer.firstElementChild.classList = "";
  godContainer2.classList = "";
  godContainer2.firstElementChild.classList = "";
  godContainer3.classList = "";
  godContainer3.firstElementChild.classList = "";

  godContainer.removeEventListener("animationiteration", godReset);
  godContainer.removeEventListener("animationend", godReset);
  godContainer.removeEventListener("mousedown", clickGoodHandler);

  godContainer2.removeEventListener("animationiteration", godReset);
  godContainer2.removeEventListener("animationend", godReset);
  godContainer2.removeEventListener("mousedown", clickGoodHandler);

  godContainer3.removeEventListener("animationiteration", godReset);
  godContainer3.removeEventListener("animationend", godReset);
  godContainer3.removeEventListener("mousedown", clickGoodHandler);

  //badContainer
  badContainer.classList = "";
  badContainer.firstElementChild.classList = "";
  badContainer2.classList = "";
  badContainer2.firstElementChild.classList = "";
  badContainer3.classList = "";
  badContainer3.firstElementChild.classList = "";

  badContainer.removeEventListener("animationiteration", badReset);
  badContainer.removeEventListener("animationend", badReset);
  badContainer.removeEventListener("mousedown", clickBadHandler);

  badContainer2.removeEventListener("animationiteration", badReset);
  badContainer2.removeEventListener("animationend", badReset);
  badContainer2.removeEventListener("mousedown", clickBadHandler);

  badContainer3.removeEventListener("animationiteration", badReset);
  badContainer3.removeEventListener("animationend", badReset);
  badContainer3.removeEventListener("mousedown", clickBadHandler);

  if (liv <= 0) {
    gameover();
  } else if (point >= 7) {
    levelComplete();
  } else {
    gameover();
  }
}

function gameover() {
  console.log("GAMEOVER");

  document.querySelector("#sound_bag").pause();
  document.querySelector("#sound_taber").volume = 0.3;
  document.querySelector("#sound_taber").play();

  //Vis gameover skærm
  document.querySelector("#game_over").classList.remove("hide");

  //Klik på genstart1
  document.querySelector("#genstart1").classList.remove("hide");
  document.querySelector("#genstart1").addEventListener("click", startGame);

  //Klik på exit1
  document.querySelector("#exit1").classList.remove("hide");
  document.querySelector("#exit1").addEventListener("click", sidenVises);
}

function levelComplete() {
  console.log("Hurra du vandt");

  document.querySelector("#sound_bag").pause();
  document.querySelector("#sound_vinder").volume = 1;
  document.querySelector("#sound_vinder").play();
  //Vis levelComplete skærm
  document.querySelector("#level_complete").classList.remove("hide");

  //Klik på genstart2
  document.querySelector("#genstart2").classList.remove("hide");
  document.querySelector("#genstart2").addEventListener("click", startGame);

  //Klik på exit2
  document.querySelector("#exit2").classList.remove("hide");
  document.querySelector("#exit2").addEventListener("click", sidenVises);
}

function newRandNum(max) {
  return Math.floor(Math.random() * max) + 1;
}
