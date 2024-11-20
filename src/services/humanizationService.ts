import { PromptTemplateManager } from "../libs/PromptTemplateManager";
import {
	AIProvider,
	HumanizeRequest,
	HumanizeResponse,
	LanguageStyle,
} from "../types";

export class HumanizationService {
	private promptTemplateManager: PromptTemplateManager;
	private aiProvider: AIProvider;

	constructor(aiProvider: AIProvider) {
		this.promptTemplateManager = new PromptTemplateManager();
		this.aiProvider = aiProvider;
	}

	async humanize(
		request: HumanizeRequest,
		contextType: string = "default"
	): Promise<HumanizeResponse> {
		const prompt = this.promptTemplateManager.generatePrompt(
			request,
			contextType
		);

		try {
			const response = await this.aiProvider.generateCompletion({
				messages: [{ role: "user", content: prompt }],
				temperature: request.creativity ?? 0.7,
				maxTokens: request.maxLength ?? 500,
			});

			return {
				text: response.trim(),
				metadata: {
					provider: this.aiProvider.getProviderName(),
					tokensUsed: response.length,
				},
			};
		} catch (error) {
			console.error("Humanization failed:", error);
			return {
				text: request.text,
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	}
}
