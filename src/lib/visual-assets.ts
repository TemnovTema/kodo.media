export type VisualAsset = {
  src: string;
  alt: string;
  label: string;
  title: string;
  description: string;
  tone: string;
};

export const visualAssets = {
  hero: {
    src: "/brand-visuals/hero-system-board.svg",
    alt: "Брендовый постер KODO с крупными цветовыми блоками, навигационными линиями и редакционной сеткой.",
    label: "entry poster",
    title: "Route Zero",
    description:
      "Новый главный визуал: не темная консоль, а реальный KODO language на основе айдентики.",
    tone: "#B49F00",
  },
  homeSecondary: {
    src: "/brand-visuals/articles-cover-board.svg",
    alt: "Графическая система обложек в языке KODO с номерными маркерами и цветными плоскостями.",
    label: "issue family",
    title: "Cover Cadence",
    description:
      "Второй слой главной: не mood-art, а контентная cover-system в логике бренда.",
    tone: "#6087C2",
  },
  promptLab: {
    src: "/generated/prompt-lab-collage.png",
    alt: "Темный коллаж из бумажных схем, редакционных заметок и маршрутных диаграмм для лаборатории промта.",
    label: "prompt board",
    title: "Prompt Assembly",
    description:
      "Лаборатория теперь держится на реальном image-layer: схемы, заметки и маршрут проверки вместо абстрактного тех-арта.",
    tone: "#A2649D",
  },
  tests: {
    src: "/generated/test-cover-stack-fit.svg",
    alt: "Минималистичная dark-ui схема маршрутов с четырьмя узлами и цветными связями в языке KODO.",
    label: "route map",
    title: "Stack Decision",
    description:
      "Тестовый раздел теперь держится на quieter cover-system: не dashboard-art, а маршрутные схемы и диагностические поля.",
    tone: "#5B894B",
  },
  covers: {
    src: "/generated/archive-desk.png",
    alt: "Темная рабочая станция с экранами, маршрутной стеной и аналитическими заметками.",
    label: "archive signal",
    title: "Editorial Desk",
    description:
      "Архив материалов теперь начинается с редакционной сцены, а не с абстрактной обложечной системы.",
    tone: "#6087C2",
  },
} satisfies Record<string, VisualAsset>;

const rubricVisuals: Record<string, VisualAsset> = {
  dispatches: {
    src: "/generated/archive-desk.png",
    alt: "Темная editorial-сцена рабочего стола с экранами, схемами и картой связей.",
    label: "dispatch visual",
    title: "Field Setup",
    description: "Полевой режим: рабочее место, карта сигналов и живая среда сборки.",
    tone: "#6087C2",
  },
  "prompt-forensics": {
    src: "/generated/prompt-lab-collage.png",
    alt: "Темный коллаж из схем, документов и маршрутных стрелок на редакционном столе.",
    label: "forensics visual",
    title: "Failure Diagram",
    description: "Форензика промтов как схема дефектов, а не как метафора.",
    tone: "#A2649D",
  },
  "builder-notes": {
    src: "/generated/archive-desk.png",
    alt: "Рабочая студия с маршрутной стеной, планшетами и инженерными заметками.",
    label: "builder visual",
    title: "Assembly Desk",
    description: "Сборка продукта через экраны, заметки и рабочие артефакты.",
    tone: "#B49F00",
  },
  "signal-tests": {
    src: "/generated/test-cover-profile.svg",
    alt: "Три профильных модуля на темном поле с кругами сканирования и брендовой цветовой системой KODO.",
    label: "test visual",
    title: "Profile Field",
    description: "Диагностика как набор режимов и архетипов, а не как generic dashboard.",
    tone: "#5B894B",
  },
};

