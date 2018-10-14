//GET PAGE/FORM ELEMENTS
var participant = document.getElementById('participants');
var addParticipant = document.getElementById('add-participant');
var participantList = document.getElementById('participant-list');
var discussionDescription = document.getElementById('discussion-description');
var addDiscussion = document.getElementById('add-discussion');
var discussionSection = document.querySelector('#discussions .container');
var showFormButton = document.querySelector('.show-form');
var formElement = document.getElementById('form-section');

//CREATE ARRAY TO STORE PARTICIPANTS
var participants = [];

// Create Click handlers

//ADD PARTICIPANT BUTTON
addParticipant.addEventListener('click', getParticipant);

//ADD DISCUSSION BUTTON
addDiscussion.addEventListener('click', addDiscussionAndParticipants);

//SHOW FORM BUTTON
showFormButton.addEventListener('click', showForm);

hideForm();

// store participants in an array -- push into this
function getParticipant(event) {
    event.preventDefault();
    var participantName = participant.value;
    participants.push(participantName);
    displayParticipants(participants);
    participant.value = '';
}

//SHOW THE USER THAT THE PARTICIPANT HAS BEEN ADDED
function displayParticipants(participants) {
    for (var i = 0; i < participants.length; i++) {
        var listItem = document.createElement('li');
        var listItemContent = document.createTextNode(participants[i]);
        listItem.appendChild(listItemContent);
        // console.log(listItemContent);
    }
    participantList.appendChild(listItem);
}

//ADD THE DISCUSSION
function addDiscussionAndParticipants(e) {
    event.preventDefault();

    // create a discussion object
    var discussion = {
        'discussion_description': discussionDescription.value,
        participants: participants
    }
    createDiscussionElements(discussion);
    removeParticipants();

    //CLEAR THE TEXTAREA
    discussionDescription.value = '';

    //CLEAR THE PARTICIPANTS ARRAY
    for (var i = -1; i <= discussion.participants.length; i++) {
        discussion.participants.shift();
    }
    hideForm();
}

//function to create dom elements from discussion object
//and append the discussion (includes participants and discussion) to DOM in Card form
function createDiscussionElements(discussion) {
    var article = document.createElement('article');
    var discussionHeading = document.createElement('h2');
    var discussionParticipantsDiv = document.createElement('div');
    var discussionDescriptionDiv = document.createElement('div');
    var discussionParticipantsList = document.createElement('ul');
    var discussionParagraph = document.createElement('p');
    var closeButtonSpan = document.createElement('span');
    var closeButton = document.createTextNode('x');

    var discussionHeadingText = document.createTextNode('Discussion Needed');
    var discussionParagraphText = document.createTextNode(discussion.discussion_description);

    closeButtonSpan.appendChild(closeButton);
    discussionHeading.appendChild(discussionHeadingText);
    discussionParagraph.appendChild(discussionParagraphText);
    discussionDescriptionDiv.appendChild(discussionParagraph);

    //LOOP THROUGH THE PARTICIPANTS TO CREATE LIST ITEMS
    for (var i = 0; i < discussion.participants.length; i++) {
        var li = document.createElement('li');
        var liText = document.createTextNode(discussion.participants[i]);
        li.appendChild(liText);
        discussionParticipantsList.appendChild(li);
    }
    //ADD ALL LIST ITEMS TO THE LIST
    discussionParticipantsDiv.appendChild(discussionParticipantsList);

    //ADD CLICK HANDLER TO CLOSE BUTTON..AKA THE X
    closeButtonSpan.addEventListener('click', removeArticle);

    //APPEND ELEMENTS TO THE INDIVIDUAL ARTICLE/CARD
    article.appendChild(closeButtonSpan);
    article.appendChild(discussionHeading);
    article.appendChild(discussionParticipantsDiv);
    article.appendChild(discussionDescriptionDiv);

    //APPEND THE ARTICLE TO THE DOM
    discussionSection.appendChild(article);
}

//DELETE THE THE DISCUSSION NEEDED CARD
function removeArticle() {
    var thisArticle = this.parentElement;
    thisArticle.remove();
    console.log(thisArticle);
}

//TAKES THE PARTICPANT LIST OUT OF THE DOM
function removeParticipants() {
    while (participantList.firstChild) {
        participantList.removeChild(participantList.firstChild);
    }
}

function hideForm() {
    //hide the form
    formElement.style.display = 'none';
    //show the show-form button
    showFormButton.style.display = 'inline-block';
}

function showForm() {
    //show the form
    formElement.style.display = 'block';
    //hide the show-form button
    showFormButton.style.display = 'none';
}



// and add to db -- once I set that up after all this

