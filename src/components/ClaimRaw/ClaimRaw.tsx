import { Card } from '@mui/material';
import { StyledDiv } from './ClaimRaw-styles';
import Title from '../Title';
import { DealLayout } from '../../types/deal';
import { filterAndSortClaimsByTransaction } from '../../utils/commons';
import DealBody from '../DealBody';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type ClaimProps = {
  ficaDocs: DealLayout[];
};

export const ClaimRaw = ({ ficaDocs }: ClaimProps): JSX.Element => {
  const routing: string = useSelector((state: RootState) => state.search.search.routing);

  const processedData: {
    debitSection: { tr: DealLayout; data: DealLayout[] };
    creditSection: { tr: DealLayout; data: DealLayout[] };
  }[] = filterAndSortClaimsByTransaction(ficaDocs);

  const isCreditorSectionNeeded =
    processedData.filter(
      (item) =>
        (routing === 'policy' && item.creditSection.data.length > 0) ||
        (routing === 'claim' && item.creditSection.tr)
    ).length > 0;

  return (
    <>
      <StyledDiv>
        <Card variant="outlined">
          <Title
            title={`Debtors | Claim Reference ${ficaDocs[0].claimReference as string}`}
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
              title={`Creditors | Claim Reference ${ficaDocs[0].claimReference}`}
              system={ficaDocs[0].sys as string}
            />
            <DealBody processedData={processedData} isCreditors={true} />
          </Card>
        </StyledDiv>
      ) : null}
    </>
  );
};

export default ClaimRaw;
