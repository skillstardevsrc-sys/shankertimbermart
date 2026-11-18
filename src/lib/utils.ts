import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWhatsAppMessage(productName?: string, category?: string): string {
  if (productName) {
    return encodeURIComponent(
      `Hello Shankar Timber Mart, I am interested in your ${productName}. Please share more details and specifications.`
    );
  }
  if (category) {
    return encodeURIComponent(
      `Hello Shankar Timber Mart, I would like to enquire about your ${category} collection. Please share catalogue details.`
    );
  }
  return encodeURIComponent(
    `Hello Shankar Timber Mart, I would like to get in touch regarding timber, architectural materials and interior solutions.`
  );
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return dateString;
  }
}
