export class LocalStarStorage {

    constructor(localStorage) {
        /// <summary>Encapsulates the browser's localStorage API to make saving a list of starred sessions easy.</summary>
        this.localStorage = localStorage;
        this.load();
    }

    addStar(sessionId) {
        /// <summary>Stars the given session.</summary>
        if (this.isStarred(sessionId)) return;

        this.sessions.push(sessionId);
        this.save();
    }

    removeStar(sessionId) {
        /// <summary>Removes the star from the given session.</summary>
        const index = this.sessions.indexOf(sessionId);
        if (index >= 0) {
            this.sessions.splice(index, 1);
            this.save();
        }
    }

    isStarred(sessionId) {
        /// <summary>Returns true if the given session is starred.</summary>
        return this.sessions.indexOf(sessionId) >= 0;
    }

    load() {
        /// <summary>Loads the starred sessions from storage.</summary>
        const json = this.localStorage.getItem("stars");
        if (json) {
            try {
                this.sessions = JSON.parse(json) || [];
            } catch (exception) {
                this.sessions = [];
            }
        } else {
            this.sessions = [];
        }
    }

    save() {
        /// <summary>Saves the starred sessions to storage.</summary>
        this.localStorage.setItem("stars", JSON.stringify(this.sessions));
    }
}















































































































































































































