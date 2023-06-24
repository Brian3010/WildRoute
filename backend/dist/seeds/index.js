"use strict";
// import mongoose from 'mongoose';
Object.defineProperty(exports, "__esModule", { value: true });
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wildRoute');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//# sourceMappingURL=index.js.map