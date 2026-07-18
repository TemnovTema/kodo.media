export type Rubric = {
  slug: string;
  title: string;
  summary: string;
  mission: string;
  signal: string;
  cadence: string;
};

export type ArticleSection = {
  title: string;
  paragraphs: string[];
};

export type EngagementStats = {
  likes: number;
  views: number;
  comments: number;
};

export type Article = {
  slug: string;
  title: string;
  deck: string;
  excerpt: string;
  rubric: string;
  format: string;
  readingTime: string;
  publishedAt: string;
  status: string;
  signal: string;
  takeaway: string;
  engagement: EngagementStats;
  sections: ArticleSection[];
};

export type PromptLabModule = {
  title: string;
  summary: string;
  inputs: string[];
};

export type DiagnosticTest = {
  slug: string;
  title: string;
  summary: string;
  duration: string;
  outcome: string;
  mode: string;
  checkpoints: string[];
};

export type LibraryItem = {
  slug: string;
  title: string;
  summary: string;
  kind: "Скилл" | "Шаблон" | "Промт" | "Гайд";
  target: string;
  format: string;
  outcome: string;
  includes: string[];
  whenToUse: string[];
  coverSrc?: string;
  coverAlt?: string;
  coverPosition?: string;
  externalUrl?: string;
  externalKicker?: string;
  externalWordmark?: string;
  externalHost?: string;
  externalCta?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  repositoryUrl?: string;
  tags?: string[];
};

export type LibraryFolder = {
  slug: string;
  kicker: string;
  title: string;
  summary: string;
  items: string[];
  resourceSlugs: string[];
  count: string;
  accent: "blue" | "green" | "yellow" | "pink";
  sourceUrl?: string;
  sourceLabel?: string;
};

export type AuthorPost = {
  id: string;
  authorSlug: string;
  message: string;
  postedAt: string;
  accent: "blue" | "green" | "yellow" | "pink";
  engagement: EngagementStats;
};

export type CommunityComment = {
  id: string;
  postId: string;
  authorSlug: string;
  message: string;
  postedAt: string;
  likes: number;
};

export type ContentCommentKind = "article" | "library" | "test" | "rubric";

export type ContentComment = {
  authorSlug: string;
  message: string;
  postedAt: string;
  likes: number;
};

export type CommunityProfile = {
  slug: string;
  name: string;
  role: string;
  avatarLabel: string;
  accent: "blue" | "green" | "yellow" | "pink";
  bio: string;
  focus: string[];
  location: string;
  joined: string;
  photoSrc?: string;
  photoPosition?: string;
};

export type MerchItem = {
  id: string;
  title: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
};

export const siteStats = [
  { label: "Рубрики", value: "04" },
  { label: "Форматы", value: "06" },
  { label: "Промт-фреймы", value: "12" },
  { label: "Диагностики", value: "03" },
];

export const contentFormats = [
  "Разбор",
  "Полевая заметка",
  "Интервью",
  "Чеклист",
  "Тест-драйв",
  "Промт-кит",
];

export const rubrics: Rubric[] = [
  {
    slug: "dispatches",
    title: "Dispatches",
    summary: "Редакционные материалы о том, как команды реально работают с агентами.",
    mission:
      "Собираем полевые заметки о темпе, сбоях и маленьких инженерных решениях, которые превращают вайб-кодинг в рабочий процесс.",
    signal: "Наблюдаем систему в проде, а не в демо.",
    cadence: "2 выпуска в неделю",
  },
  {
    slug: "prompt-forensics",
    title: "Prompt Forensics",
    summary: "Микроскоп для плохих, средних и сильных промтов.",
    mission:
      "Разбираем, где именно промт ломается: в контексте, ролях, ограничениях, данных или критериях оценки результата.",
    signal: "Не обсуждаем магию, обсуждаем причину.",
    cadence: "Постоянная рубрика",
  },
  {
    slug: "builder-notes",
    title: "Builder Notes",
    summary: "Практика сборки продуктов: маршруты, контент-модель, UX и пайплайны.",
    mission:
      "Пишем для тех, кто не просто экспериментирует, а доводит агентную сборку до полезных интерфейсов и контентных систем.",
    signal: "От идеи к shipped-версии без романтизации.",
    cadence: "1 большой материал в неделю",
  },
  {
    slug: "signal-tests",
    title: "Signal Tests",
    summary: "Диагностики, тесты и профили, которые помогают понять свой стиль работы с ИИ.",
    mission:
      "Показываем не только результат, но и рабочий профиль пользователя: кто он в агентном цикле, где ускоряется и где теряет качество.",
    signal: "Измеряем, прежде чем советовать.",
    cadence: "Обновление каждый релиз",
  },
];

export const merchItems: MerchItem[] = [
  {
    id: "merch-tee",
    title: "Футболка Route Zero",
    summary: "Черная футболка с пиксельной планетой и цветовым кодом KODO.",
    imageSrc: "/merch/kodo-tee.jpg",
    imageAlt:
      "Черная футболка KODO на манекене с пиксельной графикой и брендовой палитрой.",
  },
  {
    id: "merch-shopper",
    title: "Шопер Signal Carry",
    summary: "Тёмный шопер с пиксельной траекторией и логотипом KODO.",
    imageSrc: "/merch/kodo-shopper.jpg",
    imageAlt:
      "Темный шопер KODO на каменной лестнице с пиксельным маршрутом и логотипом.",
  },
  {
    id: "merch-mug",
    title: "Термокружка Build Loop",
    summary: "Тихий dark-object с KODO-маркой для длинных сборок и ночных прогонов.",
    imageSrc: "/generated/merch-mug.svg",
    imageAlt:
      "Темная брендовая термокружка KODO с цветными блоками на графичном фоне.",
  },
  {
    id: "merch-notebook",
    title: "Блокнот Prompt Field",
    summary: "Поле для схем, промтов и разметки перед запуском следующего прохода.",
    imageSrc: "/generated/merch-notebook.svg",
    imageAlt:
      "Черный блокнот KODO с эластичной лентой и брендовой геометрией на фоне.",
  },
  {
    id: "merch-stickers",
    title: "Sticker Pack KODO",
    summary: "Набор наклеек для ноутбука, кейса и рабочего стола в языке айдентики.",
    imageSrc: "/generated/merch-sticker-pack.svg",
    imageAlt:
      "Набор брендовых наклеек KODO на темной поверхности с цветными акцентами.",
  },
];

