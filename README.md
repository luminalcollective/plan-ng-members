# PLAN Member Checker Portal

A secure, responsive membership verification service for the Pipeline Professionals' Association of Nigeria (PLAN).

The portal will allow users to check the standing of a PLAN membership record using a Member ID, while protecting personal information and preserving the integrity of PLAN's membership records.

> **Project status:** Initial development and requirements definition.

## 1. Project Objectives

The PLAN Member Checker Portal aims to:

- Provide a simple public interface for membership verification.
- Display clear, controlled verification results without exposing unnecessary personal information.
- Apply PLAN's approved brand identity and unified digital design standards.
- Connect to an authoritative membership data source through a secure server-side interface.
- Support membership reconciliation and recovery processes without treating missing register entries as proof that a person was never registered.
- Establish a foundation for future membership services without overbuilding the initial release.

## 2. Scope

### Phase 1 — Membership Verification

The initial release will focus on:

- Member ID input and validation.
- Loading, success and error feedback.
- Membership verification results displayed on the same page.
- Clear next steps for members who need to renew or contact PLAN.
- Responsive, accessible interface design.
- Server-side membership lookup and controlled API responses.
- Security controls, logging and testing.

### Future Phases

Subject to approval and requirements definition, future releases may support:

- Membership applications and onboarding.
- Membership renewal.
- Member profile updates.
- Membership cards and certificates.
- Payment and transaction integration.
- Event registration and professional development integration.
- Administrative membership management.

These future capabilities are not part of the initial implementation unless explicitly approved.

## 3. Brand and Design Authority

The governing visual reference is **PLAN Ecosystem — Unified Brand & Creative Standards v2.0**.

The portal must:

- Use approved PLAN logos and brand assets.
- Follow the approved PLAN colour palette, typography, spacing, layout and component standards.
- Use approved semantic design tokens rather than scattering raw colour values throughout the interface.
- Avoid pure black (`#000000`) and pure white (`#FFFFFF`) as system colours.
- Maintain sufficient contrast and accessible interaction states.
- Use colour alongside text or other cues to communicate status.
- Present PLAN as a credible, professional and dependable institutional identity.

The interface must express the established PLAN identity rather than introduce a separate, unrelated visual style.

## 4. Technical Direction

The proposed application stack is:

- **Framework:** Next.js with App Router.
- **Language:** TypeScript.
- **Interface:** Semantic HTML and responsive CSS.
- **API:** Server-side membership verification endpoint.
- **Development environment:** Visual Studio Code.
- **Version control:** Git and GitHub.
- **Data source:** To be confirmed following membership data reconciliation and schema approval.

The architecture must separate the user interface from membership lookup and data-access logic.

The proposed verification endpoint is:

`POST /api/membership/check`

The endpoint is a design target; its implementation and request/response contract must be defined and tested before it is treated as operational.

## 5. Membership Data Governance

The portal must use an approved authoritative membership source. It must not assume that any single legacy register contains every legitimate membership record.

Membership source files, applications, payment evidence, approval records and certificates may provide different kinds of evidence. They must be reconciled without silently overwriting original records or treating all evidence as equivalent.

The following concepts must remain distinct:

- Application or registration status.
- Membership approval.
- Current membership standing.
- Membership dates and renewal history.
- Payment evidence.
- Certificate status.

A missing entry in a register does not, by itself, prove that a person was never registered or is not a legitimate member.

Reserved Member IDs must not be overwritten or reassigned solely because the associated name or other fields are missing.

Conflicting or ambiguous records must be flagged for review rather than resolved by guesswork.

## 6. Public Verification and Privacy

The public checker must disclose only the minimum information necessary to communicate a verification result.

Potential response fields, subject to final approval, include:

- Member ID.
- Public membership status.
- Membership category, where appropriate.
- Membership year, where appropriate.
- Valid-until date, where verified and applicable.

The public interface must not expose private contact details, dates of birth, residential addresses, employment details, references, application documents, payment histories or unrestricted certificate URLs.

The application must not connect directly from the browser to a private spreadsheet or database.

