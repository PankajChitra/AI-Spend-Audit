# Reflection

## Key Engineering Decisions

### Rule-Based Audit Engine

Audit calculations were intentionally implemented using deterministic business logic instead of AI.

Reason:
- financial recommendations require transparency
- predictable outputs improve trust
- easier testing and debugging

AI was only used for:
- personalized summaries

---

## Graceful Degradation

The system was designed to continue functioning even when:
- OpenAI API fails
- email delivery fails

This improves production reliability.

---

## Biggest Challenges

- Deployment environment issues
- Case-sensitive module imports
- Environment variable management
- API quota limitations

---

## What I Would Improve

- Real-time pricing integrations
- OAuth authentication
- Dashboard analytics
- Better recommendation heuristics
- PDF export support
- Stripe monetization

---

## Lessons Learned

This project improved my understanding of:
- full-stack architecture
- deployment workflows
- CI/CD
- backend separation
- production debugging