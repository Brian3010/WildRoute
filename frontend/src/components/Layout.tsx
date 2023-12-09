import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Outlet, useLocation } from 'react-router-dom';
import '../assets/NavBar.css';

import FlashMessage from './FlashMessage';
import Footer from './Footer';
import NavigationBar from './NavigationBar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

// * <NavBar/>
function Layout() {
  const location = useLocation();

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <NavigationBar />
      </ThemeProvider>
      <FlashMessage key={location.pathname} />
      <main className="main-container">
        <Outlet />
      </main>
      {location.pathname !== '/' && <Footer />}
    </>
  );
}
export default Layout;