Required security considerations include:

- HTTPS in production.
- Server-side data access.
- Input validation.
- Rate limiting and abuse prevention.
- Safe error responses.
- Appropriate audit logging.
- Secure credential and environment-variable management.
- Protection against membership enumeration.
- Appropriate access controls for administrative operations.

A generic not-found response must not unnecessarily disclose whether a person exists in an underlying registration or application dataset.

## 7. Verification Statuses

The interface is expected to accommodate the following result states:

- **Active** — current membership is verified as active under the approved rules.
- **Expired** — membership validity has ended under the approved rules.
- **Due for Renewal** — membership meets the approved renewal-warning criteria.
- **Suspended** — a valid administrative restriction applies.
- **Not Verified** — the submitted Member ID cannot be verified through the public checker.

The final status rules, precedence, date calculations and handling of unresolved records must be agreed against PLAN's membership policy and reconciled data.

The interface must not infer membership approval or active standing from an application record alone.

## 8. Development Principles

1. Inspect the existing repository before adding or replacing project files.
2. Keep documentation, design, data contracts and implementation aligned.
3. Use synthetic data for development and UI testing until an approved data source is available.
4. Never commit credentials, private member data or production secrets to GitHub.
5. Preserve source records and document material data conflicts.
6. Do not invent membership status or silently resolve ambiguous evidence.
7. Prefer small, reviewable changes over unnecessary complexity.
8. Test loading, validation, result and failure states.
9. Maintain accessible, responsive behaviour.
10. Do not modify production data or deploy the application without the required approval.

## 9. Proposed Project Structure

The following is a target structure, not a statement of files already implemented:

```text
plan-ng-members/
├── app/
│   ├── page.tsx
│   ├── membership/
│   │   ├── check/
│   │   │   └── page.tsx
│   │   ├── join/
│   │   │   └── page.tsx
│   │   └── renew/
│   │       └── page.tsx
│   ├── api/
│   │   └── membership/
│   │       └── check/
│   │           └── route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── membership/
│   └── ui/
├── lib/
│   └── membership/
├── public/
│   └── brand/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

The structure may be adjusted after inspecting the repository and agreeing on the initial implementation.

## 10. Delivery Roadmap

| Stage | Deliverable |
|---|---|
| 1 | Project documentation and requirements baseline |
| 2 | Initial UI/UX and interaction-state review |
| 3 | Membership source inventory and reconciliation |
| 4 | Canonical membership schema and data contract |
| 5 | API contract and status rules |
| 6 | Next.js application implementation |
| 7 | Security, accessibility and functional testing |
| 8 | Approved data-source integration |
| 9 | Deployment and operational handover |

UI/UX work may proceed using synthetic data while membership reconciliation is underway.

## 11. Acceptance Criteria for the Initial Release

The initial release will be ready for review when:

- A user can submit a Member ID through a responsive, accessible interface.
- The application validates input and provides clear feedback.
- Results appear on the same page.
- The public response contains only approved fields.
- Unsupported or unresolved records are handled safely.
- Membership standing follows the approved rules.
- The browser never receives private database credentials.
- Security and error-handling tests pass.
- The interface conforms to PLAN's approved design system.
- The implementation and limitations are documented.

## 12. Current Decisions and Open Questions

### Established direction

- PLAN's unified design standards govern the interface.
- The initial product is a public membership checker.
- The application is intended for VS Code and GitHub development.
- Next.js and TypeScript are the proposed stack.
- Membership data must be reconciled before selecting the authoritative source.
- Public verification must be privacy-preserving.
- Synthetic data will be used for initial interface development.

### Still to be confirmed

- Authoritative membership source and integration method.
- Canonical membership schema.
- Approved status definitions and date rules.
- Treatment of unresolved reconciliation cases.
- Publicly permitted result fields.
- Official deployment domain.
- Approved renewal and contact destinations.

These decisions must be resolved before the corresponding production functionality is implemented.

---

**Governing principle:** Build a dependable public verification service on top of trustworthy membership data, using PLAN's established design system and preserving the integrity and privacy of the underlying records.