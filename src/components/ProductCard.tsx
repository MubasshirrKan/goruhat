import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, User } from 'lucide-react';
import styles from './ProductCard.module.css';

interface Buyer {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface ProductCardProps {
  id: string;
  name: string;
  weight: number;
  totalPrice: number;
  pricePerShare: number;
  totalShares: number;
  soldShares: number;
  buyers: Buyer[];
  imageSrc: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  weight,
  totalPrice,
  pricePerShare,
  totalShares,
  soldShares,
  buyers,
  imageSrc
}) => {
  const progressPercentage = (soldShares / totalShares) * 100;
  
  // Create an array for the 7 slots
  const slots = Array.from({ length: totalShares }, (_, i) => buyers[i] || null);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.tag}>Premium</div>
        <Image
          src={imageSrc}
          alt={name}
          width={300}
          height={250}
          className={styles.image}
        />
        <button className={styles.expandBtn}>
          <ArrowUpRight size={18} />
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.weight}>{weight} kg</span>
        </div>
        
        <div className={styles.pricing}>
          <div className={styles.priceItem}>
            <span className={styles.priceLabel}>Total Value</span>
            <span className={styles.priceValue}>${totalPrice}</span>
          </div>
          <div className={styles.priceItem}>
            <span className={styles.priceLabel}>Per Share</span>
            <span className={styles.priceValuePrimary}>${pricePerShare}</span>
          </div>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Shares Sold</span>
            <span className={styles.progressValue}>{soldShares}/{totalShares}</span>
          </div>
          <div className={styles.progressBarBg}>
            <div 
              className={styles.progressBarFill} 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className={styles.buyersList}>
            {slots.map((buyer, index) => (
              <div 
                key={index} 
                className={`${styles.buyerSlot} ${buyer ? styles.filledSlot : styles.emptySlot}`}
                title={buyer ? buyer.name : 'Available'}
              >
                {buyer ? (
                  buyer.avatarUrl ? (
                    <img src={buyer.avatarUrl} alt={buyer.name} className={styles.avatarImg} />
                  ) : (
                    <User size={14} className={styles.avatarIcon} />
                  )
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <Link href={`/product/${id}`} className={styles.buyBtn}>
            Buy Share
          </Link>
          <Link href={`/product/${id}`} className={styles.detailsBtn}>
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