export const articles: Article[] = [
  {
    slug: "why-vibe-coding-needs-an-editor",
    title: "Почему вайб-кодингу нужен редактор, а не только хороший агент",
    deck:
      "Если агент умеет быстро собирать интерфейсы, это еще не означает, что продукт держит ритм, стиль и смысл. Редактор здесь не метафора, а системная роль.",
    excerpt:
      "Разбираем, почему без редакторского слоя вайб-кодинг очень быстро скатывается в набор красивых, но несвязанных артефактов.",
    rubric: "builder-notes",
    format: "Разбор",
    readingTime: "8 мин",
    publishedAt: "14 июля 2026",
    status: "Опубликовано",
    signal: "EDITORIAL LAYER",
    takeaway: "Главный риск вайб-кодинга — не в генерации, а в отсутствии структуры принятия решений.",
    engagement: {
      likes: 428,
      views: 18240,
      comments: 37,
    },
    sections: [
      {
        title: "Скорость не заменяет последовательность",
        paragraphs: [
          "Когда команда впервые начинает собирать продукт вместе с агентом, первые демо почти всегда выглядят впечатляюще. Есть скорость, есть эффект неожиданной силы, есть ощущение, что между идеей и экраном больше нет трения.",
          "Проблема возникает на четвертой, пятой, шестой итерации. Именно там выясняется, что каждый новый заход несет с собой другой тон, другую визуальную логику и новые допущения, которые никто не фиксировал.",
        ],
      },
      {
        title: "Редактор как уровень между задачей и шумом",
        paragraphs: [
          "Редактор в контексте агентной разработки — это не человек, который украшает текст. Это функция, которая следит за тем, чтобы каждая следующая версия была не просто новой, а лучше встроенной в систему.",
          "Он отвечает за язык, за повторяемость сигналов, за то, чтобы маршрут пользователя не менялся от страницы к странице вместе с очередным креативным порывом модели.",
        ],
      },
      {
        title: "Что именно нужно фиксировать",
        paragraphs: [
          "Минимум: целевая аудитория, стиль интерфейса, разрешенные паттерны, словарь CTA, типы контента, правила промтов, признаки завершенности.",
          "Если эти вещи не записаны, агент каждый раз будет договариваться с пустотой и приносить новую версию истины.",
        ],
      },
    ],
  },
  {
    slug: "prompt-pipeline-for-a-small-media",
    title: "Пайплайн промтов для небольшого онлайн-СМИ: от замысла до выпуска",
    deck:
      "У медиа-сайта другая механика, чем у лендинга. Нужно не только красиво войти, но и удерживать ритм публикаций, рубрик и форматных экспериментов.",
    excerpt:
      "Показываем пайплайн, в котором главная страница, статьи, лаборатория промта и тесты собираются как одна система, а не как набор отдельных экранов.",
    rubric: "dispatches",
    format: "Полевая заметка",
    readingTime: "11 мин",
    publishedAt: "12 июля 2026",
    status: "Опубликовано",
    signal: "SYSTEM PIPELINE",
    takeaway: "Контентный продукт выигрывает от пайплайна, где бренд, IA и промты связаны заранее.",
    engagement: {
      likes: 316,
      views: 14980,
      comments: 24,
    },
    sections: [
      {
        title: "Сначала структура, потом магия",
        paragraphs: [
          "Главная ошибка при сборке медиа с агентами — начинать с красивого hero-блока и только потом думать, как живут каталоги, теги и повторяющиеся форматы.",
          "Если сначала определить сущности контента и маршруты, визуальный слой становится не догадкой, а осмысленным продолжением структуры.",
        ],
      },
      {
        title: "Один продукт, несколько режимов",
        paragraphs: [
          "Главная может позволить себе больше театра, потому что она объясняет, куда попал пользователь. Страница статьи должна переключиться в режим чтения. Лаборатория промта — в режим практики. Тесты — в режим диагностики.",
          "Это не четыре разных сайта. Это четыре режима одного продукта с общей типографикой, акцентами и логикой ритма.",
        ],
      },
      {
        title: "Промт как редакционный контракт",
        paragraphs: [
          "Хороший промт для такого проекта фиксирует не только задачу, но и запреты: какие визуальные клише не допускаются, какие сущности уже существуют, какие маршруты обязательны, какой тон текста считаем редакционным.",
          "Без этой части агент снова начинает изобретать проект заново.",
        ],
      },
    ],
  },
  {
    slug: "autopsies-of-bad-prompts",
    title: "Вскрытие плохих промтов: где именно ломается результат",
    deck:
      "Промт может быть длинным, уверенным и по-прежнему слабым. Смотрим на типовые точки поломки без мистики и обобщений.",
    excerpt:
      "Разделяем плохие промты не по настроению, а по типу дефекта: пустая роль, размытый контекст, конфликтующие требования, отсутствие критериев оценки.",
    rubric: "prompt-forensics",
    format: "Чеклист",
    readingTime: "7 мин",
    publishedAt: "10 июля 2026",
    status: "Опубликовано",
    signal: "FAILURE MAP",
    takeaway: "Самая частая ошибка — просить у модели форму до того, как определена функция результата.",
    engagement: {
      likes: 271,
      views: 12630,
      comments: 18,
    },
    sections: [
      {
        title: "Роль без ответственности",
        paragraphs: [
          "Фраза вроде «ты senior product designer» почти ничего не дает, если не объяснено, по каким критериям этот дизайн будет оцениваться и в каких ограничениях работает агент.",
          "Роль без ответственности — декоративная маска. Она добавляет тон, но не добавляет управляемость.",
        ],
      },
      {
        title: "Контекст без границ",
        paragraphs: [
          "Если в промте нет указания, что уже существует, что нельзя ломать и где заканчивается задача, модель начинает расширять проект за пределы намерения.",
          "Отсюда берутся внезапные редизайны, новые сущности и километры лишнего кода.",
        ],
      },
      {
        title: "Нет критерия, нет финиша",
        paragraphs: [
          "Хороший промт почти всегда содержит определение завершенности: какие страницы должны появиться, какие данные нужны, какую проверку пройти.",
          "Если финиш не описан, агент почти всегда продолжит оптимизировать не то, что вы считали важным.",
        ],
      },
    ],
  },
  {
    slug: "agents-as-layout-engineers",
    title: "Агенты как layout engineers: где заканчивается генерация и начинается композиция",
    deck:
      "Сильный интерфейс — это не только аккуратные компоненты, но и ощущение намерения в сетке, ритме и масштабе.",
    excerpt:
      "Объясняем, почему главная задача агента на фронтенде — не карточки рисовать, а держать композиционную дисциплину во всех режимах сайта.",
    rubric: "builder-notes",
    format: "Интервью",
    readingTime: "9 мин",
    publishedAt: "8 июля 2026",
    status: "Опубликовано",
    signal: "LAYOUT DISCIPLINE",
    takeaway: "Композиция — это инфраструктура доверия к продукту.",
    engagement: {
      likes: 357,
      views: 13870,
      comments: 21,
    },
    sections: [
      {
        title: "Компоненты не спасают слабую сетку",
        paragraphs: [
          "Модель может идеально повторить карточку, но если страница не держит контраст плотности, ритма и переходов между блоками, пользователь воспринимает интерфейс как временный.",
          "Это особенно заметно в медиа-продуктах, где одна и та же система должна поддерживать и драматичный вход, и спокойное чтение.",
        ],
      },
      {
        title: "Композиция как навигация",
        paragraphs: [
          "Хорошая сетка подсказывает, куда смотреть, даже до того, как пользователь начал читать текст. Масштаб заголовка, длина строки, вес лейблов и границы блоков создают поведение.",
          "Поэтому агенту нужно задавать не только палитру и шрифт, но и режимы плотности для разных страниц.",
        ],
      },
      {
        title: "Редакционный сайт особенно чувствителен",
        paragraphs: [
          "В продуктовых интерфейсах часть задач берет на себя привычная UI-логика. В медиа это работает хуже: контент длиннее, переходы тоньше, а внимание нужно удерживать без крика.",
          "Тут любая случайность в композиции выглядит как редакционный провал.",
        ],
      },
    ],
  },
  {
    slug: "what-your-vibe-coding-profile-says",
    title: "Что говорит о вас профиль вайб-кодера: оператор, редактор или режиссер",
    deck:
      "Тесты в агентном продукте нужны не ради развлечения. Они помогают пользователю увидеть свой рабочий профиль и понять, где усиливать систему.",
    excerpt:
      "Показываем, какие роли чаще всего обнаруживаются в тестах и как под каждую роль меняется стратегия написания промтов.",
    rubric: "signal-tests",
    format: "Тест-драйв",
    readingTime: "6 мин",
    publishedAt: "6 июля 2026",
    status: "Опубликовано",
    signal: "PROFILE MODEL",
    takeaway: "Разные пользователи ломаются на разных уровнях: одни в задаче, другие в критериях, третьи в итерациях.",
    engagement: {
      likes: 244,
      views: 11240,
      comments: 16,
    },
    sections: [
      {
        title: "Оператор",
        paragraphs: [
          "Оператор быстро стартует и хорошо формулирует действие, но часто недооценивает необходимость редакторского контура вокруг результата.",
          "Его сила — скорость. Его риск — поверхностная проверка качества.",
        ],
      },
      {
        title: "Редактор",
        paragraphs: [
          "Редактор тоньше чувствует язык, структуру и consistency, но иногда слишком долго удерживает систему в режиме наблюдения и поздно переходит к сборке.",
          "Его сила — качество. Его риск — потеря темпа.",
        ],
      },
      {
        title: "Режиссер",
        paragraphs: [
          "Режиссер хорошо видит продукт целиком: маршрут, роли, ритм, сценарии. Именно он чаще всего собирает сильные медиа-продукты с агентами.",
          "Его риск — переусложнение пайплайна там, где можно было бы упростить.",
        ],
      },
    ],
  },
  {
    slug: "terminal-aesthetics-are-not-a-style-only",
    title: "Terminal-эстетика — это не просто стиль, а обещание режима работы",
    deck:
      "Темный dev-сценарий считывается не только как образ среды разработки, но и как обещание дисциплины, точности и инженерного тона.",
    excerpt:
      "Разбираем, как dark developer UI помогает медиа-сайту говорить про вайб-кодинг убедительно, а не декоративно.",
    rubric: "dispatches",
    format: "Разбор",
    readingTime: "5 мин",
    publishedAt: "4 июля 2026",
    status: "Опубликовано",
    signal: "TACTICAL UI",
    takeaway: "Если выбрать terminal-язык, его нужно провести через все уровни интерфейса, а не только через hero.",
    engagement: {
      likes: 198,
      views: 9740,
      comments: 13,
    },
    sections: [
      {
        title: "Почему это работает",
        paragraphs: [
          "Пользователь за секунду считывает, говорит ли интерфейс языком продукта. Для медиа о вайб-кодинге dark terminal-ui не просто красив, он релевантен теме.",
          "Но эта эстетика требует дисциплины: четкой сетки, жесткой палитры и точной типографики.",
        ],
      },
      {
        title: "Где начинается фальшь",
        paragraphs: [
          "Когда терминальные мотивы используются как маска поверх обычного маркетингового шаблона, интерфейс выглядит декоративно. Красные лейблы, сканлайны и monospace сами по себе не создают доверия.",
          "Доверие появляется, когда даже каталог статей и страница тестов подчиняются тому же инженерному языку.",
        ],
      },
      {
        title: "Редакционный эффект",
        paragraphs: [
          "Сайт начинает ощущаться как рабочая консоль медиа-команды: тут есть сигналы, выпуски, диагностики, лаборатория, и все это собирается в одну систему.",
          "Именно поэтому terminal-язык подходит вашему проекту особенно хорошо.",
        ],
      },
    ],
  },
];

