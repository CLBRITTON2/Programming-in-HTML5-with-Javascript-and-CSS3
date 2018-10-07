const offlinePages = /^\/(index|about|schedule|location).htm$/;

function hideLinksThatRequireOnline() {
    const allNavLinks = document.querySelectorAll("nav.page-nav a");
    for (let i = 0; i < allNavLinks.length; i++) {
        const href = allNavLinks[i].getAttribute("href");
        if (!offlinePages.test(href)) {
            allNavLinks[i].style.display = "none";
        }
    }
};

function showLinks() {
    const allNavLinks = document.querySelectorAll("nav.page-nav a");
    for (let i = 0; i < allNavLinks.length; i++) {
        allNavLinks[i].style.display = "";
    }
};

if (!navigator.onLine) {
    hideLinksThatRequireOnline();
}

document.body.onoffline = hideLinksThatRequireOnline;
document.body.ononline = showLinks;

// Error fetching appcache.manifest: so we are probably offline
applicationCache.addEventListener("error", hideLinksThatRequireOnline, false);















































































































































































































