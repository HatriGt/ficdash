import '@mui/material/styles/createPalette';

export type Theme = {
  palette: Mode;
};

export type SystemState = {
  palette: PaletteOptions;
};

declare module '@mui/material/styles/createPalette' {
  export type PaletteOptions = {
    mode: string;
  };
}
