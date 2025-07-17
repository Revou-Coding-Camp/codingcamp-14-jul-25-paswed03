document.addEventListener('DOMContentLoaded', function() {
    // 4. Ucapan selamat datang di Halaman Beranda "Hi Name" menggunakan JavaScript
    const welcomeMessageElement = document.getElementById('welcomeMessage');
    if (welcomeMessageElement) {
        let userName = localStorage.getItem('userName'); // Coba ambil nama dari localStorage

        if (!userName) {
            // Jika nama belum ada, minta pengguna untuk memasukkannya
            userName = prompt("Selamat datang! Silakan masukkan nama Anda:");
            if (userName) {
                localStorage.setItem('userName', userName); // Simpan nama di localStorage
            } else {
                userName = "Pengunjung"; // Nama default jika pengguna tidak memasukkan apa-apa
            }
        }
        welcomeMessageElement.textContent = `Hi ${userName}, Selamat Datang di Website`;
    }

    // 5. Validasi Formulir "Message Us" & tampilkan nilai saat mengirimkan formulir pada HTML dengan JavaScript
    const messageForm = document.getElementById('messageForm');
    const outputName = document.getElementById('outputName');
    const outputBirthdate = document.getElementById('outputBirthdate');
    const outputGender = document.getElementById('outputGender');
    const outputMessage = document.getElementById('outputMessage');
    const currentTimeDisplay = document.getElementById('currentTimeDisplay');
    const submissionOutput = document.querySelector('.submission-output'); // Area untuk pesan feedback

    // Mengatur waktu saat ini pada tampilan awal
    updateCurrentTime();
    // Memperbarui waktu setiap detik
    setInterval(updateCurrentTime, 1000);

    function updateCurrentTime() {
        const now = new Date();
        // Opsi format tanggal dan waktu agar sesuai dengan mockup
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        // Menggunakan 'en-GB' untuk format yang mirip dengan mockup (misal: Thu, Jul 17, 2025 18:23:00 GMT+07:00)
        currentTimeDisplay.textContent = now.toLocaleString('en-GB', options);
    }

    // Fungsi untuk menampilkan pesan error atau sukses
    function displayFeedbackMessage(message, type) {
        // Hapus pesan sebelumnya
        const existingError = submissionOutput.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        const existingSuccess = submissionOutput.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }

        const feedbackMessage = document.createElement('p');
        feedbackMessage.textContent = message;
        feedbackMessage.classList.add(type === 'error' ? 'error-message' : 'success-message');
        feedbackMessage.style.color = type === 'error' ? 'red' : 'green';
        submissionOutput.prepend(feedbackMessage); // Tampilkan pesan di atas detail submission
    }

    if (messageForm) {
        messageForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah pengiriman formulir default

            // Mengambil nilai dari input formulir
            const name = document.getElementById('name').value.trim(); // Gunakan .trim() untuk menghapus spasi
            const birthdate = document.getElementById('birthdate').value;
            const gender = document.querySelector('input[name="gender"]:checked');
            const message = document.getElementById('message').value.trim();

            // Validasi yang lebih spesifik
            if (name.length < 3) {
                displayFeedbackMessage('Error: Nama harus diisi dan minimal 3 karakter!', 'error');
                return;
            }

            // Validasi tanggal lahir
            if (!birthdate) {
                displayFeedbackMessage('Error: Tanggal Lahir harus diisi!', 'error');
                return;
            }
            const dateParts = birthdate.split('-'); // Asumsi format YYYY-MM-DD
            const inputDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
            if (isNaN(inputDate.getTime())) {
                displayFeedbackMessage('Error: Format Tanggal Lahir tidak valid!', 'error');
                return;
            }

            if (!gender) {
                displayFeedbackMessage('Error: Jenis Kelamin harus dipilih!', 'error');
                return;
            }

            if (message.length < 10) {
                displayFeedbackMessage('Error: Pesan harus diisi dan minimal 10 karakter!', 'error');
                return;
            }

            // Jika semua validasi berhasil, hapus pesan error yang mungkin ada
            const existingError = submissionOutput.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }

            // Menampilkan nilai-nilai ke elemen output
            outputName.textContent = name;
            outputBirthdate.textContent = birthdate;
            outputGender.textContent = gender.value;
            outputMessage.textContent = message;

            // Memberikan feedback sukses
            displayFeedbackMessage('Pesan Anda telah berhasil dikirim!', 'success');

            messageForm.reset(); // Mengosongkan formulir setelah pengiriman berhasil
        });

        // Menambahkan event listener untuk tombol reset (jika ada)
        const resetButton = document.getElementById('resetFormButton');
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                messageForm.reset();
                // Hapus pesan feedback saat formulir direset
                const existingError = submissionOutput.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                const existingSuccess = submissionOutput.querySelector('.success-message');
                if (existingSuccess) {
                    existingSuccess.remove();
                }
                // Kosongkan juga output yang ditampilkan
                outputName.textContent = '';
                outputBirthdate.textContent = '';
                outputGender.textContent = '';
                outputMessage.textContent = '';
            });
        }
    }
});

