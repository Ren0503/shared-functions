"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettyObject = void 0;
const prettyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};
exports.prettyObject = prettyObject;
