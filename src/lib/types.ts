export type Lang = "uk" | "en" | "ru";

export type LocalizedText = Record<Lang, string>;

export type AutomationKind = "trigger" | "logic" | "action";

export interface AutomationNode {
  id: string;
  kind: AutomationKind;
  title: LocalizedText;
  subtitle: LocalizedText;
  enabled: boolean;
  x: number;
  y: number;
}

export interface AutomationConnection {
  from: string;
  to: string;
}

export interface RunStep {
  nodeId: string;
  status: "success" | "skipped";
  durationMs: number;
}
