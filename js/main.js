const modal = document.querySelector('.modal')
const openModalBtn = document.querySelector('.open-modal-btn')
const closeModalBtn = document.querySelector('.close-modal-btn')
const nameInput = document.querySelector('.name-input')
const questionInput = document.querySelector('.question-input')
const answerInput = document.querySelector('.answer-input')
const nextBtn = document.querySelector('.modal-next-btn')
const backBtn = document.querySelector('.modal-back-btn')
const addBtn = document.querySelector('.modal-add-btn')
const createBtn = document.querySelector('.modal-create-btn')
const modalError = document.querySelector('.modal-error')
const modalSuccess = document.querySelector('.modal-success')
const divLink = document.querySelector('.center')
const inputGroups = document.querySelectorAll('.input-group')
const inputGroupName = document.querySelector('.input-group-name')
// quiz info
const quizInfo = document.querySelector('.quiz-info')
const quizInfoName = document.querySelector('.quiz-info-name')
const taskList = document.querySelector('.task-list')
const closeQuizInfoBtn = document.querySelector('.close-quiz-info-btn')
const quizInfoPlayBtn = document.querySelector('.play-btn')
const quizInfoAddBtn = document.querySelector('.quiz-info-add-btn')
const quizInfoAddQuestion = document.querySelector('.quiz-info-input-question')
const quizInfoAddAnswer = document.querySelector('.quiz-info-input-answer')
const quizInfoError = document.querySelector('.quiz-info-error')
const quizInfoSuccess = document.querySelector('.quiz-info-success')

const quizInfoDeleteBtn = document.querySelector('.quiz-info-delete-btn')
const deleteModal = document.querySelector('.delete-modal')
const deleteYesBtn = document.querySelector('.delete-yes-btn')
const deleteNoBtn = document.querySelector('.delete-no-btn')

let questionWords = []
let answerWords = []
let quizBtn
let taskLi
let liTools
let editBtn
let deleteBtn

const openModal = () => {
	modal.classList.add('show')
}

const closeModal = () => {
	modal.classList.remove('show')
	nextBtn.classList.remove('hide-modal')
	addBtn.classList.add('hide-modal')
	backBtn.classList.add('hide-modal')
	createBtn.classList.add('hide-modal')
	inputGroups.forEach(inputGroup => inputGroup.classList.add('hide-modal'))
	inputGroupName.classList.remove('hide-modal')
	modalSuccess.textContent = ''
	modalError.textContent = ''
}

const checkQuiz = () => {
	const quizName = localStorage.getItem('quizBtn')

	if (quizName) {
		quizBtn = document.createElement('button')
		quizBtn.classList.add('quiz-btn')
		quizBtn.textContent = quizName
		divLink.append(quizBtn)
		openModalBtn.classList.add('hide-modal')
	}
}

const addQuizName = () => {
	if (nameInput.value.trim()) {
		inputGroups.forEach(inputGroup => inputGroup.classList.toggle('hide-modal'))
		nextBtn.classList.toggle('hide-modal')
		addBtn.classList.toggle('hide-modal')
		backBtn.classList.toggle('hide-modal')
		modalError.textContent = ''
		if (questionWords.length > 0) {
			createBtn.classList.remove('hide-modal')
		}
	} else {
		modalError.textContent = 'Musisz uzupełnić pola!'

		setTimeout(() => {
			modalError.textContent = ''
		}, 5000)
	}
}

const backToQuizName = () => {
	inputGroups.forEach(inputGroup => inputGroup.classList.toggle('hide-modal'))
	nextBtn.classList.toggle('hide-modal')
	addBtn.classList.toggle('hide-modal')
	backBtn.classList.toggle('hide-modal')
	createBtn.classList.add('hide-modal')
	modalSuccess.textContent = ''
	modalError.textContent = ''
	questionInput.value = ''
	answerInput.value = ''
}

const addQuestion = () => {
	if (questionInput.value.trim() && answerInput.value.trim()) {
		questionWords.push(questionInput.value)
		answerWords.push(answerInput.value)
		createBtn.classList.remove('hide-modal')
		modalSuccess.textContent = 'Dodano element!'
		modalError.textContent = ''
		questionInput.value = ''
		answerInput.value = ''

		setTimeout(() => {
			modalSuccess.textContent = ''
		}, 5000)
	} else {
		modalError.textContent = 'Musisz uzupełnić pola!'
		modalSuccess.textContent = ''

		setTimeout(() => {
			modalError.textContent = ''
		}, 5000)
	}
}

