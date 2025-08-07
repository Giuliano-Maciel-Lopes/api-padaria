import express  from "express"
import "express-async-errors"
import cors from "cors"
import path from "node:path"
import { fileURLToPath } from "node:url"



import { routes } from "./routes/index.js"
import { errorHandling } from "./middleware/errorhandling.js"
import { stripeWebhookRoutes } from "./routes/stripeWebho-routes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const app = express()

app.use(cors())
app.use("/fotos", express.static(path.resolve(__dirname, "..", "public", "fotos")))

app.use("/stripe" , stripeWebhookRoutes)
app.use(express.json())


app.use(routes)



app.use(errorHandling)


export {app}

