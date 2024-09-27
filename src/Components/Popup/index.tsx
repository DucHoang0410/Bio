import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import styles from './popup.module.css';

interface PopupPropType {
  children: React.ReactElement;
  close: () => void;
}

export const Popup = (props: PopupPropType) => {
  const HandleBlur = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      props.close();
    }
  };

  return (
    <div className={styles.popup_wrapper} onClick={HandleBlur}>
      <div className={styles.popup_content}>
        <div className={styles.popup_close} onClick={props.close}>
          <CloseOutlinedIcon sx={{ fontWeight: '700' }} />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export { styles as popupStyles };
