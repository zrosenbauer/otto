"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.describe = exports.command = void 0;
exports.command = 'bar';
exports.describe = 'this is a bar command';
exports.builder = {};
async function handler(argv) {
    console.log('this is something');
}
exports.handler = handler;
//# sourceMappingURL=bar.js.map