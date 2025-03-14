// Buttons 
const burgerBtn = document.getElementById('burger-btn');
const burgerImg = document.querySelector(".burger-img");
const closeBtn = document.getElementById('close-btn');

// Header
const logo = document.querySelector(".logo__link");
const logoImg = document.querySelector(".logo__link-img");
const headerTitle = document.querySelector(".header__title");
const headerTitleReady = document.querySelector(".header__title_ready");

// Menu 
const menu = document.querySelector('.menu');
const menuList = document.querySelector('.menu__list');
const menuMain = document.querySelector("#menu-item-main");
const menuInfo = document.querySelector("#menu-item-info");

// Sections
const mainSection = document.getElementById("main-screen");
const introSection = document.getElementById("intro");
const description = document.getElementById("description");
const questionsSection= document.querySelector(".questions");
const question1 = document.getElementById("question-1");
const questions = document.querySelectorAll(".question");
const resultsSection = document.querySelector(".results-processing");
const readySection = document.querySelector(".ready");


/*=================================
    Open and close hidden menu 
=================================*/

const toggleButtons = (isMenuOpen) => {
    burgerBtn.classList.toggle('hidden', isMenuOpen);
    burgerImg.classList.toggle('hidden', isMenuOpen);
    closeBtn.classList.toggle('hidden', !isMenuOpen);
};

// Open hidden menu
burgerBtn.addEventListener('click', () => {
    menu.classList.remove('hidden');
    headerTitle.classList.add('hidden');
    menu.style.height = `${introH}px`;

    const isVisible = logo.style.opacity === 1;
    logo.classList.toggle('hidden', isVisible);
    logoImg.classList.add('hidden', isVisible);
    toggleButtons(true);
});

// Close hidden menu

closeBtn.addEventListener('click', () => {
    menu.classList.add('hidden');
    toggleButtons(false);
});


/*===================================
    Click menu links and close sections
=====================================*/

// Hide sections
const hideSections = (sections) => {
    sections.forEach(section => section.classList.add("hidden"));
};

// Hide questions
const hideQuestions = () => {
    questions.forEach(q => q.classList.add("hidden"));
};

// Open menu links
menu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    hideSections([questionsSection]);
    mainSection.classList.remove("hidden");
    menu.classList.add("hidden");
    resetTest();
    resetCountdown();
    toggleButtons(false);
});

/*=======================
    Go back to main
=========================*/

const linksToMainPage = [headerTitle, headerTitleReady, logo, menuMain];
const sectionsToHide = [questionsSection, readySection, resultsSection, headerTitleReady];

linksToMainPage.forEach(link => {
    link.addEventListener("click", () => {
        hideSections(sectionsToHide);
        hideQuestions();
        mainSection.classList.remove("hidden");
        resetTest();
        resetCountdown();
    });
});



/*=====================
Reset test data
=====================*/

const resetTest = () => {
    questions.forEach((question) => {
        question.classList.add("hidden");

        const radios = question.querySelectorAll("input[type='radio']");
        radios.forEach((radio) => (radio.checked = false));

        question.querySelectorAll(".question__label").forEach((label) => {
            label.classList.remove("choosed");
        });

        question.querySelectorAll(".color__var").forEach((color) => {
            color.classList.remove("selected");
        });

        question.querySelectorAll(".choice-button").forEach((button) => {
            button.classList.remove("picked");
        });
    });

    currentQuestionIndex = 0;

    progressBar.style.width = "0%";

    showQuestion(currentQuestionIndex);
};

/* =================
    Fixed header
=================== */

const header = document.getElementById("header");
    const intro = document.getElementById("intro");
    const introH = intro ? intro.offsetHeight : 0;

    const checkScroll = (scrollOffset) => {
        if (scrollOffset >= introH) {
            header.classList.add("fixed");
        } else {
            header.classList.remove("fixed");
        }
    };

    let scrollOffset = window.scrollY;
    checkScroll(scrollOffset);

    window.addEventListener("scroll", () => {
        scrollOffset = window.scrollY;
        checkScroll(scrollOffset);
    });

/* ================
    Start test 
================= */

const startTestButtons = document.querySelectorAll(".btn__begin-test, #menu-begin-test");

startTestButtons.forEach(button => {
    if (button.textContent.trim() === "Пройти тест") {
        button.addEventListener("click", () => {
            mainSection.classList.add("hidden");
            questionsSection.classList.remove("hidden");
            question1.classList.remove("hidden");
            menu.classList.add('hidden');
            logo.style.opacity = "1";
            headerTitle.classList.remove("hidden");
        });
    }
});

/*===================
    Questions and Next button 
 ==================== */

const progressBar = document.querySelector(".progress-bar");
const nextButton = document.querySelector(".question__next-btn");
let currentQuestionIndex = 0;

// Initialize the first question
const showQuestion = (index) => {
    questions.forEach((question, i) => {
        question.classList.toggle("hidden", i !== index);
    });
    updateProgress(index);
    nextButton.disabled = true; // Disable button by default for new questions
    nextButton.classList.remove("active-btn");
};

