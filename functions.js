const numbers = Array.from(new Array(10).keys()).map(number => String(number))
const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] 
const upperCase = lowerCase.map(letter => letter.toUpperCase())
const generateRandomUrl = (numbers, lowerCase, upperCase) => {
  const shortUrl = []
  const collectionOfThree = [numbers, lowerCase, upperCase].map(arr => JSON.parse(JSON.stringify(arr)))
  // console.log('collectionOfThree: ', collectionOfThree)
  //select element from each array
  for (i = 0; i < collectionOfThree.length; i++) {
    const IndexOfSelectedChar = Math.floor(Math.random() * collectionOfThree[i].length)
    const selectedChar = collectionOfThree[i][IndexOfSelectedChar]
    shortUrl.push(selectedChar)
    collectionOfThree[i].splice(IndexOfSelectedChar, 1)
    // console.log(`collectionOfThree[${i}]: `, collectionOfThree[i])
  }
  //randomly select 2 elements
  for (i = 0; i < 2; i++) {
    const IndexOfSelectedArr = Math.floor(Math.random() * collectionOfThree.length)
    const selectedArr = collectionOfThree[IndexOfSelectedArr]
    const IndexOfSelectedChar = Math.floor(Math.random() * selectedArr.length)
    const selectedChar = selectedArr[IndexOfSelectedChar]
    shortUrl.push(selectedChar)
    selectedArr.splice(IndexOfSelectedChar, 1)
    // console.log('selectedArr: ', selectedArr)
  }
  //shuffle algorithm from 2-2 U38
  for (let index = shortUrl.length - 1; index > 0; index--) {
    let randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shortUrl[index], shortUrl[randomIndex]] = [shortUrl[randomIndex], shortUrl[index]]
  }
  
  // console.log(shortUrl.join(''))
  return shortUrl.join('')
}

module.exports =  generateRandomUrl

