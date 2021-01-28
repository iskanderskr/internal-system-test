import express from 'express'

import { Server } from '../models/server'
import { Event } from '../models/event'

import CacheService from "../config/Cache"

const cache = new CacheService(120)
const idEventsCache = 'eventList'

const eventController = {
    getEvents: async (req: express.Request, res: express.Response) => {
        return cache.get(idEventsCache, async () => {
            const events = await Event.findAll({
                include: [
                    { model: Server, attributes: ['created_at', 'server_type'] }
                ]
            })
            return JSON.stringify(events)
        }).then((result: string) => {
            return res.json(JSON.parse(result))
        })
    },

    getEventsBetween: async (req: express.Request, res: express.Response) => {
        const start: number = Number(req.params.start)
        const end: number = Number(req.params.end)

        const events = await Event.findAll({ offset: start, limit: (end - start) });
        return res.json(events)
    },

    getWorstServers: async (req: express.Request, res: express.Response) => {
        interface EventInterface {
            server_name: string
            count: string
        }

        const servers = await Event.count({
            attributes: [
                'server_name'
            ],
            group: 'server_name',
        })

        const worstServer = JSON.parse(JSON.stringify(servers)).sort((a: EventInterface, b: EventInterface): any => {
            return (Number(b.count) - Number(a.count))
        })

        return res.json(worstServer)
    },

    createEvent: async (req: express.Request, res: express.Response) => {
        const { server, description, server_type } = req.body

        await Server.findOrCreate({
            attributes: ['name'],
            where: {
                name: server
            },
            limit: 1
        }).catch(err => {
            return res.json({
                mensagem: err.message
            })
        })

        const [lastEvent] = await Event.findAll({
            attributes: ['id'],
            order: [['id', 'DESC']],
            limit: 1
        })

        await Event.create({
            id: lastEvent.id + 1,
            server,
            description,
            created_at: new Date(),
            server_type
        }).then(event => {
            cache.flush()
            return res.json(event)
        }).catch(err => {
            return res.json({
                mensagem: err.message
            })
        })
    },

    updateEvent: async (req: express.Request, res: express.Response) => {
        const { id, values } = req.body

        const event = await Event.update(
            values, {
            where: {
                id
            }
        }).then(() => {
            cache.flush()
        })

        return res.json(event)
    },

    deleteEvent: async (req: express.Request, res: express.Response) => {
        const { id } = req.body

        const event = await Event.destroy({
            where: {
                id
            }
        }).then(() => {
            cache.flush()
        })

        return res.json(event)
    }
}

export default eventController