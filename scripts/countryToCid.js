const fs = require('fs');
const {parse} = require('csv-parse');

fs.readFile('CountriesAlphabetical.csv', (err, data) => {
    parse(data, {columns: false, trim: true}, (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }

        for (let i = 0; i < rows.length; i++) {
            console.log(`cidMap.set('${rows[i][0]}', ${i+1});`);
        }
    });
});