const currentWord = document.querySelector('#currentWord');
const wins = document.querySelector('#wins');
const guessRemEl = document.querySelector('#guessRemaining');
const alreayGuessed = document.querySelector('#alreayGuessed');

var game = {
	winCounter: 0, // stores guess remaining counter
	guessRemaining: 11, // stores what letter user has guessed
	guessedLetters: [], // empty array will contain letter of 

	letterArray: [], // empty string will contain letter of random 
	letters: '', // stores random word
	randomWord: '',

	// dictionary array stores words that could be a word user must guess	
	dictionary: [
		'variables',
		'conditionals',
		'loops',
		'arrays',
		'functions',
		'boolean'
	],

	// Function takes an array (in this case dictionary array)
	// returns a random value from array
	getRandomWord: (arr) =>{
		let ranNum = Math.floor(Math.random() * arr.length);
		return arr[ranNum];
	},

	// function displays the letter (_ _ _ ) in that format on document
	displayWord: () => {
		// loops through the random word array
		for(let i = 0; i < game.randomWord.length; i++){
			game.letterArray.push('_');
			game.letters += game.letterArray[i] + " ";
		}
		currentWord.textContent = game.letters;
	},

	// guess function takes a single letter string
	guess: (letter) => {
		// stores indexes of where letter is found
		let numOfIndexLoc = []; 
		// index finder
		let idx = game.randomWord.indexOf(letter);

		// sets letter string to lowercase
		letter = letter.toLowerCase();

		// checks if letter has been guessed 	
		if(game.guessedLetters.indexOf(letter) < 0) {
			// if not append letter to array
			console.log("The letter you guessed is: " + letter);
			game.guessedLetters.push(letter);
		}

		// while the letter index is found in randomWord
		while(idx != -1){
			numOfIndexLoc.push(idx); // push each letter location on numOfIndex Array
			idx = game.randomWord.indexOf(letter, idx + 1); // check next index
		}

		// return array of each index location of letter
		return numOfIndexLoc;
	},

	// function takes an array and the key pressed from user
	handleGuess: (array, key) => {
		// checks if array contains values
		if(array.length > 0) {
			// loops through each item in array
			for(let i in array){
				// change the random word array
				game.letterArray[array[i]] = key;
			}
			console.log(game.letterArray);
		}
	},

	// function compares two array
	hasWon: (array1, array2) => {
		// if the length of array 1 is not equal to array 2
		if(array1.length !== array2.length)
			return false; // return false (user has not won yet)

		// loop through both arrays
		for(let i = array1.length; i--;){
			// if the value in each index of array 1 is not equal to array 2
			if(array1[i] !== array2[i])
				// return false (user has not won)
				return false;
		}

		// if both arrays are the same length and value return true (user has won)
		return true;		
	},

	// function checks if user has lost
	hasLost: () => {
		// if user has guessed wrong 11 times
		if (game.guessRemaining <= 0) 
			return true; // user has lost; return true
		return false; // otherwise user keeps playing		
	},

	// function resets statuses & gets new word
	reset: () => {
		game.guessRemaining = 11;
		game.randomWord = game.getRandomWord(game.dictionary);
		game.letters = '';
		game.letterArray = [];
		game.guessedLetters = [];
		game.displayWord();	
	},

	// function updates game
	update: () => {
		let guessedLetterString = '';
		// if user has won
		if(game.hasWon(game.randomWord, game.letterArray)){
			game.winCounter++; // increase number of wins
			game.reset(); // reset screen
		}

		// if user has lost
		if(game.hasLost()){
			game.winCounter--; // decrease number of wins
			game.reset(); // reset screen
		}

		// loops through each guessed letter array	
		for(let item in game.guessedLetters)
			// converts that into a string and assigns it to variable
			guessedLetterString += game.guessedLetters[item] + " " ;

		// displays it on document
		alreayGuessed.textContent = guessedLetterString ;

		// sets wins on document
		wins.textContent = game.winCounter;
		// sets number of guesses remaining on document
		guessRemEl.textContent = game.guessRemaining;
		
		// resets the letters variable
		game.letters = '';
		// loops through each item in letterArray
		for(let item in game.letterArray) 
			// converts each item and assigns it to letters
			game.letters += game.letterArray[item] + " ";

		// sets current word on document
		currentWord.textContent = game.letters;	
	},

	// function lets you start game
	start: () => {
		// gets random word each time function is called
		game.randomWord = game.getRandomWord(game.dictionary);
		
		// display the status of game
		game.displayWord();

		// if user presses any key
		document.onkeyup = (e) => {
			// stores user key press in lowercase
			let keyGuess = e.key.toLowerCase();

			// if user presses shift or any key with more then one character it will not run
			if(keyGuess.length <= 1){
				// gets an array of the location letter is at
				let letterGuess = game.guess(keyGuess);

				// if the letter is found
				if(letterGuess.length > 0) {
					// handle guess
					game.handleGuess(letterGuess, keyGuess);
					game.update(); // update game
				} else {
					// if user guesses wrong, user number of guesses remaining decrease by 1
					game.guessRemaining--;
					game.update(); // update game
				}
			}
		};
	}
};
game.start();
