//Global Json
let globJson = {};
var globSearchObj = {};
let monthObj = {
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12"
  }
if (document.querySelector(".main-form-div .main-form")){
document.querySelector(".main-form-div .main-form").addEventListener('submit',()=>{
    globSearchObj['checkin'] = document.getElementById("checkinDate").value;
    globSearchObj['checkout'] = document.getElementById("checkoutDate").value;
    globSearchObj['guests'] = document.getElementById('guests').value;
    
    window.localStorage.setItem("tempJson",JSON.stringify(globSearchObj));
    console.log(globSearchObj);
})
}

document.querySelectorAll(".searchbox > *",).forEach((divElement) => {
    //Include upper nav having Stays, Experience, Online experiences upon click on any span inside
    divElement.addEventListener("click", (e) => {
        e.preventDefault();
        let element = document.getElementById("sub-nav");
        let tempNavbar = document.createElement("nav");
        let button1 = document.createElement("button");
        button1.setAttribute("id", "nav-stays");
        button1.innerText = "Stays";
        button1.style.backgroundColor = "white"
        button1.style.paddingBottom = "0.3rem";
        button1.style.border = "none";
        button1.style.borderBottom = "2px solid black";

        let button2 = document.createElement("button");
        button2.setAttribute("id", "nav-Exp");
        button2.innerText = "Experiences";
        button2.style.backgroundColor = "white"
        button2.style.paddingBottom = "0.3rem";
        button2.style.border = "none";

        let button3 = document.createElement("button");
        button3.setAttribute("id", "nav-onlineExp");
        button3.innerText = "Online Experiences";
        button3.style.backgroundColor = "white",
            button3.style.paddingBottom = "0.3rem";
        button3.style.border = "none";

        tempNavbar.appendChild(button1);
        tempNavbar.appendChild(button2);
        tempNavbar.appendChild(button3);
        element.appendChild(tempNavbar);

        //Form style
        document.getElementById("sub-nav").style.marginBottom = "3.5rem";

        //Nav style
        document.getElementById("main-nav").style.height = "10rem";

        //Navbar logo
        document.getElementById("main-nav").getElementsByTagName("a")[0].style.marginBottom = "4rem";

        //Clubbed item
        document.getElementById("main-nav").getElementsByClassName("clubbed-items")[0].style.marginBottom = "4rem";

        document.getElementsByClassName("search-form")[0].remove();
        //On clicking above formed temporary nav actions
        document.getElementById("nav-stays").addEventListener("click",
            (e) => {
                e.preventDefault();
                document.getElementById("nav-stays").style.borderBottom = "2px solid black";
                document.getElementById("nav-Exp").style.border = "none";
                document.getElementById("nav-onlineExp").style.border = "none"

            });

        document.getElementById("nav-Exp").addEventListener("click",
            (e) => {
                e.preventDefault();
                document.getElementById("nav-stays").style.border = "none";
                document.getElementById("nav-Exp").style.borderBottom = "2px solid black";
                document.getElementById("nav-onlineExp").style.border = "none"

            });

        document.getElementById("nav-onlineExp").addEventListener("click",
            (e) => {
                e.preventDefault();
                document.getElementById("nav-stays").style.border = "none";
                document.getElementById("nav-Exp").style.border = "none";
                document.getElementById("nav-onlineExp").style.borderBottom = "2px solid black"

            });

        document.getElementsByClassName("main-form-div")[0].style.display = "block";

    })
});

document.querySelectorAll(".main-form .row .inpdiv").forEach((element,) => {
    element.addEventListener("mouseover", () => {
        if (element.querySelector("input") != null) {
            element.querySelector("input").style.backgroundColor = "#f3f2f2";
        }
    })
    element.addEventListener("mouseout", () => {
        element.querySelector("input").style.backgroundColor = "white";
    })
});
//JS implementation for Dropdown area 
let elementDropdownButtonArea = document.querySelectorAll("#guestCount .dropdown-menu .dropdown-item div .user-choice");
let adultCounter = 0;
let infantCounter = 0;
let petCounter = 0;
let userChoice = "";
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
        document.querySelector("#guestCount > button >input").value = "";
        document.querySelector("#guestCount > button > input").value = userChoice;

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
        document.querySelector("#guestCount > button >input").value = "";
        document.querySelector("#guestCount > button > input").value = userChoice;
    })
});

document.getElementById("navbarBtn").addEventListener('click', () => {
    if (document.querySelector(".nav-dropdown >li >button#directToAdmin")) {
        document.querySelector(".nav-dropdown >li >button#directToAdmin").addEventListener('click', () => {
            location.href = "/admin";
        })
    } else if (document.querySelector(".nav-dropdown >li >button#directToHost")) {
        document.querySelector(".nav-dropdown >li >button#directToHost").addEventListener('click', () => {
            location.href = `/host?email=${globJson.email}&phone=${globJson.phoneNumber}`;
        })
    }
})

