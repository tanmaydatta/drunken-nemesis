$(function() {

    $('#side-menu').metisMenu();

});

var URL = "http://localhost:8000"

document.cookie = "user=";

// console.log(document.cookie);
var ca = document.cookie.split(';');
console.log(ca);

function checkCollegeCookie() {
    var flag = 0;
    for (var i = 0; i < ca.length; i++) {
        var n = ca[i].search("college=");
        if (n > -1) {
            // $('#colcookie').html(ca[i].substring(8));
            var cl = ca[i].substring(8);
            if (cl.length > 0) {
                $('#colcookie').html(cl);
                flag = 1;
                // console.log(cl);
                return flag + 1;
            }
        }
    }
    return flag;
}

$(document).ready(function() {
    $('#colinput').keypress(function(e) {
        if (e.keyCode == 13)
            $('#search').click();
    });
});

$(document).ready(function() {
    // alert("hello");
    var check = checkCollegeCookie();
    if (check <= 0) {
        $('#colcookie').html("No Institute Selected");
        $('#colerror').show();
    } else {
        $('#cccontest-select').show();
        $('#codechefright').show();
    }   
});

function setcollege() {
    document.cookie = "college=" + $('#colinput').val();
    location.reload();
}

var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                // the typeahead jQuery plugin expects suggestions to a
                // JavaScript object, refer to typeahead docs for more info
                matches.push({
                    value: str
                });
            }
        });

        cb(matches);
    };
};

var data = [];

function table() {
    // console.log(data);
    $(document).ready(function() {
        $('#example').dataTable();
    });

}
var getcolleges = function() {
    var r = $.Deferred();
    $.ajax({
        type: "POST",
        url: URL + '/getallColleges/',
        success: function(result) {
            // console.log(result['details']);
            if (result['status'] == "success") {
                // console.log(json.details);
                data = result['details'];
                delete data['length'];
                console.log(data['length']);
                $('#colinput').typeahead({
                    hint: true,
                    highlight: true,
                    autocomplete: "off",
                    minLength: 1,
                    items: 8
                }, {
                    autocomplete: "off",
                    displayKey: 'value',
                    source: substringMatcher(data)
                });
                $('#example tbody').empty();
                $("#colinput").css("display", "block");
                $("#search").css("margin-bottom", "5px");
                for (i = 0; i < data['length']; i++) {
                    $('#example tbody').append("<tr><td>" + data[i] + "</td></tr>");
                }
                //                 $('#example').dataTable( {
                //   // alert("hello");
                // } );
            } else {
                alert("error"); //Confirm with Sir
            }
        }
    });
    setTimeout(function() {
        // and call `resolve` on the deferred object, once you're done
        r.resolve();
    }, 1000);
    return r;
}

// $('#codechef input').typeahead({
//     hint: true,
//     highlight: true,
//     autocomplete: "off",
//     minLength: 1,
//     items: 8
// }, {
//     autocomplete: "off",
//     displayKey: 'value',
//     source: substringMatcher(data)
// });


//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse')
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse')
        }

        height = (this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    })
});



var getCCContests = function() {

    var r = $.Deferred();
    $.ajax({
        type: "POST",
        url: URL + '/getCCContests/',
        success: function(result) {
            // console.log(result['details']);
            if (result['status'] == "success") {
                // console.log(json.details);
                data = result['details'];
                delete data['length'];
                // console.log(data['length']);
                $('#codechef input').typeahead({
                    hint: true,
                    highlight: true,
                    autocomplete: "off",
                    minLength: 1,
                    items: 8
                }, {
                    autocomplete: "off",
                    displayKey: 'value',
                    source: substringMatcher(data)
                });
                $("#select-cc").css("margin-bottom", "-5px");
                // for (i = 0; i < data['length']; i++) {
                //     $('#ccContestRanks tbody').append("<tr><td>" + data[i] + "</td></tr>");
                // }
            } else {
                alert("error"); //Confirm with Sir
            }
        }
    });
    setTimeout(function() {
        // and call `resolve` on the deferred object, once you're done
        r.resolve();
    }, 1000);
    return r;
}



