// ===========================
// ELEMENTS
let popped = 0;
let bunnyIndex = 0;
let bowsCaught=0;
let currentLevel = "";
let selectedOutfit = "green";
let blowAttempts = 0;
let confettiWipeActive = false;
let confettiCanvas = null;
let confettiCtx = null;
let confettiMaskCanvas = null;
let confettiMaskCtx = null;
let confettiPieces = [];
let confettiPointer = { x: 0, y: 0 };

let confettiWipeCells = new Set();
let confettiGridSize = 40;
let confettiWipeProgress = 0;
let confettiWipeRadius = 40;

// ===========================

const startButton = document.getElementById("startButton");

const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const tinyNiki = document.getElementById("tinyNiki");
const dialogueBox = document.getElementById("dialogueBox");

const balloonGame = document.getElementById("balloonGame");
const balloonArea = document.getElementById("balloonArea");
const bunnyGame = document.getElementById("bunnyGame");
const bunnyTitle = document.getElementById("bunnyTitle");
const bunnyArea = document.getElementById("bunnyArea");
const hairGame = document.getElementById("hairGame");
const hairArea = document.getElementById("hairArea");
const hairCounter = document.getElementById("hairCounter");
const hairComment = document.getElementById("hairComment");
const dressTransition = document.getElementById("dressTransition");
const dressLevelBtn = document.getElementById("dressLevelBtn");
const dressGame = document.getElementById("dressGame");
const mainCard = document.getElementById("mainCard");
const flash=document.getElementById("cameraFlash");
const celebrationPhoto=document.getElementById("celebrationPhoto");
const wishPopup = document.getElementById("wishPopup");
const wishDoneBtn = document.getElementById("wishDoneBtn");
const letterScene = document.getElementById("letterScene");
const envelope = document.getElementById("envelope");
const letterCard = document.getElementById("letterCard");
const letterText = document.getElementById("letterText");
const partyImage = document.getElementById("partyImage");
const customCursor = document.getElementById("customCursor");

// Direct cursor follower: the pixel cursor stays exactly under the real pointer.
window.addEventListener('mousemove', (e) => {
    if (customCursor) {
       customCursor.style.transform =
    `translate3d(${e.clientX - 2}px, ${e.clientY - 2}px, 0)`;
    }
});

// ===========================
// START GAME
// ===========================

startButton.addEventListener("click", () => {

    title.style.display = "none";
    subtitle.style.display = "none";
    tinyNiki.style.display = "none";
    dialogueBox.style.display = "none";
    startButton.style.display = "none";

    balloonGame.style.display = "block";
    
    

    
    popped = 0;

document.getElementById("balloonCounter").innerHTML =
"Balloons: 0 / 10";
balloonArea.innerHTML = "";   
createBalloons();

});

// ===========================
// CREATE BALLOONS
// ===========================

function createBalloons(){

    for(let i = 0; i < 10; i++){

        const balloon = document.createElement("div");

        balloon.className = "balloon";

        balloon.innerHTML = "🎈";

        const areaWidth = balloonArea.clientWidth - 70;
const areaHeight = balloonArea.clientHeight - 85;

balloon.style.left = Math.random() * areaWidth + "px";
balloon.style.top = Math.random() * areaHeight + "px";

        balloon.addEventListener("click", () => {

    balloon.remove();

    popped++;

    document.getElementById("balloonCounter").innerHTML =
    "Balloons: " + popped + " / 10";

    if(popped === 10){

        setTimeout(() => {
document.getElementById("funnyTitle").innerHTML =
"🎈 Balloon Chaos Complete!";
document.getElementById("funnyBtn").innerHTML =
"Ahem... Reward? 👀";
document.getElementById("rewardItems").innerHTML = `
<div>💚 Green Outfit 👗</div>
<div>💛 Yellow Hair Bow 🎀</div>
<div>🤍 White Plushie 🧸</div>
<div>🎈 Birthday Balloons</div>
`;
            document.getElementById("funnyPopup").style.display = "block";

        },300);

    }

});

balloonArea.appendChild(balloon);

    }

}
const continueBtn = document.getElementById("continueBtn");

