import express, { json } from "express"
import "express-async-errors"


import { routes } from "./routes/index.js"
import { errorHandling } from "./middleware/errorhandling.js"


const app = express()

app.use(express.json())
app.use(routes)


app.use(errorHandling)


export {app}

