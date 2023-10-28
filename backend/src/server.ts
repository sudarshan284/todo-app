
import app from "./app";
import env from "./util/invalidenv";

import mongoose from "mongoose";



const port = env.PORT;



mongoose
  .connect(env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("Connection successful");
    app.listen(port, () => {
      console.log(`Server running on PORT...${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
