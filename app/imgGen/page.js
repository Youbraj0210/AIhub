"use client"
import React, { useEffect, useState } from 'react';
import styles from './page.module.css'
import Link from 'next/link';


const apiKey = "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";
const maxImages = 4;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateImages(input, setImages, setLoading) {
    setLoading(true);

    const imageUrls = [];

    for (let i = 0; i < maxImages; i++) {
        const randomNumber = getRandomNumber(1, 10000);
        const prompt = `${input} ${randomNumber}`;
        const response = await fetch(
            "https://api-inference.huggingface.co/models/prompthero/openjourney",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!response.ok) {
            alert("Failed to generate image!");
        }

        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        imageUrls.push(imgUrl);
    }

    setImages(imageUrls);
    setLoading(false);
}

export default function Home() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState("");

    const clearImageGrid = () => {
        setImages([]);
    };

    const downloadImage = (imgUrl, imageNumber) => {
        const link = document.createElement("a");
        link.href = imgUrl;
        link.download = `image-${imageNumber + 1}.jpg`;
        link.click();
    };

    const handleGenerateClick = () => {
        disableGenerateButton();
        clearImageGrid();
        generateImages(prompt, setImages, setLoading);
    };

    const disableGenerateButton = () => {
        const button = document.getElementById("generate");
        if (button) {
            button.disabled = true;
        }
    };

    const enableGenerateButton = () => {
        const button = document.getElementById("generate");
        if (button) {
            button.disabled = false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleGenerateClick();
    };

    return (
        <div className={styles.body}>
            
            <div className={styles.container}>
                <h1>Ai Image Generator <Link href="/" className={styles.link}>Home</Link></h1> 
                <form className={styles.genform} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id={styles.userprompt}
                        placeholder="Type your prompt here..."
                        autoComplete="off"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button type="submit" id={styles.generate} disabled={loading}>
                        Generate
                    </button>
                </form>
                <div className={styles.result}>
                    <div id={styles.loading} style={{ display: loading ? 'block' : 'none' }}>
                        Generating...
                    </div>
                    <div id={styles.imagegrid}>
                        {images.map((imgUrl, i) => (
                            <img
                                key={i}
                                src={imgUrl}
                                alt={`art-${i + 1}`}
                                onClick={() => downloadImage(imgUrl, i)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