export const promptLabModules: PromptLabModule[] = [
  {
    title: "Роль и режим",
    summary: "Определяем не красивую маску, а рабочую функцию агента в этом конкретном цикле.",
    inputs: ["кто агент", "что он должен удержать", "что запрещено ломать"],
  },
  {
    title: "Контекст и активы",
    summary: "Фиксируем существующую архитектуру, брендовое направление, типы контента и технические ограничения.",
    inputs: ["маршруты", "данные", "стек", "существующие файлы или сущности"],
  },
  {
    title: "Критерии завершенности",
    summary: "Описываем, по каким признакам работа считается законченной и какие проверки нужно пройти.",
    inputs: ["список страниц", "валидность маршрутов", "build/lint/test", "UX-проверка"],
  },
  {
    title: "Редакторский фильтр",
    summary: "Добавляем запреты на типовые AI-паттерны и фиксируем нужный тон текста.",
    inputs: ["бан на клише", "лексика бренда", "ритм заголовков", "уровень детализации"],
  },
];

export const promptAnatomy = [
  {
    label: "01",
    title: "Задача",
    description: "Что именно собираем и в каком формате должен появиться результат.",
  },
  {
    label: "02",
    title: "Контекст",
    description: "Какая архитектура уже есть, для кого интерфейс и какие ограничения считаем жесткими.",
  },
  {
    label: "03",
    title: "Вкус и запреты",
    description: "Какой визуальный или редакционный язык нужен и какие дефолтные AI-паттерны запрещены.",
  },
  {
    label: "04",
    title: "Проверка",
    description: "Какие команды, страницы и состояния должны подтвердить, что задача реально решена.",
  },
];

export const diagnosticTests: DiagnosticTest[] = [
  {
    slug: "vibe-coding-profile",
    title: "Профиль вайб-кодера",
    summary:
      "Определяет, в каком режиме вы обычно работаете с агентом: оператор, редактор, режиссер или системный сборщик.",
    duration: "5 минут",
    outcome: "Архетип работы + рекомендации по промтам",
    mode: "Диагностика",
    checkpoints: [
      "Как вы ставите задачу",
      "Как проверяете результат",
      "Где начинаете править вручную",
    ],
  },
  {
    slug: "prompt-lint",
    title: "Prompt Lint",
    summary:
      "Проверяет ваш промт на структурные дефекты: пустую роль, слабый контекст, конфликтующие ограничения и отсутствие критериев.",
    duration: "3 минуты",
    outcome: "Отчет по ошибкам и усиленная версия промта",
    mode: "Линтер",
    checkpoints: [
      "Наличие роли и ответственности",
      "Ограничения и активы",
      "Финишные критерии",
    ],
  },
  {
    slug: "agent-stack-fit",
    title: "Agent Stack Fit",
    summary:
      "Помогает понять, какой пайплайн нужен под вашу задачу: image-first, content-first, system-first или redesign-first.",
    duration: "4 минуты",
    outcome: "Рекомендованный режим сборки",
    mode: "Маршрутизация",
    checkpoints: [
      "Тип проекта",
      "Критичность визуала",
      "Наличие существующей системы",
    ],
  },
];

