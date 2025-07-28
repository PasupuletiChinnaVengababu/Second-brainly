"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = Random;
function Random(num) {
    let generate = "";
    let options = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < options.length; i++) {
        generate = generate + i;
    }
    return generate;
}
