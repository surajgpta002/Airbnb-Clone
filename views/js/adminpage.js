//Alert section
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

if (location.href.includes("/host")) {
    document.title = "Airbnb- Host corner";
}
if (location.href.includes("/admin")) {
    document.title = "Airbnb- Admin corner";
}

function invokeSubmit() {
    let heading = document.querySelector(".add-prop-dialog .header .headText").innerHTML;
    if (!heading.includes("Edit Property")) {
        document.getElementById("propertyForm").dispatchEvent(new CustomEvent('submit'));
        document.getElementById("propertyForm").addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
            submitForm("addition");
        }, { once: true })
    } else {
        document.getElementById("propertyForm").dispatchEvent(new CustomEvent('submit'));
        document.getElementById("propertyForm").addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
            submitForm("edit");
        }, { once: true })
    }
}

// Form submisssion for edit and add property
function submitForm(submitType) {
    if (submitType === "addition") {
        let requestBody = {
            "name": document.getElementsByName("propname")[0].value,
            "address": {
                "market": document.getElementsByName("address")[0].value,
                'country': document.getElementsByName("country")[0].value
            },
            "accommodates": document.getElementsByName("accomodation")[0].value,
            "images": {
                "picture_url": document.getElementsByName("imageUrl")[0].value
            },
            "price": document.getElementsByName("price")[0].value,
            "review_scores": {
                "review_scores_value": document.getElementsByName("review")[0].value
            }

        }
        if (location.href.includes("/host")) {
            fetch('/host/addProp', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            }).then(res => res.json()).then(response => {
                if (response.errors) {
                    alertPlaceholder.appendChild(alertBadAuthentication(response));
                    return
                }
                alertPlaceholder.appendChild(alert("Success! admin has been informed about the property addition request"));
            })
        }
        if (location.href.includes("/admin")) {
            let fetchedResult = fetch('/admin/addProperty', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            fetchedResult.then(res => res.json()).then((response) => {
                if (response.errors) {
                    alertPlaceholder.appendChild(alertBadAuthentication(response));
                    return
                }
                document.querySelector(".add-prop-dialog").style.display = "none";
                document.querySelector(".navbar").style.opacity = "1";
                document.getElementById("aside-menu").style.opacity = "1";
                document.querySelector(".grid-display").style.opacity = "1";

                //Add row to the table view
                let addedRow = document.createElement("div");
                addedRow.classList = "row result-row";

                //Individual columns
                let column1 = document.createElement("div");
                column1.classList = "col pt-2 prop-name";
                column1.innerHTML = requestBody.name;

                let column2 = document.createElement("div");
                column2.classList = "col pt-2";
                column2.innerHTML = requestBody.address.market;

                let column3 = document.createElement("div");
                column3.classList = "col pt-2";
                column3.innerHTML = requestBody.address.country;

                let column4 = document.createElement("div");
                column4.classList = "col pt-2";
                column4.innerHTML = requestBody.accommodates;

                let column5 = document.createElement("div");
                column5.classList = "col pt-2";
                column5.innerHTML = `$ ${requestBody.price}`;

                let column6 = document.createElement("div");
                column6.classList = "col pt-2 d-flex justify-content-evenly";
                let priceDiv = document.createElement("div");
                priceDiv.innerHTML = requestBody.review_scores.review_scores_value;
                column6.appendChild(priceDiv);
                let clubbedButtons = document.createElement("div");
                clubbedButtons.classList - "clubbed-container";
                clubbedButtons.innerHTML = `<button class="btn btn-secondary edit-prop" onclick="invokeEdit(this)">Edit</button>
        <button class="btn btn-danger rev-prop" onclick="invokeDelete(this)">Delete</button>`;
                column6.appendChild(clubbedButtons);

                addedRow.appendChild(column1);
                addedRow.appendChild(column2);
                addedRow.appendChild(column3);
                addedRow.appendChild(column4);
                addedRow.appendChild(column5);
                addedRow.appendChild(column6);

                //Add the new row at end
                document.querySelector(".grid-display .container .result").appendChild(addedRow);
            }).catch((error) => {
                console.log(error);
            })
        }
    } else if (submitType === "edit") {
        let request = {
            "name": document.getElementsByName("propname")[0].value,
            "address": {
                "market": document.getElementsByName("address")[0].value,
                'country': document.getElementsByName("country")[0].value
            },
            "accommodates": parseInt(document.getElementsByName("accomodation")[0].value),
            "images": {
                "picture_url": document.getElementsByName("imageUrl")[0].value
            },
            "price": document.getElementsByName("price")[0].value,
            "review_scores": {
                "review_scores_value": document.getElementsByName("review")[0].value ? document.getElementsByName("review")[0].value : ""
            }
        }
        if (location.href.includes("/host")) {
            document.querySelector(".add-prop-dialog").style.display = "none";
            document.querySelector(".navbar").style.opacity = "1";
            document.getElementById("aside-menu").style.opacity = "1";
            document.querySelector(".grid-display").style.opacity = "1";
            fetch('/host/editProp', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request)
            }).then(res => res.json()).then(response => {
                if (response.errors) {
                    alertPlaceholder.appendChild(
                        alertBadAuthentication(response));
                    return
                }
                alertPlaceholder.appendChild(alert("Success! admin has been informed about the property edit request"));
            })
        }
        if (location.href.includes("/admin")) {
            //PUT call for update
            let putResult = fetch('/admin/updateProperty', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            });

            putResult.then(res => res.json()).then(response => {
                if (response.errors) {
                    alertPlaceholder.appendChild(
                        alertBadAuthentication(response));
                    return
                }
                document.querySelector(".add-prop-dialog").style.display = "none";
                document.querySelector(".navbar").style.opacity = "1";
                document.getElementById("aside-menu").style.opacity = "1";
                document.querySelector(".grid-display").style.opacity = "1";

                //Ajax call to refresh the table
                let result = fetch('/admin', { method: "GET" });
                result.then(res => res.text()).then(response => {
                    let parser = new DOMParser();
                    let doc = parser.parseFromString(response, "text/html");
                    document.getElementsByClassName("result")[0].innerHTML = doc.getElementsByClassName("result")[0].innerHTML;
                })

            }).catch((error) => {
                console.log(error);
            })
        }
    }
    document.querySelector(".add-prop-dialog").style.display = "none";
    document.querySelector(".navbar").style.opacity = "1";
    document.getElementById("aside-menu").style.opacity = "1";
    document.querySelector(".grid-display").style.opacity = "1";

}
//Close add or edit dialog
function closeDialog() {
    if (!location.href.includes("users")) {
        document.querySelector(".add-prop-dialog").style.display = "none";
        document.querySelector(".navbar").style.opacity = "1";
        document.getElementById("aside-menu").style.opacity = "1";
        document.querySelector(".grid-display").style.opacity = "1";
    } else {
        document.getElementById("add-user-dialog").style.display = "none";
        document.querySelector(".navbar").style.opacity = "1";
        document.getElementById("aside-menu").style.opacity = "1";
        document.querySelector(".grid-display").style.opacity = "1";
    }
}