continueBtn.addEventListener("click", () => {

    document.getElementById("rewardPopup").style.display = "none";

  // Balloon finished → show Tiny Niki
if (balloonGame.style.display === "block") {

    balloonGame.style.display = "none";

    document.getElementById("nikiTransition").style.flexDirection = "row";

    document.getElementById("nikiTransition").style.display = "flex";
}

// Bunny finished → Hair Game
else if (bunnyGame.style.display === "block") {

    bunnyGame.style.display = "none";

    hairGame.style.display = "block";

    currentLevel = "hair";

    startHairGame();
}

// Hair finished → Dress Up

else if (currentLevel === "hair") {
    
console.log(currentLevel);

    hairGame.style.display = "none";

    dressTransition.style.display = "flex";
}

});

    // Next game yaha start hoga 😊


const funnyBtn = document.getElementById("funnyBtn");

funnyBtn.addEventListener("click", () => {

    document.getElementById("funnyPopup").style.display = "none";

    const loadingTitle = document.getElementById("loadingTitle");
    const loadingText = document.getElementById("loadingText");

    // 🎈 Balloon
    if(balloonGame.style.display === "block"){


        loadingTitle.innerHTML = "🤔 Checking...";

        loadingText.innerHTML =
        "Did you really pop ALL the balloons? 🎈<br><br>Counting survivors... 👀";

        document.getElementById("loadingPopup").style.display = "block";

        setTimeout(() => {

            loadingText.innerHTML =
            "Verdict... 😌<br><br>Yep... absolute balloon menace. 😂";

        },2500);

    }

    // 🐰 Bunny
    else if(bunnyGame.style.display === "block"){
       

        loadingTitle.innerHTML = "🐰 Verifying...";

        loadingText.innerHTML =
        "Making sure BunBun is okay... 👀";

        document.getElementById("loadingPopup").style.display = "block";

        setTimeout(() => {

            loadingText.innerHTML =
            "BunBun says you're trustworthy. 🤭";

        },1500);

    }

    // 🎀 Hair
    else if(hairGame.style.display === "block"){
        
    

        loadingTitle.innerHTML = "🎀 Inspecting...";

        loadingText.innerHTML =
        "Checking your bow-catching skills... 👀";

        document.getElementById("loadingPopup").style.display = "block";

        setTimeout(() => {

            loadingText.innerHTML =
            "Niki approves. 😌";

        },1500);

    }

    setTimeout(() => {

        document.getElementById("loadingPopup").style.display = "none";

        document.getElementById("rewardPopup").style.display = "block";

    },5500);

});


const level2Btn = document.getElementById("level2Btn");

level2Btn.addEventListener("click", () => {
document.getElementById("dressTransition").style.flexDirection = "row-reverse";
    document.getElementById("nikiTransition").style.display = "none";

    // Agar Bunny Game visible hai to Hair Game start karo
    if (bunnyGame.style.display === "block") {

        bunnyGame.style.display = "none";

        hairGame.style.display = "block";
currentLevel = "hair";
        startHairGame();

    }

    // Warna Balloon ke baad Bunny Game start karo
    else {

        balloonGame.style.display = "none";

        bunnyGame.style.display = "block";
        currentLevel = "bunny";
    

        createBushes();

    }

});
  
// ===========================
// BUNNY GAME
// ===========================

