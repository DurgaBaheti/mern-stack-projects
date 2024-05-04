import express from "express"
import cors from "cors"
import multer from "multer"
import { v4 as uuidv4 } from "uuid"
import path from "path"

const app = express();

//multer middleware --------------  
const storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, "./uploads")
    },
    filename: function(req, file, cb){
      cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname))
    }
  })
// multer configuration --------------------
const upload = multer({storage: storage})
  

app.use(
  cors({
    origin: [
      "https://purple-waitress-cdpvc.pwskills.app:8001",
      "localhost:8001",
    ],
    credentials: true
  })
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next()
  })

  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use("/uploads", express.static("uploads"))

app.get("/", (req, res) => {
  res.json({ message: "Dheeraj Baheti's Video Streaming App." });
});

app.post("/upload", upload.single("file"), function(req, res){
    console.log("File Uploaded Successfully!!");
    res.json("File Uploaded Successfully!!")
  })

app.listen(8001, () => {
  console.log("App Is Listening At Port 8001...");
});
