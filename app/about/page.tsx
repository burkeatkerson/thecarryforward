import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About & Editorial Standards",
  description:
    "The Carryforward is an independent educational publication on specialty tax topics. We don't sell tax studies, accept sponsorships, or generate leads — here's how we work.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="narrow">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
            ]}
          />
          <header className="article-head">
            <span className="kicker">The publication</span>
            <h1>About The Carryforward</h1>
            <p className="dek">
              An independent reference for the corners of the tax code where good explanations are
              scarce and sales pitches are not.
            </p>
          </header>
          <div className="prose">
            <p>
              Specialty tax — the R&amp;D credit, cost segregation, Section 174, energy
              incentives — is dominated by content written to sell studies. The explanations are
              often accurate as far as they go, but they stop wherever the pitch begins. The
              Carryforward exists to be the other thing: a place where the rules are explained
              because understanding them is the point.
            </p>
            <h2>Editorial standards</h2>
            <ul>
              <li>
                <strong>No sales.</strong> We do not perform tax studies, prepare returns, or refer
                readers to firms that do. No provider pays for placement, and nothing on the site
                is sponsored.
              </li>
              <li>
                <strong>Primary sources first.</strong> Positions are grounded in the Internal
                Revenue Code, Treasury regulations, IRS guidance, and case law, cited inline where
                it matters.
              </li>
              <li>
                <strong>Both sides of the ledger.</strong> Every incentive article covers when the
                incentive does <em>not</em> make sense, what examiners challenge, and what the
                honest uncertainty is.
              </li>
              <li>
                <strong>Dated and maintained.</strong> Tax law moves. Every article carries its
                publication and revision dates, and material legal changes trigger updates, not
                silent edits.
              </li>
            </ul>
            <h2>What this site is not</h2>
            <p>
              Nothing here is tax, legal, or accounting advice, and reading it creates no
              professional relationship. The articles describe rules of general application;
              whether and how they apply to a particular taxpayer depends on facts we don't have.
              Bring the questions this site raises to a qualified professional who has yours.
            </p>
            <h2>Why “The Carryforward”?</h2>
            <p>
              A carryforward is the part of a tax benefit you can't use yet but don't lose — value
              that persists because the rules say it does. It seemed like the right name for a
              site betting that careful explanation holds its value, too.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
