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
app.use(express.static("public"));
const httpServer = require("http").createServer(app);
const options = {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.1.6:3000"],
  },
};
const io = require("socket.io")(httpServer, options);
const { body, validationResult } = require("express-validator");
const {
  updateUser,
  insertUser,
  MongoConnect,
  doesUserExists,
  insertGroup,
  doesFieldExist,
  insertMessages,
  findAndInsertGroupPrivate,
  insertMessagesPrivate,
  getUsersGroups,
  getMessages,
} = require("./Mongo");

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

app.post(
  "/Login",
  body("name").custom(async (value, { req }) => {
    console.log(req.body, "req.body");
  }),
  body("name", "name should atleast be of 1 character")
    .exists()
    .trim()
    .isLength({ min: 1 }),
  body(
    "name",
    "name can only contain alphabets and numbers, no special character"
  ).isAlphanumeric(),
  body("pwd", "password should be of atleast 6 chars")
    .exists()
    .isLength({ min: 6 }),
  body("name").custom(async (value, { req }) => {
    let result = await doesUserExists(value);
    if (!result && req.body.process == "Login") {
      return Promise.reject("user name does not exist, sign up first!");
    }
    if (req.body.process == "Sign Up") {
      if (result ? true : false) {
        return Promise.reject(
          "username already exists, try again with a different user name "
        );
      }
    }
  }),
  body("pwd").custom(async (value, { req }) => {
    if (req.body.process == "Login") {
      let result = await doesUserExists(req.body.name);
      if (result && result.pwd !== value) {
        return Promise.reject("wrong password");
      }
    }
  }),
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success: false });
    } else {
    }
    if (req.body.process == "Sign Up") {
      let results = await insertUser(req.body.name, req.body.pwd);
    }
    res.cookie('login',)
    res.send({ success: true });
    console.log(req.body.name, "connected");
  }
);

// httpServer.listen(3001, async () => {
//   console.log("server is listening");
// });

const tryConnectToMongodb = async () => {
  let res = await MongoConnect();
  if (!Object.keys(res).includes("errno")) {
    console.log("Connected to Mongodb server successfully!");
    console.log("node server listening on *:3001");
    return true;
  } else {
    console.log(
      "Couldn't connect to Mongodb server. Retrying again in 5 secs..."
    );
    console.log("Error is : ", res);
    return false;
  }
};

httpServer.listen(3001, async () => {
  console.log("starting node server");
  let connected = await tryConnectToMongodb();
  if (!connected) {
    let interval = await setInterval(async () => {
      let res = await tryConnectToMongodb();
      if (res) {
        clearInterval(interval);
      }
    }, 5000);
  }
});