export const libraryFolders: LibraryFolder[] = [
  {
    slug: "input-stack",
    kicker: "навыки / промты / сценарии",
    title: "Вводные для ИИ",
    summary:
      "Один материал о Taste Skill - открытом наборе инструкций для агентной сборки интерфейсов.",
    items: [
      "краткий пересказ Taste Skill",
      "правила для агентного фронтенда",
      "ссылка на статью и репозиторий",
    ],
    resourceSlugs: ["taste-skill-frontend"],
    count: "01 материал",
    accent: "blue",
  },
  {
    slug: "starter-templates",
    kicker: "сайты / приложения / продукты",
    title: "Шаблоны сборки",
    summary:
      "Пять открытых Next.js-шаблонов для e-commerce: от базового storefront до интеграций с Medusa, Saleor и BigCommerce.",
    items: [
      "headless storefronts на Next.js",
      "Shopify, Medusa, Saleor и BigCommerce",
      "практические ecommerce-паттерны Vercel",
    ],
    resourceSlugs: [
      "nextjs-commerce",
      "medusa-nextjs-store",
      "saleor-commerce",
      "bigcommerce-nextjs-starter",
      "shirt-shop-feature-flags",
    ],
    count: "05 ресурсов",
    accent: "green",
    sourceUrl: "https://vercel.com/templates/next.js?type=ecommerce",
    sourceLabel: "Vercel Templates / Ecommerce",
  },
  {
    slug: "open-guides",
    kicker: "гайды / курсы / методики",
    title: "Открытые курсы",
    summary:
      "Внешний сайт с открытыми курсами про ИИ и AI-агентов на русском языке. KODO не переносит его материалы, а ведёт к оригинальной программе.",
    items: [
      "внешний образовательный сайт",
      "открытые курсы про ИИ",
      "переход к оригинальной программе",
    ],
    resourceSlugs: ["aistudy-open-courses"],
    count: "01 сайт",
    accent: "yellow",
    sourceUrl: "https://ai.arckep.ru/",
    sourceLabel: "AIStudy / ai.arckep.ru",
  },
  {
    slug: "design-systems",
    kicker: "компоненты / токены / системы",
    title: "Дизайн-системы",
    summary:
      "Внешний каталог отечественных дизайн-систем. KODO не переносит его карточки и публикации, а ведёт к оригинальному сайту.",
    items: [
      "внешний каталог дизайн-систем",
      "системы и публикации на стороне источника",
      "переход к оригинальному сайту",
    ],
    resourceSlugs: ["design-systems-club"],
    count: "01 сайт",
    accent: "pink",
    sourceUrl: "https://www.designsystemsclub.ru/",
    sourceLabel: "Design Systems Club",
  },
];

