
import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.footer__contents}>
            <div className="container">
                <p>This is the footer component.</p>
            </div>
        </div>
        <div className={styles.footer__copy_rights}>
            <p>Bản quyền thuộc về <strong>Công ty TNHH SX TM Trần Gia Phát</strong> | Thiết kế bởi CGP</p>
        </div>
    </footer>
  );
};

export default Footer;