function createBushes(){

    bunnyArea.innerHTML = "";
    bunnyIndex = Math.floor(Math.random() * 12);

    for(let i = 0; i < 12; i++){

        const bush = document.createElement("div");

        bush.className = "bush";

        bush.innerHTML = "🌳";

if (window.innerWidth <= 720) {

    const positions = [
        [10, 5], [calc(50), 5], [calc(90), 5],
        [10, 85], [calc(50), 85], [calc(90), 85],
        [10, 165], [calc(50), 165], [calc(90), 165],
        [10, 245], [calc(50), 245], [calc(90), 245]
    ];

    function calc(percent) {
        return (bunnyArea.clientWidth * percent / 100) - 32;
    }

    bush.style.left = positions[i][0] + "px";
    bush.style.top = positions[i][1] + "px";

} else {

    bush.style.left = (i % 4) * 140 + 40 + "px";
    bush.style.top = Math.floor(i / 4) * 120 + 40 + "px";

}

        bush.addEventListener("click", () => {

    if(i === bunnyIndex){

        bush.innerHTML = "🐰✨";

       document.getElementById("funnyText").innerHTML =

"DAAMNN BROOO!! 😭<br><br>" +

"You actually found BunBun?! 🐰<br><br>" +

"I was already designing missing posters. 😂<br><br>" +

"Here's another reward! 🎁";



setTimeout(() => {
document.getElementById("funnyTitle").innerHTML =
"🐰 BunBun Rescued!";
document.getElementById("funnyBtn").innerHTML =
"I deserve it. 😌";
document.getElementById("rewardItems").innerHTML = `
<div>🤍 White Outfit 👗</div>
<div>💚 Green Hair Bow 🎀</div>
<div>💛 Yellow Plushie 🧸</div>
<div>🎂 Birthday Cake</div>
`;
    document.getElementById("funnyPopup").style.display = "block";

},800);

   }else{

    bush.style.opacity = "0.6";
    bush.style.pointerEvents = "none";

    const comments = [

"😭 Nopeee!",

"🙄 Wrong bush.",

"👀 Keep looking.",

"🤭 Nice try!",

"🐰 Not here!",

"😂 Almost... jk.",

"🌳 Just a bush.",

"😭 Try again!",

"👀 Nope!",

"🤨 Keep searching.",

"😤 One more!",

"🥹 You got this!"

];

    document.getElementById("bunnyComment").innerHTML =
        comments[Math.floor(Math.random() * comments.length)];

}

});
        bunnyArea.appendChild(bush);

    }

}
// ===========================
// HAIR GAME
// ===========================

