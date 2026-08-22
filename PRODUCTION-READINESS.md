# Production Readiness Plan

## Current state

This prototype is a static single-page editor. It uses browser localStorage for users and popups, so it is suitable for demos only. Do not use the current password handling, admin check, or client-side data store for production accounts.

## Recommended architecture

- Frontend: keep the current editor UI, but move it into a buildable frontend with a typed popup schema and server-backed persistence.
- Backend: authenticated API for users, popup CRUD, publishing, generated code, audit events, and integration webhooks.
- Database: PostgreSQL with tenant-scoped users, workspaces, popups, popup revisions, published versions, and integration connections.
- Authentication: managed passwordless or email/password authentication with hashed passwords, secure sessions, CSRF protection, rate limiting, email verification, and reset flows.
- Secrets: store OAuth client secrets, signing keys, and service credentials only in server-side environment secrets. Never ship them in generated popup code or browser JavaScript.
- Publishing: issue immutable published popup versions and serve a small versioned loader script. Keep draft editor data separate from public runtime data.

## GoHighLevel recommendation

Use OAuth 2.0 for a multi-tenant SaaS so each customer authorizes their own GoHighLevel account and tokens can be revoked or refreshed. For the company’s own internal account, a private integration token may be acceptable for a limited first-party deployment, but it should still be stored and used only by the backend. Use webhooks for downstream events when the integration requires synchronization; do not expose either OAuth tokens or private integration credentials to the frontend.

The backend should map each authenticated workspace to its own encrypted integration record, validate webhook signatures, queue outbound form submissions, retry safely, and log failures without storing secret values. Add an integration settings screen only after the server-side OAuth callback and token storage exist.

## Launch checklist

- [ ] Replace localStorage users/popups with PostgreSQL APIs.
- [ ] Replace demo/admin credentials with real authentication and role checks.
- [ ] Add tenant isolation checks to every query and mutation.
- [ ] Add server-side popup validation and revision history.
- [ ] Add secure environment variables, HTTPS, backups, monitoring, and error tracking.
- [ ] Add GoHighLevel OAuth callback, encrypted token storage, refresh/revocation handling, and webhook verification.
- [ ] Test generated code on desktop, tablet, and mobile with published versions.
- [ ] Add rate limits, abuse protection, accessibility checks, and a rollback path for published popups.
