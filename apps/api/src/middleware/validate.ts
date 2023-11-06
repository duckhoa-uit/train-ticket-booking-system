/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ParsedQs } from "qs";
import { AnyZodObject, ZodError } from "zod";

export const validate =
  <TQuery extends ParsedQs = any, TBody extends Record<string, any> = any>(schema: AnyZodObject) =>
  (req: Request<any, any, TBody, TQuery>, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: "fail",
          errors: error.errors,
        });
        return;
      }
      next(error);
    }
  };

//   import { Request, Response, NextFunction } from 'express';
// import { ParsedQs } from 'qs';
// import { AnyZodObject, ZodError } from 'zod';

// export const validate =
//   <TQuery extends ParsedQs = any, TBody extends Record<string, any> = any>(schema: AnyZodObject) =>
//     (req: Request<any, any, TBody, TQuery>, res: Response, next: NextFunction) => {
//       try {
//         schema.parse({
//           params: req.params,
//           query: req.query,
//           body: req.body,
//         });

//         next();
//       } catch (error) {
//         if (error instanceof ZodError) {
//           return res.status(400).json({
//             status: 'fail',
//             errors: error.errors,
//           });
//         }
//         next(error);
//       }
//     }
