import { useState, useCallback, ChangeEvent } from 'react';
import { ZodSchema, ZodError } from 'zod';

export function useFormAndValidation<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid((e.target.closest('form') as HTMLFormElement).checkValidity());
  };

  const validateWithZod = (schema: ZodSchema) => {
    try {
      schema.parse(values);
      setErrors({});
      setIsValid(true);
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        // Only set the first error per field for simplicity
        err.issues.forEach((error) => {
          const field = error.path[0]?.toString();
          if (field && !newErrors[field]) {
            newErrors[field] = error.message;
          }
        });
        setErrors((prev) => ({ ...prev, ...newErrors }));
        setIsValid(false);
      }
      return false;
    }
  };

  const resetForm = useCallback(
    (newValues = initialValues, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [initialValues]
  );

  return { values, handleChange, errors, isValid, resetForm, setValues, setErrors, setIsValid, validateWithZod };
}
