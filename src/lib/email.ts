import { Resend } from "resend";

/**
 * Delivery of form submissions (fighter sign-ups, sponsorship requests) to the
 * promotion's inbox.
 *
 * There is no @ufpcombat.com mailbox yet, and standing one up on the VPS takes
 * time, so submissions are relayed to a personal inbox in the meantime. That
 * recipient — and the Resend API key — live only in environment variables
 * (`.env` on the VPS, never committed), so no private address is baked into the
 * repo. Set them and mail flows; leave them unset and this degrades to a log
 * line, which is also what happens in local dev.
 *
 * With Resend's default sender (`onboarding@resend.dev`) mail can only be
 * delivered to the address that owns the Resend account — which is exactly this
 * case. Once ufpcombat.com is verified in Resend, point `SUBMISSIONS_FROM` at a
 * branded address and mail can go anywhere.
 */
const apiKey = process.env.RESEND_API_KEY;
const recipient = process.env.SUBMISSIONS_EMAIL;
// `||` (not `??`): SUBMISSIONS_FROM is often present-but-empty in the .env, and
// an empty `from` makes Resend reject the send with "domain is invalid".
const sender = process.env.SUBMISSIONS_FROM || "UFP Web <onboarding@resend.dev>";

const resend = apiKey ? new Resend(apiKey) : null;

export interface SubmissionEmail {
  subject: string;
  /** Ordered field label → value. Empty values are dropped. */
  fields: Record<string, string | undefined>;
  /** Applicant's address, so the owner can reply straight to them. */
  replyTo?: string;
}

/**
 * Sends a submission to the promotion's inbox. Never throws and never blocks a
 * valid submission: the data is always logged first (the container log is the
 * backup), then mail is attempted best-effort. A delivery failure is logged,
 * not surfaced to the applicant — losing a fighter over an email hiccup would
 * be worse than a missed notification we can still recover from the log.
 */
export async function notifySubmission({
  subject,
  fields,
  replyTo,
}: SubmissionEmail): Promise<void> {
  const text = Object.entries(fields)
    .filter(([, value]) => value && value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  console.log(`[UFP] ${subject}\n${text}`);

  if (!resend || !recipient) {
    console.warn(
      "[UFP] Email not sent (logged only) — missing " +
        [!resend && "RESEND_API_KEY", !recipient && "SUBMISSIONS_EMAIL"]
          .filter(Boolean)
          .join(" and "),
    );
    return;
  }

  try {
    const { error } = await resend.emails.send({
      from: sender,
      to: recipient,
      subject,
      text,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) console.error("[UFP] Email delivery failed:", error);
  } catch (err) {
    console.error("[UFP] Email delivery threw:", err);
  }
}
