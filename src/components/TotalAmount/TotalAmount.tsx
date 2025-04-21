import { StyledDiv } from './TotalAmount-styles';
import { Grid, Typography } from '@mui/material';

const TotalAmount = () => {
  return (
    <StyledDiv>
      <Grid container sx={{ paddingLeft: 2.5, paddingRight: 2.5 }}>
        <Grid item sm={9}></Grid>
        <Grid
          item
          sm={1.45}
          sx={{
            borderTop: '1px solid',
            borderBottom: '4px double',
            paddingTop: 1,
            paddingBottom: 1,
          }}>
          <Typography variant="body2">Total Premium Amount</Typography>
          <Typography variant="body2" color="textSecondary">
            USD 12,000.00
          </Typography>
        </Grid>
        <Grid
          item
          sm={1.55}
          sx={{
            borderTop: '1px solid',
            borderBottom: '4px double',
            paddingTop: 1,
            paddingBottom: 1,
          }}>
          <Typography variant="body2">Total Cleared Amount</Typography>
          <Typography variant="body2" color="textSecondary">
            USD 12,000.00
          </Typography>
        </Grid>
      </Grid>
    </StyledDiv>
  );
};

export default TotalAmount;
