document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  const backToTop = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
      // Navbar scroll effect
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
      
      // Back to top button visibility
      if (window.scrollY > 300) {
          backToTop.classList.add('visible');
      } else {
          backToTop.classList.remove('visible');
      }
  });

  // Typewriter effect
  const typewriterText = document.querySelector('.typewriter-text');
  const phrases = [
      "Business Analyst"
      "Artificial Intelligence & Machine Learning Engineer",
      "Data Scientist",
      "Data Analyst",
      "Researcher in AI for Social Good"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeWriter() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
          typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
          charIndex--;
      } else {
          typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
          charIndex++;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(typeWriter, 1500);
      } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typeWriter, 500);
      } else {
          const typingSpeed = isDeleting ? 50 : 100;
          setTimeout(typeWriter, typingSpeed);
      }
  }

  // Start the typewriter effect
  setTimeout(typeWriter, 1000);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 70,
                  behavior: 'smooth'
              });
          }
      });
  });

  // Research tabs functionality
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const tabId = this.getAttribute('data-tab');
          
          // Remove active class from all buttons and panes
          tabBtns.forEach(btn => btn.classList.remove('active'));
          tabPanes.forEach(pane => pane.classList.remove('active'));
          
          // Add active class to clicked button and corresponding pane
          this.classList.add('active');
          document.getElementById(tabId).classList.add('active');
      });
  });

  // Form submission (MongoDB version)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();

          // Collect form values from inputs (note: using 'phno' as per your HTML)
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const phno = document.getElementById('phno').value;
          const message = document.getElementById('message').value;

          // Prepare form data object to send
          const formData = {
              name: name,
              email: email,
              phno: phno,
              message: message,
              submittedAt: new Date()
          };

          // Send form data to the Netlify function
          fetch('/.netlify/functions/submitForm', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error("Failed to submit the form.");
              }
              return response.json();
          })
          .then(data => {
              console.log("Form submitted successfully:", data);
              // Show success feedback (you can replace this with a modal if desired)
              alert("Thank you for your message! I will get back to you soon.");
              contactForm.reset();
          })
          .catch(error => {
              console.error("Error submitting form:", error);
              alert("Failed to submit the form. Please try again later.");
          });
      });
  }

  // Animate elements when they come into view
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.project-card, .patent-card, .paper-card, .timeline-item');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementPosition < windowHeight - 100) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
          }
      });
  };

  // Set initial state for animated elements
  const animatedElements = document.querySelectorAll('.project-card, .patent-card, .paper-card, .timeline-item');
  animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Run once on page load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if(darkModeToggle){
    const moonIcon = darkModeToggle.querySelector('i');

    // Check for saved user preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }

    // Toggle function
    darkModeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        moonIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        moonIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
  }
});

// Back to top button functionality
const backToTop = document.querySelector('.back-to-top');
backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});

// Hamburger menu toggle for mobile
// Update your existing hamburger menu toggle code
document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('active');
    
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelector('.hamburger').classList.remove('active');
        document.querySelector('.nav-links').classList.remove('active');
      });
    });
  });
