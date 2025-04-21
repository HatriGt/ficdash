import { Chip, Typography } from '@mui/material';
import { StyledDiv } from './Title-styles';

type TitleType = {
  title: string;
  system: string;
};

export const Title = ({ title, system }: TitleType): JSX.Element => {
  return (
    <StyledDiv>
      <Typography>{title}</Typography>
      <Chip label={system === '01' ? `Billing Engine` : `On Premise`} size="small" />
    </StyledDiv>
  );
};

export default Title;
