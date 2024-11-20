import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { HumanizeInput, HumanizeSchema } from "../zod/InputSchema";

export const ValidationMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		validateHumanizeInput(req.body);
		next();
	} catch (error) {
		res.status(400).json({ error: "Invalid input" });
	}
};

function validateHumanizeInput(input: unknown): HumanizeInput {
	try {
		return HumanizeSchema.parse(input);
	} catch (error) {
		if (error instanceof z.ZodError) {
			const formattedErrors = error.errors.map((err) => ({
				path: err.path.join("."),
				message: err.message,
			}));

			throw new Error(JSON.stringify(formattedErrors, null, 2));
		}
		throw error;
	}
}
