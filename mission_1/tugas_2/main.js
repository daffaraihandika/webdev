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

const instructors = [
    {
        name: "Muhammad Daffa Raihandika",
        description: "Mahasiswa aktif semester 5 D4 Teknik Informatika Politeknik Negeri Bandung. Memiliki passion yang besar di bidang teknologi dan suka eksplor akan hal baru yang belum diketahui.",
        picture: "assets/img/daffa.png",
    },
    {
        name: "Mochamad Ferdy Fauzan",
        description: "Seorang Kapten yang memiliki jiwa kepemimpinan sangat baik, memiliki ribuan anak buah yang biasa disebut sebagai keroco. Para keroco tersebut harus mematuhi apapun perintah Kaptennnya.",
        picture: "assets/img/ferdy.png",
    },
    {
        name: "Raka Mahardika Maulana",
        description: "Seorang raja atau biasa disebut King yang memiliki jiwa ksatria sangat tangguh. Meskipun memiliki gelar tersebut, Dia tetaplah anak buah dari Capt. Ferdy dan harus mematuhi apapun perintahnya.",
        picture: "assets/img/raka.png",
    },
    {
        name: "Reza Ananta Permadi",
        description: "Anak buah dari Capt. Ferdy yang tidak pernah membuat kapten marah karena selalu menuruti apapun perintahnya.",
        picture: "assets/img/reza.png",
    },
    {
        name: "Andre Lutfiansyah",
        description: "Anak buah dari Capt. Ferdy yang selalu membuat kapten marah karena kelalaiannya tidak mematuhi perintah kapten, tetapi karena memiliki jiwa tanggung jawab yang besar dia selalu mencoba menjadi mood booster agar kapten kembali senang.",
        picture: "assets/img/andre.png",
    },
    {
        name: "Egi Satria Darma",
        description: "Anak buah dari Capt. Ferdy yang selalu membuat kapten kesal karena selalu ngantuk dan ketiduran, tetapi dia selalu membuat kapten bangga karena prestasinya menjadi pembalap motor vario.",
        picture: "assets/img/egi.jpg",
    },
    {
        name: "Gian Sandrova",
        description: "Anak buah dari Capt. Ferdy yang berasal dari Payakumbuh, pergi ke Bandung selain untuk mencari ilmu yaitu untuk mengabdi kepada kapten.",
        picture: "assets/img/gian.png",
    },
    {
        name: "Rofa'ul Akrom Hendrawan",
        description: "Anak buah dari Capt. Ferdy yang tidak pernah membuat kapten marah karena selalu mematuhi perintahnya.",
        picture: "assets/img/faul.jpg",
    },
    {
        name: "Aini Diah Rahmawati",
        description: "Anak buah dari Capt. Ferdy yang terkadang membuat kapten marah karena suka meledek kapten yang sebenarnya untuk menguji kesabaran dari kapten",
        picture: "assets/img/ai.jpg",
    },
    {
        name: "Novia Nur Azizah",
        description: "Anak buah dari Capt. Ferdy yang terkadang membuat kapten marah karena suka meledek kapten yang sebenarnya untuk menguji kesabaran dari kapten",
        picture: "assets/img/novi.jpg",
    },
    {
        name: "Ghessa Theniana",
        description: "Anak buah dari Capt. Ferdy yang tidak pernah membuat kapten marah karena selalu menuruti apapun perintahnya.",
        picture: "assets/img/eca.jpg",
    },
    {
        name: "Reka Briyan",
        description: "Anak buah dari Capt. Ferdy yang baru saja bergabung",
        picture: "assets/img/reka.png",
    },
];

const container = document.getElementById('instructorsContainer');

instructors.forEach(instructor => {
    const instructorCard = document.createElement('div');
    instructorCard.classList.add('col-lg-6', 'mb-4');

    instructorCard.innerHTML = `
        <div class="row cards">
            <div class="col-lg-3 picture"><img src="${instructor.picture}" alt=""></div>
            <div class="col-md-9">
                <div class="row name">${instructor.name}</div>
                <div class="row description">${instructor.description}</div>
            </div>
        </div>
    `;

    container.appendChild(instructorCard);
});
