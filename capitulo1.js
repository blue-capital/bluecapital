document.addEventListener('DOMContentLoaded', () => {

    // Dicionário de traduções de texto (como antes)
    const translations = {
        br: {
            title: "Capítulo 1",
            description: "Escolha o idioma de sua preferência para assistir ao primeiro capítulo do video book."
        },
        en: {
            title: "Chapter 1",
            description: "Choose your preferred language to watch the first chapter of the video book."
        },
        es: {
            title: "Capítulo 1",
            description: "Elija su idioma preferido para ver el primer capítulo del video libro."
        },
        ch: {
            title: "第1章",
            description: "请选择您喜欢的语言来观看视频书的第一章。"
        }
    };

    // NOVO: Dicionário para os IDs dos vídeos do YouTube
    // (Apenas o ID, não o link completo)
    const videoIds = {
        br: "99qlKNdHPTw",
        en: "woiX5_eyHNc",
        es: "k6yCV-gRpzU",
        ch: "7xumhYFp2Q0"
    };

    // Seleciona os elementos da página
    const langButtons = document.querySelectorAll('.lang-switch-btn');
    const videoWrapper = document.getElementById('video-player-wrapper'); // Onde o vídeo vai entrar
    const elementsToTranslate = document.querySelectorAll('[data-key]');
    
    let currentLang = 'br';

    // Função para trocar o idioma
    function switchLanguage(langCode) {
        currentLang = langCode;

        // Atualiza os botões
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === langCode);
        });

        // Atualiza os textos
        const langPack = translations[langCode];
        elementsToTranslate.forEach(element => {
            const key = element.dataset.key;
            element.textContent = langPack[key];
        });

        // MUDANÇA PRINCIPAL: Atualiza o player de vídeo do YouTube
        const videoId = videoIds[langCode];
        
        // Constrói o HTML do novo iframe
        // Usamos ?autoplay=1 para o vídeo tentar tocar sozinho
        // e rel=0 para não mostrar vídeos relacionados no final
        const iframeHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0" 
                frameborder="0" 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
                allowfullscreen>
            </iframe>`;
        
        // Substitui o conteúdo do wrapper pelo novo iframe
        videoWrapper.innerHTML = iframeHTML;
    }

    // Adiciona o 'clique' em cada botão de idioma
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchLanguage(button.dataset.lang);
        });
    });

    // Inicia a página com o idioma e vídeo corretos (Português)
    switchLanguage('br');
});