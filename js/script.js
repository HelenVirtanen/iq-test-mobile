// Buttons 
const burgerBtn = document.getElementById('burger-btn');
const closeBtn = document.getElementById('close-btn');

// Header
const headerImg= document.querySelector(".header__img");
const headerTitle= document.querySelector(".header__title");
const headerTitleReady = document.querySelector(".header__title_ready");

// Menu 
const menu = document.querySelector('.menu');
const menuList = document.querySelector('.menu__list');
const menuMain = document.querySelector("#menu-item-main");

// Sections
const mainSection = document.getElementById("main-screen");
const introSection = document.getElementById("intro");
const questionsSection= document.querySelector(".questions");
const question1 = document.getElementById("question-1");
const resultsSection = document.querySelector(".results-processing");
const readySection = document.querySelector(".ready");



/* Open and close hidden menu */

const toggleButtons = (isMenuOpen) => {
    burgerBtn.classList.toggle('hidden', isMenuOpen);
    closeBtn.classList.toggle('hidden', !isMenuOpen);
};

// Open hidden menu
burgerBtn.addEventListener('click', () => {
    menu.classList.remove('hidden');
    toggleButtons(true);
});

// Close hidden menu

closeBtn.addEventListener('click', () => {
menu.classList.add('hidden');
toggleButtons(false);
});



// Open menu links
const menuLinks = document.querySelectorAll(".menu__item");

menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (link == menuMain) {
            if (mainSection.classList.contains("hidden")) {
                mainSection.classList.remove("hidden");
            }
        }
        menu.classList.add('hidden');
        toggleButtons(false);
    });
});




// Go back to main

headerTitle.addEventListener("click", () => {
    if (!questionsSection.classList.contains("hidden")) {
        questionsSection.classList.add("hidden");
    }

    if (!readySection.classList.contains("hidden")) {
        readySection.classList.add("hidden");
    }

    if (!resultsSection.classList.contains("hidden")) {
        reasultsSection.classList.add("hidden");
    }

    if (mainSection.classList.contains("hidden")) {
        mainSection.classList.remove("hidden");
    }
});


// Start test 
const startTestButtons = document.querySelectorAll(".btn__begin-test, #menu-begin-test");

startTestButtons.forEach(button => {
    if (button.textContent.trim() === "Пройти тест") {
        button.addEventListener("click", () => {
            mainSection.classList.add("hidden");
            questionsSection.classList.remove("hidden");
            question1.classList.remove("hidden");
            menu.classList.add('hidden');
            headerImg.style.opacity = "1";
            headerTitle.style.opacity = "1";
        });
    }
});

// Next button

const questions = document.querySelectorAll(".questions > div");
const nextButtons = document.querySelectorAll(".question__next-btn");
const progressBar = document.querySelector(".progress-bar");
const progressWidths = [
    "6.15%", "9.6%", "13.85%", "29.2%", "35.76%", 
    "39.6%", "49.2%", "55.7%", "57.6%", "65.76%", "74.6%"
];


questions.forEach((question, index) => {
    const radioInputs = question.querySelectorAll("input[type='radio']");
    const colorOptions = question.querySelectorAll(".color__var");
    const numberOptions = question.querySelectorAll(".choice-button")
    const nextButton = question.querySelector(".question__next-btn");

    // Behavior while choosing radiobuttons
    if (radioInputs.length > 0) {
        radioInputs.forEach((radio) => {
            radio.addEventListener("change", () => {
                // Remove from all labels class "choosed"
                question.querySelectorAll(".question__label").forEach((label) => {
                    label.classList.remove("choosed");
                });

                //Add to choosed radio label class "choosed"
                const label = radio.closest(".question__label");
                label.classList.add("choosed");

                // Activate next button
                nextButton.classList.add("active-btn");
                nextButton.disabled = false;
            });
        });
    }

    //Behavior while choosing color squares
    if (colorOptions.length > 0) {
        colorOptions.forEach((color) => {
            color.addEventListener("click", () => {
                // Remove class 'selected' from other squares
                colorOptions.forEach((opt) => opt.classList.remove("selected"));
                // Add class 'select' to selected square
                color.classList.add("selected");

                // Activate next button
                nextButton.classList.add("active-btn");
                nextButton.disabled = false;
            });
        });
    }

    //Behavior while choosing number of picture
    if (numberOptions.length > 0) {
        numberOptions.forEach((color) => {
            color.addEventListener("click", () => {
                // Remove class 'selected' from other squares
                numberOptions.forEach((opt) => opt.classList.remove("picked"));
                // Add class 'select' to selected square
                color.classList.add("picked");

                // Activate next button
                nextButton.classList.add("active-btn");
                nextButton.disabled = false;
            });
        });
    }


        // Go to the next question by Next button
        nextButton.addEventListener("click", () => {
            if (index < questions.length - 1) {
                question.classList.add("hidden"); // Hide current question
                questions[index + 1].classList.remove("hidden"); // Show next question

                const nextProgressBar = questions[index + 1]?.querySelector(".progress-bar");
                if (nextProgressBar) {
                    console.log(progressWidths[index]);
                    nextProgressBar.style.width = progressWidths[index + 1];}
                console.log(nextProgressBar.style.width);    

            } else {
                question.classList.add('hidden');
                resultsSection.classList.remove('hidden');
                
                setTimeout(() => {
                    resultsSection.classList.add("hidden");
                    readySection.classList.remove("hidden");
                    headerTitle.classList.add("hidden");
                    headerTitleReady.classList.remove("hidden");
                }, 2000); 

                startCountdown();
            }
        });
    });


const callPeriod = document.querySelector('.call__period');

function startCountdown() {
    let [minutes, seconds] = callPeriod.textContent.split(':').map(Number);

    const countdownInterval = setInterval(() => {
        seconds--;

        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }

        if (minutes < 0) {
            clearInterval(countdownInterval);
            callPeriod.textContent = "00:00";
            alert('Время истекло!');
            return;
        }

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        callPeriod.textContent = `${formattedMinutes}:${formattedSeconds}`;
    }, 1000);
}








