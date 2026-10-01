/* =========================
   GET ELEMENTS
========================= */

const birthdayMusic =
    document.getElementById("birthdayMusic");

const screens =
    document.querySelectorAll(".screen");

const startBtn =
    document.getElementById("startBtn");

const nextButtons =
    document.querySelectorAll(".next-btn");

const candle =
    document.getElementById("candle");

const wishHint =
    document.getElementById("wishHint");

const confettiContainer =
    document.getElementById("confetti-container");

const musicBtn =
    document.getElementById("musicBtn");


/* =========================
   CHANGE SCREEN
========================= */

function showScreen(screenId) {

    screens.forEach(screen => {

        screen.classList.remove("active");

    });

    const target =
        document.getElementById(screenId);

    if (target) {

        target.classList.add("active");

    }

}


/* =========================
   START EXPERIENCE
========================= */

startBtn.addEventListener("click", () => {

    /*
        Music starts after the user
        clicks the button.

        This avoids browser autoplay
        restrictions on mobile.
    */

    if (birthdayMusic) {

        birthdayMusic
            .play()
            .then(() => {

                musicBtn.textContent = "🎵";

            })
            .catch(error => {

                console.log(
                    "Music could not start:",
                    error
                );

            });

    }


    // Move from Opening → Birthday Letter

    showScreen("letter");

});


/* =========================
   MUSIC BUTTON
========================= */

musicBtn.addEventListener("click", () => {

    /*
        If music is currently playing,
        pause it.
    */

    if (!birthdayMusic.paused) {

        birthdayMusic.pause();

        musicBtn.textContent = "🔇";

    }

    /*
        If music is paused,
        play it.
    */

    else {

        birthdayMusic
            .play()
            .then(() => {

                musicBtn.textContent = "🎵";

            })
            .catch(error => {

                console.log(
                    "Music could not start:",
                    error
                );

            });

    }

});


/* =========================
   NEXT BUTTONS
========================= */

nextButtons.forEach(button => {

    button.addEventListener("click", () => {

        const nextScreen =
            button.dataset.next;

        if (!nextScreen) {
            return;
        }

        showScreen(nextScreen);

    });

});


/* =========================
   MAKE A WISH
========================= */

candle.addEventListener("click", () => {

    /*
        Prevent the user from
        blowing the candle twice.
    */

    if (
        candle.classList.contains("blown")
    ) {

        return;

    }


    /* Turn off the flame */

    candle.classList.add("blown");


    /* Change the instruction */

    wishHint.textContent =
        "Your wish has been made... ✨";


    /* Start confetti */

    createConfetti();


    /*
        Wait for the candle animation
        and confetti before showing
        the final message.
    */

    setTimeout(() => {

        showScreen("final");

    }, 2500);

});


/* =========================
   CREATE CONFETTI
========================= */

function createConfetti() {

    const numberOfConfetti = 120;


    for (
        let i = 0;
        i < numberOfConfetti;
        i++
    ) {

        /* Create confetti piece */

        const piece =
            document.createElement("div");


        piece.classList.add("confetti");


        /* Random horizontal position */

        piece.style.left =
            Math.random() * 100 + "%";


        /* Random size */

        const size =
            Math.random() * 8 + 6;


        piece.style.width =
            size + "px";


        piece.style.height =
            size * 1.5 + "px";


        /* Random rotation */

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        /* Random falling speed */

        piece.style.animationDuration =
            Math.random() * 2 + 2 + "s";


        /* Random delay */

        piece.style.animationDelay =
            Math.random() * 0.8 + "s";


        /* Random shape */

        if (
            Math.random() > 0.5
        ) {

            piece.style.borderRadius =
                "50%";

        }


        /* Add to page */

        confettiContainer.appendChild(
            piece
        );


        /*
            Remove the element after
            the animation finishes.
        */

        setTimeout(() => {

            piece.remove();

        }, 4500);

    }

}


/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener(
    "keydown",
    event => {

        /*
            Pressing Enter on the
            opening screen starts
            the experience.
        */

        if (
            event.key === "Enter"
        ) {

            const activeScreen =
                document.querySelector(
                    ".screen.active"
                );


            if (
                activeScreen &&
                activeScreen.id === "opening"
            ) {

                startBtn.click();

            }

        }

    }
);