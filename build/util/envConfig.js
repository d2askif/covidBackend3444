"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var path;
switch (process.env.NODE_ENV) {
    case 'test':
        path = __dirname + "/../../.env.test";
        break;
    case 'production':
        path = __dirname + "/../../.env.prod";
        break;
    default:
        path = __dirname + "/../../.env.dev";
}
dotenv.config({ path: path });
exports.MONGO_URI = process.env.MONGO_URI;
//# sourceMappingURL=envConfig.js.map