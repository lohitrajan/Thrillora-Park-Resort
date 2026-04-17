function toggleOffers() {
    const box = document.getElementById("offersBox");
    if (!box) return;
    box.style.display = (box.style.display === "flex") ? "none" : "flex";
}
function startTimer(id, endTime) {
    const timerElement = document.getElementById(id);
    if (!timerElement) return;
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        if (timeLeft <= 0) {
            timerElement.innerHTML = "EXPIRED";
            clearInterval(interval);
            return;
        }
        const d = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const h = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const m = Math.floor((timeLeft / (1000 * 60)) % 60);
        const s = Math.floor((timeLeft / 1000) % 60);
        timerElement.innerHTML = `Ends in ${d}D : ${h}H : ${m}M : ${s}S`;
    }, 1000);
}
document.addEventListener("DOMContentLoaded", function () {
    startTimer("timer1", new Date("May 10, 2026 23:59:59").getTime());
    const track = document.getElementById("restaurantSlides");
    const slides = document.querySelectorAll(".restaurant-slide");
    const dotsBox = document.getElementById("sliderDots");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    if (!track || slides.length === 0) return;
    let current = 0;
    const total = slides.length;
    let autoTimer;
    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "slider-dot" + (i === 0 ? " active" : "");
        dot.addEventListener("click", () => {
            goTo(i);
            resetAuto();
        });
        dotsBox.appendChild(dot);
    });
    function updateDots() {
        document.querySelectorAll(".slider-dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === current);
        });
    }
    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        updateDots();
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            next();
            resetAuto();
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prev();
            resetAuto();
        });
    }
    function startAuto() {
        autoTimer = setInterval(next, 4000);
    }
    function resetAuto() {
        clearInterval(autoTimer);
        startAuto();
    }
    startAuto();
    let startX = 0;
    track.addEventListener("touchstart", (e) => {
        startX = e.changedTouches[0].screenX;
    }, { passive: true });
    track.addEventListener("touchend", (e) => {
        const diff = startX - e.changedTouches[0].screenX;

        if (Math.abs(diff) > 40) {
            diff > 0 ? next() : prev();
            resetAuto();
        }
    }, { passive: true });
});
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const overlay = document.getElementById("navOverlay");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeBtn = document.getElementById("closeMenu");
    function openMenu() {
        mobileMenu.style.display = "flex";
        setTimeout(() => {
            mobileMenu.classList.add("open");
            overlay.classList.add("open");
        }, 10);
        document.body.style.overflow = "hidden";
    }
    function closeMenu() {
        mobileMenu.classList.remove("open");
        overlay.classList.remove("open");
        document.body.style.overflow = "";
        setTimeout(() => { mobileMenu.style.display = "none"; }, 350);
    }
    if (menuIcon) menuIcon.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (overlay) overlay.addEventListener("click", closeMenu);
    document.querySelectorAll(".mobile-nav-menu a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });
});
function validateEmail() {
    let email = document.getElementById("emailInput").value.trim();
    let msg = document.getElementById("msg");
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        msg.innerText = "Email address is required.";
        msg.style.color = "red";
        return;
    }
    if (!pattern.test(email)) {
        msg.innerText = "Enter a valid email address.";
        msg.style.color = "red";
        return;
    }
    msg.innerText = "Successfully Subscribed!";
    msg.style.color = "green";
}
const rideData = {
    tanjora:     { img:'tanjora.jpg',     tag:'LAND RIDE',  name:'TANJORA',       desc:'World-class inverted coaster that twists, loops and drops at breathtaking speeds.',         b1:'THRILL: EXTREME', b2:'HEIGHT: 140CM+', b3:'AGE: 12+',  s1:['Max Speed','90 KM/H'],  s2:['Duration','2.5 MIN'], s3:['Capacity','24 PAX'] },
    skyring:     { img:'sky_ring.jpg',    tag:'LAND RIDE',  name:'SKY RING',      desc:'Soar to sky-high heights and enjoy breathtaking panoramic views of the entire park.',       b1:'THRILL: HIGH',    b2:'HEIGHT: 120CM+', b3:'AGE: 10+', s1:['Max Height','50 MTR'],  s2:['Duration','3 MIN'],   s3:['Capacity','16 PAX'] },
    gfall:       { img:'gfall.jpg',       tag:'LAND RIDE',  name:'G FALL',        desc:'Experience the ultimate freefall drop from towering heights — pure adrenaline awaits.',    b1:'THRILL: EXTREME', b2:'HEIGHT: 130CM+', b3:'AGE: 12+', s1:['Drop Height','40 MTR'], s2:['Duration','1.5 MIN'], s3:['Capacity','8 PAX']  },
    sealagoon:   { img:'sealagoon.jpg',   tag:'WATER RIDE', name:'SEA LAGOON',    desc:'Get soaked and splashed as you navigate wild lagoon rapids in an inflatable boat.',         b1:'THRILL: MEDIUM',  b2:'HEIGHT: 110CM+', b3:'AGE: 8+',  s1:['Splash Zone','100%'],   s2:['Duration','4 MIN'],   s3:['Capacity','6 PAX']  },
    wavepool:    { img:'wavepool.jpg',    tag:'WATER RIDE', name:'WAVE POOL',     desc:'Enjoy massive ocean-like waves in our giant wave pool — perfect for the whole family.',    b1:'THRILL: LOW',     b2:'HEIGHT: ANY',    b3:'ALL AGES', s1:['Wave Height','1.5 M'],  s2:['Open Hours','10-6'],  s3:['Capacity','200 PAX']},
    rainbow:     { img:'rainbow.jpg',     tag:'WATER RIDE', name:'RAINBOW LOOPS', desc:'Race through colourful twisting water slides and splash into the pool at the bottom.',      b1:'THRILL: HIGH',    b2:'HEIGHT: 120CM+', b3:'AGE: 10+', s1:['Slide Length','80 M'],  s2:['Duration','45 SEC'],  s3:['Capacity','12 PAX'] },
    minicoco:    { img:'mini-coco.jpg',   tag:'KIDS RIDE',  name:'MINI COCO CUP', desc:'Little ones spin and giggle in giant teacups — a delightful safe ride for small kids.',   b1:'THRILL: GENTLE',  b2:'HEIGHT: ANY',    b3:'AGE: 2-10',s1:['Speed','SLOW'],         s2:['Duration','2 MIN'],   s3:['Capacity','3/CUP']  },
    convoy:      { img:'convoy.jpg',      tag:'KIDS RIDE',  name:'CONVOY',        desc:'Hop aboard a fun convoy train and chug through exciting park terrain on this kiddie ride.',b1:'THRILL: GENTLE',  b2:'HEIGHT: ANY',    b3:'AGE: 2-10',s1:['Route','PARK LOOP'],    s2:['Duration','5 MIN'],   s3:['Capacity','20 PAX'] },
    funkymonkey: { img:'funky-monkey.jpg',tag:'KIDS RIDE',  name:'FUNKY MONKEY',  desc:'A safe kid-friendly freefall ride with gentle drops and loads of monkey-themed fun.',     b1:'THRILL: GENTLE',  b2:'HEIGHT: 90CM+',  b3:'AGE: 4-12',s1:['Drop Height','5 MTR'],  s2:['Duration','1 MIN'],   s3:['Capacity','12 PAX'] },
};
function openRidePopup(key) {
    const r = rideData[key];
    document.getElementById('popup-img').src = r.img;
    document.getElementById('popup-tag').textContent = r.tag;
    document.getElementById('popup-name').textContent = r.name;
    document.getElementById('popup-desc').textContent = r.desc;
    document.getElementById('popup-badges').innerHTML =
        `<span class="popup-badge-item">${r.b1}</span>
         <span class="popup-badge-item blue">${r.b2}</span>
         <span class="popup-badge-item">${r.b3}</span>`;
    document.getElementById('popup-stats').innerHTML =
        `<div class="popup-stat-box"><span>${r.s1[0]}</span><strong>${r.s1[1]}</strong></div>
         <div class="popup-stat-box"><span>${r.s2[0]}</span><strong>${r.s2[1]}</strong></div>
         <div class="popup-stat-box"><span>${r.s3[0]}</span><strong>${r.s3[1]}</strong></div>`;
    document.getElementById('ridePopup').classList.add('active');
}
function closeRidePopup() {
    document.getElementById('ridePopup').classList.remove('active');
}
document.getElementById('ridePopup').addEventListener('click', function(e) {
    if (e.target === this) closeRidePopup();
});