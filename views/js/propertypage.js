//Calender logic
function CalendarControl() {
    const calendar = new Date();
    const calendarControl = {
      localDate: new Date(),
      prevMonthLastDate: null,
      calWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      calMonthName: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      daysInMonth: function (month, year) {
        return new Date(year, month, 0).getDate();
      },
      firstDay: function () {
        return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
      },
      lastDay: function () {
        return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
      },
      firstDayNumber: function () {
        return calendarControl.firstDay().getDay() + 1;
      },
      lastDayNumber: function () {
        return calendarControl.lastDay().getDay() + 1;
      },
      getPreviousMonthLastDate: function () {
        let lastDate = new Date(
          calendar.getFullYear(),
          calendar.getMonth(),
          0
        ).getDate();
        return lastDate;
      },
      navigateToPreviousMonth: function (e) {
        e.preventDefault();
        e.stopPropagation();
        calendar.setMonth(calendar.getMonth() - 1);
        calendarControl.attachEventsOnNextPrev();
      },
      navigateToNextMonth: function (e) {
        e.preventDefault();
        e.stopPropagation();
        calendar.setMonth(calendar.getMonth() + 1);
        calendarControl.attachEventsOnNextPrev();
      },
      navigateToCurrentMonth: function () {
        let currentMonth = calendarControl.localDate.getMonth();
        let currentYear = calendarControl.localDate.getFullYear();
        calendar.setMonth(currentMonth);
        calendar.setYear(currentYear);
        calendarControl.attachEventsOnNextPrev();
      },
      displayYear: function () {
        let yearLabel = document.querySelector(".calendar .calendar-year-label");
        yearLabel.innerHTML = calendar.getFullYear();
      },
      displayMonth: function () {
        let monthLabel = document.querySelector(
          ".calendar .calendar-month-label"
        );
        monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
      },
      selectDate: function (e) {
        console.log(
          `${e.target.textContent} ${
            calendarControl.calMonthName[calendar.getMonth()]
          } ${calendar.getFullYear()}`
        );
      },
      plotSelectors: function () {
        document.querySelector(
          ".calendar"
        ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
          <div class="calendar-prev"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
          <div class="calendar-year-month">
          <div class="calendar-month-label"></div>
          <div>-</div>
          <div class="calendar-year-label"></div>
          </div>
          <div class="calendar-next"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
          </div>
          <div class="calendar-today-date">Today: 
            ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]}, 
            ${calendarControl.localDate.getDate()}, 
            ${calendarControl.calMonthName[calendarControl.localDate.getMonth()]} 
            ${calendarControl.localDate.getFullYear()}
          </div>
          <div class="calendar-body"></div></div>`;
      },
      plotDayNames: function () {
        for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div>${calendarControl.calWeekDays[i]}</div>`;
        }
      },
      plotDates: function () {
        document.querySelector(".calendar .calendar-body").innerHTML = "";
        calendarControl.plotDayNames();
        calendarControl.displayMonth();
        calendarControl.displayYear();
        let count = 1;
        let prevDateCount = 0;
  
        calendarControl.prevMonthLastDate = calendarControl.getPreviousMonthLastDate();
        let prevMonthDatesArray = [];
        let calendarDays = calendarControl.daysInMonth(
          calendar.getMonth() + 1,
          calendar.getFullYear()
        );
        // dates of current month
        for (let i = 1; i < calendarDays; i++) {
          if (i < calendarControl.firstDayNumber()) {
            prevDateCount += 1;
            document.querySelector(
              ".calendar .calendar-body"
            ).innerHTML += `<div class="prev-dates"></div>`;
            prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
          } else {
            document.querySelector(
              ".calendar .calendar-body"
            ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
          }
        }
        //remaining dates after month dates
        for (let j = 0; j < prevDateCount + 1; j++) {
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
        }
        calendarControl.highlightToday();
        calendarControl.plotPrevMonthDates(prevMonthDatesArray);
        calendarControl.plotNextMonthDates();
      },
      attachEvents: function () {
        let prevBtn = document.querySelector(".calendar .calendar-prev a");
        let nextBtn = document.querySelector(".calendar .calendar-next a");
        let todayDate = document.querySelector(".calendar .calendar-today-date");
        let dateNumber = document.querySelectorAll(".calendar .dateNumber");
        prevBtn.addEventListener(
          "click",
          calendarControl.navigateToPreviousMonth
        );
        nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
        todayDate.addEventListener(
          "click",
          calendarControl.navigateToCurrentMonth
        );
        for (var i = 0; i < dateNumber.length; i++) {
            dateNumber[i].addEventListener(
              "click",
              calendarControl.selectDate,
              false
            );
        }
      },
      highlightToday: function () {
        let currentMonth = calendarControl.localDate.getMonth() + 1;
        let changedMonth = calendar.getMonth() + 1;
        let currentYear = calendarControl.localDate.getFullYear();
        let changedYear = calendar.getFullYear();
        if (
          currentYear === changedYear &&
          currentMonth === changedMonth &&
          document.querySelectorAll(".number-item")
        ) {
          document
            .querySelectorAll(".number-item")
            [calendar.getDate() - 1].classList.add("calendar-today");
        }
      },
      plotPrevMonthDates: function(dates){
        dates.reverse();
        for(let i=0;i<dates.length;i++) {
            if(document.querySelectorAll(".prev-dates")) {
                document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
            }
        }
      },
      plotNextMonthDates: function(){
       let childElemCount = document.querySelector('.calendar-body').childElementCount;
       //7 lines
       if(childElemCount > 42 ) {
           let diff = 49 - childElemCount;
           calendarControl.loopThroughNextDays(diff);
       }

       //6 lines
       if(childElemCount > 35 && childElemCount <= 42 ) {
        let diff = 42 - childElemCount;
        calendarControl.loopThroughNextDays(42 - childElemCount);
       }

      },
      loopThroughNextDays: function(count) {
        if(count > 0) {
            for(let i=1;i<=count;i++) {
                document.querySelector('.calendar-body').innerHTML += `<div class="next-dates">${i}</div>`;
            }
        }
      },
      attachEventsOnNextPrev: function () {
        calendarControl.plotDates();
        calendarControl.attachEvents();
      },
      init: function () {
        calendarControl.plotSelectors();
        calendarControl.plotDates();
        calendarControl.attachEvents();
      }
    };
    calendarControl.init();
  }
  
