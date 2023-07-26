"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReview = void 0;
const createReview = (req, res) => {
    console.log(`${req.originalUrl} POST request`);
    const actyId = req.params.id;
    res.send({ actyId });
};
exports.createReview = createReview;
//# sourceMappingURL=review.js.map