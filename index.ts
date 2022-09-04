import express from 'express'
import cors from 'cors'
import { house } from './data'
import { residents } from './data'

const app = express()
app.use(cors())
app.use(express.json())
const port = 2345

app.get('/', (req, res) => {
  res.send(`
        <h1>Hello world<h1>
    `)
})

app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}/`)
)

app.get('/house', (req, res) => {
  res.send(house)
})

app.get('/house/:id', (req, res) => {
  const id = req.params.id
  const houseId = house.find(house => house.id === id)
  res.send(houseId)
})

app.post('/house', (req, res) => {
  const newHouse = {
    id: req.body.id,
    residentsId: req.body.residentsId,
    addres: req.body.addres,
    type: req.body.type
  }
  house.push(newHouse)
  res.send(newHouse)
})


app.patch('/house/:id', (req, res) => {
  const id = req.params.id
  const houseId = house.find(house => house.id === id)
  
  if (req.body.id) {
    //@ts-ignore
    houseId.id = req.body.id
  }
  if (req.body.residentsId) {
    //@ts-ignore
    houseId.residentsId = req.body.residentsId
  }
  if (req.body.addres) {
    //@ts-ignore
    houseId.addres = req.body.addres
  }
  if (req.body.type) {
    //@ts-ignore
    houseId.type = req.body.type
  }

  res.send(houseId)
})

app.get('/residents', (req, res) => {
  res.send(residents)
})

app.get('/residents/:id', (req, res) => {
  const id = Number(req.params.id)
  const resident = residents.find(resident => resident.id === id)
  if (!resident) {
    res.status(404).send('Resident not found')
  }
  res.send(resident)
})

app.post('/residents', (req, res) => {
  const resident = req.body
  if (!resident.name || !resident.age || !resident.hobby) {
    res.status(400).send('Bad request')
  } else {
    residents.push(resident)
    res.send(resident)
  }
})

app.put('/residents/:id', (req, res) => {
  const id = Number(req.params.id)
  const resident = residents.find(resident => resident.id === id)
  if (!resident) {
    res.status(404).send('Resident not found')
  } else {
    resident.name = req.body.name
    resident.age = req.body.age
    resident.gender = req.body.gender
    res.send(resident)
  }
})