const createQuiz = () => {
	quizBtn = document.createElement('button')
	quizBtn.classList.add('quiz-btn')
	quizBtn.textContent = nameInput.value
	divLink.append(quizBtn)
	openModalBtn.classList.add('hide-modal')
	modalSuccess.textContent = ''
	modalError.textContent = ''
	closeModal()
	localStorage.setItem('quizBtn', nameInput.value)
	localStorage.setItem('questions', JSON.stringify(questionWords))
	localStorage.setItem('answers', JSON.stringify(answerWords))
}

const quizInfoModal = e => {
	const quizName = localStorage.getItem('quizBtn')
	if (e.target.classList.contains('quiz-btn')) {
		quizInfo.classList.add('show')
		quizInfoName.textContent = quizName
		questionWords = JSON.parse(localStorage.getItem('questions'))
		answerWords = JSON.parse(localStorage.getItem('answers'))
		taskList.textContent = ''
		for (i = 0; i < questionWords.length; i++) {
			taskLi = document.createElement('li')
			taskLi.id = i
			taskLi.innerHTML = `<b>Pytanie:</b> ${questionWords[i]}<br><b>Odpowiedź:</b> ${answerWords[i]}`
			taskList.append(taskLi)

			editBtn = document.createElement('button')
			editBtn.classList.add('edit-btn')
			editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'
			taskLi.append(editBtn)

			deleteBtn = document.createElement('button')
			deleteBtn.classList.add('delete-btn')
			deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>'
			taskLi.append(deleteBtn)
		}
	}
}

const closeQuizInfo = () => {
	quizInfo.classList.remove('show')
	quizInfoSuccess.textContent = ''
	quizInfoError.textContent = ''
}

const quizInfoAddLi = () => {
	if (quizInfoAddQuestion.value.trim() && quizInfoAddAnswer.value.trim()) {
		questionWords = JSON.parse(localStorage.getItem('questions'))
		answerWords = JSON.parse(localStorage.getItem('answers'))
		questionWords.push(quizInfoAddQuestion.value)
		answerWords.push(quizInfoAddAnswer.value)
		taskList.textContent = ''

		for (i = 0; i < questionWords.length; i++) {
			taskLi = document.createElement('li')
			taskLi.id = i
			taskLi.innerHTML = `<b>Pytanie:</b> ${questionWords[i]}<br><b>Odpowiedź:</b> ${answerWords[i]}`
			taskList.append(taskLi)

			editBtn = document.createElement('button')
			editBtn.classList.add('edit-btn')
			editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'
			taskLi.append(editBtn)

			deleteBtn = document.createElement('button')
			deleteBtn.classList.add('delete-btn')
			deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>'
			taskLi.append(deleteBtn)
		}

		localStorage.setItem('questions', JSON.stringify(questionWords))
		localStorage.setItem('answers', JSON.stringify(answerWords))

		quizInfoPlayBtn.classList.remove('hide-modal')
		quizInfoSuccess.textContent = 'Dodano element!'
		quizInfoError.textContent = ''
		quizInfoAddQuestion.value = ''
		quizInfoAddAnswer.value = ''

		setTimeout(() => {
			quizInfoSuccess.textContent = ''
		}, 5000)
	} else {
		quizInfoSuccess.textContent = ''
		quizInfoError.textContent = 'Musisz coś wpisać!'

		setTimeout(() => {
			quizInfoError.textContent = ''
		}, 5000)
	}
}

const deleteQuiz = () => {
	deleteModal.classList.add('show')
	closeQuizInfo()
}

const deleteQuizYes = () => {
	questionWords = []
	answerWords = []
	deleteModal.classList.remove('show')
	openModalBtn.classList.remove('hide-modal')
	taskList.innerHTML = ''
	nameInput.value = ''
	questionInput.value = ''
	answerInput.value = ''
	quizBtn.remove()
	localStorage.clear()
}

const deleteQuizNo = () => {
	deleteModal.classList.remove('show')
	quizInfo.classList.add('show')
	quizInfoSuccess.textContent = ''
	quizInfoError.textContent = ''
}

const deleteTask = e => {
	if (e.target.closest('.delete-btn')) {
		questionWords = JSON.parse(localStorage.getItem('questions'))
		answerWords = JSON.parse(localStorage.getItem('answers'))

		taskList.textContent = ''

		taskLi = e.target.closest('li')
		taskLiId = taskLi.id

		taskLi.remove()

		questionWords.splice(taskLiId, 1)
		answerWords.splice(taskLiId, 1)

		for (i = 0; i < questionWords.length; i++) {
			taskLi = document.createElement('li')
			taskLi.id = i
			taskLi.innerHTML = `<b>Pytanie:</b> ${questionWords[i]}<br><b>Odpowiedź:</b> ${answerWords[i]}`
			taskList.append(taskLi)

			editBtn = document.createElement('button')
			editBtn.classList.add('edit-btn')
			editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'
			taskLi.append(editBtn)

			deleteBtn = document.createElement('button')
			deleteBtn.classList.add('delete-btn')
			deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>'
			taskLi.append(deleteBtn)
		}

		localStorage.setItem('questions', JSON.stringify(questionWords))
		localStorage.setItem('answers', JSON.stringify(answerWords))

		if (questionWords.length === 0) {
			quizInfoPlayBtn.classList.add('hide-modal')
		}
	}
}

