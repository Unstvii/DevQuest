import { MessageCircle, Send, Trophy, Zap, ScrollText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
      <div className="absolute top-0 left-1/2 h-px w-96 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-brand)] to-transparent" />

      <div className="absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--color-brand)] opacity-10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-accent-pink)] font-bold text-white shadow-lg">
                DQ
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                  DEVQUEST
                </h3>

                <p className="text-sm text-[var(--color-text-muted)]">
                  Learn. Build. Level Up.
                </p>
              </div>
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-[var(--color-text-muted)]">
              Gamified platform for developers. Complete quests, solve
              challenges, earn XP and climb the leaderboard.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-[var(--color-text-primary)]">
              Platform
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="transition hover:text-[var(--color-brand)] text-[var(--color-text-muted)]"
                >
                  Quests
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-[var(--color-brand)] text-[var(--color-text-muted)]"
                >
                  Challenges
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-[var(--color-brand)] text-[var(--color-text-muted)]"
                >
                  Ranking
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-[var(--color-brand)] text-[var(--color-text-muted)]"
                >
                  Profile
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-[var(--color-text-primary)]">
              Resources
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="transition hover:text-[var(--color-brand)] text-[var(--color-text-muted)]"
                >
                  Documentation
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-[var(--color-brand)] text-[var(--color-text-muted)]"
                >
                  FAQ
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-[var(--color-brand)] text-[var(--color-text-muted)]"
                >
                  Roadmap
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-[var(--color-brand)] text-[var(--color-text-muted)]"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-[var(--color-text-primary)]">
              Community
            </h4>

            <div className="flex gap-3">
              <a
                href="#"
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-[var(--color-text-muted)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
              >
                Github
              </a>

              <a
                href="#"
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-[var(--color-text-muted)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
              >
                <MessageCircle size={18} />
              </a>

              <a
                href="#"
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-[var(--color-text-muted)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
              >
                <Send size={18} />
              </a>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <Trophy size={16} className="text-[var(--color-warning)]" />
                Competitive Leaderboards
              </div>

              <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <Zap size={16} className="text-[var(--color-brand)]" />
                XP Progression System
              </div>

              <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <ScrollText size={16} className="text-[var(--color-success)]" />
                Developer Quests
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-8 text-sm md:flex-row">
          <p className="text-[var(--color-text-muted)]">
            © 2026 DevQuest. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-[var(--color-text-muted)] transition hover:text-[var(--color-brand)]"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-[var(--color-text-muted)] transition hover:text-[var(--color-brand)]"
            >
              Terms
            </a>

            <a
              href="#"
              className="text-[var(--color-text-muted)] transition hover:text-[var(--color-brand)]"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
