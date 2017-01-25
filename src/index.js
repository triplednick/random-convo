const axios     = require('axios'),
    util        = require('./util'),
    Chatter     = require('./Chatter');

/*
const AVATAR_URL = 'https://api.adorable.io/avatars/46/test';
const DEFAULT_OBJ = {
    imgURL: AVATAR_URL,
    chatterData: {
        name: 'Jane',
        surname: 'Doe',
        region: 'USA',
        gender: 'female'
    }
};
*/

const interval = setInterval(function() { 
    axios.get('/getChatter').then(function(response) {
        const {chatterData:chatterData, imgURL:imgURL } = response.data;
        //console.log('000000');
        //console.log(chatterData);
        //console.log(imgURL);
        util.getMessage(new Chatter({
            chatterData,
            imgURL
        }));
    }).catch(function(e) {
        console.log(e);
    });   
}, 3000);