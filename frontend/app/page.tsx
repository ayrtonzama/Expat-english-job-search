import Image from "next/image";
import "./home-page.scss";
import { LogoBrand } from "@/src/components/Logo";

export default function Home() {
  return (
    <div className="flex flex-col center">
      <PrimaryContent></PrimaryContent>
      <HowItWorks />
      <SiteFooter />
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      label: "Step 01",
      title: "Filter for the truth",
      body: "English-only, visa-friendly, salary band — set the filters once and stop reading job ads that weren't written for you.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z" />
        </svg>
      ),
    },
    {
      label: "Step 02",
      title: "Apply with one profile",
      body: "Build your profile once, then send tailored applications in two clicks. Track every status from screen to offer.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2 11 13" />
          <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
        </svg>
      ),
    },
    {
      label: "Step 03",
      title: "Land softly",
      body: "Connect with HR who've done this before. Most platform employers offer relocation packages and immigration partners.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="home-steps">
      <div className="home-steps__intro">
        <div>
          <p className="home-steps__eyebrow">How it works</p>
          <h2 className="home-steps__title">
            Less <span className="home-steps__title-accent">guessing,</span>
            <br />
            more packing.
          </h2>
        </div>
        <p className="home-steps__lede">
          Every listing tells you up-front whether the company sponsors visas, what they cover for relocation, and whether you can do the job in English. No buried requirements.
        </p>
      </div>

      <div className="home-steps__grid">
        {steps.map((s) => (
          <article key={s.label} className="card home-steps__card">
            <header className="home-steps__card-head">
              <span className="home-steps__step">{s.label}</span>
              <span className="home-steps__icon" aria-hidden>{s.icon}</span>
            </header>
            <h3 className="home-steps__card-title">{s.title}</h3>
            <p className="home-steps__card-body">{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}


function PrimaryContent() {
  return (
    <>
      <div className="flex p-10 ">
        <div className="w-1/2 home-hero">
          <span className="home-hero__chip"> · Updated daily</span>
          <h1 className="home-hero__title">
            Build a career
            <span className="home-hero__title-accent">somewhere new.</span>
          </h1>
          <p className="home-hero__lede">
            English-only roles at companies that sponsor visas, fund relocation, and actually want you to move. No &ldquo;fluent local language required&rdquo; surprises.
          </p>
        </div>
        <div className="w-1/2 flex flex-wrap">
          <ReviewItem context="Got the offer Tuesday,signed the lease in Berlin Friday!" author="Danny (seeker)"></ReviewItem>
          <ReviewItem context="Worked well can't wait! for more prospects" author="Michael (seeking)"></ReviewItem>
        </div>
      </div>
    </>
  )
}

function SiteFooter() {
  const columns = [
    {
      heading: "Find work",
      links: ["Browse jobs", "Companies hiring", "Visa guide", "Salary explorer"],
    },
    {
      heading: "Employers",
      links: ["Post a job", "Pricing", "Hiring tools", "Sponsor a region"],
    },
    {
      heading: "Company",
      links: ["About", "Field notes", "Press", "Contact"],
    },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <LogoBrand></LogoBrand>
        <p className="site-footer__blurb">
          The job board for English speakers who want to work somewhere new. Independent, community-funded.
        </p>
      </div>

      {columns.map((col) => {
        const id = `footer-${col.heading.toLowerCase().replace(/\s+/g, "-")}`;
        return (
          <nav key={col.heading} className="site-footer__col" aria-labelledby={id}>
            <p id={id} className="site-footer__col-heading">{col.heading}</p>
            <ul className="site-footer__list">
              {col.links.map((label) => (
                <li key={label}><a href="#" className="site-footer__link">{label}</a></li>
              ))}
            </ul>
          </nav>
        );
      })}
    </footer>
  );
}

function ReviewItem(props: { context: string, author: string }) {
  return <>
    <div className="bg-gray-900 p-4 max-w-2xs rounded-2xl m-2 ">
      <p className="text-white">
        "{props.context}"
      </p>
      <p className="text-white"> ~ {props.author}</p>
    </div>
  </>
}