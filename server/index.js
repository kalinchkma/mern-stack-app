const experss = require('express');
const path = require('path');

const app = experss();

app.use(experss.static(path.join(__dirname, 'build')));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8800, (err) => {
    console.log("server running on post 8800");
});