export interface AppError {
  message: string;
  category: 'network' | 'validation' | 'server' | 'unknown';
  userMessage: string;
  originalError?: unknown;
}

export function categorizeError(error: unknown): AppError {
  // Network errors
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status?: number }).status;
    if (status === 0) {
      return {
        message: 'Network error - no connection',
        category: 'network',
        userMessage:
          'Verbindung verloren. Bitte überprüfen Sie Ihre Internetverbindung.',
        originalError: error,
      };
    }
    if (status && status >= 500) {
      return {
        message: `Server error ${status}`,
        category: 'server',
        userMessage: 'Serverfehler. Bitte versuchen Sie es später erneut.',
        originalError: error,
      };
    }
    if (status && status >= 400) {
      return {
        message: `Client error ${status}`,
        category: 'validation',
        userMessage:
          'Anfrage konnte nicht verarbeitet werden. Bitte überprüfen Sie Ihre Eingaben.',
        originalError: error,
      };
    }
  }

  // JavaScript errors
  if (error instanceof Error) {
    return {
      message: error.message,
      category: 'unknown',
      userMessage: 'Ein unerwarteter Fehler ist aufgetreten.',
      originalError: error,
    };
  }

  // Unknown errors
  return {
    message: 'Unknown error occurred',
    category: 'unknown',
    userMessage: 'Ein unbekannter Fehler ist aufgetreten.',
    originalError: error,
  };
}

export function getUserFriendlyMessage(error: unknown): string {
  return categorizeError(error).userMessage;
}

export function getTechnicalMessage(error: unknown): string {
  return categorizeError(error).message;
}

export function logError(context: string, error: unknown): void {
  const appError = categorizeError(error);
  console.error(`[${context}] ${appError.message}:`, {
    category: appError.category,
    userMessage: appError.userMessage,
    originalError: appError.originalError,
  });
}
