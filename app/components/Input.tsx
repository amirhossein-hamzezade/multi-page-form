import { cn } from "../utils/cn";

type InputProps = {
  label: string;
  id: string;
  type: string;
  required?: boolean;
  max?: number;
  min?: number;
  pattern?: string;
  description?: string;
  name: string;
  errorMessage: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  defaultValue?: string;
  rightElement?: React.ReactNode;
};

export default function Input({
  label,
  id,
  type,
  required,
  max,
  min,
  pattern,
  description,
  name,
  errorMessage,
  value,
  onChange,
  disabled,
  rightElement,
}: InputProps) {
  return (
    <div className="flex flex-col w-full min-w-0">
      <label htmlFor={id} className="text-[12px] font-medium mb-1">
        {label}
        {description && (
          <span className="block text-muted-foreground">{description}</span>
        )}
      </label>

      <div className="relative flex items-center w-full">
        <input
          type={type}
          id={id}
          className={cn(
            `bg-background border text-foreground border-border rounded-md min-w-2 h-9 w-full px-3`,
            { "border-red-400 focus:ring-red-400": errorMessage },
            { "pr-10": rightElement },
          )}
          min={min}
          max={max}
          aria-required={required}
          pattern={pattern}
          aria-label={label}
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>

      {errorMessage && (
        <label htmlFor={id} className="mt-1">
          <span className="text-xs text-red-400">{errorMessage}</span>
        </label>
      )}
    </div>
  );
}
