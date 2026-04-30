"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, Users, CheckCircle } from 'lucide-react';
import styles from './TrustSection.module.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const TrustSection = () => {
  return (
    <section className={styles.trustSection}>
      <div className={styles.bentoContainer}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Built on Trust & Transparency</h2>
          <p className={styles.subtitle}>Verified profiles, open reviews, and 100% Shariah-compliant sourcing.</p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* New Image Card */}
          <motion.div variants={fadeUpVariant} className={`${styles.bentoCard} ${styles.darkCard} ${styles.imageCard}`}>
            <div className={styles.imageContent}>
              <h3 className={styles.title}>A Community Built on Ethics</h3>
              <p className={styles.cardText}>
                We bring believers together from across the globe to perform Qurbani with farmers in rural Bangladesh, ensuring the process is respectful, ethical, and fully transparent.
              </p>
              <div className={styles.statsRow}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>10k+</span>
                  <span className={styles.statLabel}>Active Sharers</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>100%</span>
                  <span className={styles.statLabel}>Visibility</span>
                </div>
              </div>
            </div>
            <div className={styles.imageWrapper}>
              <Image 
                src="/community_qurbani.png"
                alt="Community Qurbani"
                fill
                className={styles.communityImage}
              />
            </div>
          </motion.div>

          {/* Card 1: Verified Profiles */}
          <motion.div variants={fadeUpVariant} className={styles.bentoCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <ShieldCheck size={24} />
              </div>
              <span className={styles.cardTag}>Security</span>
            </div>
            <h3 className={styles.cardTitle}>Verified Profiles</h3>
            <p className={styles.cardText}>Every user is verified via NID/Passport to ensure a safe community.</p>
            <div className={styles.verificationVisual}>
              <div className={styles.userBadge}>
                <div className={styles.avatar}></div>
                <div className={styles.userInfo}>
                  <div className={styles.userName}>Ryman Alex</div>
                  <div className={styles.verifiedStatus}>
                    <CheckCircle size={12} className={styles.checkIcon} /> Verified Buyer
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Transparency */}
          <motion.div variants={fadeUpVariant} className={styles.bentoCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <Users size={24} />
              </div>
              <span className={styles.cardTag}>Openness</span>
            </div>
            <h3 className={styles.cardTitle}>Transparent Sharing</h3>
            <p className={styles.cardText}>See exactly who you are sharing with. Full visibility of all 7 share owners before you confirm.</p>
          </motion.div>

          {/* Card 3: Reviews */}
          <motion.div variants={fadeUpVariant} className={styles.bentoCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <Star size={24} />
              </div>
              <div className={styles.ratingBadge}>
                <Star size={12} className={styles.starFill} /> 4.9/5
              </div>
            </div>
            <h3 className={styles.cardTitle}>Community Reviews</h3>
            <p className={styles.cardText}>Read experiences from thousands of satisfied believers.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
