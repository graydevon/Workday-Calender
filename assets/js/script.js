$(document).ready(function () {
    //put the date at the top of the schedule
    $("#currentDay").append(moment().format("dddd, MMMM Do"));
  
    var workHours = [9, 10, 11, 12, 13, 14, 15, 16];
    //get storage
    setInterval(function () {
      //checks past and futures to add tasks
      for (var i = 0; i < workHours.length; i++) {
        $("#hour-" + workHours[i] + " .description").val(localStorage.getItem(workHours[i]));
      }
      //updating current time
      //loop to color code each section
      $(".row").each(function () {
        var currentTime = moment().hour();
        var timeScheduled = parseInt($(this).attr("id").split("-")[1]);
        if (timeScheduled < currentTime) {
          $(this).addClass("past").removeClass("present").removeClass("future");
        }
        else if (timeScheduled === currentTime) {
          $(this).addClass("present").removeClass("past").removeClass("future");
        }
        else {
          $(this).addClass("future").removeClass("past").removeClass("present");
        };
      });
      
       //load tasks previously stored to localStorage
  for (var i = 0; i < workHours.length; i++) {
    //loop through each work hour
    $("#hour-" + workHours[i] + " .description").val(localStorage.getItem(workHours[i]));
  }});

  //listen for button click
  $(".row .saveBtn").on("click", function (e) {
    var btn = e.target;
    var index = btn.dataset.index;
    // get nearby values to save to local storage
    var taskText = $("textarea[data-index=" + "'" + index + "'" + "]").val();
    // use time as key for local storage
    var time = $(this).parent().attr("id").split("-")[1];
    // set localStorage with time and textarea
    localStorage.setItem(time, taskText);
  });
});