import { ScrollText, Trophy, Zap } from "lucide-react";

const HowItIsWorks = () => {
  return (
    <section
      id="intro"
      className="relative z-10 mx-auto max-w-[1240px] px-8 py-24"
    >
      <div className="mb-12 max-w-[680px]">
        <span className="mb-3.5 block font-mono text-[12.5px] font-semibold uppercase tracking-[1.5px] text-purple-500">
          Як це працює
        </span>

        <h2 className="mb-3.5 text-[34px] font-bold leading-tight text-slate-50">
          Ти автор. Платформа — рахівник.
        </h2>

        <p className="text-base leading-relaxed text-slate-400">
          Жодних нав'язаних завдань. Ти описуєш ціль своїми словами, призначаєш
          XP і вирішуєш, що буде нагородою. DevQuest бере на себе облік, прогрес
          і змагання.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
        <div className="rounded-2xl border border-[#242a4a] bg-[#12152a] p-[26px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#3a3f66]">
          <div className="mb-[18px] flex items-start justify-between">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[11px] bg-purple-500/10">
              <ScrollText
                size={20}
                className="text-[#a855f7]"
                strokeWidth={2.2}
              />
            </div>

            <span className="rounded-md bg-emerald-400/10 px-[9px] py-1 font-mono text-[11px] font-semibold text-emerald-400">
              Створюєш сам
            </span>
          </div>

          <h3 className="mb-2 text-[18px] font-semibold text-slate-50">
            Квести
          </h3>

          <p className="text-[14px] leading-relaxed text-slate-400">
            Від рефакторингу легасі-коду до вивчення нового фреймворку —
            формулюєш ціль і сам вирішуєш, скільки вона коштує в XP.
          </p>
        </div>

        <div className="rounded-2xl border border-[#242a4a] bg-[#12152a] p-[26px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#3a3f66]">
          <div className="mb-[18px] flex items-start justify-between">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[11px] bg-orange-500/10">
              <Zap size={20} className="text-[#f97316]" strokeWidth={2.2} />
            </div>

            <span className="rounded-md bg-pink-500/10 px-[9px] py-1 font-mono text-[11px] font-semibold text-pink-500">
              Складна
            </span>
          </div>

          <h3 className="mb-2 text-[18px] font-semibold text-slate-50">
            Виклики
          </h3>

          <p className="text-[14px] leading-relaxed text-slate-400">
            Задачі на швидкість і кмітливість з таймером та обмеженням пам'яті —
            перевір, чи витримаєш темп бойових умов.
          </p>
        </div>

        <div className="rounded-2xl border border-[#242a4a] bg-[#12152a] p-[26px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#3a3f66]">
          <div className="mb-[18px] flex items-start justify-between">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[11px] bg-yellow-500/10">
              <Trophy size={20} className="text-[#fbbf24]" strokeWidth={2.2} />
            </div>

            <span className="rounded-md bg-yellow-500/10 px-[9px] py-1 font-mono text-[11px] font-semibold text-[#fbbf24]">
              Постійна
            </span>
          </div>

          <h3 className="mb-2 text-[18px] font-semibold text-slate-50">
            Рейтинг
          </h3>

          <p className="text-[14px] leading-relaxed text-slate-400">
            Живий лідерборд оновлюється щодня. Змагайся з друзями або з всією
            спільнотою за місце на п'єдесталі.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItIsWorks;
