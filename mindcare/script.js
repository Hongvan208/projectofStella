// ================== NĂM ==================
document.getElementById('year').textContent = new Date().getFullYear();


// ================== TRẮC NGHIỆM ==================
if (document.getElementById('test-root')) {
  const qs = [
    { q: 'Hôm nay bạn có cảm thấy căng thẳng?', opts: ['Không', 'Hơi', 'Khá', 'Rất nhiều'] },
    { q: 'Bạn ngủ đủ giấc gần đây?', opts: ['Có', 'Thỉnh thoảng', 'Hiếm khi', 'Không'] },
    { q: 'Bạn có ai để tâm sự khi buồn?', opts: ['Có', 'Một vài người', 'Khó nói', 'Không'] }
  ];

  let idx = 0; const state = [];
  const root = document.getElementById('test-root');

  function render() {
    if (idx < qs.length) {
      root.innerHTML = `
        <div class="card">
          <h3>${qs[idx].q}</h3>
          ${qs[idx].opts.map((o, i) => `<button class="btn opt" data-i="${i}">${o}</button>`).join('')}
        </div>`;
      root.querySelectorAll('.opt').forEach(b =>
        b.addEventListener('click', e => {
          state.push(e.target.dataset.i);
          idx++;
          render();
        })
      );
    } else {
      const score = state.reduce((s, v) => s + Number(v), 0);
      const mood = score <= 2 ? 'Tốt' : score <= 5 ? 'Cần chú ý' : 'Cần hỗ trợ';
      root.innerHTML = `
        <div class='card'>
          <h3>Kết quả: ${mood}</h3>
          <p>Gợi ý: ${
            mood === 'Tốt' ? 'Giữ thói quen tốt nhé!' :
            mood === 'Cần chú ý' ? 'Thử hít thở sâu hoặc nghe nhạc nhẹ.' :
            'Nói chuyện với người mà bạn tin tưởng.'
          }</p>
        </div>`;
    }
  }
  render();
}


// ================== THƯ GIÃN ==================
if (document.getElementById('breath-btn')) {
  const circle = document.getElementById('breath-circle');
  let breathing = false;
  document.getElementById('breath-btn').addEventListener('click', () => {
    breathing = !breathing;
    circle.style.transform = breathing ? 'scale(1.4)' : 'scale(1)';
  });
}


// ================== PHÁT NHẠC ==================
if (document.getElementById('music-btn')) {
  const musicUrl = 'https://cdn.pixabay.com/download/audio/2022/03/14/audio_d37e30c8f7.mp3?filename=calm-meditation-112191.mp3';
  const aud = new Audio(musicUrl);
  aud.volume = 0.6; // âm lượng nhẹ
  aud.loop = true;
  let playing = false;

  document.getElementById('music-btn').addEventListener('click', () => {
    if (!playing) {
      aud.play().catch(err => {
        alert("Trình duyệt cần bạn cho phép phát nhạc. Hãy click lại nút nhé 🎧");
      });
    } else {
      aud.pause();
    }
    playing = !playing;
    document.getElementById('music-btn').textContent = playing ? '⏸ Dừng nhạc' : '🎵 Phát nhạc';
  });
}