function startHairGame() {

    
bowsCaught = 0;
    hairCounter.innerHTML = "🎀 Collected: 0 / 3";
    hairComment.innerHTML = "🤭 Catch only the bows!";

    hairArea.innerHTML = "";

    const items = ["🎀", "🥦", "🧦", "🍅", "🪨"];

    const goodComments = [
        "🤭 Niceee!",
        "🎀 Got one!",
        "💖 Perfect!",
        "🥹 You're good!",
        "✨ Yayyy!",
        "😭 Keep going!"
    ];

    

    const gameInterval = setInterval(() => {

        const item = document.createElement("div");

        item.innerHTML = items[Math.floor(Math.random() * items.length)];

        item.style.position = "absolute";
        item.style.left = Math.random() * 520 + "px";
        item.style.top = "-40px";
        item.style.fontSize = "45px";
        item.style.cursor = "pointer";

        hairArea.appendChild(item);

        let y = -40;

        const fallInterval = setInterval(() => {

            y += 4;
            item.style.top = y + "px";

            if (y > 430) {

                clearInterval(fallInterval);

                if (item.parentNode) {
                    item.remove();
                }

            }

        }, 20);

        item.addEventListener("click", () => {

            clearInterval(fallInterval);

            if (item.parentNode) {
                item.remove();
            }

            if (item.innerHTML === "🎀") {

                bowsCaught++;

                hairCounter.innerHTML =
                    "🎀 Collected: " + bowsCaught + " / 3";

                hairComment.innerHTML =
                    goodComments[Math.floor(Math.random() * goodComments.length)];

                if (bowsCaught === 3) {

                    clearInterval(gameInterval);

                    setTimeout(() => {

                        document.getElementById("funnyText").innerHTML =

"NAHHHH BROOO!! 😭<br><br>" +

"You caught ALL my hair bows?! 🎀<br><br>" +

"My hair can finally behave now. 😂<br><br>" +

"You earned another reward! 💖";

                            
document.getElementById("funnyTitle").innerHTML =
"🎀 Hair Saved!";
document.getElementById("funnyBtn").innerHTML =
"Don't be shy... 👀";
document.getElementById("rewardItems").innerHTML = `
<div>💛 Yellow Outfit 👗</div>
<div>🤍 White Hair Bow 🎀</div>
<div>💚 Green Plushie 🧸</div>
<div>🕯 Birthday Candles</div>
`;
                        document.getElementById("funnyPopup").style.display = "block";

                    }, 700);

                }

           } else {

    if (item.innerHTML === "🥦") {
        hairComment.innerHTML = "🥦 Broccoli won't hold Niki's hair. 😭";
    }

    else if (item.innerHTML === "🧦") {
        hairComment.innerHTML = "🧦 That's a sock, not a bow. 😂";
    }

    else if (item.innerHTML === "🍅") {
        hairComment.innerHTML = "🍅 Tomato?? Who invited the tomato? 😭";
    }

    else if (item.innerHTML === "🪨") {
        hairComment.innerHTML = "🪨 Even the rock looks confused. 🤨";
    }

}

        });

    }, 800);

}
dressLevelBtn.addEventListener("click", () => {

    dressTransition.style.display = "none";

    dressGame.style.display = "block";
    // ensure the main UI card is hidden so the outfit modal appears cleanly
    if (mainCard) mainCard.style.display = "none";

});
// ===========================
// DRESS GAME
// ===========================

const greenBtn = document.getElementById("greenBtn");
const whiteBtn = document.getElementById("whiteBtn");
const yellowBtn = document.getElementById("yellowBtn");
const dressNiki = document.getElementById("dressNiki");

const dressComment = document.getElementById("dressComment");


greenBtn.addEventListener("click", () => {
    selectedOutfit = "green";
dressNiki.src = "niki_green.png";
dressNiki.style.display = "block";
    dressComment.innerHTML =
    "💚 Ooooo... Green it is!!<br><br>Nature princess vibes. 🌿🤭";
    confirmDressBtn.style.display = "inline-block";

});

whiteBtn.addEventListener("click", () => {
selectedOutfit = "white";
dressNiki.src = "niki_white.png";
dressNiki.style.display = "block";
    dressComment.innerHTML =
    "🤍 Awww... So Good!!<br><br>I kinda love this one. 🥹✨";
    confirmDressBtn.style.display = "inline-block";

});

yellowBtn.addEventListener("click", () => {
selectedOutfit = "yellow";
 dressNiki.src = "niki_yellow.png";
dressNiki.style.display = "block";
    dressComment.innerHTML =
    "💛 Ouuuu!!<br><br>This one's CUTE TOOOO!! 😭💖";
    confirmDressBtn.style.display = "inline-block";

});
const confirmDressBtn = document.getElementById("confirmDressBtn");
confirmDressBtn.addEventListener("click", () => {

    dressGame.style.display = "none";

    mainCard.style.display = "none";

    partyPrep.style.display = "flex";

});
// ===========================
// PARTY PREPARATION
// ===========================

const partyPrep = document.getElementById("partyPrep");

const plushieBtn = document.getElementById("plushieBtn");
const cakeBtn = document.getElementById("cakeBtn");
const balloonBtn = document.getElementById("balloonBtn");
const nikiBtn = document.getElementById("nikiBtn");

const partyComment = document.getElementById("partyComment");
const partyContinueBtn = document.getElementById("partyContinueBtn");

let partyCount = 0;

