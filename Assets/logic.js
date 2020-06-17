//Variables to Shorten text
var startButton = document.getElementById('startbtn')
var nextButton = document.getElementById('nextbtn')
var finishEarlyButton = document.getElementById('finishEarlyBtn')
var introSection = document.getElementById('intro')
var questionSection = document.getElementById('Question-Section')
var questionElement = document.getElementById('question')
var answerButtons = document.getElementById('Answer-Section')
var scoreboard = document.getElementById('Score-Container')
var userScore = document.getElementById('Score')
var seeScoreBtn = document.getElementById('seeScore')
var restartBtn = document.getElementById('restart')
var finishbtn = document.getElementById('finishbtn')
var timeout = document.getElementById('time-out')
var userAnswer = ""

var shuffledQuestions, currentQuestionIndex
var score = 0
var outOfTime = false
var completed = false

var userName = document.getElementById('scoreboard-input')
var leaderboard = document.getElementById('leaderboard')
var leaderboardUsers = document.getElementById('leaderboardUsers')
var leaderboardContainer = document.getElementById('leaderboard-container')

var users = [];

init();

function init() {
    var storedUsers = JSON.parse(localStorage.getItem("Users"))
    if (storedUsers !== null) {
        users = storedUsers;

        renderUsers();
    }
}

function renderUsers() {
    leaderboardUsers.innerHTML = "";

    for (var i = 0; i < users.length; i++) {
        var user = users[i];

        var li = document.createElement("li");
        li.textContent = user;
        li.setAttribute("data-index", i);
        li.setAttribute("class", "Scorelist");


        var button = document.createElement("button");
        button.textContent = (localStorage.getItem(users) + " :   Clear");
        button.setAttribute("data-index", i);
        
      
        li.appendChild(button);
        leaderboardUsers.appendChild(li);
    }
}
//localStorage.getItem(users)
function storeUsers() {
    //localStorage.setItem("users", JSON.stringify(users));
    //localStorage.setItem(JSON.stringify(users), JSON.stringify(score));
    localStorage.setItem(users, score);
}

// This listens for the form to be submitted then it executes the code
leaderboard.addEventListener("submit", function() {
    event.preventDefault();

    var userText = userName.value.trim();
    var userCorrectAnswers = score.value;

    if (userText === "") {
        return
    }

//users.push(userCorrectAnswers);
    users.push(userText);
    userName.value = "";
// Users name is store into local Storage
    storeUsers()
    renderUsers()
    
})
// This is the clear function
leaderboardUsers.addEventListener("click", function(event) {
    var element = event.target;
    // If the element that is targeted is a button, the cute begins to clear it and then Re-Render the Users.
    if (element.matches("button") === true) {
        var index = element.parentElement.getAttribute("data-index");
        users.splice(index, 1);

        storeUsers();
        renderUsers();
    }
})

// This code is the Timer, i actually grabbed this off someones blog, but alterations have been made!
function countdown(minutes) {
    var seconds = 60;
    var mins = minutes
    function tick() {
        //This Code is outputting to the counter Element in at the top of the screen
        var counter = document.getElementById("counter");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        // This stops the counter if all questions are completed!
        if(completed === true) {
            return
        }
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            if(mins > 1){
                countdown(mins-1);           
            }
            if(mins == 0) {
                outOfTime = true
            }
        
            RanOutofTime()
        } 
    }
    tick();
}


// If the counter reaches 0, this function will be called. it hide pretty much everything and displays the message that you ran out of time.
function RanOutofTime() {
    timeout.classList.remove('hide')
    answerButtons.classList.add('hide')
    nextButton.classList.add('hide')
    questionSection.classList.add("hide")
    leaderboardContainer.classList.add('hide')
    scoreboard.classList.add('hide')
}

// User Starts the game by clicking the Start Button that executes the "Start Quiz Function"
startButton.addEventListener('click', startQuiz)

// When the Next Button is clicked, the "setNextQuestion Function" is Executed and Question Index is increased.
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

// This is the Function that Transitions from the Intro Screen to the Actual Quiz, it sorts the Classes of the items that are to be on the Screen.
function startQuiz() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    score = 0
    questionSection.classList.remove('hide')
    nextButton.classList.remove('hide')
    restartBtn.classList.remove('hide')
    introSection.classList.add('hide')
    countdown(1);
    setNextQuestion()
}

// This is my Restart Function that is written to restart the Quiz from whever the user is, The main aim of it its to reset all the values
// and Classes like "hide" for the scoring, it is super important to reset the score and UserAnswer.
function restart() {
    restartBtn.addEventListener("click", function() {

        completed = false
        startButton.classList.add('hide')
        shuffledQuestions = questions.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        answerButtons.classList.remove('hide')
        questionSection.classList.remove('hide')
        nextButton.classList.remove('hide')
        introSection.classList.add('hide')
        scoreboard.classList.add('hide')
        timeout.classList.add('hide')
        leaderboardContainer.classList.add('hide')
        score = 0
        countdown(1);
        setNextQuestion()
        
    })
}

// This calls the Restart Function but only executes when the Restart Button is Clicked.
restart()

