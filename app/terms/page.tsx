import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use & Disclaimers",
  description:
    "The terms governing use of The Carryforward, and the disclaimers that matter: educational content only, no tax or legal advice, no professional relationship, no warranties.",
  alternates: { canonical: "/terms" },
};

const EFFECTIVE = "July 23, 2026";

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="mx-auto max-w-[1120px] px-5 pt-11 sm:px-10">
          <div className="sheet px-7 py-9 sm:px-14 sm:py-11">
            <div className="mx-auto max-w-[680px]">
              <p className="kicker mb-3.5 text-xs text-accent">Legal</p>
              <h1 className="font-serif text-[34px] font-semibold leading-[1.05] sm:text-[44px]">
                Terms of Use &amp; Disclaimers
              </h1>
              <p className="mt-4 font-serif text-xl italic leading-normal text-ink-soft">
                Read this the way you&rsquo;d read anything else here: it says what it means. The
                Site is educational publishing about tax law — it is not advice, and using it
                creates no professional relationship.
              </p>
              <div className="kicker mt-5 border-y border-ink py-2.5 font-medium text-[11px] text-ink-mute">
                Effective {EFFECTIVE} · Applies to thecarryforward.com
              </div>
              <div className="prose mt-8">
                <p>
                  These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of
                  thecarryforward.com (the &ldquo;Site&rdquo;), published by {SITE_NAME}
                  (&ldquo;we,&rdquo; &ldquo;us&rdquo;). By using the Site you accept these Terms.
                  If you do not accept them, do not use the Site.
                </p>

                <h2>1. Educational content only — not tax, legal, or accounting advice</h2>
                <p>
                  Everything on the Site — articles, briefs, courses, glossary entries, charts,
                  tables, worked examples, and FAQ answers — is general educational information
                  about United States federal tax law and related subjects. It is{" "}
                  <strong>not</strong> tax advice, legal advice, accounting advice, investment
                  advice, or a substitute for any of them. Tax outcomes depend on facts,
                  elections, and procedural history specific to each taxpayer, none of which we
                  know. Nothing on the Site is directed at, or a recommendation for, your
                  particular situation.
                </p>
                <p>
                  <strong>
                    Before acting or refraining from acting on anything you read here, consult a
                    qualified professional
                  </strong>{" "}
                  — a CPA, enrolled agent, or tax attorney — who can apply the law to your facts
                  and who is accountable to you for the result. Our article{" "}
                  <Link href="/fundamentals/choosing-a-specialty-tax-provider">
                    on choosing a specialty tax provider
                  </Link>{" "}
                  explains how to evaluate one.
                </p>

                <h2>2. No professional relationship</h2>
                <p>
                  Reading the Site, completing a course, or relying on any material here does not
                  create a client relationship of any kind — attorney–client, accountant–client,
                  advisor–advisee, or fiduciary — between you and {SITE_NAME}, its publisher, or
                  any contributor. No communication through or about the Site constitutes
                  engagement of professional services. Course &ldquo;completion&rdquo; reflects
                  only that pages were opened in your browser; it is not a credential,
                  certification, license, or evidence of competence, and it confers no continuing
                  professional education (CPE/CLE) credit.
                </p>

                <h2>3. No penalty protection</h2>
                <p>
                  Written tax advice that protects a taxpayer from penalties must come from a
                  practitioner engaged on the taxpayer&rsquo;s specific facts. The Site is
                  general-circulation publishing: nothing here is written advice you can rely on
                  to avoid penalties under the Internal Revenue Code (including the accuracy-
                  related penalties of Section 6662) or to establish reasonable cause, and it is
                  not a &ldquo;covered opinion&rdquo; or reliance opinion of any kind. See our
                  articles on{" "}
                  <Link href="/fundamentals/accuracy-penalties-6662">accuracy penalties</Link> and{" "}
                  <Link href="/fundamentals/reasonable-cause-defense">
                    the reasonable-cause defense
                  </Link>{" "}
                  for how penalty protection actually works.
                </p>

                <h2>4. Accuracy, currency, and change in law</h2>
                <p>
                  We work hard to be accurate and we cite primary sources, but tax law changes by
                  statute, regulation, ruling, and case law — sometimes retroactively. Articles
                  state their publication and revision dates and describe the law as we understood
                  it on those dates. We do not warrant that any page is current, complete, or
                  error-free on the day you read it, and we have no obligation to update any
                  particular page. Where our summary and the primary authority differ,{" "}
                  <strong>the statute, regulations, and official guidance control</strong> — which
                  is why we link to them.
                </p>

                <h2>5. Worked examples and charts are illustrations</h2>
                <p>
                  Numeric examples, charts, and tables are simplified illustrations built to teach
                  a mechanism. They omit interactions (state taxes, AMT, limitations, phase-outs,
                  elections) that change real outcomes, and figures labeled
                  &ldquo;illustrative&rdquo; are exactly that. Do not use them as calculations for
                  a return, a provision, a model, or a transaction.
                </p>

                <h2>6. Independence and no endorsement</h2>
                <p>
                  We do not sell tax studies or professional services, accept sponsorships or
                  affiliate compensation, or receive payment for placement, and no provider is
                  endorsed by appearing in, or being described on, the Site. References to
                  third-party firms, tools, software lists, or government programs are for
                  identification and education only. Links to external sites (including IRS.gov
                  and other government resources) are provided for convenience; we are not
                  responsible for their content or availability.
                </p>

                <h2>7. Intellectual property and permitted use</h2>
                <p>
                  The Site&rsquo;s content, design, and compilation are protected by copyright and
                  other intellectual-property laws and are owned by {SITE_NAME} or its licensors.
                  You may read, print, and share links freely, and quote reasonable excerpts with
                  attribution and a link. You may not republish substantial portions of the Site,
                  use its content to train commercial products that substitute for it, scrape it
                  at disruptive volume, or present its material as your own or as advice to
                  clients without independent verification. Statutes, regulations, and other
                  government works quoted on the Site remain in the public domain.
                </p>

                <h2>8. Acceptable use</h2>
                <p>
                  You agree not to interfere with the Site&rsquo;s operation, attempt to
                  circumvent its security, misrepresent affiliation with it, or use it in
                  violation of applicable law. We may restrict access that violates these Terms.
                </p>

                <h2>9. Disclaimer of warranties</h2>
                <p>
                  THE SITE AND ALL CONTENT ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
                  AVAILABLE,&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
                  WITHOUT LIMITATION WARRANTIES OF ACCURACY, COMPLETENESS, MERCHANTABILITY,
                  FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. YOUR USE OF THE
                  SITE IS AT YOUR OWN RISK.
                </p>

                <h2>10. Limitation of liability</h2>
                <p>
                  TO THE FULLEST EXTENT PERMITTED BY LAW, {SITE_NAME.toUpperCase()}, ITS PUBLISHER,
                  AND CONTRIBUTORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                  CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, TAX
                  BENEFITS, OR DATA, ARISING FROM OR RELATING TO YOUR USE OF (OR INABILITY TO USE)
                  THE SITE OR RELIANCE ON ITS CONTENT — INCLUDING ANY TAX POSITION TAKEN, RETURN
                  FILED, ELECTION MADE OR MISSED, PENALTY OR INTEREST ASSESSED, OR EXAMINATION
                  OUTCOME — WHETHER BASED IN CONTRACT, TORT, OR ANY OTHER THEORY, EVEN IF ADVISED
                  OF THE POSSIBILITY OF SUCH DAMAGES. IF, NOTWITHSTANDING THE FOREGOING, LIABILITY
                  IS FOUND, OUR AGGREGATE LIABILITY WILL NOT EXCEED ONE HUNDRED DOLLARS (US $100).
                  Some jurisdictions do not allow certain limitations; in those jurisdictions,
                  these limitations apply to the fullest extent permitted.
                </p>

                <h2>11. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless {SITE_NAME}, its publisher, and
                  contributors from claims, damages, and expenses (including reasonable
                  attorneys&rsquo; fees) arising from your misuse of the Site or violation of
                  these Terms.
                </p>

                <h2>12. Changes to the Site and these Terms</h2>
                <p>
                  We may modify, suspend, or discontinue any part of the Site at any time. We may
                  revise these Terms by posting an updated version with a new effective date;
                  continued use after a change constitutes acceptance. Material changes will be
                  flagged rather than made silently — the same standard we apply to articles.
                </p>

                <h2>13. Governing law and severability</h2>
                <p>
                  These Terms are governed by the laws of the State of Texas and applicable
                  federal law, without regard to conflict-of-laws rules, and any dispute will be
                  brought in the state or federal courts located in Texas. If any provision of
                  these Terms is held unenforceable, the remainder continues in effect. These
                  Terms, together with the <Link href="/privacy">Privacy Policy</Link>,
                  constitute the entire agreement regarding use of the Site.
                </p>

                <h2>Questions</h2>
                <p>
                  Our editorial standards and what this publication is (and is not) are described
                  on the <Link href="/about">About page</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
