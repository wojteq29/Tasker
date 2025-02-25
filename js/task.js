const questionP = document.querySelector('.question-word')
const wordInput = document.querySelector('.type-word')
const checkBtn = document.querySelector('.check-btn')
const hintBtn = document.querySelector('.hint-btn')
const anwserIcon = document.querySelector('.fa-eye')
const progress = document.querySelector('.progress')
const error = document.querySelector('.error')

let questionWords = JSON.parse(localStorage.getItem('questions'))
let answerWords = JSON.parse(localStorage.getItem('answers'))
let wordStartIndex = 0

const fillWord = () => {
	questionWord = questionWords[wordStartIndex]
	answerWord = answerWords[wordStartIndex]
	questionP.textContent = questionWord
	progress.textContent = `${wordStartIndex}/${questionWords.length}`
	return answerWord
}

const changeWord = () => {
	let updatedIndex = ++wordStartIndex
	questionP.textContent = questionWords[wordStartIndex]
	progress.textContent = `${updatedIndex}/${questionWords.length}`
	if (updatedIndex === questionWords.length) {
		window.location.href = 'end.html'
	}
	return updatedIndex
}

const checkWord = () => {
	if (wordInput.value.toLowerCase() === fillWord().toLowerCase()) {
		wordInput.value = ''
		error.textContent = ''
		wordInput.setAttribute('placeholder', 'Twoja odpowiedź...')
		changeWord()
	} else if (wordInput.value === '') {
		error.textContent = 'Musisz wpisać tekst!'

		setTimeout(() => {
			error.textContent = ''
		}, 5000)
	} else {
		error.textContent = 'Niepoprawna odpowiedź!'

		setTimeout(() => {
			error.textContent = ''
		}, 5000)
	}
}

const showHint = () => {
	if (hintBtn.classList.contains('hide')) {
		wordInput.setAttribute('placeholder', fillWord())
		wordInput.value = ''
		hintBtn.classList.remove('hide')
		anwserIcon.classList.remove('fa-eye')
		anwserIcon.classList.add('fa-eye-slash')
	} else {
		wordInput.setAttribute('placeholder', 'Twoja odpowiedź...')
		hintBtn.classList.add('hide')
		anwserIcon.classList.remove('fa-eye-slash')
		anwserIcon.classList.add('fa-eye')
	}
}

const enterKey = e => {
	if (e.key === 'Enter') {
		checkWord()
	}
}

document.addEventListener('DOMContentLoaded', fillWord)
hintBtn.addEventListener('click', showHint)
checkBtn.addEventListener('click', checkWord)
wordInput.addEventListener('keydown', enterKey)
