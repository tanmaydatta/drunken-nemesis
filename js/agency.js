

// jQuery for page scrolling feature - requires jQuery Easing plugin

var URL = "http://localhost:8000";


$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

document.cookie = "user=tanmay; path=/rankingsMain;";

// $('#navLinks ul li:nth-child(3)').hide();


// $.ajax({
//         type: "POST",
//         url: URL + '/getallColleges/',
//         success: function(result) {
//             // console.log(result['details']);
//             if (result['status'] == "success") {
//                 // console.log(json.details);
//                 console.log("done");
//             } else {
//                 alert("error"); //Confirm with Sir
//             }
//         }
//     });

function myIP() {
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.open("GET", "http://api.hostip.info/get_html.php", false);
    xmlhttp.send();

    hostipInfo = xmlhttp.responseText.split("\n");

    for (i = 0; hostipInfo.length >= i; i++) {
        ipAddress = hostipInfo[i].split(":");
        if (ipAddress[0] == "IP") return ipAddress[1];
    }

    return false;
}

// $(function(){
    $('#contactForm').ebcaptcha();
// });

$('#contactForm').submit(function (e) {
    e.preventDefault();
    var x =document.getElementById('captcha');
    if(x.disabled)
    {
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
        $('#success > .alert-danger').append("<strong>Please Enter Captcha!");
        $('#success > .alert-danger').append('</div>');
        //clear all fields
        $('#contactForm').trigger("reset");
    }
    else
    sendMessage();
    return false;
});

function sendMessage() {
    $.ajax({
        type: "POST",
        url: URL + '/sendMessage/',
        data: {
            'name' : $('#namec').val(),
            'phone': $('#phonec').val(),
            'email': $('#emailc').val(),
            'message': $('#messagec').val(),
        },
        success: function(result) {
            // console.log(result['details']);
            console.log(result);
            $('#newuserstatus').show();
            if (result['status'] == "success") {
                // console.log(json.details);
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-success')
                    .append("<strong>Your message has been sent. </strong>");
                $('#success > .alert-success')
                    .append('</div>');

                //clear all fields
                $('#contactForm').trigger("reset");
            } else {
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-danger').append("<strong>Sorry " + $('#namec').val() + ", it seems that my mail server is not responding. Please try again later!");
                $('#success > .alert-danger').append('</div>');
                //clear all fields
                $('#contactForm').trigger("reset");           
           }
        },
        error: function(result) {
            // Fail message
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-danger').append("<strong>Sorry " + $('#namec').val() + ", it seems that my mail server is not responding. Please try again later!");
            $('#success > .alert-danger').append('</div>');
            //clear all fields
            $('#contactForm').trigger("reset");
        },
    });
}