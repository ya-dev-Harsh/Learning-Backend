const fs = require("fs");

// fs.writeFile("/Users/yadav/OneDrive/Desktop/MERN/02_BackEnd/2.2Native_modules/message.txt", "Hello from Node js!!", (err) => {
//     if(err) throw err;
//     console.log("File has been created ");
// })

fs.readFile("/Users/yadav/OneDrive/Desktop/MERN/02_BackEnd/2.2Native_modules/message.txt",'utf8', (err, data) => {
    if(err) throw err;
    console.log(data);
})