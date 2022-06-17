var wordList = getWords();
var currentElement = null;

function getJSON(url) {
    var resp = '';
    var xmlHttp = new XMLHttpRequest();
  
    if (xmlHttp != null) {
      xmlHttp.open( "GET", url, false );
      xmlHttp.send( null );
      resp = xmlHttp.responseText;
    }
     
    return resp ;
}

function getWordsLocation() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const topic = urlParams.get('topic');
    return `/words/${topic}.json`;
}

function getWords() {
    var wordsUrl = getWordsLocation();
    var all = JSON.parse(getJSON(wordsUrl));
    return all.map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value);
}

function getRandomElement(items) {
    return items[Math.floor(Math.random()*items.length)];
}

function nextWord() {
    hideWord();
    currentElement = getNotShowed(wordList);
    if (currentElement) {
        var word = document.getElementById("word");
        word.textContent = currentElement.word;
        wordList = markShowed(currentElement.word, wordList)
    } else {
        showResult();
    }
}

function getNotShowed(lst) {
    for (i of lst) {
        if (!i.showed) {
            return i;
        }
    }
    return null;
}

function markShowed(word, lst) {
    for (let i = 0; i < lst.length; i++) {
        if (lst[i].word == word) {
            lst[i].showed = true;
            console.log(lst[i])
            return lst;
        }
    }
    return lst;
}

function markCorrect(status, word, lst) {
    for (let i = 0; i < lst.length; i++) {
        if (lst[i].word == word) {
            lst[i].correct = status;
            return lst;
        }
    }
    return lst;
}

function showArticle(art) {
    var article = document.getElementById("article");
    if (!article.classList.contains("invisible")) {
        return
    }
    if (art == currentElement.article) {
        wordList = markCorrect(true, currentElement.word, wordList);
        text_class = "text-success"
        btn_class = "btn-success"
    } else {
        wordList = markCorrect(false, currentElement.word, wordList);
        text_class = "text-danger"
        btn_class = "btn-danger"
    }
    updateCounter();
    updateProgress();
    article.textContent = currentElement.article;
    article.setAttribute("class", "visible");
    article.setAttribute("class", text_class);
    
    var btn = document.getElementById(art);
    markButton(btn, btn_class)
}

function updateCounter() {
    var correctCounter = document.getElementById("correct");
    var incorrectCounter = document.getElementById("incorrect");
    correctCounter.textContent = wordList.filter((i) => i.showed && i.correct).length;
    incorrectCounter.textContent = wordList.filter((i) => i.showed && (!i.correct)).length;
}

function hideWord() {
    var article = document.getElementById("article");
    article.setAttribute("class", "invisible");
    resetButtons();
}

function markButton(btn, btn_class) {
    removes = ["btn-secondary", "border-white", "bg-white"];
    for (rm of removes) {
        btn.classList.remove(rm)
    }
    btn.classList.add(btn_class);
}

function resetButtons() {
    btns = [document.getElementById("de"), document.getElementById("het")];
    adds = ["btn-secondary", "border-white", "bg-white"];
    removes = ["btn-success", "btn-danger"]
    for (btn of btns) {
        for (rm of removes) {
            btn.classList.remove(rm)
        }
        for (ad of adds) {
            btn.classList.add(ad)
        }
    }
}

function showResult() {
    cntn = document.getElementById("content");
    while(cntn.firstChild){
        cntn.removeChild(cntn.firstChild);
    }
    summary = getSummary();
    cntn.appendChild(summary)

    resultNavLinks = document.getElementById('resultNavLinks');
    resultNavLinks.appendChild(resultLinks())
}

function updateProgress() {
    progress = document.getElementById("progress");
    procent = (wordList.filter((i) => i.showed).length)*100/wordList.length;
    progress.setAttribute("style", `width: ${procent}%`);
    progress.setAttribute("aria-valuenow", `${procent}`);
}

function resultLinks() {
    p = document.createElement("p");
    retry = document.createElement("button");
    retry.setAttribute("type", "button");
    retry.setAttribute("onclick", "location.reload();");
    retry.classList.add("btn");
    retry.classList.add("btn-link");
    retry.textContent = "Retry";
    
    toContent = document.createElement("button");
    toContent.setAttribute("type", "button");
    toContent.setAttribute("onclick", "window.location.pathname=('/themas.html');");
    toContent.classList.add("btn");
    toContent.classList.add("btn-link");
    toContent.textContent = "To content";

    p.appendChild(retry);
    p.appendChild(toContent);
    return p;
}

function getSummary() {
    all = document.createElement("div");

    summary = document.createElement("h1");
    summaryText = document.createTextNode("Summary");
    summary.appendChild(summaryText);
    all.appendChild(summary)

    tbl = document.createElement("table");
    tbl.classList.add("table", "table-striped","table-dark");
    tbody = document.createElement("tbody");
    for (i of wordList) {
        tr = document.createElement("tr");
        td_art = document.createElement("td");
        td_art.textContent = i.article;
        td_word = document.createElement("td");
        td_word.textContent = i.word;
        td_correct = document.createElement("td");
        td_correct_i = document.createElement("i");
        td_correct_i.classList.add("material-icons")
        if (i.correct) {
            td_correct_i.classList.add("text-success");
            td_correct_i.textContent = "done";
        } else {
            td_correct_i.classList.add("text-danger");
            td_correct_i.textContent = "close";
        }
        td_correct.appendChild(td_correct_i)
        tr.appendChild(td_art);
        tr.appendChild(td_word);
        tr.appendChild(td_correct);
        tbody.appendChild(tr)
    }

    tbl.appendChild(tbody)
    all.appendChild(tbl);
    return all;
}