function invokeAddProperty() {
    if (!location.href.includes("users")) {
        document.querySelector(".add-prop-dialog").style.display = "block";

        //Change the button name and heading for edit operation
        document.querySelector(".add-prop-dialog .header .headText").innerHTML = "Add Property";
        document.querySelector("#propertyForm .formbutton").innerHTML = "Add"
        let inputForm = document.getElementById("propertyForm");
        inputForm.querySelectorAll("div input")[0].value = "";

        inputForm.querySelectorAll("div input")[1].value = "";
        inputForm.querySelectorAll("div input")[2].value = "";
        inputForm.querySelectorAll("div input")[3].value = "";
        inputForm.querySelectorAll("div input")[4].value = "";
        inputForm.querySelectorAll("div input")[5].value = "";
        inputForm.querySelectorAll("div input")[6].value = "";

        document.querySelector(".navbar").style.opacity = "0.5";
        document.getElementById("aside-menu").style.opacity = "0.5";
        document.querySelector(".grid-display").style.opacity = "0.5";
        document.querySelector(".add-prop-dialog").style.opacity = "1";
    } else {
        let inputForm = document.getElementById("userForm");
        inputForm.querySelectorAll("div input")[0].value = "";

        inputForm.querySelectorAll("div input")[1].value = "";
        inputForm.querySelectorAll("div input")[2].value = "";
        inputForm.querySelectorAll("div input")[3].value = "";
        inputForm.querySelectorAll("div input")[4].value = "";
        inputForm.querySelectorAll("div input")[5].value = "";
        inputForm.querySelectorAll("div input")[6].value = "";
        document.getElementById("add-user-dialog").style.display = "block";
        document.querySelector(".navbar").style.opacity = "0.5";
        document.getElementById("aside-menu").style.opacity = "0.5";
        document.querySelector(".grid-display").style.opacity = "0.5";

    }
}

