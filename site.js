(function () {
  const message = `HIIIIIIIII BEAUTIFUL, first of all HAPPPPYYY BIRTHDAYYYY, it's your day shine like the ever-bright star you have been in my life. I know humme mille hue zada time nhi hua hai, not even a year but still tumne jo meri life me ENTRYY maari hai it has changed my life… for the better ofcc, tumhara tokna for my bad habits, kbhi kbhi randomly itne freaky and jubilant ho jaana, the random giggles, random pitayi hehehhe and the mischievous-person behind thattt adorableeeeee smile, I love every inch of you… you are perfect the way you are… you are perfect for me… kbhi mat sochna ki me iske liye buri toh nhi cuz some DUMB log said somethings. I adore you; I respect you… I Love You!!!! Pehli meri favourite sound thi rain failing on tin roofs but mujhe kya pata tha ki ek 5'3" piddi aaegi mere jeevan me jo uski laugh meri favourite sound/song sab bana degi. Aur chapad chapad krte rha kro… bohot maza aata hai tumse baat krne me👉👈.\nYOU ARE MY FAVOURITE PERSON!!!!\nILYSSSSMMMMM XOXO`;

  function typeWriterEffect(text, elementId, speed = 25) {
    const element = document.getElementById(elementId);
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }
  const customCursor = document.getElementById("custom-cursor");
  const buttons = document.querySelectorAll("button");
  let currentEmoji = "🐹";

  // Follow mouse position
  window.addEventListener("mousemove", (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
  });

  // Change emoji on button hover
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      currentEmoji = "💖";
      customCursor.textContent = currentEmoji;
    });
    button.addEventListener("mouseleave", () => {
      currentEmoji = "🐹";
      customCursor.textContent = currentEmoji;
    });
  });

  const pages = document.querySelectorAll(".page");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentPage = 0;
  let gameCompleted = false;

  function showPage(index) {
    pages.forEach((page, idx) => {
      if (idx === index) {
        page.classList.add("active");
        if (page.style.display === "none") page.style.display = "";
        // Trigger typewriter effect on Page 2
        if (page.id === "page-2") {
          const target = document.getElementById("typewriter-text");
          if (target && !target.dataset.typed) {
            target.textContent = ""; // clear old content
            typeWriterEffect(message, "typewriter-text");
            target.dataset.typed = "true"; // mark as done
          }
        }
      } else {
        page.classList.remove("active");
      }
    });

    prevBtn.disabled = index === 0;
    prevBtn.setAttribute("aria-disabled", index === 0 ? "true" : "false");

    // Disable next on game page if not completed
    if (index === 3 && !gameCompleted) {
      nextBtn.disabled = true;
      nextBtn.setAttribute("aria-disabled", "true");
    } else {
      nextBtn.disabled = index === pages.length - 1;
      nextBtn.setAttribute(
        "aria-disabled",
        index === pages.length - 1 ? "true" : "false"
      );
    }
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      showPage(currentPage);
      if (currentPage === 3 && !gameCompleted) {
        startGame();
        stopConfetti();
        stopLotus();
      } else {
        stopConfetti();
        stopLotus();
      }
    }
  });

  nextBtn.addEventListener("click", () => {
    if (
      currentPage < pages.length - 1 &&
      (currentPage !== 3 || gameCompleted)
    ) {
      currentPage++;
      showPage(currentPage);
      if (currentPage === 3 && !gameCompleted) {
        startGame();
        stopConfetti();
        stopLotus();
      } else {
        stopConfetti();
        stopLotus();
      }
    }
  });

  showPage(currentPage);

  const gameBox = document.getElementById("game-box");
  const scoreBoard = document.getElementById("score-board");
  const hamsterSrc = "assests/images/catchHam.png";

  let hamsterElement = null;
  let gameInterval = null;
  let score = 0;
  const maxScore = 10;

  function createHamster() {
    if (hamsterElement) hamsterElement.remove();
    hamsterElement = document.createElement("img");
    hamsterElement.src = hamsterSrc;
    hamsterElement.alt = "Hamster";
    hamsterElement.id = "hamster";
    hamsterElement.tabIndex = 0;
    hamsterElement.role = "button";
    hamsterElement.setAttribute("aria-label", "Clickable hamster to catch");
    hamsterElement.style.position = "absolute";

    const boxRect = gameBox.getBoundingClientRect();
    const boxWidth = boxRect.width;
    const boxHeight = boxRect.height;
    const hamWidth = 60;
    const hamHeight = 60;

    let top = Math.random() * (boxHeight - hamHeight);
    let left = Math.random() * (boxWidth - hamWidth);

    hamsterElement.style.top = `${top}px`;
    hamsterElement.style.left = `${left}px`;
    hamsterElement.style.width = `${hamWidth}px`;
    hamsterElement.style.height = `${hamHeight}px`;

    hamsterElement.addEventListener("click", catchHamster);
    hamsterElement.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        catchHamster();
      }
    });

    gameBox.appendChild(hamsterElement);
  }

  function catchHamster() {
    if (gameCompleted) return;
    hamsterElement.style.transform = "scale(1.3)";
    setTimeout(() => {
      if (hamsterElement) hamsterElement.style.transform = "scale(1)";
    }, 150);

    score++;
    scoreBoard.textContent = `Score: ${score}`;

    if (score >= maxScore) {
      fadeTransitionToFinal();
    }
  }

  function moveHamster() {
    if (gameCompleted) return;
    if (!hamsterElement) {
      createHamster();
    } else {
      const boxRect = gameBox.getBoundingClientRect();
      const boxWidth = boxRect.width;
      const boxHeight = boxRect.height;
      const hamWidth = 60;
      const hamHeight = 60;

      let top = Math.random() * (boxHeight - hamHeight);
      let left = Math.random() * (boxWidth - hamWidth);

      hamsterElement.style.top = `${top}px`;
      hamsterElement.style.left = `${left}px`;
    }
  }

  function startGame() {
    score = 0;
    gameCompleted = false;
    scoreBoard.textContent = `Score: ${score}`;
    createHamster();
    gameInterval = setInterval(moveHamster, 1200);
  }

  function fadeTransitionToFinal() {
    gameCompleted = true;
    if (gameInterval) {
      clearInterval(gameInterval);
      gameInterval = null;
    }

    const gamePage = document.getElementById("page-4");
    const finalPage = document.getElementById("page-5");

    gamePage.classList.add("fade-out");
    gamePage.addEventListener("transitionend", function onTransition(e) {
      if (e.propertyName === "opacity") {
        gamePage.removeEventListener("transitionend", onTransition);

        gamePage.style.display = "none";
        gamePage.classList.remove("fade-out", "active");

        // Show final page
        finalPage.style.display = "flex";
        requestAnimationFrame(() => {
          finalPage.classList.add("active", "fade-in");
          finalPage.addEventListener("transitionend", function onFadeIn(e2) {
            if (e2.propertyName === "opacity") {
              finalPage.removeEventListener("transitionend", onFadeIn);
              finalPage.classList.remove("fade-in");
            }
          });
        });

        prevBtn.disabled = false;
        prevBtn.setAttribute("aria-disabled", "false");
        nextBtn.disabled = true;
        nextBtn.setAttribute("aria-disabled", "true");

        currentPage = 4;

        startConfetti();
        startLotus();
      }
    });
  }

  const lotusContainer = document.getElementById("lotus-container");
  const lotusElements = Array.from(lotusContainer.querySelectorAll(".lotus"));
  let lotusInterval = null;

  function startLotus() {
    let index = 0;
    lotusElements.forEach((lotus) => lotus.classList.remove("visible"));
    lotusInterval = setInterval(() => {
      if (index >= lotusElements.length) {
        clearInterval(lotusInterval);
        lotusInterval = null;
        return;
      }
      lotusElements[index].classList.add("visible");
      index++;
    }, 400);
  }

  function stopLotus() {
    if (lotusInterval) {
      clearInterval(lotusInterval);
      lotusInterval = null;
    }
    lotusElements.forEach((lotus) => lotus.classList.remove("visible"));
  }

  function checkGameStart() {
    if (currentPage === 3 && !gameCompleted) {
      startGame();
      stopConfetti();
      stopLotus();
    }
  }
  checkGameStart();

  const confettiCanvas = document.getElementById("confetti-canvas");
  const ctx = confettiCanvas.getContext("2d");
  let confettiPieces = [];
  let confettiAnimationId = null;
  let confettiTimeoutId = null;
  let fadingOut = false;
  const fadeOutDuration = 4000;

  function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class ConfettiPiece {
    constructor() {
      this.x = Math.random() * confettiCanvas.width;
      this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
      this.size = Math.random() * 8 + 6;
      this.speed = Math.random() * 3 + 2;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 10 + 5;
      this.color = `hsl(${Math.random() * 60 + 320}, 70%, 60%)`;
      this.shape = Math.random() > 0.5 ? "circle" : "rect";
      this.opacity = 1;
    }
    update() {
      this.y += this.speed;
      this.rotation += this.rotationSpeed;
      if (this.y > confettiCanvas.height) {
        this.y = -this.size;
        this.x = Math.random() * confettiCanvas.width;
      }
      if (fadingOut) {
        this.opacity -= 1 / (fadeOutDuration / 16.67);
        this.opacity = Math.max(this.opacity, 0);
      }
    }
    draw(ctx) {
      if (this.opacity <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      if (this.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      }
      ctx.restore();
    }
  }

  function createConfetti(num) {
    confettiPieces = [];
    for (let i = 0; i < num; i++) {
      confettiPieces.push(new ConfettiPiece());
    }
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let activePieces = 0;
    confettiPieces.forEach((piece) => {
      piece.update();
      piece.draw(ctx);
      if (piece.opacity > 0) activePieces++;
    });
    if (activePieces > 0) {
      confettiAnimationId = requestAnimationFrame(animateConfetti);
    } else {
      cancelAnimationFrame(confettiAnimationId);
      confettiAnimationId = null;
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      fadingOut = false;
    }
  }

  function startConfetti() {
    fadingOut = false;
    createConfetti(100);
    if (!confettiAnimationId) {
      animateConfetti();
    }
    if (confettiTimeoutId) {
      clearTimeout(confettiTimeoutId);
    }
    confettiTimeoutId = setTimeout(() => {
      startFadeOutConfetti();
    }, 4000);
  }

  function startFadeOutConfetti() {
    fadingOut = true;
  }

  function stopConfetti() {
    fadingOut = false;
    if (confettiAnimationId) {
      cancelAnimationFrame(confettiAnimationId);
      confettiAnimationId = null;
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
    if (confettiTimeoutId) {
      clearTimeout(confettiTimeoutId);
      confettiTimeoutId = null;
    }
  }

  const bgMusic = document.getElementById("bg-music");
  const muteBtn = document.getElementById("mute-btn");

  bgMusic.muted = false;

  function updateMuteButton() {
    if (bgMusic.muted) {
      muteBtn.textContent = "🔇";
      muteBtn.title = "Unmute music";
      muteBtn.setAttribute("aria-label", "Unmute music");
    } else {
      muteBtn.textContent = "🔈";
      muteBtn.title = "Mute music";
      muteBtn.setAttribute("aria-label", "Mute music");
    }
  }

  muteBtn.addEventListener("click", () => {
    bgMusic.muted = !bgMusic.muted;
    updateMuteButton();
  });

  updateMuteButton();
})();

