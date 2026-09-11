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
}: InputProps) {
  return (
    <div className="flex flex-col w-full  min-w-0">
      <label htmlFor={id} className="text-[12px] font-medium">
        {label}
        {description && <span className="block">{description}</span>}
      </label>
      <input
        type={type}
        id={id}
        className={cn(
          `bg-background border text-foreground border-border rounded-md min-w-2`,
          { "border-red-400": errorMessage },
        )}
        // required
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
      {errorMessage && (
        <label htmlFor={id}>
          <span className="text-xs text-red-400">{errorMessage}</span>
        </label>
      )}
    </div>
  );
}
