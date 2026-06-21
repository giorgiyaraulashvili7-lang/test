// ========================================
// BOOK CONTENT DATABASE
// ========================================

const bookContent = [
    {
        // Page 1 (Left) - Introduction
        left: {
            title: "To You, On Your Special Day",
            type: "text",
            content: `There are moments in life that feel like poetry — quiet, beautiful, and impossible to fully put into words. Today is one of them. As you open this, I want you to know that simply knowing you has made my world warmer, brighter, and more alive.

Every year that passes only reveals more of who you truly are — and every layer I discover leaves me more in awe of the person you've become. You deserve every wish, every rose, every golden second of this day.

So here is a small world I built just for you. Not grand enough to match you — nothing could be — but made entirely with love.

With all my heart, always ❤️`
        },
        // Page 2 (Right) - Poem
        right: {
            type: "poem",
            content: `May your day be
as beautiful as you are,
as warm as your smile,
as bright as your eyes,
and as unforgettable
as you are to me.

Happy Birthday, Princess. 🌹`
        }
    },
    {
        // Page 3 (Left) - Things I Wish For You
        left: {
            title: "Things I Wish For You",
            type: "text",
            content: `As you step into another year, my heart is full of hopes for your journey ahead. May you find clarity in your path, strength in your heart, and a soul that remains forever curious and kind. Here are the things I wish for you most, not just today, but for every sunrise that finds you.`
        },
        // Page 4 (Right) - Wish Cards
        right: {
            type: "wishes",
            wishes: [
                "Endless happiness",
                "Good health",
                "Beautiful adventures",
                "Dreams coming true",
                "Peaceful mornings",
                "Unforgettable memories",
                "A life filled with love",
                "Confidence in yourself",
                "Countless reasons to smile",
                "Success in everything you do"
            ]
        }
    },
    {
        // Page 5 (Left) - For The Years Ahead
        left: {
            title: "For The Years Ahead",
            type: "text",
            content: `Your future is a canvas waiting for your unique light. I see you growing into an even more incredible version of yourself, facing every new day with grace. The years ahead hold so much promise, and I can't wait to see you shine as you create a story that is uniquely yours.`
        },
        // Page 6 (Right) - More Wish Cards
        right: {
            type: "wishes",
            wishes: [
                "Courage to follow your dreams",
                "Wonderful friendships",
                "Meaningful moments",
                "Exciting opportunities",
                "Inner peace",
                "Joy in small things",
                "Endless inspiration",
                "Strength during challenges",
                "New beautiful experiences",
                "A future brighter than ever"
            ]
        }
    },
    {
        // Page 7 (Left) - Things You May Not Know
        left: {
            title: "Things You May Not Know",
            type: "text",
            content: `Sometimes we are the last to see the light we carry. You walk through the world leaving traces of goodness that you might not even realize. There are things about you that make life better for everyone lucky enough to know you, simply by being who you are.`
        },
        // Page 8 (Right) - Personal qualities Cards
        right: {
            type: "wishes",
            wishes: [
                "You make people feel comfortable",
                "You are stronger than you realize",
                "Your smile changes moods",
                "You inspire others",
                "You are deeply appreciated",
                "You bring warmth wherever you go",
                "You are more capable than you think",
                "Your kindness is memorable",
                "You make ordinary moments special",
                "You are loved more than you know"
            ]
        }
    }
];

// ========================================
// STATE MANAGEMENT
// ========================================

let currentStage = 'box'; // 'box', 'book-reveal', 'book'
let currentPageSpread = 0; // 0-3 (each is a 2-page spread)
const MAX_SPREADS = bookContent.length;

let backgroundRosesStarted = false;


// ========================================
// STAGE TRANSITIONS
// ========================================

function transitionToStage(stageName) {
    const stages = document.querySelectorAll('.stage');
    stages.forEach(stage => stage.classList.remove('active'));
    document.getElementById(`stage-${stageName}`).classList.add('active');
    currentStage = stageName;
}

// ========================================
// STAGE 1: GIFT BOX EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const giftBox = document.querySelector('.daz-gift-box');
    
    giftBox.addEventListener('click', function() {
        if (!this.classList.contains('clicked')) {
            this.classList.add('clicked');

            // Hide "Tap to open" after first click
            const tap = document.getElementById('tap-to-open');
            if (tap) tap.style.opacity = '0';
            // Start exploding petals 1 second after gift click
            setTimeout(() => {
                createPetals();
            }, 1000);
            
            // Transition to book reveal after petals finish
            setTimeout(() => {
                transitionToStage('book-reveal');
            }, 2500);

        }
    });
});

// ========================================
// PETAL GENERATION
// ========================================

function createPetals() {
    const petalTarget = document.querySelector('.petal-target');
    const petalCount = 50; // Number of rose petals

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';

        // Random explosion direction
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const speed = Math.random() * 0.5 + 0.5;

        petal.style.setProperty('--x', Math.cos(angle) * speed);
        petal.style.setProperty('--y', Math.sin(angle) * speed);
        petal.style.setProperty('--r', Math.random() * 360);

        // Random start position within box
        const xStart = Math.random() * 100;
        const yStart = Math.random() * 100;

        petal.style.left = xStart + '%';
        petal.style.top = yStart + '%';

        petalTarget.appendChild(petal);

        // Remove after animation
        petal.addEventListener('animationend', () => {
            petal.remove();
        });
    }
}

