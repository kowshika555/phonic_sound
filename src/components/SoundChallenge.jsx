import React, { useState, useEffect } from 'react';
import { PHONICS_DATA } from '../data/phonics_data';
import { audioManager } from '../utils/audio_manager';
import LetterCard from './LetterCard';
import styles from './SoundChallenge.module.css';

const MAX_QUESTIONS = 10;

const SoundChallenge = ({ onBack }) => {
    const [score, setScore] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        generateQuestion();
    }, []);

    const generateQuestion = () => {
        if (questionCount >= MAX_QUESTIONS) {
            setGameOver(true);
            return;
        }

        // Pick random correct answer
        const correctIndex = Math.floor(Math.random() * PHONICS_DATA.length);
        const correctData = PHONICS_DATA[correctIndex];

        // Pick 2 distractors
        let distractors = [];
        while (distractors.length < 2) {
            const idx = Math.floor(Math.random() * PHONICS_DATA.length);
            if (idx !== correctIndex && !distractors.includes(idx)) {
                distractors.push(idx);
            }
        }

        const options = [correctData, PHONICS_DATA[distractors[0]], PHONICS_DATA[distractors[1]]];
        // Shuffle options
        options.sort(() => Math.random() - 0.5);

        setCurrentQuestion({
            correct: correctData,
            options: options
        });
        setQuestionCount(prev => prev + 1);
        setFeedback(null);

        // Play sound after a short delay
        setTimeout(() => {
            const cleanPhoneme = correctData.phoneme.replace(/\//g, '');
            const fallbackText = `${cleanPhoneme}`;
            audioManager.play(correctData.soundFile, fallbackText);
        }, 500);
    };

    const handleOptionClick = (item) => {
        if (feedback) return; // Prevent multiple clicks

        if (item.id === currentQuestion.correct.id) {
            setFeedback('correct');
            audioManager.play('/audio/success.mp3', "Good job!").catch(() => { });
            setScore(s => s + 1);
            setTimeout(generateQuestion, 2000); // Wait for animation
        } else {
            setFeedback('incorrect');
            audioManager.play('/audio/failure.mp3', "Try again!").catch(() => { });
            setTimeout(() => setFeedback(null), 1000);
        }
    };

    const playPrompt = () => {
        if (currentQuestion && !gameOver) {
            const cleanPhoneme = currentQuestion.correct.phoneme.replace(/\//g, '');
            const fallbackText = `${cleanPhoneme}`;
            audioManager.play(currentQuestion.correct.soundFile, fallbackText);
        }
    };

    if (gameOver) {
        return (
            <div className={styles.container}>
                <div className={styles.summaryCard}>
                    <h1>Game Over! 🎉</h1>
                    <p className={styles.finalScore}>You scored {score} out of {MAX_QUESTIONS}</p>
                    <div className={styles.actionButtons}>
                        <button className={styles.primaryButton} onClick={() => {
                            setScore(0);
                            setQuestionCount(0);
                            setGameOver(false);
                            generateQuestion();
                        }}>Play Again 🔄</button>
                        <button className={styles.secondaryButton} onClick={onBack}>Back to Menu 🏠</button>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.headerBar}>
                <button className={styles.backButton} onClick={onBack}>⬅️ Back</button>
                <div className={styles.scoreBadge}>Score: {score} / {MAX_QUESTIONS}</div>
            </div>

            <div className={styles.contentArea}>
                <div className={styles.promptContainer}>
                    <h2>Which letter makes this sound?</h2>
                    <button className={styles.soundButton} onClick={playPrompt}>
                        🔊 Play Sound
                    </button>
                </div>

                <div className={styles.optionsGrid}>
                    {currentQuestion.options.map((item) => (
                        <LetterCard
                            key={item.id}
                            letter={item.letter}
                            color={item.color}
                            onClick={() => handleOptionClick(item)}
                            isPlaying={false}
                        />
                    ))}
                </div>
            </div>

            {feedback === 'correct' && (
                <div className={styles.overlayCorrect}>
                    Good Job! 🎉
                </div>
            )}
            {feedback === 'incorrect' && (
                <div className={styles.overlayIncorrect}>
                    Try Again!
                </div>
            )}
        </div>
    );
};

export default SoundChallenge;
