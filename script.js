document.addEventListener('DOMContentLoaded', () => {
    // Game Data
    const wordsConfig = [
        { word: 'JAVASCRIPT', category: 'Coding', hint: 'The language of the web.', fact: 'JavaScript was created in just 10 days in May 1995 by Brendan Eich.' },
        { word: 'PYTHON', category: 'Coding', hint: 'Named after a snake, great for AI.', fact: 'Python is named after the British comedy group "Monty Python".' },
        { word: 'CSS', category: 'Coding', hint: 'Used for styling web pages.', fact: 'The first CSS specification was published in 1896, but it took until 2011 for CSS3 to be stable.' },
        { word: 'HTML', category: 'Coding', hint: 'The skeleton of every webpage.', fact: 'HTML was created by Tim Berners-Lee in 1990 while working at CERN.' },
        { word: 'REACT', category: 'Coding', hint: 'A popular library for UI.', fact: 'React was originally developed by Jordan Walke, a software engineer at Facebook.' },
        { word: 'GITHUB', category: 'Coding', hint: 'Where developers host their code.', fact: 'GitHub was founded in 2008 and is now the largest host of source code in the world.' },
        { word: 'ELEPHANT', category: 'Animals', hint: 'The largest land animal.', fact: 'Elephants are the only animals that cannot jump!' },
        { word: 'PENGUIN', category: 'Animals', hint: 'A flightless bird that loves ice.', fact: 'Penguins use a special gland to filter salt out of the water they drink.' },
        { word: 'GIRAFFE', category: 'Animals', hint: 'Has a very long neck.', fact: 'A giraffe\'s heart is 2 feet long and weighs about 25 pounds.' },
        { word: 'OCTOPUS', category: 'Animals', hint: 'Has eight arms and three hearts.', fact: 'Octopuses have blue blood because it is copper-based rather than iron-based.' },
        { word: 'PLATYPUS', category: 'Animals', hint: 'An egg-laying mammal with a bill.', fact: 'The platypus is one of the few mammals that produces venom.' },
        { word: 'CHAMELEON', category: 'Animals', hint: 'Famous for changing color.', fact: 'Chameleons don\'t change color to blend in; they do it to regulate temperature or communicate.' },
        { word: 'MARS', category: 'Space', hint: 'The Red Planet.', fact: 'Mars is home to the tallest mountain in the solar system, Olympus Mons.' },
        { word: 'GALAXY', category: 'Space', hint: 'A massive system of stars and dark matter.', fact: 'There are estimated to be 100 to 400 billion stars in our Milky Way galaxy.' },
        { word: 'ASTRONAUT', category: 'Space', hint: 'A person who travels in space.', fact: 'In space, astronauts can grow up to 2 inches (5 cm) taller because spine vertebrae expand.' },
        { word: 'NEBULA', category: 'Space', hint: 'A giant cloud of dust and gas.', fact: 'Nebulae are often "star nurseries," the birthplaces of new stars.' },
        { word: 'JUPITER', category: 'Space', hint: 'The largest planet in our solar system.', fact: 'Jupiter is twice as massive as all the other planets combined!' },
        { word: 'COMET', category: 'Space', hint: 'A "dirty snowball" of ice and dust.', fact: 'Comets have tails that can be millions of miles long, always pointing away from the sun.' },
        { word: 'AVOCADO', category: 'Fruits', hint: 'Green fruit often used in toast.', fact: 'Avocados are actually berries with a single large seed.' },
        { word: 'STRAWBERRY', category: 'Fruits', hint: 'Red fruit with seeds on the outside.', fact: 'Strawberries are the only fruit that wear their seeds on the outside.' },
        { word: 'PINEAPPLE', category: 'Fruits', hint: 'A tropical fruit with a prickly skin.', fact: 'It can take up to two years for a single pineapple plant to produce one fruit.' },
        { word: 'MANGO', category: 'Fruits', hint: 'Known as the king of fruits.', fact: 'More fresh mangoes are eaten around the world every day than any other fruit!' },
        { word: 'KIWI', category: 'Fruits', hint: 'Small fuzzy fruit, green inside.', fact: 'Kiwi fruit was originally known as Chinese gooseberry.' },
        { word: 'VOLCANO', category: 'Nature', hint: 'An opening in Earth\'s crust.', fact: 'The "Ring of Fire" in the Pacific Ocean contains 75% of the world\'s active volcanoes.' },
        { word: 'RAINBOW', category: 'Nature', hint: 'Colors in the sky after rain.', fact: 'No two people see the exact same rainbow because every eye sees light from different droplets.' },
        { word: 'WATERFALL', category: 'Nature', hint: 'River water falling from a height.', fact: 'The tallest waterfall in the world is Angel Falls in Venezuela, dropping 3,212 feet.' },
        { word: 'GLACIER', category: 'Nature', hint: 'A slow-moving mass of ice.', fact: 'Glaciers store about 69% of the world\'s fresh water.' }
    ];

    // Sound Manager
    const SoundManager = (() => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        function playTone(freq, type, duration, volume = 0.1) {
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = type;
            oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

            if (type === 'sawtooth') {
                oscillator.frequency.exponentialRampToValueAtTime(freq / 4, audioCtx.currentTime + duration);
            } else {
                oscillator.frequency.exponentialRampToValueAtTime(freq / 2, audioCtx.currentTime + duration);
            }

            gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + duration);
        }

        return {
            playCorrect: () => {
                playTone(880, 'sine', 0.1);
                setTimeout(() => playTone(1108.73, 'sine', 0.1), 50);
            },
            playWrong: () => {
                playTone(110, 'sawtooth', 0.3, 0.2);
            },
            playWin: () => {
                const notes = [523.25, 659.25, 783.99, 1046.50];
                notes.forEach((note, i) => {
                    setTimeout(() => playTone(note, 'square', 0.2), i * 150);
                });
            },
            playLoss: () => {
                const notes = [220, 196, 174, 164];
                notes.forEach((note, i) => {
                    setTimeout(() => playTone(note, 'sawtooth', 0.4, 0.2), i * 200);
                });
            },
            playButton: () => playTone(440, 'sine', 0.05, 0.05)
        };
    })();

    // DOM Elements
    const wordDisplay = document.getElementById('word-display');
    const mistakeCountElem = document.getElementById('mistake-count');
    const categoryNameElem = document.getElementById('category-name');
    const hintDisplayElem = document.getElementById('hint-display');
    const timerDisplayElem = document.getElementById('timer-display');
    const keyboardElem = document.getElementById('keyboard');
    const monsterParts = document.querySelectorAll('.monster-part');
    const resetBtn = document.getElementById('reset-btn');
    const overlay = document.getElementById('game-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayMessage = document.getElementById('overlay-message');
    const factSection = document.getElementById('fact-section');
    const factTextElem = document.getElementById('fact-text');
    const correctWordElem = document.getElementById('correct-word');
    const playAgainBtn = document.getElementById('play-again-btn');

    // Game State
    let selectedWord = '';
    let selectedHint = '';
    let selectedFact = '';
    let guessedLetters = [];
    let mistakes = 0;
    const maxMistakes = 6;
    let isGameOver = false;
    let timeLeft = 40;
    let timerInterval = null;

    // Timer Logic
    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = 40;
        updateTimerDisplay();

        timerInterval = setInterval(() => {
            if (!isGameOver) {
                timeLeft--;
                updateTimerDisplay();
                if (timeLeft <= 0) {
                    handleTimeOut();
                }
            } else {
                clearInterval(timerInterval);
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        timerDisplayElem.innerText = timeLeft;
        const timerContainer = timerDisplayElem.parentElement;
        if (timeLeft <= 5) {
            timerContainer.classList.add('critical');
        } else {
            timerContainer.classList.remove('critical');
        }
    }

    function handleTimeOut() {
        isGameOver = true;
        clearInterval(timerInterval);
        setTimeout(() => {
            showOverlay(false, "TIME'S UP!");
            SoundManager.playLoss();
        }, 500);
    }

    // Initialize Game
    function initGame() {
        const randomItem = wordsConfig[Math.floor(Math.random() * wordsConfig.length)];
        selectedWord = randomItem.word;
        selectedHint = randomItem.hint;
        selectedFact = randomItem.fact;
        categoryNameElem.innerText = randomItem.category;
        hintDisplayElem.innerText = 'Guess a letter to start!';
        hintDisplayElem.classList.remove('revealed');
        guessedLetters = [];
        mistakes = 0;
        isGameOver = false;

        startTimer();

        // Reset UI
        mistakeCountElem.innerText = mistakes;
        wordDisplay.innerHTML = '';
        keyboardElem.innerHTML = '';
        overlay.classList.add('hidden');
        overlay.classList.remove('show');
        factSection.classList.add('hidden');

        monsterParts.forEach(part => {
            if (!part.classList.contains('ground')) {
                part.classList.remove('show');
            }
        });

        // Create Word Slots
        for (let char of selectedWord) {
            const slot = document.createElement('div');
            slot.classList.add('letter-slot');
            wordDisplay.appendChild(slot);
        }

        // Create Keyboard
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let char of alphabet) {
            const btn = document.createElement('button');
            btn.classList.add('key');
            btn.innerText = char;
            btn.addEventListener('click', () => handleGuess(char, btn));
            keyboardElem.appendChild(btn);
        }
    }

    function handleGuess(letter, btn) {
        if (isGameOver || guessedLetters.includes(letter)) return;

        guessedLetters.push(letter);
        btn.disabled = true;

        if (selectedWord.includes(letter)) {
            // Correct Guess
            btn.classList.add('correct');
            SoundManager.playCorrect();
            updateWordDisplay(letter);
            checkWin();
        } else {
            // Wrong Guess
            btn.classList.add('wrong');
            SoundManager.playWrong();
            mistakes++;
            updateMistakes();
            checkLoss();
        }
    }

    function updateWordDisplay(lastGuessedLetter) {
        const slots = wordDisplay.querySelectorAll('.letter-slot');
        selectedWord.split('').forEach((char, index) => {
            if (guessedLetters.includes(char)) {
                slots[index].innerText = char;
                slots[index].classList.add('revealed');
                if (char === lastGuessedLetter) {
                    slots[index].classList.add('correct-reveal');
                }
            }
        });
    }

    function updateMistakes() {
        mistakeCountElem.innerText = mistakes;

        // Hint Logic: Show hint after 3 mistakes
        if (mistakes >= 3) {
            hintDisplayElem.innerText = `Hint: ${selectedHint}`;
            hintDisplayElem.classList.add('revealed');
        }

        // Show monster parts sequentially
        // Parts order: base, body-main, eye left, eye right, mouth, horns
        const partsToShow = [
            'base',
            'body-main',
            'eye.left',
            'eye.right',
            'mouth',
            'horn'
        ];

        if (mistakes <= maxMistakes) {
            const partClass = partsToShow[mistakes - 1];
            if (partClass === 'horn') {
                // Show both horns together as the last step
                document.querySelectorAll('.horn').forEach(h => h.classList.add('show'));
            } else if (partClass) {
                const part = document.querySelector(`.monster-part.${partClass}`);
                if (part) part.classList.add('show');
            }
        }
    }

    function checkWin() {
        const isWon = selectedWord.split('').every(char => guessedLetters.includes(char));
        if (isWon) {
            isGameOver = true;
            clearInterval(timerInterval);
            setTimeout(() => {
                showOverlay(true);
                SoundManager.playWin();
                triggerConfetti();
            }, 500);
        }
    }

    function checkLoss() {
        if (mistakes >= maxMistakes) {
            isGameOver = true;
            clearInterval(timerInterval);
            setTimeout(() => {
                showOverlay(false);
                SoundManager.playLoss();
            }, 500);
        }
    }

    function showOverlay(isWin, customTitle = null) {
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('show'), 10);

        overlayTitle.innerText = customTitle || (isWin ? 'YOU RESCUED GLOWY!' : 'GLOWY IS TRAPPED!');
        overlayTitle.style.color = isWin ? 'var(--accent-primary)' : 'var(--accent-secondary)';
        overlayMessage.innerText = isWin ? 'Amazing job! Glowy is so happy!' : 'Oh no! Better luck next time.';
        correctWordElem.innerText = selectedWord;

        if (isWin) {
            factTextElem.innerText = selectedFact;
            factSection.classList.remove('hidden');
        } else {
            factSection.classList.add('hidden');
        }
    }

    function triggerConfetti() {
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#bf5af2', '#0a84ff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff375f', '#0a84ff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    // Physical Keyboard Support
    window.addEventListener('keydown', (e) => {
        if (isGameOver) return;
        const letter = e.key.toUpperCase();
        if (/^[A-Z]$/.test(letter)) {
            // Find the button in the keyboard UI
            const btns = Array.from(keyboardElem.querySelectorAll('.key'));
            const btn = btns.find(b => b.innerText === letter);
            if (btn && !btn.disabled) {
                handleGuess(letter, btn);
            }
        }
    });

    resetBtn.addEventListener('click', () => {
        SoundManager.playButton();
        initGame();
    });

    playAgainBtn.addEventListener('click', () => {
        SoundManager.playButton();
        initGame();
    });

    initGame();
});
