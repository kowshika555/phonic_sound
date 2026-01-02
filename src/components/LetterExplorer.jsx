import React, { useState } from 'react';
import { PHONICS_DATA } from '../data/phonics_data';
import LetterCard from './LetterCard';
import { audioManager } from '../utils/audio_manager';
import styles from './LetterExplorer.module.css';

const LetterExplorer = ({ onNext }) => {
    const [playingId, setPlayingId] = useState(null);

    const handleLetterClick = (item) => {
        setPlayingId(item.id);
        // Simplified TTS: Just the phoneme (single sound)
        // Removing slashes from phoneme to avoid "slash a slash"
        const cleanPhoneme = item.phoneme.replace(/\//g, '');
        // Just saying the sound representation
        const fallbackText = cleanPhoneme;
        audioManager.play(item.soundFile, fallbackText).finally(() => {
            // Optional: clear playing state after sound, 
            // but strictly managing it via audio duration is complex without events.
            // For simple UI feedback, we can just timeout or leave it until next click.
            setTimeout(() => setPlayingId(null), 1000);
        });
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={onNext}>🏠 Menu</button>
                <h1>Tap a Letter to Hear Sounds</h1>
            </header>

            <div className={styles.grid}>
                {PHONICS_DATA.map((item) => (
                    <LetterCard
                        key={item.id}
                        letter={item.letter}
                        color={item.color}
                        onClick={() => handleLetterClick(item)}
                        isPlaying={playingId === item.id}
                    />
                ))}
            </div>

            <div className={styles.footer}>
                <button className={styles.nextButton} onClick={onNext}>
                    Next Level ⏩
                </button>
            </div>
        </div>
    );
};

export default LetterExplorer;
