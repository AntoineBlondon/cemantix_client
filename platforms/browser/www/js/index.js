/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

document.addEventListener('deviceready', onDeviceReady, false);


const BASE_URL = 'http://127.0.0.1:5000';


document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    guess_page();
}



async function get_todays_word() {

    cordova.plugin.http.setDataSerializer('json'); // Set the serializer to JSON
    cordova.plugin.http.sendRequest(`${BASE_URL}/daily-random-word`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Explicitly set the Content-Type header
        },
        data: {},
    }, response => {
        let word = JSON.parse(response.data).daily_random_word;
        console.log('word:', word);
        update_word(word);
        
    }, response => {
        console.error('Failed to fetch daily word: ', response.error);
    });
}

async function send_guess(word) {
    cordova.plugin.http.setDataSerializer('json'); // Set the serializer to JSON
    cordova.plugin.http.sendRequest(`${BASE_URL}/guess`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Explicitly set the Content-Type header
        },
        data: {
            guess: word
        },
    }, response => {
        update_guesses_with(JSON.parse(response.data));
        
    }, response => {
        console.error('Failed to guess: ', response.error);
    });
}