"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Search, ShoppingBag, Users, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

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

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <motion.div 
        className={styles.bentoGrid}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        
        {/* Card 1: Headline & CTAs (Wide) */}
        <motion.div variants={fadeUpVariant} className={`${styles.bentoCard} ${styles.headlineCard}`}>
          <h1 className={styles.title}>
            Fulfill Your Qurbani with Ease, Trust, and Transparency
          </h1>
          <div className={styles.actions}>
            <button 
              className={styles.primaryCta}
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Available Cattle
              <div className={styles.ctaIconWrapper}>
                <ArrowRight size={18} />
              </div>
            </button>
            <Link href="/how-it-works" style={{ textDecoration: 'none' }}>
              <button className={styles.secondaryCta}>
                Learn How It Works
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Card 2: Image Container (Tall) */}
        <motion.div variants={fadeUpVariant} className={`${styles.bentoCard} ${styles.imageCard}`}>
          <div className={styles.imageContainer}>
            <Image
              src="/hero_cow_red.png"
              alt="Premium Qurbani Cow"
              fill
              className={styles.cowImage}
              priority
            />
          </div>
        </motion.div>

        {/* Card 3: Islamic Context (Small) */}
        <motion.div variants={fadeUpVariant} className={`${styles.bentoCard} ${styles.contextCard}`}>
          <p className={styles.arabicText}>لَن يَنَالَ اللَّهَ لُحُومُهَا وَلَا دِمَاؤُهَا وَلَٰكِن يَنَالُهُ التَّقْوَىٰ مِنكُمْ</p>
          <p className={styles.translation}>
            “Neither their meat nor their blood reaches Allah, but it is your piety that reaches Him.”
            <span className={styles.surahRef}>(Surah Al-Hajj 22:37)</span>
          </p>
        </motion.div>

        {/* Card 4: Explanation & Trust Elements (Small) */}
        <motion.div variants={fadeUpVariant} className={`${styles.bentoCard} ${styles.explanationCard}`}>
          <p className={styles.explanation}>
            This platform simplifies Qurbani by allowing you to purchase a full cow or share it with up to six others, following authentic Islamic guidelines. We ensure transparency by showing all participants, making your sacrifice both convenient and trustworthy.
          </p>
          <div className={styles.trustElements}>
            <div className={styles.trustItem}>
              <CheckCircle2 size={16} className={styles.trustIcon} /> Shariah-Compliant Share System (Max 7 per Cow)
            </div>
            <div className={styles.trustItem}>
              <CheckCircle2 size={16} className={styles.trustIcon} /> Real Buyers. Transparent Participation.
            </div>
            <div className={styles.trustItem}>
              <CheckCircle2 size={16} className={styles.trustIcon} /> Built for Individuals and Families Worldwide
            </div>
          </div>
        </motion.div>

        {/* Card 5: How It Works Flow (Full Width) */}
        <motion.div id="how-it-works" variants={fadeUpVariant} className={`${styles.bentoCard} ${styles.howItWorksCard}`}>
          <div className={styles.step}>
            <div className={styles.stepIconWrapper}>
              <Search size={20} />
            </div>
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>1. Choose Your Cow</h4>
              <p className={styles.stepText}>Browse verified, healthy cattle listed by trusted sources</p>
            </div>
          </div>
          
          <div className={styles.step}>
            <div className={styles.stepIconWrapper}>
              <ShoppingBag size={20} />
            </div>
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>2. Buy Full or Shares</h4>
              <p className={styles.stepText}>Purchase 1 to 7 shares (maximum 7 people per cow as per Shariah)</p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepIconWrapper}>
              <Users size={20} />
            </div>
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>3. See Co-Participants</h4>
              <p className={styles.stepText}>View profiles of other buyers for full transparency</p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepIconWrapper}>
              <Share2 size={20} />
            </div>
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>4. Invite Others</h4>
              <p className={styles.stepText}>Share a link to complete remaining shares with friends & family</p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default HeroSection;
