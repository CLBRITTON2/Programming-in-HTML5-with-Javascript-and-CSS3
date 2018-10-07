/// <reference path="../Object.inherit.js" />

(function () {

    const LivePage = Object.inherit({

        initialize: function (socket, sectionElement) {
            this.initializeSocket(socket);
            this.initializeUI(sectionElement);
        },

        initializeSocket: function (socket) {
            this.socket = socket;
            this.socket.onmessage = this.handleSocketMessage.bind(this);
        },

        initializeUI: function (sectionElement) {
            this.questionListElement = sectionElement.querySelector("ul");
            this.questionInput = sectionElement.querySelector("input");

            const form = sectionElement.querySelector("form");
            form.addEventListener("click", this.handleFormSubmit.bind(this), false);

            this.questionListElement.addEventListener("click", this.handleQuestionsClick.bind(this), false);
        },

        handleFormSubmit: function (event) {
            // Prevent the form actually submitting.
            event.preventDefault();

            const text = this.questionInput.value;
            if (text) {
                this.askQuestion(text);
            }
        },

        askQuestion: function (text) {
            const message = {
                ask: text
            };
            this.socket.send(JSON.stringify(message));

            // Clear the input ready for another question.
            this.questionInput.value = "";
        },

        handleSocketMessage: function (event) {
            const message = JSON.parse(event.data);
            if (message.questions) {
                this.handleQuestionsMessage(message);
            } else if (message.remove) {
                this.handleRemoveMessage(message);
            }
        },

        handleQuestionsMessage: function (message) {
            message.questions.forEach(this.displayQuestion, this);
        },

        handleRemoveMessage: function (message) {
            const listItems = this.questionListElement.querySelectorAll("li");
            for (let i = 0; i < listItems.length; i++) {
                if (listItems[i].questionId === message.remove) {
                    this.questionListElement.removeChild(listItems[i]);
                    break;
                }
            }
        },

        displayQuestion: function (question) {
            const item = this.createQuestionItem(question);
            item.appendChild(this.createReportLink());
            this.questionListElement.appendChild(item);
        },

        createQuestionItem: function (question) {
            const item = document.createElement("li");
            item.textContent = question.text + " ";
            item.questionId = question.id;
            return item;
        },

        createReportLink: function () {
            const report = document.createElement("a");
            report.textContent = "Report";
            report.setAttribute("href", "#");
            report.setAttribute("class", "report");
            return report;
        },

        handleQuestionsClick: function (event) {
            event.preventDefault();

            const clickedElement = event.srcElement || event.target;
            if (this.isReportLink(clickedElement)) {
                const questionId = clickedElement.parentNode.questionId;
                this.reportQuestion(questionId);
                clickedElement.textContent = "Reported";
            }
        },

        isReportLink: function (element) {
            return element.classList && element.classList.contains("report");
        },

        reportQuestion: function (questionId) {
            this.socket.send(JSON.stringify({ report: questionId }));
        }
    });


    LivePage.create(
        new WebSocket("ws://localhost:10000/live"),
        document.querySelector("section.live")
    );

} ());















































































































































































































