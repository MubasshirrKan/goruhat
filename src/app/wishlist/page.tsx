"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import ProductCard from '@/components/ProductCard';
import styles from './Wishlist.module.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function WishlistPage() {
  const { wishlist, getCowById } = usePlatform();

  const wishlistedCows = wishlist.map(id => getCowById(id)).filter(cow => cow !== undefined) as NonNullable<ReturnType<typeof getCowById>>[];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Your Wishlist</h1>
        <p className={styles.subtitle}>Saved cows you are considering for Qurbani.</p>
      </div>

      {wishlistedCows.length === 0 ? (
        <div className={styles.emptyState}>
          <Heart size={64} className={styles.emptyIcon} />
          <h2>Your wishlist is empty</h2>
          <p style={{ color: 'var(--text-secondary)' }}>You haven't saved any cows yet. Browse the market and click the heart icon to save.</p>
          <Link href="/" className={styles.browseBtn}>
            Browse Available Cattle
          </Link>
        </div>
      ) : (
        <motion.div 
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {wishlistedCows.map((cow) => (
            <motion.div key={cow.id} variants={fadeUpVariant}>
              {/* ProductCard already exists and maps perfectly to this data */}
              <ProductCard {...cow} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
