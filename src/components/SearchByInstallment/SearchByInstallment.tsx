import { TextField } from '@mui/material';
import { StyledFormLabel } from './SearchByInstallment-styles';

export const SearchByInstallment = (): JSX.Element => {
  return (
    <div style={{ width: '100%', marginTop: 45, display: 'flex', alignItems: 'center' }}>
      <StyledFormLabel>Filters:</StyledFormLabel>
      <TextField label="Installment" variant="outlined" size="small" />
    </div>
  );
};

export default SearchByInstallment;