//Ajax handling for Login
if (document.getElementById("loginSignupForm") != null) {

    //Handling close button operation for login/signup dialog
    if (document.querySelector("#userLogin > div > .header > .close-btn") != null) {
        //Handling closing of the login/signup page
        document.querySelector("#userLogin > div > .header > .close-btn").addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById("userLogin").style.display = "none";
            document.querySelector('.main').style.opacity = "1";
        })
    }
    //Toggle user registration
    document.getElementById("linkRegister").addEventListener('click',(e)=>{
        e.preventDefault();
        document.querySelector("#userLogin .header .headText").remove();
        let header = document.createElement("h5");
        header.classList = "text-center headText mt-2";
        header.innerHTML = "Finish signing up";

        document.querySelector("#userLogin .header").appendChild(header);

        document.querySelector("#userLogin .container").innerHTML = `<form id="registerForm">
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="firstname">
      <label for="floatingInput">First name</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="lastname">
      <label for="floatingInput">Last name</label>
      <div id="helpText" class="form-text">Make sure it matches the name on your government ID.</div>
    </div>
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="dob">
      <label for="floatingInput">Date of birth</label>
      <div id="helpText" class="form-text">Format: MM/DD/YYYY</div>
      <div id="helpText" class="form-text">To sign up, you need to be at least 18. Your birthday won’t be shared with other people who use Airbnb.</div>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name = "checkType" id="exampleRadios1" value="host" >
      <label class="form-check-label" id="check-label" for="flexCheckDefault">Host</label>
    </div>
    <div class="form-check mb-3">
      <input class="form-check-input" type="radio" name ="checkType" id="exampleRadios2" value = "user">
      <label class="form-check-label" id="check-label" for="flexCheckDefault">User</label>
    </div>
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="email">
      <label for="floatingInput">Email</label>
      <div id="helpText" class="form-text">We'll email you trip confirmations and receipts.</div>
    </div>
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="phone">
      <label for="floatingInput">Phone Number</label>
      <div id="helpText" class="form-text">Make sure to enter phone number with country code.</div>
    </div>
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="country">
      <label for="floatingInput">Country</label>
    </div>
    <div class="form-floating mb-3">
      <input type="password" class="form-control" id="floatingInput" placeholder="name@example.com" name="password">
      <label for="floatingInput">Password</label>
      <div id="helpText" class="form-text">By selecting Agree and continue, I agree to Airbnb’s Terms of Service, Payments Terms of Service, and Nondiscrimination Policy and acknowledge the Privacy Policy.</div>
    </div>
    <div class="mb-4">
      <button class="btn" id="registerSubmit" onclick="invokeRegister()">Agree and continue</button>
    </div>
    <hr>
    <div id="helpText" class="form-text mb-2">
      Airbnb will send you members-only deals, inspiration, marketing emails, and push notifications. You can opt out of receiving these at any time in your account settings or directly from the marketing notification.
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
      <label class="form-check-label" id="check-label" for="flexCheckDefault">I dont want to receive marketing messages from Airbnb.</label>
    </div>
  </form>`;

        //Handling closing the registration dialog
        document.querySelector("#userLogin > div.mb-2 > div > button").addEventListener('click', () => {

            document.querySelector("#userLogin .header .headText").remove();
            document.querySelector("#userLogin .header button").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x"
            viewBox="0 0 16 16">
            <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>`;
            let header = document.createElement("h5");
            header.classList = "text-center headText mt-2";
            header.innerHTML = "Login or signup";

            document.querySelector("#userLogin .header").appendChild(header);

            document.querySelector("#userLogin .container").innerHTML = ` <h4 class="mb-4">Welcome to Airbnb</h4>
            <form id="loginSignupForm">
              <div class="form-floating">
                <select class="form-select" id="floatingSelect" aria-label="Floating label select example" name="countryCode">
                  <option value="358AX">Åland Islands (+358)</option>
                  <option value="355AL">Albania (+355)</option>
                  <option value="213DZ">Algeria (+213)</option>
                  <option value="93AF">Afghanistan (+93)</option>
                  <option value="1AS">American Samoa (+1)</option>
                  <option value="376AD">Andorra (+376)</option>
                  <option value="244AO">Angola (+244)</option>
                  <option value="1AI">Anguilla (+1)</option>
                  <option value="1AG">Antigua &amp; Barbuda (+1)</option>
                  <option value="54AR">Argentina (+54)</option>
                  <option value="374AM">Armenia (+374)</option>
                  <option value="297AW">Aruba (+297)</option>
                  <option value="61AU">Australia (+61)</option>
                  <option value="43AT">Austria (+43)</option>
                  <option value="994AZ">Azerbaijan (+994)</option>
                  <option value="1BS">Bahamas (+1)</option>
                  <option value="973BH">Bahrain (+973)</option>
                  <option value="880BD">Bangladesh (+880)</option>
                  <option value="1BB">Barbados (+1)</option>
                  <option value="375BY">Belarus (+375)</option>
                  <option value="32BE">Belgium (+32)</option>
                  <option value="501BZ">Belize (+501)</option>
                  <option value="229BJ">Benin (+229)</option>
                  <option value="1BM">Bermuda (+1)</option>
                  <option value="975BT">Bhutan (+975)</option>
                  <option value="591BO">Bolivia (+591)</option>
                  <option value="599BQ">Bonaire, Sint Eustatius and Saba (+599)</option>
                  <option value="387BA">Bosnia &amp; Herzegovina (+387)</option>
                  <option value="267BW">Botswana (+267)</option>
                  <option value="55BR">Brazil (+55)</option>
                  <option value="246IO">British Indian Ocean Territory (+246)</option>
                  <option value="1VG">British Virgin Islands (+1)</option>
                  <option value="673BN">Brunei (+673)</option>
                  <option value="359BG">Bulgaria (+359)</option>
                  <option value="226BF">Burkina Faso (+226)</option>
                  <option value="257BI">Burundi (+257)</option>
                  <option value="855KH">Cambodia (+855)</option>
                  <option value="237CM">Cameroon (+237)</option>
                  <option value="1CA">Canada (+1)</option>
                  <option value="238CV">Cape Verde (+238)</option>
                  <option value="1KY">Cayman Islands (+1)</option>
                  <option value="236CF">Central African Republic (+236)</option>
                  <option value="235TD">Chad (+235)</option>
                  <option value="56CL">Chile (+56)</option>
                  <option value="86CN">China (+86)</option>
                  <option value="61CX">Christmas Island (+61)</option>
                  <option value="61CC">Cocos (Keeling) Islands (+61)</option>
                  <option value="57CO">Colombia (+57)</option>
                  <option value="269KM">Comoros (+269)</option>
                  <option value="242CG">Congo (+242)</option>
                  <option value="682CK">Cook Islands (+682)</option>
                  <option value="506CR">Costa Rica (+506)</option>
                  <option value="225CI">Côte d’Ivoire (+225)</option>
                  <option value="385HR">Croatia (+385)</option>
                  <option value="53CU">Cuba (+53)</option>
                  <option value="599CW">Curaçao (+599)</option>
                  <option value="357CY">Cyprus (+357)</option>
                  <option value="420CZ">Czechia (+420)</option>
                  <option value="243CD">Democratic Republic of the Congo (+243)</option>
                  <option value="45DK">Denmark (+45)</option>
                  <option value="253DJ">Djibouti (+253)</option>
                  <option value="1DM">Dominica (+1)</option>
                  <option value="1DO">Dominican Republic (+1)</option>
                  <option value="593EC">Ecuador (+593)</option>
                  <option value="20EG">Egypt (+20)</option>
                  <option value="503SV">El Salvador (+503)</option>
                  <option value="240GQ">Equatorial Guinea (+240)</option>
                  <option value="291ER">Eritrea (+291)</option>
                  <option value="372EE">Estonia (+372)</option>
                  <option value="268SZ">Eswatini (+268)</option>
                  <option value="251ET">Ethiopia (+251)</option>
                  <option value="500FK">Falkland Islands (Islas Malvinas) (+500)</option>
                  <option value="298FO">Faroe Islands (+298)</option>
                  <option value="679FJ">Fiji (+679)</option>
                  <option value="358FI">Finland (+358)</option>
                  <option value="33FR">France (+33)</option>
                  <option value="594GF">French Guiana (+594)</option>
                  <option value="689PF">French Polynesia (+689)</option>
                  <option value="241GA">Gabon (+241)</option>
                  <option value="220GM">Gambia (+220)</option>
                  <option value="995GE">Georgia (+995)</option>
                  <option value="49DE">Germany (+49)</option>
                  <option value="233GH">Ghana (+233)</option>
                  <option value="350GI">Gibraltar (+350)</option>
                  <option value="30GR">Greece (+30)</option>
                  <option value="299GL">Greenland (+299)</option>
                  <option value="1GD">Grenada (+1)</option>
                  <option value="590GP">Guadeloupe (+590)</option>
                  <option value="1GU">Guam (+1)</option>
                  <option value="502GT">Guatemala (+502)</option>
                  <option value="44GG">Guernsey (+44)</option>
                  <option value="224GN">Guinea (+224)</option>
                  <option value="245GW">Guinea-Bissau (+245)</option>
                  <option value="592GY">Guyana (+592)</option>
                  <option value="509HT">Haiti (+509)</option>
                  <option value="504HN">Honduras (+504)</option>
                  <option value="852HK">Hong Kong (+852)</option>
                  <option value="36HU">Hungary (+36)</option>
                  <option value="354IS">Iceland (+354)</option>
                  <option value="91IN">India (+91)</option>
                  <option value="62ID">Indonesia (+62)</option>
                  <option value="964IQ">Iraq (+964)</option>
                  <option value="353IE">Ireland (+353)</option>
                  <option value="44IM">Isle of Man (+44)</option>
                  <option value="972IL">Israel (+972)</option>
                  <option value="39IT">Italy (+39)</option>
                  <option value="1JM">Jamaica (+1)</option>
                  <option value="81JP">Japan (+81)</option>
                  <option value="44JE">Jersey (+44)</option>
                  <option value="962JO">Jordan (+962)</option>
                  <option value="7KZ">Kazakhstan (+7)</option>
                  <option value="254KE">Kenya (+254)</option>
                  <option value="686KI">Kiribati (+686)</option>
                  <option value="383XK">Kosovo (+383)</option>
                  <option value="965KW">Kuwait (+965)</option>
                  <option value="996KG">Kyrgyzstan (+996)</option>
                  <option value="856LA">Laos (+856)</option>
                  <option value="371LV">Latvia (+371)</option>
                  <option value="961LB">Lebanon (+961)</option>
                  <option value="266LS">Lesotho (+266)</option>
                  <option value="231LR">Liberia (+231)</option>
                  <option value="218LY">Libya (+218)</option>
                  <option value="423LI">Liechtenstein (+423)</option>
                  <option value="370LT">Lithuania (+370)</option>
                  <option value="352LU">Luxembourg (+352)</option>
                  <option value="853MO">Macau (+853)</option>
                  <option value="389MK">Macedonia (+389)</option>
                  <option value="261MG">Madagascar (+261)</option>
                  <option value="265MW">Malawi (+265)</option>
                  <option value="60MY">Malaysia (+60)</option>
                  <option value="960MV">Maldives (+960)</option>
                  <option value="223ML">Mali (+223)</option>
                  <option value="356MT">Malta (+356)</option>
                  <option value="692MH">Marshall Islands (+692)</option>
                  <option value="596MQ">Martinique (+596)</option>
                  <option value="222MR">Mauritania (+222)</option>
                  <option value="230MU">Mauritius (+230)</option>
                  <option value="262YT">Mayotte (+262)</option>
                  <option value="52MX">Mexico (+52)</option>
                  <option value="691FM">Micronesia (+691)</option>
                  <option value="373MD">Moldova (+373)</option>
                  <option value="377MC">Monaco (+377)</option>
                  <option value="976MN">Mongolia (+976)</option>
                  <option value="382ME">Montenegro (+382)</option>
                  <option value="1MS">Montserrat (+1)</option>
                  <option value="212MA">Morocco (+212)</option>
                  <option value="258MZ">Mozambique (+258)</option>
                  <option value="95MM">Myanmar (+95)</option>
                  <option value="264NA">Namibia (+264)</option>
                  <option value="674NR">Nauru (+674)</option>
                  <option value="977NP">Nepal (+977)</option>
                  <option value="31NL">Netherlands (+31)</option>
                  <option value="687NC">New Caledonia (+687)</option>
                  <option value="64NZ">New Zealand (+64)</option>
                  <option value="505NI">Nicaragua (+505)</option>
                  <option value="227NE">Niger (+227)</option>
                  <option value="234NG">Nigeria (+234)</option>
                  <option value="683NU">Niue (+683)</option>
                  <option value="672NF">Norfolk Island (+672)</option>
                  <option value="1MP">Northern Mariana Islands (+1)</option>
                  <option value="47NO">Norway (+47)</option>
                  <option value="968OM">Oman (+968)</option>
                  <option value="92PK">Pakistan (+92)</option>
                  <option value="680PW">Palau (+680)</option>
                  <option value="970PS">Palestinian Territories (+970)</option>
                  <option value="507PA">Panama (+507)</option>
                  <option value="675PG">Papua New Guinea (+675)</option>
                  <option value="595PY">Paraguay (+595)</option>
                  <option value="51PE">Peru (+51)</option>
                  <option value="63PH">Philippines (+63)</option>
                  <option value="64PN">Pitcairn Islands (+64)</option>
                  <option value="48PL">Poland (+48)</option>
                  <option value="351PT">Portugal (+351)</option>
                  <option value="1PR">Puerto Rico (+1)</option>
                  <option value="974QA">Qatar (+974)</option>
                  <option value="262RE">Réunion (+262)</option>
                  <option value="40RO">Romania (+40)</option>
                  <option value="7RU">Russia (+7)</option>
                  <option value="250RW">Rwanda (+250)</option>
                  <option value="685WS">Samoa (+685)</option>
                  <option value="378SM">San Marino (+378)</option>
                  <option value="239ST">São Tomé &amp; Príncipe (+239)</option>
                  <option value="966SA">Saudi Arabia (+966)</option>
                  <option value="221SN">Senegal (+221)</option>
                  <option value="381RS">Serbia (+381)</option>
                  <option value="248SC">Seychelles (+248)</option>
                  <option value="232SL">Sierra Leone (+232)</option>
                  <option value="65SG">Singapore (+65)</option>
                  <option value="1SX">Sint Maarten (+1)</option>
                  <option value="421SK">Slovakia (+421)</option>
                  <option value="386SI">Slovenia (+386)</option>
                  <option value="677SB">Solomon Islands (+677)</option>
                  <option value="252SO">Somalia (+252)</option>
                  <option value="27ZA">South Africa (+27)</option>
                  <option value="500GS">South Georgia &amp; South Sandwich Islands (+500)</option>
                  <option value="82KR">South Korea (+82)</option>
                  <option value="211SS">South Sudan (+211)</option>
                  <option value="34ES">Spain (+34)</option>
                  <option value="94LK">Sri Lanka (+94)</option>
                  <option value="590BL">St Barthélemy (+590)</option>
                  <option value="290SH">St Helena (+290)</option>
                  <option value="1KN">St Kitts &amp; Nevis (+1)</option>
                  <option value="1LC">St Lucia (+1)</option>
                  <option value="590MF">St Martin (+590)</option>
                  <option value="508PM">St Pierre &amp; Miquelon (+508)</option>
                  <option value="1VC">St Vincent &amp; Grenadines (+1)</option>
                  <option value="249SD">Sudan (+249)</option>
                  <option value="597SR">Suriname (+597)</option>
                  <option value="47SJ">Svalbard &amp; Jan Mayen (+47)</option>
                  <option value="46SE">Sweden (+46)</option>
                  <option value="41CH">Switzerland (+41)</option>
                  <option value="886TW">Taiwan (+886)</option>
                  <option value="992TJ">Tajikistan (+992)</option>
                  <option value="255TZ">Tanzania (+255)</option>
                  <option value="66TH">Thailand (+66)</option>
                  <option value="670TL">Timor-Leste (+670)</option>
                  <option value="228TG">Togo (+228)</option>
                  <option value="690TK">Tokelau (+690)</option>
                  <option value="676TO">Tonga (+676)</option>
                  <option value="1TT">Trinidad &amp; Tobago (+1)</option>
                  <option value="216TN">Tunisia (+216)</option>
                  <option value="90TR">Turkey (+90)</option>
                  <option value="993TM">Turkmenistan (+993)</option>
                  <option value="1TC">Turks &amp; Caicos Islands (+1)</option>
                  <option value="688TV">Tuvalu (+688)</option>
                  <option value="256UG">Uganda (+256)</option>
                  <option value="380UA">Ukraine (+380)</option>
                  <option value="971AE">United Arab Emirates (+971)</option>
                  <option value="44GB">United Kingdom (+44)</option>
                  <option value="1US" selected>United States (+1)</option>
                  <option value="598UY">Uruguay (+598)</option>
                  <option value="1VI">US Virgin Islands (+1)</option>
                  <option value="998UZ">Uzbekistan (+998)</option>
                  <option value="678VU">Vanuatu (+678)</option>
                  <option value="379VA">Vatican City (+379)</option>
                  <option value="58VE">Venezuela (+58)</option>
                  <option value="84VN">Vietnam (+84)</option>
                  <option value="681WF">Wallis &amp; Futuna (+681)</option>
                  <option value="212EH">Western Sahara (+212)</option>
                  <option value="967YE">Yemen (+967)</option>
                  <option value="260ZM">Zambia (+260)</option>
                  <option value="263ZW">Zimbabwe (+263)</option>
                </select>
                <label for="floatingSelect">Country/Region</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="phoneNumber">
                <label for="floatingInput">Phone Number</label>
              </div>
              <div class="form-floating mb-3" style="display:none">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="email">
                <label for="floatingInput">Email</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingInput" placeholder="name@example.com" name="password">
                <label for="floatingInput">Password</label>
              </div>
              <div class="mb-4">
                <button class="btn" id="authSubmit">Continue</button>
              </div>
            </form>
            <div class="border-bottom"></div>
            <span id="small-text">or</span>
            <div class="mb-2 login-alt">
              <span class="image-span">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook"
                  viewBox="0 0 16 16">
                  <path
                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </span>
              <button class="btn alt-login">Continue with Facebook</button>
            </div>
            <div class="mb-2 login-alt">
              <span class="image-span">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google"
                  viewBox="0 0 16 16">
                  <path
                    d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
              </span>
              <button class="btn alt-login">Continue with Google</button>
            </div>
            <div class="mb-2 login-alt">
              <span class="image-span">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-apple"
                  viewBox="0 0 16 16">
                  <path
                    d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                  <path
                    d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                </svg>
              </span>
              <button class="btn alt-login">Continue with Apple</button>
            </div>
            <div class="mb-2 login-alt" id="EmailLogin">
              <span class="image-span">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope"
                  viewBox="0 0 16 16">
                  <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                </svg>
              </span>
              <button class="btn alt-login">Continue with Email</button>
            </div>
            <div class="mb-2 login-alt" id="PhoneLogin" style="display:none">
              <span class="image-span">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-phone"
                  viewBox="0 0 16 16">
                  <path
                    d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                  <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
              </span>
              <button class="btn alt-login">Continue with Phone</button>
            </div>`;
        });

        document.getElementById("exampleRadios1").addEventListener('click',()=>{
            globJson['radioType'] = document.getElementById("exampleRadios1").value;
        })
        document.getElementById("exampleRadios2").addEventListener('click',()=>{
            globJson['radioType'] = document.getElementById("exampleRadios2").value;
        })
    })
}

//For making Login/Signup page visible
document.querySelectorAll(".nav-dropdown >li >button")[0].addEventListener("click", () => {
    document.getElementById("userLogin").style.display = "block";
    document.querySelector('.main').style.opacity = "0.5";
    //For toggling Email and Phone login
    if (document.getElementById("EmailLogin") != null) {
        document.getElementById("EmailLogin").addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll("#userLogin > .container > form > .form-floating")[0].style.display = "none";
            document.querySelectorAll("#userLogin > .container > form > .form-floating")[1].style.display = "none";
            document.querySelectorAll("#userLogin > .container > form > .form-floating")[2].style.display = "block";
            document.querySelectorAll("#userLogin > .container > .login-alt")[4].style.display = "block";
            document.querySelectorAll("#userLogin > .container > .login-alt")[3].style.display = "none";
        });
    }
    if (document.getElementById("PhoneLogin") != null) {
        document.getElementById("PhoneLogin").addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll("#userLogin > .container > form > .form-floating")[2].style.display = "none";
            document.querySelectorAll("#userLogin > .container > form > .form-floating")[0].style.display = "block";
            document.querySelectorAll("#userLogin > .container > form > .form-floating")[1].style.display = "block";

            document.querySelectorAll("#userLogin > .container > .login-alt")[4].style.display = "none";
            document.querySelectorAll("#userLogin > .container > .login-alt")[3].style.display = "block";

        });
    }
});
document.querySelectorAll(".nav-dropdown >li >button")[1].addEventListener("click", () => {
    document.querySelectorAll(".nav-dropdown >li >button")[0].click();
});

function invokeMethod(){
    document.getElementById("loginSignupForm").dispatchEvent(new CustomEvent('submit'));
    document.getElementById("loginSignupForm").addEventListener('submit',(e)=>{
        e.preventDefault();
        loginUser();
    },{once:true})
}
function invokeRegister(){
    document.getElementById("registerForm").dispatchEvent(new CustomEvent('submit'));
    document.getElementById("registerForm").addEventListener('submit',(e)=>{
        e.preventDefault();
        e.stopPropagation();
        registerUser();
    },{once:true})

}
function loginUser(){
    
        let requestJson = {
            "countryCode": document.getElementsByName("countryCode")[0].value,
            "email": document.getElementsByName("email")[0].value,
            "phoneNumber": document.getElementsByName("phoneNumber")[0].value,
            "password": document.getElementsByName("password")[0].value
        }
        //Setting email and phoneNumber in global json
        globJson['email'] = requestJson.email ? requestJson.email : undefined;
        globJson['phoneNumber'] = requestJson.phoneNumber ? requestJson.phoneNumber : undefined;
        //POST call from form input
        let fetchResult = fetch("/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestJson)
        });
    
        fetchResult.then(res => res.json()).then((response) => {
            if (response.errors){
                document.getElementById("liveAlertPlaceholder").appendChild(
                    alertBadAuthentication(response.errors.message));
                return  
            }
            if ((response.email != undefined || response.phone != undefined) && (response.email == requestJson.email || response.phone.substring(4) == requestJson.phoneNumber)) {
                document.getElementById("userLogin").style.display = "none";
                //Remove default icon
                document.querySelector(".bi-person-circle").remove();
                //Add username's first name's first character as a badge
                let userBadgeDiv = document.createElement("div");
                userBadgeDiv.setAttribute("class", "circle");
                let userSpan = document.createElement("span");
                userSpan.setAttribute("class", "circle__content");
                userBadgeDiv.appendChild(userSpan);
                userSpan.innerText = response.firstname.charAt(0);
                document.getElementById("navbarBtn").appendChild(userBadgeDiv);
                //Set the background opacity to original
                document.querySelector('.main').style.opacity = "1";
                //Remove signup and Login options from the user-loggedin dropdown
                document.querySelector(".clubbed-items .navbar-nav .dropdown-menu").innerHTML = "";
                if (response.type == "admin") {
                    document.querySelector(".clubbed-items .navbar-nav .dropdown-menu").innerHTML += `<li><button class="dropdown-item" type="button" id="directToAdmin">Admin Corner</button></li>`;
                } else if (response.type == "host") {
                    document.querySelector(".clubbed-items .navbar-nav .dropdown-menu").innerHTML += `<li><button class="dropdown-item" type="button" id="directToHost">Host Corner</button></li>`;
                }
                document.querySelector(".clubbed-items .navbar-nav .dropdown-menu").innerHTML += `<li><button class="dropdown-item" type="button">Airbnb your home</button></li>
            <li><button class="dropdown-item" type="button">Host an experience</button></li>
            <li><button class="dropdown-item" type="button">Help</button></li>
            <li><button class="dropdown-item" type="button" onclick='logoutUser()'>Logout</button></li>`;
            } 
        }).catch((e) => {
            console.log(e);
        })
}

function registerUser(){
let requestJson = {
    "firstname": document.getElementsByName("firstname")[0].value,
    "lastname": document.getElementsByName("lastname")[0].value,
    "email": document.getElementsByName("email")[0].value,
    "dob": document.getElementsByName("dob")[0].value,
    "password": document.getElementsByName("password")[0].value,
    "type": globJson['radioType'],
    "phone": document.getElementsByName("phone")[0].value,
    "country": document.getElementsByName("country")[0].value
}
//POST call from form input
fetch("/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(requestJson)
}).then((res) => res).then((response)=>{
   if (!response.ok){
    response.json().then((val)=>{
        document.getElementById("liveAlertPlaceholder").appendChild(
            alert(val));
    })
}else{
      if (requestJson.type === "host"){
        location.href = `http://localhost:3000/host?email=${requestJson.email}&phone=${requestJson.phone}`;
      }
    document.getElementById("userLogin").style.display = "none";
    document.querySelector('.main').style.opacity = "1";
    document.querySelector(".bi-person-circle").remove();
    //Add username's first name's first character as a badge
    let userBadgeDiv = document.createElement("div");
    userBadgeDiv.setAttribute("class", "circle");
    let userSpan = document.createElement("span");
    userSpan.setAttribute("class", "circle__content");
    userBadgeDiv.appendChild(userSpan);
    userSpan.innerText = requestJson.firstname.charAt(0);
    document.getElementById("navbarBtn").appendChild(userBadgeDiv);
    //Remove signup and Login options from the user-loggedin dropdown
    document.querySelector(".clubbed-items .navbar-nav .dropdown-menu").innerHTML = "";
    document.querySelector(".clubbed-items .navbar-nav .dropdown-menu").innerHTML = `<li><button class="dropdown-item" type="button">Airbnb your home</button></li>
<li><button class="dropdown-item" type="button">Host an experience</button></li>
<li><button class="dropdown-item" type="button">Help</button></li>
<li><button class="dropdown-item" type="button" onclick='logoutUser()'>Logout</button></li>`
    }
}).catch((error)=>{
    console.log(error);
});
}

