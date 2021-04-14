const shortUrl = document.querySelector('#short-url')
const copyBtn = document.querySelector('#copy-btn')

function copy() {
  console.log(shortUrl)
  navigator.clipboard.writeText(shortUrl.href).then(function() {
    alert('copied to clipboard!!!!!')
  }, function() {
    alert('something is wrong')
  });
}

if (copyBtn) {
  copyBtn.addEventListener('click', copy)
}
