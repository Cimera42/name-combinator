const axios = require('axios').default;
const cheerio = require('cheerio');
const fs = require('fs').promises;

axios.get("https://www.ozanimals.com/A-Z/All/common.html")
    .then(response => {
        const $ = cheerio.load(response.data, {xmlMode: false});
        const elementList = $("table[cellpadding='5'] a[href*='https://www.ozanimals.com']");
        const nameList = elementList.map((i, v) => $(v).text()).get();
        fs.writeFile("fauna.json", JSON.stringify(nameList));
    });

axios.get("https://www.anbg.gov.au/apni/apni.html")
    .then(response => {
        const $ = cheerio.load(response.data, {xmlMode: false});
        const elementList = $("a[href*='http://www.anbg.gov.au/cgi-bin/apx?taxon_id=']");
        const nameList = elementList.map((i, v) => $(v).text()).get();
        fs.writeFile("flora.json", JSON.stringify(nameList));
    });
