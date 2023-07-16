"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = exports.generateSlug = void 0;
const random_1 = require("./random");
function generateSlug(str) {
    // Remove white space and convert to lower case
    str = str.trim().toLowerCase();
    // Replace non-alphanumeric characters with hyphens
    str = str.replace(/[^a-z0-9]+/g, '-');
    // Remove any leading or trailing hyphens
    str = str.replace(/^-+|-+$/g, '');
    return str;
}
exports.generateSlug = generateSlug;
function slugify(text) {
    return generateSlug(text) + '-' + (0, random_1.randomCode)(15);
}
exports.slugify = slugify;
