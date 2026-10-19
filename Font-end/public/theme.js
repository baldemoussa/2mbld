;(function () {
  var saved = localStorage.getItem('portfolio-theme')
  if (saved === 'light') document.documentElement.classList.remove('dark')
})()
