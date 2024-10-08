import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});


import { app } from "./app.js";
import { connectDB } from "./db/index.db.js";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {

    app.on('error', (error) => {
        console.log("error: ", error);
        throw error;
    });

    app.listen(PORT, () => {
        console.log(`App is listen on port ${PORT}`);
    });
})

