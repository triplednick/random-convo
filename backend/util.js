'use strict';

const axios = require('axios');
 
(function() {

    const NAME_URL = 'https://uinames.com/api/';
    const WORD_URL = 'http://randomword.setgetgo.com/get.php';

    const PIXEL_SIZE = '46/';
    const AVATAR_URL = 'https://api.adorable.io/avatars/';

    const DEFAULT_WORD = 'blah';
    const DEFAULT_PERSON = {
        name: 'Jane',
        surname: 'Doe',
        gender: 'female',
        regione: 'United States'
    };

    const util = {};
    
    util.getImgURL = (chatterData) => {
        console.log('made it to getImgURL');
        const finalURL = AVATAR_URL + PIXEL_SIZE + chatterData.name + chatterData.surname + chatterData.region;
        console.log('getImgURL: ' + finalURL);
        return finalURL;
    };

    util.getSentence = () => {
        console.log('made it to getSentence');

        return new Promise(function(resolve, reject) {

            const numWords = Math.floor(Math.random() * (20 - 3) + 3);
            const words = [];
            let sentence = ''
            
            console.log('numWords length: ' + numWords);
            
            for(let i = 0; i < numWords; i++) {
                const getWord = axios.get(WORD_URL);
                getWord.then(function (response) {
                    words.push(response.data);
                })
                .catch(function (error) {
                    reject(DEFAULT_WORD);
                });       
            }

            setTimeout(function() {
                const finalStr = words.join(' ') + '.';
                console.log('final string: ' + finalStr);
                resolve(finalStr);
            }, 300);
            
        });
    };

    util.getChatter = () => {
        return axios.get(NAME_URL);
    };

    module.exports = util;
})()