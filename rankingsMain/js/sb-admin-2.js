$(function() {

    $('#side-menu').metisMenu();

});


var URL = "http://localhost:8000"

document.cookie="user=tanmay";

// console.log(document.cookie);
var ca = document.cookie.split(';');
console.log(ca);

function checkCollegeCookie()
{
  var flag=0;
  for(var i=0;i<ca.length;i++)
  {
    var n = ca[i].search("college=");
    if(n>-1)
    {
      // $('#colcookie').html(ca[i].substring(8));
      var cl = ca[i].substring(8);
      if(cl.length>0)
      {
        $('#colcookie').html(cl);
        flag=1;
        return flag+1;
      }
    }
  }
  return flag;
}

$(document).ready(function() {
        // alert("hello");
        var check = checkCollegeCookie();
        if(check<=0)
        {
          $('#colcookie').html("No Institute Selected");
        }
    });

function setcollege()
{
  document.cookie="college=" + $('#colinput').val();
  // console.log($('colinput').text());
  // console.log("hello");
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
                $('#college .form-control').typeahead({
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

getcolleges().done(table);

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



// $(document).ready(function() {
//           // console.log(data);
//              $('#example').dataTable( {
//              } );
//          } );