import { Divider, Grid, Typography } from '@mui/material';
import { StyledDiv } from './Body-styles';
import { convertDate } from '../../utils/commons';
import numeral from 'numeral';
import { DealLayout } from '../../types/deal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type BodyProps = {
  ficaDoc: DealLayout;
};

export const Body = ({ ficaDoc }: BodyProps): JSX.Element => {
  const routing: string = useSelector((state: RootState) => state.search.search.routing);

  return (
    <StyledDiv>
      <Grid item xs={12} sm={3}>
        <Typography variant="body2">External Reference</Typography>
        <Typography variant="body2" color="textSecondary">
          {ficaDoc.externalReference as string}
        </Typography>
        <Divider />
      </Grid>
      {routing === 'claim' ? (
        <>
          <Grid item xs={12} sm={3}>
            <Typography variant="body2">Unique Claim Reference</Typography>
            <Typography variant="body2" color="textSecondary">
              {ficaDoc.ucr !== '' ? (ficaDoc.ucr as string) : 'N/A'}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body2">Business Partner</Typography>
            <Typography variant="body2" color="textSecondary">
              {ficaDoc.businessPartner as string}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body2">Business Partner ID</Typography>
            <Typography variant="body2" color="textSecondary">
              {ficaDoc.businessPartnerId as string}
            </Typography>
            <Divider />
          </Grid>
        </>
      ) : (
        <Grid item xs={12} sm={3}>
          <Typography variant="body2">Premium ID</Typography>
          <Typography variant="body2" color="textSecondary">
            {ficaDoc.premiumId as string}
          </Typography>
          <Divider />
        </Grid>
      )}

      <Grid item xs={12} sm={3}>
        <Typography variant="body2">Posting Date</Typography>
        <Typography variant="body2" color="textSecondary">
          {convertDate(ficaDoc.postingDate as string)}
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="body2">{routing === 'policy' ? 'Premium' : 'Claim'} Amount</Typography>
        <Typography variant="body2" color="textSecondary">
          {`${ficaDoc.currency as string} ${numeral(ficaDoc.premium as string).format('0,0.00')}`}
        </Typography>
        <Divider />
      </Grid>
    </StyledDiv>
  );
};

export default Body;
