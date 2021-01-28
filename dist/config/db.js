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
exports.initDB = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
exports.sequelize = new sequelize_1.Sequelize('server_events', '', '', {
    host: 'localhost',
    dialect: 'postgres',
    omitNull: true,
    logging: false,
    define: {
        timestamps: false
    }
});
const initDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = fs_1.default.readFileSync('./db.sql').toString();
    yield exports.sequelize.query(query);
});
exports.initDB = initDB;
//# sourceMappingURL=db.js.map