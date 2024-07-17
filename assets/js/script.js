// homepage tabs

function openTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('border-blue-500', 'text-blue-500'));
    // Show the selected tab content
    document.getElementById('content' + tabId.slice(-1)).classList.add('active');
    // Add active class to the selected tab button
    document.getElementById(tabId).classList.add('border-blue-500', 'text-blue-500');
}

// counter up


document.addEventListener('DOMContentLoaded', function() {
    var counters = document.querySelectorAll('.counter');
    
    counters.forEach(function(counter) {
        var currentValue = 0;
        var targetValue = parseInt(counter.innerText);
        var duration = 4000; // 4 seconds
        var startTime = null;
        
        function updateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = timestamp - startTime;
            
            // Calculate current value using easing (in this case, linear)
            currentValue = Math.ceil(easeLinear(progress, 0, targetValue, duration));
            
            counter.innerText = currentValue;
            
            // Continue animation if not finished
            if (progress < duration) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        // Start the animation
        requestAnimationFrame(updateCounter);
    });
    
    // Easing function - linear
    function easeLinear(t, b, c, d) {
        return c * t / d + b;
    }
})

// swiperslider

document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector(".mySwiper")) {
      var swiper = new Swiper(".mySwiper", {
          slidesPerView: 1,
          spaceBetween: 10,
          pagination: {
              el: ".swiper-pagination",
              clickable: true,
          },
          autoplay: {
              delay: 2500,
              disableOnInteraction: false,
          },
          breakpoints: {
              "@0.00": {
                  slidesPerView: 1,
                  spaceBetween: 10,
              },
              "@0.75": {
                  slidesPerView: 2,
                  spaceBetween: 20,
              },
              "@1.00": {
                  slidesPerView: 3,
                  spaceBetween: 40,
              },
              "@1.50": {
                  slidesPerView: 4,
                  spaceBetween: 50,
              },
          },
      });
  }
});



// custom model
let customCurrentSlide = 0;
const customSlides = document.querySelectorAll('.custom-slide');

function showCustomSlide(index) {
    customSlides.forEach((slide, i) => {
        slide.classList.toggle('hidden', i !== index);
    });
}

function changeCustomSlide(step) {
    customCurrentSlide = (customCurrentSlide + step + customSlides.length) % customSlides.length;
    showCustomSlide(customCurrentSlide);
}

function openCustomModal() {
    customCurrentSlide = 0;  // Reset to the first slide when opening the modal
    showCustomSlide(customCurrentSlide);
    document.getElementById('customModal').classList.remove('hidden');
}

function closeCustomModal() {
    document.getElementById('customModal').classList.add('hidden');
}

// Initialize the first slide as visible
showCustomSlide(customCurrentSlide);




  
// contact form


const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});



// contact form validation and form submition

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        submitContactForm();
    });

    // Fetch client IP address
    async function getClientIp() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('Error fetching IP address:', error);
            return '';
        }
    }

    function validateForm(formData) {
        let requiredFields = ['fullname', 'email', 'phone', 'city', 'company_name', 'exhibition_name', 'stand_size', 'budget', 'message'];
        
        for (let field of requiredFields) {
            if (!formData.get(field)?.trim()) {
                return false;
            }
        }
        return true;
    }

    async function submitContactForm() {
        let form = document.getElementById('contactForm');
        let formData = new FormData(form);
        let submitButton = form.querySelector('button[type="submit"]');

        if (!validateForm(formData)) {
            alert('Please fill in all required fields.');
            return;
        }

        // Get client IP and clean page URL
        const clientIp = await getClientIp();
        const pageUrl = `${window.location.origin}${window.location.pathname}`;

        // Append IP and URL to form data
        formData.append('ip', clientIp);
        formData.append('pageUrl', pageUrl);

        // Disable the form and button, change button text, and add loading icon
        form.querySelectorAll('input, button, textarea').forEach(element => {
            element.disabled = true;
        });
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:4002/send-quote', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // Re-enable the form and button, reset button text
                form.querySelectorAll('input, button, textarea').forEach(element => {
                    element.disabled = false;
                });
                submitButton.innerHTML = 'Submit';

                if (xhr.status == 200) {
                    alert('Your message has been sent successfully.');
                    form.reset();
                    // Reload page to pure URL
                    window.location.href = pageUrl;
                } else {
                    alert('There was an error sending your message.');
                }
            }
        };

        // Send form data
        xhr.send(formData);
    }
});



