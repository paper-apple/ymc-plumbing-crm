import { ReactNode } from "react";

interface FieldWrapperProps {
  error?: { message?: string };
  children: ReactNode;
}

export default function FieldWrapper({ error, children }: FieldWrapperProps) {
  return (
    <div className="space-y-1">
      {children}
      {error ? (
        <p className="text-red-500 text-sm h-4">{error.message}</p>
      ) : (
        <div className="h-4" />
      )}
    </div>
  );
}