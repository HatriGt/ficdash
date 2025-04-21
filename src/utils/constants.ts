import { DealTableLayout } from '../types/deal';

export const DEAL_HEADERS: DealTableLayout = {
  action: { displayName: 'Action', minWidth: 120 },
  // docType: { displayName: 'Doc Type', width: 100 },
  postingDate: { displayName: 'Posting date', minWidth: 150 },
  endorsementReference: { displayName: 'Endorsement Ref', minWidth: 140, maxWidth: 200 },
  dueDate: { displayName: 'Net Due Date', minWidth: 150, maxWidth: 200 },
  businessPartner: { displayName: 'Business Partner', minWidth: 220, maxWidth: 400 },
  currency: { displayName: 'Currency', minWidth: 100, maxWidth: 100 },
  premium: { displayName: 'Premium Amount', minWidth: 180, align: 'right' },
  ficaDoc: { displayName: 'FICA Document', minWidth: 230 },
  businessPartnerId: { displayName: 'Business Partner ID', minWidth: 200 },
};

export const InstallmentBreakdown: DealTableLayout = {
  installment: { displayName: 'Installment', minWidth: 80, align: 'center' },
  dueDate: { displayName: 'Net Due Date', minWidth: 150, maxWidth: 200, align: 'center' },
  businessPartner: {
    displayName: 'Business Partner',
    minWidth: 220,
    maxWidth: 400,
    align: 'left',
  },
  originalCurrency: { displayName: 'Currency', minWidth: 50, maxWidth: 80, align: 'center' },
  originalAmount: { displayName: 'Premium Amount', minWidth: 150, align: 'right' },
  clearedAmount: { displayName: 'Cleared Amount', minWidth: 150, align: 'right' },
  openBalance: { displayName: 'Open Balance', minWidth: 150, align: 'right' },
  ficaDoc: { displayName: 'FICA Doc', minWidth: 150, align: 'center' },
  businessPartnerId: { displayName: 'Business Partner ID', minWidth: 180, align: 'center' },
};

export const ClearingDocumentBreakdownForDebtors: DealTableLayout = {
  bankReference: { displayName: 'Bank Reference', minWidth: 120, align: 'center' },
  postingDate: { displayName: 'Posting Date', minWidth: 100, maxWidth: 150, align: 'center' },
  businessPartner: {
    displayName: 'Business Partner',
    minWidth: 220,
    maxWidth: 400,
    align: 'left',
  },
  businessPartnerId: { displayName: 'Business Partner ID', minWidth: 100, align: 'center' },
  originalCurrency: { displayName: 'Currency', minWidth: 100, maxWidth: 100, align: 'center' },
  originalAmount: { displayName: 'Clearing Amount', minWidth: 180, align: 'right' },
  ficaDoc: { displayName: 'FICA Doc', minWidth: 230, align: 'center' },
  externalROE: { displayName: 'External ROE', minWidth: 150, align: 'center' },
};

export const ClearingDocumentBreakdownForCreditors: DealTableLayout = {
  bankReference: { displayName: 'Bank Reference', minWidth: 200, align: 'center' },
  clearingDate: { displayName: 'Clearing Date', minWidth: 230, align: 'center' },
  businessPartner: {
    displayName: 'Business Partner',
    minWidth: 220,
    maxWidth: 400,
    align: 'left',
  },
  businessPartnerId: { displayName: 'Business Partner ID', minWidth: 100, align: 'center' },
  originalCurrency: { displayName: 'Currency', minWidth: 100, maxWidth: 100, align: 'center' },
  originalAmount: { displayName: 'Clearing Amount', minWidth: 180, align: 'right' },
  ficaDoc: { displayName: 'FICA Doc', minWidth: 230, align: 'center' },
};

export const MemberConsolidatedInstallmentBreakdown: DealTableLayout = {
  installment: { displayName: 'Installment', minWidth: 50, maxWidth: 90, align: 'center' },
  businessPartner: {
    displayName: 'Business Partner',
    minWidth: 220,
    maxWidth: 400,
    align: 'left',
  },
  memberName: { displayName: 'Member', minWidth: 250, maxWidth: 400, align: 'left' },
  originalCurrency: { displayName: 'Currency', minWidth: 80, maxWidth: 80, align: 'center' },
  originalAmount: { displayName: 'Premium Amount', minWidth: 120, align: 'right' },
  clearedAmount: { displayName: 'Cleared Amount', minWidth: 120, align: 'right' },
  openBalance: { displayName: 'Open Balance', minWidth: 120, align: 'right' },
  businessPartnerId: { displayName: 'Business Partner ID', minWidth: 180, align: 'center' },
  memberID: { displayName: 'Member ID', minWidth: 150, align: 'center' },
};

export const MemberInstallmentBreakdown: DealTableLayout = {
  postingDate: { displayName: 'Posting Date', minWidth: 150, maxWidth: 150, align: 'center' },
  businessPartner: {
    displayName: 'Business Partner',
    minWidth: 220,
    maxWidth: 400,
    align: 'left',
  },
  ficaDoc: { displayName: 'FICA Doc', minWidth: 100, maxWidth: 150, align: 'center' },
  originalCurrency: { displayName: 'Currency', minWidth: 50, maxWidth: 100, align: 'center' },
  originalAmount: { displayName: 'Premium Amount', minWidth: 120, align: 'right' },
  clearedAmount: { displayName: 'Cleared Amount', minWidth: 120, align: 'right' },
  openBalance: { displayName: 'Open Balance', minWidth: 120, align: 'right' },
  memberID: { displayName: 'Member ID', minWidth: 100, maxWidth: 150, align: 'center' },
  businessPartnerId: {
    displayName: 'Business Partner ID',
    minWidth: 100,
    maxWidth: 180,
    align: 'center',
  },
};

