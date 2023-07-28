// Ensure that the code isn't run until the browser has finished rendering all the elements in the HTML.
$(document).ready(function () {
  // Display current date in the header with Dayjs
  let dateString = dayjs().format("dddd, MMMM D, YYYY");
  let dateElement = document.getElementById("currentDay");
  dateElement.innerText = dateString;

  // create element to show save status
  let saveStatusElement = document.createElement("p");
  saveStatusElement.id = "saveStatus";
  dateElement.append(saveStatusElement);
  

  // Add click event listener on save button to save user input in local storage
  $(".saveBtn").on("click", function () {
    let timeBlock = $(this).closest(".time-block");
    let id = timeBlock.attr("id");
    // using jquery to find the description class within the time blocks.
    let userInput = timeBlock.find(".description").val();
    localStorage.setItem(id, userInput);

    $('#saveStatus').text("Data Saved Successfully! 😎")
    
    setTimeout(function(){
      $('#saveStatus').text("");
    }, 1000);
  });

  

  // Apply past, present, or future class to each time block based on the current hour
  let currentHour = dayjs().hour();
  $(".time-block").each(function () {
    let timeBlock = $(this);
    let timeBlockId = timeBlock.attr("id");
    // this gets the numeric hour value from the id of the time block. The split is used to only access the number
    let timeBlockHour = parseInt(timeBlockId.split("-")[1]);

    timeBlock.removeClass("past present future");
    if (timeBlockHour < currentHour) {
      timeBlock.addClass("past");
    } else if (timeBlockHour === currentHour) {
      timeBlock.addClass("present");
    } else {
      timeBlock.addClass("future");
    }
  });

  // Get saved user input from local storage and set values of elements
  $(".time-block").each(function () {
    let timeBlock = $(this);
    let timeBlockId = timeBlock.attr("id");
    let savedData = localStorage.getItem(timeBlockId);

    if (savedData) {
      timeBlock.find(".description").val(savedData);
    }
  });
});