let plushieDone = false;
let cakeDone = false;
let balloonDone = false;
let nikiDone = false;
plushieBtn.addEventListener("click", () => {

    if(plushieDone) return;

    plushieDone = true;
    partyCount++;
checkPartyComplete();
    partyComment.innerHTML =
    "🧸 Yayyy! Plushie joined the party!";

    plushieBtn.innerHTML = "✅ Plushie";
});

cakeBtn.addEventListener("click", () => {

    if(cakeDone) return;

    cakeDone = true;
    partyCount++;
checkPartyComplete();
    partyComment.innerHTML =
    "🎂 Cake secured!! Time for sugarrr. 😋";

    cakeBtn.innerHTML = "✅ Cake";
});

balloonBtn.addEventListener("click", () => {

    if(balloonDone) return;

    balloonDone = true;
    partyCount++;
    checkPartyComplete();

    partyComment.innerHTML =
    "🎈 Balloons ready!! Party mode ON!";

    balloonBtn.innerHTML = "✅ Balloons";
});

nikiBtn.addEventListener("click", () => {

    if(nikiDone) return;

    nikiDone = true;
    partyCount++;
    checkPartyComplete();

    partyComment.innerHTML =
    "👧 YAY!! Nikii is finally ready!! 🥹💖";

    nikiBtn.innerHTML = "✅ Nikii";
});

function checkPartyComplete(){

    if(partyCount === 4){

        partyComment.innerHTML =
        "🎉 Everything is ready!! LET'S CELEBRATE!!";

        partyContinueBtn.style.display = "inline-block";

    }

}
// ===========================
// CANDLE SCENE
// ===========================

const candleScene = document.getElementById("candleScene");
const blowBtn = document.getElementById("blowBtn");
const cakeEmoji = document.getElementById("cakeEmoji");
const decoratingScene = document.getElementById("decoratingScene");

const celebrationScene = document.getElementById("celebrationScene");
const cakeSceneBtn = document.getElementById("cakeSceneBtn");

function moveBlowButtonAway(event) {
    if (blowBtn.style.display === "none") return;

    const sceneRect = candleScene.getBoundingClientRect();
    const buttonRect = blowBtn.getBoundingClientRect();
    const cursorX = event ? event.clientX : window.innerWidth / 2;
    const cursorY = event ? event.clientY : window.innerHeight / 2;

    const padding = 24;
    const maxLeft = sceneRect.width - buttonRect.width - padding;
    const maxTop = sceneRect.height - buttonRect.height - padding;

    let left = padding + Math.random() * Math.max(0, maxLeft - padding);
    let top = padding + Math.random() * Math.max(0, maxTop - padding);

    if (event) {
        const dx = cursorX - (sceneRect.left + left);
        const dy = cursorY - (sceneRect.top + top);
        const distance = Math.hypot(dx, dy);

        if (distance < 180) {
            left = Math.max(padding, Math.min(maxLeft, left + (dx > 0 ? 90 : -90)));
            top = Math.max(padding, Math.min(maxTop, top + (dy > 0 ? 70 : -70)));
        }
    }

    blowBtn.style.position = "absolute";
    blowBtn.style.left = `${(left / sceneRect.width) * 100}%`;
    blowBtn.style.top = `${(top / sceneRect.height) * 100}%`;
    blowBtn.style.transform = "translate(-50%, -50%)";
    blowBtn.style.transition = "all 0.25s ease";
}

partyContinueBtn.addEventListener("click", () => {

    partyPrep.style.display = "none";

    mainCard.style.display = "none";

    decoratingScene.style.display = "flex";

    setTimeout(() => {

        decoratingScene.style.display = "none";

        celebrationScene.style.display = "flex";
        takePhoto();

    },3000);

});

cakeSceneBtn.addEventListener("click",()=>{

    celebrationScene.style.display = "none";

    // hide the main card/ui and show the candle scene fullscreen
    if (mainCard) mainCard.style.display = "none";
    candleScene.style.display = "flex";

    const bg = document.getElementById("cakeBackground");
    bg.style.backgroundImage = `url(${partyImage.src})`;

});

