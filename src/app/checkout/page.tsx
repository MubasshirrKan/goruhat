"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, Smartphone, User, Lock } from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
  const { cart, getCowById } = usePlatform();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('bkash');

  const cartDetails = cart.map(item => {
    const cow = getCowById(item.cowId);
    return { ...item, cow };
  }).filter(item => item.cow !== undefined) as ({ cowId: string; shares: number; cow: NonNullable<ReturnType<typeof getCowById>> })[];

  if (cartDetails.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <h2>No items to checkout</h2>
          <p style={{ margin: '16px 0', color: 'var(--text-secondary)' }}>Your cart is empty. Please select some shares first.</p>
          <Link href="/" className={styles.confirmBtn} style={{ maxWidth: '300px', margin: '0 auto' }}>
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = cartDetails.reduce((sum, item) => sum + (item.cow.pricePerShare * item.shares), 0);
  const serviceFee = 50;
  const total = subtotal + serviceFee;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Purchase confirmed! Mock redirecting to success dashboard...");
    // Mock success: in a real app, we would empty cart and redirect
    router.push('/dashboard');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Secure Checkout</h1>
        <p className={styles.subtitle}>Complete your information to confirm your Qurbani shares.</p>
      </div>

      <form onSubmit={handleConfirm} className={styles.layout}>
        {/* Left Form Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={styles.formSection}>
            <h2 className={styles.stepTitle}><User className={styles.stepIcon} /> 1. Personal Information</h2>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Full Name</label>
                <input type="text" className={styles.input} placeholder="Ahmad M." required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Phone Number</label>
                <input type="tel" className={styles.input} placeholder="+880 1..." required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <input type="email" className={styles.input} placeholder="ahmad@example.com" required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Social Profile (Optional)</label>
                <input type="text" className={styles.input} placeholder="facebook.com/ahmad" />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={styles.formSection}>
            <h2 className={styles.stepTitle}><CreditCard className={styles.stepIcon} /> 2. Payment Method</h2>
            <div className={styles.paymentGrid}>
              <div 
                className={`${styles.paymentOption} ${paymentMethod === 'bkash' ? styles.paymentOptionSelected : ''}`}
                onClick={() => setPaymentMethod('bkash')}
              >
                <Smartphone className={styles.paymentIcon} />
                <span className={styles.paymentName}>Mobile Banking (bKash)</span>
              </div>
              <div 
                className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.paymentOptionSelected : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard className={styles.paymentIcon} />
                <span className={styles.paymentName}>Credit/Debit Card</span>
              </div>
            </div>
            {paymentMethod === 'card' && (
              <div className={styles.inputGroup} style={{ marginTop: '16px' }}>
                <label className={styles.label}>Card Details</label>
                <input type="text" className={styles.input} placeholder="0000 0000 0000 0000" />
              </div>
            )}
          </motion.div>

        </div>

        {/* Right Summary Panel */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={styles.summaryPanel}>
          <h2 className={styles.summaryTitle}>Review Order</h2>
          
          <div style={{ marginBottom: '24px' }}>
            {cartDetails.map(item => (
              <div key={item.cowId} className={styles.summaryItem}>
                <Image src={item.cow.imageSrc} alt={item.cow.name} width={60} height={60} className={styles.summaryItemImg} />
                <div className={styles.summaryItemInfo}>
                  <div className={styles.summaryItemName}>{item.cow.name}</div>
                  <div className={styles.summaryItemShares}>{item.shares} share(s) x ${item.cow.pricePerShare}</div>
                </div>
                <div style={{ fontWeight: '600' }}>${item.shares * item.cow.pricePerShare}</div>
              </div>
            ))}
          </div>

          <div className={styles.summaryRows}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Service Fee</span>
              <span>${serviceFee}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total to Pay</span>
              <span>${total}</span>
            </div>
          </div>

          <button type="submit" className={styles.confirmBtn}>
            <CheckCircle size={20} /> Confirm Purchase
          </button>

          <p style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Lock size={14} /> 256-bit Secure Encrypted Payment
          </p>
        </motion.div>
      </form>
    </div>
  );
}