// This Function gets the next set of Questions ready.
function resetQuestions() {
    
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    // Removes all children before setting new.
    while (answerButtons.firstChild) {
        answerButtons.removeChild
        (answerButtons.firstChild)
    }
}

// this function detects if the element pressed is correct. if it is, it applies correct class, if wrong it applies the "wrong" class
// 
function correctAnswerDetection(element, correct) {
    clearStatusClass(element)
    if (correct) {
        userAnswer = true
        //element.classList.add('correct')

    } else {
        //element.classList.add('wrong')
        userAnswer = false
    }
}

//  Supplemental Function to setStatusClass TO ALSO BE REMOVED
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// This is the Event Listener for the Function : ScoreQuestion
seeScoreBtn.addEventListener("click", function() {
    scoreQuestion()
})

// the scoreQuestion Function Hides elements and reveals the scoreboard to the HTML, For the Scoring system i had to include a IF
// Statement at the end of this function to get the final score
function scoreQuestion () {
    scoreboard.classList.remove('hide')
    questionSection.classList.add('hide')
    seeScoreBtn.classList.add('hide')
    leaderboardContainer.classList.remove('hide')
    if (userAnswer == true) {
        score += 1
    }
    userScore.innerText = score;
    completed = true
}

// setNextQuestion Calls the resetQuestions function then the showQuestion function but with a bit of Maths to shuffle the order
// of the questions, The scoring system is done here. the get a score the user must have this function called while the userAnswer
// Variable is set to true
function setNextQuestion() {
    resetQuestions()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    if (userAnswer == true) {
        score += 1
    }
    console.log(score)
}

// This Function updates the HTML with new buttons that contain the Relevant information and data, like which button gives a correct value.
function showQuestion(question) {

    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('button')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)
    })
}

// This function lets JavaScript know which button is clicked and if it is the Correct one or not using Dataset.
function selectAnswer(userPick) {
    var selectedButton = userPick.target
    var correct = selectedButton.dataset.correct
    Array.from(answerButtons.children).forEach(button => {
        correctAnswerDetection(button, button.dataset.correct)
        })
        correctAnswerDetection(document.body, correct)
    // This If statement is how the Program knows where to finish, this code checks if the questions are running out, if so the code
    // is Executed
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        seeScoreBtn.classList.remove('hide')
    }
}
// This is my Questions array! all questions are treated as objects, with their answers but only the correct one(s) will have the true value!
var questions = [
    {
        question: 'What is JavaScripts AND?',
        answers: [
            {text: '%%', correct: false},
            {text: '$$', correct: false},
            {text: '||', correct: false},
            {text: '&&', correct: true}
        ]
        
    },
    {
        question: 'What does ++ do?',
        answers: [
            {text: 'Increase Value', correct: true},
            {text: 'Nothing', correct: false},
            {text: 'Decrease Value', correct: false},
            {text: 'Add Stings', correct: false}
        ]
        
    },
    {
        question: 'What is JavaScripts OR?',
        answers: [
            {text: '||', correct: true},
            {text: '$$', correct: false},
            {text: '%%', correct: false},
            {text: '{{', correct: false}
        ]
        
    },
    {
        question: 'When was JavaScript Created?',
        answers: [
            {text: '2000', correct: false},
            {text: '2005', correct: false},
            {text: '2001', correct: false},
            {text: '1995', correct: true}
        ]
        
    },
    {
        question: 'What is JavaScripts NOT?',
        answers: [
            {text: '!', correct: true},
            {text: '!!', correct: false},
            {text: '&&', correct: false},
            {text: '&', correct: false}
        ]
        
    },
    {
        question: 'Which Company Created JavaScript?',
        answers: [
            {text: 'Google', correct: false},
            {text: 'Netscape', correct: true},
            {text: 'IBM', correct: false},
            {text: 'MySpace', correct: false}
        ]
        
    },
    {
        question: 'Are the Math functions exclusive to JavaScript?',
        answers: [
            {text: 'No', correct: true},
            {text: 'Yes', correct: false},
        ]
        
    },
    {
        question: 'How do you generate a random Number in JavaScript?',
        answers: [
            {text: 'Math.random', correct: false},
            {text: 'math.random()', correct: false},
            {text: 'math.random', correct: false},
            {text: 'Math.random()', correct: true}
        ]
        
    },
    {
        question: 'What is console.log used for?',
        answers: [
            {text: 'Debugging', correct: true},
            {text: 'Creating Variables', correct: false},
            {text: 'Rendering', correct: false},
            {text: 'Encryption', correct: false}
        ]
        
    },
    {
        question: 'What does preventDefault() do?',
        answers: [
            {text: 'Stops the page refeshing', correct: true},
            {text: 'Loads Page Contents', correct: false},
            {text: 'Rounds Down a Number', correct: false},
            {text: 'Prevents strings changing', correct: false}
        ]
        
    },
    {
        question: 'Which is a popular Javascript Library?',
        answers: [
            {text: 'Python', correct: false},
            {text: 'C++', correct: false},
            {text: 'JQuery', correct: true},
            {text: 'BookTheif', correct: false}
        ]
        
    }
    
]

