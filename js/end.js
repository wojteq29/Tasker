const result = document.querySelector('.result')

let correctAnswers = JSON.parse(localStorage.getItem('correctAnswers'))
let questionWords = JSON.parse(localStorage.getItem('questions'))

const handleResult = () => {
    let NumOfAnswers = correctAnswers.length
    let NumOfQuestions = questionWords.length
    result.textContent = `Odpowiedziałeś/aś na ${NumOfAnswers}/${NumOfQuestions} bez odpowiedzi!`
}

document.addEventListener('DOMContentLoaded', handleResult)
