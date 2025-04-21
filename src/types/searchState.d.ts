import { DealLayout } from './deal';

export type Search = {
  externalReference: string | null;
  installment: string | null;
  premiumId: string | number | null;
  ficaDoc: string | number | null;
  sys: string | undefined;
  environment: string | undefined;
  docType: string | undefined;
  endorsementReference: string | null;
  routing: string;
  enteredOn: string | null;
  ucr: string | null;
  umr: string | null;
  policyNumber: string | null;
  claimReference: string | null;
  transactionReference: string | null;
};

export type SearchState = {
  search: Search;
  results: DealLayout[];
  isLoading: boolean;
  totalCount: number;
  error: string | null | unknown;
  showError: boolean;
  totalDocuments: number;
  fetchedDocuments: number;
};
