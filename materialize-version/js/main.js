$(document).ready(function() {
    //Initialize Materialize Mobile Nav
    $(".button-collapse").sideNav({
        edge: 'right'
    });
    //Initialize Materialize Select Drop Down
    $('select').material_select();
    $('.show-form-btn').hide();
    addEventListeners();
});

//Function to add event listeners to elements
function addEventListeners() {
    $('#add-form .add-btn').click(function() {
        createDiscussionObject();
        clearFields();
    });

    $('.close-form').on('click', function() {
        closeFormButton();
    });

    $('.show-form-btn').on('click', function() {
        showFormButton();
    });
};

//Function to add form values to an object
function createDiscussionObject() {
    //select dropdown creates an array, participants
    var participants = $('#participants').val();
    var description = $('#discussion_description').val();
    var discussion = {
        participants: participants,
        description: description
    };
    createDomElements(discussion);
};

//Function to create DOM elements from the Discussion Object
function createDomElements(discussion) {
    //create DOM elements
    var $li = $('<li>').addClass('collection-item');
    var $spanParticipants = $('<span>').addClass('disc-particpants');
    var $spanDescription = $('<span>').addClass('disc-description');
    var $buttonContainer = $('<span>').addClass('btn-container');
    var $deleteBtn = $('<i>').addClass('material-icons close');
    var $editBtn = $('<i>').addClass('material-icons edit-btn');

    //Add the text to each element
    $spanParticipants.text(discussion.participants.join(', '));
    $spanDescription.text(discussion.description);
    $deleteBtn.text('delete');
    $editBtn.text('edit');
    $buttonContainer.append($editBtn, $deleteBtn);
    $li.append($spanParticipants, $spanDescription, $buttonContainer);
    appendListToDOM($li);
};


//Function to append the list to the DOM
function appendListToDOM($li) {
    var $ul = $('ul.collection');
    $li.appendTo($ul);
    deleteListItem();
    editDiscussion();
};

//Function to clear the form fields
function clearFields() {
    var select = $('select');
    var textarea = $('textarea');
    textarea.val('');
    select.prop('selectedIndex', 0); //Sets the first option as selected
    select.material_select();
};

//Function to delete a list item/ delete button click handler
function deleteListItem() {
    $('.close').on('click', function() {
        var self = $(this);
        self = self.parent();
        self.remove();
    });
};

// function to hide the form and display the show form button
function closeFormButton() {
    clearFields();
    $('#add-section').hide();
    $('.show-form-btn').show();
};

//Function to show the form and hide the show form button
function showFormButton() {
    $('#add-section').show();
    $('.show-form-btn').hide();
};

function editDiscussion() {
    $('.edit-btn').on('click', function() {
        var parent = $(this).parent();
        var uncles = parent.prevAll();
        $('.add-btn').text('Update');

        var list_participants = $(uncles[1]).text();
        var list_description = $(uncles[0]).text();
        $('textarea').val(list_description);

        console.log(list_participants, list_description);
    });

};