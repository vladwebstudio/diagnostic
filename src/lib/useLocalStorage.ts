import { useCallback, useEffect, useState } from "react";

/** useState, который сохраняется в localStorage (безопасно, если хранилище недоступно). */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return initial;
      const saved = { ...initial, ...JSON.parse(raw) } as T & { currency?: string; incomeA?: number; incomeB?: number };
      // Старые данные (напр. удалённая валюта) или битые числа -> сбрасываем суммы и валюту
      const okCur = ["USD", "UAH", "EUR"].includes(String(saved.currency));
      const okNum = Number.isFinite(saved.incomeA) && Number.isFinite(saved.incomeB);
      if (!okCur || !okNum) {
        const init = initial as unknown as { currency: string; incomeA: number; incomeB: number };
        return { ...saved, currency: init.currency, incomeA: init.incomeA, incomeB: init.incomeB } as T;
      }
      return saved as T;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      // Пустое состояние не храним: после «Очистить» в localStorage ничего не остаётся.
      if (JSON.stringify(value) === JSON.stringify(initial)) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, value]);

  /** Удаляет сохранённые данные и возвращает пустое состояние. */
  const clear = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    setValue(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue, clear] as const;
}