const editTask = e => {
	if (e.target.closest('.edit-btn')) {
		questionWords = JSON.parse(localStorage.getItem('questions'))
		answerWords = JSON.parse(localStorage.getItem('answers'))

		taskLi = e.target.closest('li')
		taskLiId = taskLi.id
		taskLi.textContent = ''

		let questInput = document.createElement('input')
		questInput.setAttribute('type', 'text')
		questInput.classList.add('question-input')
		questInput.value = questionWords[taskLiId]
		let ansInput = document.createElement('input')
		ansInput.setAttribute('type', 'text')
		ansInput.classList.add('answer-input')
		ansInput.value = answerWords[taskLiId]

		let questionLabel = document.createElement('b')
		questionLabel.textContent = 'Pytanie: '
		taskLi.append(questionLabel)
		taskLi.append(questInput)

		let br = document.createElement('br')
		taskLi.append(br)

		let answerLabel = document.createElement('b')
		answerLabel.textContent = 'Odpowiedź: '
		taskLi.append(answerLabel)
		taskLi.append(ansInput)

		let confirmBtn = document.createElement('button')
		confirmBtn.classList.add('confirm-btn')
		confirmBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
		taskLi.append(confirmBtn)

		deleteBtn = document.createElement('button')
		deleteBtn.classList.add('delete-btn')
		deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>'
		taskLi.append(deleteBtn)
	}
}

const confirmTask = e => {
	if (e.target.closest('.confirm-btn')) {
		let taskEditError
		taskEditError = document.createElement('p')
		questionWords = JSON.parse(localStorage.getItem('questions'))
		answerWords = JSON.parse(localStorage.getItem('answers'))
		taskLi = e.target.closest('li')
		taskLiId = taskLi.id
		let questInput = taskLi.querySelector('.question-input')
		let ansInput = taskLi.querySelector('.answer-input')
		let existingError = taskLi.querySelector('.task-edit-error')
		if (questInput.value.trim() && ansInput.value.trim()) {
			taskLi.innerHTML = `<b>Pytanie:</b> ${questInput.value}<br><b>Odpowiedź:</b> ${ansInput.value}`

			editBtn = document.createElement('button')
			editBtn.classList.add('edit-btn')
			editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'
			taskLi.append(editBtn)

			deleteBtn = document.createElement('button')
			deleteBtn.classList.add('delete-btn')
			deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>'
			taskLi.append(deleteBtn)

			questionWords.splice(taskLiId, 1, questInput.value)
			answerWords.splice(taskLiId, 1, ansInput.value)

			if (existingError) {
				existingError.remove()
			}

			localStorage.setItem('questions', JSON.stringify(questionWords))
			localStorage.setItem('answers', JSON.stringify(answerWords))
		} else {
			if (!existingError) {
				taskEditError.classList.add('task-edit-error')
				taskEditError.textContent = 'Musisz coś wpisać!'
				taskLi.append(taskEditError)
			}
		}
	}
}

const enterAddQuizName = e => {
	if (e.key === 'Enter') {
		addQuizName()
	}
}

const enterAddQuestion = e => {
	if (e.key === 'Enter') {
		addQuestion()
	}
}

document.addEventListener('DOMContentLoaded', checkQuiz)
document.body.addEventListener('click', quizInfoModal)
document.body.addEventListener('click', deleteTask)
document.body.addEventListener('click', editTask)
document.body.addEventListener('click', confirmTask)
openModalBtn.addEventListener('click', openModal)
closeModalBtn.addEventListener('click', closeModal)
nextBtn.addEventListener('click', addQuizName)
backBtn.addEventListener('click', backToQuizName)
addBtn.addEventListener('click', addQuestion)
createBtn.addEventListener('click', createQuiz)
nameInput.addEventListener('keydown', enterAddQuizName)
questionInput.addEventListener('keydown', enterAddQuestion)
answerInput.addEventListener('keydown', enterAddQuestion)
// quizInfo modal
closeQuizInfoBtn.addEventListener('click', closeQuizInfo)
quizInfoAddBtn.addEventListener('click', quizInfoAddLi)
quizInfoDeleteBtn.addEventListener('click', deleteQuiz)
deleteNoBtn.addEventListener('click', deleteQuizNo)
deleteYesBtn.addEventListener('click', deleteQuizYes)

// 1.

// 4. narzędzia quizów (edytuj, usuń)
// 5. podstrona zakończenia quizu
