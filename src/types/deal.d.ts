import { GridAlignment } from '@mui/x-data-grid';

interface DataGridRow {
  id: number;
  [key?: string]: string | number | null;
}

type DealLayout = {
  [key?: string]: string | MetadataType | DealLayout[];
};

type DealTableLayout = {
  [key?: string]: {
    displayName: string;
    minWidth: number;
    maxWidth?: number;
    align?: GridAlignment;
  };
};

type ActionType = {
  [key: string]: string;
};

type MetadataType = {
  type: string;
  uri: string;
};

type DealResponse = {
  results: DealLayout[];
};

type BookedTransactionSummary = {
  premiumDeposit: Decimal;
  additionalDeposit: {
    [key?: string]: Decimal;
  };
  returnDeposit: {
    [key?: string]: Decimal;
  };
};

type CommonKeyValueType = {
  [key?: string]: Decimal;
};

type ClearingAmountOfInstallment = {
  [key?: string]: Decimal;
};

type ClearingDocsOfInstallment = {
  [key?: string]: DealLayout[];
};

type DealSectionProps = {
  creditSection: {
    tr: DealLayout;
    data: DealLayout[];
  };
  debitSection: {
    tr: DealLayout;
    data: DealLayout[];
  };
  commissionSection?: {
    tr: DealLayout;
    data: DealLayout[];
  };
};
