"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../models/server");
const event_1 = require("../models/event");
const Cache_1 = __importDefault(require("../config/Cache"));
const cache = new Cache_1.default(120);
const idEventsCache = 'eventList';
const eventController = {
    getEvents: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return cache.get(idEventsCache, () => __awaiter(void 0, void 0, void 0, function* () {
            const events = yield event_1.Event.findAll({
                include: [
                    { model: server_1.Server, attributes: ['created_at', 'server_type'] }
                ]
            });
            return JSON.stringify(events);
        })).then((result) => {
            return res.json(JSON.parse(result));
        });
    }),
    getEventsBetween: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const start = Number(req.params.start);
        const end = Number(req.params.end);
        const events = yield event_1.Event.findAll({ offset: start, limit: (end - start) });
        return res.json(events);
    }),
    getWorstServers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const servers = yield event_1.Event.count({
            attributes: [
                'server_name'
            ],
            group: 'server_name',
        });
        const worstServer = JSON.parse(JSON.stringify(servers)).sort((a, b) => {
            return (Number(b.count) - Number(a.count));
        });
        return res.json(worstServer);
    }),
    createEvent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { server, description, server_type } = req.body;
        yield server_1.Server.findOrCreate({
            attributes: ['name'],
            where: {
                name: server
            },
            limit: 1
        }).catch(err => {
            return res.json({
                mensagem: err.message
            });
        });
        const [lastEvent] = yield event_1.Event.findAll({
            attributes: ['id'],
            order: [['id', 'DESC']],
            limit: 1
        });
        yield event_1.Event.create({
            id: lastEvent.id + 1,
            server,
            description,
            created_at: new Date(),
            server_type
        }).then(event => {
            cache.flush();
            return res.json(event);
        }).catch(err => {
            return res.json({
                mensagem: err.message
            });
        });
    }),
    updateEvent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, values } = req.body;
        const event = yield event_1.Event.update(values, {
            where: {
                id
            }
        }).then(() => {
            cache.flush();
        });
        return res.json(event);
    }),
    deleteEvent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.body;
        const event = yield event_1.Event.destroy({
            where: {
                id
            }
        }).then(() => {
            cache.flush();
        });
        return res.json(event);
    })
};
exports.default = eventController;
//# sourceMappingURL=serverEvents.js.map