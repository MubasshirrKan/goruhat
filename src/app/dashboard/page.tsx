"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Settings, ShoppingBag, Bell, Share2, Activity, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import styles from './Dashboard.module.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isPhoneVisible, setIsPhoneVisible] = useState(false);
  const [isSocialVisible, setIsSocialVisible] = useState(true);
  
  const { getCowById, currentUser, updateCurrentUser } = usePlatform();
  
  // State for the profile form
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    address: currentUser.address || '',
    bio: currentUser.bio || '',
    facebook: currentUser.socialMedia?.facebook || '',
    linkedin: currentUser.socialMedia?.linkedin || '',
  });

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      ...formData,
      socialMedia: {
        facebook: formData.facebook,
        linkedin: formData.linkedin,
      }
    });
    alert("Profile saved successfully!");
  };
  
  // Mock data for user purchases (since we don't have a real DB connection tracking past orders yet)
  // We'll use c1 and c3 from data.ts
  const myPurchases = [
    { cow: getCowById('c1'), myShares: 1 },
    { cow: getCowById('c3'), myShares: 2 },
  ].filter(p => p.cow !== undefined);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, {currentUser.name.split(' ')[0]}!</h1>
          <p className={styles.subtitle}>Manage your Qurbani shares, invitations, and profile settings.</p>
        </div>
        {currentUser.isVerified && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', backgroundColor: 'var(--surface)', borderRadius: '99px', border: '1px solid var(--border)' }}>
            <ShieldCheck size={20} color="var(--success)" />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Verified Account</span>
          </div>
        )}
      </div>

      <div className={styles.layout}>
        {/* Sidebar Nav */}
        <div className={styles.sidebar}>
          <button className={`${styles.navItem} ${activeTab === 'overview' ? styles.navItemActive : ''}`} onClick={() => setActiveTab('overview')}>
            <Activity size={20} /> Dashboard
          </button>
          <button className={`${styles.navItem} ${activeTab === 'purchases' ? styles.navItemActive : ''}`} onClick={() => setActiveTab('purchases')}>
            <ShoppingBag size={20} /> My Purchases
          </button>
          <button className={`${styles.navItem} ${activeTab === 'profile' ? styles.navItemActive : ''}`} onClick={() => setActiveTab('profile')}>
            <User size={20} /> Profile Setup
          </button>
          <button className={`${styles.navItem} ${activeTab === 'invitations' ? styles.navItemActive : ''}`} onClick={() => setActiveTab('invitations')}>
            <Share2 size={20} /> Invitations
          </button>
          <button className={`${styles.navItem} ${activeTab === 'settings' ? styles.navItemActive : ''}`} onClick={() => setActiveTab('settings')}>
            <Settings size={20} /> Privacy & Settings
          </button>
        </div>

        {/* Main Content */}
        <div className={styles.contentArea}>
          
          {activeTab === 'overview' && (
            <motion.div variants={fadeUpVariant} initial="hidden" animate="visible" className={styles.contentArea}>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}><ShoppingBag size={24} /></div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>3</span>
                    <span className={styles.statLabel}>Total Shares Owned</span>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}><Activity size={24} /></div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>2</span>
                    <span className={styles.statLabel}>Active Qurbanis</span>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}><Share2 size={24} /></div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>5</span>
                    <span className={styles.statLabel}>People Invited</span>
                  </div>
                </div>
              </div>

              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Recent Activity</h2>
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                  <Bell size={32} style={{ opacity: 0.5, marginBottom: '16px' }} />
                  <p>You joined <strong>Deshi Prime</strong> with 2 shares.</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'purchases' && (
            <motion.div variants={fadeUpVariant} initial="hidden" animate="visible" className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>My Active Qurbanis</h2>
              <div className={styles.purchaseList}>
                {myPurchases.map((purchase, idx) => {
                  const cow = purchase.cow!;
                  const progressPercentage = (cow.soldShares / cow.totalShares) * 100;
                  const isFull = cow.soldShares === cow.totalShares;

                  return (
                    <div key={idx} className={styles.purchaseItem}>
                      <div className={styles.purchaseInfo}>
                        <Image src={cow.imageSrc} alt={cow.name} width={64} height={64} className={styles.purchaseImg} />
                        <div>
                          <div className={styles.purchaseTitle}>{cow.name}</div>
                          <div className={styles.purchaseMeta}>You own: {purchase.myShares} share(s)</div>
                        </div>
                      </div>

                      <div className={styles.progressWrapper}>
                        <div className={styles.progressHeader}>
                          <span>Group Progress</span>
                          <span>{cow.soldShares}/{cow.totalShares} Shares</span>
                        </div>
                        <div className={styles.progressBarBg}>
                          <div className={styles.progressBarFill} style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                      </div>

                      {!isFull ? (
                        <Link href={`/invite/${cow.id}`} className={styles.inviteBtn}>
                          <Share2 size={16} /> Invite to Complete
                        </Link>
                      ) : (
                        <div style={{ color: 'var(--success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={18} /> Group Full
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div variants={fadeUpVariant} initial="hidden" animate="visible" className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Profile Setup</h2>
              <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Full Name</label>
                    <input type="text" className={styles.input} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Email Address</label>
                    <input type="email" className={styles.input} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Phone Number</label>
                    <input type="tel" className={styles.input} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Address / Area</label>
                    <input type="text" className={styles.input} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                  </div>
                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Short Bio</label>
                    <textarea className={styles.textarea} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} placeholder="Tell your co-buyers a little about yourself..." />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Facebook Link (Optional)</label>
                    <input type="text" className={styles.input} value={formData.facebook} onChange={e => setFormData({...formData, facebook: e.target.value})} placeholder="facebook.com/yourname" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>LinkedIn Link (Optional)</label>
                    <input type="text" className={styles.input} value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} placeholder="linkedin.com/in/yourname" />
                  </div>
                </div>
                <button type="submit" className={styles.saveBtn}>Save Profile</button>
              </form>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div variants={fadeUpVariant} initial="hidden" animate="visible" className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Privacy & Settings</h2>
              <div className={styles.settingsGrid}>
                
                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h4>Public Profile</h4>
                    <p>Show your avatar and name to other buyers in the same cow group.</p>
                  </div>
                  <label className={styles.switch}>
                    <input type="checkbox" defaultChecked disabled />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h4>Show Phone Number</h4>
                    <p>Allow other co-buyers to see your phone number to coordinate.</p>
                  </div>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={isPhoneVisible} onChange={() => setIsPhoneVisible(!isPhoneVisible)} />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h4>Show Social Profile</h4>
                    <p>Display your Facebook/LinkedIn link on your buyer badge.</p>
                  </div>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={isSocialVisible} onChange={() => setIsSocialVisible(!isSocialVisible)} />
                    <span className={styles.slider}></span>
                  </label>
                </div>

              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
