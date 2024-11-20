import { Request, Response, NextFunction } from "express";
import { HumanizationService } from "../services/humanizationService";
import { HumanizeRequest } from "../types";
import { GroqProvider } from "../libs/aiProviders/groq";

const groqProvider = new GroqProvider();
export const humanizationService = new HumanizationService(groqProvider);

export const humanizeController = async (
	req: Request<{}, {}, HumanizeRequest>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { text, tone, audience, style } = req.body;

		const result = await humanizationService.humanize({
			text,
			tone,
			audience,
			style,
		});

		res.json({
			humanizedText: result.text,
			meta: {
				originalLength: text.length,
				humanizedLength: result.text.length,
				styleUsed: style,
			},
		});
	} catch (error) {
		next(error);
	}
};
