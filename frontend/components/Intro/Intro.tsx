import Image from "next/image";
import amigos from "../../public/Amigos Lightbulb.svg";
import yuppi from "../../public/Yuppies Bust.svg";
import shiny from "../../public/Shiny Happy Stats and Graphs.svg";

const Intro = () => {
  return (
    <section
      id="rules"
      className="relative z-10 mx-auto max-w-[1240px] px-8 py-24"
    >
      <div className="mb-12 max-w-[680px]">
        <span className="mb-3.5 block font-mono text-[12.5px] font-semibold uppercase tracking-[1.5px] text-purple-500">
          Конструктор, а не каталог
        </span>
        <h2 className="mb-3.5 text-[34px] font-bold leading-tight text-slate-50">
          Гра за твоїми правилами
        </h2>
        <p className="text-base text-slate-400">
          Три речі, які роблять DevQuest твоїм, а не чужим продуктом з готовими
          завданнями.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
        <div className="overflow-hidden rounded-2xl border border-[#242a4a] bg-[#12152a] transition-transform duration-300 hover:-translate-y-1.5">
          <div className="flex h-[220px] items-end justify-center overflow-hidden bg-[#ece1f9] pt-2.5">
            <Image
              src={yuppi}
              alt="Персонаж з лупою шукає квест"
              width={220}
              height={220}
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="p-6 pb-[26px]">
            <h3 className="mb-2 text-[17px] font-semibold text-slate-50">
              Створюєш квест сам
            </h3>
            <p className="text-[13.5px] leading-relaxed text-slate-400">
              Назва, опис, дедлайн — твої. Жодного банку готових завдань, який
              вирішує за тебе, що варто вивчати.
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[#242a4a] bg-[#12152a] transition-transform duration-300 hover:-translate-y-1.5">
          <div className="flex h-[220px] items-end justify-center overflow-hidden bg-[#fbe3ee] pt-2.5">
            <Image
              src={amigos}
              alt="Лампочка як символ власної ідеї"
              width={220}
              height={220}
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="p-6 pb-[26px]">
            <h3 className="mb-2 text-[17px] font-semibold text-slate-50">
              Призначаєш XP і дизайниш ачівку
            </h3>
            <p className="text-[13.5px] leading-relaxed text-slate-400">
              Сам вирішуєш, скільки коштує задача в очках, і придумуєш ачівку
              під неї — назву, іконку, опис подвигу.
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[#242a4a] bg-[#12152a] transition-transform duration-300 hover:-translate-y-1.5">
          <div className="flex h-[220px] items-end justify-center overflow-hidden bg-[#e1e4fb] pt-2.5">
            <Image
              src={shiny}
              alt="Розробник стежить за зростанням прогресу"
              width={220}
              height={220}
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="p-6 pb-[26px]">
            <h3 className="mb-2 text-[17px] font-semibold text-slate-50">
              + вбудовані ачівки
            </h3>
            <p className="text-[13.5px] leading-relaxed text-slate-400">
              Паралельно платформа сама видає стандартні нагороди: стріки, перші
              квести, місця в рейтингу — без жодних налаштувань.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
