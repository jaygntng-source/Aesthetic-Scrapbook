/* -------------------------------------------------------------
   premium romantic pinterest scrapbook client runtime architecture
   engineered with performance, state handling & accessibility rules
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // elements registration handles
    const bgMusic = document.getElementById('bgMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const musicProgress = document.getElementById('musicProgress');
    const equalizer = document.getElementById('equalizer');
    const musicPlayer = document.getElementById('musicPlayer');
    const startScrapbookBtn = document.getElementById('startScrapbookBtn');
    const scrapbookContent = document.getElementById('scrapbookContent');
    const scrollProgress = document.getElementById('scrollProgress');
    const currentDateEl = document.getElementById('currentDate');

    // state container variables
    let isMusicPlaying = false;
    let hasUnlockedScrapbook = false;

    // kumpulan narasi personal untuk setiap frame foto memori modal/lightbox
    const photoStories = {
        "photo1.jpg": {
            title: "kala riuh itu reda",
            text: "hari itu semua orang bergerak terburu-buru, tapi fokusku terkunci pada bagaimana caramu tersenyum tipis menatap cangkir kopimu. dunia mendadak hening, dan aku tahu momen ini harus abadi."
        },
        "photo2.jpg": {
            title: "jeda yang menenangkan",
            text: "tidak ada yang istimewa dari sore itu sampai kita memutuskan berhenti berjalan dan membicarakan banyak hal acak. bersamamu, waktu tunggu tidak pernah terasa melelahkan."
        },
        "photo3.jpg": {
            title: "sudut paling tenang",
            text: "kamu selalu punya cara tersendiri untuk menyederhanakan isi kepalaku yang rumit. cukup dengan tatapan tenangmu, semua gemuruh di luar sana menguap begitu saja."
        },
        "photo4.jpg": {
            title: "bahagia yang sederhana",
            text: "kita seringkali tertawa untuk hal-hal yang paling tidak penting bagi orang lain. tapi di situlah letak mahalnya—kenyamanan tulus yang tidak bisa direkayasa oleh apa pun."
        },
        "photo5.jpg": {
            title: "langkah yang selaras",
            text: "menyusuri jalanan kecil ini bersamamu membuatku sadar bahwa perjalanan sejauh apa pun akan terasa menyenangkan jika langkah kakiku mengalir searah dengan langkahmu."
        }
    };

    // render native contextual localized month/year dynamic header stamp
    const updateScrapbookDate = () => {
        const options = { month: 'long', year: 'numeric' };
        const today = new Date();
        if (currentDateEl) {
            currentDateEl.textContent = today.toLocaleDateString('id-ID', options).toLowerCase();
        }
    };
    updateScrapbookDate();

    // structural modular function: initialize music runtime playback
    const initMusicController = () => {
        if (!bgMusic) return;
        
        // standard baseline configuration requirements (40% default audio gain)
        bgMusic.volume = 0.40;

        // event toggle listener block
        playPauseBtn.addEventListener('click', toggleAudioPlayback);

        // progress track pooling updater loop
        bgMusic.addEventListener('timeupdate', () => {
            const currentPercentage = (bgMusic.currentTime / bgMusic.duration) * 100;
            if (musicProgress) {
                musicProgress.style.width = `${currentPercentage}%`;
            }
        });

        // safety handling if audio terminates abruptly or loops cleanly
        bgMusic.addEventListener('play', () => {
            isMusicPlaying = true;
            toggleVisualPlayerState(true);
        });

        bgMusic.addEventListener('pause', () => {
            isMusicPlaying = false;
            toggleVisualPlayerState(false);
        });
    };

    const toggleAudioPlayback = () => {
        if (isMusicPlaying) {
            bgMusic.pause();
        } else {
            bgMusic.play().catch(err => console.log("interaksi pengguna diperlukan sebelum pemutaran: ", err));
        }
    };

    const toggleVisualPlayerState = (isPlaying) => {
        const iconPlay = playPauseBtn.querySelector('.icon-play');
        const iconPause = playPauseBtn.querySelector('.icon-pause');

        if (isPlaying) {
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
            equalizer.classList.add('playing');
            playPauseBtn.setAttribute('aria-label', 'jeda musik');
        } else {
            iconPlay.style.display = 'block';
            iconPause.style.display = 'none';
            equalizer.classList.remove('playing');
            playPauseBtn.setAttribute('aria-label', 'putar musik');
        }
    };

    // inisialisasi interaksi premium galeri foto modal/lightbox
    const initPhotoModal = () => {
        const modal = document.getElementById('photoModal');
        const modalImg = document.getElementById('modalImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalText = document.getElementById('modalText');
        const closeBtn = document.getElementById('modalCloseBtn');
        const overlay = document.getElementById('modalOverlay');
        const polaroids = document.querySelectorAll('.polaroid-frame');

        if (!modal || !modalImg) return;

        polaroids.forEach(polaroid => {
            polaroid.addEventListener('click', () => {
                const imgEl = polaroid.querySelector('img');
                if (!imgEl) return;

                const src = imgEl.getAttribute('src');
                const filename = src.split('/').pop();
                const story = photoStories[filename] || { title: "catatan kecil", text: "sebuah momen indah yang terekam dalam ingatan." };

                // injeksi data konten secara dinamis
                modalImg.setAttribute('src', src);
                modalTitle.textContent = story.title;
                modalText.textContent = story.text;

                // tampilkan modal dengan animasi opacity & scale
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', closeModal);

        // optimasi aksesibilitas tombol escape keyboard untuk menutup layar modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    };

    // main conversion funnel unlock hook logic trigger
    if (startScrapbookBtn) {
        startScrapbookBtn.addEventListener('click', () => {
            hasUnlockedScrapbook = true;
            
            // open section render execution safely
            scrapbookContent.style.display = 'block';
            
            // smooth fluid transition to the welcome envelope container viewport block
            setTimeout(() => {
                const targetSection = document.getElementById('welcome-letter');
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
                
                // fallback safety runtime trigger to auto activate audio streams contextually 
                if (!isMusicPlaying) {
                    toggleAudioPlayback();
                }
                
                // begin delayed execution of text processing loops dynamically after container view settles
                triggerIntersectionTracking();
            }, 150);
        });
    }

    // scroll processing layout progress mechanics
    window.addEventListener('scroll', () => {
        if (!hasUnlockedScrapbook) return;

        const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScrollHeight > 0) {
            const currentPosition = (window.scrollY / totalScrollHeight) * 100;
            if (scrollProgress) {
                scrollProgress.style.width = `${currentPosition}%`;
            }
        }
    });

    // modular progressive text letter element processor simulation
    const runTypingAnimation = (paragraphElement) => {
        if (paragraphElement.classList.contains('processed')) return;
        
        const contentText = paragraphElement.getAttribute('data-text');
        paragraphElement.textContent = '';
        paragraphElement.classList.add('processed');

        let charIndex = 0;
        const typingSpeedMs = 35; // optimal responsive text printing cadence delay value

        function appendCharacter() {
            if (charIndex < contentText.length) {
                paragraphElement.textContent += contentText.charAt(charIndex);
                charIndex++;
                setTimeout(appendCharacter, typingSpeedMs);
            }
        }
        appendCharacter();
    };

    // intersection monitoring logic mapping
    const triggerIntersectionTracking = () => {
        const structuralElements = document.querySelectorAll('.reveal-on-scroll');
        const paragraphTextElements = document.querySelectorAll('.typing-text');

        // primary visual element structural reveal configurations
        const structureObserver = new IntersectionObserver((observedEntries) => {
            observedEntries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    structureObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.12, // reliable viewport percentage coverage entry trigger values
            rootMargin: '0px 0px -40px 0px'
        });

        structuralElements.forEach(element => structureObserver.observe(element));

        // specialized observer subsystem dedicated for starting handwriting simulations
        const writingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // initiate sequential or immediate typing processing pipelines
                    setTimeout(() => {
                        runTypingAnimation(entry.target);
                    }, entry.target.classList.contains('delay-1') ? 1200 : 200);
                    
                    writingObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1
        });

        paragraphTextElements.forEach(p => writingObserver.observe(p));
    };

    // instantiate baseline operational parameters on DOM lifecycle load complete
    initMusicController();
    initPhotoModal();
});