const calendarControl = new CalendarControl();

// Handling of the navbar scrolling and reservation area sticky mechanism
let mainNav = document.getElementById("main-nav");
let subNav = document.querySelector(".simple-nav");

let reservation_dialog = document.querySelector(".reservation-area");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 527 || document.documentElement.scrollTop > 527) {
    mainNav.style.display = "none";
    subNav.style.top = "0";
  } else {
    mainNav.style.display = "block";
    subNav.style.top = "-150px";
  }

  if (document.body.scrollTop > 2657 || document.documentElement.scrollTop > 2657){
    document.querySelector(".price-snap").style.display = "block";
  }else{
    document.querySelector(".price-snap").style.display = "none";
  }
}

//JS implementation for Dropdown area 
let elementDropdownButtonArea = document.querySelectorAll(".dropdown-menu .dropdown-item div .user-choice");
let adultCounter = 0;
let infantCounter = 0;
let petCounter = 0;
let userChoice = "";

document.querySelector(".dropdown-selection .drop-btn").addEventListener('click',()=>{
    document.querySelector(".dropdown-selection .drop-btn").innerHTML = "Add guests";
})

elementDropdownButtonArea.forEach((element, key) => {
    //Disable if nothing is set
    if (element.querySelector(".latest-count").innerHTML === "0") {
        element.querySelector(".dec-count").setAttribute("disabled", "disabled");
        element.querySelector(".dec-count").style.opacity = "0.5";
    }

    element.querySelector(".inc-count").addEventListener("click", (e) => {
        e.preventDefault();
        //To prevent dropdown close after single interaction
        e.stopPropagation();

        element.querySelector(".inc-count").style.border = "0.5px solid #8f8d8d";
        let spanDisplay = parseInt(element.querySelector(".latest-count").innerHTML);
        spanDisplay++;
        element.querySelector(".latest-count").innerHTML = spanDisplay;
        if (spanDisplay > 0) {
            element.querySelector(".dec-count").removeAttribute("disabled");
            element.querySelector(".dec-count").style.opacity = "1";
        }
        //For adults and childrens
        if (key == 0 || key == 1) {
            adultCounter++;
            if (userChoice === "") {
                userChoice = `${adultCounter} guest`;
            } else {

                let arrayString = userChoice.split(',');
                arrayString[0] = `${adultCounter} guests`;
                userChoice = arrayString.join();
            }
            //For infants    
        } else if (key == 2) {
            infantCounter++;
            if (userChoice === "" || userChoice == "Add guests") {
                userChoice = `1 guest, ${infantCounter} infant`;
            } else {
                let arrayString = userChoice.split(',');
                if (userChoice.includes("infants") || userChoice.includes("infant")) {
                    arrayString[1] = `${infantCounter} ${infantCounter > 1 ? "infants" : "infant"}`;
                    userChoice = arrayString.join();
                } else {
                    if (userChoice.includes("pet") || userChoice.includes("pets")) {
                        let temp = arrayString[1];
                        arrayString[1] = `${infantCounter} infant`;
                        arrayString[2] = temp;
                        userChoice = arrayString.join();
                    } else {
                        arrayString.push(`${infantCounter} infant`);
                        userChoice = arrayString.join();
                    }
                }
            }
            //For pets
        } else if (key == 3) {
            petCounter++;
            if (userChoice === "" || userChoice == "Add guests") {
                userChoice = `1 guest, ${petCounter} pet`;
            } else {
                let arrayString = userChoice.split(',');
                if ((userChoice.includes("pet") || userChoice.includes("pets")) && !(userChoice.includes("infant") || userChoice.includes("infants"))) {
                    arrayString[1] = `${petCounter} ${petCounter > 1 ? "pets" : "pet"}`;
                    userChoice = arrayString.join();
                } else if ((userChoice.includes("pet") || userChoice.includes("pets")) && (userChoice.includes("infant") || userChoice.includes("infants"))) {
                    arrayString[2] = `${petCounter} ${petCounter > 1 ? "pets" : "pet"}`;
                    userChoice = arrayString.join();
                } else {
                    arrayString.push(`${petCounter} pet`);
                    userChoice = arrayString.join();
                }
            }
        }
        document.querySelector(".dropdown-selection button").innerHTML = "";
        document.querySelector(".dropdown-selection button").innerHTML = userChoice;

    })

    element.querySelector(".dec-count").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        element.querySelector(".dec-count").style.border = "0.5px solid #8f8d8d";
        let spanDisplay = parseInt(element.querySelector(".latest-count").innerHTML);
        spanDisplay--;
        element.querySelector(".latest-count").innerHTML = spanDisplay;
        if (spanDisplay == 0) {
            element.querySelector(".dec-count").setAttribute("disabled", "disabled");
            element.querySelector(".dec-count").style.opacity = "0.5";
        }
        //Adult and Children
        if (key == 0 || key == 1) {
            adultCounter--;
            let arrayString = userChoice.split(',');
            if (adultCounter > 1) {
                arrayString[0] = `${adultCounter} guests`
                userChoice = arrayString.join()
            } else if (adultCounter == 1) {
                arrayString[0] = `${adultCounter} guest`
                userChoice = arrayString.join()
            } else {
                arrayString[0] = "";
                let temp = arrayString.join();
                userChoice = temp.substring(temp.indexOf(',') + 1);
            }
            //Infant
        } else if (key == 2) {
            infantCounter--;
            let arrayString = userChoice.split(',');
            if (infantCounter > 1) {
                arrayString[1] = `${infantCounter} infants`
                userChoice = arrayString.join()
            } else if (infantCounter == 1) {
                arrayString[1] = `${infantCounter} infant`
                userChoice = arrayString.join()
            } else {
                arrayString[1] = arrayString[2] != null ? arrayString[2] : "";
                arrayString.pop();
                userChoice = arrayString.join()
            }
            //Pets
        } else if (key == 3) {
            petCounter--;
            let arrayString = userChoice.split(',');
            if (petCounter > 1) {
                arrayString[2] = `${petCounter} pets`
                userChoice = arrayString.join()
            } else if (petCounter == 1) {
                arrayString[2] = `${petCounter} pet`
                userChoice = arrayString.join()
            } else {
                if (arrayString[2] == null) {
                    arrayString[1] = "";
                    arrayString.pop();
                } else if (arrayString[2] != null) {
                    arrayString[2] = "";
                    arrayString.pop();
                }
                userChoice = arrayString.join();

            }
        }

        if (adultCounter == 0 && infantCounter == 0 && petCounter == 0) {
            userChoice = "Add guests";
        }
        document.querySelector(".dropdown-selection button").innerHTML = "";
        document.querySelector(".dropdown-selection button").innerHTML = userChoice;
    })
});

