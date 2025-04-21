import { GridColDef, GridColumnHeaderParams, GridRenderCellParams } from '@mui/x-data-grid';
import { ActionPriority } from '../types/common';
import numeral from 'numeral';
import {
  BookedTransactionSummary,
  ClearingAmountOfInstallment,
  ClearingDocsOfInstallment,
  CommonKeyValueType,
  DealLayout,
  DealTableLayout,
} from '../types/deal';
import Decimal from 'decimal.js';

export const THEME_MODES: { LIGHT_MODE: string; DARK_MODE: string } = {
  LIGHT_MODE: 'light',
  DARK_MODE: 'dark',
};

export const datGridColumns = (headerItems: DealTableLayout): GridColDef[] => {
  return Object.keys(headerItems).map((column: string) => {
    let header: GridColDef = {
      field: column,
      flex: 1,
      minWidth: headerItems[column].minWidth,
      maxWidth: headerItems[column].maxWidth ?? undefined,
      headerClassName: 'premium-action-header',
      headerAlign: 'center',
      align: headerItems[column].align ?? 'center',
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{captialize(headerItems[params.field].displayName as string)}</strong>
      ),
      renderCell: (params: GridRenderCellParams) => (
        <span>{isEmptyString(params.value) ? '-' : params.value}</span>
      ),
    };
    if (header.field === 'premium') {
      header = {
        ...header,
        renderCell: (params: GridRenderCellParams) => (
          <strong style={{ marginRight: '25%' }}>{numeral(params.value).format('0,0.00')}</strong>
        ),
      };
    }
    if (header.field === 'postingDate' || header.field === 'dueDate') {
      header = {
        ...header,
        renderCell: (params: GridRenderCellParams) => <span>{convertDate(params.value)}</span>,
      };
    }

    return header;
  });
};

export const captialize = (words: string) =>
  words
    .split(' ')
    .map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
    .join(' ');

export const isEmptyString = (input: string | number | boolean | undefined | null) => {
  return !input || input === '';
};

export const compareValues = (valueA: string, valueB: string) =>
  valueA < valueB ? -1 : valueA > valueB ? 1 : 0;

export const groupByPremiums = (input: DealLayout[]) => {
  try {
    const groupedData: { [key: string]: DealLayout[] } = {};
    input.forEach((item: DealLayout) => {
      const key = `${item.externalReference}-${item.sys}`;
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(item);
    });

    const groupedDocs = Object.values(groupedData).map((group) => group);
    groupedDocs.sort((a, b) => {
      let sysA = a[0].sys as string;
      let sysB = b[0].sys as string;
      let premiumIdA = a[0].premiumId as string;
      let premiumIdB = b[0].premiumId as string;

      let compareSys = compareValues(sysA, sysB);
      if (compareSys !== 0) return compareSys;

      let comparePremiumId = compareValues(premiumIdA, premiumIdB);
      return comparePremiumId;
    });

    return groupedDocs;
  } catch (error) {
    throw new Error();
  }
};

export const groupByClaims = (input: DealLayout[]) => {
  try {
    const groupedData: { [key: string]: DealLayout[] } = {};
    input.forEach((item: DealLayout) => {
      const key = `${item.externalReference}-${item.ucr}-${item.claimReference}-${item.sys}`;
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(item);
    });

    const groupedDocs = Object.values(groupedData).map((group) => group);
    groupedDocs.sort((a, b) => {
      let sysA = a[0].sys as string;
      let sysB = b[0].sys as string;
      let claimRefA = a[0].claimReference as string;
      let claimRefB = b[0].claimReference as string;
      let transactionRefA = a[0].transactionReference as string;
      let transactionRefB = b[0].transactionReference as string;

      let compareSys = compareValues(sysA, sysB);
      if (compareSys !== 0) return compareSys;

      let compareClaimRefId = compareValues(claimRefA, claimRefB);
      if (compareClaimRefId !== 0) return compareClaimRefId;

      let compareTransactionRefId = compareValues(transactionRefA, transactionRefB);
      return compareTransactionRefId;
    });

    return groupedDocs;
  } catch (error) {
    throw new Error();
  }
};

