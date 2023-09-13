import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import '../assets/NavBar.css';
import { IAuthContext } from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';
import useFlashMessage from '../hooks/useFlashMessage';
import useLogout from '../hooks/useLogout';
import FlashMessage from './FlashMessage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const drawerWidth = '240px';

// * <NavBar/>
function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { auth } = useAuth() as IAuthContext;
  const logout = useLogout();
  const navigate = useNavigate();
  const { setFlashMessage } = useFlashMessage();
  // console.log('file: NavBar.tsx:23 ~ NavBar ~ auth:', auth);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const localUser = JSON.parse(localStorage.getItem('user')!);

  const isLoggedIn = auth.accessToken.length > 0 || Boolean(localUser);

  const handleLogout = async () => {
    // console.log(event);
    console.log('handleLogout ');
    try {
      const res = await logout();
      // res && navigate('/activities');
      if (res) {
        setFlashMessage({ type: 'success', message: 'Bye Bye!' });
        return navigate('activities', { state: { openFlashMsg: true }, replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h5" sx={{ my: 2, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.1rem' }}>
        WildRoute
      </Typography>
      <Divider />
      <List sx={{ px: '1.5em' }}>
        <ListItem sx={{ flexDirection: 'column', gap: '1.5em', alignItems: 'baseline' }}>
          <Link to={'/activities'} className="custom-link">
            Activities
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/activities/new" className="custom-link">
                New Activity
              </Link>
              <Typography style={{ cursor: 'pointer' }} className="custom-link" onClick={handleLogout}>
                Logout
              </Typography>
            </>
          ) : (
            <Link to="/activities/user/login" className="custom-link">
              Login
            </Link>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="default" component={'nav'}>
          <div className="custom-navbar">
            <Toolbar>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                <Link
                  to="/"
                  style={{
                    marginRight: 2,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  WildRoute
                </Link>
              </Typography>

              <Box sx={{ flexGrow: 1, display: { md: 'flex', gap: '1.5em', justifyContent: 'flex-end', xs: 'none' } }}>
                <Link to="/activities" className="custom-link">
                  Activities
                </Link>

                {isLoggedIn ? (
                  <>
                    <Link to="/activities/new" className="custom-link">
                      New Activity
                    </Link>
                    <Typography style={{ cursor: 'pointer' }} className="custom-link" onClick={handleLogout}>
                      Logout
                    </Typography>
                  </>
                ) : (
                  <Link to="/activities/user/login" className="custom-link">
                    Login
                  </Link>
                )}
                {/* <Link to="/activities/user/login" className="custom-link" style={{ color: 'orange' }}>
                  Login
                </Link> */}
                {/* <Link to="/activities/user/logout" className="custom-link">
                  Logout
                </Link> */}
              </Box>

              {/* display on small screen */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'flex', md: 'none' },
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleDrawerToggle}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>

              <Box component="nav">
                <Drawer
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                  }}
                >
                  {drawer}
                </Drawer>
              </Box>

              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                WildRoute
              </Typography>
            </Toolbar>
          </div>
        </AppBar>
      </ThemeProvider>
      <FlashMessage key={location.pathname} />
      <main style={{ marginTop: '2em' }}>
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </main>
    </>
  );
}
export default NavBar;
{
  /* <AppBar position="static">
      <div className="custom-navbar">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WildRoute
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(page => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WildRoute
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map(page => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */
}
//     </Toolbar>
//   </div>
// </AppBar> */}
