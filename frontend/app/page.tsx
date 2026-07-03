const Home = () => {
  return (
    <div
      className="h-screen w-100% pt-16 pb-4"
      style={{
        background: "var(--color-bg-base)",
      }}
    >
      <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-column w-100">
          <h3
            className="text-xs font-semibold uppercase tracking-wider font-mono mb-[14]"
            style={{ color: "var(--color-text-accent)" }}
          >
            // Гейміфікована платформа для розробників
          </h3>
          <h1
            className="text-5xl font-bold font-[Arial] mb-[22]"
            style={{ color: "var(--color-text-primary)" }}
          >
            Прокачуй код, як{" "}
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              персонажа.
            </span>
          </h1>
          <p
            className="mb-8 text-[17px] font-normal tracking-wide w-130"
            style={{ color: "var(--colot-text-secondary)" }}
          >
            DevQuest - це не готовий список завдань. Ти сам формулюєш квест, сам
            призначаєш йому ціну в XP і сам вирішуєш, яка ачівка чекає в кінці.
            Платформа лише рахує очки й показує рейтинг
          </p>
          <div
            className="flex w-200 mb-[38] gap-4 font-semibold text-sm font-[Inter] tracking-wider"
            style={{ color: "var(--color-text-primary)" }}
          >
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500">
              Створити свій квест &rarr;
            </button>
            <button
              className="px-8 py-4 rounded-xl rounded-xl border border-solid"
              style={{ border: "1px solid #242a4a" }}
            >
              Подивитись рейтинг
            </button>
          </div>
        </div>
        <div className="" style={{ background: "white" }}>
          2
        </div>
      </div>
    </div>
  );
};
export default Home;
