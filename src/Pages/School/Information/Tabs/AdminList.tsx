import { Grid } from '@mui/material';
import { Card } from 'antd';
import styles from '../../school.module.css';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { Popup } from 'Components';
import { CreateSchoolAdminPopup } from '../../Components';
import { useParams } from 'react-router-dom';

export const SchoolAdminList = () => {
  const { schoolId } = useParams();
  const [isOpenCreatePopup, setIsOpenCreatePopup] = useState(false);

  return (
    <Grid container spacing={5} marginTop={-2}>
      <Grid item>
        <Card
          title='Admin trường'
          className={styles.list_card}
          extra={
            <div
              style={{ borderRadius: '50%', cursor: 'pointer', lineHeight: 0 }}
              onClick={() => setIsOpenCreatePopup(true)}
            >
              <AddCircleOutlineOutlined style={{ fontSize: 30 }} />
            </div>
          }
        ></Card>
      </Grid>
      {isOpenCreatePopup && (
        <Popup close={() => setIsOpenCreatePopup(false)}>
          <CreateSchoolAdminPopup
            close={() => setIsOpenCreatePopup(false)}
            schoolId={schoolId as string}
            getAdminList={() => {}}
          />
        </Popup>
      )}
    </Grid>
  );
};
