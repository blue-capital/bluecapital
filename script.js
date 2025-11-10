// =========================================================================
// SCRIPT.JS COMPLETO E UNIFICADO PARA BLUE CAPITAL
// =========================================================================

// Envolvemos TODO o código em um único "ouvinte" para garantir que o HTML
// esteja totalmente carregado antes de qualquer script ser executado.
document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // BLOCO 1: LÓGICA DA CONTAGEM REGRESSIVA (HERO)
    // =======================================================
    const launchDate = new Date('2026-01-09T00:00:00').getTime();
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = launchDate - now;
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = "<h2>Lançamento Oficial!</h2>";
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }, 1000);

    // =======================================================
    // BLOCO 2: LÓGICA DO CONTADOR DE DOWNLOADS DINÂMICO
    // =======================================================
    const updateDownloadCounter = () => {
        const startDate = new Date('2025-10-10T00:00:00').getTime();
        const endDate = new Date('2026-01-09T00:00:00').getTime();
        const startDownloads = 30;
        const endDownloads = 800;
        const now = new Date().getTime();
        if (now < startDate) { document.getElementById('downloads').innerText = startDownloads.toLocaleString('pt-BR'); return; }
        if (now > endDate) { document.getElementById('downloads').innerText = endDownloads.toLocaleString('pt-BR'); return; }
        const progress = (now - startDate) / (endDate - startDate);
        const currentDownloads = Math.floor(startDownloads + ((endDownloads - startDownloads) * progress));
        document.getElementById('downloads').innerText = currentDownloads.toLocaleString('pt-BR');
    };
    setInterval(updateDownloadCounter, 3000);
    updateDownloadCounter();

    // =======================================================
    // BLOCO 3: LÓGICA DO SELETOR DE IDIOMA (HEADER)
    // =======================================================
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    if (langBtn) {
        langBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            langDropdown.classList.toggle('show');
        });
        window.addEventListener('click', () => {
            if (langDropdown.classList.contains('show')) {
                langDropdown.classList.remove('show');
            }
        });
    }

    // =======================================================
    // BLOCO 3.5: LÓGICA DO MENU HAMBURGER
    // =======================================================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainMenu = document.getElementById('main-menu');
    const menuLinks = mainMenu.querySelectorAll('a');

    if (hamburgerBtn && mainMenu) {
        // Abre e fecha o menu ao clicar no botão
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            mainMenu.classList.toggle('open');
        });

        // Fecha o menu ao clicar em um dos links (para navegação na mesma página)
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainMenu.classList.contains('open')) {
                    hamburgerBtn.classList.remove('active');
                    mainMenu.classList.remove('open');
                }
            });
        });
    }

    // =======================================================
    // BLOCO 4: LÓGICA DO OVERLAY DO FORMULÁRIO (COM TIMER)
    // =======================================================
    const ctaButton = document.querySelector('.cta-button');
    const formOverlay = document.getElementById('form-overlay');
    const closeBtn = document.getElementById('close-btn');
    const previewSection = document.getElementById('preview-section');
    const closeTimerSpan = document.querySelector('#close-btn .timer');
    let canCloseOverlay = false;
    let overlayCountdownInterval;
    const scrollToPreview = () => { previewSection.scrollIntoView({ behavior: 'smooth' }); };
    const openOverlayAndStartTimer = (event) => {
        event.preventDefault();
        formOverlay.classList.add('active');
        canCloseOverlay = false;
        closeBtn.classList.remove('enabled');
        closeBtn.classList.add('disabled');
        let seconds = 10;
        closeTimerSpan.innerText = seconds;
        clearInterval(overlayCountdownInterval);
        overlayCountdownInterval = setInterval(() => {
            seconds--;
            closeTimerSpan.innerText = seconds;
            if (seconds <= 0) {
                clearInterval(overlayCountdownInterval);
                canCloseOverlay = true;
                closeBtn.classList.remove('disabled');
                closeBtn.classList.add('enabled');
                closeBtn.title = "Fechar";
            }
        }, 1000);
    };
    const closeRevealAndScroll = () => {
        if (!canCloseOverlay) return;
        formOverlay.classList.remove('active');
        previewSection.classList.add('visible');
        setTimeout(scrollToPreview, 300);
    };
    ctaButton.addEventListener('click', openOverlayAndStartTimer);
    closeBtn.addEventListener('click', closeRevealAndScroll);
    formOverlay.addEventListener('click', (event) => { if (event.target === formOverlay) { closeRevealAndScroll(); } });
    window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && formOverlay.classList.contains('active')) { closeRevealAndScroll(); } });

    // =======================================================
    // BLOCO 5, 6, 7: ANIMAÇÕES VARIADAS
    // =======================================================
    document.querySelectorAll('.map-point').forEach(el => el.style.animationDelay = `${Math.random() * 2}s`);
    document.querySelectorAll('.info-bubble').forEach(el => el.style.animationDelay = `${Math.random() * 5}s`);
    // document.querySelectorAll('.gallery-item').forEach(el => el.style.animationDelay = `${Math.random() * 6}s`);
