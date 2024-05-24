const fs = require('fs');
const path = require('path');
const axios = require('axios');
const http = require('http');

http
    .createServer((request, response) => {
        response.setHeader("Content-Type", "text/html; charset=utf-8;");
        if (request.url === '/'){
            response.write('Выдал данные');
            handleData();
        } else{
            response.write('А тут не данные');
            console.log("Nope!");
        }
        response.end();

}).listen(3000);


async function handleData(){
    try{
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts');

        fs.writeFile(path.resolve(__dirname, '1.json'), JSON.stringify(data), 'utf-8', (err) => {
            if(err){
                throw err;
            }
            console.log("Done!");
        })
    } catch (error) {
        console.error(error);
    }
};