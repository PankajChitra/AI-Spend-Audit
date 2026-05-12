# Architecture

## Overview

AI Spend Audit follows a separated frontend/backend architecture.

Frontend:
- React + TypeScript
- Responsible for UI and API communication

Backend:
- Express.js API
- Handles audit logic, persistence, AI summaries, and email workflows

Database:
- MongoDB Atlas

Deployment:
- Frontend → Vercel
- Backend → Render

---

# System Flow

User → React Frontend → Express API → MongoDB

Additional services:
- OpenAI API
- Resend Email API

---

# Frontend Structure

client/src

- pages/
- lib/
- components/

Main pages:
- Home
- Audit
- Report

---

# Backend Structure

server/

- routes/
- models/
- services/
- utils/

---

# Audit Engine

The audit engine is deterministic and rule-based.

Reason:
Financial recommendations should remain:
- explainable
- consistent
- testable

AI is not used for calculations.

---

# AI Summary System

OpenAI is only used for:
- personalized summaries

Fallback summaries were implemented for:
- API failures
- quota limitations

---

# Lead Capture Flow

1. User generates report
2. User submits email
3. Lead stored in MongoDB
4. Transactional email triggered

---

# CI/CD

GitHub Actions:
- automated test runs
- push validation

Deployment:
- Vercel
- Render