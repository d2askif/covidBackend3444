"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tools_1 = require("graphql-tools");
var patientTypeDef_1 = require("./typeDefs/patientTypeDef");
var patientResolver_1 = require("./resolvers/patientResolver");
var patientSchema = graphql_tools_1.makeExecutableSchema({
    resolvers: [patientResolver_1.patientResolver],
    typeDefs: [patientTypeDef_1.patientTypeDef]
});
exports.default = graphql_tools_1.mergeSchemas({
    schemas: [patientSchema]
});
//# sourceMappingURL=index.js.map