function updateText() {
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    var lessonsText = document.getElementById("lessonsText");

    if (viewportWidth < 485) {
        lessonsText.textContent = 'Lessons';
    } else {
        lessonsText.textContent = 'View all lessons';
    }
}

// Panggil fungsi saat halaman dimuat
updateText();

// Panggil fungsi saat ukuran jendela berubah
window.addEventListener('resize', updateText);
