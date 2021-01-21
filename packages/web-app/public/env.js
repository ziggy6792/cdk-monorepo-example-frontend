function loadJson(path) {
    // Load json file;
    const json = loadTextFileAjaxSync(path, 'application/json');
    return JSON.parse(json);
}

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

const env = loadJson('./config/env.json');

window.env = env;
