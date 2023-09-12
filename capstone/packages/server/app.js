import express from 'express'
import cors from 'cors'
import keys from './config/keys'
import router from './routes'
import seedDatabase from './seedDatabase'
import mongoose from 'mongoose'
import router from './routes'

const app = express()

app.use(express.json())
app.use(cors())
