const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('header nav a');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
        
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

window.addEventListener('scroll', () => {
    document.querySelector('.header').classList.toggle('sticky', window.scrollY > 100);
    
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

const roles = [
    "Frontend Developer",
    "Web Developer",
    "Web Designer",
    "Programmer",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector(".typing-text");

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex--);
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000); // pause before deleting
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; // next text
    }

    setTimeout(typeEffect, isDeleting ? 80 : 120); // typing speed
}

typeEffect();

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // 🔴 VERY IMPORTANT — stops page refresh

  // show success message
  document.getElementById("formMessage").style.display = "block";

  // clear form fields
  this.reset();
});
