import { z } from "zod";

export const ToneSchema = z.enum([
	"professional",
	"friendly",
	"empathetic",
	"authoritative",
	"casual",
	"academic",
	"inspirational",
]);

// Audience Enum Schema
export const AudienceSchema = z.enum([
	"young-professionals",
	"executives",
	"students",
	"researchers",
	"general-public",
	"technicians",
	"creatives",
]);

// Language Style Schema
export const LanguageStyleSchema = z.enum([
	"professional",
	"casual",
	"technical",
	"academic",
	"creative",
]);

// Text Complexity Schema
export const TextComplexitySchema = z.enum(["simple", "moderate", "complex"]);

// Context Schema
const ContextSchema = z
	.object({
		domain: z.string().optional(),
		purpose: z.string().optional(),
		additionalGuidelines: z.string().optional(),
	})
	.optional();

// Complete Humanization Schema
export const HumanizeSchema = z.object({
	// Text Validation
	text: z
		.string()
		.min(1, { message: "Text must not be empty" })
		.max(5000, { message: "Text must be less than 5000 characters" }),

	// Required Enums with Validation
	tone: ToneSchema,
	audience: AudienceSchema,
	style: LanguageStyleSchema,

	// Optional Parameters with Refined Validation
	complexity: TextComplexitySchema.optional(),

	// Creativity Level Validation
	creativity: z
		.number()
		.min(0, { message: "Creativity must be between 0 and 1" })
		.max(1, { message: "Creativity must be between 0 and 1" })
		.optional(),

	// Max Length Validation
	maxLength: z
		.number()
		.int()
		.min(10, { message: "Minimum output length is 10 characters" })
		.max(10000, { message: "Maximum output length is 10,000 characters" })
		.optional(),

	// Context Schema
	context: ContextSchema,
});

// Type Inference
export type HumanizeInput = z.infer<typeof HumanizeSchema>;
