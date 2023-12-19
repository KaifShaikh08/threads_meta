import { connectDB } from "./Db/Database.js";
import { app } from "./app.js";

connectDB();

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Started");
});