export const ClaimDebtorMemberBreakdown: DealTableLayout = {
  postingDate: { displayName: 'Posting date', minWidth: 150 },
  businessPartner: {
    displayName: 'Business Partner',
    minWidth: 220,
    maxWidth: 400,
    align: 'left',
  },
  memberName: { displayName: 'Member', minWidth: 250, maxWidth: 400, align: 'left' },
  originalCurrency: { displayName: 'Currency', minWidth: 50, maxWidth: 80, align: 'center' },
  originalAmount: { displayName: 'Claim Amount', minWidth: 150, align: 'right' },
  clearedAmount: { displayName: 'Cleared Amount', minWidth: 150, align: 'right' },
  openBalance: { displayName: 'Open Balance', minWidth: 150, align: 'right' },
  ficaDoc: { displayName: 'FICA Doc', minWidth: 150, align: 'center' },
  businessPartnerId: { displayName: 'Business Partner ID', minWidth: 180, align: 'center' },
  memberID: { displayName: 'Member ID', minWidth: 120, maxWidth: 180, align: 'center' },
  collectionType: { displayName: 'Collection Type', minWidth: 230, align: 'center' },
};

export const ClaimDebtorMemberClearingBreakdown: DealTableLayout = {
  clearingDate: { displayName: 'Clearing Date', minWidth: 230, align: 'center' },
  businessPartner: {
    displayName: 'Business Partner',
    minWidth: 220,
    maxWidth: 400,
    align: 'left',
  },
  ficaDoc: { displayName: 'FICA Doc', minWidth: 200, align: 'center' },
  originalCurrency: { displayName: 'Currency', minWidth: 100, maxWidth: 100, align: 'center' },
  originalAmount: { displayName: 'Clearing Amount', minWidth: 180, align: 'right' },
  clearingDocument: { displayName: 'Clearing Doc', minWidth: 260, align: 'center' },
  businessPartnerId: { displayName: 'Business Partner ID', minWidth: 100, align: 'center' },
  externalROE: { displayName: 'External ROE', minWidth: 150, align: 'center' },
  collectionType: { displayName: 'Collection Type', minWidth: 230, align: 'center' },
};

export const ClaimCreditorPayableBreakdown: DealTableLayout = {
  postingDate: { displayName: 'Posting date', minWidth: 150 },
  businessPartner: {
    displayName: 'Business Partner',
    minWidth: 220,
    maxWidth: 400,
    align: 'left',
  },
  memberName: { displayName: 'Member', minWidth: 250, maxWidth: 400, align: 'left' },
  originalCurrency: { displayName: 'Currency', minWidth: 50, maxWidth: 80, align: 'center' },
  originalAmount: { displayName: 'Claim Amount', minWidth: 150, align: 'right' },
  clearedAmount: { displayName: 'Cleared Amount', minWidth: 150, align: 'right' },
  openBalance: { displayName: 'Open Balance', minWidth: 150, align: 'right' },
  ficaDoc: { displayName: 'FICA Doc', minWidth: 150, align: 'center' },
  businessPartnerId: { displayName: 'Business Partner ID', minWidth: 180, align: 'center' },
  memberID: { displayName: 'Member ID', minWidth: 120, maxWidth: 180, align: 'center' },
  collectionType: { displayName: 'Collection Type', minWidth: 230, align: 'center' },
};

export const ClaimCreditorReleasedBreakdown: DealTableLayout = {
  bankReference: { displayName: 'Bank Reference', minWidth: 200, align: 'center' },
  clearingDate: { displayName: 'Clearing Date', minWidth: 230, align: 'center' },
  businessPartner: {
    displayName: 'Business Partner',
    minWidth: 220,
    maxWidth: 400,
    align: 'left',
  },
  businessPartnerId: { displayName: 'Business Partner ID', minWidth: 100, align: 'center' },
  settlementCurrency: { displayName: 'Currency', minWidth: 100, maxWidth: 100, align: 'center' },
  originalAmount: { displayName: 'Clearing Amount', minWidth: 180, align: 'right' },
  ficaDoc: { displayName: 'FICA Doc', minWidth: 230, align: 'center' },
  externalROE: { displayName: 'External ROE', minWidth: 150, align: 'center' },
};

export const InstallmentCommissionBreakdown: DealTableLayout = {
  installment: { displayName: 'Installment', minWidth: 80, align: 'center' },
  originalCurrency: { displayName: 'Currency', minWidth: 50, maxWidth: 80, align: 'center' },
  originalAmount: { displayName: 'Commission Amount', minWidth: 150, align: 'right' },
  // clearedAmount: { displayName: 'Cleared Amount', minWidth: 150, align: 'right' },
  // openBalance: { displayName: 'Open Balance', minWidth: 150, align: 'right' },
  ficaDoc: { displayName: 'FICA Doc', minWidth: 150, align: 'center' },
};

export const ClDocumentSummary: DealTableLayout = {
  ficaDoc: { displayName: 'FICA Doc', minWidth: 150, align: 'center' },
  postingDate: { displayName: 'Collected Date', minWidth: 150 },
  businessPartner: {
    displayName: 'Business Partner',
    minWidth: 220,
    maxWidth: 400,
    align: 'left',
  },
  businessPartnerId: { displayName: 'Business Partner ID', minWidth: 180, align: 'center' },
  originalCurrency: { displayName: 'Currency', minWidth: 50, maxWidth: 80, align: 'center' },
  originalAmount: { displayName: 'Claim Amount', minWidth: 150, align: 'right' },
};
