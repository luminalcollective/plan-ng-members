"use client";

import Link from "next/link";
import { useState } from "react";

type MembershipStatus = "Active" | "Expired" | "Due for Renewal" | "Suspended";

type Member = {
  memberId: string;
  status: MembershipStatus;
};

const DEMO_MEMBERS: Member[] = [
  { memberId: "PLN-I-001-24", status: "Active" },
  { memberId: "PLN-C-002-23", status: "Due for Renewal" },
  { memberId: "PLN-S-003-25", status: "Expired" },
  { memberId: "PLN-H-004-20", status: "Suspended" },
];

const MEMBER_ID_PATTERN = /^PLN-[ICSH]-\d{3}-\d{2}$/i;

const MEMBER_TYPES: Record<string, string> = {
  I: "Individual",
  C: "Corporate",
  S: "Student",
  H: "Honorary",
};

export default function Home() {
  const [memberId, setMemberId] = useState("");
  const [searchedId, setSearchedId] = useState("");
  const [result, setResult] = useState<Member | null | undefined>(undefined);
  const [formatError, setFormatError] = useState("");

  function checkMembership(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedId = memberId.trim().toUpperCase();

    setFormatError("");
    setResult(undefined);
    setSearchedId("");

    if (!MEMBER_ID_PATTERN.test(normalizedId)) {
      setFormatError(
        "Enter a valid Member ID in the format PLN-I-001-24. The type must be I, C, S or H.",
      );
      return;
    }

    setSearchedId(normalizedId);

    const member = DEMO_MEMBERS.find((item) => item.memberId === normalizedId);

    setResult(member ?? null);
  }

  const statusClass = result?.status.toLowerCase().replaceAll(" ", "-");

  const memberType = searchedId ? MEMBER_TYPES[searchedId.split("-")[1]] : "";

  return (
    <main className="portal">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="PLAN home">
          <span className="brand-mark">PLAN</span>
          <span className="brand-description">
            Pipeline Professionals&apos; Association of Nigeria
          </span>
        </Link>
        <span className="header-label">MEMBERSHIP SERVICES</span>
      </header>

      <section className="hero">
        <p className="eyebrow">MEMBER SERVICES PORTAL</p>
        <h1>
          Membership
          <br />
          Status Checker
        </h1>
        <p className="hero-description">
          Verify your membership status using your official PLAN Member ID.
        </p>
      </section>

      <section className="checker" aria-labelledby="checker-title">
        <div className="checker-heading">
          <span className="step-number">01</span>
          <div>
            <h2 id="checker-title">Check your membership</h2>
            <p>Enter the Member ID shown on your membership record.</p>
          </div>
        </div>

        <form onSubmit={checkMembership} noValidate>
          <label htmlFor="memberId">PLAN Member ID</label>
          <div className="search-row">
            <input
              id="memberId"
              name="memberId"
              type="text"
              value={memberId}
              onChange={(event) => {
                setMemberId(event.target.value);
                setFormatError("");
                setResult(undefined);
                setSearchedId("");
              }}
              placeholder="PLN-I-001-24"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              aria-invalid={Boolean(formatError)}
              aria-describedby={
                formatError ? "memberId-error" : "memberId-help"
              }
              required
            />
            <button type="submit">Check status</button>
          </div>

          {formatError ? (
            <p
              className="field-help"
              id="memberId-error"
              role="alert"
              style={{ color: "var(--plan-red)" }}
            >
              {formatError}
            </p>
          ) : (
            <p className="field-help" id="memberId-help">
              Format: PLN-[TYPE]-XXX-YY. Type: I (Individual), C (Corporate), S
              (Student) or H (Honorary).
            </p>
          )}
        </form>

        {result !== undefined && (
          <section className="result" aria-live="polite">
            {result ? (
              <>
                <p className="result-label">MEMBERSHIP STATUS</p>

                <div className="result-status">
                  <span
                    className={`status-indicator ${statusClass}`}
                    aria-hidden="true"
                  />
                  <h3>{result.status}</h3>
                </div>

                <p className="result-copy">
                  Member ID: <strong>{searchedId}</strong>
                </p>
                <p className="result-copy">
                  Membership type: <strong>{memberType}</strong>
                </p>

                {result.status === "Active" && (
                  <p className="result-note">
                    This demonstration record is marked active.
                  </p>
                )}

                {result.status === "Due for Renewal" && (
                  <p className="result-note">
                    Contact the PLAN Secretariat to confirm your renewal
                    requirements.
                  </p>
                )}

                {result.status === "Expired" && (
                  <p className="result-note">
                    Contact the PLAN Secretariat for assistance with your
                    membership.
                  </p>
                )}

                {result.status === "Suspended" && (
                  <p className="result-note">
                    Contact the PLAN Secretariat for further information.
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="result-label">LOOKUP RESULT</p>
                <h3>Record not found</h3>
                <p className="result-copy">
                  No matching record was found in this demonstration dataset.
                  Check your Member ID or contact the PLAN Secretariat for
                  assistance.
                </p>
              </>
            )}
          </section>
        )}
      </section>

      <aside className="privacy-note">
        <span className="privacy-icon" aria-hidden="true"></span>
        <p>
          <strong>Demonstration only:</strong> These results use synthetic test
          records and do not confirm actual PLAN membership. The portal is not
          yet connected to official membership records.
        </p>
      </aside>

      <footer className="site-footer">
        <span>PLAN · Membership Services</span>
        <span>Official membership records remain authoritative.</span>
      </footer>
    </main>
  );
}
