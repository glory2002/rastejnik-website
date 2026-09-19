"use client";

import { useEffect, useState, type FormEvent, type InputHTMLAttributes } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { NumberInput } from "@/components/ui/NumberInput";
import { FormSelect } from "@/components/ui/Select";
import { Action, Body, Label } from "@/components/ui/Typography";
import { login, useMockAuth } from "@/lib/authMock";
import {
  loadProfile,
  saveProfile,
  type ParentProfile,
} from "@/lib/profileMock";

const inputClassName =
  "w-full border-[1.5px] border-border-green bg-white px-4 py-3 text-base text-primary-dark outline-none transition-colors focus:border-primary";

function FormField({
  label,
  className = "",
  type,
  ...props
}: { label: string; className?: string } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className"
>) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <Label>{label}</Label>
      {type === "number" ? (
        <NumberInput {...props} />
      ) : (
        <input type={type} {...props} className={inputClassName} />
      )}
    </label>
  );
}

export function ProfileView() {
  const loggedIn = useMockAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<ParentProfile | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  function update<K extends keyof ParentProfile>(key: K, value: ParentProfile[K]) {
    setProfile((prev) => (prev ? { ...prev, [key]: value } : prev));
    setSaved(false);
  }

  function handleSave(event: FormEvent) {
    event.preventDefault();
    if (!profile) return;
    saveProfile(profile);
    setSaved(true);
  }

  if (!loggedIn) {
    return (
      <div className="flex flex-col items-start gap-6">
        <Body className="max-w-[480px]">
          Влезте в профила си, за да видите и редактирате данните си.
        </Body>
        <Button
          size="l"
          onClick={() => {
            login();
            router.refresh();
          }}
        >
          Вход
        </Button>
      </div>
    );
  }

  if (!profile) {
    return (
      <p className="text-base text-primary-dark/60">Зареждане…</p>
    );
  }

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSave}>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Имейл"
          type="email"
          autoComplete="email"
          value={profile.email}
          onChange={(e) => update("email", e.target.value)}
          className="sm:col-span-2"
        />
        <FormField
          label="Имена"
          autoComplete="name"
          value={profile.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <FormField
          label="Дата на раждане"
          type="date"
          value={profile.birthDate}
          onChange={(e) => update("birthDate", e.target.value)}
        />
        <FormSelect
          label="Пол"
          options={["Жена", "Мъж", "Друго"]}
          value={profile.gender}
          onChange={(value) => update("gender", value)}
        />
        <FormField
          label="Етнос"
          value={profile.ethnicity}
          onChange={(e) => update("ethnicity", e.target.value)}
        />
        <FormField
          label="Семейно положение"
          value={profile.maritalStatus}
          onChange={(e) => update("maritalStatus", e.target.value)}
        />
        <FormSelect
          label="Вие сте"
          options={["Родител", "Приемен родител", "Настойник"]}
          value={profile.role}
          onChange={(value) => update("role", value)}
        />
        <FormField
          label="Населено място"
          value={profile.city}
          onChange={(e) => update("city", e.target.value)}
        />
        <FormField
          label="Образование"
          value={profile.education}
          onChange={(e) => update("education", e.target.value)}
        />
        <FormField
          label="Участие на разширеното семейство в грижата за децата"
          className="sm:col-span-2"
          value={profile.extendedFamily}
          onChange={(e) => update("extendedFamily", e.target.value)}
        />
        <FormField
          label="Брой деца в домакинството"
          type="number"
          min={0}
          value={profile.childrenCount}
          onChange={(e) => update("childrenCount", e.target.value)}
        />
      </div>

      {saved ? (
        <p className="bg-primary-light-solid px-5 py-4 text-base font-bold leading-[1.4] text-primary-dark">
          Промените са запазени.
        </p>
      ) : null}

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="l" showArrow={false}>
          Запази промените
        </Button>
        <Action
          as={Link}
          href="/dashboard"
          className="transition-opacity hover:opacity-80"
        >
          Към таблото
        </Action>
      </div>
    </form>
  );
}
