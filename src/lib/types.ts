import type { Currency } from "../config";

export interface ClientState {
  name: string;
  profession: string;
  incomeA: number; // в USD
  incomeB: number; // в USD
  termMonths: number;
  employment: string;
  currency: Currency;
  notes: Record<string, string>;
  /** Блок 2: рівні 1–5 по напрямках (0 = не обрано) */
  levels: Record<string, number>;
  /** Блок 3: пріоритет інструменту, ключ "група:номер" */
  tools: Record<string, ToolMark>;
  /** Блок 5: план */
  steps: PlanStep[];
  /** Вільні коментарі: state, tools, plan, self, team */
  texts: Record<string, string>;
}

export type ToolMark = "urgent" | "important" | "later";

/** Етап плану: діапазон дат (YYYY-MM-DD) + що робимо. c — індекс кольору. */
export interface PlanStep {
  id: string;
  from: string;
  to: string;
  text: string;
  c: number;
}

/** Пустое состояние: так выглядит карта при первом заходе и после «Очистить». */
export const initialState: ClientState = {
  name: "",
  profession: "",
  incomeA: 0,
  incomeB: 0,
  termMonths: 0,
  employment: "",
  currency: "KZT",
  notes: {},
  levels: {},
  tools: {},
  steps: [],
  texts: {},
};
