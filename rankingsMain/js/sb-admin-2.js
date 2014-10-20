$(function() {

    $('#side-menu').metisMenu();

});


var URL = "http://localhost:8000"



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
        matches.push({ value: str });
      }
    });
 
    cb(matches);
  };
};

var data = [];

$.ajax({
      type: "POST",
      url: URL + '/getallColleges/',
      success: function(result) {
        // console.log(result['details']);
              if(result['status']=="success") {
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
                    },
                    {
                      autocomplete: "off",
                      displayKey: 'value',
                      source: substringMatcher(data)
                    });
                    $("#colinput").css("display", "block");
                    $("#search").css("margin-bottom","5px");
              }
              else {
                alert("error");   //Confirm with Sir
              }
        }
      });


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

