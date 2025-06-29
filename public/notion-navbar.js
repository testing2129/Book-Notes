// Hamburger menu and font style toggler for Notion-style Book Notes

document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const navOverlay = document.getElementById('navOverlay');
  const notionNav = document.getElementById('notionNav');
  // Hamburger menu toggle
  if (navToggle && notionNav) {
    navToggle.addEventListener('click', function () {
      navOverlay.classList.toggle('open');
      notionNav.classList.toggle('hide-when-overlay');
      navToggle.classList.toggle('active');
    });
    // Close nav when clicking outside (mobile UX)
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !notionNav.contains(e.target)) {
        notionNav.classList.remove('nav-open');
        navToggle.classList.remove('active');
      }
    });
  }
  // Optionally, close overlay when a link is clicked
  if (navOverlay) {
    navOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navOverlay.classList.remove('open');
        notionNav.classList.remove('hide-when-overlay');
      });
    });
  }

  // Font style menu toggle
  const styleMenuBtn = document.getElementById('styleMenuBtn');
  const styleMenu = document.getElementById('styleMenu');
  if (styleMenuBtn && styleMenu) {
    styleMenuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      styleMenu.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!styleMenu.contains(e.target) && !styleMenuBtn.contains(e.target)) {
        styleMenu.classList.remove('open');
      }
    });
    // Font switching logic
    const fontOptions = styleMenu.querySelectorAll('.notion-style-option');
    fontOptions.forEach(option => {
      option.addEventListener('click', function () {
        document.body.classList.remove('font-default', 'font-serif', 'font-manrope');
        if (option.dataset.font === 'serif') {
          document.body.classList.add('font-serif');
        } else if (option.dataset.font === 'manrope') {
          document.body.classList.add('font-manrope');
        } else {
          document.body.classList.add('font-default');
        }
        styleMenu.classList.remove('open');
      });
    });
  }
});