blowBtn.addEventListener("click", () => {

    blowAttempts++;

    // Allow the button to jump away twice, then stop moving and ask the user to wish.
    if (blowAttempts === 1 || blowAttempts === 2) {
        moveBlowButtonAway();
        return;
    }

    if (blowAttempts >= 3) {
        // Show the wish prompt but keep the button visible and clickable.
        wishPopup.style.display = "block";
        // Ensure the blow button stays above the popup so it remains clickable.
        blowBtn.style.zIndex = "100000";
        // Prevent further random movement by not calling moveBlowButtonAway anymore.
        return;
    }

});

wishDoneBtn.addEventListener("click", () => {

    wishPopup.style.display = "none";
    candleScene.style.display = "none";
    blowAttempts = 0;
    blowBtn.style.display = "inline-block";
    blowBtn.style.position = "static";
    blowBtn.style.left = "auto";
    blowBtn.style.top = "auto";
    blowBtn.style.transform = "none";
    blowBtn.style.zIndex = "";
    cakeEmoji.innerHTML = "🎂";

   ratingScreen.style.display = "flex";

});


function takePhoto() {

    const flash = document.getElementById("cameraFlash");

    const number = document.getElementById("countNumber");

    const title = document.getElementById("smileTitle");

    const ready = document.getElementById("readyText");

    const photo = document.getElementById("celebrationPhoto");

    const comment = document.getElementById("celebrationComment");

    const button = document.getElementById("cakeSceneBtn");

    number.innerText = "3";

    photo.style.display = "none";

    comment.style.display = "none";

    button.style.display = "none";

    setTimeout(() => {

        number.innerText = "2";

    },1000);

    setTimeout(() => {

        number.innerText = "1";

    },2000);

    setTimeout(() => {

        ready.innerHTML="📸 CHEEEEEEEEESEEEEEEE!! 😆💖";

    },2800);

    if(selectedOutfit === "green"){
    partyImage.src = "party_green.png";

}
else if(selectedOutfit === "yellow"){

    partyImage.src = "party_yellow.png";

}
else{

    partyImage.src = "party_white.png";

}
    setTimeout(() => {

        flash.style.opacity="1";

    },3300);

    setTimeout(() => {

        flash.style.opacity="0";

        title.style.display="none";

        ready.style.display="none";

        number.style.display="none";

        photo.style.display="flex";

        comment.style.display="block";

        button.style.display="inline-block";

    },3500);

}
window.testCake = () => {

    mainCard.style.display = "none";
    balloonGame.style.display = "none";
    bunnyGame.style.display = "none";
    hairGame.style.display = "none";
    dressGame.style.display = "none";
    partyPrep.style.display = "none";
    decoratingScene.style.display = "none";
    celebrationScene.style.display = "block";
    takePhoto();
    };

