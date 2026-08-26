import type { Lang } from "@/lib/types";

export const LANG_LABELS: Record<Lang, string> = {
  uk: "УКР",
  en: "ENG",
  ru: "РУС",
};

export const LOCALE_TAGS: Record<Lang, string> = {
  uk: "uk-UA",
  en: "en-US",
  ru: "ru-RU",
};

export interface Dictionary {
  nav: {
    features: string;
    workspace: string;
    pricing: string;
    login: string;
    startFree: string;
  };
  signIn: {
    title: string;
    subtitle: string;
    emailLabel: string;
    passwordLabel: string;
    submitButton: string;
    submittingButton: string;
    demoNote: string;
    closeAria: string;
  };
  footer: {
    tagline: string;
  };
  hero: {
    headlineLine1: string;
    headlineLine2: string;
    subhead: string;
    viewWorkspace: string;
  };
  waitlist: {
    emailPlaceholder: string;
    joining: string;
    join: string;
    genericJoinError: string;
    defaultSuccess: string;
    genericError: string;
  };
  features: {
    eyebrow: string;
    heading: string;
    subhead: string;
    builder: { eyebrow: string; title: string; description: string };
    triggers: { eyebrow: string; title: string; description: string };
    team: { eyebrow: string; title: string; description: string };
  };
  triggerDemo: {
    webhook: string;
    slackNotified: string;
  };
  integrations: {
    strip: string;
  };
  closingCta: {
    heading: string;
    subhead: string;
    startFree: string;
    viewWorkspace: string;
  };
  workspace: {
    loadError: string;
    kindTrigger: string;
    kindLogic: string;
    kindAction: string;
    enabled: string;
    disabled: string;
    enableAria: string;
    disableAria: string;
    skipped: string;
    msUnit: string;
    pipelineTitle: string;
    pipelineSubtitle: string;
    done: string;
    skippedSummary: (n: number) => string;
    runButton: string;
    runningButton: string;
  };
  pricing: {
    eyebrow: string;
    heading: string;
    subhead: string;
    monthly: string;
    yearly: string;
    popularBadge: string;
    custom: string;
    free: string;
    perMonthYearly: string;
    perMonthMonthly: string;
  };
  server: {
    invalidBody: string;
    provideEmail: string;
    invalidEmail: string;
    alreadyJoined: string;
    joined: (position: number) => string;
    automationNotFound: string;
    triggerAlwaysActive: string;
    nodeIdRequired: string;
  };
}