function invokeEdit(element) {
    document.querySelector(".add-prop-dialog").style.display = "block";
    document.querySelector(".navbar").style.opacity = "0.5";
    document.getElementById("aside-menu").style.opacity = "0.5";
    document.querySelector(".grid-display").style.opacity = "0.5";

    //Change the button name and heading for edit operation
    document.querySelector(".add-prop-dialog .header .headText").innerHTML = "Edit Property";
    document.querySelector("#propertyForm .formbutton").innerHTML = "Edit"
    //Grabbing the name of the record to be edited
    let requiredDiv = element.parentElement.parentElement.parentElement;

    fetchDetails(requiredDiv);
}

function fetchDetails(element) {
    if (location.href.includes("/admin")) {
        let fetchResult = fetch(`/admin/getProperty?name=${element.getElementsByClassName("col")[0].innerHTML}`);

        fetchResult.then(res => res.json()).then(response => {
            let inputForm = document.getElementById("propertyForm");
            inputForm.querySelectorAll("div input")[0].value = response.name;

            inputForm.querySelectorAll("div input")[1].value = response.address.market;
            inputForm.querySelectorAll("div input")[2].value = response.address.country;
            inputForm.querySelectorAll("div input")[3].value = response.accommodates;
            inputForm.querySelectorAll("div input")[4].value = response.images["picture_url"];
            inputForm.querySelectorAll("div input")[5].value = response.price["$numberDecimal"];
            let review = response["review_scores"] ? response["review_scores"] : undefined;
            inputForm.querySelectorAll("div input")[6].value = review["review_scores_value"] ? review["review_scores_value"] : "";

        }).catch(error => {
            console.log(error);
        })
    } else if (location.href.includes("/host")) {
        let inputForm = document.getElementById("propertyForm");
        let parent_row = element;
        inputForm.querySelectorAll("div input")[0].value = parent_row.querySelectorAll('.col')[0].innerHTML;

        inputForm.querySelectorAll("div input")[1].value = parent_row.querySelectorAll('.col')[1].innerHTML;
        inputForm.querySelectorAll("div input")[2].value = parent_row.querySelectorAll('.col')[2].innerHTML;
        inputForm.querySelectorAll("div input")[3].value = parent_row.querySelectorAll('.col')[3].innerHTML;
        inputForm.querySelectorAll("div input")[4].value = "";
        inputForm.querySelectorAll("div input")[5].value = parent_row.querySelectorAll('.col')[4].innerHTML.split(" ")[1];

        inputForm.querySelectorAll("div input")[6].value = parent_row.querySelectorAll('.col')[5].querySelector('div').innerHTML;
    }
}

