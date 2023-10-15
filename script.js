const questions = [
    {
        question:"which is the largest animal in the world:",
        answer:[
            {text:"shark", correct: false},
            {text:"Blue Whale", correct: true},
            {text:"Elephant", correct: false},
            {text:"Giraff", correct: false}
        ]
    },
    {
        question:"which is the smallest continent in the world:",
        answer:[
            {text:"Asia", correct: false},
            {text:"Australia", correct: true},
            {text:"Artic", correct: false},
            {text:"Africa", correct: false}
        ]
    },
    {
        question:"which is the largest desert in the world:",
        answer:[
            {text:"Kalahari", correct: false},
            {text:"Gobi", correct: false},
            {text:"Sahara", correct: true},
            {text:"Antartica", correct: false}
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");





let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    //for the question
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "."+ currentQuestion.question;

    //for the answer
    currentQuestion.answer.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.append(button);
    //create a dataset for the created button
     if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);

    })

    
   
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    //selected button action defined
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++
    }
    else{
        selectedBtn.classList.add("incorrect")
    }

    //the rest of the unselected options are defined
    Array.from(answerButton.children).forEach((button)=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    })
   
    nextButton.style.display = "block"  
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleQuestion()
    }
    else{
        startQuiz()
    }
})


function handleQuestion(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }
    else{
        showScore()
    }
}

function showScore(){
    resetState()
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}
startQuiz();

