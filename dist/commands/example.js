"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.describe = exports.command = void 0;
exports.command = 'example';
exports.describe = 'this is an example cli command';
exports.builder = {};
async function handler(argv) {
    console.log('You successfully ran a command!');
}
exports.handler = handler;
//# sourceMappingURL=example.js.map