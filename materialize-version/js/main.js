$(document).ready(function() {
    //Initialize Materialize Mobile Nav
    $(".button-collapse").sideNav({
        edge: 'right'
    });
    $('ul.tabs').tabs();
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
        $('select').material_select();
        var parent = $(this).parent();
        var uncles = parent.prevAll();
        $('.add-btn').text('Update');

        var list_participants = $(uncles[1]).text();
        var list_description = $(uncles[0]).text();
        $('select').prop('selectedIndex', 2);
        $('textarea').val(list_description);
        console.log(list_participants, list_description);
    });
};

/************
 *  CHARTS
 ************/

/***********
 USER STORY / ACCEPTANCE CRITERIA REPORT
 */
var options = {
    chart: {
        height: 350,
        type: 'bar',
        stacked: true,
        toolbar: {
            show: true
        },
        zoom: {
            enabled: true
        }
    },
    responsive: [{
        breakpoint: 700,
        options: {
            legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
            }
        }
    }],
    plotOptions: {
        bar: {
            horizontal: false,
        },
    },
    series: [{
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43]
    },{
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27]
    },{
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14]
    },{
        name: 'PRODUCT D',
        data: [21, 7, 25, 13, 22, 8]
    }],
    xaxis: {
        type: 'datetime',
        categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT', '01/05/2011 GMT', '01/06/2011 GMT'],
    },
    legend: {
        position: 'right',
    },
    fill: {
        opacity: 1
    },
}

var chart1 = new ApexCharts(document.querySelector("#user-story-chart"), options);


/***********
 PROCESS CONTROL REPORT
 */

var options = {
    chart: {
        height: 350,
        type: 'area',
        stacked: true,
        events: {
            selection: function(chart, e) {
                console.log(new Date(e.xaxis.min) )
            }
        },

    },
    responsive: [{
        breakpoint: 700,
        options: {
            legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
            }
        }
    }],
    colors: ['#008FFB', '#00E396', '#CED4DC'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },

    series: [{
        name: 'South',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
        })
    },
        {
            name: 'North',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                min: 10,
                max: 20
            })
        },

        {
            name: 'Central',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                min: 10,
                max: 15
            })
        }
    ],
    fill: {
        gradient: {
            enabled: true,
            opacityFrom: 0.6,
            opacityTo: 0.8,
        }
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left'
    },
    xaxis: {
        type: 'datetime'
    },
}

var chart = new ApexCharts(
    document.querySelector("#process-control-chart"),
    options
);


/*
 // this function will generate output in this format
 // data = [
 [timestamp, 23],
 [timestamp, 33],
 [timestamp, 12]
 ...
 ]
 */
function generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push([x, y]);
        baseval += 86400000;
        i++;
    }
    return series;
}
