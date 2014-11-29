

// jQuery for page scrolling feature - requires jQuery Easing plugin

var URL = "http://localhost:8000";

$('#captcha').realperson({length: 5});
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