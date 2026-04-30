"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Users, Share2, ShieldCheck, ArrowRight } from 'lucide-react';
import styles from './HowItWorks.module.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function HowItWorksPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className={styles.title}
        >
          How Qurbani Sharing Works
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className={styles.subtitle}
        >
          We’ve digitized the traditional Islamic Qurbani sharing process. Whether you want a full cow or just one share, our platform makes it transparent, ethical, and incredibly simple.
        </motion.p>
      </div>

      <motion.div 
        className={styles.stepsGrid}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeUpVariant} className={styles.stepCard}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepIcon}><Search size={32} /></div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Browse & Select</h3>
            <p className={styles.stepText}>
              Explore our marketplace of healthy, premium cattle sourced directly from vetted farmers in rural Bangladesh. Every cow is strictly verified for health and Shariah compliance (age, teeth, physical condition).
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeUpVariant} className={styles.stepCard}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepIcon}><ShoppingBag size={32} /></div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Choose Your Shares</h3>
            <p className={styles.stepText}>
              Each cow is divided into a strict maximum of 7 shares. You can purchase anywhere from 1 to 7 shares. If you buy less than 7, the remaining slots will be filled by other verified believers on the platform.
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeUpVariant} className={styles.stepCard}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepIcon}><Users size={32} /></div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Transparent Co-Sharing</h3>
            <p className={styles.stepText}>
              No hidden participants. You can clearly see the verified profiles (names and avatars) of the people you are sharing the Qurbani with, ensuring peace of mind and communal trust.
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeUpVariant} className={styles.stepCard}>
          <div className={styles.stepNumber}>4</div>
          <div className={styles.stepIcon}><Share2 size={32} /></div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Invite & Complete</h3>
            <p className={styles.stepText}>
              Don't want to wait for strangers? You can instantly generate a secure invitation link and share it with your family and friends via WhatsApp so they can purchase the remaining slots in your specific cow.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={styles.shariahSection}
      >
        <ShieldCheck size={64} className={styles.shariahIcon} />
        <h2 className={styles.shariahTitle}>100% Shariah Compliant</h2>
        <p className={styles.shariahText}>
          Our platform is built strictly upon Islamic principles. We guarantee that the Qurbani rules are never compromised.
        </p>

        <div className={styles.rulesGrid}>
          <div className={styles.ruleCard}>
            <div className={styles.ruleTitle}>The Rule of 7</div>
            <div className={styles.ruleDesc}>Our system mathematically prevents any cow from ever having more than 7 participants.</div>
          </div>
          <div className={styles.ruleCard}>
            <div className={styles.ruleTitle}>Health Verification</div>
            <div className={styles.ruleDesc}>Cattle are physically inspected for age (minimum 2 years for cows) and any physical defects.</div>
          </div>
          <div className={styles.ruleCard}>
            <div className={styles.ruleTitle}>Ethical Sourcing</div>
            <div className={styles.ruleDesc}>Direct payment to rural farmers without exploitative middlemen, ensuring fair trade.</div>
          </div>
        </div>
      </motion.div>

      <div className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to fulfill your Sunnah?</h2>
        <Link href="/" className={styles.ctaBtn}>
          Browse Cattle <ArrowRight size={24} />
        </Link>
      </div>
    </div>
  );
}
