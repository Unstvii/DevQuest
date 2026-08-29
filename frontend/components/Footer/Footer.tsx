import { MessageCircle, Send, Trophy, Zap, ScrollText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
      <div className="absolute top-0 left-1/2 h-px w-48 sm:w-72 lg:w-96 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-brand)] to-transparent" />

      <div className="absolute top-0 left-1/2 h-56 w-56 sm:h-64 sm:w-64 lg:h-72 lg:w-72 -translate-x-1/2 rounded-full bg-[var(--color-brand)] opacity-10 blur-[100px] lg:blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-6 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-accent-pink)] font-bold text-white shadow-lg">
                DQ
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
                  DEVQUEST
                </h3>

                <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">
                  Learn. Build. Level Up.
                </p>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-[var(--color-text-muted)]">
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
                  className="text-[var(--color-text-muted)] transition hover:text-[var(--color-brand)]"
                >
                  Quests
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[var(--color-text-muted)] transition hover:text-[var(--color-brand)]"
                >
                  Challenges
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[var(--color-text-muted)] transition hover:text-[var(--color-brand)]"
                >
                  Ranking
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[var(--color-text-muted)] transition hover:text-[var(--color-brand)]"
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
                  className="text-[var(--color-text-muted)] transition hover:text-[var(--color-brand)]"
                >
                  Documentation
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[var(--color-text-muted)] transition hover:text-[var(--color-brand)]"
                >
                  FAQ
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[var(--color-text-muted)] transition hover:text-[var(--color-brand)]"
                >
                  Roadmap
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[var(--color-text-muted)] transition hover:text-[var(--color-brand)]"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="mb-4 font-semibold text-[var(--color-text-primary)]">
              Community
            </h4>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a
                href="#"
                className="
              inline-flex items-center justify-center
              rounded-xl
              border border-[var(--color-border)]
              bg-[var(--color-surface)]
              px-3 py-2.5 sm:p-3
              text-sm text-[var(--color-text-muted)]
              transition
              hover:border-[var(--color-brand)]
              hover:text-[var(--color-brand)]
            "
              >
                Github
              </a>

              <a
                href="#"
                className="
              inline-flex items-center justify-center
              rounded-xl
              border border-[var(--color-border)]
              bg-[var(--color-surface)]
              p-2.5 sm:p-3
              text-[var(--color-text-muted)]
              transition
              hover:border-[var(--color-brand)]
              hover:text-[var(--color-brand)]
            "
              >
                <MessageCircle size={18} />
              </a>

              <a
                href="#"
                className="
              inline-flex items-center justify-center
              rounded-xl
              border border-[var(--color-border)]
              bg-[var(--color-surface)]
              p-2.5 sm:p-3
              text-[var(--color-text-muted)]
              transition
              hover:border-[var(--color-brand)]
              hover:text-[var(--color-brand)]
            "
              >
                <Send size={18} />
              </a>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <Trophy
                  size={16}
                  className="shrink-0 text-[var(--color-warning)]"
                />
                <span>Competitive Leaderboards</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <Zap size={16} className="shrink-0 text-[var(--color-brand)]" />
                <span>XP Progression System</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <ScrollText
                  size={16}
                  className="shrink-0 text-[var(--color-success)]"
                />
                <span>Developer Quests</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="
      mt-10 sm:mt-12
      flex flex-col
      items-center
      gap-5
      border-t border-[var(--color-border)]
      pt-6 sm:pt-8
      text-sm
      lg:flex-row lg:justify-between
    "
        >
          <p className="text-center lg:text-left text-[var(--color-text-muted)]">
            © 2026 DevQuest. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:gap-6">
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
