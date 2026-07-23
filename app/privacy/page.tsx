import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The Carryforward handles information: no accounts, no ad tracking, no sale of data. Anonymous, cookieless analytics and reading progress stored only in your browser.",
  alternates: { canonical: "/privacy" },
};

const EFFECTIVE = "July 23, 2026";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="mx-auto max-w-[1120px] px-5 pt-11 sm:px-10">
          <div className="sheet px-7 py-9 sm:px-14 sm:py-11">
            <div className="mx-auto max-w-[680px]">
              <p className="kicker mb-3.5 text-xs text-accent">Legal</p>
              <h1 className="font-serif text-[34px] font-semibold leading-[1.05] sm:text-[44px]">
                Privacy Policy
              </h1>
              <p className="mt-4 font-serif text-xl italic leading-normal text-ink-soft">
                The short version: we run a publication, not a data business. No accounts, no ad
                tracking, no sale or sharing of personal information.
              </p>
              <div className="kicker mt-5 border-y border-ink py-2.5 font-medium text-[11px] text-ink-mute">
                Effective {EFFECTIVE} · Applies to thecarryforward.com
              </div>
              <div className="prose mt-8">
                <p>
                  This policy describes what information {SITE_NAME} (&ldquo;we,&rdquo;
                  &ldquo;us&rdquo;) collects when you visit thecarryforward.com (the
                  &ldquo;Site&rdquo;), how it is used, and the choices you have. We designed the
                  Site to need as little information about you as possible: there are no user
                  accounts, no newsletters, no comment systems, no advertising networks, and no
                  forms that ask for personal information.
                </p>

                <h2>What we collect</h2>
                <h3>Information you provide</h3>
                <p>
                  None. The Site has no login, registration, subscription, or contact forms. We do
                  not ask for, and do not want, your name, email address, or any other personal
                  details.
                </p>
                <h3>Analytics</h3>
                <p>
                  We use Vercel Web Analytics to understand, in aggregate, which pages are read.
                  It is a cookieless, privacy-focused service: it does not use cookies or other
                  persistent browser identifiers, does not track you across other websites, and
                  identifies visits only through a temporary hash that cannot be linked back to
                  you. We see counts — page views, referrers, country-level location, and
                  device/browser categories — not individuals. Vercel&rsquo;s practices are
                  described in its own privacy documentation at{" "}
                  <a href="https://vercel.com/docs/analytics/privacy-policy">
                    vercel.com/docs/analytics/privacy-policy
                  </a>
                  .
                </p>
                <h3>Server logs</h3>
                <p>
                  Our hosting provider (Vercel Inc.) processes standard technical data needed to
                  deliver the Site — IP address, request URL, user-agent — as any web server
                  does. These logs are used for security and operations, are retained briefly, and
                  are not used by us to identify visitors.
                </p>
                <h3>Reading progress (stored only on your device)</h3>
                <p>
                  If you use our <Link href="/courses">courses</Link>, the list of lessons
                  you&rsquo;ve opened is saved in your browser&rsquo;s{" "}
                  <code>localStorage</code> under a key named <code>cf-read</code>. This
                  information never leaves your device, is never transmitted to us, and is deleted
                  whenever you clear your browser&rsquo;s site data. It exists solely so progress
                  bars work without accounts.
                </p>

                <h2>What we do not do</h2>
                <ul>
                  <li>We do not sell, rent, license, or share personal information with anyone.</li>
                  <li>We do not use advertising, ad networks, or cross-site tracking of any kind.</li>
                  <li>We do not set tracking cookies. The Site works fully with cookies disabled.</li>
                  <li>We do not profile visitors or make automated decisions about them.</li>
                  <li>
                    We do not knowingly collect information from children; the Site is a
                    professional tax publication with no features directed at children.
                  </li>
                </ul>

                <h2>Third parties</h2>
                <p>
                  The Site is hosted by Vercel Inc. (San Francisco, CA), which acts as our service
                  provider for hosting and the aggregate analytics described above. Fonts are
                  self-hosted and served from our own domain — no requests are made to font
                  networks. Articles link to external sites (IRS.gov, eCFR.gov, congress.gov, and
                  similar); once you follow a link, the destination&rsquo;s own privacy practices
                  apply.
                </p>

                <h2>Legal bases and international visitors</h2>
                <p>
                  For visitors in jurisdictions with data-protection laws (such as the EU/UK GDPR
                  or U.S. state privacy acts): the limited technical processing described above is
                  performed on the basis of our legitimate interest in operating, securing, and
                  understanding readership of a free publication. We do not process special
                  categories of data, and because we hold no personal information about you, there
                  is generally nothing for us to access, correct, delete, or port in response to a
                  rights request — though you are welcome to ask. California residents: we do not
                  &ldquo;sell&rdquo; or &ldquo;share&rdquo; personal information as those terms
                  are defined in the CCPA/CPRA, and we honor that position without requiring an
                  opt-out.
                </p>

                <h2>Data security and retention</h2>
                <p>
                  The Site is served entirely over HTTPS as static content — there is no database
                  of user information to breach. Aggregate analytics are retained per
                  Vercel&rsquo;s standard retention schedule; we retain no visitor-level data
                  ourselves.
                </p>

                <h2>Changes to this policy</h2>
                <p>
                  If our practices change — for example, if we ever add a newsletter — we will
                  update this page, change the effective date above, and describe the change
                  plainly rather than burying it. Material changes will be noted on the front
                  page.
                </p>

                <h2>Contact</h2>
                <p>
                  Questions about this policy can be raised via the repository or channels listed
                  on our <Link href="/about">About page</Link>. Because we hold no personal data,
                  most privacy requests will be satisfied by this document itself — but we will
                  answer.
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
