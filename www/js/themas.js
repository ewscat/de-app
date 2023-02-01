
function showTopics() {
    let metaUrl = "/words/meta.json";
    let topics = getTopics(metaUrl);
    let topicList = buildList(topics);
    var main = document.getElementById("main");
    main.appendChild(topicList);
}

function getJSON(url) {
    var resp = '';
    var xmlHttp = new XMLHttpRequest();
  
    if (xmlHttp != null) {
      xmlHttp.open( "GET", url, false );
      xmlHttp.send( null );
      resp = xmlHttp.responseText;
    }
     
    return resp;
}

function getTopics(wordsUrl) {
    return JSON.parse(getJSON(wordsUrl));
}

function buildList(topics) {
    translate = document.getElementById("flexSwitchCheck").checked;

    all = document.createElement("div");

    header = document.createElement("h1");
    headerText = document.createTextNode("Topics");
    header.appendChild(headerText);
    all.appendChild(header)

    lst = document.createElement("ul");
    lst.classList.add("list-group");

    for (i of topics) {
        li = document.createElement("li");
        li.classList.add("list-group-item");
        li.classList.add("d-flex");
        li.classList.add("justify-content-between");
        li.classList.add("align-items-center");
        a = document.createElement("a");
        a.setAttribute("href", `/woorden.html?topic=${i.topic}&translate=${translate}`);
        a.classList.add("link-dark");
        a.classList.add("topic-link");
        a.textContent = i.description;
        span = document.createElement("span");
        span.classList.add("badge");
        span.classList.add("bg-secondary");
        span.textContent = i.count;
        li.appendChild(a);
        li.appendChild(span);
        lst.appendChild(li);
    }

    all.appendChild(lst);
    return all;
}

function changeTranslationOption() {
    translate = document.getElementById("flexSwitchCheck");
    urls = document.getElementsByClassName("topic-link");
    for (let i = 0; i < urls.length; i++) {
        link = urls[i].getAttribute("href");
        if (translate.checked) {
            newLink = link.replace("translate=false", "translate=true");
        } else {
            newLink = link.replace("translate=true", "translate=false");
        }
        urls[i].setAttribute("href", newLink);
    }
}
