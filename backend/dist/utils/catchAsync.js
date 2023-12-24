"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (func) => {
    return function (req, res, next) {
        func(req, res, next).catch((err) => {
            console.log('Inner Func in CatchAsync');
            next(err);
        });
    };
};
exports.default = catchAsync;
//# sourceMappingURL=catchAsync.js.map