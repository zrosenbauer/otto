"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = void 0;
async function wait(waitInMs) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, waitInMs);
    });
}
exports.wait = wait;
//# sourceMappingURL=main.js.map