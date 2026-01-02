import React from 'react';
import styles from './Home.module.css';

const Home = ({ onSelectLevel }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Phonics Sounds</h1>
            <p className={styles.subtitle}>Choose your level!</p>

            <div className={styles.buttonContainer}>
                <button
                    className={`${styles.levelButton} ${styles.easy}`}
                    onClick={() => onSelectLevel('easy')}
                >
                    Easy
                    <span className={styles.icon}>🅰️</span>
                    <span className={styles.desc}>Learn Letters</span>
                </button>

                <button
                    className={`${styles.levelButton} ${styles.medium}`}
                    onClick={() => onSelectLevel('medium')}
                >
                    Medium
                    <span className={styles.icon}>🍎</span>
                    <span className={styles.desc}>Learn Words</span>
                </button>

                <button
                    className={`${styles.levelButton} ${styles.hard}`}
                    onClick={() => onSelectLevel('hard')}
                >
                    Hard
                    <span className={styles.icon}>🏆</span>
                    <span className={styles.desc}>Challenge</span>
                </button>
            </div>
        </div>
    );
};

export default Home;
