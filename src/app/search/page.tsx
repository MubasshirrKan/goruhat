"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { MOCK_CATTLE } from '@/lib/data';
import styles from './Search.module.css';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // Filter logic: match against name, breed, location, or farm (case-insensitive)
  const normalizedQuery = query.toLowerCase().trim();
  const results = MOCK_CATTLE.filter((cow) => {
    if (!normalizedQuery) return false; // Return empty if no query
    
    return (
      cow.name.toLowerCase().includes(normalizedQuery) ||
      cow.breed.toLowerCase().includes(normalizedQuery) ||
      cow.location.toLowerCase().includes(normalizedQuery) ||
      cow.farm.toLowerCase().includes(normalizedQuery)
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '16px', fontWeight: 500 }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className={styles.title}>Search Results</h1>
        <p className={styles.subtitle}>
          {normalizedQuery ? `Showing results for "${query}"` : "Please enter a search term"}
        </p>
      </div>

      {normalizedQuery && results.length > 0 ? (
        <motion.div 
          className={styles.resultsGrid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {results.map(cow => (
            <ProductCard key={cow.id} {...cow} />
          ))}
        </motion.div>
      ) : normalizedQuery ? (
        <motion.div 
          className={styles.emptyState}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className={styles.emptyIcon}>
            <SearchIcon size={32} />
          </div>
          <h2 className={styles.emptyTitle}>No cattle found</h2>
          <p className={styles.emptyText}>
            We couldn't find any premium cattle matching "{query}". Try adjusting your search terms or browse our available livestock.
          </p>
          <Link href="/" className={styles.clearBtn}>
            Browse All Cattle
          </Link>
        </motion.div>
      ) : null}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className={styles.container}>Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}
