import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatThousandSeparator(amount: number) {
  return amount.toLocaleString('en-US');
}

export function formatPercentage(value: number) {
  return value.toFixed(2) + '%';
}
