import { Chip } from '@mui/material';
import { StyledDiv } from './ClaimAction-styles';
import { DealLayout } from '../../types/deal';

type ActionProps = {
  ficaDoc: DealLayout;
};

export const ClaimAction = ({ ficaDoc }: ActionProps): JSX.Element => {
  return (
    <>
      <StyledDiv>
        <div>
          <Chip
            label={ficaDoc.sys === '01' ? `Billing Engine` : `On Premise`}
            size="small"
            sx={{ marginRight: 1 }}
          />
          <Chip
            label={`${ficaDoc.transactionReference !== '' ? ficaDoc.transactionReference : 'N/A'}`}
            size="small"
            sx={{ marginRight: 1 }}
          />
          <Chip label="Claim" size="small" />
        </div>
      </StyledDiv>
    </>
  );
};

export default ClaimAction;
