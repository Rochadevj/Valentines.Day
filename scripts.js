document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('audio-player');
    const playButton = document.querySelector('.play-button');
    const currentTimeElem = document.querySelector('.current-time');
    const totalTimeElem = document.querySelector('.total-time');
    const seekBar = document.querySelector('.seek-bar');
    const volumeButton = document.querySelector('.volume-button');
    const volumeBar = document.querySelector('.volume-bar');
    const icon = playButton.querySelector('.icon');
    const volumeIcon = volumeButton.querySelector('.icon');

    playButton.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            icon.textContent = '⏸️';
        } else {
            audio.pause();
            icon.textContent = '▶️';
        }
    });

    audio.addEventListener('loadedmetadata', function () {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        totalTimeElem.textContent = formattedTime;
    });

    audio.addEventListener('timeupdate', function () {
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        currentTimeElem.textContent = formattedTime;
        seekBar.value = (audio.currentTime / audio.duration) * 100;
    });

    seekBar.addEventListener('input', function () {
        const seekTime = (seekBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    volumeButton.addEventListener('click', function () {
        audio.muted = !audio.muted;
        volumeIcon.textContent = audio.muted ? '🔇' : '🔊';
    });

    volumeBar.addEventListener('input', function () {
        audio.volume = volumeBar.value;
    });
});

const volumeBar = document.querySelector('.volume-bar');
const volumeIcon = document.getElementById('volume-icon');

volumeBar.addEventListener('input', function() {
    let volume = parseFloat(this.value);
    document.getElementById('audio-player').volume = volume;
});

volumeBar.addEventListener('change', function() {
    let volume = parseFloat(this.value);
    updateVolumeIcon(volume);
});

function updateVolumeIcon(volume) {
    if (volume === 0) {
        volumeIcon.textContent = '🔇'; 
    } else if (volume > 0 && volume <= 0.3) {
        volumeIcon.textContent = '🔈'; 
    } else if (volume > 0.3 && volume <= 0.6) {
        volumeIcon.textContent = '🔉'; 
    } else {
        volumeIcon.textContent = '🔊';
    }
}

document.querySelector('.toggle-dark-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

