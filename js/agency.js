

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
    // $('#contactForm').ebcaptcha();
// });

// $('#contactForm').submit(function (e) {
//     e.preventDefault();
//     var x =document.getElementById('captcha');
//     if(x.disabled)
//     {
//         $('#success').html("<div class='alert alert-danger'>");
//         $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
//             .append("</button>");
//         $('#success > .alert-danger').append("<strong>Please Enter Captcha!");
//         $('#success > .alert-danger').append('</div>');
//         //clear all fields
//         $('#contactForm').trigger("reset");
//     }
//     else
//     sendMessage();
//     return false;
// });
$('#contactForm').submit(function (e) {
    e.preventDefault();
    var x =grecaptcha.getResponse(widgetId1);
    $('#example1').empty();
    widgetId1 = grecaptcha.render('example1', {
      'sitekey' : '6Lduzf4SAAAAAC2Z9s6xyrqjo8DGghlzuZjZ7G8a',
      'theme' : 'light'
    });
    $.ajax({
        type: "GET",
        // headers: {
        //     'Access-Control-Allow-Origin': 'http://localhost/drunken-nemesis',
        //     'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        // },
        url: 'https://www.google.com/recaptcha/api/siteverify?secret=6Lduzf4SAAAAAESbkqgze2WujOVGu0eBwtb1AF9v&response='+x,
        
        success: function(result) {
            // console.log(result['details']);
            var r = JSON.stringify(result);
            console.log(r);
            var n = r.search("true");
            console.log(n);
            if(n>0)
                sendMessage();
        },
        error: function(result) {
            // Fail message
            alert("Error in connection");
        },
    });
    // else
    // sendMessage();
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


$.ajax({
        type: "GET",
        url: 'http://api.theysaidso.com/qod.json?category=funny',
        
        success: function(result) {
            // console.log(result['details']);
            $('#random-quote li').html(result['contents']['quote']);
        },
        error: function() {
            $('#random-quote li').html('There is no place like 127.0.0.1 !!!');
        }
    });

var widgetId1;
var onloadCallback = function() {
    // Renders the HTML element with id 'example1' as a reCAPTCHA widget.
    // The id of the reCAPTCHA widget is assigned to 'widgetId1'.
    widgetId1 = grecaptcha.render('example1', {
      'sitekey' : '6Lduzf4SAAAAAC2Z9s6xyrqjo8DGghlzuZjZ7G8a',
      'theme' : 'light'
    });
};