export const libraryItems: LibraryItem[] = [
  {
    slug: "design-systems-club",
    title: "Design Systems Club",
    summary:
      "Внешний каталог отечественных дизайн-систем. KODO не копирует карточки систем или публикации: переход ведёт прямо к первоисточнику.",
    kind: "Гайд",
    target: "Дизайн-системы",
    format: "Внешний каталог",
    outcome: "Переход к оригинальному каталогу дизайн-систем",
    includes: [
      "прямую ссылку на исходный каталог",
      "явное указание внешнего источника",
      "отсутствие скопированных карточек и публикаций в KODO",
    ],
    whenToUse: [
      "когда нужен обзор отечественных дизайн-систем",
      "когда хочется посмотреть каталог на стороне его авторов",
      "когда важны первоисточник и актуальные материалы самого сайта",
    ],
    externalUrl: "https://www.designsystemsclub.ru/",
    externalKicker: "внешний каталог дизайн-систем",
    externalWordmark: "DESIGN\nSYSTEMS\nCLUB",
    externalHost: "designsystemsclub.ru",
    externalCta: "Открыть каталог",
    sourceUrl: "https://www.designsystemsclub.ru/",
    sourceLabel: "Design Systems Club",
  },
  {
    slug: "aistudy-open-courses",
    title: "AIStudy: открытые курсы по ИИ",
    summary:
      "Внешний русскоязычный сайт с открытыми курсами про ИИ и AI-агентов. Здесь нет копий уроков или конспектов: переход ведёт прямо к оригинальной программе.",
    kind: "Гайд",
    target: "Открытое обучение",
    format: "Внешний каталог",
    outcome: "Переход к оригинальному сайту AIStudy",
    includes: [
      "прямую ссылку на исходный сайт",
      "явное указание внешнего авторского источника",
      "отсутствие перенесённого учебного контента в KODO",
    ],
    whenToUse: [
      "когда нужен открытый русскоязычный курс по ИИ и AI-агентам",
      "когда хочется изучать программу на стороне её авторов",
      "когда важнее оригинальная структура курса, а не пересказ в каталоге KODO",
    ],
    externalUrl: "https://ai.arckep.ru/",
    externalKicker: "внешний каталог курсов",
    externalWordmark: "AI\nSTUDY_",
    externalHost: "ai.arckep.ru",
    externalCta: "Открыть AIStudy",
    sourceUrl: "https://ai.arckep.ru/",
    sourceLabel: "AIStudy / ai.arckep.ru",
  },
  {
    slug: "taste-skill-frontend",
    title: "Taste Skill",
    summary:
      "Открытый набор Agent Skills, который задаёт агенту правила для композиции, типографики, отступов и движения до начала вёрстки.",
    kind: "Скилл",
    target: "Codex / Cursor / Claude Code",
    format: "Agent Skill / v2",
    outcome: "Интерфейс с осмысленным визуальным направлением вместо дефолтной генерации",
    includes: [
      "разбор брифа и карту дизайн-системы перед вёрсткой",
      "настройки вариативности, плотности и интенсивности движения",
      "каркасы анимации и предполётную проверку интерфейса",
    ],
    whenToUse: [
      "когда нужен универсальный визуальный стандарт для нового фронтенда",
      "когда агент начинает собирать одинаковые hero-блоки и безопасные UI-паттерны",
      "когда команде важно хранить правила интерфейса рядом с кодом",
    ],
    coverSrc: "/skill-covers/pimenov-taste-skill.jpg",
    coverAlt: "Обложка материала Taste Skill на сайте Pimenov.ai.",
    coverPosition: "29% center",
    sourceUrl: "https://pimenov.ai/knowledge/taste-skill-anti-slop-frontend/",
    sourceLabel: "Pimenov.ai / Taste Skill",
    repositoryUrl: "https://github.com/Leonxlnx/taste-skill",
    tags: ["Agent Skill", "MIT"],
  },
  {
    slug: "gpt-taste-skill",
    title: "GPT Taste",
    summary:
      "Строгий вариант для GPT и Codex: сильнее направляет композицию и GSAP-анимацию, когда нужен более решительный anti-slop проход.",
    kind: "Скилл",
    target: "Codex / GPT",
    format: "Agent Skill",
    outcome: "Более смелая вёрстка и контролируемое движение без визуального шума",
    includes: [
      "строгие anti-slop ограничения для GPT-агентов",
      "усиленное направление композиции и визуальной вариативности",
      "рекомендации по GSAP-движению для интерфейсов",
    ],
    whenToUse: [
      "когда основной скилл даёт слишком осторожный результат",
      "когда задача решается именно в Codex или другом GPT-агенте",
      "когда нужен заметный, но управляемый motion-слой",
    ],
    coverSrc: "/skill-covers/pimenov-taste-skill.jpg",
    coverAlt: "Обложка материала Taste Skill на сайте Pimenov.ai.",
    coverPosition: "13% center",
    sourceUrl: "https://pimenov.ai/knowledge/taste-skill-anti-slop-frontend/",
    sourceLabel: "Pimenov.ai / Taste Skill",
  },
  {
    slug: "image-to-code-skill",
    title: "Image to Code",
    summary:
      "Пайплайн «сначала картинка»: агент сперва собирает и разбирает визуальные референсы, а затем переводит утверждённое направление в интерфейс.",
    kind: "Скилл",
    target: "Image-first builds",
    format: "Agent Skill",
    outcome: "Меньше визуальных догадок и точнее реализация утверждённого направления",
    includes: [
      "маршрут image → audit → implementation",
      "разбор референсов до начала вёрстки",
      "передачу визуальных решений в production UI",
    ],
    whenToUse: [
      "когда hero, обложка или брендовый экран должны попасть в визуальный язык с первого прохода",
      "когда сначала нужно согласовать референс, а уже потом писать JSX",
      "когда агент склонен придумывать оформление вместо следования утверждённому визуалу",
    ],
    coverSrc: "/skill-covers/pimenov-taste-skill.jpg",
    coverAlt: "Обложка материала Taste Skill на сайте Pimenov.ai.",
    coverPosition: "65% center",
    sourceUrl: "https://pimenov.ai/knowledge/taste-skill-anti-slop-frontend/",
    sourceLabel: "Pimenov.ai / Taste Skill",
  },
  {
    slug: "redesign-existing-projects-skill",
    title: "Redesign Existing Projects",
    summary:
      "Скилл для существующих продуктов: сначала проводит аудит интерфейса, затем последовательно правит вёрстку, отступы и визуальную иерархию.",
    kind: "Скилл",
    target: "Existing product UI",
    format: "Redesign workflow",
    outcome: "Осмысленный редизайн без замены работающего продукта на новую стилистику",
    includes: [
      "аудит текущего интерфейса до начала изменений",
      "проход по типографике, отступам и иерархии",
      "поэтапные правки вместо тотальной перерисовки",
    ],
    whenToUse: [
      "когда нужно улучшить живой продукт, а не собрать новый экран с нуля",
      "когда визуальные проблемы накопились в нескольких маршрутах",
      "когда важно сохранить работающую структуру и поведение интерфейса",
    ],
    coverSrc: "/skill-covers/pimenov-taste-skill.jpg",
    coverAlt: "Обложка материала Taste Skill на сайте Pimenov.ai.",
    coverPosition: "90% center",
    sourceUrl: "https://pimenov.ai/knowledge/taste-skill-anti-slop-frontend/",
    sourceLabel: "Pimenov.ai / Taste Skill",
  },
  {
    slug: "high-end-visual-design-skill",
    title: "High-End Visual Design",
    summary:
      "Спокойное премиальное визуальное направление для агента: мягкий контраст, больше воздуха, выразительная типографика и сдержанная пружинная анимация.",
    kind: "Скилл",
    target: "Editorial / product UI",
    format: "Visual direction",
    outcome: "Тихий цельный интерфейс с ощущением материала, а не шаблонной SaaS-витрины",
    includes: [
      "правила мягкого контраста и свободной композиции",
      "подход к типографике как к основному носителю иерархии",
      "сдержанное движение без декоративной перегрузки",
    ],
    whenToUse: [
      "когда визуальное направление уже выбрано и его нужно удержать в деталях",
      "когда продукту нужен спокойный дорогой тон вместо агрессивного tech-оформления",
      "когда в интерфейсе важнее воздух и ритм, чем плотность блоков",
    ],
    coverSrc: "/skill-covers/pimenov-taste-skill.jpg",
    coverAlt: "Обложка материала Taste Skill на сайте Pimenov.ai.",
    coverPosition: "52% top",
    sourceUrl: "https://pimenov.ai/knowledge/taste-skill-anti-slop-frontend/",
    sourceLabel: "Pimenov.ai / Taste Skill",
  },
  {
    slug: "nextjs-commerce",
    title: "Next.js Commerce",
    summary:
      "Базовый storefront для Shopify на Next.js App Router: серверный рендеринг, Server Components и готовая структура для headless commerce.",
    kind: "Шаблон",
    target: "Shopify / headless commerce",
    format: "Next.js storefront",
    outcome: "Быстрый старт для магазина на Shopify",
    includes: [
      "App Router, React Server Components и Server Actions",
      "структуру для каталога, карточек товара, корзины и checkout",
      "интеграцию Shopify через Storefront API",
    ],
    whenToUse: [
      "когда нужен базовый storefront для Shopify без сборки архитектуры с нуля",
      "когда важны серверный рендеринг и быстрый каталог товаров",
      "когда команда готова подключить собственные Shopify-переменные окружения",
    ],
    coverSrc: "/template-covers/vercel-nextjs-commerce.png",
    coverAlt: "Обложка шаблона Next.js Commerce из каталога Vercel.",
    sourceUrl: "https://vercel.com/templates/other/nextjs-commerce",
    sourceLabel: "Vercel / Next.js Commerce",
  },
  {
    slug: "medusa-nextjs-store",
    title: "Medusa Next.js Store",
    summary:
      "E-commerce шаблон на Next.js и Medusa с каталогом, поиском, корзиной и Stripe checkout; подойдёт для самостоятельного commerce-бэкенда.",
    kind: "Шаблон",
    target: "Medusa / Next.js storefront",
    format: "E-commerce starter",
    outcome: "Готовая связка витрины и модульного commerce-бэкенда",
    includes: [
      "страницы товара, коллекции и обзор каталога",
      "корзину, checkout через Stripe и пользовательские аккаунты",
      "Next.js App Router и Tailwind CSS",
    ],
    whenToUse: [
      "когда Shopify не подходит и нужен модульный backend Medusa",
      "когда в проекте нужны собственные коллекции, корзина и заказы",
      "когда команда готова поднять Medusa-сервер отдельно от витрины",
    ],
    coverSrc: "/template-covers/vercel-medusa.png",
    coverAlt: "Обложка шаблона Medusa Next.js Store из каталога Vercel.",
    sourceUrl: "https://vercel.com/templates/next.js/medusa",
    sourceLabel: "Vercel / Medusa Next.js Store",
  },
  {
    slug: "saleor-commerce",
    title: "Next.js Saleor Commerce",
    summary:
      "Минималистичный production-ready storefront для Saleor с GraphQL, вариантами товара, корзиной, checkout и поддержкой нескольких рынков.",
    kind: "Шаблон",
    target: "Saleor / GraphQL commerce",
    format: "Production storefront",
    outcome: "Основа для сложного headless commerce на Saleor",
    includes: [
      "категории, коллекции, карточки товара и варианты",
      "корзину и checkout на Server Components и server actions",
      "локали, каналы продаж и интеграцию с Saleor GraphQL",
    ],
    whenToUse: [
      "когда storefront строится вокруг Saleor и GraphQL",
      "когда нужны несколько регионов, языков или каналов продаж",
      "когда важна production-структура без лишнего UI-слоя",
    ],
    coverSrc: "/template-covers/vercel-saleor.png",
    coverAlt: "Обложка шаблона Next.js Saleor Commerce из каталога Vercel.",
    sourceUrl: "https://vercel.com/templates/other/nextjs-saleor-commerce",
    sourceLabel: "Vercel / Next.js Saleor Commerce",
  },
  {
    slug: "bigcommerce-nextjs-starter",
    title: "Next.js + BigCommerce",
    summary:
      "Headless storefront для BigCommerce на Next.js App Router: готовая витрина, GraphQL Storefront API и база для кастомного e-commerce интерфейса.",
    kind: "Шаблон",
    target: "BigCommerce / headless storefront",
    format: "Next.js starter",
    outcome: "Стартовая витрина для BigCommerce без монолитной темы",
    includes: [
      "Next.js 14 и App Router",
      "GraphQL-доступ к товарам, корзинам и checkout",
      "заготовку под multi-storefront сценарии",
    ],
    whenToUse: [
      "когда commerce-слой уже работает на BigCommerce",
      "когда нужен кастомный frontend поверх Storefront API",
      "когда важны управляемая витрина и headless-подход",
    ],
    coverSrc: "/template-covers/vercel-bigcommerce.png",
    coverAlt: "Обложка шаблона Next.js + BigCommerce из каталога Vercel.",
    sourceUrl:
      "https://vercel.com/templates/ecommerce/bigcommerce-starter-nextjs",
    sourceLabel: "Vercel / Next.js + BigCommerce",
  },
  {
    slug: "shirt-shop-feature-flags",
    title: "Shirt Shop / Feature Flags",
    summary:
      "Компактный пример товарной страницы, на котором можно тестировать баннеры доставки и акции через Vercel Flags SDK и Toolbar.",
    kind: "Шаблон",
    target: "E-commerce experiments",
    format: "Product page example",
    outcome: "Быстрая проверка промо-вариантов без переписывания витрины",
    includes: [
      "товарную страницу на Next.js",
      "два feature flags для сценариев с промо-баннерами",
      "интеграцию Vercel Analytics и Flags Explorer",
    ],
    whenToUse: [
      "когда нужно проверить баннер, скидку или оффер на товарной странице",
      "когда команде нужен маленький пример для feature flags",
      "когда важно увидеть работу вариаций до внедрения в основной магазин",
    ],
    coverSrc: "/template-covers/vercel-shirt-shop.png",
    coverAlt: "Обложка шаблона Shirt Shop из каталога Vercel.",
    sourceUrl: "https://vercel.com/templates/next.js/shirt-shop-feature-flags",
    sourceLabel: "Vercel / Shirt Shop",
  },
  {
    slug: "design-taste-frontend",
    title: "Design Taste Frontend",
    summary:
      "Анти-slop skill для экранов, где нужно держать композицию, воздух и image-led логику, а не добивать пустоту типографикой.",
    kind: "Скилл",
    target: "Codex / frontend surfaces",
    format: "Skill contract",
    outcome: "Чище layout, жёстче арт-дирекшн",
    includes: [
      "правила против generic hero-паттернов",
      "bias в сторону image-layer и spacing discipline",
      "ограничения на безопасные шаблонные UI-решения",
    ],
    whenToUse: [
      "когда агент начал заполнять экран текстом вместо визуальных якорей",
      "когда нужен entry-surface, который не выглядит как AI landing page",
      "когда важно сохранить сильный editorial/dev tone без переусложнения",
    ],
  },
  {
    slug: "image-to-code-pipeline",
    title: "Image-to-Code Pipeline",
    summary:
      "Режим, в котором визуал утверждается сначала картинками, а уже потом переводится в код. Особенно полезен для важных entry-screen и брендовых страниц.",
    kind: "Скилл",
    target: "Image-first builds",
    format: "Workflow skill",
    outcome: "Меньше визуальных догадок в коде",
    includes: [
      "порядок image -> audit -> implementation",
      "контроль того, чтобы код не уходил в собственную стилистику",
      "жёсткое разделение между mood direction и production UI",
    ],
    whenToUse: [
      "когда важнее сначала утвердить визуальный язык, чем сразу писать JSX",
      "когда геройская секция или обложки должны попасть в бренд с первого прохода",
      "когда проект визуально чувствительный и не терпит нейрослопа",
    ],
  },
  {
    slug: "image-first-brief-template",
    title: "Шаблон image-first брифа",
    summary:
      "Каркас брифа для страниц, где сначала задаются визуальные роли, а уже потом copy, CTA и логика сборки.",
    kind: "Шаблон",
    target: "Brand + page direction",
    format: "Reusable brief",
    outcome: "Сильнее visual anchors и меньше случайных арт-решений",
    includes: [
      "роли секционных изображений и cover-system",
      "ограничения по стилистике, плотности и палитре",
      "ожидаемые режимы композиции для hero, archive и utility pages",
    ],
    whenToUse: [
      "когда проекту нужен отдельный image-direction слой",
      "когда дизайнерского Figma-файла нет, а визуал всё равно должен быть осмысленным",
      "когда несколько агентов работают над одним брендовым направлением",
    ],
  },
  {
    slug: "media-ia-template",
    title: "Шаблон IA для контентного продукта",
    summary:
      "Быстрый каркас для сайтов, где есть главная, каталог, рубрики, лаборатории, тесты и другие режимы контента, а не один лендинг.",
    kind: "Шаблон",
    target: "Media / catalog products",
    format: "Route map",
    outcome: "Меньше хаоса в сущностях и навигации",
    includes: [
      "список базовых маршрутов и типов сущностей",
      "разделение на entry, reading, utility и diagnostic modes",
      "правила, где нужен вау-эффект, а где тишина и воздух",
    ],
    whenToUse: [
      "когда проект уже больше, чем одна промо-страница",
      "когда важно не перепутать контентные режимы между собой",
      "когда надо быстро объяснить агенту архитектуру сайта до кода",
    ],
  },
  {
    slug: "prompt-lint-pass",
    title: "Prompt Lint Pass",
    summary:
      "Промт для короткого редакторского аудита: проверяет роль, контекст, ограничения, критерии завершенности и визуальные запреты.",
    kind: "Промт",
    target: "Prompt QA",
    format: "Review prompt",
    outcome: "Сильнее постановка задачи перед запуском агента",
    includes: [
      "проверку на пустую роль и размытый scope",
      "поиск конфликтующих ограничений",
      "сигналы о том, где агенту не хватит контекста или активов",
    ],
    whenToUse: [
      "перед отправкой длинного production-промта в Codex или ChatGPT",
      "когда результат выглядит случайным, хотя формально задача описана",
      "когда хочется понять, что именно в постановке сломано",
    ],
  },
  {
    slug: "ship-review-pass",
    title: "Ship Review Pass",
    summary:
      "Короткий финальный prompt для предрелизной проверки: layout, пустое пространство, рабочие ссылки, адаптив и визуальный мусор.",
    kind: "Промт",
    target: "Pre-release audit",
    format: "QA prompt",
    outcome: "Чище последний проход перед деплоем",
    includes: [
      "проверку на dead links и случайные заглушки",
      "проверку visual density и лишнего текста",
      "сигналы для mobile-pass и cleanup по маршрутам",
    ],
    whenToUse: [
      "перед коммитом или Vercel deploy",
      "когда проект уже собран, но хочется снять последний мусор",
      "когда агент доделывал страницу в несколько итераций и мог оставить хвосты",
    ],
  },
  {
    slug: "prompt-lab-setup-guide",
    title: "Гайд по сборке Prompt Lab",
    summary:
      "Набор правил для utility-экранов, где интерфейс должен помогать писать, а не шуметь: одно поле, короткие подсказки, нулевая перегрузка.",
    kind: "Гайд",
    target: "Utility screens",
    format: "Implementation guide",
    outcome: "Меньше декоративности в практических экранах",
    includes: [
      "правила для тихих utility-layouts",
      "границы между helpful hints и лишним текстом",
      "подход к voice input, validation и empty-state без перегруза",
    ],
    whenToUse: [
      "когда делаешь экран для практики, а не для шоукейса",
      "когда хочется убрать почти всё, кроме главного действия",
      "когда интерфейс должен работать как инструмент, а не как постер",
    ],
  },
  {
    slug: "release-route-guide",
    title: "Гайд по route-by-route полировке",
    summary:
      "Последовательность, в которой имеет смысл чистить проект: entry-screen, каталоги, utility pages, diagnostics, mobile pass и только потом deploy.",
    kind: "Гайд",
    target: "Polish workflow",
    format: "Cleanup sequence",
    outcome: "Меньше хаотичных правок в финале",
    includes: [
      "порядок прохода по маршрутам и типам страниц",
      "разделение между visual issues и structural issues",
      "правило, какие страницы можно делать эффектными, а какие нет",
    ],
    whenToUse: [
      "когда проект растёт и правки начинают конфликтовать друг с другом",
      "когда нужно привести несколько разделов к одному editorial rhythm",
      "когда хочется меньше метаться между экранами перед релизом",
    ],
  },
];

