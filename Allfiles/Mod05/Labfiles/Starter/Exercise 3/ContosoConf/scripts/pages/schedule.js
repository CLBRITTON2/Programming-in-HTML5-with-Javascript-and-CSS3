let schedules = [];
const list = document.getElementById("schedule");
const track1CheckBox = document.getElementById("show-track-1");
const track2CheckBox = document.getElementById("show-track-2");

const downloadSchedule = () => {

    const request = new XMLHttpRequest();
    request.open("GET", "/schedule/list", true);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            try {
                const response = JSON.parse(request.responseText);
                if (request.status === 200) {
                    schedules = response.schedule;
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

const createSessionElement = (session) => {
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

const clearList = () => {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

const displaySchedule = () => {
    clearList();
    for(let schedule of schedules)
        const tracks = schedul.tracks;
        const isCurrentTrack = (track1CheckBox.checked && tracks.indexOf(1) >= 0) ||
            (track2CheckBox.checked && tracks.indexOf(2) >= 0);
        if (isCurrentTrack) {
            const li = createSessionElement(schedule);
            list.appendChild(li);
        }
    }

const saveStar = (sessionId, isStarred) => {
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

const handleListClick = (event) => {
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















































































































































































































