/* ==========================================
   PAGE SYSTEM
========================================== */

let currentPage = 1;

const pages = document.querySelectorAll(".page");

function showPage(pageNumber) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const targetPage =
        document.getElementById(`page${pageNumber}`);

    if (targetPage) {
        targetPage.classList.add("active");
    }

    currentPage = pageNumber;

    if (pageNumber === 7) {
        startConfetti();
    }
}

function nextPage() {

    if (currentPage < 7) {
        showPage(currentPage + 1);
    }
}


/* ==========================================
   PAGE 1 - NAME & CHOICE
========================================== */

const nameInput =
    document.getElementById("nameInput");

const nameMessage =
    document.getElementById("nameMessage");

const startBtn =
    document.getElementById("startBtn");

const choiceButtons =
    document.querySelectorAll(".choice");

let selectedChoice = null;

function validatePageOne() {

    const name =
        nameInput.value.trim().toLowerCase();

    const validName =
        name === "selfy sulistiyani";

    if (name.length === 0) {

        nameMessage.textContent = "";

    } else if (!validName) {

        nameMessage.textContent =
            "Hmm... kayaknya bukan kamu deh 😝❤️";

        nameMessage.style.color =
            "#d63f6f";

    } else {

        nameMessage.textContent =
            "Nahhh, ini baru orangnya ❤️";

        nameMessage.style.color =
            "#46a66b";
    }

    startBtn.disabled =
        !(validName && selectedChoice);
}

nameInput.addEventListener(
    "input",
    validatePageOne
);


choiceButtons.forEach(button => {

    button.addEventListener("click", () => {

        choiceButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedChoice =
            button.dataset.choice;

        validatePageOne();
    });

});


startBtn.addEventListener("click", () => {

    if (!startBtn.disabled) {

        showPage(2);

        createHearts(15);
    }

});


/* ==========================================
   PAGE 3 - LOVE QUESTION
========================================== */

const yesBubble =
    document.getElementById("yesBubble");

const noBubble =
    document.getElementById("noBubble");

const page3Next =
    document.getElementById("page3Next");


yesBubble.addEventListener("click", () => {

    page3Next.disabled = false;

    yesBubble.innerHTML =
        "TAUUU KOKK ❤️🥰";

    yesBubble.style.transform =
        "scale(1.15)";

    createHearts(25);

    showNotification(
        "Hehe, aku juga sayang kamu bangettt ❤️"
    );

});


/*
    Bubble G dibuat tidak mungkin
    untuk diklik.
*/

function escapeNoBubble() {

    const parent =
        noBubble.parentElement;

    const parentRect =
        parent.getBoundingClientRect();

    const maxX =
        parentRect.width - noBubble.offsetWidth;

    const maxY =
        parentRect.height - noBubble.offsetHeight;

    const randomX =
        Math.random() * maxX - maxX / 4;

    const randomY =
        Math.random() * maxY - maxY / 5;

    noBubble.style.transform =
        `translate(${randomX}px, ${randomY}px)`;
}


/*
    Desktop:
    bergerak ketika mouse mendekati
*/

noBubble.addEventListener(
    "mouseenter",
    escapeNoBubble
);


/*
    Mobile:
    bergerak ketika disentuh
*/

noBubble.addEventListener(
    "touchstart",
    function(event) {

        event.preventDefault();

        escapeNoBubble();

    },
    {
        passive: false
    }
);


/*
    Extra protection:
    tombol G tidak pernah
    menjalankan aksi klik.
*/

noBubble.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        escapeNoBubble();

    }
);


/* ==========================================
   PAGE 6
========================================== */

const finalChoices =
    document.querySelectorAll(".final-choice");

const page6Next =
    document.getElementById("page6Next");

let finalSelected = false;


finalChoices.forEach(button => {

    button.addEventListener("click", () => {

        finalChoices.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        finalSelected = true;

        page6Next.disabled = false;

        createHearts(15);

    });

});


/* ==========================================
   FLOATING HEART SYSTEM
========================================== */

const heartsContainer =
    document.getElementById(
        "hearts-container"
    );

function createHeart() {

    const heart =
        document.createElement("div");

    heart.classList.add(
        "floating-heart"
    );

    const hearts = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💘",
        "💝"
    ];

    heart.textContent =
        hearts[
            Math.floor(
                Math.random() * hearts.length
            )
        ];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";

    heart.style.animationDelay =
        Math.random() * 2 + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 12000);
}


function createHearts(amount = 5) {

    for (let i = 0; i < amount; i++) {

        setTimeout(
            createHeart,
            i * 150
        );

    }
}


/*
    Background hearts terus berjalan
*/

setInterval(() => {

    createHeart();

}, 1200);


/* ==========================================
   NOTIFICATION
========================================== */

const notification =
    document.getElementById(
        "notification"
    );

let notificationTimeout;


function showNotification(message) {

    notification.textContent =
        message;

    notification.classList.add("show");

    clearTimeout(
        notificationTimeout
    );

    notificationTimeout =
        setTimeout(() => {

            notification.classList.remove(
                "show"
            );

        }, 3000);
}


/* ==========================================
   PAGE 7 CONFETTI / HEART EFFECT
========================================== */

function startConfetti() {

    createHearts(50);

    setTimeout(() => {
        createHearts(30);
    }, 1500);

    setTimeout(() => {
        createHearts(30);
    }, 3000);

}


/* ==========================================
   PREVENT ACCIDENTAL FORM SUBMISSION
========================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            currentPage === 1
        ) {

            event.preventDefault();

        }

    }
);


/* ==========================================
   INITIALIZATION
========================================== */

showPage(1);