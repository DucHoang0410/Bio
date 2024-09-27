import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' target='_blank' href='https://adotsystem.com'>
        Vschool
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
