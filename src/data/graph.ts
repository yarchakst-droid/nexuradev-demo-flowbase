import type { LocalizedText } from "@/lib/types";

export type NodeKind = "trigger" | "logic" | "action";

export interface GraphNode {
  id: string;
  kind: NodeKind;
  label: LocalizedText;
  position: [number, number, number];
}

export interface GraphEdge {
  from: string;
  to: string;
}

const tt = (uk: string, en: string, ru: string): LocalizedText => ({ uk, en, ru });

export const graphNodes: GraphNode[] = [
  { id: "t1", kind: "trigger", label: tt("Нова форма", "New form", "Новая форма"), position: [-4.2, 1.6, 0.4] },
  { id: "t2", kind: "trigger", label: tt("Webhook", "Webhook", "Webhook"), position: [-4.6, -0.6, -0.8] },
  { id: "t3", kind: "trigger", label: tt("Розклад: щогодини", "Schedule: hourly", "Расписание: ежечасно"), position: [-3.8, 0.3, 1.6] },
  { id: "t4", kind: "trigger", label: tt("Новий рядок у таблиці", "New spreadsheet row", "Новая строка в таблице"), position: [-4.4, -1.8, 0.6] },

  { id: "l1", kind: "logic", label: tt("Фільтр", "Filter", "Фильтр"), position: [-1.6, 1.2, -0.6] },
  { id: "l2", kind: "logic", label: tt("Трансформація даних", "Data transform", "Трансформация данных"), position: [-0.8, -0.4, 0.8] },
  { id: "l3", kind: "logic", label: tt("Якщо / інакше", "If / else", "Если / иначе"), position: [0.2, 1.8, 0.2] },
  { id: "l4", kind: "logic", label: tt("Об'єднання", "Merge", "Объединение"), position: [-1.2, -1.6, -0.4] },
  { id: "l5", kind: "logic", label: tt("Затримка", "Delay", "Задержка"), position: [0.6, -1.0, 1.2] },
  { id: "l6", kind: "logic", label: tt("Цикл", "Loop", "Цикл"), position: [1.4, 0.6, -1.0] },

  { id: "a1", kind: "action", label: tt("Повідомлення в Slack", "Slack message", "Сообщение в Slack"), position: [3.6, 1.4, 0.4] },
  { id: "a2", kind: "action", label: tt("Запис у CRM", "CRM record", "Запись в CRM"), position: [4.2, -0.4, -0.6] },
  { id: "a3", kind: "action", label: tt("Надіслати email", "Send email", "Отправить email"), position: [3.2, -1.6, 0.8] },
  { id: "a4", kind: "action", label: tt("Оновити базу даних", "Update database", "Обновить базу данных"), position: [4.6, 0.4, 1.2] },
];

export const graphEdges: GraphEdge[] = [
  { from: "t1", to: "l1" },
  { from: "t2", to: "l1" },
  { from: "t2", to: "l4" },
  { from: "t3", to: "l2" },
  { from: "t4", to: "l4" },
  { from: "l1", to: "l3" },
  { from: "l2", to: "l3" },
  { from: "l2", to: "l5" },
  { from: "l4", to: "l5" },
  { from: "l3", to: "l6" },
  { from: "l3", to: "a1" },
  { from: "l5", to: "a3" },
  { from: "l5", to: "a2" },
  { from: "l6", to: "a1" },
  { from: "l6", to: "a4" },
  { from: "l2", to: "a2" },
];
