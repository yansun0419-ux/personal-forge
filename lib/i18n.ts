export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

// A recursive mapped type
type DictionaryShape<T> = {
  readonly [Key in keyof T]: T[Key] extends string
    ? string
    : DictionaryShape<T[Key]>;
};

export const zh = {
  common: {
    brand: "Personal Forge",
    colorStudy: "确定颜色",
    languageToggle: "English",
    languageToggleLabel: "切换到英文",
    readPhilosophy: "阅读锻造哲学",
    themeToggleLabel: "切换主题",
    viewColorStudy: "查看视觉试炼场",
  },
  navigation: {
    breadcrumbs: "面包屑导航",
    colors: "确定颜色",
    home: "主页",
  },
  home: {
    eyebrow: "Forge log / 修炼日志",
    title: "把每一个平常日夜，锻成不凡的作品。",
    slogan:
      "我的锻造哲学：顿悟值得向往，但真正改变作品重量的，往往是一次次耐心的打磨。",
    statusLabelFoundation: "根基",
    statusValueFoundation: "重铸中",
    statusLabelEnemy: "敌人",
    statusValueEnemy: "Bug兽兵",
    statusLabelGoal: "目标",
    statusValueGoal: "神兵",
    statusAriaLabel: "锻造状态",
    backgroundAlt: "深空星云与锻造火光交织的背景",
    philosophyEyebrow: "Philosophy",
    philosophyTitle: "我的锻造哲学",
    philosophyParagraph1:
      "我们都向往小说里一朝顿悟的瞬间，却常常忽略那些十年磨一剑的平常日夜。我们沉迷于游戏升级的快感，却忘了修炼本身也有漫长、重复、甚至枯燥的一面。",
    philosophyParagraph2:
      "我相信，真正的神兵，也就是卓越的作品，不会只靠灵感凭空降临。它更像一次次把材料送入炉火：写下一行代码，拆掉一个误判，修好一次崩溃，再把边缘磨得更稳。",
    philosophyParagraph3:
      "AI 可以帮我拼接材料、加快试错，但匠心仍然必须亲手修炼。这个网站就是我的修炼日志：我在这里重铸根基，清剿 Bug 兽兵，也尝试锻造属于自己的神兵。",
    philosophyParagraph4:
      "我不害怕过程的平淡，因为我知道，平淡不是停滞。它是通往不凡之前，最真实、也最可靠的锻造声。",
  },
} as const;

export const en = {
  common: {
    brand: "Personal Forge",
    colorStudy: "Color Study",
    languageToggle: "中文",
    languageToggleLabel: "Switch to Chinese",
    readPhilosophy: "Read the Philosophy",
    themeToggleLabel: "Toggle theme",
    viewColorStudy: "View the Visual Trial",
  },
  navigation: {
    breadcrumbs: "Breadcrumb navigation",
    colors: "Color Study",
    home: "Home",
  },
  home: {
    eyebrow: "Forge log / Practice journal",
    title: "Forge every ordinary day into work that carries weight.",
    slogan:
      "My forging philosophy: revelation is worth chasing, but the true weight of a work is changed by patient, repeated refinement.",
    statusLabelFoundation: "Foundation",
    statusValueFoundation: "Reforging",
    statusLabelEnemy: "Enemy",
    statusValueEnemy: "Bug Beasts",
    statusLabelGoal: "Goal",
    statusValueGoal: "Divine Weapon",
    statusAriaLabel: "Forge status",
    backgroundAlt: "A deep-space nebula interwoven with forge fire",
    philosophyEyebrow: "Philosophy",
    philosophyTitle: "My Forging Philosophy",
    philosophyParagraph1:
      "We long for the moment of sudden enlightenment in novels, yet often overlook the ordinary days and nights behind a blade sharpened for ten years. We chase the thrill of leveling up in games, while forgetting that cultivation itself can be long, repetitive, and even dull.",
    philosophyParagraph2:
      "I believe a true divine weapon, a truly excellent work, is not born from inspiration alone. It is closer to feeding raw material into the furnace again and again: writing one line of code, removing one bad assumption, fixing one crash, then polishing the edge until it holds.",
    philosophyParagraph3:
      "AI can help me assemble materials and accelerate experiments, but craft still has to be cultivated by hand. This site is my practice journal: a place to reforge foundations, clear out Bug Beasts, and attempt to shape a divine weapon of my own.",
    philosophyParagraph4:
      "I do not fear the plainness of the process, because I know plainness is not stagnation. It is the most honest and reliable sound of forging before the path turns extraordinary.",
  },
} as const satisfies DictionaryShape<typeof zh>;

export const dictionaries = {
  zh,
  en,
} as const;

// StringLeafPath recursively constructs dot-separated paths to string leaves in a nested object type
type StringLeafPath<T> = {
  [Key in keyof T & string]: T[Key] extends string
    ? Key
    : T[Key] extends Record<string, unknown>
      ? `${Key}.${StringLeafPath<T[Key]>}`
      : never;
}[keyof T & string];

export type TranslationKey = StringLeafPath<typeof zh>;

// getTranslation looks up a translation by locale and key, throwing an error if the key is missing or does not resolve to a string
export function getTranslation(locale: Locale, key: TranslationKey): string {
  let value: unknown = dictionaries[locale];

  for (const segment of key.split(".")) {
    if (typeof value !== "object" || value === null || !(segment in value)) {
      throw new Error(`Missing translation key: ${key}`);
    }

    value = (value as Record<string, unknown>)[segment];
  }

  if (typeof value !== "string") {
    throw new Error(`Translation key does not resolve to text: ${key}`);
  }

  return value;
}

export function createTranslator(locale: Locale) {
  return (key: TranslationKey) => getTranslation(locale, key);
}