export const currentProfileSlug = "dennis-ritchie";

export const communityProfiles: CommunityProfile[] = [
  {
    slug: "dennis-ritchie",
    name: "Деннис Ритчи",
    role: "Системный архитектор",
    avatarLabel: "DR",
    accent: "yellow",
    bio: "Собирает KODO MEDIA как живую редакционную среду для тех, кто работает с агентами не ради демо, а ради устойчивых продуктов.",
    focus: ["Редакционные системы", "Product direction", "Agent workflows"],
    location: "Калининград",
    joined: "в KODO с 2026",
  },
  {
    slug: "grace-hopper",
    name: "Грейс Хоппер",
    role: "Архитектор языков",
    avatarLabel: "GH",
    accent: "pink",
    bio: "Собирает редакционные контуры для команд, которые хотят выпускать больше, не размывая язык продукта и логику интерфейсов.",
    focus: ["Content systems", "Editorial QA", "Product voice"],
    location: "Москва",
    joined: "в KODO с 2025",
    photoSrc: "/profile-portraits/grace-hopper.png",
    photoPosition: "center 34%",
  },
  {
    slug: "alan-kay",
    name: "Алан Кэй",
    role: "Автор интерфейсов",
    avatarLabel: "AK",
    accent: "blue",
    bio: "Пишет и собирает интерфейсы с агентами, сохраняя в них композицию, ритм и ясные границы между системой и декором.",
    focus: ["Frontend systems", "GSAP motion", "Interface density"],
    location: "Санкт-Петербург",
    joined: "в KODO с 2026",
    photoSrc: "/profile-portraits/alan-kay.png",
    photoPosition: "center 34%",
  },
  {
    slug: "radia-perlman",
    name: "Радия Перлман",
    role: "Инженер связей",
    avatarLabel: "RP",
    accent: "green",
    bio: "Проектирует prompt-системы, где у задачи есть контекст, ограничения и понятный финиш, а не только уверенный тон.",
    focus: ["Prompt design", "Evaluation", "Agent context"],
    location: "Токио / удалённо",
    joined: "в KODO с 2025",
  },
  {
    slug: "margaret-hamilton",
    name: "Маргарет Хэмилтон",
    role: "Инженер надёжности",
    avatarLabel: "MH",
    accent: "yellow",
    bio: "Настраивает ритм сообщества: помогает материалам, заметкам и людям встречаться без ощущения бесконечной ленты.",
    focus: ["Community design", "Formats", "Editorial programming"],
    location: "Берлин",
    joined: "в KODO с 2026",
  },
];

