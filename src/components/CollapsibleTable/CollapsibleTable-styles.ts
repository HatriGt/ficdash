import { styled } from '@mui/material/styles';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { THEME_MODES } from '../../utils/commons';
import { Box, TableHead } from '@mui/material';

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  padding: 0,
  backgroundColor: theme.palette.mode === THEME_MODES.DARK_MODE ? '#333' : '#b0c9e2',
}));

export const StyledTableSummaryHead = styled(TableHead)(({ theme }) => ({
  padding: 0,
  backgroundColor: theme.palette.mode === THEME_MODES.DARK_MODE ? '#333' : '#e2e2e2',
  borderColor: 'none',
}));

export const StyledInnerTableHead = styled(TableHead)(({ theme }) => ({
  padding: 0,
  borderBottom: `2px dashed ${theme.palette.mode === THEME_MODES.DARK_MODE ? '#333' : '#b0c9e2'}`,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : '#e2e2e2',
}));

export const StyledThirdLevelTableHead = styled(TableHead)(({ theme }) => ({
  padding: 0,
  borderBottom: `2px dashed ${theme.palette.mode === THEME_MODES.DARK_MODE ? '#333' : '#b0c9e2'}`,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : '#a7b4c2',
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0),
  padding: theme.spacing(0),
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
}));

export const StyledThirdLevelBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0),
  padding: theme.spacing(0),
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(255, 255, 255)',
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

export const StyledDataSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  border: `2px dashed ${theme.palette.mode === THEME_MODES.DARK_MODE ? '#333' : '#b0c9e2'}`,
  minHeight: 70,
  marginTop: 20,
  marginBottom: 20,
}));
