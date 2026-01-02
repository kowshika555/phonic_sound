import React from 'react';
import styles from './LetterCard.module.css';

const LetterCard = ({ letter, color, onClick, isPlaying }) => {
    return (
        <div
            className={`${styles.card} ${isPlaying ? styles.playing : ''}`}
            style={{ '--card-color': color }}
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label={`Letter ${letter}`}
        >
            <span className={styles.letter}>{letter}</span>
        </div>
    );
};

export default LetterCard;
