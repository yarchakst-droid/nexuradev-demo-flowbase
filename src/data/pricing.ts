import type { LocalizedText } from "@/lib/types";

const tt = (uk: string, en: string, ru: string): LocalizedText => ({ uk, en, ru });

export interface PricingTier {
  id: string;
  name: string;
  tagline: LocalizedText;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  highlighted: boolean;
  features: LocalizedText[];
  cta: LocalizedText;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: tt(
      "Для перших автоматизацій та особистих проєктів",
      "For your first automations and personal projects",
      "Для первых автоматизаций и личных проектов"
    ),
    monthlyPrice: 0,
    yearlyPrice: 0,
    highlighted: false,
    features: [
      tt("До 3 активних пайплайнів", "Up to 3 active pipelines", "До 3 активных пайплайнов"),
      tt("1 000 запусків на місяць", "1,000 runs per month", "1 000 запусков в месяц"),
      tt("Базові тригери та інтеграції", "Basic triggers and integrations", "Базовые триггеры и интеграции"),
      tt("1 користувач", "1 user", "1 пользователь"),
    ],
    cta: tt("Почати безкоштовно", "Start for free", "Начать бесплатно"),
  },
  {
    id: "team",
    name: "Team",
    tagline: tt(
      "Для команд, що автоматизують щоденні процеси",
      "For teams automating everyday processes",
      "Для команд, автоматизирующих ежедневные процессы"
    ),
    monthlyPrice: 49,
    yearlyPrice: 39,
    highlighted: true,
    features: [
      tt("Необмежені пайплайни", "Unlimited pipelines", "Неограниченные пайплайны"),
      tt("50 000 запусків на місяць", "50,000 runs per month", "50 000 запусков в месяц"),
      tt("Усі інтеграції та вебхуки", "All integrations and webhooks", "Все интеграции и вебхуки"),
      tt("До 10 користувачів", "Up to 10 users", "До 10 пользователей"),
      tt("Спільне редагування в реальному часі", "Real-time collaborative editing", "Совместное редактирование в реальном времени"),
      tt("Пріоритетна підтримка", "Priority support", "Приоритетная поддержка"),
    ],
    cta: tt("Спробувати 14 днів", "Try free for 14 days", "Попробовать 14 дней"),
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: tt(
      "Для великих організацій з власними вимогами",
      "For large organizations with custom requirements",
      "Для крупных организаций с собственными требованиями"
    ),
    monthlyPrice: null,
    yearlyPrice: null,
    highlighted: false,
    features: [
      tt("Необмежені запуски", "Unlimited runs", "Неограниченные запуски"),
      tt("SSO та SCIM", "SSO and SCIM", "SSO и SCIM"),
      tt("Виділена інфраструктура", "Dedicated infrastructure", "Выделенная инфраструктура"),
      tt("Кастомні SLA", "Custom SLAs", "Кастомные SLA"),
      tt("Персональний менеджер", "Dedicated account manager", "Персональный менеджер"),
    ],
    cta: tt("Звернутися до відділу продажів", "Contact sales", "Связаться с отделом продаж"),
  },
];
