// TODO: salvare i dati su file in modo che no vadano persi ad ogni riavvio
// TODO: cominciare con una lista vuota
// TODO: aggiungere "data_scadenza" a elemento
// TODO: aggiungere rotta /totodlist/expired che ritorna gli elementi !done e già scaduti
// TODO: cambiare il metodo /todolist in modo che ritorni gli elementi ordinati con la scadenza più recente in alto

const express = require('express')

const app = express()

var moment = require('moment')

app.use(express.json())

app.listen(3000, () => {
  console.log('Test')
})

const todoList = [
  {
    id: 'AC2809',
    description: 'Configurare 1',
    done: false
  },
  {
    id: 'AC2810',
    description: 'Configurare 2',
    done: true
  },
  {
    id: 'AC2811',
    description: 'Configurare 3',
    done: false
  },
  {
    id: 'AC2812',
    description: 'Configurare 4',
    done: true
  },
  {
    id: 'AC2813',
    description: 'Configurare 5',
    done: false
  },
  {
    id: 'AC2814',
    description: 'Configurare 6',
    done: false
  },
  {
    id: 'AC2815',
    description: 'Configurare 7',
    done: true
  }
]

app.get('/todolist', (req, res) => {
  res.json(todoList)
})

app.get('/todolist/done', (req, res) => {
  const result = todoList.filter(el => el.done === true)
  res.json(result)
})

app.get('/todolist/undone', (req, res) => {
  const result = todoList.filter(el => !el.done)
  res.json(result)
})

app.put('/todolist', (req, res) => {
  const newItem = {
    id: todoList.length + 1,
    description: req.body.description,
    done: req.body.done
  }
  if (!newItem.description) {
    return res.status(500).json({ error: 'manca la descirption' })
  }

  todoList.push(newItem)
  res.json(newItem)
})

app.get('/todolist/:id', (req, res) => {
  const id = req.params.id
  const record = todoList.filter(el => el.id === id)
  res.json(record)
})

app.post('/todolist/:id', (req, res) => {
  const id = req.params.id
  const description = req.body.description
  const done = req.body.done

  const foundElement = todoList.find(element => element.id.toString() === id)
  // TODO: gestire errore in caso di elemento non valido

  if (description !== undefined) {
    foundElement.description = description
  }
  if (done !== undefined) {
    foundElement.done = done
  }

  if (done === true) {
    foundElement.done_date = moment().format('YYYY-MM-DD, HH:mm:ss')
  }

  if (done === false) {
    foundElement.done_date = ''
  }

  console.log(moment())
  console.log(foundElement)
  res.json(id)
})

app.delete('/todolist/:id', (req, res) => {
  const id = req.params.id

  const index = todoList.findIndex(element => element.id.toString() === id)
  if (index > -1) {
    todoList.splice(index, 1)
  }
  console.log(foundElement)
  res.json(id)
})
