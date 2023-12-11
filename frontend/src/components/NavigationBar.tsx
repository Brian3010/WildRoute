import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, Toolbar, Typography } from '@mui/material';
import { CSSProperties, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../assets/NavBar.css';
import { IAuthContext } from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';
import useFlashMessage from '../hooks/useFlashMessage';
import useLogout from '../hooks/useLogout';

const drawerWidth = '240px';

const NavBarStyle: CSSProperties | undefined = {
  position: 'absolute',
  right: 0,
  left: 0,
  paddingLeft: '2.5vw',
  paddingRight: '3.5vw',
  zIndex: 1
};

function NavigationBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { auth } = useAuth() as IAuthContext;
  const logout = useLogout();
  const navigate = useNavigate();
  const { setFlashMessage } = useFlashMessage();
  const location = useLocation();
  // console.log('file: NavBar.tsx:23 ~ NavBar ~ auth:', auth);
  console.log({ location });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const localUser = JSON.parse(localStorage.getItem('user')!);

  const isLoggedIn = auth.accessToken.length > 0 || Boolean(localUser);
  // const isLoggedIn = auth.accessToken.length > 0;

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
            <>
              <Link to="/activities/user/login" className="custom-link">
                Login
              </Link>
              <Link to="/activities/user/register" className="custom-link">
                Register
              </Link>
            </>
          )}
        </ListItem>
      </List>
    </Box>
  );
  return (
    <AppBar position="static" color="default" component={'nav'}>
      <div
        className={location.pathname === '/' ? undefined : 'custom-navbar'}
        style={location.pathname === '/' ? NavBarStyle : undefined}
      >
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
              <>
                <Link to="/activities/user/login" className="custom-link">
                  Login
                </Link>
                <Link to="/activities/user/register" className="custom-link">
                  Register
                </Link>
              </>
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
            href="/"
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
  );
}

export default NavigationBar;
