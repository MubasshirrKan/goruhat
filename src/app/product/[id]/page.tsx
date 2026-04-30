"use client";

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { usePlatform } from '@/context/PlatformContext';
import { MapPin, Heart, Share2, CheckCircle2, ShieldCheck, User as UserIcon, Minus, Plus, ShoppingCart, Stethoscope, Scale, Leaf, Truck, FileCheck } from 'lucide-react';
import styles from './ProductDetails.module.css';

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { getCowById, toggleWishlist, wishlist, addToCart } = usePlatform();
  const resolvedParams = use(params);
  const cow = getCowById(resolvedParams.id);
  
  const [selectedShares, setSelectedShares] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (!cow) {
    return <div className={styles.container}><h1>Product not found</h1></div>;
  }

  const isWishlisted = wishlist.includes(cow.id);
  const availableShares = cow.totalShares - cow.soldShares;
  const maxSelectable = Math.min(availableShares, 7);

  // Array of 7 slots representing shares
  const slots = Array.from({ length: 7 }, (_, i) => {
    if (i < cow.soldShares) return { status: 'filled', buyer: cow.buyers[i] };
    if (i < cow.soldShares + selectedShares) return { status: 'selected' };
    return { status: 'empty' };
  });

  const handleDecrease = () => {
    if (selectedShares > 1) setSelectedShares(s => s - 1);
  };

  const handleIncrease = () => {
    if (selectedShares < maxSelectable) setSelectedShares(s => s + 1);
  };

  const handleAddToCart = () => {
    addToCart(cow.id, selectedShares);
    router.push('/cart');
  };

  return (
    <div className={styles.container}>
      <div className={styles.bentoGrid}>
        
        {/* Mobile Premium Hero (Only visible on mobile) */}
        <div className={styles.mobilePremiumHero}>
          <div className={styles.mobileHeadlineBg}>
            <span className={styles.mobileHeadlineText}>{cow.name.split(' ')[0]}</span>
            <span className={styles.mobileHeadlineTextSub}>{cow.name.split(' ').slice(1).join(' ')}</span>
          </div>
          <div className={styles.mobileCowWrapper}>
            <Image
              src={cow.imageSrc}
              alt={cow.name}
              fill
              className={styles.mobileCowImg}
              priority
            />
          </div>
        </div>

        {/* Left: Image Card (Desktop) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.imageCard}
        >
          <Image
            src={cow.imageSrc}
            alt={cow.name}
            fill
            className={styles.cowImage}
            priority
          />
        </motion.div>

        {/* Right: Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={styles.infoCard}
        >
          <div className={styles.header}>
            <div className={styles.titleArea}>
              <div className={styles.tags}>
                <span className={styles.tag}>{cow.breed}</span>
                <span className={styles.tag}>
                  <MapPin size={14} /> {cow.location}
                </span>
              </div>
              <h1 className={styles.title}>{cow.name}</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Farm: {cow.farm} • Weight: {cow.weight} kg</p>
            </div>
            <button 
              className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlistActive : ''}`}
              onClick={() => toggleWishlist(cow.id)}
            >
              <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className={styles.pricingRow}>
            <div className={styles.priceBlock}>
              <span className={styles.priceLabel}>Price Per Share</span>
              <span className={styles.priceValuePrimary}>${cow.pricePerShare}</span>
            </div>
            <div className={styles.priceBlock}>
              <span className={styles.priceLabel}>Total Value</span>
              <span className={styles.priceValue}>${cow.totalPrice}</span>
            </div>
          </div>

          {/* Share Grid Visualizer */}
          <div className={styles.shareSection}>
            <div className={styles.sectionTitle}>
              Share Status ({cow.soldShares}/{cow.totalShares} Filled)
            </div>
            <div className={styles.slotsGrid}>
              {slots.map((slot, index) => {
                const isFilled = slot.status === 'filled' && slot.buyer;
                const slotContent = (
                  <div 
                    className={`${styles.slot} ${
                      slot.status === 'filled' ? styles.slotFilled : 
                      slot.status === 'selected' ? styles.slotSelected : 
                      styles.slotEmpty
                    }`}
                    title={slot.status === 'filled' ? slot.buyer?.name : slot.status}
                  >
                    {slot.status === 'filled' && slot.buyer?.avatarUrl && (
                      <img src={slot.buyer.avatarUrl} alt={slot.buyer.name} className={styles.slotAvatar} />
                    )}
                    {slot.status === 'filled' && !slot.buyer?.avatarUrl && (
                      <UserIcon size={20} className={styles.slotEmpty} />
                    )}
                    {slot.status === 'selected' && (
                      <CheckCircle2 size={24} className={styles.slotCheck} />
                    )}
                    {slot.status === 'empty' && (
                      <span>{index + 1}</span>
                    )}
                  </div>
                );

                return isFilled ? (
                  <Link href={`/profile/${slot.buyer.id}`} key={index}>
                    {slotContent}
                  </Link>
                ) : (
                  <React.Fragment key={index}>
                    {slotContent}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Selection Controls */}
          {availableShares > 0 ? (
            <div className={styles.selectionControls}>
              <span className={styles.controlLabel}>Select Shares to Buy</span>
              <div className={styles.counter}>
                <button 
                  className={styles.counterBtn} 
                  onClick={handleDecrease}
                  disabled={selectedShares <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className={styles.counterValue}>{selectedShares}</span>
                <button 
                  className={styles.counterBtn} 
                  onClick={handleIncrease}
                  disabled={selectedShares >= maxSelectable}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.selectionControls} style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}>
              <strong>Fully Shared</strong>
              <span>No shares remaining for this cow.</span>
            </div>
          )}

          <div className={styles.actionButtons}>
            <button 
              className={styles.addToCartBtn} 
              disabled={availableShares === 0}
              onClick={handleAddToCart}
            >
              <ShoppingCart size={20} />
              Add {selectedShares} Share{selectedShares > 1 ? 's' : ''} to Cart • ${cow.pricePerShare * selectedShares}
            </button>
            <button className={styles.inviteBtn} title="Invite friends to complete this cow">
              <Share2 size={20} />
            </button>
          </div>

        </motion.div>
      </div>

      {/* Details Section */}
      <div className={styles.detailsGrid}>
        {/* Participants */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.detailCard}
        >
          <h3 className={styles.cardTitle}>Current Participants</h3>
          <div className={styles.participantsList}>
            {cow.buyers.length > 0 ? cow.buyers.map((buyer, idx) => (
              <Link href={`/profile/${buyer.id}`} key={idx} style={{ textDecoration: 'none' }}>
                <div className={styles.participantItem} style={{ cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div className={styles.participantAvatar}>
                    {buyer.avatarUrl ? (
                      <img src={buyer.avatarUrl} alt={buyer.name} />
                    ) : (
                      <UserIcon size={20} />
                    )}
                  </div>
                  <div>
                    <div className={styles.participantName}>{buyer.name}</div>
                    <div className={styles.participantRole}>
                      {buyer.isVerified ? 'Verified Buyer' : 'Pending Verification'}
                    </div>
                  </div>
                </div>
              </Link>
            )) : (
              <p style={{ color: 'var(--text-secondary)' }}>Be the first to secure a share in this cow!</p>
            )}
          </div>
        </motion.div>

        {/* Transparency & Trust */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.detailCard}
        >
          <h3 className={styles.cardTitle}>Platform Guarantees</h3>
          <div className={styles.trustList}>
            <div className={styles.trustItem}>
              <ShieldCheck size={20} className={styles.trustIcon} />
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>100% Shariah Compliant</span>
                <span className={styles.trustDesc}>Strictly follows the 7-share rule. No overselling or hidden participants.</span>
              </div>
            </div>
            <div className={styles.trustItem}>
              <CheckCircle2 size={20} className={styles.trustIcon} />
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>Verified Farmers</span>
                <span className={styles.trustDesc}>Cattle sourced from vetted rural farmers in Bangladesh, supporting local communities.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Comprehensive Details Segment */}
      {cow.healthAndShariah && (
        <div className={styles.comprehensiveSection}>
          <h2 className={styles.sectionHeading}>Comprehensive Animal Details</h2>
          <div className={styles.comprehensiveGrid}>
            
            {/* Shariah & Health */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={styles.detailBox}>
              <div className={styles.boxHeader}>
                <div className={styles.boxIcon}><Stethoscope size={24} /></div>
                <h3 className={styles.boxTitle}>Health & Shariah</h3>
              </div>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Age (Teeth)</span>
                  <span className={styles.infoValue}>{cow.healthAndShariah.ageInTeeth} Teeth</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Vaccination Status</span>
                  <span className={styles.infoValue}>{cow.healthAndShariah.isVaccinated ? 'Vaccinated' : 'Not Vaccinated'} <FileCheck size={16} className={styles.statusGood} /></span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Disease Free</span>
                  <span className={styles.infoValue}>{cow.healthAndShariah.diseaseFree ? 'Certified' : 'Pending'} <CheckCircle2 size={16} className={styles.statusGood} /></span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Shariah Compliant (No Defects)</span>
                  <span className={styles.infoValue}>{cow.healthAndShariah.noPhysicalDefects ? 'Verified' : 'Pending'} <ShieldCheck size={16} className={styles.statusGood} /></span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Last Checkup</span>
                  <span className={styles.infoValue}>{cow.healthAndShariah.lastCheckup}</span>
                </div>
              </div>
            </motion.div>

            {/* Physical Specs */}
            {cow.physicalSpecs && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className={styles.detailBox}>
                <div className={styles.boxHeader}>
                  <div className={styles.boxIcon}><Scale size={24} /></div>
                  <h3 className={styles.boxTitle}>Physical Traits</h3>
                </div>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Live Weight</span>
                    <span className={styles.infoValue}>{cow.weight} kg</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Height</span>
                    <span className={styles.infoValue}>{cow.physicalSpecs.heightFeet} ft</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Length</span>
                    <span className={styles.infoValue}>{cow.physicalSpecs.lengthFeet} ft</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Color</span>
                    <span className={styles.infoValue}>{cow.physicalSpecs.color}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Diet & Care */}
            {cow.dietAndCare && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className={styles.detailBox}>
                <div className={styles.boxHeader}>
                  <div className={styles.boxIcon}><Leaf size={24} /></div>
                  <h3 className={styles.boxTitle}>Diet & Environment</h3>
                </div>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Feed Type</span>
                    <span className={styles.infoValue}>{cow.dietAndCare.feedType}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Farm Environment</span>
                    <span className={styles.infoValue}>{cow.dietAndCare.environment}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Farm Name</span>
                    <span className={styles.infoValue}>{cow.farm}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Logistics */}
            {cow.logistics && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className={styles.detailBox}>
                <div className={styles.boxHeader}>
                  <div className={styles.boxIcon}><Truck size={24} /></div>
                  <h3 className={styles.boxTitle}>Logistics & Processing</h3>
                </div>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Slaughter Location</span>
                    <span className={styles.infoValue}>{cow.logistics.slaughterLocation}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Meat Distribution</span>
                    <span className={styles.infoValue}>{cow.logistics.meatDistribution}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Hide Donation</span>
                    <span className={styles.infoValue}>{cow.logistics.hideDonation}</span>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
