import { NextFunction, Request, Response } from "express";

// This middleware handles asynchronous errors in Express routes
// It wraps the route handler function and catches any errors that occur,
// logging them and sending a 500 Internal Server Error response to the client.
// This is useful for avoiding repetitive try-catch blocks in every route handler.

// Usage: Wrap your route handler with asyncHandler, e.g., app.get('/route', asyncHandler(async (req, res) => { ... }));
const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export default asyncHandler;