# Humanization Service API Documentation

## Overview

The Humanization Service API provides an advanced text transformation solution that adapts text to specific communication contexts.

## Base URL

```
https://api.yourcompany.com/v1/humanize
```

# 1. CURL Requests

# Basic Professional Email Humanization

```
   curl -X POST https://api.yourcompany.com/v1/humanize \
      -H "Content-Type: application/json" \
      -H "X-API-KEY: your_api_key_here" \
      -d '{
      "text": "System upgrade will occur on Monday.",
      "tone": "professional",
      "audience": "executives",
      "style": "professional",
      "context": {
      "domain": "IT",
      "purpose": "Formal communication"
     }'
   }
```

# Marketing Copy with Higher Creativity

```
   curl -X POST https://api.yourcompany.com/v1/humanize \
   -H "Content-Type: application/json" \
   -H "X-API-KEY: your_api_key_here" \
   -d '{
   "text": "Our product solves problems.",
   "tone": "friendly",
   "audience": "general-public",
   "style": "creative",
   "creativity": 0.8,
   "maxLength": 250
  }'
```

## Authentication

-   **Type**: API Key
-   **Header**: `X-API-KEY: your_api_key_here`

## Endpoint

`POST /humanize`

### Request Parameters

#### Request Body Schema

```typescript
{
  // Required Fields
  "text": string,           // The text to be humanized
  "tone": Tone,             // Communication tone
  "audience": Audience,     // Target audience
  "style": LanguageStyle,   // Linguistic style

  // Optional Fields
  "complexity"?: TextComplexity,  // Text complexity level
  "maxLength"?: number,           // Maximum output length
  "creativity"?: number,          // Creativity level (0-1)
  "context"?: {
    "domain"?: string,            // Specific domain context
    "purpose"?: string,           // Purpose of communication
    "additionalGuidelines"?: string // Extra refinement instructions
  }
}
```

### Enums and Allowed Values

#### Tone Enum

```typescript
enum Tone {
	Professional = "professional",
	Friendly = "friendly",
	Empathetic = "empathetic",
	Authoritative = "authoritative",
	Casual = "casual",
	Academic = "academic",
	Inspirational = "inspirational",
}
```

#### Audience Enum

```typescript
enum Audience {
	YoungProfessionals = "young-professionals",
	Executives = "executives",
	Students = "students",
	Researchers = "researchers",
	GeneralPublic = "general-public",
	Technicians = "technicians",
	Creatives = "creatives",
}
```

#### Language Style Enum

```typescript
enum LanguageStyle {
	Professional = "professional",
	Casual = "casual",
	Technical = "technical",
	Academic = "academic",
	Creative = "creative",
}
```

#### Text Complexity Enum

```typescript
enum TextComplexity {
	Simple = "simple",
	Moderate = "moderate",
	Complex = "complex",
}
```

### Example Requests

#### 1. Professional Email Humanization

```json
{
	"text": "System upgrade will occur on Monday.",
	"tone": "professional",
	"audience": "executives",
	"style": "professional",
	"context": {
		"domain": "IT",
		"purpose": "Formal communication"
	}
}
```

#### 2. Marketing Copy Transformation

```json
{
	"text": "Our product has features....",
	"tone": "friendly",
	"audience": "general-public",
	"style": "creative",
	"creativity": 0.8,
	"context": {
		"domain": "marketing",
		"purpose": "Product promotion"
	}
}
```

#### 3. Technical Documentation Simplification

```json
{
	"text": "Kubernetes orchestrates containerized applications through complex scheduling algorithms.",
	"tone": "friendly",
	"audience": "students",
	"style": "technical",
	"complexity": "simple"
}
```

### Response Schema

```typescript
{
  "text": string,           // Humanized text output
  "metadata"?: {
    "provider": string,     // AI provider used
    "tokensUsed": number,   // Tokens consumed
    "processingTime"?: number,
    "confidenceScore"?: number
  },
  "error"?: string          // Error message if generation fails
}
```

### Example Successful Response

```json
{
	"text": "We're excited to announce a system upgrade happening this coming Monday. Our team has carefully planned this to minimize disruption to your workflows.",
	"metadata": {
		"provider": "Groq",
		"tokensUsed": 87,
		"processingTime": 0.3
	}
}
```

### Error Handling

#### Common Error Codes

-   `400 Bad Request`: Invalid input parameters
-   `401 Unauthorized`: Invalid API key
-   `429 Too Many Requests`: Rate limit exceeded
-   `500 Internal Server Error`: Unexpected error during text transformation

### Error Response Example

```json
{
	"error": "Invalid tone specified",
	"code": "INVALID_INPUT"
}
```

### Rate Limiting

-   **Rate Limit**: 100 requests per minute
-   **Concurrent Connections**: 10

### Pricing

-   **Free Tier**: 5,000 characters/month
-   **Pro Tier**: $0.02 per 1,000 characters
-   **Enterprise**: Custom pricing

### Best Practices

1. Keep input text concise
2. Provide clear context
3. Use appropriate tone and audience selection
4. Avoid sensitive or personal information

### Contact Support

-   Email: `support@humanizationservice.com`
-   Slack Channel: `#humanization-api-support`
-   Support Hours: 24/7

### Version

**Current Version**: `1.0.0`
**Last Updated**: November 2024
