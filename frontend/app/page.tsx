import HowItIsWorks from "@/components/HowItIsWorks/HowItIsWorks";
import Intro from "../components/Intro/Intro";
import Link from "next/link";

const Home = () => {
  return (
    <div
      className="min-h-screen w-full pt-16 pb-4"
      style={{
        background: "var(--color-bg-base)",
      }}
    >
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-8 py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-[0.15em] text-violet-400">
            // Геймифікована платформа для розробників
          </span>

          <h1
            className="mb-6 text-5xl font-bold leading-tight tracking-tight xl:text-6xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            Прокачуй код,
            <br />
            як{" "}
            <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              персонажа.
            </span>
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-8 text-slate-400">
            DevQuest — це не готовий список завдань. Ти сам формулюєш квест, сам
            призначаєш йому ціну в XP і сам вирішуєш, яка ачівка чекає в кінці.
            Платформа лише рахує очки й показує рейтинг.
          </p>

          <div
            className="mb-10 flex flex-wrap gap-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            <Link
              href="#"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 px-7 py-3 font-semibold transition hover:-translate-y-1"
            >
              Створити свій квест →
            </Link>

            <Link
              href="#"
              className="rounded-xl border border-slate-700 px-7 py-3 font-semibold transition hover:border-slate-500"
            >
              Подивитись рейтинг
            </Link>
          </div>

          <div className="max-w-xl rounded-xl border border-slate-800 bg-[#0d0f20] p-5 font-mono text-sm shadow-2xl">
            <div className="mb-4 flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            </div>

            <p className="mb-2 text-slate-400">
              <span className="text-violet-400">$</span> devquest quest create
              "Переписати auth на JWT"
            </p>

            <p className="mb-2 text-slate-400">
              → нагорода: <span className="text-yellow-400">250 XP</span>{" "}
              (вказано тобою)
            </p>

            <p className="mb-2 text-emerald-400">
              ✓ Квест збережено · ачівка: "Розкрив таємницю токенів"
            </p>

            <p className="text-yellow-400">
              ★ Level Up! Lv.12 → Lv.13
              <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-violet-400" />
            </p>
          </div>
        </div>
        <div>
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-[#171b35] to-[#11152b] p-8">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-600/20 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-8 flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[conic-gradient(#8b5cf6_72%,#232850_0)] p-[7px]"></div>

                <div>
                  <h3 className="font-semibold text-lg">Олекса Мельник</h3>

                  <p className="text-sm text-slate-400">Backend Wanderer</p>
                </div>

                <div className="ml-auto rounded-lg bg-gradient-to-r from-violet-600 to-pink-600 px-3 py-2 font-mono text-sm font-bold">
                  LV.24
                </div>
              </div>

              <div className="mb-2 flex justify-between font-mono text-xs text-slate-400">
                <span>Досвід</span>

                <span className="font-semibold text-white">
                  7 420 / 10 000 XP
                </span>
              </div>

              <div className="mb-8 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-violet-600 to-pink-600" />
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm">
                  🏆 Топ 5% тижня
                </div>

                <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm">
                  ⚡ 14-денний стрік
                </div>

                <div className="rounded-lg border border-pink-500 border-dashed bg-pink-500/10 px-4 py-2 text-sm text-pink-200">
                  🐉 Переміг Legacy Code
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HowItIsWorks />
      <Intro />
    </div>
  );
};
export default Home;
