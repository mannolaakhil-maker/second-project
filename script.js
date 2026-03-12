// Headlines for ticker
const headlines = [
  "Breaking: Hyderabad Metro expands new route",
  "Weather Alert: Heavy rains expected in Warangal",
  "Sports: Telangana team wins state championship",
  "Festival: Charminar lights up for cultural week",
  "Education: New digital literacy program launched"
];

let tickerIndex = 0;
const tickerElement = document.querySelector(".ticker-text");

// Function to update ticker text
function updateTicker() {
  tickerElement.textContent = headlines[tickerIndex];
  tickerIndex = (tickerIndex + 1) % headlines.length;
}

// Change headline every 5 seconds
setInterval(updateTicker, 5000);

// --- Back to Top Button ---
const backToTopBtn = document.createElement("button");
backToTopBtn.textContent = "↑";
backToTopBtn.id = "backToTop";
backToTopBtn.title = "Back to Top";
document.body.appendChild(backToTopBtn);

backToTopBtn.style.position = "fixed";
backToTopBtn.style.bottom = "20px";
backToTopBtn.style.right = "20px";
backToTopBtn.style.padding = "0";
backToTopBtn.style.width = "50px";
backToTopBtn.style.height = "50px";
backToTopBtn.style.background = "#800000";
backToTopBtn.style.color = "white";
backToTopBtn.style.border = "none";
backToTopBtn.style.borderRadius = "50%";
backToTopBtn.style.cursor = "pointer";
backToTopBtn.style.display = "none";
backToTopBtn.style.fontSize = "24px";
backToTopBtn.style.fontWeight = "bold";
backToTopBtn.style.zIndex = "999";

// Show button when scrolling down
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

// Smooth scroll to top
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- Highlight Active Nav Link ---
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
    link.style.background = "#575757";
  }
});

// --- Form Validation (Contact Page) ---
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function(event) {
    const nameInput = form.querySelector("input[name='name']");
    const emailInput = form.querySelector("input[name='email']");
    const messageInput = form.querySelector("textarea[name='message']");
    
    if (!nameInput.value.trim()) {
      alert("Please enter your name.");
      event.preventDefault();
      return;
    }
    
    if (!emailInput.value.trim() || !emailInput.value.includes("@")) {
      alert("Please enter a valid email address.");
      event.preventDefault();
      return;
    }
    
    if (!messageInput.value.trim()) {
      alert("Please enter a message.");
      event.preventDefault();
      return;
    }
    
    alert("Thank you! Your message has been sent.");
  });
}

// --- Category Card Click Handler ---
const categoryCards = document.querySelectorAll(".category-card");
categoryCards.forEach(card => {
  card.addEventListener("click", function() {
    const categoryName = this.querySelector("h4").textContent;
    console.log("Navigating to: " + categoryName);
  });
});

// --- Dark Mode Toggle ---
function initDarkModeToggle() {
  const darkModeBtn = document.createElement("button");
  darkModeBtn.textContent = "🌙";
  darkModeBtn.id = "darkModeToggle";
  darkModeBtn.style.position = "fixed";
  darkModeBtn.style.top = "20px";
  darkModeBtn.style.right = "20px";
  darkModeBtn.style.background = "#333";
  darkModeBtn.style.color = "white";
  darkModeBtn.style.border = "none";
  darkModeBtn.style.padding = "10px 15px";
  darkModeBtn.style.borderRadius = "5px";
  darkModeBtn.style.cursor = "pointer";
  darkModeBtn.style.zIndex = "998";
  document.body.appendChild(darkModeBtn);
  
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });
}

// --- Console Greeting ---
console.log("%cWelcome to Telangana News Portal!", "color: #800000; font-size: 16px; font-weight: bold");

// --- Persistent Dark Mode Toggle ---
function initDarkModeToggle() {
  const darkModeBtn = document.createElement("button");
  darkModeBtn.textContent = "🌙";
  darkModeBtn.id = "darkModeToggle";
  darkModeBtn.style.position = "fixed";
  darkModeBtn.style.top = "20px";
  darkModeBtn.style.right = "20px";
  darkModeBtn.style.background = "#333";
  darkModeBtn.style.color = "white";
  darkModeBtn.style.border = "none";
  darkModeBtn.style.padding = "10px 15px";
  darkModeBtn.style.borderRadius = "5px";
  darkModeBtn.style.cursor = "pointer";
  darkModeBtn.style.zIndex = "998";
  darkModeBtn.style.fontWeight = "bold";
  document.body.appendChild(darkModeBtn);
  
  // Check localStorage for dark mode preference
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    darkModeBtn.textContent = "☀️";
  }
  
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isNowDark = document.body.classList.contains("dark-mode");
    darkModeBtn.textContent = isNowDark ? "☀️" : "🌙";
    localStorage.setItem("darkMode", isNowDark);
  });
}

initDarkModeToggle();

// --- Reading Time Estimator ---
function estimateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes > 0 ? minutes : 1;
}

// Add reading time to articles
const articles = document.querySelectorAll("article");
articles.forEach(article => {
  const text = article.innerText;
  if (text.length > 100) {
    const readTime = estimateReadingTime(text);
    const timeEl = document.createElement("small");
    const existing = article.querySelector("small");
    if (existing) {
      existing.textContent += ` | ⏱️ ${readTime} min read`;
    } else {
      timeEl.textContent = `⏱️ ${readTime} min read`;
      timeEl.style.marginTop = "8px";
      article.appendChild(timeEl);
    }
  }
});

// --- Search Functionality ---
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

if (searchInput && searchBtn) {
  function searchNews() {
    const query = searchInput.value.toLowerCase();
    if (!query) {
      articles.forEach(a => a.style.display = "block");
      return;
    }
    articles.forEach(article => {
      const text = article.innerText.toLowerCase();
      if (text.includes(query)) {
        article.style.display = "block";
        article.style.animation = "fadeIn 0.3s";
      } else {
        article.style.display = "none";
      }
    });
  }
  
  searchBtn.addEventListener("click", searchNews);
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") searchNews();
  });
}