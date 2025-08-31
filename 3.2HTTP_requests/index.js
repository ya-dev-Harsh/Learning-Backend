import express from 'express';
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>");
})

app.get("/about", (req, res) => {
    res.send("<h1>About me</h1><p>Hii my name is harsh </p>");
})

app.get("/contact", (req, res) => {
    res.send("<h1>Contact me</h1><p>Here is my contact : 848575957</p>");
})

app.listen(port, (req,res) => {
    console.log(`Server started on port ${port}`);
    
})