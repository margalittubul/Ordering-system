import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
   <Box
      component="footer"
      sx={{
        bgcolor: 'rgba(255,255,255,0.25)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 12px 45px rgba(0,0,0,0.15)',
        color: '#444',
        py: 2,
        px: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 3,
        mb: 2,
        position: 'relative',
        maxWidth: 1315,
        mx: 'auto',
        flexWrap: 'wrap',
      }}
    >

      <Box
        component="img"
        src="img/ספק.jpg"
        alt="לוגו"
        sx={{
          height: 100,
          width: 100,
          borderRadius: '45%',
          boxShadow: '0 0 15px rgba(0,0,0,0.3)',
          objectFit: 'cover',
          ml: 2,
        }}
      />
      <Box sx={{ flexGrow: 1, textAlign: 'center', minWidth: 250 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          פרטי קשר
        </Typography>
        <Typography fontSize={16} mb={0.5}>טלפון: 03-1234567</Typography>
        <Typography fontSize={16} mb={0.5}>אימייל: info@makolet.co.il</Typography>
        <Typography fontSize={16}>כתובת: רחוב השקד 12, תל אביב</Typography>
      </Box>
      <Box sx={{ width: 80 }} />
    </Box>
  );
}
