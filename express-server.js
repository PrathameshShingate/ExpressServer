//Creating a custom server
 
const express = require("express");
const app = express();

app.use(express.json());

const port = 8081;

let post_array = []; 

app.get("/contact", (req, res) => {
    res.status(200).send(post_array);
});

app.post("/contact", (req, res) => {
    let body = req.body;

    for (let key in body) {
       post_array.push(body[key]);
    }
    console.log(post_array);

    res.status(200).send("Data received to the server using post method");
    // res.status(200).send(post_array);
});

app.delete("/contact", (req, res) => {
  let body = req.body;

  for (let key in body) {
    for (let item in post_array) {
      if (body[key] == post_array[item]) {
        post_array.pop(post_array[item]);
      }
    }
  }
  console.log(post_array);

  res.status(200).send("Data deleted from server using delete method");
  // res.status(200).send(post_array);
});

app.all("/contact", (req, res) => {
    res
        .status(501)
        .send("This is contact route but not a GET, POST, DELETE request");
});

app.all("*", (req, res) => {
    res.status(404).send("page not found");
})

app.listen(port, () => {
    console.log(`My server is running on port ${port}`);
});