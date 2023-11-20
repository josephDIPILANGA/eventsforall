import React from 'react';
import styles from './footer.module.css';
import Image from 'next/image';
import Link from 'next/link'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
            <Image src="/next.svg" width={50} height={50} />
            <h1 className={styles.logoText}>zones</h1>
        </div>
        <p className={styles.desc} >
          Lorem ipsum dolor, 
          sit amet consectetur adipisicing elit. 
          Exercitationem, maiores.
        </p>
        <div className={styles.icons}>
          <Image src="/next.svg" alt="" width={18} height={18} />
          <Image src="/next.svg" alt="" width={18} height={18} />
          <Image src="/next.svg" alt="" width={18} height={18} />
          <Image src="/next.svg" alt="" width={18} height={18} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
            <span className={styles.listTitle}>Links</span>
            <Link href="/">Homepage</Link>
            <Link href="/">Blog</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
        </div>

        <div className={styles.list}>
            <span className={styles.listTitle}>Tags</span>
            <Link href="/">Styles</Link>
            <Link href="/">Fashion</Link>
            <Link href="/">Coding</Link>
            <Link href="/">Travel</Link>
        </div>

        <div className={styles.list}>
            <span className={styles.listTitle}>Social</span>
            <Link href="/">Tiktok</Link>
            <Link href="/">Facebook</Link>
            <Link href="/">Instagram</Link>
            <Link href="/">Youtube</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
