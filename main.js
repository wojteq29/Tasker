const modal = document.querySelector('.modal')
const openModalBtn = document.querySelector('.open-modal-btn')
const closeModalBtn = document.querySelector('.close-modal-btn')
const nameInput = document.querySelector('.name-input')
const questionInput = document.querySelector('.question-input')
const answerInput = document.querySelector('.answer-input')
const nextBtn = document.querySelector('.modal-next-btn')
const createBtn = document.querySelector('.modal-create-btn')
const modalError = document.querySelector('.modal-error')
const quizesList = document.querySelector('.quizes-list')
const inputGroups = document.querySelectorAll('.input-group')

let questionWords = []
let answerWords = []

const openModal = () => {
	modal.classList.add('show')
}

const closeModal = () => {
	modal.classList.remove('show')
}

const addQuizName = () => {
	if(nameInput.value !== '') {
		inputGroups.forEach(inputGroup => inputGroup.classList.toggle('hide'))
		nextBtn.classList.toggle('hide')
		createBtn.classList.toggle('hide')
		modalError.textContent = ''
	} else {
		modalError.textContent = 'Musisz uzupełnić pola!'
	}
}

const addQuestion = () => {
	if(questionInput.value !== '' && answerInput.value !== '') {
		questionWords.push(questionInput.value)
		answerWords.push(answerInput.value)
		modalError.textContent = ''
		const newLi = document.createElement('li')
		const newA = document.createElement('a')
		newA.setAttribute('href', 'task.html')
		quizesList.append(newLi)
		newA.textContent = nameInput.value
		newLi.append(newA)
	} else {
		modalError.textContent = 'Musisz uzupełnić pola!'
	}
}

openModalBtn.addEventListener('click', openModal)
closeModalBtn.addEventListener('click', closeModal)
nextBtn.addEventListener('click', addQuizName)
createBtn.addEventListener('click', addQuestion)
