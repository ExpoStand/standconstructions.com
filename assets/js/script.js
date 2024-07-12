// Start Navbar script for mobile toggle



document.getElementById('menu-toggle').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle('hidden');
}

function showContent(contentId) {
    // Hide all content divs
    const contents = document.querySelectorAll('[id^="content"]');
    contents.forEach(content => content.classList.add('hidden'));
        
    // Show the selected content
    document.getElementById(contentId).classList.remove('hidden');
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        mobileMenu.classList.add('hidden');
        document.querySelectorAll('#mobile-menu ul').forEach(dropdown => {
            dropdown.classList.add('hidden');
        });
    }
});

// End Navbar script for mobile toggle


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



// custom model
let customCurrentSlide = 0;
const customSlides = document.querySelectorAll('.custom-slide');

function showCustomSlide(index) {
    customSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function changeCustomSlide(step) {
    customCurrentSlide = (customCurrentSlide + step + customSlides.length) % customSlides.length;
    showCustomSlide(customCurrentSlide);
}

function openCustomModal() {
    document.getElementById('customModal').classList.remove('hidden');
}

function closeCustomModal() {
    document.getElementById('customModal').classList.add('hidden');
}


  
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
