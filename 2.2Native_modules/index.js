const fs = require("fs");

// fs.writeFile("message.txt", "Hello from Node js!!", (err) => {
//     if(err) throw err;
//     console.log("File has been created ");
// })

fs.readFile("message.txt",'utf8', (err, data) => {
    if(err) throw err;
    console.log(data);
})