const uk: Dictionary = {
  nav: {
    features: "Можливості",
    workspace: "Робочий простір",
    pricing: "Тарифи",
    login: "Увійти",
    startFree: "Почати безкоштовно",
  },
  signIn: {
    title: "Вхід у Flowbase",
    subtitle: "Демо-форма входу - введіть будь-які дані, щоб продовжити до робочого простору.",
    emailLabel: "Email",
    passwordLabel: "Пароль",
    submitButton: "Увійти",
    submittingButton: "Входимо…",
    demoNote: "Це демо-проєкт - реальна автентифікація не потрібна.",
    closeAria: "Закрити",
  },
  footer: {
    tagline: "Демо-проєкт для портфоліо NexuraDev",
  },
  hero: {
    headlineLine1: "Автоматизуйте робочі процеси,",
    headlineLine2: "не пишучи код",
    subhead:
      "Flowbase з’єднує тригери, логіку та дії у візуальний пайплайн. Кожна нода на схемі вище - реальний крок автоматизації, а не декорація.",
    viewWorkspace: "Переглянути робочий простір",
  },
  waitlist: {
    emailPlaceholder: "you@company.com",
    joining: "Надсилаємо…",
    join: "Приєднатися",
    genericJoinError: "Не вдалося приєднатися до списку очікування.",
    defaultSuccess: "Готово - ми на зв'язку.",
    genericError: "Щось пішло не так.",
  },
  features: {
    eyebrow: "Можливості",
    heading: "Все, що потрібно для автоматизації команди",
    subhead:
      "Візуальний білдер, миттєві тригери та спільна робота над одним пайплайном - без єдиного рядка коду.",
    builder: {
      eyebrow: "Білдер",
      title: "Перетягуйте, з'єднуйте, запускайте",
      description:
        "Кожен крок - окрема нода на полотні. З'єднуйте тригери, умови й дії візуально, без коду та YAML-конфігів.",
    },
    triggers: {
      eyebrow: "Тригери",
      title: "Реакція за мілісекунди",
      description:
        "Webhook, розклад або подія в іншому сервісі - пайплайн запускається миттєво, щойно щось трапляється.",
    },
    team: {
      eyebrow: "Команда",
      title: "Спільне полотно в реальному часі",
      description:
        "Кілька людей редагують один пайплайн одночасно й бачать курсори одне одного - як у Figma, тільки для автоматизацій.",
    },
  },
  triggerDemo: {
    webhook: "Webhook",
    slackNotified: "Slack сповіщено",
  },
  integrations: {
    strip: "З’єднується з інструментами, якими ви вже користуєтесь",
  },
  closingCta: {
    heading: "Зберіть перший пайплайн за 10 хвилин",
    subhead: "Без картки, без інсталяцій. Почніть з готового шаблону або з чистого полотна.",
    startFree: "Почати безкоштовно",
    viewWorkspace: "Переглянути робочий простір",
  },
  workspace: {
    loadError: "Не вдалося завантажити пайплайн.",
    kindTrigger: "Trigger",
    kindLogic: "Логіка",
    kindAction: "Дія",
    enabled: "Увімкнено",
    disabled: "Вимкнено",
    enableAria: "Увімкнути",
    disableAria: "Вимкнути",
    skipped: "пропущено",
    msUnit: "мс",
    pipelineTitle: "Онбординг нових клієнтів",
    pipelineSubtitle: "7 автоматизацій · останній запуск щойно",
    done: "виконано",
    skippedSummary: (n) => ` · ${n} пропущено`,
    runButton: "Запустити пайплайн",
    runningButton: "Виконується…",
  },
  pricing: {
    eyebrow: "Тарифи",
    heading: "Прозорі ціни, які ростуть разом із командою",
    subhead: "Почніть безкоштовно. Оновіться, коли автоматизацій стане більше.",
    monthly: "Щомісяця",
    yearly: "Щороку",
    popularBadge: "Популярний вибір",
    custom: "За запитом",
    free: "Безкоштовно",
    perMonthYearly: "/ міс, оплата щороку",
    perMonthMonthly: "/ міс, оплата щомісяця",
  },
  server: {
    invalidBody: "Некоректне тіло запиту.",
    provideEmail: "Вкажіть email.",
    invalidEmail: "Це не схоже на дійсний email.",
    alreadyJoined: "Ви вже у списку очікування.",
    joined: (position) => `Готово - ви #${position} у списку очікування.`,
    automationNotFound: "Автоматизацію не знайдено.",
    triggerAlwaysActive: "Тригер завжди активний.",
    nodeIdRequired: "Поле nodeId є обов'язковим.",
  },
};

