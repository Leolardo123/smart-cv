import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges multiple class names into a single string, handling conditional classes and deduplication.
 * @param inputs - An array of class names or conditional class objects.
 * @returns A single string containing the merged class names.
 */
export const cl = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
}