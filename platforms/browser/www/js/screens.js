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
            <input type="text" id="guess-input" placeholder="Enter your guess">
            <button onclick="submit_guess()">Submit</button>
            <div id="guesses">
            </div>
        </div>
    `);

    document.getElementById('guess-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            submit_guess();
            this.value = '';
        }
    });

    if (is_new_day()) {
        store_day();
        clear_guesses();
    }
    add_guesses();
}

