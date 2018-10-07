let schedule = [];
const list = document.getElementById("schedule");
const track1CheckBox = document.getElementById("show-track-1");
const track2CheckBox = document.getElementById("show-track-2");

function downloadSchedule() {
    const request = new XMLHttpRequest();
    request.open("GET", "/schedule/list", true);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            try {
                const response = JSON.parse(request.responseText);
                if (request.status === 200) {
                    schedule = response.schedule;
                    displaySchedule();
                } else {
                    alert(response.message);
                }
            } catch (exception) {
                alert("Schedule list not available.");
            }
        }
    };
    request.send();
}

function createSessionElement(session) {
    const li = document.createElement("li");

    li.sessionId = session.id;

    const star = document.createElement("a");
    star.setAttribute("href", "#");
    star.setAttribute("class", "star");
    li.appendChild(star);

    const title = document.createElement("span");
    title.textContent = session.title;
    li.appendChild(title);

    return li;
};

function clearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function displaySchedule() {
    clearList();
    for (let i = 0; i < schedule.length; i++) {
        const tracks = schedule[i].tracks;
        const isCurrentTrack = (track1CheckBox.checked && tracks.indexOf(1) >= 0) ||
                             (track2CheckBox.checked && tracks.indexOf(2) >= 0);
        if (isCurrentTrack) {
            const li = createSessionElement(schedule[i]);
            list.appendChild(li);
        }
    }
}

function saveStar(sessionId, isStarred) {
    // TODO: Create an XMLHttpRequest that POSTs to "/schedule/star/{sessionId}"
    //       The request body must have the content type "application/x-www-form-urlencoded"
    //       e.g. "starred=true" or "starred=false"
    //       The response contains a JSON object "{ starCount: <number> }"
    //       If the star count is more than 50, warn the user about this being a busy session.
    const request = new XMLHttpRequest();
    request.open("POST", "/schedule/star/" + sessionId, true);
    if (isStarred) {
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                const response = JSON.parse(request.responseText);
                if (response.starCount > 50) {
                    alert("This session is very popular! Be sure to arrive early to get a seat.");
                }
            }
        };
    }
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    const data = "starred=" + isStarred;
    request.send(data);
}

function handleListClick(event) {
    const isStarElement = event.srcElement.classList.contains("star");
    if (isStarElement) {
        event.preventDefault(); // Stop the browser following the clicked <a> element's href.

        const listItem = event.srcElement.parentNode;
        if (listItem.classList.contains("starred")) {
            listItem.classList.remove("starred");
            saveStar(listItem.sessionId, false);
        } else {
            listItem.classList.add("starred");
            saveStar(listItem.sessionId, true);
        }
    }
}

track1CheckBox.addEventListener("click", displaySchedule, false);
track2CheckBox.addEventListener("click", displaySchedule, false);
list.addEventListener("click", handleListClick, false);

downloadSchedule();
















































































































































































































