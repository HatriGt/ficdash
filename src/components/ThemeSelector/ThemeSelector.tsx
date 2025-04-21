import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, PaletteOptions, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { RootState } from '../../store/store';
import { updateTheme } from '../../store/system/reducerSlice';
import { StyledDiv } from './ThemeSelector-styles';
import { THEME_MODES } from '../../utils/commons';

const ThemeMode = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootState, object, Action<string>>>();
  const themeMode: PaletteOptions = useSelector((state: RootState) => state.system.palette);

  const changeThemeHandler = (): void => {
    dispatch(updateTheme());
  };

  return (
    <StyledDiv>
      <Tooltip title="Change Theme">
        <IconButton onClick={() => changeThemeHandler()} color="inherit">
          {themeMode.mode === THEME_MODES.DARK_MODE ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
    </StyledDiv>
  );
};

export default ThemeMode;
