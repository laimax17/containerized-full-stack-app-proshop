import path from "path"
import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import { notFound, errorHandler } from "./middleware/errorMiddleWare.js"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"

dotenv.config()

connectDB()

const app = express()

//for docker deployment
const NODE_ENV = 'development';
const PAYPAL_CLIENT_ID = 'AWJqR0P3Gk8y7iLIFlysiqTDozHxCpj451IIPr062jYkOX7FgFKz9TGWRCbVgCaYN9hRpPc_tlBMFjAL'

if (NODE_ENV === "development") {
    app.use(morgan("dev"))
}

app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)

app.get("/api/config/paypal", (req, res) =>
    res.send(PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend/build")))
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    })
  } else {
    app.get("/", (req, res) => {
      res.send("The API is running.")
    })
  }

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5001

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
)