const en: Dictionary = {
  nav: {
    features: "Features",
    workspace: "Workspace",
    pricing: "Pricing",
    login: "Log in",
    startFree: "Start for free",
  },
  signIn: {
    title: "Sign in to Flowbase",
    subtitle: "Demo sign-in form - enter anything to continue to the workspace.",
    emailLabel: "Email",
    passwordLabel: "Password",
    submitButton: "Sign in",
    submittingButton: "Signing in…",
    demoNote: "This is a portfolio demo - no real authentication happens.",
    closeAria: "Close",
  },
  footer: {
    tagline: "Portfolio demo project for NexuraDev",
  },
  hero: {
    headlineLine1: "Automate your workflows,",
    headlineLine2: "without writing code",
    subhead:
      "Flowbase connects triggers, logic, and actions into a visual pipeline. Every node in the diagram above is a real automation step, not a decoration.",
    viewWorkspace: "View the workspace",
  },
  waitlist: {
    emailPlaceholder: "you@company.com",
    joining: "Sending…",
    join: "Join waitlist",
    genericJoinError: "Couldn't join the waitlist.",
    defaultSuccess: "You're in - we'll be in touch.",
    genericError: "Something went wrong.",
  },
  features: {
    eyebrow: "Features",
    heading: "Everything your team needs to automate work",
    subhead: "A visual builder, instant triggers, and real-time collaboration on a single pipeline - without a line of code.",
    builder: {
      eyebrow: "Builder",
      title: "Drag, connect, run",
      description:
        "Every step is its own node on the canvas. Connect triggers, conditions, and actions visually - no code, no YAML configs.",
    },
    triggers: {
      eyebrow: "Triggers",
      title: "Millisecond reaction time",
      description:
        "A webhook, a schedule, or an event from another service - your pipeline fires instantly the moment something happens.",
    },
    team: {
      eyebrow: "Team",
      title: "A shared canvas, in real time",
      description:
        "Multiple people edit the same pipeline at once and see each other's cursors - like Figma, but for automations.",
    },
  },
  triggerDemo: {
    webhook: "Webhook",
    slackNotified: "Slack notified",
  },
  integrations: {
    strip: "Connects with the tools you already use",
  },
  closingCta: {
    heading: "Build your first pipeline in 10 minutes",
    subhead: "No card, no installs. Start from a ready-made template or a blank canvas.",
    startFree: "Start for free",
    viewWorkspace: "View the workspace",
  },
  workspace: {
    loadError: "Couldn't load the pipeline.",
    kindTrigger: "Trigger",
    kindLogic: "Logic",
    kindAction: "Action",
    enabled: "Enabled",
    disabled: "Disabled",
    enableAria: "Enable",
    disableAria: "Disable",
    skipped: "skipped",
    msUnit: "ms",
    pipelineTitle: "New client onboarding",
    pipelineSubtitle: "7 automations · last run just now",
    done: "done",
    skippedSummary: (n) => ` · ${n} skipped`,
    runButton: "Run pipeline",
    runningButton: "Running…",
  },
  pricing: {
    eyebrow: "Pricing",
    heading: "Transparent pricing that grows with your team",
    subhead: "Start for free. Upgrade as your automations grow.",
    monthly: "Monthly",
    yearly: "Yearly",
    popularBadge: "Most popular",
    custom: "Custom",
    free: "Free",
    perMonthYearly: "/ mo, billed yearly",
    perMonthMonthly: "/ mo, billed monthly",
  },
  server: {
    invalidBody: "Invalid request body.",
    provideEmail: "Please provide an email.",
    invalidEmail: "That doesn't look like a valid email.",
    alreadyJoined: "You're already on the waitlist.",
    joined: (position) => `Done - you're #${position} on the waitlist.`,
    automationNotFound: "Automation not found.",
    triggerAlwaysActive: "Triggers are always active.",
    nodeIdRequired: "The nodeId field is required.",
  },
};

