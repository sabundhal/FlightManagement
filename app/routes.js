
var csv = require('csv-parser');
var fs = require('fs');

module.exports = function (app) {



    app.get('/allFlights', function (req, res) {
        var csvData = [];
        fs.createReadStream('Project.csv')
            .pipe(csv())
            .on('data', function (csvrow) {
                csvData.push(csvrow);
            }).on('end', function () {
            console.log(csvData);
            res.send(csvData);
        });
    });

    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });

};
