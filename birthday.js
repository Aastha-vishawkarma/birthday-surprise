/* =================================
   CUSTOM SETTINGS
================================= */

const SECRET_PIN = "1234";

const FRIEND_NAME = "FRIEND";

const memories = [

    {
        image: "asset/birthdat1.jpg",
        text: "One beautiful memory 💕"
    },

    {
        image: "asset/birth2.jpg",
        text: "Another special moment ✨"
    },

    {
        image: "asset/birtha3.jpg",
        text: "Keep smiling always 🌸"
    }

];



/* =================================
   SCREEN CHANGE
================================= */

function showScreen(screenId) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    document
        .getElementById(screenId)
        .classList.add("active");


    createHearts(10);

}



/* =================================
   GIFT
================================= */

function openGift() {

    const gift =
        document.querySelector(".gift-container");

    const song =
        document.getElementById("birthdaySong");


    // Start music after user clicks the gift
    song.volume = 0.5;

    song.play().catch(error => {
        console.log("Music could not start:", error);
    });


    // Gift animation
    gift.style.transform =
        "scale(1.2)";


    createHearts(15);


    setTimeout(() => {

        showScreen("pinScreen");

    }, 500);

}



/* =================================
   PIN
================================= */

let enteredPin = "";


function enterPin(number) {

    if (enteredPin.length >= 4) {

        return;

    }


    enteredPin += number;


    updatePinDots();


    if (enteredPin.length === 4) {

        setTimeout(checkPin, 300);

    }

}



function updatePinDots() {

    for (let i = 1; i <= 4; i++) {

        const dot =
            document.getElementById(
                "dot" + i
            );


        if (i <= enteredPin.length) {

            dot.classList.add("active");

        } else {

            dot.classList.remove("active");

        }

    }

}



function deletePin() {

    enteredPin =
        enteredPin.slice(0,-1);

    updatePinDots();

}



function checkPin() {

    const message =
        document.getElementById(
            "pinMessage"
        );


    if (enteredPin === SECRET_PIN) {

        message.textContent =
            "✨ Correct! Surprise unlocked...";


        createHearts(20);


        setTimeout(() => {

            showScreen("birthdayScreen");

        }, 900);


    } else {

        message.textContent =
            "❌ Wrong code! Try again 💗";


        enteredPin = "";


        setTimeout(() => {

            message.textContent = "";

            updatePinDots();

        },1000);

    }

}



/* =================================
   FRIEND NAME
================================= */

document
    .querySelectorAll(".pink")
    .forEach(element => {

        element.textContent =
            FRIEND_NAME;

    });



/* =================================
   CAKE
================================= */

function blowCandles() {

    document
        .querySelector(".cake")
        .classList.add("blown");


    document
        .getElementById("cakeNext")
        .disabled = false;


    createHearts(25);

}



/* =================================
   MEMORIES
================================= */

let memoryIndex = 0;


function nextMemory() {

    memoryIndex++;


    if (
        memoryIndex >=
        memories.length
    ) {

        memoryIndex = 0;

    }


    document
        .getElementById("memoryImage")
        .src =
        memories[memoryIndex].image;


    document
        .getElementById("memoryText")
        .textContent =
        memories[memoryIndex].text;


    updateMemoryDots();

}



function updateMemoryDots() {

    const dots =
        document
            .querySelectorAll(
                ".photo-dots span"
            );


    dots.forEach(
        (dot,index) => {

            dot.classList.toggle(
                "active",
                index === memoryIndex
            );

        }
    );

}



/* =================================
   BALLOONS
================================= */

const wishes = [

    "May all your dreams come true 💗",

    "May you always stay happy ✨",

    "More laughter and adventures 🌸",

    "You deserve every beautiful thing 💕",

    "Keep shining always 🌟",

    "Happy Birthday! 🎂"

];


let popped = 0;


function popBalloon(
    balloon,
    index
) {

    if (
        balloon.classList.contains(
            "pop"
        )
    ) {

        return;

    }


    balloon.classList.add("pop");


    popped++;


    document
        .getElementById("wish")
        .textContent =
        wishes[index];


    document
        .getElementById(
            "balloonCounter"
        )
        .textContent =
        `Popped ${popped}/6`;


    createHearts(8);


    if (popped === 6) {

        document
            .getElementById(
                "balloonNext"
            )
            .disabled = false;

    }

}



/* =================================
   LETTER
================================= */

const message = `My dearest friend,

Today is a very special day because it is the day you came into this world. ❤️

I just want you to know that you are truly special.

May this new year of your life bring you lots of happiness, success, beautiful memories and endless reasons to smile.

Never stop believing in yourself.

Keep smiling.
Keep shining.
And always stay the amazing person you are. ✨

Happy Birthday! 🎂💗`;


let letterStarted = false;


function typeLetter() {

    if (letterStarted) {

        return;

    }


    letterStarted = true;


    const element =
        document.getElementById(
            "letterText"
        );


    let index = 0;


    const typing =
        setInterval(() => {

            element.textContent =
                message.substring(
                    0,
                    index
                );


            index++;


            if (
                index >
                message.length
            ) {

                clearInterval(typing);

            }

        }, 25);

}



/* Start typing when letter screen opens */

const originalShowScreen =
    showScreen;


showScreen = function(screenId) {

    originalShowScreen(screenId);


    if (
        screenId === "letterScreen"
    ) {

        setTimeout(
            typeLetter,
            300
        );

    }

};



/* =================================
   FLOATING HEARTS
================================= */

function createHearts(amount) {

    const container =
        document.getElementById(
            "hearts"
        );


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );


        heart.className =
            "heart";


        heart.textContent =
            Math.random() > .3
                ? "♥"
                : "✨";


        heart.style.left =
            Math.random() * 100 +
            "%";


        heart.style.fontSize =
            12 +
            Math.random() * 20 +
            "px";


        heart.style.color =
            [
                "#ff6fae",
                "#ff9bc5",
                "#ffd1e5"
            ][
                Math.floor(
                    Math.random() * 3
                )
            ];


        heart.style.animationDuration =
            3 +
            Math.random() * 4 +
            "s";


        container.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        },7000);

    }

}


/* Continuous small hearts */

setInterval(() => {

    createHearts(1);

},1200);
function updateBirthdayCounter() {
    const targetDate = new Date("2026-10-03T00:00:00");

    const now = new Date();

    let difference = targetDate - now;

    if (difference <= 0) {
        document.getElementById("years").textContent = "27";
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    difference %= (1000 * 60 * 60 * 24);

    const hours = Math.floor(difference / (1000 * 60 * 60));
    difference %= (1000 * 60 * 60);

    const minutes = Math.floor(difference / (1000 * 60));
    difference %= (1000 * 60);

    const seconds = Math.floor(difference / 1000);

    document.getElementById("years").textContent = "26";
    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateBirthdayCounter();
setInterval(updateBirthdayCounter, 1000);