function invokeDelete(element) {
    document.querySelector(".alertBox").style.display = "block";
    document.querySelector(".navbar").style.opacity = "0.5";
    document.getElementById("aside-menu").style.opacity = "0.5";
    document.querySelector(".grid-display").style.opacity = "0.5";

    document.getElementById("yes").addEventListener('click', () => {
        document.querySelector(".alertBox").style.display = "none";
        document.querySelector(".navbar").style.opacity = "1";
        document.getElementById("aside-menu").style.opacity = "1";
        document.querySelector(".grid-display").style.opacity = "1";

        if (location.href.includes("/host")) {
            document.querySelector(".add-prop-dialog").style.display = "none";
            document.querySelector(".navbar").style.opacity = "1";
            document.getElementById("aside-menu").style.opacity = "1";
            document.querySelector(".grid-display").style.opacity = "1";
            fetch('/host/deleteProp', {
                method: "DELETE",
            }).then(res => res.json()).then(response => {
                alertPlaceholder.appendChild(alert("Success! admin has been informed about the property deletion request"));
            })
            return

        }
        if (location.href.includes("/admin")) {
            let requiredDiv = element.parentElement.parentElement.parentElement;
            let result = fetch(`/admin/deleteProperty?name=${requiredDiv.getElementsByClassName("col")[0].innerHTML}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });


            result.then(res => res.json()).then(response => {
                requiredDiv.remove();

                //Ajax call to refresh the table
                let result = fetch('/admin', { method: "GET" });
                result.then(res => res.text()).then(response => {
                    let parser = new DOMParser();
                    let doc = parser.parseFromString(response, "text/html");
                    document.getElementsByClassName("result")[0].innerHTML = doc.getElementsByClassName("result")[0].innerHTML;
                })
            })


        }
    })
    document.getElementById("no").addEventListener('click', () => {
        document.querySelector(".alertBox").style.display = "none";
        document.querySelector(".navbar").style.opacity = "1";
        document.getElementById("aside-menu").style.opacity = "1";
        document.querySelector(".grid-display").style.opacity = "1";
    })
}

function invokeUserSubmit() {
    document.querySelector("#add-user-dialog #userForm").dispatchEvent(new Event("submit"));

    document.querySelector("#add-user-dialog #userForm").addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();
        userAddition();
    },{once:true})
}
//Add users in the db
function userAddition() {
    let requestBody = {
        "firstname": document.getElementsByName("firstname")[0].value,
        "lastname": document.getElementsByName("lastname")[0].value,
        "email": document.getElementsByName("email")[0].value,
        "phone": document.getElementsByName("phone")[0].value,
        "country": document.getElementsByName("usercountry")[0].value,
        "dob": document.getElementsByName("dob")[0].value,
        "password": document.getElementsByName("password")[0].value
    }

    let postUser = fetch('users/addUser', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })

    postUser.then(res => res.json()).then(response => {
        if (response.errors) {
            alertPlaceholder.appendChild(
                alertBadAddRequest(response));
            return
        }
        document.getElementById("add-user-dialog").style.display = "none";
        document.querySelector(".navbar").style.opacity = "1";
        document.getElementById("aside-menu").style.opacity = "1";
        document.querySelector(".grid-display").style.opacity = "1";

        //Ajax call to refresh the table
        let result = fetch('users', { method: "GET" });
        result.then(res => res.text()).then(response => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(response, "text/html");

            document.querySelector(".users-grid .result").innerHTML = doc.querySelector(".users-grid .result").innerHTML;
        })
    })

}

function deleteUser(element) {
    document.querySelector(".alertBox").style.display = "block";
    document.querySelector(".navbar").style.opacity = "0.5";
    document.getElementById("aside-menu").style.opacity = "0.5";
    document.querySelector(".grid-display").style.opacity = "0.5";

    document.getElementById("yes").addEventListener('click', () => {
        document.querySelector(".alertBox").style.display = "none";
        document.querySelector(".navbar").style.opacity = "1";
        document.getElementById("aside-menu").style.opacity = "1";
        document.querySelector(".grid-display").style.opacity = "1";

        let requiredDiv = element.parentElement.parentElement.parentElement;
        let result = fetch(`users/deleteUser?firstname=${requiredDiv.getElementsByClassName("col")[0].innerHTML}&email=${requiredDiv.getElementsByClassName("col")[4].innerHTML}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        result.then(res => res.json()).then(response => {
            requiredDiv.remove();

            //Ajax call to refresh the table
            let result = fetch('users', { method: "GET" });
            result.then(res => res.text()).then(response => {
                let parser = new DOMParser();
                let doc = parser.parseFromString(response, "text/html");

                document.querySelector(".users-grid .result").innerHTML = doc.querySelector(".users-grid .result").innerHTML;
            })
        })

    })
    document.getElementById("no").addEventListener('click', () => {
        document.querySelector(".alertBox").style.display = "none";
        document.querySelector(".navbar").style.opacity = "1";
        document.getElementById("aside-menu").style.opacity = "1";
        document.querySelector(".grid-display").style.opacity = "1";
    })
}

document.querySelector("#aside-menu .navigation-menu #option-1").addEventListener('click', () => {
    let currentUrl = location.href;
    if (currentUrl.includes("users")) {
        location.href = currentUrl.substring(0, currentUrl.indexOf("/users"));
    } else {
        location.reload();
    }
    document.querySelector("#aside-menu .navigation-menu #option-1").classList = "active";
    document.querySelector("#aside-menu .navigation-menu #option-2").classList = "";
})

if (location.href.includes('admin')) {
    document.querySelector("#aside-menu .navigation-menu #option-2").addEventListener('click', () => {
        let currentUrl = location.href;
        if (currentUrl.includes("users")) {
            location.reload();
        } else {
            location.href = currentUrl + "users";
        }
        document.querySelector("#aside-menu .navigation-menu #option-2").classList = "active";
        document.querySelector("#aside-menu .navigation-menu #option-1").classList = "";
    })
}


const alert = (message) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-success alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)

    return wrapper;
}