var parts = window.location.search.substr(1).split("&");
var $_GET = {};
for (var i = 0; i < parts.length; i++) {
    var temp = parts[i].split("=");
    $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}

if ($_GET['platform']) {
    var platform = $_GET['platform'].toLowerCase();
    if (platform === 'codechef' || platform === 'codeforces' || platform === 'topcoder') {
        // alert(platform); // 1
        $('#current_contests').hide();
        $('#currside a').removeClass('active');
        $('#rankside ul').removeClass('collapse');
        $('#rankside ul').addClass('collapse in');
        if (platform === 'codechef') {
            $('#codechef').show();
            $('#ccside a').addClass('active');
            var check = checkCollegeCookie();
            if (check > 0) {
                getCCContests();
            }
        }
    } else {
        $('#current_contests').show();
        // alert("hello");
    }
} else {
    $('#current_contests').show();
}
getcolleges().done(table);


$("#codechef input").css("width", $("#codechef").width() -25 );



var getCCContestRank = function() {
    var oTable = $('#ccRanksActive').dataTable();
    if (oTable)
        oTable.fnDestroy();
    oTable = $('#ccRanksInActive').dataTable();
    if (oTable)
        oTable.fnDestroy();
    $('#ccRanksActive tbody').empty();
    $('#ccRanksInActive tbody').empty();
    var r = $.Deferred();
    $.ajax({
        type: "POST",
        url: URL + '/getCCContestRank/' + $('#select-cc').val() + "/",
        data: {
            'college': $('#colcookie').text()
        },
        success: function(result) {
            // console.log(result['details']);
            if (result['status'] == "success") {
                // console.log(json.details);
                data = result['details'];
                delete data['length'];
                // console.log(data['length']);

                $("#select-cc").css("margin-bottom", "-5px");
                var rank = 1;
                var temp = 1;
                var score = data[0]['score'];
                $('#ccRanksActive tbody').empty();
                $('#ccRanksInActive tbody').empty();
                if (data[0]['score'] != null)
                    $('#ccRanksActive tbody').append("<tr><td>" + rank + "</td><td><a href='http://www.codechef.com/users/" + data[0]['handle'] + "' target='_blank'</a>"+data[0]['handle']+"</td><td>" + data[0]['name'] + "</td><td>" + data[0]['score'] + "</td></tr>");
                else rank = 0;
                for (i = 1; i < data['length']; i++) {
                    if (score === data[i]['score']) {} else {
                        rank = rank + 1;
                    }
                    score = data[i]['score'];
                    if (data[i]['score'] != null) {
                        $('#ccRanksActive tbody').append("<tr><td>" + rank + "</td><td><a href='http://www.codechef.com/users/" + data[i]['handle'] + "' target='_blank'</a>"+data[i]['handle']+"</td><td>" + data[i]['name'] + "</td><td>" + data[i]['score'] + "</td></tr>");
                    } else {
                        $('#ccRanksInActive tbody').append("<tr><td>" + temp + "</td><td><a href='http://www.codechef.com/users/" + data[i]['handle'] + "' target='_blank'</a>"+data[i]['handle']+"</td><td>" + data[i]['name'] + "</td></tr>");
                        temp = temp + 1;
                    }
                }
                $('#ccRanksActive').show();
                $('#ccRanksInActive').show();
            } else {
                alert("error"); //Confirm with Sir
            }
        }
    });
    setTimeout(function() {
        // and call `resolve` on the deferred object, once you're done
        r.resolve();
    }, 1000);
    return r;
}

function f() {
    $(document).ready(function() {
        $('#ccRanksActive').dataTable();
        $('#ccRanksInActive').dataTable();
    });
}

$(document).ready(function() {
    $('#select-cc').keypress(function(e) {
        if (e.keyCode == 13)
            getCCContestRank().done(f);
    });
});