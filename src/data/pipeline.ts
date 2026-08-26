import type { AutomationConnection, AutomationNode, LocalizedText } from "@/lib/types";

const tt = (uk: string, en: string, ru: string): LocalizedText => ({ uk, en, ru });

export const pipelineNodes: AutomationNode[] = [
  {
    id: "n1",
    kind: "trigger",
    title: tt("Нова реєстрація", "New signup", "Новая регистрация"),
    subtitle: tt("Trigger · Форма реєстрації", "Trigger · Signup form", "Trigger · Форма регистрации"),
    enabled: true,
    x: 12,
    y: 42,
  },
  {
    id: "n2",
    kind: "logic",
    title: tt("Перевірити домен email", "Check email domain", "Проверить домен email"),
    subtitle: tt("Умова", "Condition", "Условие"),
    enabled: true,
    x: 30,
    y: 42,
  },
  {
    id: "n3",
    kind: "logic",
    title: tt("Розгалуження за планом", "Branch by plan", "Ветвление по плану"),
    subtitle: tt("If / else", "If / else", "If / else"),
    enabled: true,
    x: 48,
    y: 42,
  },
  {
    id: "n4",
    kind: "action",
    title: tt("Вітальний email", "Welcome email", "Приветственный email"),
    subtitle: tt("Action · Email", "Action · Email", "Action · Email"),
    enabled: true,
    x: 66,
    y: 16,
  },
  {
    id: "n5",
    kind: "action",
    title: tt("Створити картку в CRM", "Create CRM record", "Создать карточку в CRM"),
    subtitle: tt("Action · HubSpot", "Action · HubSpot", "Action · HubSpot"),
    enabled: true,
    x: 66,
    y: 64,
  },
  {
    id: "n6",
    kind: "action",
    title: tt("Додати в Slack-канал", "Add to Slack channel", "Добавить в Slack-канал"),
    subtitle: tt("Action · Slack", "Action · Slack", "Action · Slack"),
    enabled: false,
    x: 84,
    y: 44,
  },
  {
    id: "n7",
    kind: "action",
    title: tt("Запланувати дзвінок", "Schedule a call", "Запланировать звонок"),
    subtitle: tt("Action · Calendar", "Action · Calendar", "Action · Calendar"),
    enabled: true,
    x: 84,
    y: 82,
  },
];

export const pipelineConnections: AutomationConnection[] = [
  { from: "n1", to: "n2" },
  { from: "n2", to: "n3" },
  { from: "n3", to: "n4" },
  { from: "n3", to: "n5" },
  { from: "n5", to: "n6" },
  { from: "n5", to: "n7" },
];