const articleVisuals: Record<string, VisualAsset> = {
  "why-vibe-coding-needs-an-editor": {
    src: "/article-covers/cover1.jpg?v=20260716-1",
    alt: "Тёмная редакционная обложка KODO с экраном, крупной типографикой и синим акцентом.",
    label: "cover 01",
    title: "Editorial Signal",
    description: "Первая обложка из новой серии для архива статей.",
    tone: "#6087C2",
  },
  "prompt-pipeline-for-a-small-media": {
    src: "/article-covers/cover2.jpg?v=20260716-1",
    alt: "Тёмная cover-композиция KODO с рабочим интерфейсом и зелёно-жёлтыми акцентами.",
    label: "cover 02",
    title: "Pipeline Draft",
    description: "Вторая обложка из новой серии для материалов про пайплайны.",
    tone: "#5B894B",
  },
  "autopsies-of-bad-prompts": {
    src: "/article-covers/cover4.jpg?v=20260716-1",
    alt: "Редакционная dark-ui обложка с более плотной композицией и розово-жёлтыми маркерами.",
    label: "cover 04",
    title: "Prompt Autopsy",
    description: "Третья доступная обложка из новой серии для форензики промтов.",
    tone: "#A2649D",
  },
  "agents-as-layout-engineers": {
    src: "/article-covers/cover1.jpg?v=20260716-1",
    alt: "Тёмная редакционная обложка KODO с экраном, крупной типографикой и синим акцентом.",
    label: "cover 01",
    title: "Layout Signal",
    description: "Повтор первой обложки для материалов о композиции и каркасе.",
    tone: "#6087C2",
  },
  "what-your-vibe-coding-profile-says": {
    src: "/article-covers/cover2.jpg?v=20260716-1",
    alt: "Тёмная cover-композиция KODO с рабочим интерфейсом и зелёно-жёлтыми акцентами.",
    label: "cover 02",
    title: "Profile Draft",
    description: "Повтор второй обложки для материалов про режимы и профили.",
    tone: "#5B894B",
  },
  "terminal-aesthetics-are-not-a-style-only": {
    src: "/article-covers/cover4.jpg?v=20260716-1",
    alt: "Редакционная dark-ui обложка с более плотной композицией и розово-жёлтыми маркерами.",
    label: "cover 04",
    title: "Terminal Mood",
    description: "Повтор четвёртой обложки для материалов о визуальном языке.",
    tone: "#B49F00",
  },
};

const testVisuals: Record<string, VisualAsset> = {
  "vibe-coding-profile": {
    src: "/generated/test-cover-profile.svg",
    alt: "Три профильных модуля на темном поле с кругами сканирования и брендовой цветовой системой KODO.",
    label: "profile visual",
    title: "Profile Field",
    description: "Профили пользователя как тихая cover-system из модулей и сканирующих колец.",
    tone: "#5B894B",
  },
  "prompt-lint": {
    src: "/generated/test-cover-prompt-lint.svg",
    alt: "Минималистичное dark-ui окно промта с пометками, check-mark и цветными правками в языке KODO.",
    label: "lint visual",
    title: "Prompt Review",
    description: "Проверка промта как редакторская правка, а не как технический dashboard.",
    tone: "#A2649D",
  },
  "agent-stack-fit": {
    src: "/generated/test-cover-stack-fit.svg",
    alt: "Тихая dark-ui карта маршрутов с узлами, связями и брендовой палитрой KODO.",
    label: "stack visual",
    title: "Route Map",
    description: "Выбор пайплайна через маршрутную схему, а не через абстрактный tech-art.",
    tone: "#5B894B",
  },
};

export function getRubricVisualAsset(slug?: string) {
  if (!slug) {
    return visualAssets.covers;
  }

  return rubricVisuals[slug] ?? visualAssets.covers;
}

export function getArticleVisualAsset(slug?: string) {
  if (!slug) {
    return visualAssets.covers;
  }

  return articleVisuals[slug] ?? visualAssets.covers;
}

export function getTestVisualAsset(slug?: string) {
  if (!slug) {
    return visualAssets.tests;
  }

  return testVisuals[slug] ?? visualAssets.tests;
}
