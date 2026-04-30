"use client";

import React, { use } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User as UserIcon, MapPin, Mail, Phone, Globe, Link as LinkIcon, ShieldCheck } from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import ProductCard from '@/components/ProductCard';
import { MOCK_CATTLE } from '@/lib/data';
import styles from './Profile.module.css';

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { getUserById } = usePlatform();
  const resolvedParams = use(params);
  const user = getUserById(resolvedParams.id);

  if (!user) {
    return <div className={styles.container}><h1>User not found</h1></div>;
  }

  // Find all cows this user is participating in
  const activeQurbanis = MOCK_CATTLE.filter(cow => 
    cow.buyers.some(buyer => buyer.id === user.id)
  );

  // Determine visibility of private fields based on settings
  // If settings are not defined, assume public for this demo (except if explicitly false)
  const showPhone = user.privacySettings?.showPhone !== false;
  const showSocial = user.privacySettings?.showSocial !== false;

  return (
    <div className={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.profileHeader}
      >
        <div className={styles.avatarWrapper}>
          {user.avatarUrl ? (
            <Image src={user.avatarUrl} alt={user.name} fill className={styles.avatarImage} />
          ) : (
            <UserIcon size={64} color="var(--text-secondary)" />
          )}
          {user.isVerified && (
            <div className={styles.verifyBadge} title="Verified Identity">
              <ShieldCheck size={28} color="var(--success)" />
            </div>
          )}
        </div>

        <div className={styles.profileInfo}>
          <div className={styles.nameRow}>
            <h1 className={styles.name}>{user.name}</h1>
          </div>
          
          <p className={styles.bio}>
            {user.bio || "This user prefers to keep their bio private but is actively participating in ethical Qurbani sharing."}
          </p>

          <div className={styles.contactGrid}>
            {user.address && (
              <div className={styles.contactItem}>
                <MapPin size={18} className={styles.contactIcon} />
                {user.address}
              </div>
            )}
            
            {user.email && (
              <div className={styles.contactItem}>
                <Mail size={18} className={styles.contactIcon} />
                {user.email}
              </div>
            )}

            {user.phone && showPhone && (
              <div className={styles.contactItem}>
                <Phone size={18} className={styles.contactIcon} />
                {user.phone}
              </div>
            )}

            {showSocial && user.socialMedia?.facebook && (
              <a href={`https://${user.socialMedia.facebook}`} target="_blank" rel="noreferrer" className={styles.socialItem}>
                <Globe size={16} /> Facebook
              </a>
            )}

            {showSocial && user.socialMedia?.linkedin && (
              <a href={`https://${user.socialMedia.linkedin}`} target="_blank" rel="noreferrer" className={styles.socialItem}>
                <LinkIcon size={16} /> LinkedIn
              </a>
            )}
          </div>
        </div>
      </motion.div>

      <div>
        <h2 className={styles.sectionTitle}>Active Qurbanis ({activeQurbanis.length})</h2>
        {activeQurbanis.length > 0 ? (
          <div className={styles.qurbaniGrid}>
            {activeQurbanis.map(cow => (
              <ProductCard key={cow.id} {...cow} />
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-secondary)' }}>This user has not joined any Qurbani groups yet.</p>
        )}
      </div>
    </div>
  );
}
