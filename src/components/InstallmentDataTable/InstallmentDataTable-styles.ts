import { styled } from '@mui/material/styles';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { THEME_MODES } from '../../utils/commons';

export const StyledDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: theme.spacing(1),
  width: '100%',
  '& .premium-action-header': {
    backgroundColor: theme.palette.mode === THEME_MODES.DARK_MODE ? '#333' : '#b0c9e2',
  },
}));

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  overflowX: 'scroll',
}));

export const StyledGridToolbarContainer = styled(GridToolbarContainer)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  backgroundColor: '#f0f0f0',
  alignItems: 'center',
}));

export const StyledDataTableDiv = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}));
