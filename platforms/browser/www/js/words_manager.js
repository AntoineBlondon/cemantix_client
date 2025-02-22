function update_word(word) {
    document.getElementById('daily-word').innerHTML = word;
}

function submit_guess() {
    let guess = document.getElementById('guess-input').value;
    console.log('guess:', guess);
    send_guess(guess);

}

function store_day() {
    localStorage.setItem('day', new Date().toISOString().split('T')[0]);
}

function is_new_day() {
    return localStorage.getItem('day') !== new Date().toISOString().split('T')[0];
}



function store_guesses(guesses) {
    localStorage.setItem('guesses', JSON.stringify(guesses));
}

function store_new_guess(guess) {
    let guesses = get_guesses();
    if (guesses) {
        guesses.push(JSON.stringify(guess));
    } else {
        guesses = [JSON.stringify(guess)];
    }
    store_guesses(guesses);
}
function get_guesses() {
    return JSON.parse(localStorage.getItem('guesses'));
}

function clear_guesses() {
    localStorage.removeItem('guesses');
}


function add_guess(guess) {
    let guess_element = document.createElement('div');
    guess_element.classList.add('word-guess');
    guess_element.innerHTML = `
        <span class="word">${guess.guess}</span>
        <span class="distance">${Math.round(guess.distance * 100)}</span>
        <span class="closer-count">${guess.words_closer_count}</span>
    `;

    let guess_list = document.getElementById('guesses');
    let inserted = false;

    // Find the correct position to insert
    let children = guess_list.children;
    for (let i = 0; i < children.length; i++) {
        let child_distance = parseFloat(children[i].querySelector('.distance').textContent);
        if (guess.distance*100 < child_distance) {
            guess_list.insertBefore(guess_element, children[i]);
            inserted = true;
            break;
        }
    }

    // If no smaller distance was found, append at the end
    if (!inserted) {
        guess_list.appendChild(guess_element);
    }
}


function add_guesses() {
    let guesses = get_guesses();
    if (guesses) {
        // Parse the stored guesses
        guesses = guesses.map(g => JSON.parse(g));

        // Clear the current list before adding sorted guesses
        document.getElementById('guesses').innerHTML = '';

        // Add sorted guesses to the page
        guesses.forEach(guess => {
            add_guess(guess);
        });
    }
}


function guess_already_made(guess) {
    let guesses = get_guesses();
    if (guesses) {
        for (let i = 0; i < guesses.length; i++) {
            let storedGuess = JSON.parse(guesses[i]);
            console.log('storedGuess:', storedGuess, 'guess:', guess);
            if (storedGuess && storedGuess.guess === guess.guess) {
                return true;
            }
        }
    }
    return false;
}




function update_guesses_with(guess) {
    if (guess_already_made(guess)) {
        return;
    }
    add_guess(guess);
    store_new_guess(guess);
}