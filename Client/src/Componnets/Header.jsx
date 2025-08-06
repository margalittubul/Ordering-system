import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUserDetails } from '../API/usersControllerr';

const buttons = ['פרופיל', 'הרשמה', 'התחברות'];
const colors = ['#A5D6A7', '#80DEEA', '#FFCC80'];


export default function Header() {
  const [role, setRole] = useState('guest');

  useEffect(() => {
    // פונקציה שמעדכנת את התפקיד מהשרת
    const updateRole = async () => {
      const data = await fetchUserDetails();
      setRole(data?.role || 'guest');
    };

    updateRole();

    // מאזינים לאירועים של התחברות והתנתקות
    const onLogin = () => updateRole();
    const onLogout = () => setRole('guest');

    window.addEventListener('user-logged-in', onLogin);
    window.addEventListener('user-logged-out', onLogout);

    // מאזינים לשינויים ב-localStorage 
    const onStorage = (e) => {
      if (e.key === 'userToken') {
        updateRole();
      }
    };
    window.addEventListener('storage', onStorage);

    // ניקוי מאזינים כשקומפוננטה מתפרקת
    return () => {
      window.removeEventListener('user-logged-in', onLogin);
      window.removeEventListener('user-logged-out', onLogout);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // קישור ללוגו בהתאם לתפקיד
  const logoLink =
    role === 'provider' ? '/HomeProvider' :
    role === 'admin' ? '/HomeMeneger' :
    '/';

  return (
    <Box sx={{ px: 2, mt: 2 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(20px)',
          borderRadius: 4,
          maxWidth: 1315,
          mx: 'auto',
          px: 4,
          py: 2,
          boxShadow: '0 12px 45px rgba(0,0,0,0.15)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', position: 'relative' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {buttons.map((text, i) => (
              <Button
                key={text}
                component={Link}
                to={`/${text === 'פרופיל' ? 'profile' : text === 'הרשמה' ? 'loginProvider' : ''}`}
                sx={{
                  color: colors[i],
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: 16,
                  borderLeft: i ? `3px solid ${colors[i]}` : 'none',
                  pl: i ? 1.5 : 0,
                  mr: i ? 1.5 : 0,
                  '&:hover': { bgcolor: `${colors[i]}22`, borderRadius: 1 },
                  textShadow: '0px 0px 6px rgba(0,0,0,0.4)',
                }}
              >
                {text}
              </Button>
            ))}
          </Box>

          <Box
            component={Link}
            to={logoLink}
            sx={{
              position: 'absolute',
              top: -30,
              left: '50%',
              transform: 'translateX(-50%)',
              height: 120,
              width: 120,
              borderRadius: '50%',
              overflow: 'hidden',
              // border: '4px solid white',
              boxShadow: '0 0 25px rgba(0,0,0,0.35)',
              zIndex: 2,
            }}
          >
            <Box
              component="img"
              src="img/לוגו.jpg"
              alt="לוגו"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>

          <Box sx={{ width: 140 }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
