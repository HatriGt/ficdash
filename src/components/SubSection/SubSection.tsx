import { Typography } from '@mui/material';
import { StyledCardContent, StyledSubSection } from './SubSection-styles';
import InstallmentDataTable from '../InstallmentDataTable';
import { DealLayout } from '../../types/deal';
import { captialize } from '../../utils/commons';
import { DEAL_HEADERS } from '../../utils/constants';

type ActionProps = {
  sectionType: string;
  ficaDocs: DealLayout[];
};

export const SubSection = ({ sectionType, ficaDocs }: ActionProps): JSX.Element => {
  return (
    <StyledCardContent>
      <Typography variant="body1">{captialize(sectionType)}:</Typography>
      {ficaDocs.length > 0 ? (
        <InstallmentDataTable ficaDocs={ficaDocs} headerItems={DEAL_HEADERS} />
      ) : (
        <StyledSubSection>
          <Typography variant="subtitle2">No {sectionType} data found</Typography>
        </StyledSubSection>
      )}
    </StyledCardContent>
  );
};

export default SubSection;
