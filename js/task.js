const questionP = document.querySelector('.question-word')
const wordInput = document.querySelector('.type-word')
const checkBtn = document.querySelector('.check-btn')
const hintBtn = document.querySelector('.hint-btn')
const skipBtn = document.querySelector('.skip-btn')
const backBtn = document.querySelector('.back-btn')
const shuffleBtn = document.querySelector('.shuffle-btn')
const anwserIcon = document.querySelector('.fa-eye')
const progress = document.querySelector('.progress')
const error = document.querySelector('.error')

let questionWords = JSON.parse(localStorage.getItem('questions'))
let answerWords = JSON.parse(localStorage.getItem('answers'))
let currentAnswer = ''
let updatedIndex = 0
let progressIndex = 0
let checkShuffle = false
let randomIndex
let randomIdxArr = []
let answerIsChecked = false
let correctAnswers = []

const fillWord = () => {
	let questionWord, answerWord

	if (!checkShuffle) {
		questionWord = questionWords[updatedIndex]
		answerWord = answerWords[updatedIndex]
	} else {
		questionWord = questionWords[randomIdxArr[updatedIndex]]
		answerWord = answerWords[randomIdxArr[updatedIndex]]
	}

	questionP.textContent = questionWord
	progress.textContent = `${progressIndex}/${questionWords.length}`
	currentAnswer = answerWord
}

const changeWord = () => {
	++updatedIndex
	++progressIndex
	questionP.textContent = questionWords[updatedIndex]
	progress.textContent = `${progressIndex}/${questionWords.length}`
	wordInput.setAttribute('placeholder', 'Twoja odpowiedź...')
	hintBtn.classList.add('hide-hint')
	anwserIcon.classList.remove('fa-eye-slash')
	anwserIcon.classList.add('fa-eye')
	backBtn.classList.remove('hide')
	shuffleBtn.classList.add('hide')
	wordInput.value = ''
	fillWord()
	if (updatedIndex === questionWords.length) {
		window.location.href = 'end.html'
	}
}

const checkWord = () => {
	if (wordInput.value.toLowerCase() === currentAnswer.toLowerCase()) {
		wordInput.value = ''
		error.textContent = ''
		wordInput.setAttribute('placeholder', 'Twoja odpowiedź...')
		if (!answerIsChecked) {
			if (!checkShuffle) {
				if (!correctAnswers.includes(questionWords[updatedIndex])) {
					correctAnswers.push(questionWords[updatedIndex])
					localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers))
				}
			} else {
				if (!correctAnswers.includes(questionWords[randomIdxArr[updatedIndex]])) {
					correctAnswers.push(questionWords[randomIdxArr[updatedIndex]])
					localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers))
				}
			}
		}
		answerIsChecked = false

		changeWord()
		error.classList.add('success')
		error.textContent = 'Poprawna odpowiedź!'

		setTimeout(() => {
			error.textContent = ''
		}, 2000)
	} else if (wordInput.value === '') {
		error.classList.remove('success')
		error.textContent = 'Musisz wpisać tekst!'

		setTimeout(() => {
			error.textContent = ''
		}, 3000)
	} else {
		error.classList.remove('success')
		error.textContent = 'Niepoprawna odpowiedź!'

		setTimeout(() => {
			error.textContent = ''
		}, 3000)
	}
}

const showHint = () => {
	if (hintBtn.classList.contains('hide-hint')) {
		wordInput.dataset.previousValue = wordInput.value
		answerIsChecked = true

		if (!checkShuffle) {
			wordInput.setAttribute('placeholder', answerWords[updatedIndex])
		} else {
			wordInput.setAttribute('placeholder', answerWords[randomIdxArr[updatedIndex]])
		}

		wordInput.value = ''
		hintBtn.classList.remove('hide-hint')
		anwserIcon.classList.remove('fa-eye')
		anwserIcon.classList.add('fa-eye-slash')
	} else {
		wordInput.value = wordInput.dataset.previousValue || ''
		wordInput.setAttribute('placeholder', 'Twoja odpowiedź...')
		hintBtn.classList.add('hide-hint')
		anwserIcon.classList.remove('fa-eye-slash')
		anwserIcon.classList.add('fa-eye')
	}
}

const backWord = () => {
	let answerWord
	--updatedIndex
	--progressIndex

	if (!checkShuffle) {
		questionP.textContent = questionWords[updatedIndex]
		answerWord = answerWords[updatedIndex]
		if (updatedIndex === 0) {
			shuffleBtn.classList.remove('hide')
			backBtn.classList.add('hide')
		}
	} else {
		questionP.textContent = questionWords[randomIdxArr[updatedIndex]]
		answerWord = answerWords[randomIdxArr[updatedIndex]]

		if (updatedIndex === 0) {
			backBtn.classList.add('hide')
		}
	}

	currentAnswer = answerWord
	progress.textContent = `${progressIndex}/${questionWords.length}`
	wordInput.setAttribute('placeholder', 'Twoja odpowiedź...')
	hintBtn.classList.add('hide-hint')
	anwserIcon.classList.remove('fa-eye-slash')
	anwserIcon.classList.add('fa-eye')
	wordInput.value = ''
}

const shuffle = () => {
	checkShuffle = true
	while (randomIdxArr.length < questionWords.length) {
		randomIndex = Math.floor(Math.random() * questionWords.length)
		if (!randomIdxArr.includes(randomIndex)) {
			randomIdxArr.push(randomIndex)
		}
	}
	correctAnswers = []
	shuffleBtn.classList.add('hide')
	fillWord()
}

const enterKey = e => {
	if (e.key === 'Enter') {
		checkWord()
	}
}

document.addEventListener('DOMContentLoaded', fillWord)
hintBtn.addEventListener('click', showHint)
checkBtn.addEventListener('click', checkWord)
skipBtn.addEventListener('click', changeWord)
backBtn.addEventListener('click', backWord)
shuffleBtn.addEventListener('click', shuffle)
wordInput.addEventListener('keydown', enterKey)
