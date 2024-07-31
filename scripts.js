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
