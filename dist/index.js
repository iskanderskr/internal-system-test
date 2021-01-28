"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serverEvents_1 = __importDefault(require("./controllers/serverEvents"));
const db_1 = require("./config/db");
const { getEvents, getEventsBetween, createEvent, updateEvent, deleteEvent, getWorstServers } = serverEvents_1.default;
const app = express_1.default();
app.use(express_1.default.json());
const port = process.env.PORT || 5000;
app.get('/api/event/:start/:end', getEventsBetween);
app.get('/api/event', getEvents);
app.post('/api/event', createEvent);
app.put('/api/event', updateEvent);
app.delete('/api/event', deleteEvent);
app.get('/api/worstserver', getWorstServers);
app.listen(port, () => {
    db_1.initDB();
    // tslint:disable-next-line:no-console
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=index.js.map