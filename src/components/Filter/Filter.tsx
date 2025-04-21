import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { StyledDiv, StyledFormLabel, StyledPatentDiv } from './Filter-styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Search } from '../../types/searchState';
import {
  clearSearch,
  setClaimReference,
  setEndorsementReference,
  setEnteredOn,
  setExternalReference,
  setInstallment,
  setPolicyNumber,
  setPremiumId,
  setRouting,
  setSys,
  setTransactionReference,
  setUCR,
  // setUMR,
} from '../../store/search/reducerSlice';
import { ChangeEvent } from 'react';
import { getDealPremiums } from '../../store/search/thunks';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import moment from 'moment';
import useEnvironement from '../../hooks/useEnvironemnt';

const Filter = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootState, object, Action<string>>>();

  useEnvironement();
  const search: Search = useSelector((state: RootState) => state.search.search);

  const handleChangeExternalReference = (event: ChangeEvent<HTMLInputElement>) => {
    const externalReference = event.target.value;
    dispatch(setExternalReference({ externalReference }));
  };

  const handleChangePremiumId = (event: ChangeEvent<HTMLInputElement>) => {
    const premiumId = event.target.value;
    dispatch(setPremiumId({ premiumId }));
  };

  const handleChangePolicyNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const policyNumber = event.target.value;
    dispatch(setPolicyNumber({ policyNumber }));
  };

  const handleChangeInstallment = (event: ChangeEvent<HTMLInputElement>) => {
    const installment = event.target.value;
    dispatch(setInstallment({ installment }));
  };

  const handleChangeEndorsementReference = (event: ChangeEvent<HTMLInputElement>) => {
    const endorsementReference = event.target.value;
    dispatch(setEndorsementReference({ endorsementReference }));
  };

  const handleChangeSys = (event: SelectChangeEvent) => {
    const sys = event.target.value;
    dispatch(setSys({ sys }));
  };

  const handleChangeRouting = (event: SelectChangeEvent) => {
    const routing = event.target.value;
    dispatch(setRouting({ routing }));
  };

  const handleChangeClaimReference = (event: ChangeEvent<HTMLInputElement>) => {
    const claimReference = event.target.value;
    dispatch(setClaimReference({ claimReference }));
  };

  const handleChangeUCR = (event: ChangeEvent<HTMLInputElement>) => {
    const ucr = event.target.value;
    dispatch(setUCR({ ucr }));
  };

  const handleChangeTransactionReference = (event: ChangeEvent<HTMLInputElement>) => {
    const transactionReference = event.target.value;
    dispatch(setTransactionReference({ transactionReference }));
  };

  const handleChangeEnteredOnDate = (enteredOn: string | null) => {
    if (enteredOn) {
      enteredOn = moment(Date.parse(enteredOn)).format('YYYY-MM-DD');
      dispatch(setEnteredOn({ enteredOn }));
    }
  };

  const handleClickClearSearch = () => {
    dispatch(clearSearch());
  };

  const handleClickSearch = () => {
    dispatch(getDealPremiums());
  };

  const isSearchDisabled =
    search.policyNumber === '' &&
    search.externalReference === '' &&
    search.installment === '' &&
    search.premiumId === '' &&
    search.claimReference === '' &&
    search.transactionReference === '' &&
    search.ucr === '' &&
    search.umr === '' &&
    search.enteredOn === '';

  return (
    <StyledPatentDiv>
      <StyledDiv>
        <Grid container direction={'column'} spacing={1.8}>
          <Grid item>
            <StyledFormLabel>Search FICA documents:</StyledFormLabel>
          </Grid>
          <Grid item>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="label-system">Routing</InputLabel>
              <Select
                labelId="label-type"
                id="select-type"
                value={search.routing}
                label="Routing"
                onChange={handleChangeRouting}>
                <MenuItem value="policy">Policy</MenuItem>
                <MenuItem value="claim">Claim</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              sx={{ width: '100%' }}
              label="External Reference"
              variant="outlined"
              value={search.externalReference}
              onChange={handleChangeExternalReference}
            />
          </Grid>
          {search.routing === 'policy' ? (
            <>
              <Grid item>
                <TextField
                  sx={{ width: '100%' }}
                  label="Policy Number"
                  variant="outlined"
                  value={search.policyNumber}
                  onChange={handleChangePolicyNumber}
                />
              </Grid>
              <Grid item>
                <TextField
                  sx={{ width: '100%' }}
                  label="Premium ID"
                  variant="outlined"
                  value={search.premiumId}
                  onChange={handleChangePremiumId}
                />
              </Grid>
              <Grid item>
                <TextField
                  disabled={search.externalReference === '' && search.premiumId === ''}
                  sx={{ width: '100%' }}
                  label="Installment"
                  variant="outlined"
                  value={search.installment}
                  onChange={handleChangeInstallment}
                />
              </Grid>
              <Grid item>
                <TextField
                  disabled={search.externalReference === '' && search.premiumId === ''}
                  sx={{ width: '100%' }}
                  label="Endorsement Reference"
                  variant="outlined"
                  value={search.endorsementReference}
                  onChange={handleChangeEndorsementReference}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item>
                <TextField
                  sx={{ width: '100%' }}
                  label="UCR"
                  variant="outlined"
                  value={search.ucr}
                  onChange={handleChangeUCR}
                />
              </Grid>
              <Grid item>
                <TextField
                  sx={{ width: '100%' }}
                  label="Claim Reference"
                  variant="outlined"
                  value={search.claimReference}
                  onChange={handleChangeClaimReference}
                />
              </Grid>
              <Grid item>
                <TextField
                  sx={{ width: '100%' }}
                  label="Transaction Reference"
                  variant="outlined"
                  value={search.transactionReference}
                  onChange={handleChangeTransactionReference}
                />
              </Grid>
            </>
          )}
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="YYYY-MM-DD"
                label="Entered On"
                sx={{ width: '100%' }}
                value={search.enteredOn !== '' ? dayjs(search.enteredOn) : null}
                onChange={(newDate: dayjs.Dayjs | null) => {
                  handleChangeEnteredOnDate(newDate ? String(newDate) : '');
                }}
                slotProps={{
                  field: { clearable: true, onClear: () => handleChangeEnteredOnDate('') },
                }}
              />
            </LocalizationProvider>
          </Grid>
          {search.environment !== 'Prod' ? (
            <Grid item>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="label-system">System</InputLabel>
                <Select
                  labelId="label-system"
                  id="select-system"
                  value={search.sys}
                  label="System"
                  onChange={handleChangeSys}>
                  <MenuItem value="">
                    <em>-Select One-</em>
                  </MenuItem>
                  <MenuItem value="01">Billing Engine</MenuItem>
                  <MenuItem value="77">On Premise</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          ) : null}
        </Grid>
        <div style={{ width: '100%' }}>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginBottom: 10,
            }}>
            <Button
              variant="outlined"
              endIcon={<CloseIcon />}
              sx={{ marginRight: 1 }}
              onClick={handleClickClearSearch}>
              Clear
            </Button>
            <Button
              variant="contained"
              endIcon={<SearchIcon />}
              onClick={handleClickSearch}
              disabled={isSearchDisabled}>
              Search
            </Button>
          </div>
        </div>
      </StyledDiv>
      <Grid
        item
        display={{ xs: 'none', md: 'flex' }}
        sx={{
          marginTop: 10,
          paddingBottom: 3,
          justifyContent: 'center',
        }}>
        <Divider sx={{ height: '90vh' }} flexItem orientation="vertical" />
      </Grid>
    </StyledPatentDiv>
  );
};

export default Filter;
