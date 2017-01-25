const Mustache      = require('mustache');
const modalHandler  = require('./modal');  

(function() {
      
    const MESSAGE_TEMPLATE_LEFT     = '<div class="img-container-left"><img class="avatar-img" src={{imgURL}} alt="{{name}} {{surname}} Avatar" height="46" width"46"></img></div><div class="msg-container-right"><p><span>{{sentence}}</span></p></div><div class="blank-spot-right"></div>';
    const MESSAGE_TEMPLATE_RIGHT    = '<div class="blank-spot-left"></div><div class="img-container-right"><img class="avatar-img" src={{imgURL}} alt="{{name}} {{surname}} Avatar" height="46" width"46"></img></div><div class="msg-container-left"><p><span>{{sentence}}</span></p></div>';
    
    const chatBox                   = document.getElementById('chatBox');
    let side                        = true;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    
    const getOffsetTop = (elem) => {
        var offsetTop = 0;
            
        do {
            if(!isNaN(elem.offsetTop)){
                offsetTop += elem.offsetTop;
            }
        } while( elem = elem.offsetParent );
            
        return offsetTop;
    };
    
    const getOffsetLeft = (elem) => {
        var offsetLeft = 0;
            
        do {
            if(!isNaN(elem.offsetLeft)) {
                offsetLeft += elem.offsetLeft;
            }
        } while( elem = elem.offsetParent );

        return offsetLeft;
    };

    const renderStache = (chatter, sentence) => {
        
        const {name:name, imgURL:imgURL, surname:surname, region:region, gender:gender } = chatter;
        
        sentence = capitalizeFirstLetter(sentence);
        
        const view = {
            name,
            imgURL,
            surname,
            sentence
        };
    
        const newDiv = document.createElement('div');
        
        newDiv.classList.toggle('msg-parent');
        
        if(side) {
            side = false;
            newDiv.innerHTML = Mustache.render(MESSAGE_TEMPLATE_LEFT, view);
        }else {
            side = true;
            newDiv.innerHTML = Mustache.render(MESSAGE_TEMPLATE_RIGHT, view);
        }

        newDiv.addEventListener('click', (e) => {
            modalHandler.showModal({
                name,
                surname,
                region,
                gender  
            });
        });
        
        chatBox.appendChild(newDiv);

        //const offsetTop = getOffsetTop(newDiv);
        //const offsetLeft = getOffsetLeft(newDiv);
        //window.scrollTo(offsetLeft, offsetTop);
    };

    const getMessage = (chatter) => {
         chatter.saySomething().then(function(response) {
            const { sentence } = response.data;
            console.log('rendering stache with: ' + sentence);
            renderStache(chatter, sentence);
        }).catch(function(e) {
            console.log(e);
        });
    };

    module.exports = { getMessage };
})();

