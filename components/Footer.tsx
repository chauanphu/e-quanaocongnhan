import React from "react";
import styles from "../styles/Footer.module.scss";


const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.wrapper}>
            <div className={`${styles.footer__info} container`}>
                <div className={styles.col}>
                  <h2 className={styles.title}>CÔNG TY TNHH SX TM TRẦN GIA PHÁT</h2>
                  <ul className={styles.content}>
                    <li>
                      <h3>TRỤ SỞ CHÍNH</h3>
                      <p>48/5 Thái Thị Giữ, xã Bà Điểm huyện Hóc Môn</p>
                      <p>Mrs Linh: 0945 316 280</p>
                    </li>
                    <li>
                      <h3>CHI NHÁNH QUẬN 6</h3>
                      <p>213A Đường Bà Hom, phường 13, quận 6</p>
                      <p>Mrs Hiệp: 0906 880 931</p>
                    </li>
                    <li>
                      <h3>Email: bhldtranlinh@gmail.com</h3>
                    </li>
                  </ul>
                </div>
                <div className={styles.col}>
                  <h2 className={styles.title}>CHÍNH SÁCH</h2>
                  <ul className={styles.content}>
                    <li><h3>Chính sách giao hàng</h3></li>
                    <li><h3>Chính sách thanh toán</h3></li>
                    <li><h3>Chính sách bảo hành</h3></li>
                  </ul>
                </div>
                <div className={styles.col}>
                  <h2 className={styles.title}>Fanpage</h2>
                  <iframe 
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fdongphuctrangiaphat&tabs=timeline&width=340&height=250&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=729011701570713" 
                  title="Fanpage"
                  width="340" 
                  height="250" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
               </div>
            </div>
        </div>
        <div className={styles.footer__copy_rights}>
            <p>Bản quyền thuộc về <strong>Công ty TNHH SX TM Trần Gia Phát</strong> | Thiết kế bởi CGP</p>
        </div>
    </footer>
  );
};

export default Footer;
