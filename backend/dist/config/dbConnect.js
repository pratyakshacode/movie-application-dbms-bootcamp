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
exports.connectDB = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
// export const AppDataSource = new DataSource({
//   type: "mysql",
//   host: "localhost",
//   port: 3306,
//   username: process.env.SQL_USERNAME,
//   password: process.env.SQL_PASSWORD,
//   database: "ticketbooking",
//   synchronize: true,
//   logging: true,
//   entities: [__dirname + "/../entities/**/*.js"], // only JS since nodemon runs dist
// });
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [__dirname + "/../entities/**/*.js"],
});
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Promise.all([
            exports.AppDataSource.initialize().then(() => {
                console.log("✅SQL (TypeORM) connected");
            }),
            mongoose_1.default.connect(process.env.MONGODB_URL).then(() => {
                console.log("✅ MongoDB connected");
            }),
        ]);
    }
    catch (error) {
        console.error("❌ ERROR IN CONNECTING DATABASES:", error);
        process.exit(1); // stop server if DB fails
    }
});
exports.connectDB = connectDB;
//# sourceMappingURL=dbConnect.js.map