export const authorPosts: AuthorPost[] = [
  {
    id: "post-00",
    authorSlug: "dennis-ritchie",
    message:
      "Хочу, чтобы KODO оставался рабочей средой, а не витриной про ИИ. Поэтому здесь важнее последовательность маршрутов, чем количество эффектов на одном экране.",
    postedAt: "сегодня, 11:08",
    accent: "yellow",
    engagement: {
      likes: 236,
      views: 10480,
      comments: 18,
    },
  },
  {
    id: "post-00b",
    authorSlug: "dennis-ritchie",
    message:
      "Профиль в продукте нужен не для статуса. Он должен быстро объяснять: кто этот человек, в каком режиме он работает и почему его заметки стоит читать.",
    postedAt: "вчера, 18:32",
    accent: "yellow",
    engagement: {
      likes: 154,
      views: 7420,
      comments: 12,
    },
  },
  {
    id: "post-01",
    authorSlug: "grace-hopper",
    message:
      "Самый быстрый способ испортить хороший screenflow — начать править его без заранее заданного ритма плотности. Агент это чувствует моментально и начинает расползаться по стилям.",
    postedAt: "сегодня, 10:24",
    accent: "pink",
    engagement: {
      likes: 192,
      views: 8420,
      comments: 14,
    },
  },
  {
    id: "post-02",
    authorSlug: "alan-kay",
    message:
      "Почти любой интерфейс становится тише, если сначала убрать один блок текста, а потом спросить себя, держит ли экран смысл без него. Если да, этот блок был лишним.",
    postedAt: "сегодня, 09:12",
    accent: "blue",
    engagement: {
      likes: 148,
      views: 7310,
      comments: 11,
    },
  },
  {
    id: "post-03",
    authorSlug: "radia-perlman",
    message:
      "Хороший prompt-lint редко про «красивую формулировку». Обычно он про то, хватает ли постановке задач границ, активов и финишных критериев.",
    postedAt: "вчера, 21:46",
    accent: "green",
    engagement: {
      likes: 224,
      views: 9650,
      comments: 19,
    },
  },
  {
    id: "post-04",
    authorSlug: "margaret-hamilton",
    message:
      "Для community-раздела важнее не число карточек, а то, есть ли у пользователя ощущение живого движения: закреплённый материал, короткая лента и понятные голоса авторов.",
    postedAt: "вчера, 17:08",
    accent: "yellow",
    engagement: {
      likes: 171,
      views: 6880,
      comments: 9,
    },
  },
];

