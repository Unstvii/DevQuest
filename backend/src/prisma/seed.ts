import {
  PrismaClient,
  AchievementCategory,
  ConditionType,
} from "@prisma/client";

const prisma = new PrismaClient();

const achievements = [
  // =========================
  // QUESTS
  // =========================

  {
    key: "FIRST_QUEST",
    name: "Перший крок",
    description: "Виконай свій перший квест",
    emoji: "🎯",
    category: AchievementCategory.QUESTS,
    conditionType: ConditionType.QUESTS_COMPLETED,
    conditionValue: 1,
    isSecret: false,
  },
  {
    key: "QUESTS_5",
    name: "Входиш у ритм",
    description: "Виконай 5 квестів",
    emoji: "🔥",
    category: AchievementCategory.QUESTS,
    conditionType: ConditionType.QUESTS_COMPLETED,
    conditionValue: 5,
    isSecret: false,
  },
  {
    key: "QUESTS_10",
    name: "Десятка",
    description: "Виконай 10 квестів",
    emoji: "🔟",
    category: AchievementCategory.QUESTS,
    conditionType: ConditionType.QUESTS_COMPLETED,
    conditionValue: 10,
    isSecret: false,
  },
  {
    key: "QUESTS_25",
    name: "Квестовий воїн",
    description: "Виконай 25 квестів",
    emoji: "⚔️",
    category: AchievementCategory.QUESTS,
    conditionType: ConditionType.QUESTS_COMPLETED,
    conditionValue: 25,
    isSecret: false,
  },
  {
    key: "QUESTS_50",
    name: "Машина квестів",
    description: "Виконай 50 квестів",
    emoji: "🤖",
    category: AchievementCategory.QUESTS,
    conditionType: ConditionType.QUESTS_COMPLETED,
    conditionValue: 50,
    isSecret: false,
  },
  {
    key: "QUESTS_100",
    name: "Легенда квестів",
    description: "Виконай 100 квестів",
    emoji: "👑",
    category: AchievementCategory.QUESTS,
    conditionType: ConditionType.QUESTS_COMPLETED,
    conditionValue: 100,
    isSecret: false,
  },

  // =========================
  // TOTAL QUESTS
  // =========================

  {
    key: "TOTAL_QUESTS_10",
    name: "Початок шляху",
    description: "Заверши загалом 10 квестів",
    emoji: "🛤️",
    category: AchievementCategory.QUESTS,
    conditionType: ConditionType.TOTAL_QUESTS_COMPLETED,
    conditionValue: 10,
    isSecret: false,
  },
  {
    key: "TOTAL_QUESTS_50",
    name: "Досвідчений шукач",
    description: "Заверши загалом 50 квестів",
    emoji: "🧭",
    category: AchievementCategory.QUESTS,
    conditionType: ConditionType.TOTAL_QUESTS_COMPLETED,
    conditionValue: 50,
    isSecret: false,
  },
  {
    key: "TOTAL_QUESTS_100",
    name: "Майстер пригод",
    description: "Заверши загалом 100 квестів",
    emoji: "🏅",
    category: AchievementCategory.QUESTS,
    conditionType: ConditionType.TOTAL_QUESTS_COMPLETED,
    conditionValue: 100,
    isSecret: false,
  },

  // =========================
  // BOSS
  // =========================

  {
    key: "FIRST_BOSS",
    name: "Перша перемога",
    description: "Переможи свого першого боса",
    emoji: "⚔️",
    category: AchievementCategory.BOSS,
    conditionType: ConditionType.BOSS_QUESTS_COMPLETED,
    conditionValue: 1,
    isSecret: false,
  },
  {
    key: "BOSS_5",
    name: "Мисливець на босів",
    description: "Переможи 5 босів",
    emoji: "🗡️",
    category: AchievementCategory.BOSS,
    conditionType: ConditionType.BOSS_QUESTS_COMPLETED,
    conditionValue: 5,
    isSecret: false,
  },
  {
    key: "BOSS_10",
    name: "Вбивця босів",
    description: "Переможи 10 босів",
    emoji: "💀",
    category: AchievementCategory.BOSS,
    conditionType: ConditionType.BOSS_QUESTS_COMPLETED,
    conditionValue: 10,
    isSecret: false,
  },
  {
    key: "BOSS_25",
    name: "Кат босів",
    description: "Переможи 25 босів",
    emoji: "👹",
    category: AchievementCategory.BOSS,
    conditionType: ConditionType.BOSS_QUESTS_COMPLETED,
    conditionValue: 25,
    isSecret: false,
  },

  // =========================
  // LEVEL
  // =========================

  {
    key: "LEVEL_5",
    name: "Новачок",
    description: "Досягни 5 рівня",
    emoji: "🌱",
    category: AchievementCategory.LEVEL,
    conditionType: ConditionType.LEVEL_REACHED,
    conditionValue: 5,
    isSecret: false,
  },
  {
    key: "LEVEL_10",
    name: "Досвідчений",
    description: "Досягни 10 рівня",
    emoji: "⭐",
    category: AchievementCategory.LEVEL,
    conditionType: ConditionType.LEVEL_REACHED,
    conditionValue: 10,
    isSecret: false,
  },
  {
    key: "LEVEL_25",
    name: "Еліта",
    description: "Досягни 25 рівня",
    emoji: "💎",
    category: AchievementCategory.LEVEL,
    conditionType: ConditionType.LEVEL_REACHED,
    conditionValue: 25,
    isSecret: false,
  },
  {
    key: "LEVEL_50",
    name: "Майстер",
    description: "Досягни 50 рівня",
    emoji: "🏆",
    category: AchievementCategory.LEVEL,
    conditionType: ConditionType.LEVEL_REACHED,
    conditionValue: 50,
    isSecret: false,
  },
  {
    key: "LEVEL_100",
    name: "Легенда",
    description: "Досягни 100 рівня",
    emoji: "👑",
    category: AchievementCategory.LEVEL,
    conditionType: ConditionType.LEVEL_REACHED,
    conditionValue: 100,
    isSecret: false,
  },

  // =========================
  // XP
  // =========================

  {
    key: "XP_100",
    name: "Перші XP",
    description: "Зароби 100 XP",
    emoji: "✨",
    category: AchievementCategory.XP,
    conditionType: ConditionType.XP_EARNED,
    conditionValue: 100,
    isSecret: false,
  },
  {
    key: "XP_500",
    name: "XP набирається",
    description: "Зароби 500 XP",
    emoji: "⚡",
    category: AchievementCategory.XP,
    conditionType: ConditionType.XP_EARNED,
    conditionValue: 500,
    isSecret: false,
  },
  {
    key: "XP_1000",
    name: "Тисячник",
    description: "Зароби 1000 XP",
    emoji: "💰",
    category: AchievementCategory.XP,
    conditionType: ConditionType.XP_EARNED,
    conditionValue: 1000,
    isSecret: false,
  },
  {
    key: "XP_5000",
    name: "XP-машина",
    description: "Зароби 5000 XP",
    emoji: "🚀",
    category: AchievementCategory.XP,
    conditionType: ConditionType.XP_EARNED,
    conditionValue: 5000,
    isSecret: false,
  },
  {
    key: "XP_10000",
    name: "Легендарний досвід",
    description: "Зароби 10000 XP",
    emoji: "🌟",
    category: AchievementCategory.XP,
    conditionType: ConditionType.XP_EARNED,
    conditionValue: 10000,
    isSecret: false,
  },

  // =========================
  // STREAK
  // =========================

  {
    key: "STREAK_3",
    name: "Три дні поспіль",
    description: "Займайся 3 дні поспіль",
    emoji: "🔥",
    category: AchievementCategory.STREAK,
    conditionType: ConditionType.DAYS_STREAK,
    conditionValue: 3,
    isSecret: false,
  },
  {
    key: "STREAK_7",
    name: "Тиждень сили",
    description: "Тримай streak 7 днів",
    emoji: "🔥",
    category: AchievementCategory.STREAK,
    conditionType: ConditionType.DAYS_STREAK,
    conditionValue: 7,
    isSecret: false,
  },
  {
    key: "STREAK_14",
    name: "Два тижні",
    description: "Тримай streak 14 днів",
    emoji: "🔥",
    category: AchievementCategory.STREAK,
    conditionType: ConditionType.DAYS_STREAK,
    conditionValue: 14,
    isSecret: false,
  },
  {
    key: "STREAK_30",
    name: "Незламний",
    description: "Тримай streak 30 днів",
    emoji: "🔥",
    category: AchievementCategory.STREAK,
    conditionType: ConditionType.DAYS_STREAK,
    conditionValue: 30,
    isSecret: false,
  },

  // =========================
  // SECRET / GENERAL
  // =========================

  {
    key: "LEVEL_10_SECRET",
    name: "??",
    description: "Досягнення відкриється саме",
    emoji: "❓",
    category: AchievementCategory.GENERAL,
    conditionType: ConditionType.LEVEL_REACHED,
    conditionValue: 10,
    isSecret: true,
  },
  {
    key: "QUESTS_50_SECRET",
    name: "??",
    description: "Ти навіть не уявляєш, що на тебе чекає",
    emoji: "❓",
    category: AchievementCategory.GENERAL,
    conditionType: ConditionType.QUESTS_COMPLETED,
    conditionValue: 50,
    isSecret: true,
  },
];

async function main() {
  console.log("Seeding achievements...");

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: {
        key: achievement.key,
      },
      update: {
        name: achievement.name,
        description: achievement.description,
        emoji: achievement.emoji,
        category: achievement.category,
        conditionType: achievement.conditionType,
        conditionValue: achievement.conditionValue,
        isSecret: achievement.isSecret,
      },
      create: achievement,
    });
  }

  console.log(`Seeded ${achievements.length} achievements`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
