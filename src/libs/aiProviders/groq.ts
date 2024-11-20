import Groq from "groq-sdk";

import { config } from "dotenv";
import { AIProvider } from "../../types";
config();
// Groq Provider Implementation
export class GroqProvider implements AIProvider {
	private groq: Groq;

	constructor() {
		this.groq = new Groq({
			apiKey: process.env.GROQ_API_KEY,
		});
	}

	async generateCompletion(options: {
		messages: { role: string; content: string }[];
		temperature?: number;
		maxTokens?: number;
	}): Promise<string> {
		const response = await this.groq.chat.completions.create({
			model: "llama3-8b-8192",
			messages: options.messages,
			temperature: options.temperature ?? 0.7,
			max_tokens: options.maxTokens ?? 500,
		});

		return response.choices[0]?.message?.content || "";
	}

	getProviderName(): string {
		return "Groq";
	}
}
