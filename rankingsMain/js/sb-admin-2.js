$(function() {

    $('#side-menu').metisMenu();

});

var URL = "http://localhost:8000";

document.cookie = "user=;";

// console.log(document.cookie);
var ca = document.cookie.split(';');
console.log(ca);

function checkCollegeCookie() {
    var flag = 0;
    for (var i = 0; i < ca.length; i++) {
        var n = ca[i].search("college=");
        if (n > -1) {
            // $('#colcookie').html(ca[i].substring(8));
            var cl = ca[i].split("=")[1];
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

var spinner;
var opts = {
  lines: 13, // The number of lines to draw
  length: 20, // The length of each line
  width: 10, // The line thickness
  radius: 30, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#428bca', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '60%', // Top position relative to parent
  left: '58%' // Left position relative to parent
};
var target = document.getElementById('spin');
// var target = $('#spin');



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
    // document.cookie = "college=" + $('#colinput').val();
    // console.log($('#colinput').val())
    $.ajax({
        type: "POST",
        url: URL + '/checkCollege/',
        data: {
            'college': $('#colinput').val()
        },
        success: function(result) {
            // console.log(result['details']);
            if (result['status'] == "success") {
                document.cookie = "college=" + result['details'];
                location.reload();
            } else {
                // alert(result['errors']);
                $("#page-wrapper .alert span:last").html( "Incorrect College Name Entered!" );
                $("#page-wrapper .alert").show( "slow" );
                // location.reload();
            }
        },
        error: function(xhr, status, error) {
      // check status && error
             $("#page-wrapper .alert span:last").html( "Error establishing connection!" );
             $("#page-wrapper .alert").show( "slow" );
        }    
    });
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
    spinner.stop();
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
                 $('#institute').typeahead({
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
                // for (i = 0; i < data['length']; i++) {
                //     $('#example tbody').append("<tr><td>" + data[i] + "</td></tr>");
                // }
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
        $('#problems').hide();
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
getcolleges().done();


var getCurrentContests = function() {

var r = $.Deferred();
    $.ajax({
        type: "POST",
        url: URL + '/getCurrentContests/',
        success: function(result) {
            // console.log(result['details']);
            if (result['status'] == "success") {
                // console.log(json.details);
                // console.log(result['requests']);
                codes = result['codes'];
                names = result['names'];
                end = result['END'];
                console.log(data['length']);
                $('#example tbody').empty();
                for (i = 0; i <= codes['length']; i++) {
                    if(i!=codes['length'])
                    $('#example tbody').append("<tr><td>" + (i+1) + "</td><td><a href = 'http://www.codechef.com/"+codes[i]+"'>" + names[i] + "</a></td><td>" + end[i] + "</td><td>CodeChef</td></tr>");
                    else table();
                }

                //                 $('#example').dataTable( {
                //   // alert("hello");
                // } );
            } else {
                alert("error"); //Confirm with Sir
            }
        },
        error: function() {
            $("#page-wrapper .alert span:last").html( "Error establishing connection!" );
            $("#page-wrapper .alert").show( "slow" );
            spinner.stop();
        }

    });
    setTimeout(function() {
    // and call `resolve` on the deferred object, once you're done
        r.resolve();
    }, 1);
    return r;
}


if(! $_GET['platform'])
{
    spinner = new Spinner(opts).spin(target);
    getCurrentContests().done();
}


// $("#codechef input").css("width", '570%' );



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
                for (i = 1; i <= data['length']; i++) {
                    if(i<data['length']) {
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
                    else
                    {
                        f();
                    }
                }
                $('#ccRanksActive').show();
                $('#ccRanksInActive').show();
                $('#ccContestRanks').hide();
            } else {
                $("#page-wrapper .alert span:last").html( "Incorrect Contest Name/Code Entered!" );
                $("#page-wrapper .alert").show( "slow" );
            }
        }
    });
    setTimeout(function() {
        // and call `resolve` on the deferred object, once you're done
        r.resolve();
    }, 5000);
    return r;
}


function f() {
    $(document).ready(function() {
        $('#ccRanksActive').dataTable();
        $('#ccRanksInActive').dataTable();
        var oTable = $('#ccContestRanks').dataTable();
        if (oTable)
            oTable.fnDestroy();
    });
}
function problemf() {
    $(document).ready(function() {
        $('#problemTable').dataTable();
        // var oTable = $('#ccContestRanks').dataTable();
        // if (oTable)
        //     oTable.fnDestroy();
    });
}

$(document).ready(function() {
    $('#select-cc').keypress(function(e) {
        if (e.keyCode == 13) {
            $('#long').removeClass('btn-primary');
            $('#short').removeClass('btn-primary');
            $('#lunchtime').removeClass('btn-primary');
            $('#long').addClass('btn-default');
            $('#short').addClass('btn-default');
            $('#lunchtime').addClass('btn-default');
            getCCContestRank();
        }
    });
});


// var cccontestRanks=
var cccontestRanks = function(contest) {
    var oTable = $('#ccContestRanks').dataTable();
    if (oTable)
        oTable.fnDestroy();
    $('#ccContestRanks tbody').empty();
    var r = $.Deferred();
    if(contest === 'long')
    {
        $('#long').removeClass('btn-default');
        $('#short').removeClass('btn-primary');
        $('#lunchtime').removeClass('btn-primary');
        $('#short').addClass('btn-default');
        $('#lunchtime').addClass('btn-default');
        $('#long').addClass('btn-primary');
    }
    else if(contest === 'short')
    {
        $('#long').addClass('btn-default');
        $('#lunchtime').addClass('btn-default');
        $('#short').removeClass('btn-default');
        $('#long').removeClass('btn-primary');
        $('#lunchtime').removeClass('btn-primary');
        $('#short').addClass('btn-primary');
    }
    else
    {
        $('#short').addClass('btn-default');
        $('#long').addClass('btn-default');
        $('#lunchtime').removeClass('btn-default');
        $('#short').removeClass('btn-primary');
        $('#long').removeClass('btn-primary');
        $('#lunchtime').addClass('btn-primary');
    }
    $.ajax({
        type: "POST",
        url: URL + '/ccContestRanks/' + contest+ "/",
        data: {
            'college': $('#colcookie').text()
        },
        success: function(result) {
            // console.log(result['details']);
            if (result['status'] == "success") {
                // console.log(json.details);
                data = result['details'];
                console.log(data['length']);
                // console.log(data['length']);

                var rank = 1;
                var temp = 1;
                var score = data[0]['rank'];
                $('#ccContestRanks tbody').empty();
                if (data[0]['rank'] != null)
                    $('#ccContestRanks tbody').append("<tr><td>" + rank + "</td><td><a href='http://www.codechef.com/users/" + data[0]['handle'] + "' target='_blank'</a>"+data[0]['handle']+"</td><td>" + data[0]['name'] + "</td><td>" + data[0]['rank'] + "</td><td>" + data[0]['crank'] + "</td><td>" + Math.abs(data[0]['rankchange']) + "</td></tr>");
                else rank = 0;
                if(data[0]['rankchange'] > 0)
                    $("#ccContestRanks tbody tr td:last").css("color", "green");
                else if(data[0]['rankchange'] < 0)
                    $("#ccContestRanks tbody tr td:last").css("color", "red");
                else 
                    $("#ccContestRanks tbody tr td:last").css("color", "blue");
                for (i = 1; i <= data['length']; i++) {
                    if(i<data['length']) {
                        if (score === data[i]['rank']) {} else {
                            rank = rank + 1;
                        }
                        score = data[i]['rank'];
                        $('#ccContestRanks tbody').append("<tr><td>" + rank + "</td><td><a href='http://www.codechef.com/users/" + data[i]['handle'] + "' target='_blank'</a>"+data[i]['handle']+"</td><td>" + data[i]['name'] + "</td><td>" + data[i]['rank'] + "</td><td>" + data[i]['crank'] + "</td><td>" + Math.abs(data[i]['rankchange']) + "</td></tr>");
                        if(data[i]['rankchange'] < 0)
                            $("#ccContestRanks tbody tr td:last").css("color", "green");
                        else if(data[i]['rankchange'] > 0)
                            $("#ccContestRanks tbody tr td:last").css("color", "red");
                        else 
                            $("#ccContestRanks tbody tr td:last").css("color", "blue");
                    }
                    else
                    {
                        f1();
                    }
                }
                $('#ccRanksActive').hide();
                $('#ccRanksInActive').hide();
                $('#ccContestRanks').show();
                $('#ccContestRanks caption b').html(contest.toUpperCase()+" CONTEST RANKINGS");
                $("#ccerror").show();
            } 
            else {
                alert("error"); //Confirm with Sir
                $("#ccerror").hide();
                console.log(result);
            }
        }
    });
    setTimeout(function() {
        // and call `resolve` on the deferred object, once you're done
        r.resolve();
    }, 5000);
    return r;
}

function ccContestRanks(contest) {
    cccontestRanks(contest);
}
function f1() {
    $(document).ready(function() {
        var oTable = $('#ccRanksActive').dataTable();
        if (oTable)
            oTable.fnDestroy();
        oTable = $('#ccRanksInActive').dataTable();
        if (oTable)
            oTable.fnDestroy();
        $('#ccContestRanks').dataTable();
    });
}

var ptags = 0;

var getProblemTags = function() {

    var r = $.Deferred();
    $.ajax({
        type: "POST",
        url: URL + '/getProblemTags/',
        success: function(result) {
            // console.log(result['details']);
            if (result['status'] == "success") {
                // console.log(json.details);
                data = result['details'];
                delete data['length'];
                // console.log(data['length']);
                $('#problems input').typeahead({
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
                ptags = 1;
                // $('#problemTable').show();
                $("#select-problem").css("margin-bottom", "-5px");
                // for (i = 0; i < data['length']; i++) {
                //     $('#ccContestRanks tbody').append("<tr><td>" + data[i] + "</td></tr>");
                // }
            } else {
                alert("error"); 
            }
        }
    });
    setTimeout(function() {
        // and call `resolve` on the deferred object, once you're done
        r.resolve();
    }, 1000);
    return r;
}


function problemsClick() {
    $('#current_contests').hide();
    $('#codechef').hide();
    $('#problems').show();
    if(ptags == 0)
    getProblemTags();
}

$(document).ready(function() {
    $('#select-problem').keypress(function(e) {
        if (e.keyCode == 13) {
            getProblemlinks();
        }
    });
});

var getProblemlinks = function() {
    var oTable = $('#problemTable').dataTable();
    if (oTable)
        oTable.fnDestroy();
    $('#problemTable tbody').empty();
    var r = $.Deferred();
    $.ajax({
        type: "POST",
        url: URL + '/getProblems/' + $('#select-problem').val() + "/",
        success: function(result) {
            // console.log(result['details']);
            if (result['status'] == "success") {
                // console.log(json.details);
                data = result['details'];
                delete data['length'];
                // console.log(data['length']);

                $("#select-problem").css("margin-bottom", "-5px");
                for (i = 0; i <= data['length']; i++) {
                    if(i<data['length']) {
                        var platform="";
                        var problemurl = data[i]['url'];
                        if(problemurl.search('codechef')>=0)
                            platform="Codechef";
                        else if(problemurl.search('codeforces')>=0)
                            platform="Codeforces";
                        else
                            platform="Topcoder";
                        $('#problemTable tbody').append("<tr><td>" + (i+1) + "</td><td><a href='" + data[i]['url'] + "' target='_blank'</a>"+data[i]['name']+"</td><td>" + data[i]['tags'] + "</td><td>"+ platform +"</td></tr>");
                    }
                    else
                    {
                        problemf();
                    }
                }
                $('#problemTable').show();
            } else {
                $("#page-wrapper .alert span:last").html( "Incorrect Problem Tag Entered!" );
                $("#page-wrapper .alert").show( "slow" );
            }
        }
    });
    setTimeout(function() {
        // and call `resolve` on the deferred object, once you're done
        r.resolve();
    }, 5000);
    return r;
}

function newUserCheck() {
    var x = document.getElementById('handle');
    var y = document.getElementById('institute');
    if(x.value&&y.value)
        return true;
    else return false;
}

function addUser () {
    if(newUserCheck()) { 
        var plt = document.getElementById('select-platform').value;
        $.ajax({
            type: "POST",
            url: URL + '/add'+ plt +'User/',
            data: {
                'handle' : $('#handle').val(),
                'college': $('#institute').val()
            },
            success: function(result) {
                // console.log(result['details']);
                console.log(result);
                $('#newuserstatus').show();
                if (result['status'] == "success") {
                    // console.log(json.details);
                    document.getElementById('newuserstatus').innerHTML='User Successfully Added !!!';
                } else {
                    document.getElementById('newuserstatus').innerHTML=result['details'];           
               }
            }
        });
    }
    else document.getElementById('newuserstatus').innerHTML='Enter All Details';
}

$('#newusermodal').submit(function (e) {
    e.preventDefault();
    addUser();
    return false;
});
