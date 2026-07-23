import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About & Editorial Standards",
  description:
    "The Carryforward is an independent educational publication on specialty tax topics. We don't sell tax studies, accept sponsorships, or generate leads — here's how we work.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader activeNav="about" />
      <main id="main">
        <div className="mx-auto max-w-[1120px] px-5 pt-11 sm:px-10">
          <div className="sheet px-7 py-9 sm:px-14 sm:py-11">
            <div className="mx-auto max-w-[680px]">
              <p className="kicker mb-3.5 text-xs text-accent">The publication</p>
              <h1 className="font-serif text-[34px] font-semibold leading-[1.05] sm:text-[44px]">
                About The Carryforward
              </h1>
              <p className="mt-4 font-serif text-xl italic leading-normal text-ink-soft">
                An independent reference for the corners of the tax code where good explanations
                are scarce and sales pitches are not.
              </p>
              <div className="kicker mt-5 border-y border-ink py-2.5 font-medium text-[11px] text-ink-mute">
                Est. 2026 · No studies sold · No sponsorships · No lead forms
              </div>
              <div className="prose mt-8">
                <p>
                  Specialty tax — the R&amp;D credit, cost segregation, Section 174, energy
                  incentives — is dominated by content written to sell studies. The explanations
                  are often accurate as far as they go, but they stop wherever the pitch begins.
                  The Carryforward exists to be the other thing: a place where the rules are
                  explained because understanding them is the point.
                </p>
                <h2>Editorial standards</h2>
                <ul>
                  <li>
                    <strong>No sales.</strong> We do not perform tax studies, prepare returns, or
                    refer readers to firms that do. No provider pays for placement, and nothing on
                    the site is sponsored.
                  </li>
                  <li>
                    <strong>Primary sources first.</strong> Positions are grounded in the Internal
                    Revenue Code, Treasury regulations, IRS guidance, and case law, cited inline
                    where it matters.
                  </li>
                  <li>
                    <strong>Both sides of the ledger.</strong> Every incentive article covers when
                    the incentive does <em>not</em> make sense, what examiners challenge, and what
                    the honest uncertainty is.
                  </li>
                  <li>
                    <strong>Dated and maintained.</strong> Tax law moves. Every article carries its
                    publication and revision dates, and material legal changes trigger updates,
                    not silent edits.
                  </li>
                </ul>
                <h2>What this site is not</h2>
                <p>
                  Nothing here is tax, legal, or accounting advice, and reading it creates no
                  professional relationship. The articles describe rules of general application;
                  whether and how they apply to a particular taxpayer depends on facts we
                  don&rsquo;t have. Bring the questions this site raises to a qualified
                  professional who has yours.
                </p>
                <h2>Why &ldquo;The Carryforward&rdquo;?</h2>
                <p>
                  A carryforward is the part of a tax benefit you can&rsquo;t use yet but
                  don&rsquo;t lose — value that persists because the rules say it does. It seemed
                  like the right name for a site betting that careful explanation holds its value,
                  too.
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
