const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());
app.use(express.static('public'))
const httpServer = require("http").createServer(app);
const options = {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.1.6:3000"],
  },
};
const io = require("socket.io")(httpServer, options);
const { body, validationResult } = require("express-validator");

app.get("/", (req, res) => {
  console.log("/ get is called");
});
app.post("/", (req, res) => {
  console.log(req.body);
  console.log("/ post is called");
});

app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  console.log(sampleFile);
  uploadPath = __dirname + "/public/" + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    // res.send('File uploaded!');
    res.send({
      uid: "-1",
      name: sampleFile.name,
      status: "done",
      url: "http://localhost:3001/" + sampleFile.name,
    });
  });
});

httpServer.listen(3001, async () => {
  console.log("server is listening");
});
