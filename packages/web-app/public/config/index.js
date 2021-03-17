function loadTextFileAjaxSync(filePath, mimeType) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', filePath, false);
    if (mimeType != null) {
        if (xmlhttp.overrideMimeType) {
            xmlhttp.overrideMimeType(mimeType);
        }
    }
    xmlhttp.send();
    if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
        return xmlhttp.responseText;
    }

    // TODO Throw exception
    return null;
}

function loadJSON(filePath) {
    // Load json file;
    const json = loadTextFileAjaxSync(filePath, 'application/json');
    // Parse json
    return JSON.parse(json);
}

window.env = loadJSON('./config/env.json');
