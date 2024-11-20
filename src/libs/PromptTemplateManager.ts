import { Audience, HumanizeRequest, LanguageStyle, Tone } from "../types";

export class PromptTemplateManager {
	private basePromptTemplate: string;
	private contextTemplates: Record<string, string>;

	constructor() {
		this.basePromptTemplate = this.createBasePromptTemplate();
		this.contextTemplates = this.createContextTemplates();
	}

	private createBasePromptTemplate(): string {
		return `
ADVANCED TEXT HUMANIZATION FRAMEWORK

🎯 CORE TRANSFORMATION GUIDELINES:
- Preserve Original Intent: Maintain the fundamental message and purpose of the source text
- Adaptive Communication: Tailor language to specified parameters
- Nuanced Expression: Enhance natural communication while respecting core content

📋 TRANSFORMATION PARAMETERS:
- Audience Persona: {{AUDIENCE_DESCRIPTION}}
- Communication Tone: {{TONE_CHARACTERISTICS}}
- Linguistic Style: {{STYLE_DESCRIPTORS}}

🔍 REFINEMENT PRINCIPLES:
1. Contextual Adaptation
2. Linguistic Precision
3. Emotional Intelligence
4. Audience-Specific Optimization

⚙️ SPECIFIC CONSTRAINTS:
- Do not alter fundamental meaning
- Maintain original information integrity
- Focus on communication enhancement

ORIGINAL TEXT:
"""
{{INPUT_TEXT}}
"""

OUTPUT INSTRUCTIONS:
- Provide ONLY the humanized text, No Preamble
- No additional commentary or explanations
- Ensure clear, natural language
- Do not reply with "Here is the humanized text" at the opening
    `.trim();
	}

	private createContextTemplates(): Record<string, string> {
		return {
			default: "Generic communication context",
			software: "Technical software development communication context",
			marketing:
				"Persuasive and engaging marketing communication context",
			academic: "Scholarly and research-oriented communication context",
		};
	}

	private getAudienceDescription(audience: Audience): string {
		const audienceDescriptions: Record<Audience, string> = {
			[Audience.YoungProfessionals]:
				"Tech-savvy, career-focused individuals in early to mid-career stages, valuing clear, concise, and engaging communication",
			[Audience.Executives]:
				"Senior leadership seeking strategic, precise, and impactful communication with emphasis on efficiency and high-level insights",
			[Audience.Students]:
				"Learning-oriented individuals requiring explanatory, supportive, and motivational language",
			[Audience.Researchers]:
				"Analytical minds requiring structured, evidence-based, and intellectually rigorous communication",
			[Audience.GeneralPublic]:
				"Diverse audience needing accessible, inclusive, and easily comprehensible language",
			[Audience.Technicians]:
				"Professionals requiring technical accuracy, practical details, and industry-specific terminology",
			[Audience.Creatives]:
				"Innovative individuals appreciating expressive, imaginative, and inspirational communication",
		};
		return audienceDescriptions[audience];
	}

	private getToneCharacteristics(tone: Tone): string {
		const toneDescriptions: Record<Tone, string> = {
			[Tone.Professional]:
				"Authoritative, structured, and credible communication style",
			[Tone.Friendly]: "Warm, approachable, and conversational tone",
			[Tone.Empathetic]:
				"Compassionate, understanding, and emotionally intelligent communication",
			[Tone.Authoritative]:
				"Confident, decisive, and expertise-driven language",
			[Tone.Casual]: "Relaxed, informal, and conversational approach",
			[Tone.Academic]:
				"Scholarly, precise, and analytically rigorous communication",
			[Tone.Inspirational]:
				"Motivational, uplifting, and encouraging language",
		};
		return toneDescriptions[tone];
	}

	private getStyleDescriptors(style: LanguageStyle): string {
		const styleDescriptions: Record<LanguageStyle, string> = {
			[LanguageStyle.Professional]:
				"Structured, formal, precise, and industry-appropriate communication",
			[LanguageStyle.Casual]:
				"Conversational, relaxed, and naturally flowing language",
			[LanguageStyle.Technical]:
				"Detailed, systematic, and information-dense communication",
			[LanguageStyle.Academic]:
				"Scholarly, analytical, comprehensive, and nuanced expression",
			[LanguageStyle.Creative]:
				"Imaginative, expressive, dynamic, and metaphorical language",
		};
		return styleDescriptions[style];
	}

	public generatePrompt(
		request: HumanizeRequest,
		contextType: string = "default"
	): string {
		// Interpolate dynamic values into the base template
		let prompt = this.basePromptTemplate
			.replace(
				"{{AUDIENCE_DESCRIPTION}}",
				this.getAudienceDescription(request.audience)
			)
			.replace(
				"{{TONE_CHARACTERISTICS}}",
				this.getToneCharacteristics(request.tone)
			)
			.replace(
				"{{STYLE_DESCRIPTORS}}",
				this.getStyleDescriptors(request.style)
			)
			.replace("{{INPUT_TEXT}}", request.text);

		// Optionally add context-specific details
		const contextTemplate =
			this.contextTemplates[contextType] ||
			this.contextTemplates["default"];
		prompt = prompt.replace(
			"ADVANCED TEXT HUMANIZATION FRAMEWORK",
			`ADVANCED TEXT HUMANIZATION FRAMEWORK\n\n🌐 CONTEXT: ${contextTemplate}`
		);

		return prompt;
	}

	public addContextTemplate(key: string, description: string): void {
		this.contextTemplates[key] = description;
	}
}
