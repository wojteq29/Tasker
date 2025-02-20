const word = document.querySelector('.polish-word')
const wordInput = document.querySelector('.type-word')
const checkBtn = document.querySelector('.check-btn')
const hintBtn = document.querySelector('.hint-btn')
const hint = document.querySelector('.hint')
const progress = document.querySelector('.progress')
const error = document.querySelector('.error')
let polishWords = ['jabłko', 'tata']
let englishWords = ['apple', 'dad']
let wordIndex = 0

const fillWord = () => {
    polishWord = polishWords[wordIndex]
    englishWord = englishWords[wordIndex]
    word.textContent = polishWord
    progress.textContent = `${wordIndex}/${polishWords.length}`
    return englishWord
}

const changeWord = () => {
    updatedIndex = wordIndex++
    word.textContent = polishWords[wordIndex]
    progress.textContent = `${updatedIndex}/${polishWords.length}`
    if(updatedIndex == polishWords.length - 1) {
        window.location.href = 'end.html';
    }
    return updatedIndex
}

const checkWord = () => {
    if(wordInput.value === fillWord()) {
        wordInput.value = ''
        error.textContent = ''
        hint.textContent = ''
        changeWord()
    } else {
        error.textContent = 'Spróbuj ponownie!'
    }
}

const showHint = () => {
    hint.textContent = 'Podpowiedź: ' + fillWord()
}

fillWord()
checkBtn.addEventListener('click', checkWord)
hintBtn.addEventListener('click', showHint)



// 1. wyświetl słowo
// 2. jeżeli kliknięto przycisk, zmień słowo na kolejny element tablicy


