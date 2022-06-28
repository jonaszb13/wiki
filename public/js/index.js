function openEditor() {
    let currentPage = window.location.pathname;
    
    sessionStorage.setItem("currentPage", currentPage);

    switch(currentPage) {
        case '/index.html':
            sessionStorage.setItem("main", document.getElementById("mainText").innerText);
            sessionStorage.setItem("pageToEdit", "main");
            window.location.href = 'edit.html';
            break;
        case '/topic/topic1.html':
            sessionStorage.setItem("topic1", document.getElementById("topic1Text").innerText);
            sessionStorage.setItem("pageToEdit", "topic1");
            window.location.href = '../edit.html';
            break;
        case '/topic/topic2.html':
            sessionStorage.setItem("topic2", document.getElementById("topic2Text").innerText);
            sessionStorage.setItem("pageToEdit", "topic2");
            window.location.href = '../edit.html';
            break;
        case '/topic/topic3.html':
            sessionStorage.setItem("topic3", document.getElementById("topic3Text").innerText);
            sessionStorage.setItem("pageToEdit", "topic3");
            window.location.href = '../edit.html';
            break;
        case '/topic/topic4.html':
            sessionStorage.setItem("topic4", document.getElementById("topic4Text").innerText);
            sessionStorage.setItem("pageToEdit", "topic4");
            window.location.href = '../edit.html';
            break;
        case '/topic/topic5.html':
            sessionStorage.setItem("topic5", document.getElementById("topic5Text").innerText);
            sessionStorage.setItem("pageToEdit", "topic5");
            window.location.href = '../edit.html';
            break;
        case '/topic/topic6.html':
            sessionStorage.setItem("topic6", document.getElementById("topic6Text").innerText);
            sessionStorage.setItem("pageToEdit", "topic6");
            window.location.href = '../edit.html';
            break;
        case '/topic/topic7.html':
            sessionStorage.setItem("topic7", document.getElementById("topic7Text").innerText);
            sessionStorage.setItem("pageToEdit", "topic7");
            window.location.href = '../edit.html';
            break;
        case '/topic/topic8.html':
            sessionStorage.setItem("topic8", document.getElementById("topic8Text").innerText);
            sessionStorage.setItem("pageToEdit", "topic8");
            window.location.href = '../edit.html';
            break;
        case '/topic/topic9.html':
            sessionStorage.setItem("topic9", document.getElementById("topic9Text").innerText);
            sessionStorage.setItem("pageToEdit", "topic9");
            window.location.href = '../edit.html';
            break;
        case '/topic/topic10.html':
            sessionStorage.setItem("topic10", document.getElementById("topic10Text").innerText);
            sessionStorage.setItem("pageToEdit", "topic10");
            window.location.href = '../edit.html';
            break;
    }
    

}

function input() {
    document.getElementById("textEditor").value = sessionStorage.getItem(sessionStorage.getItem("pageToEdit"));
}

function saveChange() {
    let newData = document.getElementById("textEditor").value;
    sessionStorage.setItem(sessionStorage.getItem("pageToEdit"), newData);

    window.location.href = sessionStorage.getItem("currentPage");
}

function reload() {
    
    switch(window.location.pathname) {
        case '/index.html':
            document.getElementById("mainText").innerText = sessionStorage.getItem("main");
            break;
        case '/topic/topic1.html':
            document.getElementById("topic1Text").innerText = sessionStorage.getItem("topic1");
            break;
        case '/topic/topic2.html':
            document.getElementById("topic2Text").innerText = sessionStorage.getItem("topic2");
            break;
        case '/topic/topic3.html':
            document.getElementById("topic3Text").innerText = sessionStorage.getItem("topic3");
            break;
        case '/topic/topic4.html':
            document.getElementById("topic4Text").innerText = sessionStorage.getItem("topic4");
            break;
        case '/topic/topic5.html':
            document.getElementById("topic5Text").innerText = sessionStorage.getItem("topic5");
            break;
        case '/topic/topic6.html':
            document.getElementById("topic6Text").innerText = sessionStorage.getItem("topic6");
            break;
        case '/topic/topic7.html':
            document.getElementById("topic7Text").innerText = sessionStorage.getItem("topic7");
            break;
        case '/topic/topic8.html':
            document.getElementById("topic8Text").innerText = sessionStorage.getItem("topic8");
            break;
        case '/topic/topic9.html':
            document.getElementById("topic9Text").innerText = sessionStorage.getItem("topic9");
            break;
        case '/topic/topic10.html':
            document.getElementById("topic10Text").innerText = sessionStorage.getItem("topic10");
            break;
    }
}

