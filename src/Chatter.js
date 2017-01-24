const axios = require('axios');
const SENTENCE = 'BLAH';

const Chatter = function Chatter(chatter) {
    
    this.imgURL = chatter.imgURL;    
    this.name = chatter.chatterData.name;
    this.surname = chatter.chatterData.surname;
    this.region = chatter.chatterData.region;
    this.gender = chatter.chatterData.gender;
}

Chatter.prototype.saySomething = function() {
    
    let returnStr = '';
    return axios.get('/getSentence');
    
};

Chatter.prototype.toString = function() {
    console.log('My name is ' + this.name + ' ' + this.surname + ' and my img url is: ' + this.imgURL);
};

module.exports = Chatter;