export const communityComments: CommunityComment[] = [
  {
    id: "comment-001",
    postId: "post-00",
    authorSlug: "grace-hopper",
    message:
      "Да, это хорошо считывается и по ленте: когда у материала есть место в маршруте, он не выглядит как ещё один независимый блок контента.",
    postedAt: "сегодня, 11:16",
    likes: 28,
  },
  {
    id: "comment-002",
    postId: "post-00",
    authorSlug: "alan-kay",
    message:
      "Для интерфейса это ещё и вопрос ограничений. Чем раньше они зафиксированы, тем меньше агент начинает компенсировать пустоту визуальным шумом.",
    postedAt: "сегодня, 11:22",
    likes: 19,
  },
  {
    id: "comment-003",
    postId: "post-00b",
    authorSlug: "margaret-hamilton",
    message:
      "Контекст автора особенно важен в коротком формате. Одно и то же предложение читается иначе, когда понимаешь, из какой практики оно появилось.",
    postedAt: "вчера, 18:49",
    likes: 22,
  },
  {
    id: "comment-004",
    postId: "post-00b",
    authorSlug: "radia-perlman",
    message:
      "И это хороший повод показывать не только роль, но и фокус. Он сразу задаёт рамку, в которой заметка становится полезной.",
    postedAt: "вчера, 19:04",
    likes: 16,
  },
  {
    id: "comment-005",
    postId: "post-01",
    authorSlug: "dennis-ritchie",
    message:
      "Точно. Ритм плотности стоит задавать ещё до того, как появляется первая карточка. Иначе дизайн потом приходится выправлять не решением, а бесконечными исключениями.",
    postedAt: "сегодня, 10:41",
    likes: 31,
  },
  {
    id: "comment-006",
    postId: "post-01",
    authorSlug: "radia-perlman",
    message:
      "В промтах это работает так же: без общего ритма модель начинает воспринимать каждый следующий экран как отдельную задачу.",
    postedAt: "сегодня, 10:54",
    likes: 17,
  },
  {
    id: "comment-007",
    postId: "post-02",
    authorSlug: "grace-hopper",
    message:
      "Хорошее правило для редакторской проверки: если после удаления блок не оставляет пустоты в смысле, он почти наверняка был декорацией.",
    postedAt: "сегодня, 09:34",
    likes: 24,
  },
  {
    id: "comment-008",
    postId: "post-02",
    authorSlug: "margaret-hamilton",
    message:
      "Это заметно и в сообществе. Короткая лента держится не количеством модулей, а понятными голосами и паузами между ними.",
    postedAt: "сегодня, 09:48",
    likes: 14,
  },
  {
    id: "comment-009",
    postId: "post-03",
    authorSlug: "alan-kay",
    message:
      "Финишные критерии часто забывают именно в задачах на интерфейс. От этого потом появляются красивые экраны без реального маршрута пользователя.",
    postedAt: "вчера, 22:02",
    likes: 26,
  },
  {
    id: "comment-010",
    postId: "post-03",
    authorSlug: "dennis-ritchie",
    message:
      "Именно. Критерий «собралось» не равен критерию «готово». Нужен ещё взгляд на смысл, мобильный режим и связность с остальными страницами.",
    postedAt: "вчера, 22:11",
    likes: 33,
  },
  {
    id: "comment-011",
    postId: "post-04",
    authorSlug: "grace-hopper",
    message:
      "Закреплённый материал здесь работает как редакционная точка входа. Он не обязан быть самым громким, но обязан объяснять, куда дальше идти.",
    postedAt: "вчера, 17:22",
    likes: 21,
  },
  {
    id: "comment-012",
    postId: "post-04",
    authorSlug: "radia-perlman",
    message:
      "А понятные профили помогают удержать не только материал, но и контекст. Пользователь видит, кто говорит и какую практику приносит в обсуждение.",
    postedAt: "вчера, 17:36",
    likes: 18,
  },
];

const contentCommentTemplates: Record<ContentCommentKind, ContentComment[]> = {
  article: [
    {
      authorSlug: "grace-hopper",
      message:
        "Хорошо, что вывод не остаётся на уровне общего наблюдения: его можно прямо перенести в следующий редакционный или продуктовый проход.",
      postedAt: "сегодня, 12:04",
      likes: 17,
    },
    {
      authorSlug: "alan-kay",
      message:
        "Забираю этот принцип в рабочий контур. Особенно полезно, когда нужно объяснить команде, почему быстрый экран ещё не означает цельный продукт.",
      postedAt: "сегодня, 12:18",
      likes: 13,
    },
    {
      authorSlug: "radia-perlman",
      message:
        "Здесь хорошо видна граница между красивой формулировкой и рабочим ограничением. Именно она обычно решает, получится ли повторить результат.",
      postedAt: "вчера, 20:16",
      likes: 21,
    },
  ],
  library: [
    {
      authorSlug: "radia-perlman",
      message:
        "Сохраняю в свой рабочий набор. Ценность такого ресурса в том, что он задаёт границы до начала сборки, а не чинит их в конце.",
      postedAt: "сегодня, 12:32",
      likes: 24,
    },
    {
      authorSlug: "alan-kay",
      message:
        "Полезно, что здесь есть конкретный режим применения. Без него библиотека быстро превращается в список ссылок, к которому никто не возвращается.",
      postedAt: "сегодня, 11:46",
      likes: 16,
    },
    {
      authorSlug: "dennis-ritchie",
      message:
        "Добавил бы это в стартовый пакет для следующего проекта: меньше времени уходит на объяснение очевидных вещей и больше — на само решение.",
      postedAt: "вчера, 19:27",
      likes: 29,
    },
  ],
  test: [
    {
      authorSlug: "margaret-hamilton",
      message:
        "Хороший тест оставляет после себя не ярлык, а следующий шаг. Здесь это как раз читается: результат можно превратить в более точный режим работы.",
      postedAt: "сегодня, 10:58",
      likes: 18,
    },
    {
      authorSlug: "grace-hopper",
      message:
        "Нравится, что проверка не пытается оценить человека целиком. Она берёт один рабочий слой и делает его видимым — этого уже достаточно для полезного вывода.",
      postedAt: "вчера, 18:11",
      likes: 15,
    },
  ],
  rubric: [
    {
      authorSlug: "dennis-ritchie",
      message:
        "Сильная рубрика держится не количеством выпусков, а повторяемым вопросом, на который каждый материал отвечает по-своему.",
      postedAt: "сегодня, 09:44",
      likes: 20,
    },
    {
      authorSlug: "margaret-hamilton",
      message:
        "Эта подборка хорошо работает как точка входа: видно, чего ждать от материалов и с какого можно начать без долгого разогрева.",
      postedAt: "вчера, 16:38",
      likes: 14,
    },
  ],
};

export function getRubricBySlug(slug: string) {
  return rubrics.find((rubric) => rubric.slug === slug);
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getAuthorPostById(id: string) {
  return authorPosts.find((post) => post.id === id);
}

export function getCommunityProfileBySlug(slug: string) {
  return communityProfiles.find((profile) => profile.slug === slug);
}

export function getAuthorPostsByProfile(slug: string) {
  return authorPosts.filter((post) => post.authorSlug === slug);
}

export function getCommunityCommentsByPost(postId: string) {
  return communityComments.filter((comment) => comment.postId === postId);
}

export function getContentComments(kind: ContentCommentKind, slug: string) {
  const templates = contentCommentTemplates[kind];
  const index = [...slug].reduce(
    (value, character) => (value * 31 + character.codePointAt(0)!) >>> 0,
    7,
  ) % templates.length;

  return [templates[index]];
}

export function getArticlesByRubric(slug: string) {
  return articles.filter((article) => article.rubric === slug);
}

export function getTestBySlug(slug: string) {
  return diagnosticTests.find((test) => test.slug === slug);
}

export function getLibraryItemBySlug(slug: string) {
  return libraryItems.find((item) => item.slug === slug);
}

export function getLibraryFolderBySlug(slug: string) {
  return libraryFolders.find((folder) => folder.slug === slug);
}

export function getLibraryItemsBySlugs(slugs: string[]) {
  return slugs.flatMap((slug) => {
    const item = getLibraryItemBySlug(slug);
    return item ? [item] : [];
  });
}
