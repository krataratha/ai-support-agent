# AI Refund Support Agent

An AI-powered e-commerce customer support application that helps customers submit and validate refund requests through a conversational chat interface.

The application combines a natural-language AI agent with backend tools and refund-policy validation. The AI understands what the customer is asking, while the backend is responsible for checking customer/order data and making the final refund eligibility decision.

## Features

- Conversational refund support
- Customer lookup using Customer ID
- Order lookup using Order ID
- Refund policy retrieval
- Natural-language refund reason understanding
- Refund eligibility validation
- Duplicate refund prevention
- Refund-window validation
- Refund approval or denial based on backend rules
- Agent activity logs for debugging and demonstration
- API input validation and error handling
- Gemini integration through the Google GenAI SDK
- Environment-variable based API key configuration

## How It Works

```text
Customer
   |
   v
Chat UI
   |
   v
Next.js API Route
   |
   v
runRefundAgent()
   |
   +----> getCustomer()
   |
   +----> Gemini AI
   |
   +----> getOrder()
   |
   +----> getRefundPolicy()
   |
   +----> checkRefundEligibility()
   |
   +----> approveRefund() / denyRefund()
   |
   v
Final response
   |
   v
Customer
```

### Important Design Principle

The AI is used for language understanding and conversation. It is not trusted to independently approve a refund.

The backend validates:

- Customer information
- Order information
- Refund reason
- Refund policy
- Refund window
- Previous refund status

This separation helps prevent the AI from inventing customer/order information or bypassing business rules.

## Example Scenarios

### Valid refund

Customer:

> I want a refund because my product arrived damaged.

The agent asks for the order ID, retrieves the order, checks the refund policy and eligibility, and approves the request when all conditions are satisfied.

### Outside refund window

If the order is outside the configured refund period, the system denies the request.

### Duplicate refund

If the order already has a refund request, the system prevents another refund from being processed.

### Invalid order

If the order ID does not exist, the system reports that the order could not be found instead of inventing order information.

## Tech Stack

- **Next.js** - Full-stack React framework and API routes
- **TypeScript** - Type-safe application development
- **Google Gemini** - Natural-language understanding
- **@google/genai** - Google GenAI SDK
- **Database** - Customer, order and refund data
- **React** - Chat interface

## Project Structure

A simplified structure is:

```text
project/
├── app/
│   ├── api/
│   │   └── ...
│   └── ...
├── lib/
│   └── agent/
│       ├── agent.ts
│       └── tools.ts
├── public/
├── .env.local
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

The exact folders may vary depending on the current project structure.

## Main Agent

The refund agent is implemented in:

```text
lib/agent/agent.ts
```

The agent:

1. Receives the customer ID and message.
2. Loads customer information.
3. Loads the refund policy.
4. Sends relevant context to Gemini.
5. Understands what information is missing or required.
6. Uses backend tools to validate the request.
7. Returns the response and agent logs.

## API Request

The Next.js API route expects:

```json
{
  "customerId": "cust-001",
  "message": "I want a refund because my product arrived damaged"
}
```

The API validates the required fields before calling the refund agent.

## Environment Variables

Create:

```text
.env.local
```

Add:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit the real API key to GitHub. Make sure `.env.local` is included in `.gitignore`.

Gemini API availability, quotas and free-usage limits can change, so check Google's current documentation for the limits applicable to your account.

## Installation

Clone the repository:

```bash
git clone <your-github-repository-url>
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Create `.env.local` and add the required environment variables.

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Testing

Test at least these scenarios:

### 1. Valid refund

```text
Customer ID: cust-001
Message: I want a refund because my product arrived damaged.
```

Provide a valid order ID and verify that the backend checks eligibility before approval.

### 2. Missing order ID

Expected behavior:

```text
The agent asks for the order ID.
```

### 3. Invalid order ID

Expected behavior:

```text
The system reports that the order could not be found.
```

### 4. Outside refund window

Expected behavior:

```text
The refund request is denied because it is outside the allowed window.
```

### 5. Duplicate refund

Expected behavior:

```text
The system prevents another refund request for an order that already has one.
```

## Error Handling

The API route uses `try/catch` so unexpected failures return a controlled error response instead of crashing the application.

## Security

- API keys are stored in environment variables.
- Secrets must never be committed to GitHub.
- User input is validated before processing.
- The AI does not have unrestricted authority over refunds.
- Refund decisions are validated by backend logic.
- A production version should add authentication and authorization.

## Design Decisions

### Why AI?

Customers describe problems in many different ways, such as:

- "The item came broken."
- "My product was damaged."
- "I received a defective product."

Gemini can understand these variations without requiring the customer to use an exact predefined phrase.

### Why backend tools?

Business rules should be deterministic and controlled by application code rather than generated by an LLM.

For example, whether an order is inside the refund window should be calculated from actual order data.

### Why Next.js?

Next.js allows the frontend and server-side API logic to be developed in one application, making the project simple to develop and deploy.

## Possible Future Improvements

- Authentication and authorization
- Persistent conversation history
- Refund audit history
- Email notifications
- Admin dashboard
- Automated unit and integration tests
- Rate limiting
- Structured AI tool/function calling
- Production monitoring and logging
- Multilingual support
- Human-agent escalation

## Limitations

This project is a demonstration/prototype of an AI-assisted refund workflow.

A production e-commerce system would need additional controls such as secure payment/refund integration, stronger audit logging, monitoring, automated tests, rate limiting, authentication and protection of sensitive customer data.

## Learning Outcomes

This project helped me learn how to:

- Integrate an LLM into a full-stack application
- Build a Next.js API route
- Work with TypeScript
- Connect AI responses with backend tools
- Separate AI language understanding from business logic
- Validate data before performing operations
- Handle API and application errors
- Use environment variables for secrets
- Test multiple real-world refund scenarios
- Debug issues across the frontend, API, AI layer and database

## Interview Summary

The key design principle of this project is:

> **AI understands the customer's request. Backend tools enforce the business rules.**

This makes the refund workflow more reliable than allowing the language model to make refund decisions on its own.

## Author

Built as an AI-powered e-commerce customer-support and refund-agent project.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
