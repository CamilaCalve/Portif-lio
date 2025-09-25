// 1. Seleciona os elementos do HTML
const video = document.getElementById('meuVideo');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressoBarra = document.getElementById('progressoBarra');
const volumeBarra = document.getElementById('volumeBarra');
const tempoAtual = document.getElementById('tempoAtual');
const duracaoTotal = document.getElementById('duracaoTotal');
const muteBtn = document.getElementById('muteBtn');

// Função auxiliar para formatar o tempo (segundos para M:SS)
function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60).toString().padStart(2, '0');
    return `${min}:${seg}`;
}

// Lógica de Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (video.paused || video.ended) {
        video.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        video.pause();
        playPauseBtn.textContent = 'Play';
    }
});

// Atualiza a Duração Total (carregamento da mídia)
video.addEventListener('loadedmetadata', () => {
    duracaoTotal.textContent = formatarTempo(video.duration);
    progressoBarra.max = video.duration; // Define o máximo da barra de progresso
});

// Atualiza a Barra de Progresso e o Tempo (durante a reprodução)
video.addEventListener('timeupdate', () => {
    progressoBarra.value = video.currentTime;
    tempoAtual.textContent = formatarTempo(video.currentTime);
});

// Permite o usuário "pular" para um ponto na barra de progresso
progressoBarra.addEventListener('input', () => {
    video.currentTime = progressoBarra.value;
});

// Lógica do Volume
volumeBarra.addEventListener('input', () => {
    video.volume = volumeBarra.value;
    muteBtn.textContent = video.volume == 0 ? 'Muted' : 'Volume';
});

// Lógica do Mute
muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? 'Muted' : 'Volume';
    volumeBarra.value = video.muted ? 0 : 1; // Ajusta a barra visualmente
});