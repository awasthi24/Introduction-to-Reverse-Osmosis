/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
 

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////






/////////////// Write the MCQ below in the exactly same described format ///////////////


  const myQuestions = [
  {
  
  "questions": [
    {
      "question": "What is the primary purpose of reverse osmosis?",
      "answers": {
        "a": "To remove solids from water",
        "b": "To mix water and salt",
        "c": "To add minerals to water",
        "d": "To change water into steam"
      },
      "correctAnswer": "a",
      "difficulty": "beginner"
    },
    {
      "question": "Which type of membrane is used in reverse osmosis?",
      "answers": {
        "a": "Transparent membrane",
        "b": "Non-permeable membrane",
        "c": "Semi-permeable membrane",
        "d": "Magnetic membrane"
      },
      "correctAnswer": "c",
      "difficulty": "beginner"
    },
    {
      "question": "In reverse osmosis, what drives the water through the membrane?",
      "answers": {
        "a": "Gravity",
        "b": "Heat",
        "c": "High pressure",
        "d": "Electricity"
      },
      "correctAnswer": "c",
      "difficulty": "beginner"
    },
    {
      "question": "What does a semi-permeable membrane allow to pass through?",
      "answers": {
        "a": "Only salt",
        "b": "Only large particles",
        "c": "Only gases",
        "d": "Only certain molecules like water"
      },
      "correctAnswer": "d",
      "difficulty": "beginner"
    },
    {
      "question": "Which of the following is most likely removed by reverse osmosis?",
      "answers": {
        "a": "Water molecules",
        "b": "Salt and impurities",
        "c": "Oxygen",
        "d": "Light"
      },
      "correctAnswer": "b",
      "difficulty": "beginner"
    },
    {
      "question": "Reverse osmosis is an example of which type of process?",
      "answers": {
        "a": "Natural diffusion",
        "b": "Osmosis",
        "c": "Filtration using pressure",
        "d": "Chemical reaction"
      },
      "correctAnswer": "c",
      "difficulty": "beginner"
    },
    {
      "question": "What is the direction of water flow in reverse osmosis compared to natural osmosis?",
      "answers": {
        "a": "Same direction",
        "b": "Opposite direction",
        "c": "Circular direction",
        "d": "No direction"
      },
      "correctAnswer": "b",
      "difficulty": "beginner"
    },
    {
      "question": "What kind of water is typically used as the input in reverse osmosis?",
      "answers": {
        "a": "Rainwater",
        "b": "Distilled water",
        "c": "Contaminated or salty water",
        "d": "Boiled water"
      },
      "correctAnswer": "c",
      "difficulty": "beginner"
    },
    {
      "question": "Why is pressure important in reverse osmosis?",
      "answers": {
        "a": "It pushes water through the membrane",
        "b": "It allows salt to dissolve faster",
        "c": "It heats the water",
        "d": "It increases the size of the molecules"
      },
      "correctAnswer": "a",
      "difficulty": "beginner"
    },
    {
      "question": "Which of these is a common real-life application of reverse osmosis?",
      "answers": {
        "a": "Making soda",
        "b": "Desalinating seawater",
        "c": "Generating electricity",
        "d": "Freezing water"
      },
      "correctAnswer": "b",
      "difficulty": "beginner"
    }
  ]
}


    /* To add more MCQ's, copy the below section, starting from open curly braces ( { )
        till closing curly braces comma ( }, )

        and paste it below the curly braces comma ( below correct answer }, ) of above 
        question

    Copy below section

    {
      question: "This is question n?",
      answers: {
        a: "Option 1",
        b: "Option 2",
        c: "Option 3",
        d: "Option 4"
      },
      correctAnswer: "c"
    },

    Copy above section

    */




  ];




/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////


  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////