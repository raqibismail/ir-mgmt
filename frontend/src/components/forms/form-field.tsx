"use client";

import * as React from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { formatDate, isValidDate } from "@/lib/helpers";

interface Option {
  id: string | number;
  value: string;
}

interface FormFieldProps {
  name: string;
  label: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "select"
    | "textarea"
    | "date"
    | "datetime";
  placeholder?: string;
  required?: boolean;
  className?: string;
  options?: Option[];
  value?: any;
  onChange?: (e: any) => void;
}

export function FormField({
  name,
  label,
  type = "text",
  placeholder,
  required,
  className,
  options = [],
  onChange,
  value,
}: FormFieldProps) {
  const labelEl = (
    <FieldLabel
      className="text-primary font-sans font-medium capitalize"
      htmlFor={name}
    >
      {label}
    </FieldLabel>
  );

  const baseInputClass =
    "bg-slate-100 border border-slate-300 inset-shadow-md text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition rounded-md";

  // ---------- TEXT / PASSWORD / EMAIL ----------
  if (["text", "email", "password"].includes(type))
    return (
      <Field className={className}>
        {labelEl}
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={baseInputClass}
          value={value ?? ""}
          onChange={onChange}
        />
      </Field>
    );

  // ---------- SELECT ----------
  if (type === "select")
    return (
      <Field className={className}>
        {labelEl}
        <Select
          name={name}
          required={required}
          value={value ?? ""}
          onValueChange={(val) =>
            onChange?.({ target: { name, value: val } } as any)
          }
        >
          <SelectTrigger className={baseInputClass}>
            <SelectValue
              placeholder={`Select ${placeholder ?? label.toLowerCase()}`}
            />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.id} value={opt.value}>
                {opt.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    );

  // ---------- TEXTAREA ----------
  if (type === "textarea")
    return (
      <Field className={className}>
        {labelEl}
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          className={baseInputClass}
          value={value ?? ""}
          onChange={onChange}
        />
      </Field>
    );

  // ---------- DATE ----------
  const [open, setOpen] = React.useState(false);

  const parsedDate =
    value instanceof Date ? value : value ? new Date(value) : undefined;

  const dateString = parsedDate ? formatDate(parsedDate, "DD MMM YYYY") : "";

  const handleDateChange = (newDate?: Date) => {
    if (newDate) {
      onChange?.({
        target: { name, value: newDate },
      } as any);
    }
    setOpen(false);
  };

  const DateInput = (
    <div className="relative flex gap-2">
      <Input
        id={name}
        value={dateString}
        onChange={(e) => {
          const d = new Date(e.target.value);
          onChange?.({ target: { name, value: d } } as any);
        }}
        onKeyDown={(e) =>
          e.key === "ArrowDown" && (e.preventDefault(), setOpen(true))
        }
        placeholder="June 01, 2025"
        className={baseInputClass}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
          >
            <CalendarIcon className="size-3.5 text-secondary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end" sideOffset={10}>
          <Calendar
            mode="single"
            selected={parsedDate}
            captionLayout="dropdown"
            onSelect={handleDateChange}
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  // ---------- DATETIME ----------
  if (type === "datetime")
    return (
      <Field className={className}>
        {labelEl}
        <div className="flex w-full gap-4">
          <div className="flex-initial w-2/3">{DateInput}</div>
          <Input
            type="time"
            id={`${name}-time`}
            step="60"
            value={value?.time ?? ""}
            onChange={(e) =>
              onChange?.({
                target: { name, value: { ...value, time: e.target.value } },
              } as any)
            }
            className={`${baseInputClass} flex-initial w-1/3 appearance-none [&::-webkit-calendar-picker-indicator]:hidden`}
          />
        </div>
      </Field>
    );

  return (
    <Field className={className}>
      {labelEl}
      {DateInput}
    </Field>
  );
}
