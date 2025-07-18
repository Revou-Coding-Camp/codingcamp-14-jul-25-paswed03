document.addEventListener('DOMContentLoaded', () => {

    const profileData = {
        nama: "I Gede Pasek Wedana",
        jabatan: "IT Enthusiast",
        fotoUrl: "https://i.pinimg.com/564x/60/04/c4/6004c4a8da220e7175c440f34cf5e4ab.jpg",
        deskripsi: "Saya adalah seorang penggiat teknologi dari Karangasem, Bali. Saya ingin menciptakan pengalaman digital yang menarik dan fungsional. Saya percaya pada inovasi digital untuk membangun masa depan yang lebih baik.",
        detail: [
            { label: "Email", value: "pasekwedana@gmail.com" },
            { label: "Telepon", value: "+62 821 4606 8855" },
            { label: "Lokasi", value: "Karangasem, Bali" },
        ],
        sosialMedia: [
            { nama: "LinkedIn", url: "https://www.linkedin.com/in/i-gede-pasek-wedana-87a0b3319/" },
            { nama: "GitHub", url: "https://github.com/paswed03" },
            { nama: "Instagram", url: "https://www.instagram.com/pasek_wedana?igsh=emcxNTR4eWlxemVv" }
        ],
        keahlian: ["HTML5", "Tailwind CSS", "JavaScript", "PHP", "Figma"]
    };

    function populateProfile() {
        document.getElementById('profile-pic').src = profileData.fotoUrl;
        document.getElementById('profile-pic').alt = `Foto Profil ${profileData.nama}`;
        document.getElementById('profile-name').textContent = profileData.nama;
        document.getElementById('profile-job').textContent = profileData.jabatan;
        document.getElementById('profile-desc').textContent = profileData.deskripsi;

        const detailsContainer = document.getElementById('profile-details');
        detailsContainer.innerHTML = profileData.detail.map(item => `
            <div class="flex items-start">
                <span class="font-semibold w-20 flex-shrink-0">${item.label}:</span>
                <a href="${item.link || '#'}" class="text-gray-700 hover:text-blue-500 break-words">${item.value}</a>
            </div>
        `).join('');

        const socialContainer = document.getElementById('profile-social');
        socialContainer.innerHTML = profileData.sosialMedia.map(sm => `
            <a href="${sm.url}" class="text-gray-600 hover:text-blue-500 font-semibold">${sm.nama}</a>
        `).join('');

        const skillsContainer = document.getElementById('profile-skills');
        skillsContainer.innerHTML = profileData.keahlian.map(skill => `
            <span class="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">${skill}</span>
        `).join('');
    }

    function validateContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = form.elements['name'];
            const email = form.elements['email'];
            const gender = document.querySelector('input[name="gender"]:checked');
            const birthdate = form.elements['birthdate'];
            const message = form.elements['message'];
            
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const genderError = document.getElementById('genderError');
            const birthdateError = document.getElementById('birthdateError');
            const messageError = document.getElementById('messageError');
            
            let isValid = true;

            [nameError, emailError, genderError, birthdateError, messageError].forEach(e => e.classList.add('hidden'));
            [name, email, birthdate, message].forEach(i => i.classList.remove('border-red-500'));

            if (name.value.trim() === '') { nameError.classList.remove('hidden'); name.classList.add('border-red-500'); isValid = false; }
            if (!/^\S+@\S+\.\S+$/.test(email.value)) { emailError.classList.remove('hidden'); email.classList.add('border-red-500'); isValid = false; }
            if (!gender) { genderError.classList.remove('hidden'); isValid = false; }
            if (birthdate.value === '') { birthdateError.classList.remove('hidden'); birthdate.classList.add('border-red-500'); isValid = false; }
            if (message.value.trim() === '') { messageError.classList.remove('hidden'); message.classList.add('border-red-500'); isValid = false; }

            const resultContainer = document.getElementById('form-result');
            if (isValid) {
                const formattedDate = new Date(birthdate.value).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                });

                console.log("Formulir berhasil divalidasi. Data yang dikirim:");
                console.log({
                    nama: name.value,
                    email: email.value,
                    jenisKelamin: gender.value,
                    tanggalLahir: formattedDate,
                    pesan: message.value
                });

                resultContainer.innerHTML = `
                    <h4 class="font-bold text-lg mb-2">Pesan Terkirim!</h4>
                    <p><strong>Nama:</strong> ${name.value}</p>
                    <p><strong>Email:</strong> ${email.value}</p>
                    <p><strong>Jenis Kelamin:</strong> ${gender.value}</p>
                    <p><strong>Tanggal Lahir:</strong> ${formattedDate}</p>
                    <p><strong>Pesan:</strong> ${message.value}</p>
                `;
                resultContainer.classList.remove('hidden');
                form.reset();
            } else {
                resultContainer.classList.add('hidden');
            }
        });
    }

    function setupMobileMenu() {
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        if (menuButton) {
            menuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        }
    }

    function setupScrollSpy() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.onscroll = () => {
            let currentSectionId = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 75) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('nav-active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('nav-active');
                }
            });
        };
    }

    function updateLiveClock() {
        const timeElement = document.getElementById('current-time');
        if(!timeElement) return;

        function update() {
            const now = new Date();
            const options = {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                timeZone: 'Asia/Makassar',
                timeZoneName: 'short'
            };
            timeElement.textContent = `Time Now: ${now.toLocaleString('id-ID', options)}`;
        }
        update();
        setInterval(update, 1000);
    }

    const userName = prompt("Selamat datang! Silakan masukkan nama Anda:", "Pengunjung");
    if (userName) {
        document.getElementById('welcome-message').textContent = `Hi, ${userName}`;
    }

    document.getElementById('footer-text').innerHTML = `&copy; ${new Date().getFullYear()} I Gede Pasek Wedana. All Rights Reserved.`;

    populateProfile();
    validateContactForm();
    setupMobileMenu();
    setupScrollSpy();
    updateLiveClock();
});
