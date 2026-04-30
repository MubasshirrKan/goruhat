"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

import { MOCK_CATTLE } from '@/lib/data';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as any } }
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

const ProductGrid = () => {
  return (
    <section id="products" className={styles.productSection}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.title}>Available for Sharing</h2>
        <button className={styles.viewAllBtn}>View All Products</button>
      </motion.div>
      
      <motion.div 
        className={styles.grid}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {MOCK_CATTLE.map(cattle => (
          <motion.div key={cattle.id} variants={fadeUpVariant}>
            <ProductCard {...cattle} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProductGrid;
