const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); 
const resource=require('./Resource.Model');
const PORT = 5000;

mongoose.connect("mongodb://localhost:27017/Resources", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  

app.post("/upload", upload.single("pdf"), async (req, res) => {
  const file = req.file;
  // save file to database using Mongoose
  const resource = await Resource.findOneAndUpdate(
    { value: req.body.optionValue },
    { pdfFile: file.filename },
    { new: true }
  );
  res.send(resource);
});

app.get("/options", async (req, res) => {
  const resources = await Resource.find({});
  res.send(resources);
});

app.get("/pdf/:filename", async (req, res) => {
  const filename = req.params.filename;
  const filepath = `uploads/${filename}`;
  res.sendFile(filepath);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port localhost:${PORT}`);
});
