function screen(title="screen", content="") {
    document.getElementById('title').innerHTML = title;
    document.getElementById('content').innerHTML = content;
    
}

function main_page() {
    screen(
        title="Main Page",
        content=`
        <div id="main-page">
            <h1>Word of the Day</h1>
            <button onclick="get_todays_word()">Get Today's Word</button>
            <div id="daily-word"></div>
        </div>
    `);
}


function guess_page() {
    screen(
        title="Cémantix",
        content=`
        <div id="guess-page">
            <h1>Le mot</h1>
            <div id="guess-word"></div>
            <input class="input" type="text" id="guess-input" placeholder="Essayer un mot..."></input>
            <button class="input" id="button-input">
            <span>Envoyer</span>
            </button>

            <div id="example">
                <div class="word-guess" id="example-guess">
                    <span class="word">Mot</span>
                    <span class="distance">Distance</span>
                    <span class="closer-count">+ Proches</span>
                </div>
            </div>
            <div id="guesses">
            </div>
        </div>
    `);

    
    let guess_input = document.getElementById('guess-input');
    let button_input = document.getElementById('button-input');

    guess_input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            submit_guess();
            this.value = '';
        }
    });
    button_input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            submit_guess();
            guess_input.value = '';
        }
    });
    button_input.addEventListener('click', function(event) {
        submit_guess();
        guess_input.value = '';
    });


    if (is_new_day()) {
        store_day();
        clear_guesses();
    }
    add_guesses();
}

