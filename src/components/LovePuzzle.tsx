import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

import puzzleImage from '@/assets/puzzle-photo.jpg';

const COLS = 3;
const ROWS = 4;
const TILE_COUNT = COLS * ROWS;

const LovePuzzle = () => {
    // 0 to 11, where 11 is the empty tile
    const [tiles, setTiles] = useState<number[]>([]);
    const [isSolved, setIsSolved] = useState(false);
    const [showLetter, setShowLetter] = useState(false);

    // Initialize puzzle
    useEffect(() => {
        shuffleTiles();
    }, []);

    // Check if solved whenever tiles change
    useEffect(() => {
        if (tiles.length === 0) return;

        const isCorrect = tiles.every((tile, index) => tile === index);
        if (isCorrect && !isSolved) {
            setIsSolved(true);

            // Celebration confetti
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ff69b4', '#ff0000', '#ffa500']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ff69b4', '#ff0000', '#ffa500']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();

            // Allow user to see the full image for a moment before showing the letter
            setTimeout(() => {
                setShowLetter(true);
            }, 3500); // 3.5s delay to admire the photo
        }
    }, [tiles, isSolved]);

    const shuffleTiles = () => {
        // Start with solved state
        let newTiles = Array.from({ length: TILE_COUNT }, (_, i) => i);

        // Perform random valid moves to shuffle (ensures solvability)
        let emptyIndex = TILE_COUNT - 1;
        let previousIndex = -1;

        // Reduced complexity: only shuffle 4 moves away from solved state
        for (let i = 0; i < 4; i++) {
            const validMoves = getValidMoves(emptyIndex);
            // Avoid undoing the last move immediately
            const moves = validMoves.filter(idx => idx !== previousIndex);

            if (moves.length > 0) {
                const randomMove = moves[Math.floor(Math.random() * moves.length)];

                // Swap
                [newTiles[emptyIndex], newTiles[randomMove]] = [newTiles[randomMove], newTiles[emptyIndex]];

                previousIndex = emptyIndex;
                emptyIndex = randomMove;
            }
        }

        setTiles(newTiles);
        setIsSolved(false);
        setShowLetter(false);
    };

    const getValidMoves = (emptyIndex: number) => {
        const moves = [];
        const row = Math.floor(emptyIndex / COLS);
        const col = emptyIndex % COLS;

        if (row > 0) moves.push(emptyIndex - COLS); // Up
        if (row < ROWS - 1) moves.push(emptyIndex + COLS); // Down
        if (col > 0) moves.push(emptyIndex - 1); // Left
        if (col < COLS - 1) moves.push(emptyIndex + 1); // Right

        return moves;
    };

    const handleTileClick = (index: number) => {
        if (isSolved) return;

        const emptyIndex = tiles.indexOf(TILE_COUNT - 1);
        const row = Math.floor(index / COLS);
        const col = index % COLS;
        const emptyRow = Math.floor(emptyIndex / COLS);
        const emptyCol = emptyIndex % COLS;

        // Check adjacency
        const isAdjacent = Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;

        if (isAdjacent) {
            const newTiles = [...tiles];
            // Swap clicked tile with empty tile
            [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
            setTiles(newTiles);
        }
    };

    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 bg-gradient-to-b from-background to-secondary/20">
            <div className="container mx-auto max-w-4xl flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-8"
                >
                    <AnimatePresence mode="wait">
                        {!showLetter ? (
                            <motion.div
                                key="puzzle"
                                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center gap-6"
                            >
                                <div className="text-center">
                                    <h2 className="font-display text-3xl font-medium text-foreground mb-2">
                                        Bore Hogyi Ye lo Puzzle solve karo
                                    </h2>
                                    <p className="font-body text-sm text-muted-foreground">
                                        {isSolved ? "Perfect!" : ""}
                                    </p>
                                </div>

                                <motion.div
                                    className="relative p-2 bg-white rounded-xl shadow-lg transform rotate-1 transition-all duration-500"
                                    animate={isSolved ? { scale: 1.1, rotate: 0 } : {}}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                >
                                    {/* Grid for 3x4 */}
                                    <div
                                        className={`grid grid-cols-3 gap-1 bg-gray-200 p-1 rounded-lg overflow-hidden transition-all duration-500 ${isSolved ? '!gap-0 border-0 p-0' : ''}`}
                                        style={{ width: '300px', height: '500px' }}
                                    >
                                        {tiles.map((tileIndex, index) => {
                                            // As we are reconstructing the image, we just need to ensure the empty tile 
                                            // is filled when solved.

                                            // Calculate background position based on the TILE VALUE (tileIndex)
                                            // This ensures the correct part of the image is shown
                                            const originalRow = Math.floor(tileIndex / COLS);
                                            const originalCol = tileIndex % COLS;

                                            const bgX = (originalCol / (COLS - 1)) * 100;
                                            const bgY = (originalRow / (ROWS - 1)) * 100;

                                            // If it's the empty tile (index 11), we usually hide it.
                                            // But if solved, we want to show it.
                                            // AND crucially, if we are solved, the tiles are in order 0-11,
                                            // so the empty tile is at the end.
                                            const isEmptyTile = tileIndex === TILE_COUNT - 1;

                                            if (isEmptyTile && !isSolved) {
                                                return <div key={`empty-${index}`} className="bg-gray-100/50 rounded-sm" />;
                                            }

                                            return (
                                                <motion.div
                                                    key={tileIndex}
                                                    layout
                                                    onClick={() => handleTileClick(index)}
                                                    className={`relative w-full h-full cursor-pointer overflow-hidden rounded-sm transition-all duration-500 ${isSolved ? 'cursor-default rounded-none brightness-110 !scale-105' : 'hover:brightness-110'}`}
                                                    initial={false}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                >
                                                    <div
                                                        className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-500"
                                                        style={{
                                                            backgroundImage: `url(${puzzleImage})`,
                                                            backgroundPosition: `${bgX}% ${bgY}%`,
                                                            backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                                                        }}
                                                    />
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Flash effect on solve */}
                                    {isSolved && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 0.8, 0] }}
                                            transition={{ duration: 0.6 }}
                                            className="absolute inset-0 pointer-events-none bg-white rounded-lg z-10"
                                        />
                                    )}
                                </motion.div>

                                {!isSolved && (
                                    <button
                                        onClick={shuffleTiles}
                                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Shuffle Pieces
                                    </button>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="letter"
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                                className="max-w-md w-full"
                            >
                                <div className="relative bg-[#fff9f0] p-8 md:p-10 rounded-sm shadow-xl rotate-1 border border-[#e6dccf] mx-auto">
                                    {/* Paper Texture */}
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                                    {/* Content */}
                                    <div className="relative z-10 font-serif leading-relaxed text-foreground/80 space-y-4">
                                        <div className="flex justify-center mb-6">
                                            <Heart className="w-12 h-12 text-red-500 fill-red-500 animate-pulse" />
                                        </div>
                                        <p className="text-xl italic font-bold text-primary mb-6">
                                            Wow Babu 🥰,
                                        </p>
                                        <p>
                                            aap to bohot smart ho 😘
                                        </p>
                                        <p>
                                            Chalo ek quiz karte hai..
                                        </p>
                                        <p className="text-right mt-8 font-display text-lg">
                                            - Ready??
                                        </p>
                                        <div className="flex justify-center gap-4 mt-8">
                                            <button
                                                onClick={() => document.getElementById('love-quiz')?.scrollIntoView({ behavior: 'smooth' })}
                                                className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors shadow-md"
                                            >
                                                Chalo
                                            </button>
                                            <button
                                                onClick={() => document.getElementById('love-quiz')?.scrollIntoView({ behavior: 'smooth' })}
                                                className="px-6 py-2 bg-white text-primary border-2 border-primary rounded-full font-medium hover:bg-primary/5 transition-colors shadow-sm"
                                            >
                                                Batati hu Aapko..
                                            </button>
                                        </div>
                                    </div>

                                    {/* Decorative tape */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-primary/20 rotate-[-2deg] backdrop-blur-[1px]" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default LovePuzzle;