const finalQuestion = document.getElementById("final-question");
const yesButton = document.getElementById("yes-btn");
const noButton = document.getElementById("no-btn");
const questionImage = document.getElementById("question-image");

let noClickCount = 0;
let swapped = false; // Track if buttons' functions are swapped

// Helper functions for Yes and No clicks
function normalYesAction() {
  transitionToCelebrationPage();
}

function normalNoAction() {
  noClickCount++;
  if (noClickCount === 1) {
    finalQuestion.textContent = "Are you sure?";
    questionImage.src = "assests/images/q2.jpg"; // update as needed
    swapped = true; // swap button functions from now on
  } else if (noClickCount === 2) {
    finalQuestion.textContent = "ARE YOU SURE SURE??";
    questionImage.src = "assests/images/q3.jpg"; // update as needed
  } else {
    finalQuestion.textContent = "I knew you were joking!";
    yesButton.textContent = "Yes"; // reset label if changed
    noBtnNew.style.display = "none"; // hide the *new* no button
    questionImage.src = "assests/images/q4.jpg"; // update as needed
    noClickCount = 0;
    swapped = false; // reset swap for next round if applicable
  }
}

function swappedYesAction() {
  normalNoAction();
}

function swappedNoAction() {
  transitionToCelebrationPage();
}

