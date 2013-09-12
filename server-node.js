var http = require('http');
var fs =  require('fs');
var url = require('url');
var path = require('path');
var s = http.createServer(function (req, res) {
    'use strict';
    var urlParts = url.parse(req.url, true),
        query = urlParts.query,
        level,
        i,
        l,
        map,
        zmap,
        filePath,
        fullPath,
        readZmap = function(err, data) {
            if (err) {
                res.end('');
            } else {
                map = data;
            }
            fs.readFile('data/z-level-' + level + '.txt', 'utf8', function(err, data) {
                if (err) {
                    res.end('');
                } else {
                    zmap = data;
                }
                res.end(JSON.stringify({'map': map, 'zmap': zmap}));
            });
        };

    if (query.hasOwnProperty('level')) {
        level  = query.level;
        for (i = 0, l = level.length; i <= Math.abs(l - 4) && level.length < 4; i++) {
            level = '0' + level;
        }

        res.writeHead(200, {'Content-Type': 'text/plain'});
        fs.readFile('data/level-' + level + '.txt', 'utf8', readZmap);
    } else {
        filePath = url.parse(req.url).pathname;
        fullPath = path.join(process.cwd(), filePath);
        path.exists(fullPath, function (exists) {
            if (!exists) {
                res.writeHeader(404, {"Content-Type": "text/plain"});
                res.write('404 Not Found\n');
                res.end();
            } else {
                fs.readFile(fullPath, 'binary', function(err, file) {
                    if (err) {
                        res.writeHeader(500, {"Content-Type": "text/plain"});
                        res.write(err + '\n');
                        res.end();
                    } else {
                        res.writeHeader(200);
                        res.write(file, 'binary');
                        res.end();
                    }

                });
            }
        });
    }
});
s.listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');