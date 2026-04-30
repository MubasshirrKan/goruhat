import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footer}>
        
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <Image src="/logo.png" alt="Qurbani Logo" width={32} height={32} style={{ borderRadius: '8px' }} />
            </div>
            <span className={styles.logoText}>ShareQurbani.</span>
          </Link>
          <p className={styles.brandDesc}>
            Connecting believers worldwide with vetted farmers in Bangladesh for transparent, Shariah-compliant Qurbani sharing.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialIcon}><Globe size={20} /></a>
            <a href="#" className={styles.socialIcon}><Mail size={20} /></a>
            <a href="#" className={styles.socialIcon}><Phone size={20} /></a>
            <a href="#" className={styles.socialIcon}><MapPin size={20} /></a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Platform</h4>
          <div className={styles.linkList}>
            <Link href="/" className={styles.linkItem}>Browse Cattle</Link>
            <Link href="/how-it-works" className={styles.linkItem}>How It Works</Link>
            <Link href="/dashboard" className={styles.linkItem}>My Dashboard</Link>
            <Link href="/wishlist" className={styles.linkItem}>Saved Items</Link>
          </div>
        </div>

        {/* Links Column 2 */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Support</h4>
          <div className={styles.linkList}>
            <a href="#" className={styles.linkItem}>Help Center</a>
            <a href="#" className={styles.linkItem}>Shariah Guidelines</a>
            <a href="#" className={styles.linkItem}>Farmer Verification</a>
            <a href="#" className={styles.linkItem}>Contact Us</a>
          </div>
        </div>

        {/* Links Column 3 */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Legal</h4>
          <div className={styles.linkList}>
            <a href="#" className={styles.linkItem}>Terms of Service</a>
            <a href="#" className={styles.linkItem}>Privacy Policy</a>
            <a href="#" className={styles.linkItem}>Refund Policy</a>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; {currentYear} Qurbani. All rights reserved.</p>
        <div className={styles.paymentIcons}>
          <ShieldCheck size={16} color="var(--success)" />
          <span>100% Secure Checkout</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
