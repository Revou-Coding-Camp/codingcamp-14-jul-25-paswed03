document.addEventListener('DOMContentLoaded', function() {
    // --- Fungsionalitas Halaman Beranda ---

    // 1. Ucapan Selamat Datang Dinamis
    const userNameSpan = document.getElementById('userName');
    if (userNameSpan) { 
        const fixedUserName = "My Name I Gede Pasek Wedana";
        let i = 0;
        userNameSpan.textContent = "";
        function typeWriter() {
            if (i < fixedUserName.length) {
                userNameSpan.textContent += fixedUserName.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        typeWriter();
    }

    // 2. Validasi Formulir "Message Us" & Tampilkan Nilai
    const messageForm = document.getElementById('messageForm');
    if (messageForm) { // Pastikan elemen ada di halaman ini (index.html)
        const currentTimeSpan = document.getElementById('currentTime');
        const displayNama = document.getElementById('displayNama');
        const displayTanggalLahir = document.getElementById('displayTanggalLahir');
        const displayJenisKelamin = document.getElementById('displayJenisKelamin');
        const displayPesan = document.getElementById('displayPesan');
        const pesanInput = document.getElementById('pesan');
        const pesanError = document.getElementById('pesanError');

        /**
         * Memperbarui waktu saat ini yang ditampilkan di halaman.
         */
        function updateCurrentTime() {
            const now = new Date();
            currentTimeSpan.textContent = now.toString();
        }

        // Set waktu saat ini saat halaman dimuat
        updateCurrentTime();

        // Tambahkan event listener untuk pengiriman formulir
        messageForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah perilaku default pengiriman formulir (memuat ulang halaman)

            // Validasi sederhana: pastikan field pesan tidak kosong
            if (pesanInput.value.trim() === '') {
                pesanError.classList.remove('hidden'); // Tampilkan pesan error
                return; // Hentikan proses jika validasi gagal
            } else {
                pesanError.classList.add('hidden'); // Sembunyikan pesan error jika validasi berhasil
            }

            // Ambil nilai dari input formulir
            const nama = document.getElementById('nama').value;
            const tanggalLahir = document.getElementById('tanggalLahir').value;
            // Ambil nilai dari radio button yang terpilih untuk 'Jenis Kelamin'
            const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked').value;
            const pesan = pesanInput.value;

            // Format tanggal lahir dari YYYY-MM-DD menjadi DD/MM/YYYY
            let formattedTanggalLahir = '';
            if (tanggalLahir) {
                const dateParts = tanggalLahir.split('-'); // Pisahkan string tanggal berdasarkan tanda hubung (misalnya, ["2023", "04", "02"])
                if (dateParts.length === 3) {
                    // Susun ulang bagian-bagian ke format DD/MM/YYYY
                    formattedTanggalLahir = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
                }
            }

            // Perbarui konten bagian tampilan dengan data yang dikirimkan
            // Jika bidang input kosong, tampilkan pesan default "Tidak diisi"
            displayNama.textContent = nama || 'Tidak diisi';
            displayTanggalLahir.textContent = formattedTanggalLahir || 'Tidak diisi';
            displayJenisKelamin.textContent = jenisKelamin || 'Tidak diisi';
            displayPesan.textContent = pesan || 'Tidak diisi';

            // Perbarui waktu saat ini untuk mencerminkan waktu pengiriman
            updateCurrentTime();
        });
    }

    // --- Fungsionalitas Navigasi Aktif ---
    const sections = document.querySelectorAll('main section[id]'); // Ambil semua section yang memiliki ID
    const navLinks = document.querySelectorAll('nav ul li a'); // Ambil semua tautan navigasi

    // Fungsi untuk menyorot tautan navigasi yang aktif
    function highlightActiveNavLink() {
        let currentActive = '';

        // Iterasi mundur untuk menemukan section yang paling dekat dengan bagian atas viewport
        // Offset 100px untuk memperhitungkan tinggi header tetap
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            // GetBoundingClientRect().top memberikan posisi relatif elemen terhadap viewport
            // Jika bagian atas section kurang dari atau sama dengan 100px (offset untuk header tetap)
            if (section.getBoundingClientRect().top <= 100) {
                currentActive = section.getAttribute('id');
                break;
            }
        }

        // Hapus kelas 'active-nav-link' dari semua tautan
        navLinks.forEach(link => {
            link.classList.remove('active-nav-link');
        });

        // Tambahkan kelas 'active-nav-link' ke tautan yang sesuai
        if (currentActive) {
            const activeLink = document.querySelector(`nav ul li a[href="#${currentActive}"]`);
            if (activeLink) {
                activeLink.classList.add('active-nav-link');
            }
        }
    }

    // Tambahkan event listener untuk peristiwa gulir
    window.addEventListener('scroll', highlightActiveNavLink);

    // Panggil fungsi saat halaman pertama kali dimuat untuk mengatur status aktif awal
    highlightActiveNavLink();
});
