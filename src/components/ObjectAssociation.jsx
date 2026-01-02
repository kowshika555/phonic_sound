import React, { useState, useEffect } from 'react';
import { PHONICS_DATA } from '../data/phonics_data';
import { audioManager } from '../utils/audio_manager';
import styles from './ObjectAssociation.module.css';

const ObjectAssociation = ({ onNext, onBack }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentItem = PHONICS_DATA[currentIndex];

    useEffect(() => {
        // Play phoneme sound on enter
        const cleanPhoneme = currentItem.phoneme.replace(/\//g, '');
        const fallbackText = cleanPhoneme;
        audioManager.play(currentItem.soundFile, fallbackText);

        return () => {
            audioManager.stop();
        };
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex < PHONICS_DATA.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onNext();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        } else {
            onBack();
        }
    };

    const playWord = (wordObj) => {
        audioManager.play(wordObj.sound, wordObj.word);
    };

    return (
        <div className={styles.container} style={{ '--theme-color': currentItem.color }}>
            <button className={styles.homeButton} onClick={onNext}>🏠</button>
            <header className={styles.header}>
                <button onClick={handlePrev} className={styles.navButton}>⬅️</button>
                <h1 onClick={() => audioManager.play(currentItem.soundFile)}>
                    {currentItem.letter} says {currentItem.phoneme}
                </h1>
                <button onClick={handleNext} className={styles.navButton}>➡️</button>
            </header>

            <div className={styles.canvas}>
                <div className={styles.mainLetter}>
                    {currentItem.letter}
                </div>

                <div className={styles.objectsContainer}>
                    {currentItem.words.map((word, idx) => (
                        <div key={idx} className={styles.objectItem} onClick={() => playWord(word)}>
                            <div className={styles.imagePlaceholder}>
                                <span className={styles.emoji}>{word.emoji || '📦'}</span>
                            </div>
                            <span className={styles.wordLabel}>{word.word}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ObjectAssociation;
