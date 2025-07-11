// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

const toggleSwitch = document.getElementById("theme-toggle");
const html = document.documentElement;

// Initial theme check
if (localStorage.getItem("theme") === "dark") {
  toggleSwitch.checked = true;
  html.classList.add("dark-mode");
} else {
  html.classList.remove("dark-mode");
}

// Toggle dark/light mode
toggleSwitch.addEventListener("change", () => {
  html.classList.toggle("dark-mode");
  localStorage.setItem("theme", toggleSwitch.checked ? "dark" : "light");
});


// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (name === '' || email === '' || subject === '' || message === '') {
            showAlert('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual form submission)
        showAlert('Your message has been sent successfully!', 'success');
        contactForm.reset();
        
        // In a real application, you would send the form data to a server here
        // For example:
        // fetch('/send-email', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ name, email, subject, message }),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     showAlert('Your message has been sent successfully!', 'success');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     showAlert('There was an error sending your message. Please try again.', 'error');
        // });
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show alerts
function showAlert(message, type) {
    // Create alert element
    const alertElement = document.createElement('div');
    alertElement.className = `alert ${type}`;
    alertElement.textContent = message;
    
    // Add alert to the page
    const contactSection = document.querySelector('.contact');
    const contactContent = contactSection.querySelector('.contact-content');
    
    contactSection.insertBefore(alertElement, contactContent);
    
    // Remove alert after 3 seconds
    setTimeout(() => {
        alertElement.remove();
    }, 3000);
}

// Add CSS for alerts
const alertStyles = document.createElement('style');
alertStyles.textContent = `
    .alert {
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 20px;
        text-align: center;
        animation: fadeIn 0.3s ease;
    }
    
    .success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(alertStyles);

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .about-text, .contact-form, .contact-info');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Add CSS for scroll animations
const scrollAnimationStyles = document.createElement('style');
scrollAnimationStyles.textContent = `
    .project-card, .skill-category, .about-text, .contact-form, .contact-info {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(scrollAnimationStyles);

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);
// Run once on page load
window.addEventListener('load', animateOnScroll);

// Typing effect for hero section
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.innerHTML;
    const highlightSpan = heroTitle.querySelector('.highlight');
    const highlightText = highlightSpan ? highlightSpan.textContent : '';
    
    // Only apply typing effect if there's a highlight span
    if (highlightSpan) {
        // Replace the highlight span with an empty span
        heroTitle.innerHTML = originalText.replace(`<span class="highlight">${highlightText}</span>`, '<span class="highlight"></span>');
        
        // Get the new highlight span
        const newHighlightSpan = heroTitle.querySelector('.highlight');
        
        // Typing effect
        let i = 0;
        const typeWriter = () => {
            if (i < highlightText.length) {
                newHighlightSpan.textContent += highlightText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});
