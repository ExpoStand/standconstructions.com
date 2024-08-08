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


var count = document.getElementsByClassName("count");
var inc = []
function intervalFunc() {
    for (let i = 0; i < count.length; i++) {
        inc.push(1);
        if (inc[i] != count[i].getAttribute("max-data")) {
            inc[i]++;

        }
        count[i].innerHTML = inc[i]
    }
}

var mains = document.getElementById("mains");
window.onscroll = function () {
    var timer = setInterval(() => {
        var topElem = mains.offsetTop;
        var btmElem = mains.offsetTop + mains.clientHeight;
        var topScreen = window.pageYOffset;
        var btmScreen = window.pageYOffset + window.innerHeight;
        if (btmScreen > topElem && topScreen < btmElem) {
            intervalFunc()

        } else {
            clearInterval(timer);
            for (let i = 0; i < count.length; i++) {
                count[i].innerHTML = 1;

                inc = [];
            }

        }
        intervalFunc();
    }, 200)

}

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
        xhr.open('POST', 'https://standconstructions-mail.trade-pros.org/send-quote', true);

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



// header background change


const navbar = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Adjust this value based on when you want the color to change
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});



//Get all the hyperlink elements
var links = document.getElementsByTagName("a");

//Browse the previously created array
Array.prototype.forEach.call(links, function(elem, index) {
  //Get the hyperlink target and if it refers to an id go inside condition
  var elemAttr = elem.getAttribute("href");
  if(elemAttr && elemAttr.includes("#")) {
    //Replace the regular action with a scrolling to target on click
    elem.addEventListener("click", function(ev) {
      ev.preventDefault();
      //Scroll to the target element using replace() and regex to find the href's target id
      document.getElementById(elemAttr.replace(/#/g, "")).scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
          });
    });
  }
});