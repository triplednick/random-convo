const Mustache                  = require('mustache');

(function() {

    const MODAL_TEMPLATE            = '<div class="user-content"><div><span class="modal-full-name">Full name:</span><span class="name-text"> {{name}} {{surname}}</span></div><div><span class="modal-region">Region:</span><span class="region-text"> {{region}}</span></div><div><span class="modal-gender">Gender: </span><span class="gender-text">{{gender}}</span></div></div>';

    const modal = document.getElementById('myModal');
    const span = document.getElementsByClassName("close")[0];

    //api function used to give an element the ability to open and close modal
    const showModal = (view) => {

        const modalHook = document.getElementById('modalHook');
        modalHook.innerHTML = Mustache.render(MODAL_TEMPLATE, view);;
        modal.style.display = "block";
    };

    // Close modal if x button is selected
    span.onclick = () => {
        modal.style.display = "none";
    };

    //Close the modal if its open but user clicks outside of it.
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    module.exports = {
        showModal
    };
})();