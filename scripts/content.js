// Main Element
// const popupClassName = "tp-yt-iron-dropdown.style-scope.ytd-popup-container";
// const popUp = document.querySelector(popupClassName);
// const elem = document.querySelector("tp-yt-iron-overlay-backdrop");

// What mutations to watch out for
const config = {
    attributes: true,
    childList: true
};

function addSearch(list){
    // play list items
    let items = list.childNodes;
    let header = document.querySelector(".style-scope.ytd-add-to-playlist-renderer");

    //add search bar
    let searchBar = document.createElement("input")
    searchBar.setAttribute("type", "text");
    header.insertAdjacentElement("afterend", searchBar);

    searchBar.style.cssText = "display: block; margin: auto; width: 80%; height: 2rem; padding: 0.4rem; background-color: var(--paper-dialog-background-color); border: 1px solid white; border-radius: 20px; color: white;"
    // Upon keystroke, show or hide elements according to text in box
    searchBar.addEventListener('keyup', () => {
        // Search Query
        let query = searchBar.value.toUpperCase();
        // console.log(items);
        for (item of items){
            // let label = item.__shady_native_querySelector("yt-formatted-string#label");
            let label = item.shadowRoot.querySelector("yt-formatted-string#label");
            if (query == "" || label.innerText.toUpperCase().includes(query)){
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        };
    
    })
}

const callback = (mutRecords, observer) => {
    for (const mutRecord of mutRecords){
        // if any nodes were added
        if (mutRecord.addedNodes){
            const list = document.querySelector("#playlists");
            
            if (list){
                observer.disconnect();
                addSearch(list);
                return;
            }
        }
    }
}


let observer = new MutationObserver(callback, config);

observer.observe(document.body, config);


// if list not null

// if (list) {
// }