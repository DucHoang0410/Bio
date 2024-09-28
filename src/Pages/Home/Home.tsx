import { Card, CircularProgress, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import DomainOutlinedIcon from '@mui/icons-material/DomainOutlined';

import styles from './home.module.css';

const card_sx = {
  color: '#141D49',
  padding: '10px',
  width: '250px',
  cursor: 'pointer',
};

const circular_progress_sx = {
  color: '#141D49',
};

interface GeneralInfoDataType {
  numberOfSchools: number;
  numberOfTeachers: number;
  numberOfParents: number;
}

const generalInfo: GeneralInfoDataType = {
  numberOfSchools: 20,
  numberOfTeachers: 200,
  numberOfParents: 1500,
};

export const Home = () => {
  return (
    <Grid container spacing={5}>
      <Grid item>
        <Link style={{ textDecoration: 'none' }} to='/school-list'>
          <Card sx={card_sx}>
            <p className={styles.card_title}>Thí nghiệm</p>
            <p className={styles.card_number}>
              {generalInfo?.numberOfSchools ?? (
                <CircularProgress sx={circular_progress_sx} />
              )}
            </p>
            <Grid container justifyContent='flex-end'>
              <DomainOutlinedIcon />
            </Grid>
          </Card>
        </Link>
      </Grid>
      <Grid item>
        <Link style={{ textDecoration: 'none' }} to=''>
          <Card sx={card_sx}>
            <p className={styles.card_title}>Số lần đo</p>
            <p className={styles.card_number}>
              {generalInfo?.numberOfTeachers ?? (
                <CircularProgress sx={circular_progress_sx} />
              )}
            </p>
            <Grid container justifyContent='flex-end'>
              <PeopleAltOutlinedIcon />
            </Grid>
          </Card>
        </Link>
      </Grid>
      <Grid item>
        <Link style={{ textDecoration: 'none' }} to='/'>
          <Card sx={card_sx}>
            <p className={styles.card_title}>Ảnh mẫu</p>
            <p className={styles.card_number}>
              {generalInfo?.numberOfParents ?? (
                <CircularProgress sx={circular_progress_sx} />
              )}
            </p>
            <Grid container justifyContent='flex-end'>
              <PeopleAltOutlinedIcon />
            </Grid>
          </Card>
        </Link>
      </Grid>
    </Grid>
  );
};