const ru: Dictionary = {
  nav: {
    features: "Возможности",
    workspace: "Рабочее пространство",
    pricing: "Тарифы",
    login: "Войти",
    startFree: "Начать бесплатно",
  },
  signIn: {
    title: "Вход в Flowbase",
    subtitle: "Демо-форма входа - введите любые данные, чтобы продолжить в рабочее пространство.",
    emailLabel: "Email",
    passwordLabel: "Пароль",
    submitButton: "Войти",
    submittingButton: "Входим…",
    demoNote: "Это демо-проект - реальная аутентификация не нужна.",
    closeAria: "Закрыть",
  },
  footer: {
    tagline: "Демо-проект для портфолио NexuraDev",
  },
  hero: {
    headlineLine1: "Автоматизируйте рабочие процессы,",
    headlineLine2: "не пиша код",
    subhead:
      "Flowbase соединяет триггеры, логику и действия в визуальный пайплайн. Каждая нода на схеме выше - реальный шаг автоматизации, а не декорация.",
    viewWorkspace: "Посмотреть рабочее пространство",
  },
  waitlist: {
    emailPlaceholder: "you@company.com",
    joining: "Отправляем…",
    join: "Присоединиться",
    genericJoinError: "Не удалось присоединиться к списку ожидания.",
    defaultSuccess: "Готово - мы на связи.",
    genericError: "Что-то пошло не так.",
  },
  features: {
    eyebrow: "Возможности",
    heading: "Всё, что нужно для автоматизации команды",
    subhead: "Визуальный билдер, мгновенные триггеры и совместная работа над одним пайплайном - без единой строки кода.",
    builder: {
      eyebrow: "Билдер",
      title: "Перетаскивайте, соединяйте, запускайте",
      description:
        "Каждый шаг - отдельная нода на полотне. Соединяйте триггеры, условия и действия визуально, без кода и YAML-конфигов.",
    },
    triggers: {
      eyebrow: "Триггеры",
      title: "Реакция за миллисекунды",
      description:
        "Webhook, расписание или событие в другом сервисе - пайплайн запускается мгновенно, как только что-то происходит.",
    },
    team: {
      eyebrow: "Команда",
      title: "Общее полотно в реальном времени",
      description:
        "Несколько человек редактируют один пайплайн одновременно и видят курсоры друг друга - как в Figma, только для автоматизаций.",
    },
  },
  triggerDemo: {
    webhook: "Webhook",
    slackNotified: "Slack уведомлён",
  },
  integrations: {
    strip: "Соединяется с инструментами, которыми вы уже пользуетесь",
  },
  closingCta: {
    heading: "Соберите первый пайплайн за 10 минут",
    subhead: "Без карты, без установок. Начните с готового шаблона или с чистого полотна.",
    startFree: "Начать бесплатно",
    viewWorkspace: "Посмотреть рабочее пространство",
  },
  workspace: {
    loadError: "Не удалось загрузить пайплайн.",
    kindTrigger: "Trigger",
    kindLogic: "Логика",
    kindAction: "Действие",
    enabled: "Включено",
    disabled: "Выключено",
    enableAria: "Включить",
    disableAria: "Выключить",
    skipped: "пропущено",
    msUnit: "мс",
    pipelineTitle: "Онбординг новых клиентов",
    pipelineSubtitle: "7 автоматизаций · последний запуск только что",
    done: "выполнено",
    skippedSummary: (n) => ` · ${n} пропущено`,
    runButton: "Запустить пайплайн",
    runningButton: "Выполняется…",
  },
  pricing: {
    eyebrow: "Тарифы",
    heading: "Прозрачные цены, которые растут вместе с командой",
    subhead: "Начните бесплатно. Обновляйтесь, когда автоматизаций станет больше.",
    monthly: "Ежемесячно",
    yearly: "Ежегодно",
    popularBadge: "Популярный выбор",
    custom: "По запросу",
    free: "Бесплатно",
    perMonthYearly: "/ мес, оплата ежегодно",
    perMonthMonthly: "/ мес, оплата ежемесячно",
  },
  server: {
    invalidBody: "Некорректное тело запроса.",
    provideEmail: "Укажите email.",
    invalidEmail: "Это не похоже на настоящий email.",
    alreadyJoined: "Вы уже в списке ожидания.",
    joined: (position) => `Готово - вы #${position} в списке ожидания.`,
    automationNotFound: "Автоматизация не найдена.",
    triggerAlwaysActive: "Триггер всегда активен.",
    nodeIdRequired: "Поле nodeId обязательно.",
  },
};

export const DICTIONARIES: Record<Lang, Dictionary> = { uk, en, ru };
