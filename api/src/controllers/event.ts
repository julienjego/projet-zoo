import Event from "../models/event";
import Enclosure from "../models/enclosure";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const getEventsByEnclosure = (
    req: Request,
    res: Response,
    next: NextFunction
) => {};

export default { getEventsByEnclosure };
