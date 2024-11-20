export enum Tone {
	Professional = "professional",
	Friendly = "friendly",
	Empathetic = "empathetic",
	Authoritative = "authoritative",
	Casual = "casual",
	Academic = "academic",
	Inspirational = "inspirational",
}

export enum Audience {
	YoungProfessionals = "young-professionals",
	Executives = "executives",
	Students = "students",
	Researchers = "researchers",
	GeneralPublic = "general-public",
	Technicians = "technicians",
	Creatives = "creatives",
}

export enum LanguageStyle {
	Professional = "professional",
	Casual = "casual",
	Technical = "technical",
	Academic = "academic",
	Creative = "creative",
}

export enum TextComplexity {
	Simple = "simple",
	Moderate = "moderate",
	Complex = "complex",
}

// Primary Request Interface
export interface HumanizeRequest {
	text: string;
	tone: Tone;
	audience: Audience;
	style: LanguageStyle;

	// Optional parameters
	complexity?: TextComplexity;
	maxLength?: number;
	creativity?: number;

	// Optional context for more precise humanization
	context?: {
		domain?: string;
		purpose?: string;
		additionalGuidelines?: string;
	};
}

// Response Interface
export interface HumanizeResponse {
	text: string;

	// Optional metadata for additional insights
	metadata?: {
		provider: string;
		tokensUsed: number;
		processingTime?: number;
		confidenceScore?: number;
	};

	// Error handling
	error?: string;
}

// AI Provider Interface
export interface AIProvider {
	generateCompletion(options: {
		messages: { role: string; content: string }[];
		temperature?: number;
		maxTokens?: number;
	}): Promise<string>;

	getProviderName(): string;
}

// Advanced Configuration Interface
export interface HumanizationConfig {
	defaultProvider: AIProvider;
	fallbackProviders?: AIProvider[];

	// Global settings
	globalSettings?: {
		defaultTemperature?: number;
		maxRetries?: number;
		timeout?: number;
	};
}

// Detailed Logging Interface
export interface HumanizationLog {
	timestamp: Date;
	requestId: string;
	input: HumanizeRequest;
	output: HumanizeResponse;
	provider: string;
	status: "success" | "partial" | "failed";
}

// Utility Types for Advanced Scenarios
export type ProviderGenerationOptions = Parameters<
	AIProvider["generateCompletion"]
>[0];

// Error Types for Specific Scenarios
export class HumanizationError extends Error {
	constructor(
		public code: "PROVIDER_ERROR" | "GENERATION_FAILED" | "INVALID_INPUT",
		message: string
	) {
		super(message);
		this.name = "HumanizationError";
	}
}
export type HumanizationServiceOptions = {
	provider: AIProvider;
	config?: Partial<HumanizationConfig>;
};

// Logging Utility Interface
export interface LoggingService {
	log(entry: HumanizationLog): Promise<void>;
	getLog(requestId: string): Promise<HumanizationLog | null>;
}
