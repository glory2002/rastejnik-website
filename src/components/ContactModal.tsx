"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/Button";
import { Body, Heading, Label } from "@/components/ui/Typography";

type ContactContextValue = {
  openContact: () => void;
  closeContact: () => void;
};

const ContactContext = createContext<ContactContextValue | null>(null);

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    throw new Error("useContact must be used within ContactProvider");
  }
  return ctx;
}

const inputClassName =
  "w-full border-[1.5px] border-border-green bg-white px-4 py-3 text-base text-primary-dark outline-none transition-colors focus:border-primary";

function ContactFormModal({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const canSend =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    message.trim().length > 0;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canSend) return;
    setSent(true);
  }

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-primary-dark/40 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[min(90dvh,720px)] w-full max-w-[520px] overflow-y-auto bg-white p-6 shadow-[0_16px_48px_rgba(31,66,35,0.2)] md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Затвори"
          className="absolute right-4 top-4 text-[22px] leading-none text-primary-dark/50 transition-opacity hover:opacity-70"
        >
          ×
        </button>

        <div className="flex flex-col gap-6 pr-4">
          <div className="flex flex-col gap-1">
            <Heading as="h2" size="sm" id={titleId}>
              Свържете се с нас
            </Heading>
            <Body tone="muted" className="text-action leading-[1.4]">
              Пишете ни — с удоволствие ще отговорим.
            </Body>
          </div>

          {sent ? (
            <div className="flex flex-col gap-6">
              <p className="bg-primary-light-solid px-5 py-4 text-base font-bold leading-[1.4] text-primary-dark">
                Благодарим! Съобщението е записано — ще се свържем скоро.
              </p>
              <Button size="l" showArrow={false} onClick={onClose}>
                Затвори
              </Button>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2">
                <Label>Име</Label>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClassName}
                />
              </label>

              <label className="flex flex-col gap-2">
                <Label>Имейл</Label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClassName}
                />
              </label>

              <label className="flex flex-col gap-2">
                <Label>Съобщение</Label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClassName} resize-y min-h-[120px]`}
                />
              </label>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="l"
                  showArrow={false}
                  disabled={!canSend}
                  className="w-full"
                >
                  Изпрати
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openContact = useCallback(() => setOpen(true), []);
  const closeContact = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function maybeOpenFromHash() {
      if (window.location.hash === "#contact") {
        setOpen(true);
      }
    }

    maybeOpenFromHash();
    window.addEventListener("hashchange", maybeOpenFromHash);
    return () => window.removeEventListener("hashchange", maybeOpenFromHash);
  }, []);

  useEffect(() => {
    if (!open) return;
    if (window.location.hash === "#contact") {
      history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
  }, [open]);

  return (
    <ContactContext.Provider value={{ openContact, closeContact }}>
      {children}
      {open ? <ContactFormModal onClose={closeContact} /> : null}
    </ContactContext.Provider>
  );
}

/** Text/button that opens the contact popup. */
export function ContactTrigger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { openContact } = useContact();
  return (
    <button type="button" onClick={openContact} className={className}>
      {children}
    </button>
  );
}

/** Primary CTA that opens the contact popup. */
export function ContactButton({
  children = "свържи се с нас",
  size = "xl",
  className = "",
  showArrow = true,
}: {
  children?: ReactNode;
  size?: "xl" | "l";
  className?: string;
  showArrow?: boolean;
}) {
  const { openContact } = useContact();
  return (
    <Button
      size={size}
      showArrow={showArrow}
      className={className}
      onClick={openContact}
    >
      {children}
    </Button>
  );
}
