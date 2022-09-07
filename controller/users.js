import express from 'express'
import bcrypt from 'bcrypt'
import db from '../database/connect.js'
const router = express.Router()


router.post('/register', async (req, res) => {

  req.body.password = await bcrypt.hash(req.body.password, 10)

  try {
    const userExists = await db.Users.findOne({
      where: {
        email: req.body.email
      }
    })
    if (userExists) {
      res.status(401).send('Toks vartotojas jau egzistuoja')
      return
    }
    await db.Users.create(req.body)
    res.send('Vartotojas sėkmingai sukurtas')
  } catch (error) {
    console.log(error)
    res.status(400).send('Registracija nepavyko')
  }
})
router.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const user = await db.Users.findOne({
      where:
      {
        email: req.body.email
      }
    })

    if (!user)
      return res.status(401).send('Toks vartotojas nerastas')

    if (await bcrypt.compare(req.body.password, user.password)) {
      req.session.loggedin = true
      res.send('Sekmingai prisijungta')
    } else {
      res.status(401).send('Nepavyko prisijungti')
    }
  } catch (error) {
    console.log(error)
    res.status(418).send('Ivykio serverio klaida')
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.send('Sekmingai atsijungete')
})

router.get('/check-auth', (req, res) => {
  if (req.session.loggedin)
    return res.send('Sekmingai prisijunges')

  res.status(401).send('Neprisijunges')
})


export default router