"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Heart, User, Search } from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const router = useRouter();
  const { cart, wishlist, currentUser } = usePlatform();
  const [searchQuery, setSearchQuery] = useState('');
  
  const cartItemCount = cart.reduce((sum, item) => sum + item.shares, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className={styles.navbarWrapper}>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <Image src="/logo.png" alt="Qurbani Logo" width={32} height={32} style={{ borderRadius: '8px' }} />
            </div>
            <span className={styles.logoText}>ShareQurbani.</span>
          </Link>
        </div>

        <div className={styles.center}>
          <form className={styles.searchBar} onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search premium cattle..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className={styles.searchBtn}>
              <Search size={18} />
            </button>
          </form>
        </div>

        <div className={styles.right}>
          {/* Wishlist */}
          <Link href="/wishlist" className={styles.iconButton}>
            <Heart size={20} className={wishlist.length > 0 ? styles.heartIcon : ''} />
            {wishlist.length > 0 && <span className={styles.badge}>{wishlist.length}</span>}
          </Link>

          {/* Cart */}
          <Link href="/cart" className={styles.iconButton}>
            <ShoppingBag size={20} />
            {cartItemCount > 0 && <span className={styles.badge}>{cartItemCount}</span>}
          </Link>

          {/* Profile */}
          <Link href="/dashboard" className={styles.userButton}>
            {currentUser?.name?.split(' ')[0] || 'Profile'}
            <div className={styles.avatar}>
              {currentUser?.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <User size={16} />
              )}
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
