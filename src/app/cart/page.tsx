"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { Trash2, Minus, Plus, ShieldCheck, ShoppingCart, ArrowRight } from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import styles from './Cart.module.css';

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as any } }
};

export default function CartPage() {
  const { cart, removeFromCart, updateCartItem, getCowById } = usePlatform();
  const router = useRouter();

  const cartDetails = cart.map(item => {
    const cow = getCowById(item.cowId);
    return { ...item, cow };
  }).filter(item => item.cow !== undefined) as ({ cowId: string; shares: number; cow: NonNullable<ReturnType<typeof getCowById>> })[];

  const subtotal = cartDetails.reduce((sum, item) => sum + (item.cow.pricePerShare * item.shares), 0);
  const serviceFee = subtotal > 0 ? 50 : 0; // Flat $50 processing fee
  const total = subtotal + serviceFee;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Your Cart</h1>
        <p className={styles.subtitle}>Review your selected shares before proceeding to checkout.</p>
      </div>

      {cartDetails.length === 0 ? (
        <div className={styles.emptyCart}>
          <ShoppingCart size={64} className={styles.emptyIcon} />
          <h2>Your cart is empty</h2>
          <p>You haven't selected any cows or shares yet.</p>
          <Link href="/" className={styles.browseBtn}>
            Browse Available Cattle
          </Link>
        </div>
      ) : (
        <div className={styles.layout}>
          {/* Left: Cart Items */}
          <div className={styles.cartItems}>
            {cartDetails.map((item) => {
              const availableShares = item.cow.totalShares - item.cow.soldShares;
              const maxSelectable = Math.min(availableShares, 7);
              const isLimited = availableShares <= 2;

              return (
                <motion.div 
                  key={item.cowId} 
                  variants={fadeUpVariant}
                  initial="hidden"
                  animate="visible"
                  className={styles.cartItem}
                >
                  <div className={styles.itemImageWrapper}>
                    <Image src={item.cow.imageSrc} alt={item.cow.name} fill className={styles.itemImage} />
                  </div>
                  
                  <div className={styles.itemInfo}>
                    <div className={styles.itemHeader}>
                      <div>
                        <h3 className={styles.itemName}>{item.cow.name}</h3>
                        <p className={styles.itemFarm}>{item.cow.farm} • {item.cow.weight} kg</p>
                      </div>
                      <button 
                        className={styles.removeBtn} 
                        onClick={() => removeFromCart(item.cowId)}
                        title="Remove from cart"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className={styles.itemControls}>
                      <div className={styles.sharesSelect}>
                        <span>Shares:</span>
                        <button 
                          className={styles.counterBtn}
                          onClick={() => updateCartItem(item.cowId, item.shares - 1)}
                          disabled={item.shares <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className={styles.counterValue}>{item.shares}</span>
                        <button 
                          className={styles.counterBtn}
                          onClick={() => updateCartItem(item.cowId, item.shares + 1)}
                          disabled={item.shares >= maxSelectable}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className={styles.itemPrice}>
                        <span className={styles.priceLabel}>${item.cow.pricePerShare} / share</span>
                        <span className={styles.priceTotal}>${item.cow.pricePerShare * item.shares}</span>
                      </div>
                    </div>
                  </div>

                  {isLimited && (
                    <div className={styles.warningMsg}>
                      Only {availableShares} share{availableShares > 1 ? 's' : ''} left!
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right: Summary Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.summaryPanel}
          >
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            
            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal ({cartDetails.reduce((a, b) => a + b.shares, 0)} shares)</span>
                <span>${subtotal}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Service & Processing Fee</span>
                <span>${serviceFee}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <button 
              className={styles.checkoutBtn}
              onClick={() => router.push('/checkout')}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div className={styles.secureCheckout}>
              <ShieldCheck size={16} />
              <span>100% Secure & Shariah Compliant</span>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
