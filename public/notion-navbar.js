// Hamburger menu and font style toggler for Notion-style Book Notes

document.addEventListener('DOMContentLoaded', function () {
  // Hamburger menu toggle
  const navToggle = document.getElementById('navToggle');
  const notionNav = document.getElementById('notionNav');
  if (navToggle && notionNav) {
    navToggle.addEventListener('click', function () {
      notionNav.classList.toggle('nav-open');
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
