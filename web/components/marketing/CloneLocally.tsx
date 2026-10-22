"use client";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { GITHUB_REPO_URL } from "@/lib/github";

export function CloneLocally() {
  return (
    <section id="run-locally" className="px-6 py-24 max-w-6xl mx-auto">
      <SectionReveal>
        <RevealItem>
          <h2 className="text-3xl font-bold mb-2">Clone &amp; run locally</h2>
          <p className="text-muted mb-8 max-w-2xl leading-relaxed">
            This hosted site is presentation-only — benchmarks and the lab UI use reference data.
            To execute real CPU/CUDA runs, clone the repo and enable the live lab on your machine.
          </p>
        </RevealItem>
        <RevealItem>
          <GlassCard>
            <pre className="text-xs md:text-sm font-mono text-muted overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`git clone -b web ${GITHUB_REPO_URL}.git
cd HarmonicSeries
make CUDA=1
cd web && cp .env.example .env.local
# set NEXT_PUBLIC_LAB_ENABLED=true in .env.local
cd api && python -m venv .venv && .venv/bin/pip install -r requirements.txt
HARMONIC_BIN=../../harmonic_series .venv/bin/uvicorn main:app --port 8001
# another terminal:
cd web && npm install && npm run dev`}
            </pre>
            <p className="mt-4 text-sm text-muted">
              Full details:{" "}
              <a
                href={`${GITHUB_REPO_URL}/blob/web/web/README.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                web/README.md on the <code className="text-accent/90">web</code> branch
              </a>
              .
            </p>
          </GlassCard>
        </RevealItem>
      </SectionReveal>
    </section>
  );
}