// =======================================================
    // BLOCO 7 (NOVO): SLIDER DE IMAGENS DO LIVRO
    // =======================================================
    const livroSwiperContainer = document.querySelector('.livro-swiper');
    if (livroSwiperContainer) {
        const livroSwiper = new Swiper('.livro-swiper', {
            // Efeito de transição suave
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            
            // Navegação infinita
            loop: true,
            
            // Autoplay para o slider se mover sozinho
            autoplay: {
                delay: 4000, // 4 segundos entre slides
                disableOnInteraction: false, // Não para o autoplay se o usuário interagir
            },

            // Paginação (bolinhas)
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            // Setas de Navegação
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
   // =======================================================
// BLOCO 8: PLAYER DE AUDIOBOOK (ATUALIZADO COM YOUTUBE)
// =======================================================
const audiobookSection = document.getElementById('audiobook-section');
if (audiobookSection) {
    
    // Dicionário com todas as traduções de TEXTO
    const translations = {
         br: { audiobookSubTitle: "Introdução Sonora", audiobookTitle: "Ouça o início da jornada", audiobookDescription: "Mergulhe na atmosfera de 'Blue Capital' com os capítulos introdutórios narrados. Sinta a maré da história antes mesmo de virar a primeira página.", intro1: "Apresentação do livro", intro2: "Apresentação dos Capítulos", intro3: "Corrente de oportunidades", intro4: "A introdução do livro", ctaButton: "Escutar o primeiro capítulo", },
        en: { audiobookSubTitle: "Sound Introduction", audiobookTitle: "Listen to the journey's beginning", audiobookDescription: "Immerse yourself in the atmosphere of 'Blue Capital' with the narrated introductory chapters. Feel the tide of the story before even turning the first page.", intro1: "Book presentation", intro2: "Presentation of Chapters", intro3: "Chain of opportunities", intro4: "The introduction of the book", ctaButton: "Listen to the first chapter", },
        es: { audiobookSubTitle: "Introducción Sonora", audiobookTitle: "Escucha el comienzo del viaje", audiobookDescription: "Sumérgete en la atmósfera de 'Blue Capital' con los capítulos introductorios narrados. Siente la marea de la historia incluso antes de pasar la primera página.", intro1: "Presentación del libro", intro2: "Presentación de Capítulos", intro3: "Cadena de oportunidades", intro4: "La introducción del libro", ctaButton: "Escuchar el primer capítulo", },
        ch: { audiobookSubTitle: "声音介绍", audiobookTitle: "聆听旅程的开始", audiobookDescription: "沉浸在《蓝色资本》的氛围中，聆听叙述的介绍性章节。在翻开第一页之前，感受故事的潮流。", intro1: "书籍介绍", intro2: "章节介绍", intro3: "机会链", intro4: "本书简介", ctaButton: "收听第一章", }
   };

    // NOVO: Dicionário com os IDs dos vídeos do YouTube
    // Estrutura: [intro1, intro2, intro3]
    const introVideoIds = {
        br: ["f3kWbhhF2O4", "SA5zZhkf90k", "oWARfMASSlY"],
        en: ["T51bKsl3mSQ", "fsO0BWSjtls", "5J0qqMsaoog"],
        es: ["Cmf9UIjGDgc", "cEpoM0e4R90", "1hYtGQGxU84"],
        ch: ["lD4P2_fNxeA", "1e-piSPhL28", "_oaQx0oQWdg"]
    };

    // Selecionando os elementos
    const langButtons_audiobook = audiobookSection.querySelectorAll('#language-switcher .lang-switch-btn');
    const introNavButtons = audiobookSection.querySelectorAll('#intro-nav .intro-nav-btn');
    const videoWrapper = audiobookSection.querySelector('#intro-video-wrapper');
    const elementsToTranslate = audiobookSection.querySelectorAll('[data-key]');
    
    let currentLang = 'br';
    let currentIndex = 1; // Agora é um número, começando em 1

    // Função para atualizar todos os textos
    function updateTexts() {
        const langPack = translations[currentLang];
        elementsToTranslate.forEach(element => {
            const key = element.dataset.key;
            if (langPack[key]) {
                if (key === 'ctaButton') {
                    const mainLangSpan = element.querySelector('.main-lang');
                    const subLangSpan = element.querySelector('.sub-lang');
                    mainLangSpan.textContent = langPack[key];
                    subLangSpan.textContent = (currentLang !== 'br') ? translations.br[key] : "";
                } else {
                    element.textContent = langPack[key];
                }
            }
        });
    }

    // Função para atualizar o vídeo
    function updateVideo() {
        // Pega o ID do vídeo certo (índice do array é N-1)
        const videoId = introVideoIds[currentLang][currentIndex - 1];
        
        // Constrói o HTML do iframe
        const iframeHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0" 
                frameborder="0" 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
                allowfullscreen>
            </iframe>`;
        
        // Insere o iframe no wrapper
        videoWrapper.innerHTML = iframeHTML;
    }

    // Event Listeners para os botões de idioma
    langButtons_audiobook.forEach(button => {
        button.addEventListener('click', () => {
            currentLang = button.dataset.lang;
            langButtons_audiobook.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateTexts();
            updateVideo(); // Troca o vídeo para o novo idioma
        });
    });

    // Event Listeners para as abas de introdução
    introNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentIndex = parseInt(button.dataset.index); // Converte "1", "2", "3" para número
            introNavButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateVideo(); // Troca o vídeo para a nova intro
        });
    });
    
    // Inicialização
    updateTexts(); // Carrega os textos corretos
    updateVideo(); // Carrega o primeiro vídeo (Intro 1, PT-BR)
}
});