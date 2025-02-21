var swiper = new Swiper(".mySwiper1", {
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

var swiper = new Swiper(".mySwiper2", {
  loop: true,
    slidesPerView: 3,
    spaceBetween: 26,
    autoplay: {
        delay: 3000, 
        disableOnInteraction: false,
      },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
          1200: {
            slidesPerView: 4,
          },
          1054: {
            slidesPerView: 4,
          },
          991: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3,
          },
          576: {
            slidesPerView: 2,
          },
          450: {
            slidesPerView: 1,
          },
          360: {
            slidesPerView: 1,
          },
        },
  });
document.addEventListener("DOMContentLoaded", function() {
    function startCounter(elementId, targetNumber, speed) {
        let counterElement = document.getElementById(elementId);
        let currentNumber = 0;
        
        let interval = setInterval(function() {
            if (currentNumber < targetNumber) {
                currentNumber++;
                counterElement.textContent = currentNumber;
            } else {
                clearInterval(interval);
            }
        }, speed);
    }
    
    startCounter("counter1", 120, 10);
    startCounter("counter2", 245, 15);
    startCounter("counter3", 35, 20);
});