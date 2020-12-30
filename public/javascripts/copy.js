const shortUrl = document.querySelector('#short-url')

function copy() {
  console.log(shortUrl)
  navigator.clipboard.writeText(shortUrl.href).then(function() {
    alert('copied to clipboard!!!!!')
  }, function() {
    alert('something is wrong')
  });
}