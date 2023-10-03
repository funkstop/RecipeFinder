let searchInput, searchButton, randomButton;
let speechRec;
let speech;
let isListening = false; // Flag to manage the listening state
let stopSpeechButton;



function setup() {
    noCanvas();

    // Reference to DOM Elements
    searchInput = select('#search-input');
    searchButton = select('#search-btn');
    randomButton = createButton('Surprise Me with a Random Recipe!');

    // Event Listeners
    searchButton.mousePressed(getRecipes);
    searchInput.elt.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            getRecipes();
        }
    });
    randomButton.mousePressed(getRandomRecipe);

    // Positioning Random Button
    randomButton.parent('random-recipe-section');

    // Initialize Speech Recognition and Synthesis
    speechRec = new p5.SpeechRec('en-US', gotSpeech);
    //speechRec.start(true, false); // Start continuous recognition with interim results
    speech = new p5.Speech();

    stopSpeechButton = createButton('Stop Speaking');
    stopSpeechButton.id('stop-speaking'); // Assign an id to the button
    stopSpeechButton.parent('button-section'); // Assume 'button-section' is an existing DOM element ID
    stopSpeechButton.mousePressed(stopSpeech);

    // Start/Stop Listening Button
    document.getElementById('toggle-listening').addEventListener('click', function() {
        toggleListening(this);
    });

}

  
  function draw() {
    let cards = selectAll('.recipe-card');
    cards.forEach(card => {
      card.mouseOver(() => animateCard(card));
    });
  }
  
  function animateCard(card) {
    // Animation logic for a single card
    card.style('background-color', '#ffffff');
    card.mouseOut(() => card.style('background-color', '#ffe0bd'));
  }

  
  function readRecipeDetails(title, summary) {
    speech.speak(`Title: ${title}. Summary: ${summary}`);
  }

  function toggleListening(buttonElement) {
    if (isListening) {
        console.log('Stopped Listening');
        speechRec.stop();
        buttonElement.innerText = 'Start Listening';
    } else {
        console.log('Listening...');
        speechRec.start(true, false);
        buttonElement.innerText = 'Stop Listening';
    }
    isListening = !isListening; // Invert the flag
}

function gotSpeech() {
    if (speechRec.resultValue) {
        const input = speechRec.resultString;
        // Use 'input' to search for recipes
        searchInput.value(input);
        getRecipes();
    }
}

function stopSpeech() {
    speech.cancel(); // Stops speech immediately
}