let tempJson = {};

document.getElementById("checkinDate").addEventListener('change',()=>{
    reusablePriceCheck(tempJson);
    localStorage.setItem('key',JSON.stringify(tempJson));
})

document.getElementById("checkoutDate").addEventListener('change',()=>{
    reusablePriceCheck(tempJson);
    localStorage.setItem('key',JSON.stringify(tempJson));
})
//Navigate to Bookings page
document.querySelector(".reservation-area .rsvsub-btn").addEventListener('click',()=>{
        let modifiedURL = location.href.split('?')[0].replace('rooms','book');
        let json = JSON.parse(localStorage.getItem('key'));
        let params;
        if (json == undefined){
            let params = location.href.split('?')[1];
            location.href = modifiedURL +"?"+params;
            
        }else{
           let params = `checkin=${json['checkin']}&checkout=${json['checkout']}&guests=${json['guests']}`;
           location.href = modifiedURL +"?"+params;
           localStorage.clear();
        }   
})

function reusablePriceCheck(tempJson){
    tempJson['checkin'] = document.getElementById('checkinDate').value;
    tempJson['checkout'] = document.getElementById('checkoutDate').value;
    tempJson['guests'] = document.querySelector(".dropdown-selection button").innerHTML;
    const date1 = new Date(tempJson['checkin']);
    const date2 = new Date(tempJson['checkout']);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    document.getElementById("diffDate").innerHTML = diffDays;
    document.getElementById("priceSection").innerHTML =`$ ${parseInt(document.getElementById("originalRate").innerHTML) * parseInt(document.getElementById("diffDate").innerHTML)}`;
}

function logoutUser(){
    fetch("/logout",{method: "POST"})
    .then(res=>res.json()).then(response=>{
        location.href = "/";
    })
}