// Clear previous event listeners (if reattaching)
yesButton.replaceWith(yesButton.cloneNode(true));
noButton.replaceWith(noButton.cloneNode(true));

const yesBtnNew = document.getElementById("yes-btn");
const noBtnNew = document.getElementById("no-btn");

function attachEventListeners() {
  yesBtnNew.onclick = () => {
    if (!swapped) normalYesAction();
    else swappedYesAction();
  };

  noBtnNew.onclick = () => {
    if (!swapped) normalNoAction();
    else swappedNoAction();
  };
}

// Initial attach
attachEventListeners();

// Transition to celebration page function remains unchanged
function transitionToCelebrationPage() {
  const celebrationPage = document.createElement("section");
  celebrationPage.className = "page";
  celebrationPage.id = "celebration-page";
  celebrationPage.innerHTML = `
      <h1>Yayyyy! 🎉</h1>
      <img src="assests/images/qr.png" alt="QR Code" style="width: 200px; height: auto;"/>
      <p>Scan the QR code for a surprise!</p>
      `;
  document.querySelector(".container").appendChild(celebrationPage);
  celebrationPage.classList.add("active");
  celebrationPage.style.display = "flex";

  document.getElementById("page-5").style.display = "none";
}

// Get modal elements
const imageModal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const modalClose = document.getElementById("modal-close");

// Add click event to all gallery images
const galleryImages = document.querySelectorAll(".gallery-img");
galleryImages.forEach((image) => {
  image.addEventListener("click", () => {
    modalImage.src = image.src; // Set the modal image source to the clicked image
    imageModal.style.display = "flex"; // Show the modal
  });
});

// Close modal when close button is clicked
modalClose.addEventListener("click", () => {
  imageModal.style.display = "none"; // Hide the modal
});

// Close modal when clicking outside the image
document.getElementById("modal-overlay").addEventListener("click", () => {
  imageModal.style.display = "none"; // Hide the modal

  // Start typewriter when Page 2 becomes visible
  const observer = new MutationObserver(() => {
    const page2 = document.getElementById("page-2");
    if (page2.classList.contains("active")) {
      observer.disconnect(); // Run only once
      typeWriterEffect(message, "typewriter-text");
    }
  });

  observer.observe(document.getElementById("page-2"), {
    attributes: true,
    attributeFilter: ["class"],
  });
});
