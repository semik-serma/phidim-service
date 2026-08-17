'use client';

import { CheckCircle2, AlertCircle } from 'lucide-react';

export function FloatingField({
  id,
  label,
  name,
  type = 'text',
  value = '',
  onChange,
  icon: Icon,
  autoComplete,
  inputMode,
  error,
  valid = false,
  right,
  disabled = false,
}) {
  const hasValue = value.length > 0;
  const showSuccess = valid && hasValue && !error;

  const borderClass = error
    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10 hover:border-rose-400'
    : showSuccess
      ? 'border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/15 hover:border-emerald-400'
      : 'border-slate-200 focus:border-[#16A34A] focus:ring-[#16A34A]/15 hover:border-slate-300';

  return (
    <div>
      <div className="relative">
        {Icon && (
          <Icon
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none transition-colors duration-200 ${
              error
                ? 'text-rose-500'
                : showSuccess
                  ? 'text-emerald-600'
                  : 'text-slate-400'
            }`}
          />
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`peer w-full h-[60px] pl-12 text-[15px] text-slate-900 font-medium bg-white rounded-2xl border-[1.5px] transition-all duration-200 pr-12 pt-6 pb-2 placeholder-transparent focus:outline-none focus:ring-4 disabled:opacity-60 disabled:cursor-not-allowed ${borderClass}`}
        />
        <label
          htmlFor={id}
          className={`absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none text-[15px] font-medium transition-all duration-200 origin-left peer-focus:text-[11px] peer-focus:top-3 peer-focus:font-bold peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:font-bold ${
            error
              ? 'text-rose-500 peer-focus:text-rose-500'
              : showSuccess
                ? 'text-emerald-600 peer-focus:text-emerald-500'
                : 'text-slate-500 peer-focus:text-[#16A34A]'
          }`}
        >
          {label}
        </label>

        {showSuccess && !right && (
          <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none animate-in fade-in zoom-in duration-200" />
        )}

        {right && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {right}
          </div>
        )}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-[11px] font-bold text-rose-600 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200"
          role="alert"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}