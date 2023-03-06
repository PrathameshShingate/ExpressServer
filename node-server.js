//Creating a custom server

let post_array = [];

//http request object, it sends request to the server
const http = require("http");
//different reqest methods GET, POST, PUT, DELETE, PATCH

//server will be running on this port, and will respond to all the requests coming from this port
const port = 8081;
//http://localhost:8081
//port number is passed with url, which can be entered in the browser, followed by browser initiating the request

//server responding to the request with a status code
http
  .createServer((req, res) => {
    const { method, url } = req;
    if (url === "/contact") {
      if (method === "GET") {
        res.writeHead(200, { "content-type": "text/html" });
        // res.write("<h1>This is contact page</h1>");
        res.write(`${post_array}`);
        res.end();
      } else if (method === "POST") {
        let body = "";
        req
          .on("error", (err) => {
            console.log(err);
          })
          .on("data", (chunk) => {
            body += chunk;
            // console.log(chunk);
          })
          .on("end", () => {
            body = JSON.parse(body);

            for (let key in body) {
              post_array.push(body[key]);
            }
            console.log(post_array);
          });
        res.write("<h1>Data received from post method</h1>");
        // res.write(`${post_array}`);
        res.end();
      } else if (method === "DELETE") {
        let body = "";
        req
          .on("error", (err) => {
            console.log(err);
          })
          .on("data", (chunk) => {
            body += chunk;
            // console.log(chunk);
          })
          .on("end", () => {
            body = JSON.parse(body);

            for (let key in body) {
              for (let item in post_array) {
                if (body[key] == post_array[item]) {
                  post_array.pop(post_array[item]);
                }
              }
            }
            console.log(post_array);
          });
        res.write("<h1>Data deleted using delete method</h1>");
        // res.write(`${post_array}`);
        res.end();
      } else {
        res.writeHead(501);
        res.write("<h1>This is contact route but not a GET, POST, DELETE request</h1>");
        res.end();
      }
    } else {
      res.writeHead(404);
      res.write("<h1>Page not found<h1/>");
      res.end();
    }
  })
  .listen(port, () => {
    console.log(`My server is running on port ${port}`);
  });
