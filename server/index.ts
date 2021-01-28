import express from 'express'

import serverEvents from './controllers/serverEvents'
import { initDB } from './config/db'

const {
    getEvents,
    getEventsBetween,
    createEvent,
    updateEvent,
    deleteEvent,
    getWorstServers
} = serverEvents

const app = express()
app.use(express.json())

const port = process.env.PORT || 5000


app.get('/api/event/:start/:end', getEventsBetween)

app.get('/api/event', getEvents)

app.post('/api/event', createEvent)

app.put('/api/event', updateEvent)

app.delete('/api/event', deleteEvent)

app.get('/api/worstserver', getWorstServers)

app.listen(port, () => {
    initDB()
    // tslint:disable-next-line:no-console
    console.log(`Listening on port ${port}`)
})