//Upon clicking on Airbnb your home button
if (document.getElementById("you-earn") != null) {
    document.getElementById("you-earn").addEventListener("click", () => {
        document.getElementById("userLogin").style.display = "block";
        document.querySelector('.main').style.opacity = "0.5";
        //For toggling Email and Phone login
        document.getElementById("EmailLogin").addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll("#userLogin > .container > form > .form-floating")[0].style.display = "none";
            document.querySelectorAll("#userLogin > .container > form > .form-floating")[1].style.display = "none";
            document.querySelectorAll("#userLogin > .container > form > .form-floating")[2].style.display = "block";
            document.querySelectorAll("#userLogin > .container > .login-alt")[4].style.display = "block";
            document.querySelectorAll("#userLogin > .container > .login-alt")[3].style.display = "none";
        });

        document.getElementById("PhoneLogin").addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll("#userLogin > .container > form > .form-floating")[2].style.display = "none";
            document.querySelectorAll("#userLogin > .container > form > .form-floating")[0].style.display = "block";
            document.querySelectorAll("#userLogin > .container > form > .form-floating")[1].style.display = "block";

            document.querySelectorAll("#userLogin > .container > .login-alt")[4].style.display = "none";
            document.querySelectorAll("#userLogin > .container > .login-alt")[3].style.display = "block";

        });
    })
}

