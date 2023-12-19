import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Threads",
    })
    .then((e) =>
      console.log(`Database is connected in ${process.env.MONGO_URI}`)
    )
    .catch((e) => console.log("error while connecting database", e));
};
