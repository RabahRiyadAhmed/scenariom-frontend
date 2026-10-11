"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  UiButton,
  UiCard,
  UiCardBody,
  UiCheckbox,
  UiIcon,
  UiPasswordField,
  UiProgress,
  UiTextField,
} from "@scenariom/design-system/ui";

const steps = ["Account", "Profile", "Finish"] as const;

type WizardValues = {
  email: string;
  password: string;
  repassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  remember: boolean;
  terms: boolean;
};

const initialValues: WizardValues = {
  email: "",
  password: "12345",
  repassword: "12345",
  firstName: "",
  lastName: "",
  phone: "",
  remember: false,
  terms: false,
};

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return <UiCard><UiCardBody><h2 className="text-base font-semibold text-foreground">{title}</h2><div className="mt-5">{children}</div></UiCardBody></UiCard>;
}

function WizardSteps({ current, compact = false }: { current: number; compact?: boolean }) {
  return <div className="flex flex-wrap gap-2">{steps.map((label, index) => {
    const active = index === current;
    const complete = index < current;
    return <div key={label} className={`inline-flex min-h-10 items-center gap-2 rounded-md border px-3 text-sm font-medium transition ${compact ? "flex-1 justify-center" : ""} ${active ? "border-primary bg-primary text-white" : complete ? "border-success bg-success/10 text-success" : "border-border bg-background text-muted"}`}>
      <span className={`inline-flex size-5 items-center justify-center rounded-full text-xs ${active ? "bg-white/20" : complete ? "bg-success text-white" : "bg-muted/20"}`}>{complete ? <UiIcon name="check" size="sm" /> : index + 1}</span>
      {label}
    </div>;
  })}</div>;
}

function WizardFields({ step, values, setField, errors = {}, validated = false }: {
  step: number;
  values: WizardValues;
  setField: <K extends keyof WizardValues>(key: K, value: WizardValues[K]) => void;
  errors?: Partial<Record<keyof WizardValues, string>>;
  validated?: boolean;
}) {
  if (step === 0) return <div className="grid gap-4">
    <UiTextField label="Email" value={values.email} onChangeText={value => setField("email", value)} placeholder="Enter email" inputMode="email" error={errors.email} />
    <UiPasswordField label="Password" value={values.password} onChangeText={value => setField("password", value)} placeholder="password placeholder" showPasswordLabel="Show password" hidePasswordLabel="Hide password" error={errors.password} />
    {!validated && <UiPasswordField label="Re-Password" value={values.repassword} onChangeText={value => setField("repassword", value)} placeholder="password" showPasswordLabel="Show password" hidePasswordLabel="Hide password" />}
    {validated && <UiCheckbox label="Remember me" checked={values.remember} onCheckedChange={value => setField("remember", value)} description={errors.remember} tone={errors.remember ? "danger" : "primary"} />}
  </div>;

  if (step === 1) return <div className="grid gap-4">
    <UiTextField label="First Name" value={values.firstName} onChangeText={value => setField("firstName", value)} placeholder="Enter first name" error={errors.firstName} />
    <UiTextField label="Last Name" value={values.lastName} onChangeText={value => setField("lastName", value)} placeholder="Enter last name" error={errors.lastName} />
    {!validated
      ? <UiTextField label="Phone Number" value={values.phone} onChangeText={value => setField("phone", value)} placeholder="Enter phone number" inputMode="tel" />
      : <UiCheckbox label="Agree to terms and conditions" checked={values.terms} onCheckedChange={value => setField("terms", value)} description={errors.terms} tone={errors.terms ? "danger" : "primary"} />}
  </div>;

  return <div className="rounded-md border border-border bg-muted/10 p-6 text-center">
    <div className="mx-auto grid size-11 place-items-center rounded-full bg-success/15 text-success"><UiIcon name="check" size="lg" /></div>
    <h3 className="mt-3 text-lg font-semibold text-foreground">Thank you !</h3>
    <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted">Review the collected data and submit the final form.</p>
    {!validated && <div className="mt-4 flex justify-center"><UiCheckbox label="I agree with the Terms and Conditions" checked={values.terms} onCheckedChange={value => setField("terms", value)} /></div>}
  </div>;
}

function Wizard({ progress = false, validated = false }: { progress?: boolean; validated?: boolean }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof WizardValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const percentage = useMemo(() => ((step + 1) / steps.length) * 100, [step]);
  const setField = <K extends keyof WizardValues>(key: K, value: WizardValues[K]) => {
    setValues(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: undefined }));
  };
  const next = () => {
    if (validated && step < 2) {
      const nextErrors: Partial<Record<keyof WizardValues, string>> = {};
      if (step === 0) {
        if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = "Please enter a valid email address.";
        if (values.password.length < 6) nextErrors.password = "Please enter at least 6 characters.";
        if (!values.remember) nextErrors.remember = "Please confirm remember me.";
      } else {
        if (values.firstName.trim().length < 2) nextErrors.firstName = "Use at least 2 letters.";
        if (values.lastName.trim().length < 2) nextErrors.lastName = "Use at least 2 letters.";
        if (!values.terms) nextErrors.terms = "Please agree to terms and conditions.";
      }
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length) return;
    }
    if (step === steps.length - 1) setSubmitted(true);
    else setStep(value => value + 1);
  };
  return <div className="grid gap-5">
    <WizardSteps current={step} compact={progress || validated} />
    {(progress || validated) && <UiProgress value={percentage} tone="accent" striped animated size="sm" />}
    <WizardFields step={step} values={values} setField={setField} errors={errors} validated={validated} />
    {submitted && <p className="text-sm font-semibold text-success">Wizard form submitted.</p>}
    <div className="flex items-center justify-between gap-3">
      <UiButton tone="info" variant="outline" disabled={step === 0} onPress={() => setStep(value => Math.max(0, value - 1))}>Previous</UiButton>
      <UiButton tone={step === steps.length - 1 ? "success" : "primary"} onPress={next}>{step === steps.length - 1 ? "Submit" : "Next"}</UiButton>
    </div>
  </div>;
}

export function FormWizardTemplatePreview() {
  return <div className="space-y-5">
    <div className="grid gap-5 xl:grid-cols-2">
      <Demo title="Basic Wizard"><Wizard /></Demo>
      <Demo title="Wizard with Progress bar"><Wizard progress /></Demo>
    </div>
    <div className="grid gap-5 xl:grid-cols-2">
      <Demo title="Wizard with Validation"><Wizard validated /></Demo>
    </div>
  </div>;
}