document.querySelectorAll(".nav-dropdown >li >button")[2].addEventListener("click", () => {
    document.getElementById("you-earn").click();
})

if (document.getElementById("expandfooter") != null) {

    document.getElementById("expandfooter").addEventListener('click', () => {

        let element = document.getElementById("footerLinkSection");
        element.style.display = "block";
        element.style.position = "sticky";
        element.style.bottom = "5%";
        element.style.transition = "ease-in;"
        element.style.transitionDelay = "3s";
        element.style.zIndex = "10";
        element.style.backgroundColor = "white";
        document.getElementById("expandfooter").style.display = "none";
        document.getElementById("collapsefooter").style.display = "inline";
        return
    })
}


if (document.getElementById("collapsefooter") != null) {

    document.getElementById("collapsefooter").addEventListener('click', () => {
        let element = document.getElementById("footerLinkSection");
        element.style.transition = "ease-down;"
        element.style.transitionDelay = "3s";
        element.style.zIndex = "10";
        element.style.backgroundColor = "white";
        element.style.display = "none";
        document.getElementById("collapsefooter").style.display = "none";
        document.getElementById("expandfooter").style.display = "inline";
        return
    })
}

//Navigate to Rooms sections or property page
document.querySelectorAll(".grid-container .grid-col").forEach(element => {
    element.querySelector("img").addEventListener('click', () => {
        var globSearchObj = JSON.parse(window.localStorage.getItem("tempJson"));
        if (globSearchObj == undefined){
            globSearchObj = reusableExecutor(element);
        }
        window.localStorage.setItem("secpr",element.querySelector(".prop-details > .prop-price").innerText);   
        location.href = `/rooms/${element.querySelector("#prop_id").innerHTML}?checkin=${globSearchObj['checkin']}&checkout=${globSearchObj['checkout']}&guests=${globSearchObj['guests']}`;
        window.localStorage.clear();
    })
    element.querySelector(".prop-details > p").addEventListener('click', () => {
        var globSearchObj = JSON.parse(window.localStorage.getItem("tempJson"));
        if (globSearchObj == undefined){
            globSearchObj = reusableExecutor(element);
        }
        
        window.localStorage.setItem("secpr",element.querySelector(".prop-details > .prop-price").innerText);
        location.href = `/rooms/${element.querySelector("#prop_id").innerHTML}?checkin=${globSearchObj['checkin']}&checkout=${globSearchObj['checkout']}&guests=${globSearchObj['guests']}`;
        window.localStorage.clear();
    })

    element.querySelector(".prop-details > .prop-desc").addEventListener('click',()=>{
        var globSearchObj = JSON.parse(window.localStorage.getItem("tempJson"));
        if (globSearchObj == undefined){
            globSearchObj = reusableExecutor(element);
        }
        window.localStorage.setItem("secpr",element.querySelector(".prop-details > .prop-price").innerText);
        location.href = `/rooms/${element.querySelector("#prop_id").innerHTML}?checkin=${globSearchObj['checkin']}&checkout=${globSearchObj['checkout']}&guests=${globSearchObj['guests']}`;
        window.localStorage.clear();
    })

    element.querySelector(".prop-details > .prop-price").addEventListener('click',()=>{
        var globSearchObj = JSON.parse(window.localStorage.getItem("tempJson"));
        if (globSearchObj == undefined){
            globSearchObj = reusableExecutor(element);
        }
        window.localStorage.setItem("secpr",element.querySelector(".prop-details > .prop-price").innerText);
        location.href = `/rooms/${element.querySelector("#prop_id").innerHTML}?checkin=${globSearchObj['checkin']}&checkout=${globSearchObj['checkout']}&guests=${globSearchObj['guests']}`;
        window.localStorage.clear();
    })
});

