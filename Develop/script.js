// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(document).ready(function() {
    $(".saveBtn").on("click", function() {
      let timeBlock = $(this).closest(".time-block");
      let id = timeBlock.attr('id');
      let userInput = timeBlock.find('.description').val();

      // Save the user input in local storage with id as the key
      localStorage.setItem(id, userInput);
      console.log(id);
  });
});
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  $(document).ready(function() {
    // get current hour using day.js
    let currentHour = dayjs().hour();

    $(".time-block").each(function() {
        let timeBlock = $(this);  // this refers to the current time block in the loop
        let timeBlockId = timeBlock.attr('id');

        // Extract the hour from the id. Assume ids are in the format 'hour-x'
        let timeBlockHour = parseInt(timeBlockId.split('-')[1]);

        // Remove all classes first
        timeBlock.removeClass('past present future');

        // Add the appropriate class based on the comparison
        if (timeBlockHour < currentHour) {
            timeBlock.addClass('past');
        } else if (timeBlockHour === currentHour) {
            timeBlock.addClass('present');
        } else {
            timeBlock.addClass('future');
        }
    });
});
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  $(document).ready(function() {
    // Get the values from localStorage for each time block
    $(".time-block").each(function() {
        let timeBlock = $(this);  // this refers to the current time block in the loop
        let timeBlockId = timeBlock.attr('id');

        // Retrieve data from localStorage using the id
        let savedData = localStorage.getItem(timeBlockId);

        if (savedData) {
            // Assuming each timeBlock has a textarea with class 'description'
            timeBlock.find('.description').val(savedData);
        }
    });
});
  //
  // TODO: Add code to display the current date in the header of the page.
  let date = new Date();
  let dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  let dateString = date.toLocaleDateString('en-US', dateOptions)
  let dateElement = document.getElementById('currentDay');
  dateElement.innerText = dateString;

