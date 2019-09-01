const size = {
  desktopLG: '75rem',
  desktopSM: '62rem',
  tabletSM: '36rem',
  phone: '0rem',
};

const device = {
  desktopLG: `(min-width: ${size.desktopLG})`,
  desktopSM: `(min-width: ${size.desktopSM})`,
  tabletSM: `(min-width: ${size.tabletSM})`,
  phone: `(min-width: ${size.phone})`,
};

const m = (factor = 1) => {
  const margin = 0.5 * factor;
  return `${margin}rem`;
};

const p = (factor = 1) => {
  const padding = 0.5 * factor;
  return `${padding}rem`;
};

const defaultTheme = {
  /* spacing */
  m,
  p,
  /* break points */
  device,
  /* font size */
  formTitleFontSize: '1.5rem',
  /* dimensions */
  formWidth: '30rem',
  inputFieldHeight: '2.5rem',
  /* colors */
  bgColor1: '#607D8B',
  bgColor2: '#234154',
  fgColor1: '#FFFFFF',
  fgColor2: '#9D9D9D',
  /* button styling */
  btnBgColor: '#000000',
  btnFgColor: '#FFFFFF',
  btnHeight: '2.5rem',
  btnWidth: '6rem',
  btnRadius: '5px',
  /* shadow */
  boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
};

export default defaultTheme;
