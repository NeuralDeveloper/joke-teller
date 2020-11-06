const button = document.getElementById('button')
const audioElement = document.getElementById('audio');

//Disable or enable buttton
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing joke to voiceaPI
function tellMeJoke (joke){
    VoiceRSS.speech({
        key: '76d04a2e66b6421fb13ff99a2539bc78',
        src: joke,
        hl: 'en-us',
        v: 'Mary',
        r: -2, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Get jokes from joke API
async function getJokesFromAPI() {
    let joke ='';
    const apiUrl= 'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else{
            joke = data.joke;
        }
        //text-to-speech
        tellMeJoke(joke);
        //disable button
        toggleButton();
    } catch (error) {
        // catch errors here
        console.log('whoos', error);
    }
}

// Event Listener
button.addEventListener('click', getJokesFromAPI);
audioElement.addEventListener('ended', toggleButton);