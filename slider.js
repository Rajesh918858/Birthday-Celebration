document.addEventListener('DOMContentLoaded', function() {
    
    /* --- 1. Image Slider Logic --- */
    const images = [
        { src: 'satish1.jpg', alt: 'Memory 1' },
        { src: 'satish2.jpg', alt: 'Memory 2' },
        { src: 'satish3.jpg', alt: 'Memory 3' }, // Fixed typo from 'satsih3'
      //  { src: 'satish4.jpg', alt: 'Memory 4' }
    ];
    let currentIndex = 0;
    const galleryImage = document.getElementById('galleryImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function showImage(index) {
        // Simple fade effect
        galleryImage.style.opacity = 0;
        setTimeout(() => {
            galleryImage.src = images[index].src;
            galleryImage.alt = images[index].alt;
            galleryImage.style.opacity = 1;
        }, 200);
    }

    if(prevBtn && nextBtn) {
        prevBtn.onclick = function() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        };
        nextBtn.onclick = function() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        };
        // Initialize
        showImage(currentIndex);
    }

    /* --- 2. Typewriter Effect --- */
    const text = "🎉 Happy Birthday Satish!";
    const typewriterElement = document.getElementById('typewriter');
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typewriterElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100); // Speed of typing
        }
    }
    // Start typing
    typeWriter();

    /* --- 3. Confetti & Surprise Button --- */
    const surpriseBtn = document.getElementById('surpriseBtn');
    
    function fireConfetti() {
        var duration = 3 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        var random = function(min, max) { return Math.random() * (max - min) + min; }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    surpriseBtn.addEventListener('click', () => {
        fireConfetti();
        // Also scroll to about section smoothly
        document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
        // Auto play music if not playing
        const music = document.getElementById('bgMusic');
        if(music.paused) {
            music.play();
            updateMusicIcon(true);
        }
    });

    /* --- 4. Music Player Toggle --- */
    const musicBtn = document.getElementById('musicBtn');
    const music = document.getElementById('bgMusic');
    let isPlaying = false;

    function updateMusicIcon(playing) {
        if(playing) {
            musicBtn.innerHTML = '<i class="fas fa-pause"></i> <span>Pause Music</span>';
            musicBtn.style.borderColor = '#ff0077';
        } else {
            musicBtn.innerHTML = '<i class="fas fa-play"></i> <span>Play Music</span>';
            musicBtn.style.borderColor = 'rgba(255,255,255,0.2)';
        }
        isPlaying = playing;
    }

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            updateMusicIcon(false);
        } else {
            music.play();
            updateMusicIcon(true);
        }
    });

    /* --- 5. Wish Form Simulation --- */
    window.sendMessage = function() {
        const name = document.getElementById('senderName').value;
        const msg = document.getElementById('senderMsg').value;

        if(name && msg) {
            alert(`Thanks ${name}! Your wish has been sent to Satish virtually! 📨`);
            fireConfetti(); // Fire confetti on send
            document.getElementById('senderName').value = '';
            document.getElementById('senderMsg').value = '';
        } else {
            alert('Please fill in both fields!');
        }
    };
});