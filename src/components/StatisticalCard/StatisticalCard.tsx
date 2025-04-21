import { Card, CardContent, Typography } from '@mui/material';
import { StatisticalCardType } from '../../types/common';

export const StatisticalCard = ({ title, value }: StatisticalCardType): JSX.Element => {
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div" align="center">
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatisticalCard;
