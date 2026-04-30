"use client";

import React, { useState, use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Copy, CheckCircle2 } from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import styles from './Invite.module.css';

export default function InvitePage({ params }: { params: Promise<{ id: string }> }) {
  const { getCowById } = usePlatform();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  
  const resolvedParams = use(params);
  const cow = getCowById(resolvedParams.id);

  if (!cow) {
    return <div className={styles.container}><h1>Qurbani group not found.</h1></div>;
  }

  const availableShares = cow.totalShares - cow.soldShares;
  const progressPercentage = (cow.soldShares / cow.totalShares) * 100;

  // Mock Inviter Info
  const inviter = cow.buyers[0] || { name: 'A Fellow Believer' };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoin = () => {
    router.push(`/product/${cow.id}`);
  };

  return (
    <div className={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className={styles.inviteCard}
      >
        <div className={styles.inviterAvatar}>
          {inviter.avatarUrl ? (
            <Image src={inviter.avatarUrl} alt={inviter.name} width={80} height={80} style={{ borderRadius: '50%' }} />
          ) : (
            <User size={40} color="var(--text-secondary)" />
          )}
        </div>
        
        <div>
          <h1 className={styles.title}>{inviter.name} invited you!</h1>
          <p className={styles.subtitle}>Join them to complete the Qurbani for this cow.</p>
        </div>

        <div className={styles.cowPreview}>
          <Image src={cow.imageSrc} alt={cow.name} width={300} height={200} className={styles.cowImage} />
          
          <div className={styles.cowInfo}>
            <div>
              <div className={styles.cowName}>{cow.name}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{cow.location}</div>
            </div>
            <div className={styles.priceTag}>${cow.pricePerShare} / share</div>
          </div>

          <div className={styles.progressSection}>
            <div className={styles.progressLabel}>
              <span>Group Progress</span>
              <span>{availableShares} share(s) remaining</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
        </div>

        <div className={styles.actionArea}>
          <button className={styles.joinBtn} onClick={handleJoin}>
            Join Group & Buy Share
          </button>
          
          <div className={styles.copyArea}>
            <input 
              type="text" 
              readOnly 
              value={`http://localhost:3000/invite/${cow.id}`} 
              className={styles.linkInput} 
            />
            <button className={styles.copyBtn} onClick={handleCopyLink}>
              {copied ? <CheckCircle2 size={20} color="var(--success)" /> : <Copy size={20} />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
