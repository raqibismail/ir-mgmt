import * as React from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate, isValidDate } from "@/lib/helpers";

interface SelectOptions {
  id: string | number;
  value: any;
}

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  options?: SelectOptions[];
}

export function FormField({
  name,
  label,
  type = "text",
  placeholder,
  required,
  className,
  options,
}: FormFieldProps) {
  if (type === "text" || type === "password" || type === "email") {
    return (
      <Field className={className}>
        <FieldLabel
          className="text-primary font-sans font-medium capitalize "
          htmlFor={name}
        >
          {label}
        </FieldLabel>
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className="bg-slate-100 border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition rounded-md inset-shadow-sm"
        />
      </Field>
    );
  }

  if (type === "select") {
    return (
      <Field className={className}>
        <FieldLabel
          className="text-primary font-sans font-medium capitalize "
          htmlFor={name}
        >
          {label}
        </FieldLabel>
        <Select name={name} required={required}>
          <SelectTrigger className="bg-slate-100 border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition rounded-md inset-shadow-sm">
            <SelectValue placeholder={`Select a ${placeholder}`} />
          </SelectTrigger>
          <SelectContent>
            {options!.map((e) => (
              <SelectItem key={e.id.toString()} value={e.value}>
                {e.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    );
  }

  if (type === "textarea") {
    return (
      <Field className={className}>
        <FieldLabel
          className="text-primary font-sans font-medium capitalize "
          htmlFor={name}
        >
          {label}
        </FieldLabel>
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          className="bg-slate-100 border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition rounded-md inset-shadow-sm"
        />
      </Field>
    );
  }

  if (type === "date") {
    const dateFormat = "DD MMM YYYY";
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [month, setMonth] = React.useState<Date | undefined>(date);
    const [value, setValue] = React.useState(formatDate(date, dateFormat));

    return (
      <Field className={className}>
        <FieldLabel
          className="text-primary font-sans font-medium capitalize "
          htmlFor={name}
        >
          {label}
        </FieldLabel>
        <div className="relative flex gap-2">
          <Input
            id="date"
            value={value}
            placeholder="June 01, 2025"
            className="bg-slate-100 border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition rounded-md inset-shadow-sm"
            onChange={(e) => {
              const date = new Date(e.target.value);
              setValue(e.target.value);
              if (isValidDate(date)) {
                setDate(date);
                setMonth(date);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setOpen(true);
              }
            }}
          />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date-picker"
                variant="ghost"
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              >
                <CalendarIcon className="size-3.5 text-primary" />
                <span className="sr-only">Select date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                month={month}
                onMonthChange={setMonth}
                onSelect={(date) => {
                  setDate(date);
                  setValue(formatDate(date, dateFormat));
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </Field>
    );
  }

  if (type === "datetime") {
    const dateFormat = "DD MMM YYYY";
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [month, setMonth] = React.useState<Date | undefined>(date);
    const [value, setValue] = React.useState(formatDate(date, dateFormat));

    return (
      <Field className={className}>
        <FieldLabel
          className="text-primary font-sans font-medium capitalize"
          htmlFor={name}
        >
          {label}
        </FieldLabel>

        <div className="flex flex-row gap-4">
          {/* Date Picker */}
          <div className="flex-1">
            <div className="relative flex gap-2">
              <Input
                id="date"
                value={value}
                placeholder="June 01, 2025"
                className="bg-slate-100 border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition rounded-md inset-shadow-sm"
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setValue(e.target.value);
                  if (isValidDate(date)) {
                    setDate(date);
                    setMonth(date);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setOpen(true);
                  }
                }}
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="date-picker"
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                  >
                    <CalendarIcon className="size-3.5 text-primary" />
                    <span className="sr-only">Select date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="end"
                  alignOffset={-8}
                  sideOffset={10}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={(date) => {
                      setDate(date);
                      setValue(formatDate(date, dateFormat));
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Time Picker */}
          <div className="flex-1">
            <Input
              type="time"
              id="time-picker"
              step="60"
              defaultValue="10:30:00"
              className="bg-slate-100 border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition rounded-md inset-shadow-sm appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        </div>
      </Field>
    )
  }

}