// ========================================
// BACKGROUND ROSE FALLING (continuous)
// ========================================

function startBackgroundRoses() {
    if (backgroundRosesStarted) return;
    backgroundRosesStarted = true;

    const warp = document.getElementById('rose-background');
    if (!warp) return;

    const total = 30;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Guard: clear any existing roses
    warp.innerHTML = '';

    for (let i = 0; i < total; i++) {
        const el = document.createElement('div');
        el.className = 'dot';
        warp.appendChild(el);

        // Initial placement similar to rose_petals_falling.html
        const x = R(0, w);
        const y = R(-200, -150);
        const z = R(-200, 200);

        // Random scale variety
        const s = R(0.7, 1.2);

        // GSAP set
        gsap.set(el, {
            x,
            y,
            z,
            scale: s
        });

        animm(el);
    }

    function animm(elm) {
        // Fall loop
        gsap.to(elm, {
            y: h + 100,
            duration: R(6, 15),
            ease: 'none',
            repeat: -1,
            delay: -15
        });

        // Side drift + rotation loop
        gsap.to(elm, {
            x: `+=${R(50, 120)}`,
            rotation: R(0, 180),
            duration: R(4, 8),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        // 3D rotation loop
        gsap.to(elm, {
            rotationX: R(0, 360),
            rotationY: R(0, 360),
            duration: R(2, 8),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: -5
        });
    }

    function R(min, max) {
        return min + Math.random() * (max - min);
    }
}

// ========================================
// STAGE 2: BOOK REVEAL EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const bookCover = document.querySelector('.book-cover');
    
    if (bookCover) {
        bookCover.addEventListener('click', function() {
            this.classList.add('opening');
            
            // Transition to book reading after animation
            setTimeout(() => {
                currentPageSpread = 0;
                transitionToStage('book');
                updateBookContent();

                // Start background roses after the book is opened
                setTimeout(() => {
                    startBackgroundRoses();
                }, 0);
            }, 800);

        });
    }
});

// ========================================
// STAGE 3: BOOK READING
// ========================================

function updateBookContent() {
    const spread = bookContent[currentPageSpread];
    
    // Update left page
    const titleLeft = document.getElementById('title-left');
    const contentLeft = document.getElementById('content-left');
    
    if (spread.left.type === 'text') {
        titleLeft.textContent = spread.left.title;
        titleLeft.style.display = 'block';
        
        const paragraphs = spread.left.content.split('\n\n')
            .map(para => `<p>${para}</p>`)
            .join('');
        contentLeft.innerHTML = paragraphs;
    }
    
    // Update right page
    const contentRight = document.getElementById('content-right');
    
    if (spread.right.type === 'poem') {
        const poemLines = spread.right.content.split('\n');
        const poemHTML = poemLines
            .map(line => `<div style="margin: 8px 0;">${line}</div>`)
            .join('');
        
        contentRight.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                width: 85%;
                z-index: 35;
            ">
                <p style="
                    margin: 0;
                    font-family: 'Baskervville', serif;
                    font-size: 1.2rem;
                    line-height: 1.55;
                    color: rgba(80, 10, 20, 0.92);
                    text-shadow: 0 2px 10px rgba(255, 255, 255, 0.45);
                ">${poemHTML}</p>
            </div>
        `;
    } else if (spread.right.type === 'wishes') {
        const wishCards = spread.right.wishes
            .map(wish => `
                <div class="wish-card">${wish}</div>
            `)
            .join('');
        
        contentRight.innerHTML = `<div class="wish-grid">${wishCards}</div>`;
    }
    
    // Update navigation
    updateNavigation();
}

function updateNavigation() {
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    const indicator = document.getElementById('nav-indicator');
    
    // Display page numbers (each spread is 2 pages)
    const pageNumber = (currentPageSpread * 2) + 1;
    indicator.textContent = `Page ${pageNumber} of 8`;
    
    // Disable buttons at bounds
    prevBtn.disabled = currentPageSpread === 0;
    nextBtn.disabled = currentPageSpread === MAX_SPREADS - 1;
}

// ========================================
// BOOK NAVIGATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    
    prevBtn.addEventListener('click', function() {
        if (currentPageSpread > 0) {
            currentPageSpread--;
            updateBookContent();
            animatePageTurn();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentPageSpread < MAX_SPREADS - 1) {
            currentPageSpread++;
            updateBookContent();
            animatePageTurn();
        }
    });
});

function animatePageTurn() {
    const book = document.querySelector('.book');
    
    // Add a subtle animation
    book.style.animation = 'none';
    setTimeout(() => {
        book.style.animation = 'bookAppear 0.5s ease-out';
    }, 10);
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================

document.addEventListener('keydown', function(e) {
    if (currentStage !== 'book') return;
    
    if (e.key === 'ArrowLeft') {
        document.getElementById('btn-prev').click();
    } else if (e.key === 'ArrowRight') {
        document.getElementById('btn-next').click();
    }
});

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    transitionToStage('box');
});