export const convertDate = (inputDate: string) => {
  try {
    const match = inputDate.match(/\/Date\((\d+)\)\//);
    if (!match) {
      return inputDate;
    }
    const timestamp = parseInt(match[1]);
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
    return inputDate;
  }
};

export const orderFicaDocActions = (data: DealLayout[]) => {
  const order: ActionPriority = { Booked: 1, Received: 2, 'To be Paid': 3, Paid: 4 };
  return data.sort(
    (a: DealLayout, b: DealLayout) => order[a.action as string] - order[b.action as string]
  );
};

export const getDocumentType = (docType: string) => {
  switch (docType) {
    case 'DM':
      return 'Collection Requested (DM)';
    case 'CL':
      return 'Collection Requested | Cash Clearing | Release Payment (CL)';
    case 'CR':
      return 'Release Payment (CR)';
    case 'RC':
      return 'Subrogation Collection Requested (RC)';
    case 'SC':
      return 'Salvage Collection Requested (RC)';
    case 'CC':
      return 'Cash Clearing (RC)';
    case 'RD':
      return 'Subrogation Cash Clearing (RC)';
    case 'RM':
      return 'Subrogation Cash Clearing (RM)';
    case 'SD':
      return 'Salvage Cash Clearing (SC)';
    case 'SM':
      return 'Salvage Cash Clearing (SM)';
    default:
      return 'Unknown';
  }
};

export const groupBy =
  (...keys: string[]) =>
  (arr: any[]) =>
    arr.reduce((acc: any, obj: any) => {
      const key = keys.map((key) => obj[key]).join('-');
      acc[key] = acc[key] || [];
      acc[key].push(obj);
      return acc;
    }, {});

export const filterDocumentsByType = (ficaDocs: DealLayout[], docTypes: string[]) => {
  return ficaDocs.filter((doc) => docTypes.includes(doc.docType as string));
};

export const mainTransactionSummary = (ficaDocs: DealLayout[]): DealLayout[] => {
  try {
    const bookedDocuments = filterDocumentsByType(ficaDocs, ['PO', 'EN']);
    const transactionAmounts: BookedTransactionSummary = {
      premiumDeposit: {},
      additionalDeposit: {},
      returnDeposit: {},
    };

    const isReturnPremium = (doc: DealLayout) => {
      return 'premiumType' in doc && doc.transactionType === 'RP';
    };

    bookedDocuments.forEach((doc) => {
      const premiumAmount = new Decimal(doc.originalAmount as string);
      const compositeKey = `${doc.endorsementReference}-${doc.premiumId}`;

      if (doc.docType === 'PO') {
        if (transactionAmounts.premiumDeposit[compositeKey]) {
          transactionAmounts.premiumDeposit[compositeKey] =
            transactionAmounts.premiumDeposit[compositeKey].add(premiumAmount);
        } else {
          transactionAmounts.premiumDeposit[compositeKey] = premiumAmount;
        }
      } else if (doc.docType === 'EN') {
        if (isReturnPremium(doc)) {
          if (transactionAmounts.returnDeposit[compositeKey]) {
            transactionAmounts.returnDeposit[compositeKey] =
              transactionAmounts.returnDeposit[compositeKey].add(premiumAmount);
          } else {
            transactionAmounts.returnDeposit[compositeKey] = premiumAmount;
          }
        } else {
          if (transactionAmounts.additionalDeposit[compositeKey]) {
            transactionAmounts.additionalDeposit[compositeKey] =
              transactionAmounts.additionalDeposit[compositeKey].add(premiumAmount);
          } else {
            transactionAmounts.additionalDeposit[compositeKey] = premiumAmount;
          }
        }
      }
    });

    const transactionSummary: DealLayout[] = [];
    Object.keys(transactionAmounts.premiumDeposit).forEach((keyRef) => {
      const depositPremium = bookedDocuments
        .filter(
          (doc) => doc.docType === 'PO' && `${doc.endorsementReference}-${doc.premiumId}` === keyRef
        )
        .reduce((maxDoc: DealLayout, currentDoc: DealLayout) => {
          return new Decimal(currentDoc.originalAmount as string)
            .abs()
            .greaterThan(new Decimal(maxDoc.originalAmount as string).abs())
            ? currentDoc
            : maxDoc;
        });
      if (depositPremium) {
        transactionSummary.push({
          transaction: 'Deposit Premium',
          ...depositPremium,
          originalAmount: String(transactionAmounts.premiumDeposit[keyRef]),
        });
      }
    });

    Object.keys(transactionAmounts.additionalDeposit).forEach((keyRef) => {
      const additionalPremium = bookedDocuments.find(
        (doc) => doc.docType === 'EN' && `${doc.endorsementReference}-${doc.premiumId}` === keyRef
      );
      if (additionalPremium) {
        transactionSummary.push({
          transaction: 'Additional Premium',
          ...additionalPremium,
          originalAmount: String(transactionAmounts.additionalDeposit[keyRef]),
        });
      }
    });

    Object.keys(transactionAmounts.returnDeposit).forEach((keyRef) => {
      const returnPremium = bookedDocuments.find(
        (doc) => isReturnPremium(doc) && `${doc.endorsementReference}-${doc.premiumId}` === keyRef
      );
      if (returnPremium) {
        transactionSummary.push({
          transaction: 'Return Premium',
          ...returnPremium,
          originalAmount: String(transactionAmounts.returnDeposit[keyRef]),
        });
      }
    });

    // Convert negative amount endorsement as RP - Temporary fix
    if (transactionSummary.length > 0 && !('transactionType' in transactionSummary[0])) {
      transactionSummary.forEach((doc) => {
        doc['transaction'] = new Decimal(doc.originalAmount as string).lessThan(0)
          ? 'Return Premium'
          : doc.transaction;
      });
    }

    return transactionSummary;
  } catch (error) {
    throw new Error();
  }
};

export const getClaimTransactionType = (transaction: DealLayout): string => {
  let trType = 'Payment';
  if (transaction.docType === 'RC' || transaction.docType === 'RD') {
    trType = 'Subrogation';
  } else if (transaction.docType === 'SC' || transaction.docType === 'SD') {
    trType = 'Salvage';
  }

  return trType;
};

// This function is used to filter and construct the
// data structure to load premiums view in the dashboard.
// Construct debtorSection - Premium receivable from insured
// Construct creditorSection - Premium payable for members
export const filterAndSortInstallmentsByTransaction = (
  ficaDocs: DealLayout[],
  endorsementRef: string,
  premiumId: string,
  isReturnPremium: boolean
): { debtors: DealLayout[]; creditors: DealLayout[]; commissions: DealLayout[] } => {
  try {
    const isReturnPremiumTr = (): Decimal => {
      return isReturnPremium ? new Decimal(-1) : new Decimal(1);
    };

    // Constructing Debtor booked documents
    const groupedPremiumTransactions = groupBy(
      'installment',
      'premiumId',
      'ficaDoc',
      'bitReference',
      'endorsementReference',
      'externalReference',
      'docType',
      'action'
    )(ficaDocs);

    const clubbedDocumentsWithSumPremium: { [key: string]: any } = {};
    const documentSummaryForInstallmentLevel: DealLayout[] = [];
    const deltaDueROEPerInstallment: { [key: string]: any } = {};
    const taxAmountPerInstallment: { [key: string]: any } = {};
    const netAmountPerInstallment: { [key: string]: any } = {};
    const commissionAmountPerInstallment: { [key: string]: any } = {};

    for (const key in groupedPremiumTransactions) {
      // Calculating Delta Due ROE amounts for 'D' transactions
      let totalDTransactionAmount = groupedPremiumTransactions[key].reduce(
        (sum: number, obj: any) => {
          if ((obj.mainTransactionItem as string).startsWith('D')) {
            return new Decimal(obj.originalAmount as string).add(sum);
          } else {
            return sum;
          }
        },
        0
      );
      totalDTransactionAmount = new Decimal(totalDTransactionAmount).mul(-1);
      if (deltaDueROEPerInstallment[key]) {
        deltaDueROEPerInstallment[key] =
          deltaDueROEPerInstallment[key].add(totalDTransactionAmount);
      } else {
        deltaDueROEPerInstallment[key] = totalDTransactionAmount;
      }

      // Calculating amount of Tax transactions in booking
      let totalTTransactionAmount = groupedPremiumTransactions[key].reduce(
        (sum: number, obj: any) => {
          if (
            (obj.mainTransactionItem as string).startsWith('T') &&
            ['PO', 'EN'].includes(obj.docType as string) &&
            premiumId === obj.premiumId &&
            obj.action === 'Booked' &&
            endorsementRef === obj.endorsementReference
          ) {
            return new Decimal(obj.originalAmount as string).add(sum);
          } else {
            return sum;
          }
        },
        0
      );

      const itemKey = `${groupedPremiumTransactions[key][0].ficaDoc}-${groupedPremiumTransactions[key][0].installment}`;
      if (taxAmountPerInstallment[itemKey]) {
        taxAmountPerInstallment[itemKey] =
          taxAmountPerInstallment[itemKey].add(totalTTransactionAmount);
      } else {
        taxAmountPerInstallment[itemKey] = totalTTransactionAmount;
      }

      // Calculating amount of commission in booking
      let totalCommisionTransactions = groupedPremiumTransactions[key].filter((obj: any) => {
        return (
          ['X110', 'X170'].includes(obj.mainTransactionItem as string) &&
          ['PO', 'EN'].includes(obj.docType as string) &&
          premiumId === obj.premiumId &&
          obj.action === 'Booked' &&
          obj.subTransaction === '1010' &&
          endorsementRef === obj.endorsementReference
        );
      });
      if (commissionAmountPerInstallment[itemKey]) {
        commissionAmountPerInstallment[itemKey] = [
          ...commissionAmountPerInstallment[itemKey],
          ...totalCommisionTransactions,
        ];
      } else {
        commissionAmountPerInstallment[itemKey] = totalCommisionTransactions;
      }

      // Calculating amount of net transactions in booking
      let totalNetAmount = groupedPremiumTransactions[key].reduce((sum: number, obj: any) => {
        if (
          ['X100', 'X160'].includes(obj.mainTransactionItem as string) &&
          ['PO', 'EN'].includes(obj.docType as string) &&
          premiumId === obj.premiumId &&
          obj.action === 'Booked' &&
          endorsementRef === obj.endorsementReference
        ) {
          if (isReturnPremium && new Decimal(obj.originalAmount).lessThan(0)) {
            return new Decimal(obj.originalAmount as string).add(sum);
          } else if (!isReturnPremium && new Decimal(obj.originalAmount).greaterThan(0)) {
            return new Decimal(obj.originalAmount as string).add(sum);
          } else {
            return sum;
          }
        } else {
          return sum;
        }
      }, 0);
      if (netAmountPerInstallment[itemKey]) {
        netAmountPerInstallment[itemKey] = netAmountPerInstallment[itemKey].add(totalNetAmount);
      } else {
        netAmountPerInstallment[itemKey] = totalNetAmount;
      }
    }

    for (const key in groupedPremiumTransactions) {
      const sumOriginalAmount = groupedPremiumTransactions[key].reduce(
        (sum: number, obj: any) => new Decimal(obj.originalAmount as string).add(sum),
        0
      );

      clubbedDocumentsWithSumPremium[key] = {
        ...groupedPremiumTransactions[key].reduce((maxObj: DealLayout, currentObj: DealLayout) => {
          return new Decimal(currentObj.originalAmount as string)
            .abs()
            .greaterThan(new Decimal(maxObj.originalAmount as string).abs())
            ? currentObj
            : maxObj;
        }),
        originalAmount: String(sumOriginalAmount.add(deltaDueROEPerInstallment[key])),
      };

      documentSummaryForInstallmentLevel.push(clubbedDocumentsWithSumPremium[key]);
    }

    let bookedDocuments = filterDocumentsByType(documentSummaryForInstallmentLevel, ['PO', 'EN']);
    bookedDocuments = bookedDocuments.filter(
      (doc) => doc.endorsementReference === endorsementRef && doc.premiumId === premiumId
    );
    bookedDocuments = bookedDocuments.sort((a, b) =>
      a.installment > b.installment ? 1 : b.installment > a.installment ? -1 : 0
    );

    // Constructing Debtor received documents
    const totalClearingAmountOfInstallment: ClearingAmountOfInstallment = {};
    const clearingDocsInEachInstallment: ClearingDocsOfInstallment = {};

    let receivedDocuments = filterDocumentsByType(documentSummaryForInstallmentLevel, ['CP']);
    receivedDocuments = receivedDocuments.filter(
      (doc) => doc.endorsementReference === endorsementRef && doc.premiumId === premiumId
    );

    receivedDocuments.forEach((doc) => {
      const installment = doc.installment as string;
      const bitReference = doc.bitReference as string;
      const compositeKey = `${installment}-${bitReference}`;

      const convertedOriginalAmount = new Decimal(doc.originalAmount as string).div(
        (doc.externalROE as string) ?? '1.00'
      );

      if (totalClearingAmountOfInstallment[compositeKey]) {
        totalClearingAmountOfInstallment[compositeKey] =
          totalClearingAmountOfInstallment[compositeKey].add(convertedOriginalAmount);
      } else {
        totalClearingAmountOfInstallment[compositeKey] = convertedOriginalAmount;
      }

      const cpDoc = {
        ...doc,
        originalAmount: String(
          new Decimal(doc.originalAmount as string).abs().times(isReturnPremiumTr())
        ),
      };
      if (clearingDocsInEachInstallment[compositeKey]) {
        clearingDocsInEachInstallment[compositeKey].push(cpDoc);
      } else {
        clearingDocsInEachInstallment[compositeKey] = [cpDoc];
      }
    });

    const debtorsBitReferenceBreakdown = bookedDocuments.map((doc) => {
      const installment = doc.installment as string;
      const bitReference = doc.bitReference as string;
      const compositeKey = `${installment}-${bitReference}`;

      let clearedAmount = '0';
      let clearedDocs: DealLayout[] = [];
      if (totalClearingAmountOfInstallment[compositeKey]) {
        clearedAmount = String(
          totalClearingAmountOfInstallment[compositeKey].abs().times(isReturnPremiumTr())
        );
      }

      if (clearingDocsInEachInstallment[compositeKey]) {
        clearedDocs = clearingDocsInEachInstallment[compositeKey];
      }

      const openBalance = String(
        new Decimal(doc['originalAmount'] as string).sub(new Decimal(clearedAmount))
      );

      return { ...doc, clearedAmount, openBalance, clearedDocs };
    });

    // Debtors wants to group by ficaDocument as CP and PO/EN document is mapped by bitReference
    // Even the cleared documents of each installment
    const groupedDebtorDocuments = groupBy('ficaDoc', 'installment')(debtorsBitReferenceBreakdown);
    const debtors = [];

    for (const key in groupedDebtorDocuments) {
      let clearedDocs: DealLayout[] = [];
      let originalAmount = new Decimal(0);
      let clearedAmount = new Decimal(0);

      groupedDebtorDocuments[key].forEach((ficaDocBatch: DealLayout) => {
        const clearedGroupedDebtors = ficaDocBatch['clearedDocs'] as DealLayout[];

        clearedDocs = [...clearedDocs, ...clearedGroupedDebtors];
        originalAmount = originalAmount.add(new Decimal(ficaDocBatch['originalAmount'] as string));
        clearedAmount = clearedAmount.add(new Decimal(ficaDocBatch['clearedAmount'] as string));
      });

      debtors.push({
        ...groupedDebtorDocuments[key][0],
        originalAmount: String(originalAmount),
        clearedAmount: String(clearedAmount),
        taxAmount: String(taxAmountPerInstallment[key]),
        netAmount: String(netAmountPerInstallment[key]),
        clearedDocs,
        openBalance: String(
          isReturnPremium
            ? originalAmount.add(clearedAmount.abs())
            : originalAmount.sub(clearedAmount.abs())
        ),
      });
    }

    // Update debtor cleared documents by grouping with ficaDocs
    // This is required as PO/EN documents are mapped to CP with bitReference
    debtors.forEach((ficaDocumentItem) => {
      const groupedDebtorClearedDocuments = groupBy('ficaDoc')(ficaDocumentItem['clearedDocs']);
      const clearedReceivableDocs: DealLayout[] = [];
      for (const innerKey in groupedDebtorClearedDocuments) {
        const sumOriginalAmount = groupedDebtorClearedDocuments[innerKey].reduce(
          (sum: number, obj: any) => new Decimal(obj.originalAmount as string).add(sum),
          0
        );

        clearedReceivableDocs.push({
          ...groupedDebtorClearedDocuments[innerKey][0],
          originalAmount: String(sumOriginalAmount),
        });
      }

      ficaDocumentItem['clearedDocs'] = clearedReceivableDocs;
    });

    // Construct Creditors consolidated member level
    let payableDocuments = filterDocumentsByType(ficaDocs, ['DR']);
    payableDocuments = payableDocuments.sort((a, b) => {
      if (a.installment > b.installment) return 1;
      if (a.installment < b.installment) return -1;
      if (a.businessPartnerId > b.businessPartnerId) return 1;
      if (a.businessPartnerId < b.businessPartnerId) return -1;
      return 0;
    });
    const groupedMemberConsolidatedData = groupBy(
      'installment',
      'premiumId',
      'externalReference',
      'endorsementReference',
      'docType',
      'action',
      'memberID',
      'businessPartnerId'
    )(payableDocuments);
    const clubbedMemberLevelConsolidatedDocumentsWithSumPremium: { [key: string]: any } = {};
    const documentSummaryForInstallmentMemberLevelConsolidated: DealLayout[] = [];

    for (const key in groupedMemberConsolidatedData) {
      const sumOriginalAmount = groupedMemberConsolidatedData[key].reduce(
        (sum: number, obj: any) => new Decimal(obj.originalAmount as string).add(sum),
        0
      );

      clubbedMemberLevelConsolidatedDocumentsWithSumPremium[key] = {
        ...groupedMemberConsolidatedData[key][0],
        orignalAmount: String(sumOriginalAmount),
        clearedDocs: [],
        clearedAmount: 0,
        openBalance: 0,
      };
      documentSummaryForInstallmentMemberLevelConsolidated.push(
        clubbedMemberLevelConsolidatedDocumentsWithSumPremium[key]
      );
    }
    let memberLevelConsolidatedBookedDocuments =
      documentSummaryForInstallmentMemberLevelConsolidated.filter(
        (doc) =>
          doc.docType === 'DR' &&
          doc.action === 'To be Paid' &&
          doc.endorsementReference === endorsementRef &&
          doc.premiumId === premiumId
      );

    // Construct Creditors member level
    let memberLevelToBePaidDocuments = ficaDocs.filter(
      (doc) =>
        doc.docType === 'DR' &&
        doc.action === 'To be Paid' &&
        doc.endorsementReference === endorsementRef &&
        doc.premiumId === premiumId
    );

    let memberLevelPaidDocuments = ficaDocs.filter(
      (doc) =>
        doc.docType === 'DR' &&
        doc.action === 'To be Paid' &&
        doc.clearingDocument !== '' &&
        doc.endorsementReference === endorsementRef &&
        doc.premiumId === premiumId
    );

    const groupedMemberLevelPaidData = groupBy(
      'installment',
      'premiumId',
      'externalReference',
      'endorsementReference',
      'docType',
      'ficaDoc',
      'clearingDocument',
      'action',
      'memberID',
      'businessPartnerId'
    )(memberLevelPaidDocuments);
    const memberLevelPaidDocGroup: ClearingDocsOfInstallment = {};
    for (const key in groupedMemberLevelPaidData) {
      const sumClearingAmount = groupedMemberLevelPaidData[key].reduce(
        (sum: number, obj: any) => new Decimal((obj.clearingAmount as string) ?? '0').add(sum),
        0
      );

      const paidDocument = groupedMemberLevelPaidData[key][0];
      const paidKey = `${paidDocument.ficaDoc}-${paidDocument.memberID}-${paidDocument.installment}-${paidDocument.businessPartnerId}`;
      const sumPaidDoc = {
        ...paidDocument,
        action: 'Paid',
        ficaDoc: paidDocument.clearingDocument,
        originalAmount: String(sumClearingAmount.abs().times(isReturnPremiumTr())),
      };

      if (memberLevelPaidDocGroup[paidKey]) {
        memberLevelPaidDocGroup[paidKey].push(sumPaidDoc);
      } else {
        memberLevelPaidDocGroup[paidKey] = [sumPaidDoc];
      }
    }

    const groupedMemberLevelToBePaidData = groupBy(
      'installment',
      'premiumId',
      'externalReference',
      'endorsementReference',
      'docType',
      'ficaDoc',
      'action',
      'memberID',
      'businessPartnerId'
    )(memberLevelToBePaidDocuments);

    const memberLevelToBePaidDocGroup: ClearingDocsOfInstallment = {};
    for (const key in groupedMemberLevelToBePaidData) {
      let sumOriginalAmount: Decimal = groupedMemberLevelToBePaidData[key].reduce(
        (sum: number, obj: any) => new Decimal(obj.originalAmount as string).add(sum),
        new Decimal(0)
      );
      sumOriginalAmount = sumOriginalAmount.abs().times(isReturnPremiumTr());

      if (groupedMemberLevelToBePaidData[key].length > 0) {
        let toBePaidDoc;
        // Get DR document which has a clearingDocument value to link clearing documents
        const filterToBePaidDocWithClearingDoc = groupedMemberLevelToBePaidData[key].filter(
          (doc: DealLayout) => doc.clearingDocument !== ''
        );
        if (filterToBePaidDocWithClearingDoc.length > 0) {
          toBePaidDoc = filterToBePaidDocWithClearingDoc[0];
        } else {
          toBePaidDoc = groupedMemberLevelToBePaidData[key][0];
        }

        const paidKey = `${toBePaidDoc.ficaDoc}-${toBePaidDoc.memberID}-${toBePaidDoc.installment}-${toBePaidDoc.businessPartnerId}`;
        const memberFicaLevelToBePaidDocument = {
          ...toBePaidDoc,
          originalAmount: String(sumOriginalAmount),
          clearedDocs: memberLevelPaidDocGroup[paidKey] ?? [],
        };

        // Get sum of cleared docs
        let clearedAmount = memberFicaLevelToBePaidDocument.clearedDocs.reduce(
          (sum: number, obj: any) => new Decimal(obj.originalAmount as string).add(sum),
          new Decimal(0)
        );
        memberFicaLevelToBePaidDocument['clearedAmount'] = String(clearedAmount);
        memberFicaLevelToBePaidDocument['openBalance'] = String(
          sumOriginalAmount.sub(clearedAmount)
        );

        const memberKey = `${toBePaidDoc.memberID as string}-${toBePaidDoc.installment as string}-${toBePaidDoc.businessPartnerId as string}`;
        if (memberLevelToBePaidDocGroup[memberKey]) {
          memberLevelToBePaidDocGroup[memberKey].push(memberFicaLevelToBePaidDocument);
        } else {
          memberLevelToBePaidDocGroup[memberKey] = [memberFicaLevelToBePaidDocument];
        }
      }
    }

    const creditors = memberLevelConsolidatedBookedDocuments.map((doc) => {
      const compositeKey = `${doc.memberID as string}-${doc.installment as string}-${doc.businessPartnerId as string}`;
      let clearedDocs: DealLayout[] = [];

      if (memberLevelToBePaidDocGroup[compositeKey]) {
        clearedDocs = memberLevelToBePaidDocGroup[compositeKey];
      }

      // Get sum of cleared docs
      let premiumAmount = clearedDocs.reduce(
        (sum: Decimal, obj: any) => new Decimal(obj.originalAmount as string).add(sum),
        new Decimal(0)
      );

      // Get sum of cleared docs
      let clearedAmount = clearedDocs.reduce(
        (sum: Decimal, obj: any) => new Decimal(obj.clearedAmount as string).add(sum),
        new Decimal(0)
      );

      doc['originalAmount'] = String(premiumAmount);
      doc['clearedAmount'] = String(clearedAmount);
      doc['openBalance'] = String(new Decimal(doc.originalAmount as string).sub(clearedAmount));

      return { ...doc, clearedDocs };
    });

    const commissions: DealLayout[] = [];
    for (const key in commissionAmountPerInstallment) {
      const sumOriginalAmount = commissionAmountPerInstallment[key].reduce(
        (sum: number, obj: any) => new Decimal(obj.originalAmount as string).add(sum),
        0
      );

      if (commissionAmountPerInstallment[key].length > 0) {
        const totalCommissionAmountPerInstallment = sumOriginalAmount
          .abs()
          .times(isReturnPremiumTr());
        const totalClearedAmountPerInstallment = new Decimal(0);
        let consolidatedCommissionInstallment = {
          ...commissionAmountPerInstallment[key][0],
          action: 'Booked',
          originalAmount: String(sumOriginalAmount.abs().times(isReturnPremiumTr())),
          clearedAmount: String(0),
          openBalance: String(
            isReturnPremium
              ? totalCommissionAmountPerInstallment.add(totalClearedAmountPerInstallment)
              : totalCommissionAmountPerInstallment.sub(totalClearedAmountPerInstallment)
          ),
        };

        commissions.push(consolidatedCommissionInstallment);
      }
    }

    return { debtors, creditors, commissions };
  } catch (error) {
    throw new Error();
  }
};

// This function is used to filter and construct the
// data structure to load claims view in the dashboard.
// Construct  +debtorSection - Claim receivable from member or broker
// Construct creditorSection - Claim payable for broker or members
export const filterAndSortClaimsByTransaction = (
  ficaDocs: DealLayout[]
): {
  debitSection: { tr: DealLayout; data: DealLayout[] };
  creditSection: { tr: DealLayout; data: DealLayout[] };
}[] => {
  try {
    const processedData: {
      debitSection: { tr: DealLayout; data: DealLayout[] };
      creditSection: { tr: DealLayout; data: DealLayout[] };
    }[] = [];

    const isSubrogationOrSalvageTr = (doc: DealLayout): Decimal => {
      return ['RM', 'SM', 'RC', 'SC', 'RD', 'SD'].includes(doc.docType as string)
        ? new Decimal(-1)
        : new Decimal(1);
    };

    const groupedClaimsByTrRef = groupBy('transactionReference')(ficaDocs);
    const trRefKeys = Object.keys(groupedClaimsByTrRef).sort();

    trRefKeys.forEach((trRef) => {
      let receivableDocs = filterDocumentsByType(groupedClaimsByTrRef[trRef], ['DM', 'RC', 'SC']);

      let totalClearedAmount = new Decimal(0);
      const totalReceivableAmount = receivableDocs.reduce(
        (sum: Decimal, obj: any) => new Decimal(obj.originalAmount as string).add(sum),
        new Decimal(0)
      );

      receivableDocs = JSON.parse(JSON.stringify(receivableDocs));
      receivableDocs = receivableDocs.filter((doc) =>
        new Decimal(doc.originalAmount as string).greaterThan(0)
      );

      let receivedDocs = filterDocumentsByType(groupedClaimsByTrRef[trRef], ['CC', 'RM', 'SM']);
      const clearingDocumentsOfMember: CommonKeyValueType = {};
      const receivableCollectionType: CommonKeyValueType = {};

      // Only DM document has the collection type for cash call not in clearing document
      receivableDocs.forEach((doc) => {
        receivableCollectionType[doc.bitReference as string] = doc.collectionType as string;
      });

      receivedDocs.forEach((doc) => {
        const bitReference = doc.bitReference as string;
        const transformedDoc = {
          ...doc,
          originalAmount: String(
            new Decimal(doc.originalAmount as string).abs().times(isSubrogationOrSalvageTr(doc))
          ),
          collectionType: receivableCollectionType[bitReference],
        };

        if (clearingDocumentsOfMember[bitReference]) {
          clearingDocumentsOfMember[bitReference].push(transformedDoc);
        } else {
          clearingDocumentsOfMember[bitReference] = [transformedDoc];
        }
      });

      receivableDocs.forEach((item) => {
        let clearedDocs = clearingDocumentsOfMember[item.bitReference as string] ?? [];

        // This scenario falls under clearing with offset premium or any other
        // collection type method which does not create CC, RM or SM document for clearing
        if (clearedDocs.length === 0 && item['clearingDocument'] !== '') {
          clearedDocs = [
            {
              ...item,
              originalCurrency: item.settlementCurrency,
              originalAmount: String(
                new Decimal(item.clearingAmount as string)
                  .abs()
                  .times(isSubrogationOrSalvageTr(item))
              ),
            },
          ];
        }

        item['originalAmount'] = String(
          new Decimal(item.originalAmount as string).abs().times(isSubrogationOrSalvageTr(item))
        );
        item['clearedDocs'] = clearedDocs;
        item['clearedAmount'] = clearedDocs.reduce(
          (sum: Decimal, obj: any) =>
            new Decimal(obj.originalAmount as string)
              .div((obj.externalROE as string) ?? '1.00')
              .mul((obj.divFactor as string) ?? '1.00')
              .add(sum)
              .toFixed(obj.decimalPlaces ?? 2),
          new Decimal(0)
        );
        item['openBalance'] = String(
          new Decimal(item.originalAmount as string).sub(new Decimal(item.clearedAmount as string))
        );

        totalClearedAmount = totalClearedAmount.add(
          new Decimal(item['clearedAmount'] as string).abs()
        );
      });

      let debtorTransaction = null;
      if (receivableDocs.length > 0) {
        debtorTransaction = JSON.parse(JSON.stringify(receivableDocs[0]));
        debtorTransaction['transaction'] = getClaimTransactionType(debtorTransaction);
        debtorTransaction['originalAmount'] = String(
          totalReceivableAmount.times(isSubrogationOrSalvageTr(debtorTransaction))
        );
        debtorTransaction['clearedAmount'] = String(
          totalClearedAmount.times(isSubrogationOrSalvageTr(debtorTransaction))
        );
      }

      // Creditor section
      let totalClearedCreditorAmount = new Decimal(0);
      let payableDocs: DealLayout[] = filterDocumentsByType(groupedClaimsByTrRef[trRef], [
        'CL',
        'RD',
        'SD',
      ]);

      let payableCashCallReleasedDocs: DealLayout[] = filterDocumentsByType(
        groupedClaimsByTrRef[trRef],
        ['CR']
      );

      let payableSalSubReleasedDocs: DealLayout[] = filterDocumentsByType(
        groupedClaimsByTrRef[trRef],
        ['RD', 'SD']
      );

      payableDocs = payableDocs.reduce((array: DealLayout[], doc: DealLayout) => {
        const amount = new Decimal(doc.originalAmount as string);
        if (amount.lessThan(0)) {
          const updatedDoc = {
            ...doc,
            originalAmount: String(amount.abs()),
          };
          array.push(updatedDoc);
        } else {
          array.push(doc);
        }
        return array;
      }, []);

      // In CL document, based on the collecting date, there can be multiple documents
      // However, there is no option to map each CL document with CR release document specially in cash-call
      // Therefore, adding an option to show the total CL summary
      const groupedBrokerPayableDocs = groupBy('ficaDoc')(payableDocs);
      const brokerPayableSummary = [];
      for (const key in groupedBrokerPayableDocs) {
        const clDocumentArray = groupedBrokerPayableDocs[key];
        const totalCLAmount = clDocumentArray.reduce(
          (sum: number, obj: any) => new Decimal(obj.originalAmount as string).add(sum),
          0
        );
        brokerPayableSummary.push({
          ficaDoc: key,
          businessPartnerId: clDocumentArray[0]['businessPartnerId'],
          businessPartner: clDocumentArray[0]['businessPartner'],
          originalAmount: String(totalCLAmount),
          postingDate: clDocumentArray[0]['postingDate'],
          originalCurrency: clDocumentArray[0]['originalCurrency'],
        });
      }

      const processedPayableReleasedDocs = [];
      const groupedPayableReleasedDocs = groupBy('ficaDoc')(payableCashCallReleasedDocs);

      for (const key in groupedPayableReleasedDocs) {
        const groupedPayableReleasedArray = groupedPayableReleasedDocs[key];
        const totalPayableAmount = groupedPayableReleasedArray.reduce(
          (sum: number, obj: any) => new Decimal(obj.originalAmount as string).add(sum),
          0
        );

        if (groupedPayableReleasedArray.length > 0 && totalPayableAmount.lessThan(0)) {
          const consolidatedPayableReleaseDoc: DealLayout = {
            ...groupedPayableReleasedDocs[key][0],
            originalAmount: String(totalPayableAmount.abs()),
            clearedDocs: [],
          };

          const clearingDocs: DealLayout[] = [];
          let totalClearedAmount = new Decimal(0);
          groupedPayableReleasedArray.forEach((doc: DealLayout) => {
            if (doc.clearingDocument !== '') {
              const clearingDoc = JSON.parse(JSON.stringify(doc));
              clearingDoc['ficaDoc'] = doc.clearingDocument;
              clearingDoc['originalAmount'] = new Decimal(doc.clearingAmount as string).abs();
              clearingDocs.push(clearingDoc);
              totalClearedAmount = totalClearedAmount.add(
                new Decimal(clearingDoc.originalAmount).div(clearingDoc['externalROE']).toFixed(2)
              );
            }
          });

          totalClearedCreditorAmount = totalClearedCreditorAmount.add(
            totalClearedAmount
              .abs()
              .mul(new Decimal((consolidatedPayableReleaseDoc.externalROE as string) ?? '1.00'))
              .toFixed(2)
          );
          consolidatedPayableReleaseDoc['clearedDocs'] = clearingDocs;
          consolidatedPayableReleaseDoc['clearedAmount'] = String(totalClearedAmount);
          consolidatedPayableReleaseDoc['openBalance'] = String(
            new Decimal(consolidatedPayableReleaseDoc.originalAmount as string).sub(
              new Decimal(consolidatedPayableReleaseDoc.clearedAmount as string)
            )
          );
          processedPayableReleasedDocs.push(consolidatedPayableReleaseDoc);
        }
      }

      // For salvage and subrogation, there is no further release step
      payableSalSubReleasedDocs.forEach((doc) => {
        let consolidatedPayableSalSubDoc: DealLayout = {
          ...doc,
          originalAmount: String(new Decimal(doc.originalAmount as string).abs().mul(-1)),
        };

        let totalClearedAmount = new Decimal(0);
        if (doc.clearingDocument !== '') {
          let clearingDoc = JSON.parse(JSON.stringify(doc));
          clearingDoc['ficaDoc'] = doc.clearingDocument;
          clearingDoc['originalAmount'] = new Decimal(doc.clearingAmount as string).abs().mul(-1);
          consolidatedPayableSalSubDoc['clearedDocs'] = [clearingDoc];
          totalClearedAmount = totalClearedAmount.add(new Decimal(clearingDoc.originalAmount));
        }

        consolidatedPayableSalSubDoc['clearedAmount'] = String(totalClearedAmount);
        totalClearedCreditorAmount = totalClearedCreditorAmount.add(totalClearedAmount.abs());
        consolidatedPayableSalSubDoc['openBalance'] = String(
          new Decimal(consolidatedPayableSalSubDoc.originalAmount as string).sub(
            new Decimal(consolidatedPayableSalSubDoc.clearedAmount as string)
          )
        );
        processedPayableReleasedDocs.push(consolidatedPayableSalSubDoc);
      });

      // Construct the summary transaction for creditor level-1 breakdown
      let creditorTransaction = null;
      if (payableDocs.length > 0) {
        const totalPayableAmount = payableDocs.reduce(
          (sum: Decimal, obj: any) => new Decimal(obj.originalAmount as string).add(sum),
          new Decimal(0)
        );

        creditorTransaction = JSON.parse(JSON.stringify(payableDocs[0]));
        creditorTransaction['transaction'] = getClaimTransactionType(creditorTransaction);
        creditorTransaction['originalAmount'] = String(
          totalPayableAmount.times(isSubrogationOrSalvageTr(creditorTransaction))
        );
        creditorTransaction['clearedAmount'] = String(
          totalClearedCreditorAmount.times(isSubrogationOrSalvageTr(creditorTransaction))
        );
        creditorTransaction['summary'] = brokerPayableSummary;
      }

      processedData.push({
        creditSection: {
          tr: creditorTransaction,
          data: creditorTransaction ? processedPayableReleasedDocs : [],
        },
        debitSection: { tr: debtorTransaction, data: debtorTransaction ? receivableDocs : [] },
      });
    });

    return processedData;
  } catch (error) {
    throw new Error();
  }
};
