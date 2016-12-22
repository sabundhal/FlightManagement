var csv = require('csv-parser');
var fs = require('fs');

module.exports = function (app) {


    app.post('/allFlights', function (req, res) {
        var reqObject = req.body;
        var csvData = [];
        var responseArray = [];
        fs.createReadStream('Project.csv')
            .pipe(csv())
            .on('data', function (csvrow) {
                csvData.push(csvrow);
            }).on('end', function () {
            // console.log(csvData);

            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i].From == reqObject.source && csvData[i].To == reqObject.destination)
                    responseArray.push(csvData[i]);
            }
            console.log(responseArray);
            res.send(responseArray);
        });
    });

    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });

};