function launchConfetti() {

    if (confettiCanvas) {
        confettiCanvas.remove();
    }

    // Hide the cake scene behind the game
    if (candleScene) {
        candleScene.style.display = "none";
    }

    confettiCanvas = document.createElement("canvas");
    confettiCanvas.id = "confettiCanvas";

    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    confettiCanvas.style.position = "fixed";
    confettiCanvas.style.inset = "0";
    confettiCanvas.style.zIndex = "999997";
    confettiCanvas.style.background = "#fffafd";
    confettiCanvas.style.pointerEvents = "none";

    document.body.appendChild(confettiCanvas);

    confettiCtx = confettiCanvas.getContext("2d");

    confettiPieces = [];
    confettiWipeActive = true;

    const emojis = [
        "🎀",
        "🎈",
        "💖",
        "💛",
        "🤍",
        "✨",
        "🎉",
        "🧸",
        "🌸",
        "💐",
        "⭐",
        "🥳"
    ];

    for (let i = 0; i < 70; i++) {

        confettiPieces.push({

           x: 50 + Math.random() * (window.innerWidth - 100),

           y: 60 + Math.random() * (window.innerHeight - 120),

            size: 45 + Math.random() * 20,

            emoji:
                emojis[
                    Math.floor(Math.random() * emojis.length)
                ],

            speedY: 2 + Math.random() * 3,

            speedX: (Math.random() - 0.5) * 1.5,

            rotation: Math.random() * 360,

            rotationSpeed: (Math.random() - 0.5) * 4,

            wiped: false

        });

    }

    let lastTime = 0;

    function animate(time) {

        if (!confettiWipeActive) return;

        const delta =
            (time - lastTime) / 16.67 || 1;

        lastTime = time;

        confettiCtx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

        confettiPieces.forEach(piece => {

            if (piece.wiped) return;

           piece.rotation +=
    piece.rotationSpeed * delta;

            // When emoji leaves the bottom,
            // send it back to the top.
            if (piece.y > window.innerHeight + 50) {

                piece.y = -50;

                piece.x =
                    Math.random() * window.innerWidth;

            }

            confettiCtx.save();

            confettiCtx.translate(
                piece.x,
                piece.y
            );

            confettiCtx.rotate(
                piece.rotation * Math.PI / 180
            );

            confettiCtx.font =
                `${piece.size}px Arial`;

            confettiCtx.textAlign = "center";

            confettiCtx.textBaseline = "middle";

            confettiCtx.fillText(
                piece.emoji,
                0,
                0
            );

            confettiCtx.restore();

        });

        requestAnimationFrame(animate);

    }

    requestAnimationFrame(animate);


    setTimeout(() => {

        const message =
            document.getElementById("confettiMessage");

        if (message) {

            message.style.display = "flex";

            message.style.opacity = "1";

            message.style.pointerEvents = "none";

        }

    }, 1500);

}
function wipeConfettiAt(x, y) {

    if (
        !confettiWipeActive ||
        !confettiPieces.length
    ) {
        return;
    }

    const wipeRadius = 100;

    let remaining = 0;

    confettiPieces.forEach(piece => {

        if (piece.wiped) {
            return;
        }

        const dx = piece.x - x;

        const dy = piece.y - y;

        const distance =
            Math.sqrt(
                dx * dx + dy * dy
            );

        if (distance < wipeRadius) {

            piece.wiped = true;

        } else {

            remaining++;

        }

    });

    if (
        remaining <
        confettiPieces.length * 0.15
    ) {

        finishConfettiWipe();

    }

}


/* Wipe finished → reveal envelope */
function finishConfettiWipe() {

    if (!confettiWipeActive) {
        return;
    }

    confettiWipeActive = false;

    if (confettiCanvas) {
        confettiCanvas.remove();
        confettiCanvas = null;
    }

    const message =
        document.getElementById("confettiMessage");

    if (message) {

        message.style.display = "none";
        message.style.opacity = "0";
    }

    letterScene.style.display = "flex";

    envelope.style.display = "block";
    envelope.style.opacity = "0";
    envelope.style.pointerEvents = "auto";

    setTimeout(() => {

        envelope.style.transition =
            "opacity .8s ease";

        envelope.style.opacity = "1";

    }, 300);
}


/* Mouse movement wipes confetti */
window.addEventListener("mousemove", event => {

    wipeConfettiAt(
        event.clientX,
        event.clientY
    );

});


window.addEventListener("resize", () => {

    if (confettiCanvas) {

        confettiCanvas.width =
            window.innerWidth;

        confettiCanvas.height =
            window.innerHeight;
    }

});

