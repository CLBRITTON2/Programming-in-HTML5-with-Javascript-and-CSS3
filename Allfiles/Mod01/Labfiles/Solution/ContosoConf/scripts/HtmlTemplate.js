/// <reference path="_namespace.js" />
/// <reference path="Object.inherit.js" />

(function () {

    conference.HtmlTemplate = Object.inherit({
        
        initialize: function (templateId) {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = this.getTemplateHtml(templateId);
            this.templateElement = this.findTemplateElementInDiv(tempDiv);
        },

        createElement: function (data) {
            const element = this.templateElement.cloneNode(true);
            this.dataBindElement(element, data);
            return element;
        },

        getTemplateHtml: function (templateId) {
            return document.getElementById(templateId).textContent;
        },

        findTemplateElementInDiv: function (div) {
            let templateElement = div.firstChild;
            const ELEMENT_NODE = 1;
            while (templateElement && templateElement.nodeType !== ELEMENT_NODE) {
                templateElement = templateElement.nextSibling;
            }
            return templateElement;
        },

        dataBindElement: function (element, data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    const value = data[property];
                    const elementToBind = element.querySelector("[data-bind=" + property + "]");
                    if (elementToBind) {
                        elementToBind.textContent = value.toString();
                    }
                }
            }
        }
        
    });

} ());















































































































































































































