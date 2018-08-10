/*

Use key events to listen for the letters that your players will type.

Display the following on the page:

Press any key to get started!

Wins: (# of times user guessed the word correctly).

   * If the word is `madonna`, display it like this when the game starts: `_ _ _ _ _ _ _`.

   * As the user guesses the correct letters, reveal them: `m a d o _  _ a`.

Number of Guesses Remaining: (# of guesses remaining for the user).

Letters Already Guessed: (Letters the user has guessed, displayed like `L Z Y H`).

After the user wins/loses the game should automatically choose another word and make the user play it.

##### Word Guess Game Bonuses

1. Play a sound or song when the user guesses their word correctly, like in our demo.
2. Write some stylish CSS rules to make a design that fits your game's theme.
3. **HARD MODE:** Organize your game code as an object, except for the key events to get the letter guessed. This will be a challenge if you haven't coded with JavaScript before, but we encourage anyone already familiar with the language to try this out.
*/


const currentWord = document.querySelector('#currentWord');
const wins = document.querySelector('#wins');
const guessRemEl = document.querySelector('#guessRemaining');

let winCounter = 0; // stores how many times user wins
let guessRemaining = 11; // stores guess remaining counter
let guessedLetters = []; // stores what letter user has guessed

let letterArray = []; // empty array will contain letter of random word
let letters = ''; // empty string will contain letter of random word
let randomWord; // stores random word

// dictionary array stores words that could be a word user must guess
let dictionary = [
	'variables',
	'conditionals',
	'loops',
	'arrays',
	'functions',
	'boolean'
];

// sets wins on document
wins.textContent = winCounter;
// sets number of guesses remaining on document
guessRemEl.textContent = guessRemaining;

// Function takes an array (in this case dictionary array)
// returns a random value from array
const getRandomWord = (arr) => {
	let ranNum = Math.floor(Math.random() * arr.length);
	return arr[ranNum];
};


randomWord = getRandomWord(dictionary); // gets random word each time function is called


const displayWord = () =>{
	for(let i = 0; i < randomWord.length; i++) {
		letterArray.push('_');
		letters += letterArray[i] + " ";
	}
	// sets current word on document
	currentWord.textContent = letters;
};

// guess function takes a single letter string
const guess = (letter) => {
	// sets letter string to lowercase
	letter = letter.toLowerCase();

	// stores indexes of where letter is found
	let numOfIndexLoc = [];

	// checks if letter has been guessed 	
	if(guessedLetters.indexOf(letter) < 0) {
		// if not append letter to array
		console.log("the letter you guessed is: " + letter);
		guessedLetters.push(letter);
	}

	// index finder
	let idx = randomWord.indexOf(letter);

	// while the letter index is found in randomWord
	while(idx != -1) {
		numOfIndexLoc.push(idx); // push each letter location on numOfIndex Array
		idx = randomWord.indexOf(letter, idx + 1); // check next index
	}

	// return array of each index location of letter
	return numOfIndexLoc;

};

// function takes an array and the key pressed from user
const handleGuess = (array, key) => {
	// checks if array contains values
	if(array.length > 0) {
		// loops through each item in array
		for(let i in array){
			// change the random word array
			letterArray[array[i]] = key;
		}
		console.log(letterArray);
	}
};

// function compares two array
const hasWon = (array1, array2) => {
	// if the length of array 1 is not equal to array 2
	if(array1.length !== array2.length)
		return false; // return false (user has not won yet)

	// loop through both arrays
	for(let i = array1.length; i--;){
		// if the value in each index of array 1 is not equal
		// to array 2 
		if(array1[i] !== array2[i])
			// return false (user has not won)
			return false;
	}

	// if both arrays are the same length and value return true
	// (user has won)
	return true;
};


const update = () => {

	if(hasWon(randomWord, letterArray)){
		winCounter += 1;
		guessRemaining = 11;
		randomWord = getRandomWord(dictionary);
		letters = '';
		letterArray = [];
		displayWord();
	}

	// sets wins on document
	wins.textContent = winCounter;
	// sets number of guesses remaining on document
	guessRemEl.textContent = guessRemaining;
	
	letters = '';
	for(let item in letterArray) {
		letters += letterArray[item] + " ";
	}

	// sets current word on document
	currentWord.textContent = letters;
};


displayWord();
update();

// if user presses any key
document.onkeyup = (e) => {
	// stores user key press in lowercase
	let keyGuess = e.key.toLowerCase();

	// if user presses shift or any key with more then one character
	// it will not run
	if(keyGuess.length <= 1){
		// gets an array of the location letter is at
		let letterGuess = guess(keyGuess);

		// if the letter is found
		if(letterGuess.length > 0) {
			// handle guess
			handleGuess(letterGuess, keyGuess);
			update();
		} else {
			// if user guesses wrong, user number of guesses remaining decrease by 1
			guessRemaining--;
			update();
		}

	}

};

