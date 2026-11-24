"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

type FieldName = "name" | "organisation" | "email" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const { form } = home.contact;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = form.errors.name;
  if (!emailPattern.test(values.email.trim())) errors.email = form.errors.email;
  if (values.message.trim().length < 20) errors.message = form.errors.message;
  return errors;
}

const fieldClass =
  "h-12 rounded-xl border-brown-950/15 bg-ivory px-4 text-base text-brown-950 placeholder:text-brown-500/80 focus-visible:border-gold-500 focus-visible:ring-gold-500/25 aria-invalid:border-destructive";

export function EnquiryForm() {
  const id = useId();
  const [values, setValues] = useState<Values>({ name: "", organisation: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<string | null>(null);
  const refs = useRef<Partial<Record<FieldName, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  const update = (field: FieldName) => (event: { target: { value: string } }) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (field !== "organisation" && errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (["name", "email", "message"] as const).find((field) => found[field]);
    if (firstInvalid) {
      setStatus(null);
      refs.current[firstInvalid]?.focus();
      return;
    }
    // TODO(go-live): send the enquiry to KeyPMC's inbox once an address is supplied.
    setStatus(form.notConnected);
  };

  const errorId = (field: keyof Errors) => `${id}-${field}-error`;
  const describedBy = (field: keyof Errors) => (errors[field] ? errorId(field) : undefined);

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-[1.5rem] bg-white p-6 shadow-[0_1px_0_var(--color-border)] sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${id}-name`} className="text-brown-950">
            {form.fields.name.label}
          </Label>
          <Input
            id={`${id}-name`}
            ref={(el) => {
              refs.current.name = el;
            }}
            name="name"
            autoComplete="name"
            placeholder={form.fields.name.placeholder}
            value={values.name}
            onChange={update("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={fieldClass}
          />
          {errors.name ? (
            <p id={errorId("name")} className="text-sm text-destructive">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${id}-organisation`} className="text-brown-950">
            {form.fields.organisation.label}
          </Label>
          <Input
            id={`${id}-organisation`}
            name="organisation"
            autoComplete="organization"
            placeholder={form.fields.organisation.placeholder}
            value={values.organisation}
            onChange={update("organisation")}
            className={fieldClass}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={`${id}-email`} className="text-brown-950">
            {form.fields.email.label}
          </Label>
          <Input
            id={`${id}-email`}
            ref={(el) => {
              refs.current.email = el;
            }}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={form.fields.email.placeholder}
            value={values.email}
            onChange={update("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={fieldClass}
          />
          {errors.email ? (
            <p id={errorId("email")} className="text-sm text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={`${id}-message`} className="text-brown-950">
            {form.fields.message.label}
          </Label>
          <Textarea
            id={`${id}-message`}
            ref={(el) => {
              refs.current.message = el;
            }}
            name="message"
            rows={5}
            placeholder={form.fields.message.placeholder}
            value={values.message}
            onChange={update("message")}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message")}
            className={cn(fieldClass, "h-auto min-h-32 py-3")}
          />
          {errors.message ? (
            <p id={errorId("message")} className="text-sm text-destructive">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-brown-950 px-7 py-3.5 font-medium text-cream transition-colors hover:bg-brown-700"
        >
          {form.submit}
          <Send aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>

      <p role="status" className={cn("text-sm leading-relaxed text-brown-700", status && "mt-5 rounded-xl bg-cream p-4")}>
        {status}
      </p>
    </form>
  );
}
