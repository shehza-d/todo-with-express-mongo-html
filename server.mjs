import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

const todoSchema = new mongoose.Schema({
  text: { type: String, require: true },
  classID: String,
  createdDate: { type: Date, default: Date.now },
});
const todoModel = mongoose.model("todos", todoSchema);

app.get("/", (request, response) => {
  response.send("Shehzad test todo server");
  console.log(`Shehzad test todo server`);
});

app.get("/todos", (req, res) => {
  todoModel.find({}, (err, data) => {
    if (!err) {
      res.send({
        message: "here is you todo list",
        data: data,
      });
    } else {
      res.status(500).send({
        message: "server error",
      });
    }
  });
});

app.post("/todo", (request, response) => {
  todoModel.create({ text: request.body.text }, (err, saved) => {
    if (!err) {
      console.log("saved");
      response.send({
        message: "your data is saved",
      });
    } else {
      response.status(500).send({
        message: "error hy koi server ma",
      });
    }
  });
});

app.put("/todo/:id", async (req, res) => {
  try {
    let updatedData = await todoModel
      .findByIdAndUpdate(req.params.id, { text: req.body.text })
      .exec();
    console.log(updatedData);

    res.send({
      message: "todo has been updated successfully",
      data: updatedData,
    });
  } catch (err) {
    res.status(500).send({
      message: "server errror",
    });
  }
});

//empty object mtlb sab kuxh all (on line 59)
app.delete("/todos", (req, res) => {
  todoModel.deleteMany({}, (err) => {
    if (!err) {
      res.send({
        message: "all todos deleted successfully",
      });
    } else {
      res.status(500).send({
        message: "server error",
      });
    }
  });
});

//to delete selected todo
//:id is URL parameter
app.delete("/todo/:id", (req, res) => {
  todoModel.deleteOne({ _id: req.params.id }, (err, deletedData) => {
    console.log("deleted: ", deletedData);

    if (!err) {
      if (deletedData.deletedCount !== 0) {
        res.send({
          message: "One Todo has been deleted successfully",
        });
      } else {
        res.send({
          message: "No todo found with this id ",
        });
      }
    } else {
      res.status(500).send({
        message: "server error",
      });
    }
  });
});

const connectDB = async () => {
  try {
    const myConnection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: at $ {myConnection.connection.host}`);
  } catch (err) {
    console.log("err", err);
    process.exit(1);
  }
};

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Examples app listening on port ${PORT}`);
  });
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
  process.exit(1);
});

process.on("SIGINT", () => {
  /////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(() => {
    console.log("Mongoose default connection closed");
    process.exit(0);
  });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
