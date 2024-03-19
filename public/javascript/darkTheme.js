// Dark theme

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const navbar = document.querySelector('.nav-title');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const icon = document.getElementById('icon');

  toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    navbar.classList.toggle('dark-mode');
    document.body.classList.toggle('dark-mode', toggleButton.checked);
    updateIcon();
  });

  darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', darkModeToggle.checked);
    updateIcon();
  });

  function updateIcon() {
    const iconPath = darkModeToggle.checked ? '/img/sun.png' : '/img/moon.png';
    icon.src = iconPath;
  }

  //  user preference on page
  // const preferredMode = localStorage.getItem('preferred-mode');
  // if (preferredMode === 'dark') {
  //   body.classList.add('dark-mode');
  //   darkModeToggle.checked = true;
  //   updateIcon();
  // }

  // Call the function once to set the initial state
  updateIcon();
});