function logoutUser(){
    fetch("/logout",{method: "POST"})
    .then(res=>res.json()).then(response=>{
        location.href = "/";
    })
}
function reusableExecutor(element){
    let globSearchObj = {};
    let modDate = element.querySelectorAll(".prop-details .prop-desc")[1].innerText;
    let formedString = `${new Date().getFullYear()}-${monthObj[modDate.split(" ")[3]]}-${(modDate.split(" ")[0]<10)?`0${modDate.split(" ")[0]}`:modDate.split(" ")[0]}`;
    globSearchObj['checkin'] = formedString;
    formedString = `${new Date().getFullYear()}-${monthObj[modDate.split(" ")[3]]}-${(modDate.split(" ")[2]<10)?`0${modDate.split(" ")[2]}`:modDate.split(" ")[2]}`
    globSearchObj['checkout'] = formedString;
    globSearchObj['guests'] = "1 guest";
    return globSearchObj;
}

const alert = (message) => {
    const receivedError = message.errors;
    let finalMessage = "";
    if (receivedError.length > 2){
        finalMessage = "Please check all your inputs carefully or empty inputs if any";
    }else if (receivedError.length <= 2){
        receivedError.forEach((val)=>{
            if (val.password){
                finalMessage += finalMessage == ""?val.password:", "+val.password;
            }else if (val.dob){
                finalMessage += finalMessage == ""?val.dob:", "+val.dob;
            }else if (val.email){
                finalMessage += finalMessage == ""?val.email:", "+val.email;
            }else if (val.firstname){
                finalMessage += finalMessage == ""?val.firstname:", "+val.firstname;
            }else if (val.lastname){
                finalMessage += finalMessage == ""?val.lastname:", "+val.lastname;
            }else if (val.checkType){
                finalMessage += finalMessage == ""?val.checkType:", "+val.checkType;
            }else if (val.phone){
                finalMessage += finalMessage == ""?val.phone:", "+val.phone;
            }else if (val.country){
                finalMessage += finalMessage == ""?val.country:", "+val.country;
            }

        })
    }
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-danger alert-dismissible" role="alert">`,
      `   <div>${finalMessage}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
    return wrapper;
  }

const alertBadAuthentication = (message)=>{
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-danger alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
    return wrapper;

}