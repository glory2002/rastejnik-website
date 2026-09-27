"use client";

import { useState } from "react";
import { DateInput } from "@/components/ui/DateInput";
import { NumberInput } from "@/components/ui/NumberInput";
import { Select } from "@/components/ui/Select";
import { Label } from "@/components/ui/Typography";

export function FormDemo() {
  const [interval, setInterval] = useState("");
  const [count, setCount] = useState("2");
  const [birthDate, setBirthDate] = useState("2024-03-12");

  return (
    <div className="grid max-w-3xl gap-8 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <Label>Интервал</Label>
        <Select
          value={interval}
          onChange={setInterval}
          placeholder="Изберете…"
          options={["0–3 месеца", "3–6 месеца", "6–12 месеца", "12–24 месеца"]}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Брой деца</Label>
        <NumberInput
          min={1}
          max={8}
          value={count}
          onChange={(event) => setCount(event.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label tone="muted">Неактивен select</Label>
        <Select
          value=""
          onChange={() => undefined}
          placeholder="Изберете…"
          options={["Една опция"]}
          disabled
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label tone="muted">Неактивно поле</Label>
        <NumberInput min={1} max={8} value="1" disabled />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Име</Label>
        <input
          type="text"
          placeholder="Име"
          className="w-full border-[1.5px] border-border-green bg-white px-4 py-3 text-base text-primary-dark outline-none transition-colors placeholder:text-primary-dark/40 focus:border-primary"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Дата на раждане</Label>
        <DateInput
          aria-label="Дата на раждане"
          value={birthDate}
          onChange={setBirthDate}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Съобщение</Label>
        <textarea
          placeholder="Съобщение"
          className="min-h-[120px] w-full resize-y border-[1.5px] border-border-green bg-white px-4 py-3 text-base text-primary-dark outline-none transition-colors placeholder:text-primary-dark/40 focus:border-primary"
        />
      </div>
    </div>
  );
}
