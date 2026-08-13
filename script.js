/* ==========================================================
   BIRTHDAY WEBSITE FOR AANYA — JAVASCRIPT
   Beginner tip: each section below is commented so you know
   exactly what to edit.
   ========================================================== */

// ---------- IMAGE LIST (edit here to change/add photos) ----------
const GALLERY_IMAGES = [
  "https://i.ibb.co/Y48cZ4mq/Whats-App-Image-2026-07-20-at-15-48-25-3.jpg",
  "https://i.ibb.co/x872c9sF/Whats-App-Image-2026-07-20-at-15-48-25-6.jpg",
  "https://i.ibb.co/kVxHt4xS/Whats-App-Image-2026-07-20-at-15-48-25-8.jpg",
  "https://i.ibb.co/6Jcs0FvF/Whats-App-Image-2026-07-20-at-15-48-25-9.jpg",
  "https://i.ibb.co/TBrrTczS/Whats-App-Image-2026-07-20-at-15-48-25-15.jpg",
  "https://i.ibb.co/C3FMjwcb/Whats-App-Image-2026-07-20-at-15-48-25-5.jpg",
  "https://i.ibb.co/b5C0dbx5/Whats-App-Image-2026-07-20-at-15-48-25-7.jpg",
  "https://i.ibb.co/N63GBzbF/Whats-App-Image-2026-07-20-at-15-48-25-13.jpg"
];

// ---------- CHAT BUBBLE MESSAGES (edit here) ----------
const CHAT_MESSAGES = [
  "Happy birthday, sunshine 🌻",
  "Today's all about you ✨",
  "Hope you're smiling right now :)",
  "You deserve the best day ever 💛",
  "The world is brighter with you in it.",
  "Don't forget to make a wish ⭐",
  "You make ordinary days special.",
  "Keep shining, birthday girl 🌼"
];

// ---------- LETTER TEXT (edit here to change the letter) ----------
const LETTER_TEXT = `Dear Aanya,

Happy Birthday!!!! It's a really big day for you today and I really hope you enjoy it! WOW you're 18 years old, big gurl, and you're still the prettiest and best girl in the whole world.

I remember seeing you on the first day of the MUN and I immediately knew it was you. I was kinda nervous to call out to you before you noticed me but then we finally met and did the whole MUN together. We wrote communiques and did other stuff in the MUN and those are memories I will never forget as they're the first memories I have with my favourite girl in the world. I don't know how we got so close in such a small period of time but I'm the luckiest guy in the world to have met you.

You've been a constant pillar of support in my life ever since we started talking and I feel like it's gonna stay like that for a long long time. You deserve everything the world has to offer.

There are so many instances you've always been there for me, cheered me up, like the football message you sent me the day before my match. Comforting me when I felt sad and down and it's come to a stage that whenever I feel down or off, I always think about you. You're a constant thing in my mind, every single minute and second its always you in my mind Aanya. You've had that big of an impact on my life, and I love it. I'm so happy I got to meet you.

You dream big, and you're playful, cute, fun, angry sometimes and really really the best person anyone can meet. I hope you keep living your life as you because the light that you give everyone around you is something unique only to you.

I remember sunflowers not because they're your favourite flowers but because a sunflower reminds me of you.

Hope you have the best day ever!

Yours,
Shubham~`;