envelope.addEventListener("click",()=>{

    envelope.style.pointerEvents = "none";

    envelope.style.transition = "all .6s ease";

    envelope.style.transform = "translateY(-40px) scale(.9)";

    envelope.style.opacity = "0";

    setTimeout(()=>{

        envelope.style.display = "none";

        letterCard.style.display = "block";

        letterCard.style.opacity = "0";

        letterCard.style.transform = "translateY(40px)";

        setTimeout(()=>{

            letterCard.style.transition = "all .6s ease";

            letterCard.style.opacity = "1";

            letterCard.style.transform = "translateY(0)";

            typeLetter();

        },50);

    },600);

});
function typeLetter(){

    const message = `
Happy Birthday Vinuu!! 🎂💛

I know we're miles apart, but today I wanted to make something
instead of just saying something.

So...

I made you your own little birthday game. 🥹

Every balloon, every bunny, every outfit, every tiny detail
was made with lots of love. I really hope that while playing it,
you could feel how much thought went into making it for you.

I hope it made you smile. I hope today reminds you how loved
you are and how much you deserve to be happy.

And I also want to thank you for everything you've done for me,
big or small. For the times you've been there for me,
the little things you probably don't realise meant a lot to me,
and all the memories we've made together.

I may not always say it, but I do appreciate those things,
and I'll always be grateful for them. 💛

And even though things between us may not feel quite the same
anymore, I still remember how special everything felt
in the beginning.

Thank you for giving me those moments, for making me feel loved
in ways I won't forget, and for the memories we made together.

I know things change with time, but I'll always be grateful
for the version of us that once felt so effortless and happy. 💛

You work so hard for the life you've always wanted,
and I genuinely hope you get to have it all someday.

I hope all those long days, all the effort, and everything
you're working towards is worth it in the end.

You deserve to enjoy the life you've worked so hard for,
and I really hope you do.

And no matter what happens or where life takes us,
I just want you to always be happy.

Take care of yourself, take care of Mummyjii...
and with me or without me, I hope you keep smiling
and live your life the way you want to.

Have the happiest birthday. 🤍

Love,
Nikii 🤍
`;

    let i = 0;

    letterText.innerHTML = "";

const typing = setInterval(() => {

    letterText.innerHTML += message.charAt(i);

    i++;

    if(i >= message.length){

        clearInterval(typing);

    }

}, 30);

}
 // ===========================
// GAME RATING
// ===========================

const ratingScreen =
    document.getElementById("ratingScreen");

const ratingButtons =
    document.querySelectorAll(".ratingBtn");

const ratingComment =
    document.getElementById("ratingComment");
    const ratingContinueBtn =
    document.getElementById("ratingContinueBtn");

const finalTransition =
    document.getElementById("finalTransition");

const finalBtn =
    document.getElementById("finalBtn");


ratingButtons.forEach(button => {

    button.addEventListener("click", () => {

        const rating =
            Number(button.dataset.rating);

        if(rating === 5){

            ratingComment.innerHTML =
            "FIVEEE?! 😭💖 Okayyy, I'll take that.";

        }

        else if(rating === 4){

            ratingComment.innerHTML =
            "Only 4?! 😭 I worked so hard on this.";

        }

        else if(rating === 3){

            ratingComment.innerHTML =
            "THREE?! 😭 We need to discuss this.";

        }

        else if(rating === 2){

            ratingComment.innerHTML =
            "Two... 💀 I'm pretending I didn't see that.";

        }

        else{

            ratingComment.innerHTML =
            "ONE?! 😭 Delete the game immediately.";

        }

        ratingContinueBtn.style.display = "inline-block";

    });

});

ratingContinueBtn.addEventListener("click", () => {

    ratingScreen.style.display = "none";

    finalTransition.style.display = "flex";

});
// ===========================
// FINAL → LETTER
// ===========================

finalBtn.addEventListener("click", () => {

    finalTransition.style.display = "none";

    letterScene.style.display = "flex";

    envelope.style.display = "block";

    envelope.style.opacity = "0";

    envelope.style.pointerEvents = "auto";

    setTimeout(() => {

        envelope.style.transition =
            "opacity .8s ease";

        envelope.style.opacity = "1";

    }, 300);
});
