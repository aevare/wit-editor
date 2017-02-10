const fm  = require('json-front-matter');

const getDataString = (data) => {
    const page = { attr: {} };

    const contents  = fm.parse(data);

    page.markdown = contents.body;
    
    // parse out the front-matter
    for (const attr in contents.attributes) {
        page.attr[attr] = contents.attributes[attr];
    }

    return page;
};

const loopAndReplace = (fields, attr, tmpl) => {
    let endString = tmpl;

    for (const key in fields) {
        if(attr[key] === undefined ){
            endString = endString.replace(`{${key}}`, '');
        }
        else if (fields[key] === 'arr_of_string' && typeof attr[key] === 'string') {
            endString = endString.replace(`{${key}}`, '"' + (attr[key] !== undefined ? attr[key] : '').split(',').join('", "') + '"');
        }
        else if (fields[key] === 'arr_of_string'){
            endString = endString.replace(`{${key}}`, (attr[key] !== undefined) ? ('"' +  attr[key].join('", "') + '"') : '');
        }
        else {
            endString = endString.replace(`{${key}}`, attr[key] !== undefined ? attr[key] : '');
        }
    }

    return endString;
};

const getStringFromData = (data, tConf) => {
    let endString = '';

    if (tConf.prepends) {
        endString = loopAndReplace(tConf.prepends.fields, data.attr, tConf.prepends.tmpl);
    }

    endString += '\n\n' + data.markdown;

    if (tConf.appends) {
        endString += loopAndReplace(tConf.prepends.fields, data.attr, tConf.prepends.tmpl);
    }

    return endString;
};

module.exports = {
    getDataString: getDataString,
    getStringFromData: getStringFromData
};