// Initial setup
let darkmode = document.body.classList.contains("dark-mode");
let colorSpher = darkmode ? "#fff" : "#ffc2e4";
let linkColor = darkmode ? "#CD62A4" : "#841c62";

// Function to initialize particles based on the current mode
function initParticles() {
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": colorSpher
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#ffc2e4"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": linkColor,
        "opacity": 1,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  });
}

// Initialize particles on page load
initParticles();

// Event listener for toggling dark mode
document.addEventListener('keydown', function (event) {
  if (event.key === '`' || event.key === 'ذ') { // Check if the key pressed is backtick
    toggleDarkMode();
  }
});

// Function to toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const darkmode = document.body.classList.contains('dark-mode');
  
  // Update colors based on the current mode
  const colorSpher = darkmode ? "#fff" : "#ffc2e4";
  const linkColor = darkmode ? "#CD62A4" : "#841c62";
  
  // Update local storage based on the current state
  if (darkmode) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.removeItem('darkMode');
  }
  
  // Re-initialize particles with the new color
  initParticles();
}

// Add event listener to the checkbox
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', function () {
  toggleDarkMode();
  
  // If the checkbox is checked, set dark mode in local storage
  if (this.checked) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.removeItem('darkMode');
  }
});

// Check local storage on page load to set the initial state
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  themeToggle.checked = true; // Check the checkbox if dark mode is enabled
}


// Optional: Load dark mode based on saved preference
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkmode = true;
  colorSpher = "#fff";
  linkColor = "#CD62A4";
  initParticles(); // Initialize particles in dark mode
}
