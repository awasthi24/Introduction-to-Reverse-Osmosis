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
        `<div class=question> ${currentQuestion.question} </div>
        <div class=answers> ${answers.join("")} </div>`
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
  
  questions: [
    {
      question: "1. What was the role of the semi-permeable membrane in the experiment?",
      answers: {
        a: "It allowed only water molecules to pass",
        b: "It blocked all molecules",
        c: "It allowed both water and salt to pass",
        d: "It increased the pressure on water"
      },
      correctAnswer: "a",
      difficulty: "beginner"
    },
    {
      question: "What happened to the contaminants (like salt or dye) during the reverse osmosis process?v",
      answers: {
        a: "They passed through the membrane",
        b: "They evaporated",
        c: "They broke down into pure water",
        d: "They were retained on one side of the membrane"
      },
      correctAnswer: "d",
      difficulty: "beginner"
    },
    {
      question: "Why was pressure applied to the contaminated water side in the experiment?",
      answers: {
        a: "To cool the water",
        b: "To push water through the membrane against natural osmosis",
        c: "To mix the contaminants",
        d: "To boil the water"
      },
      correctAnswer: "b",
      difficulty: "beginner"
    },
    {
      question: "In the simulation, increasing the applied pressure caused which of the following?",
      answers: {
        a: "More contaminants to pass through",
        b: "Slower water movement",
        c: "Faster filtration and more purified water",
        d: "No change in output"
      },
      correctAnswer: "c",
      difficulty: "beginner"
    },
    {
      question: "What direction did water move in the reverse osmosis experiment?",
      answers: {
        a: "From contaminated water side to the clean water side",
        b: "From both sides equally",
        c: "From the clean side to the dirty side",
        d: "From clean side to membrane only"
      },
      correctAnswer: "a",
      difficulty: "beginner"
    },
    {
      question: "After performing the experiment, what can you conclude about the effectiveness of reverse osmosis?",
      answers: {
        a: "It increases the concentration of solutes",
        b: "It only works for solid contaminants",
        c: "It effectively removes contaminants using pressure and membrane",
        d: "It is not suitable for water purification"
      },
      correctAnswer: "c",
      difficulty: "beginner"
    },
    {
      question: "If the membrane were damaged or missing, what would happen?",
      answers: {
        a: "Water would still be purified",
        b: "Pressure would not be needed",
        c: "Only heat would be required",
        d: "Contaminants would pass freely to the clean side"
      },
      correctAnswer: "d",
      difficulty: "beginner"
    },
    {
      question: "In your experiment, how did you measure the success of the reverse osmosis process?",
      answers: {
        a: "By checking clarity or solute concentration on both sides",
        b: "By heating the water",
        c: "By comparing volume of water",
        d: "By mixing both sides together"
      },
      correctAnswer: "a",
      difficulty: "beginner"
    },
    {
      question: "Which of the following was NOT a variable you could change in the simulation?",
      answers: {
        a: "Pressure applied",
        b: "Type of membrane",
        c: "Shape of molecules",
        d: "Concentration of contaminants"
      },
      correctAnswer: "c",
      difficulty: "beginner"
    },
    {
      question: "What real-world process is most similar to what you observed in the lab?",
      answers: {
        a: "Water desalination using RO filters",
        b: "Watering plants",
        c: "Boiling water",
        d: "Adding salt to soup"
      },
      correctAnswer: "a",
      difficulty: "beginner"
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
