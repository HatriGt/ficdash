import { Card } from '@mui/material';
import { StyledDiv } from './InstallmentRaw-styles';
import Title from '../Title';
import { DealLayout, DealSectionProps } from '../../types/deal';
import DealBody from '../DealBody';
import {
  filterAndSortInstallmentsByTransaction,
  mainTransactionSummary,
} from '../../utils/commons';
import Decimal from 'decimal.js';

type InstallmentRawProps = {
  ficaDocs: DealLayout[];
};

export const InstallmentRaw = ({ ficaDocs }: InstallmentRawProps): JSX.Element => {
  const mainPremiumTransactions: DealLayout[] = mainTransactionSummary(ficaDocs);

  const processedData: DealSectionProps[] = mainPremiumTransactions.map((tr: DealLayout) => {
    try {
      const results: { debtors: DealLayout[]; creditors: DealLayout[]; commissions: DealLayout[] } =
        filterAndSortInstallmentsByTransaction(
          ficaDocs,
          tr.endorsementReference as string,
          tr.premiumId as string,
          tr.transaction === 'Return Premium'
        );

      const creditors = results.creditors;
      const debtors = results.debtors;
      const commissions = results.commissions;

      const creditorTr = JSON.parse(JSON.stringify(tr));
      // Set clearing amount for level-1 premium and clearingAmount for debtors
      const debtorClearedAmount = debtors.reduce((sum: Decimal, obj: DealLayout) => {
        const amountToAdd = new Decimal(obj.clearedAmount as string);
        return sum.add(amountToAdd);
      }, new Decimal(0));
      tr['clearedAmount'] = String(debtorClearedAmount);

      // Set tax premium amount for debtors
      const debtorTaxAmount = debtors.reduce((sum: Decimal, obj: DealLayout) => {
        const amountToAdd = new Decimal(obj.taxAmount as string);
        return sum.add(amountToAdd);
      }, new Decimal(0));
      tr['taxAmount'] = String(debtorTaxAmount);

      // Set net premium amount for debtors
      const debtorNetAmount = debtors.reduce((sum: Decimal, obj: DealLayout) => {
        const amountToAdd = new Decimal(obj.netAmount as string);
        return sum.add(amountToAdd);
      }, new Decimal(0));
      tr['netAmount'] = String(debtorNetAmount);

      if (creditors.length > 0) {
        // Set clearing amount for level-1 premium and clearingAmount for creditors
        const creditorClearedAmount = creditors.reduce((sum: Decimal, obj: DealLayout) => {
          const amountToAdd = new Decimal(obj.clearedAmount as string);
          return sum.add(amountToAdd);
        }, new Decimal(0));
        const creditorTotalPayableAmount = creditors.reduce((sum: Decimal, obj: DealLayout) => {
          const amountToAdd = new Decimal(obj.originalAmount as string);
          return sum.add(amountToAdd);
        }, new Decimal(0));

        creditorTr['originalCurrency'] = creditors[0].originalCurrency;
        creditorTr['originalAmount'] = String(creditorTotalPayableAmount);
        creditorTr['clearedAmount'] = String(creditorClearedAmount);
      }

      const commissionTr = JSON.parse(JSON.stringify(tr));

      // Set clearing amount for level-1 premium and clearingAmount for commissions
      const commissionClearedAmount = commissions.reduce((sum: Decimal, obj: DealLayout) => {
        const amountToAdd = new Decimal(obj.clearedAmount as string);
        return sum.add(amountToAdd);
      }, new Decimal(0));
      const comissionTotalPayableAmount = commissions.reduce((sum: Decimal, obj: DealLayout) => {
        const amountToAdd = new Decimal(obj.originalAmount as string);
        return sum.add(amountToAdd);
      }, new Decimal(0));
      commissionTr['originalAmount'] = String(comissionTotalPayableAmount);
      commissionTr['clearedAmount'] = String(commissionClearedAmount);

      return {
        creditSection: { tr: creditorTr, data: creditors },
        debitSection: { tr, data: debtors },
        commissionSection: { tr: commissionTr, data: commissions },
      };
    } catch (error) {
      throw new Error();
    }
  });

  const isCreditorSectionNeeded =
    processedData.filter((item) => item.creditSection.data.length > 0).length > 0;

  return (
    <>
      <StyledDiv>
        <Card variant="outlined">
          <Title
            title={`Debtors | External Reference ${ficaDocs[0].externalReference as string}`}
            system={ficaDocs[0].sys as string}
          />
          <DealBody processedData={processedData} isCreditors={false} />
          {/* <TotalAmount /> */}
        </Card>
      </StyledDiv>
      {isCreditorSectionNeeded ? (
        <StyledDiv>
          <Card variant="outlined">
            <Title
              title={`Creditors | External Reference ${ficaDocs[0].externalReference}`}
              system={ficaDocs[0].sys as string}
            />
            <DealBody processedData={processedData} isCreditors={true} />
          </Card>
        </StyledDiv>
      ) : null}
      {/* <StyledDiv>
        <Card variant="outlined">
          <Title
            title={`MGA/elseco Commission | External Reference ${ficaDocs[0].externalReference}`}
            system={ficaDocs[0].sys as string}
          />
          <DealBody processedData={processedData} isCommision={true} isCreditors={false} />
        </Card>
      </StyledDiv> */}
    </>
  );
};

export default InstallmentRaw;
