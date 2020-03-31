"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.patientTypeDef = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Patient {\n    name: String\n    sex: String\n    age: Int\n    phoneNumber: String\n    city: String\n    region: String\n  }\n\n  input PatientInput {\n    name: String\n    sex: String\n    age: Int\n    phoneNumber: String\n    city: String\n    region: String\n    symptoms: Symptom\n  }\n\n  input Symptom {\n    chestPain: Boolean\n    headAce: Boolean\n    cough: Boolean\n    favour: Boolean\n  }\n\n  type Query {\n    getPatients: [Patient]\n  }\n\n  type Mutation {\n    registerPatient(input: PatientInput!): Boolean!\n  }\n"], ["\n  type Patient {\n    name: String\n    sex: String\n    age: Int\n    phoneNumber: String\n    city: String\n    region: String\n  }\n\n  input PatientInput {\n    name: String\n    sex: String\n    age: Int\n    phoneNumber: String\n    city: String\n    region: String\n    symptoms: Symptom\n  }\n\n  input Symptom {\n    chestPain: Boolean\n    headAce: Boolean\n    cough: Boolean\n    favour: Boolean\n  }\n\n  type Query {\n    getPatients: [Patient]\n  }\n\n  type Mutation {\n    registerPatient(input: PatientInput!): Boolean!\n  }\n"])));
var templateObject_1;
//# sourceMappingURL=patientTypeDef.js.map