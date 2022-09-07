// IMPORTS
import path from 'path'
import express from 'express'
import cors from 'cors'
import users from './controller/users.js'
import session from 'express-session'
// APP
const app = express()
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'))
})
app.use('/', express.static('public'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('trust proxy', 1)
app.use(session({
    secret: 'Labai slapta fraze',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60000000
    }
}))
app.use('/api/users/', users)
app.listen(process.env.PORT || 3000)