import { ValidationError } from 'class-validator';

// Type guard to check if the error is an array of ValidationError
export function isValidationErrorArray(
  errors: unknown,
): errors is ValidationError[] {
  return (
    Array.isArray(errors) && errors.every((error) => 'constraints' in error)
  );
}
