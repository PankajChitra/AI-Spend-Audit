# AI Spend Audit

AI Spend Audit is a full-stack MERN application that helps startups and small teams analyze their AI tooling subscriptions, identify overspending, and discover optimization opportunities.

The platform generates personalized audit reports, estimated savings, AI-generated summaries, and shareable report URLs.

---

## Live Demo

Frontend: https://ai-spend-audit-blond.vercel.app

Backend: https://ai-spend-audit-28lu.onrender.com

---

## Features

- Dynamic AI tooling audit form
- Rule-based cost optimization engine
- AI-generated audit summaries
- MongoDB persistence
- Shareable public report URLs
- Lead capture system
- Transactional email integration
- High savings CTA flows
- Responsive UI
- Automated tests
- GitHub Actions CI pipeline

---

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### AI + Infrastructure
- OpenAI API
- Resend Email API
- Render
- Vercel

---

## Architecture Overview

The application uses a separated frontend/backend architecture.

Frontend:
- Handles form input
- Fetches reports
- Displays recommendations
- Captures leads

Backend:
- Processes audit logic
- Stores reports in MongoDB
- Generates AI summaries
- Sends transactional emails

---

## Setup

### Clone Repository

```bash
git clone https://github.com/PankajChitra/AI-Spend-Audit.git
```

---

### Frontend

```bash
cd client
npm install
npm run dev
```

---

### Backend

```bash
cd server
npm install
npm run dev
```

---

## Environment Variables

### Frontend

```env
VITE_API_URL=
```

### Backend

```env
MONGO_URI=
OPENAI_API_KEY=
RESEND_API_KEY=
PORT=5000
```

---

## Testing

Backend tests were implemented using Jest.

```bash
npm test
```

---

## Tradeoffs

Audit calculations were intentionally implemented using deterministic rule-based logic instead of AI to ensure:
- transparency
- reliability
- predictable recommendations

AI was only used for generating personalized summaries.

---

## Future Improvements

- Real-time pricing APIs
- Advanced recommendation engine
- Team collaboration
- Stripe billing integration
- Analytics dashboard
- OAuth authentication

---

## Author

Pankaj