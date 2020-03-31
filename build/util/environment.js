"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultPort = 4000;
exports.environment = {
    apollo: {
        introspection: process.env.APOLLO_INTROSPECTION === 'true',
        playground: process.env.APOLLO_PLAYGROUND === 'true',
        engineKey: process.env.ENGINE_API_KEY
    },
    port: process.env.PORT || defaultPort
};
//# sourceMappingURL=environment.js.map