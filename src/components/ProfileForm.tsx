import { config } from "../config";
import type { ClientState } from "../lib/types";
import MoneySlider from "./MoneySlider";
import Segmented from "./Segmented";
import Select from "./Select";

interface Props {
  state: ClientState;
  update: (patch: Partial<ClientState>) => void;
}

const label = "mb-2 block text-[0.6875rem] font-semibold tracking-[0.14em] text-slate-500";
const input =
  "w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-ink focus:bg-white";

export default function ProfileForm({ state, update }: Props) {
  const { intro } = config;

  return (
    <section className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-line sm:p-6">
      <div className="grid gap-x-14 gap-y-5 lg:grid-cols-2">
       <div className="space-y-5">
        <div>
          <label className={label} htmlFor="client-name">{intro.nameLabel}</label>
          <input
            id="client-name"
            className={input}
            placeholder={intro.namePlaceholder}
            value={state.name}
            onChange={(e) => update({ name: e.target.value })}
          />
        </div>

        <div>
          <label className={label} htmlFor="profession">{intro.professionLabel}</label>
          <Select
            id="profession"
            value={state.profession}
            options={config.professions}
            placeholder={intro.professionPlaceholder}
            onChange={(profession) => update({ profession })}
          />
        </div>

       </div>
       <div className="space-y-5">
        <MoneySlider
          label={intro.incomeALabel}
          tone="rose"
          usd={state.incomeA}
          maxUsd={config.limits.incomeA}
          currency={state.currency}
          onChange={(incomeA) => update({ incomeA })}
        />
        <div>
          <span className={label}>{intro.timeLabel}</span>
          <Segmented
            options={intro.terms.map((t) => ({ label: t.label, value: t.months }))}
            value={state.termMonths || ""}
            onChange={(termMonths) => update({ termMonths })}
          />
        </div>
       </div>
      </div>
    </section>
  );
}
