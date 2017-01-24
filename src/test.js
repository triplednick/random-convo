const Chatter = require('./Chatter');
const axios = require('axios');
const Mustache = require('mustache');

const AVATAR_URL = 'https://api.adorable.io/avatars/46/test';

const DEFAULT_PERSON = {
        name: 'Jane',
        surname: 'Doe',
        gender: 'female',
        regione: 'United States'
    };

const DEFAULT_OBJ = {
    imgURL: AVATAR_URL,
    chatterData: {
        name: 'Jane',
        surname: 'Doe',
        region: 'USA',
        gender: 'female'
    }
};

const promise = axios.get('/getChatter');

let nick;

promise.then(function(person){
    
    const personData = person.data;
    
    nick = new Chatter(personData);
    
    nick.saySomething().then(function (response) {
        console.log('say something was success');
        const data = response.data;
        const sentence = data['sentence'];
        renderStache(nick, sentence);
    })
    .catch(function (error) {
        console.log('resolving on client Chatter end with error:' + error);
        return SENTENCE;
    });

    
}).catch(function (error) {
    console.log("making nick was error");
    nick = new Chatter(DEFAULT_OBJ);
    nick.saySomething().then(function (response) {
        console.log('say something was success');
        const data = response.data;
        const sentence = data['sentence'];
        renderStache(nick, sentence);
    })
    .catch(function (error) {
        console.log('resolving on client Chatter end with error:' + error);
        return SENTENCE;
    });
});
let turn = true;
function renderStache(chatter, sentence) {
    
    const {name:name, imgURL:imgURL, surname:surname } = chatter;
    
    const view = {
        name,
        imgURL,
        surname,
        sentence
    };

    
    const chatBox = document.getElementById('chatBox');
    const newDiv = document.createElement('div');
    
    if(turn){
        turn = false;
        newDiv.classList.toggle('left-side');
        const leftSideAvatar = Mustache.render('<img class="avatar-img" src={{imgURL}} alt="{{name}} {{surname}} Avatar" height="46" width"46"></img> <p><span>{{sentence}}</span></p>', view);
        newDiv.innerHTML = leftSideAvatar;   
        chatBox.insertBefore(newDiv, chatBox.childNodes[0]); 
    }else {
        turn = true;
        newDiv.classList.toggle('right-side');
        const rightSideAvatar = Mustache.render('<div class="right-side"><img class="avatar-img" src={{imgURL}} alt="{{name}} {{surname}} Avatar" height="46" width"46"></img> <p><span>{{sentence}}</span></p></div>', view);
        newDiv.innerHTML = rightSideAvatar;
        chatBox.insertBefore(newDiv, chatBox.childNodes[0]);
    }
}
