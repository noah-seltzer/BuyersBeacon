import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleApiError(error: any, setErrorFn: (message: string) => void): void {
  if (!error?.data?.errors) {
    setErrorFn("Failed to save. Please check your connection and try again.");
    return;
  }
  
  const errors = error.data.errors;
  if (errors.CategoryId) {
    setErrorFn("Server error: Category validation failed. Try again or select a category.");
  } else if (errors.ItemName) {
    setErrorFn("Please provide a title for your beacon draft.");
  } else {
    setErrorFn("There was an issue with your request. Please check all fields and try again.");
  }
}