document.addEventListener('DOMContentLoaded', () => {

  /* ===================== LOADING SCREEN ===================== */
  const loadingScreen = document.getElementById('loading-screen');
  const progressBar = document.getElementById('progress-bar');
  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        initLandingEffects();
      }, 400);
    }
    progressBar.style.width = progress + '%';
  }, 200);

  /* ===================== CUSTOM CURSOR ===================== */
  const cursor = document.getElementById('custom-cursor');
  const cursorGlow = document.getElementById('cursor-glow');
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  /* ===================== LANDING SPARKLES ===================== */
  function initLandingEffects() {
    const sparkleContainer = document.getElementById('landing-sparkles');
    for (let i = 0; i < 40; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.animationDelay = (Math.random() * 3) + 's';
      sparkleContainer.appendChild(s);
    }
  }

  /* ===================== OPEN BUTTON ===================== */
  const openBtn = document.getElementById('open-btn');
  const landingScreen = document.getElementById('landing-screen');
  const mainSite = document.getElementById('main-site');
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');

  openBtn.addEventListener('click', (e) => {
    // ripple effect
    const ripple = openBtn.querySelector('.ripple');
    ripple.classList.remove('active');
    void ripple.offsetWidth; // restart animation
    ripple.classList.add('active');

    // petals burst
    burstPetals(30);
    // confetti
    launchConfetti(120);

    // try to play music (may be blocked until user gesture — this click counts as one)
    bgMusic.volume = 0.5;
    bgMusic.play().then(() => musicToggle.classList.add('playing')).catch(() => {});

    setTimeout(() => {
      landingScreen.style.opacity = '0';
      landingScreen.style.visibility = 'hidden';
      mainSite.classList.remove('hidden');
      buildGallery();
      startAmbientPetals();
      startAmbientParticles();
      startChatBubbles();
      initScrollFade();
    }, 700);
  });

  /* ===================== MUSIC TOGGLE ===================== */
  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.classList.add('playing');
    } else {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
    }
  });

  /* ===================== GALLERY ===================== */
  function buildGallery() {
    const grid = document.getElementById('gallery-grid');
    GALLERY_IMAGES.forEach((src, i) => {
      const card = document.createElement('div');
      card.className = 'polaroid';
      const rotation = (i % 2 === 0 ? -1 : 1) * (Math.random() * 6 + 3);
      card.style.transform = `rotate(${rotation}deg)`;
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'A memory with Aanya';
      img.loading = 'lazy';
      card.appendChild(img);
      grid.appendChild(card);
    });
  }

  /* ===================== SCROLL FADE-IN ===================== */
  function initScrollFade() {
    const items = document.querySelectorAll('.fade-in-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.15 });
    items.forEach(item => observer.observe(item));
  }

  /* ===================== AMBIENT FALLING PETALS ===================== */
  function startAmbientPetals() {
    setInterval(() => burstPetals(1), 600);
  }
  function burstPetals(count) {
    const container = document.getElementById('petal-container');
    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.textContent = Math.random() > 0.5 ? '🌸' : '🌻';
      petal.style.left = Math.random() * 100 + 'vw';
      const duration = 6 + Math.random() * 6;
      petal.style.animationDuration = duration + 's';
      petal.style.fontSize = (1 + Math.random()) + 'rem';
      container.appendChild(petal);
      setTimeout(() => petal.remove(), duration * 1000);
    }
  }

  /* ===================== AMBIENT PARTICLES ===================== */
  function startAmbientParticles() {
    setInterval(() => {
      const container = document.getElementById('particle-container');
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.bottom = '0px';
      container.appendChild(p);
      setTimeout(() => p.remove(), 6000);
    }, 400);
  }

  /* ===================== CHAT BUBBLES ===================== */
  function startChatBubbles() {
    const container = document.getElementById('chat-bubble-container');
    let index = 0;
    setInterval(() => {
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble';
      bubble.textContent = CHAT_MESSAGES[index % CHAT_MESSAGES.length];
      index++;
      bubble.style.left = (10 + Math.random() * 70) + 'vw';
      bubble.style.top = (10 + Math.random() * 70) + 'vh';
      container.appendChild(bubble);
      setTimeout(() => bubble.remove(), 8000);
    }, 3500);

    // subtle reaction to mouse movement
    document.addEventListener('mousemove', (e) => {
      document.querySelectorAll('.chat-bubble').forEach(b => {
        const rect = b.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          b.style.transform = `translate(${-dx / 20}px, ${-dy / 20}px)`;
        }
      });
    });
  }

  /* ===================== ENVELOPE / LETTER ===================== */
  const envelope = document.getElementById('envelope');
  const envelopeHint = document.getElementById('envelope-hint');
  const letterPaper = document.getElementById('letter-paper');
  const typewriterText = document.getElementById('typewriter-text');
  let letterOpened = false;

  envelope.addEventListener('click', () => {
    if (letterOpened) return;
    letterOpened = true;
    envelope.classList.add('open');
    envelopeHint.textContent = '💛';
    launchConfetti(60);

    setTimeout(() => {
      letterPaper.classList.remove('hidden');
      typewriteLetter();
    }, 600);
  });

  function typewriteLetter() {
    let i = 0;
    typewriterText.textContent = '';
    const speed = 12; // ms per character — lower is faster
    function type() {
      if (i < LETTER_TEXT.length) {
        typewriterText.textContent += LETTER_TEXT.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  /* ===================== SECRET SUNFLOWER ===================== */
  const secretFlower = document.getElementById('secret-sunflower');
  let secretClicks = 0;
  secretFlower.addEventListener('click', () => {
    secretClicks++;
    secretFlower.style.transform = `scale(${1 + secretClicks * 0.1}) rotate(${secretClicks * 20}deg)`;
    if (secretClicks === 5) {
      launchConfetti(200);
      alert("Damn you found this, its just another reminder of why you're the BESTEST person in the world!!!!!");
      secretFlower.style.opacity = '1';
      secretFlower.style.textShadow = '0 0 20px gold';
    }
  });

  /* ===================== PARALLAX ===================== */
  window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('[data-parallax]');
    if (heroSection) {
      const offset = window.scrollY;
      heroSection.style.backgroundPositionY = offset * 0.4 + 'px';
    }
  });

  /* ===================== CONFETTI ===================== */
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const confettiColors = ['#F7C948', '#FFDDE4', '#DFF4FF', '#F5E6D3', '#5B4636'];

  function launchConfetti(count) {
    const pieces = [];
    for (let i = 0; i < count; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20,
        w: 6 + Math.random() * 6,
        h: 10 + Math.random() * 6,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        speedY: 2 + Math.random() * 3,
        speedX: -2 + Math.random() * 4,
        rotation: Math.random() * 360,
        rotationSpeed: -6 + Math.random() * 12
      });
    }
    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let stillAlive = false;
      pieces.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        if (p.y < canvas.height + 20) stillAlive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      frame++;
      if (stillAlive && frame < 400) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    animate();
  }

});