const updateProgress = (index) => {
    const progress = ((index + 1) / (questions.length)) * 100;
    progressBar.style.width = `${progress}%`;
};

window.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        event.preventDefault();
    }
});

// Handle Next button click
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        questionsSection.classList.add('hidden');

    for (let q of questions) {
        q.classList.add("hidden");
    };

    resultsSection.classList.remove('hidden');
            
    setTimeout(() => {
        resultsSection.classList.add("hidden");
        readySection.classList.remove("hidden");
        headerTitle.style.display = "none";
        headerTitleReady.classList.remove("hidden");
    }, 2000); 

    startCountdown();}
});


// Behavior for radio buttons
const updateRadios = (question) => {
    question.addEventListener('change', event => {
        const radio = event.target.closest("input[type='radio']");
        if (!radio) return;
    
    question.querySelectorAll(".question__label").forEach((label) => {
        label.classList.remove("choosed");
    });

    // Add "choosed" class to the selected label
    const label = radio.closest(".question__label");
    label.classList.add("choosed");
    
    // Activate Next button
    nextButton.classList.add("active-btn");
    nextButton.disabled = false;
    });
}

// Behavior for color squares
const updateColorOptions = (question) => {
    question.addEventListener('click', event => {
        const colorOption = event.target.closest(".color__var");
        if (!colorOption) return;
        
        // Remove "selected" class from other squares
        const colorOptions = question.querySelectorAll(".color__var");
        colorOptions.forEach(color => color.classList.remove("selected"));
        
        // Add "selected" class to the clicked square
        colorOption.classList.add("selected");

        // Activate Next button
        nextButton.classList.add("active-btn");
        nextButton.disabled = false;
    });
}

// Behavior for number options
const updateNumberOptions = (question) => {

    question.addEventListener('click', event => {
        const numberOption = event.target.closest(".choice-button");
        if (!numberOption) return;

        // Remove "picked" class from other buttons
        const numberOptions = question.querySelectorAll(".choice-button");
        numberOptions.forEach((num) => num.classList.remove("picked"));

        // Add "picked" class to the clicked button
        numberOption.classList.add("picked");

        // Activate Next button
        nextButton.classList.add("active-btn");
        nextButton.disabled = false;
        });
};

// Attach event listeners to each question
questions.forEach((question) => {
    updateRadios(question);
    updateColorOptions(question);
    updateNumberOptions(question);
});

// Show the first question on load
showQuestion(currentQuestionIndex);


/* =======================
        Timer 
==========================*/
let countdownInterval = null;
const callPeriod = document.querySelector('.call__period');
const callButton = document.querySelector('.call-btn');

function startCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    let [minutes, seconds] = callPeriod.textContent.split(':').map(Number);

    countdownInterval = setInterval(() => {
        seconds--;

        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }

        if (minutes < 0) {
            clearInterval(countdownInterval);
            callPeriod.textContent = "00:00";
            alert('Время истекло!');
            callButton.disabled = true;
            return;
        }

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        callPeriod.textContent = `${formattedMinutes}:${formattedSeconds}`;
    }, 1000);
}

function resetCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }

    callPeriod.textContent = "10:00";
    callButton.disabled = false;
}



/*==============
    Call API 
================*/

document.getElementById('call-btn').addEventListener('click', async () => {
    const container = document.getElementById('api-response-container');
    callButton.style.marginBottom = '2px';
    container.innerHTML = `
            <h3 style="text-align: center; color:#3bde7c;">Загрузка...</h3>`;

    try {
        // Send response
        const response = await fetch('https://swapi.dev/api/people/1/');
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных');
        }

        // JSON parsing
        const data = await response.json();

        // Create HTML to show
        const formattedData = `
            <h3 class="character-header">Данные о персонаже:</h3>
            <table class="character-table">
                <thead>
                    <tr>
                        <th>Свойство</th>
                        <th>Значение</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Имя</td>
                        <td class="character-value">${data.name}</td>
                    </tr>
                    <tr>
                        <td>Рост</td>
                        <td class="character-value">${data.height} см</td>
                    </tr>
                    <tr>
                        <td>Масса</td>
                        <td class="character-value">${data.mass} кг</td>
                    </tr>
                    <tr>
                        <td>Цвет волос</td>
                        <td class="character-value">${data.hair_color}</td>
                    </tr>
                    <tr>
                        <td>Цвет кожи</td>
                        <td class="character-value">${data.skin_color}</td>
                    </tr>
                    <tr>
                        <td>Цвет глаз</td>
                        <td class="character-value">${data.eye_color}</td>
                    </tr>
                    <tr>
                        <td>Год рождения</td>
                        <td class="character-value">${data.birth_year}</td>
                    </tr>
                    <tr>
                        <td>Пол</td>
                        <td class="character-value">${data.gender}</td>
                    </tr>
                </tbody>
            </table>
            `;

    // Add fetched data to container
    container.innerHTML = formattedData;

    } catch (error) {
        container.innerHTML = `<p style="color: red;">Произошла ошибка: ${error.message}</p>`;
    }
});
