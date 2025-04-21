import { useState } from 'react';
import { CardActions, Chip, Collapse, IconButton, IconButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { StyledDiv } from './PolicyAction-styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DealLayout } from '../../types/deal';
import SubSection from '../SubSection';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.standard,
  }),
}));

type ActionProps = {
  bookedDoc: DealLayout;
  ficaDocs: DealLayout[];
  installment: string;
};

export const PolicyAction = ({ bookedDoc, ficaDocs, installment }: ActionProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const debtors = ficaDocs.filter((doc) => ['Booked', 'Received'].includes(doc.action as string));
  const creditors = ficaDocs.filter((doc) => ['To be Paid', 'Paid'].includes(doc.action as string));

  return (
    <>
      <StyledDiv>
        <div>
          <Chip
            label={bookedDoc.sys === '01' ? `Billing Engine` : `On Premise`}
            size="small"
            sx={{ marginRight: 1 }}
          />
          <Chip label={`Installment ${installment}`} size="small" sx={{ marginRight: 1 }} />
          <Chip label="Premium" size="small" />
        </div>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </StyledDiv>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <SubSection sectionType="debtors" ficaDocs={debtors} />
        <SubSection sectionType="creditors" ficaDocs={creditors} />
      </Collapse>
    </>
  );
};

export default PolicyAction;