const alertBadAuthentication = (message) => {
    const receivedError = message.errors;
    let finalMessage = "";
    if (receivedError.length > 2) {
        finalMessage = "Please check all your inputs carefully or empty inputs if any";
    } else if (receivedError.length <= 2) {
        receivedError.forEach((val) => {
            if (val.name) {
                finalMessage += finalMessage == "" ? val.name : ", " + val.name;
            } else if (val['address.market']) {
                finalMessage += finalMessage == "" ? val['address.market'] : ", " + val['address.market'];
            } else if (val['address.country']) {
                finalMessage += finalMessage == "" ? val['address.country'] : ", " + val['address.country'];
            } else if (val.accommodates) {
                finalMessage += finalMessage == "" ? val.accommodates : ", " + val.accommodates;
            } else if (val["images.picture_url"]) {
                finalMessage += finalMessage == "" ? val["images.picture_url"] : ", " + val["images.picture_url"];
            } else if (val.price) {
                finalMessage += finalMessage == "" ? val.price : ", " + val.price;
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


const alertBadAddRequest = (message) => {
    const receivedError = message.errors;
    let finalMessage = "";
    if (receivedError.length > 2) {
        finalMessage = "Please check all your inputs carefully or empty inputs if any";
    } else if (receivedError.length <= 2) {
        receivedError.forEach((val) => {
            if (val.password) {
                finalMessage += finalMessage == "" ? val.password : ", " + val.password;
            } else if (val.dob) {
                finalMessage += finalMessage == "" ? val.dob : ", " + val.dob;
            } else if (val.email) {
                finalMessage += finalMessage == "" ? val.email : ", " + val.email;
            } else if (val.firstname) {
                finalMessage += finalMessage == "" ? val.firstname : ", " + val.firstname;
            } else if (val.lastname) {
                finalMessage += finalMessage == "" ? val.lastname : ", " + val.lastname;
            } else if (val.phone) {
                finalMessage += finalMessage == "" ? val.phone : ", " + val.phone;
            } else if (val.country) {
                finalMessage += finalMessage == "" ? val.country : ", " + val.country;
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

function logoutUser(){
    fetch("/logout",{method: "POST"})
    .then(res=>res.json()).then(response=>{
        location.href = "/";
    })
}
