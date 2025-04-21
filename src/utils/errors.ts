import axios from 'axios';

export class BookingError extends Error {
  constructor() {
    super('');
  }
}

export class ClaimError extends Error {
  constructor() {
    super('');
  }
}

const getResponseStatus = (status: number | undefined): string => {
  switch (status) {
    case 404:
      return 'Resource not found';
    case 429:
      return 'Resource rate limit reached';
    default:
      return 'Oops, something went wrong';
  }
};

export const getAPIErrorMessage = (
  error: unknown,
  defaultMessage = 'Oops, something went wrong'
): string => {
  if (axios.isAxiosError(error)) {
    return getResponseStatus(error.response?.status);
  } else if (error instanceof BookingError) {
    return 'No booking document found with a valid installment';
  } else if (error instanceof ClaimError) {
    return 'No valid claim receivable document found';
  }
  return defaultMessage;
};
