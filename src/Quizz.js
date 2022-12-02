import React from "react"
import {nanoid} from "nanoid"
import Answer from "./Answer"

let currentAnswers = []
let points = 0

function Quizz () {

    const [fetchData,setFetchData] = React.useState(()=> {
        fetch("https://opentdb.com/api.php?amount=5")
        .then(response => response.json())
        .then(data => setFetchData({pending: false, data:data.results}))
    }
    )
    const [questions,setQuestions] = React.useState({pending:true,data:[]})
    const [answered,setAnswered] = React.useState(false)


    React.useEffect(() => {
        if(fetchData && !fetchData.pending) {
            const allQuestions = fetchData.data.map(prevQuestion => ({
                ...prevQuestion,
                answers : refactorAnswers(prevQuestion.incorrect_answers,prevQuestion.correct_answer),
                id:nanoid()
            }))
            setQuestions({pending:false,data:allQuestions})
        }
    },[fetchData])


    function refactorAnswers(incorrectAnswers,correctAnswer) {
        let order = Math.floor(Math.random() * (incorrectAnswers.length+1))
        let answers = [...incorrectAnswers]
        answers.push(correctAnswer)
        let tmpAnswer = answers[order]
        answers[order] = answers[answers.length-1]
        answers[answers.length-1] = tmpAnswer
        return answers
    }

    function questionsElement (quest) {
        const questionshtml = quest.data.map(singleQuest => {
            const answersHtml = <div className="answers--container">
                {singleQuest.answers.map(answer => {
                    return (<Answer 
                    key = {nanoid()}
                    id = {singleQuest.id} 
                    value = {answer.replace(/&quot;|&#039;/g, "'")}
                    handleAnswer = {handleAnswer}
                    answered = {answered}
                    checked ={currentAnswers.some(e => e.value === answer.replace(/&quot;|&#039;/g, "'"))}
                    validity = {singleQuest.correct_answer === answer.replace(/&quot;|&#039;/g, "'") ? true : false}
                    disabled = {answered ? true : false}
                    />)
                })} </div>
            return (
                <div key = {nanoid()} className="question--container">
                <h4>{singleQuest.question.replace(/&quot;|&#039;/g, "'")}</h4>
                {answersHtml}
                </div>
            )
        })
        return (
            <div className="questions--container">
                {questionshtml}
            </div>
        )
    }
    
    function handleAnswer(event, questionId, answerValue){
        const answerTmp = {question_id:questionId,value:answerValue,id:event.target.id}
        let isFound = false
        for(let i = 0;i<currentAnswers.length;i++) {
            if(currentAnswers[i].question_id === questionId) {
                isFound = true
                currentAnswers[i] = answerTmp
            }
        }
        if(!isFound){
            currentAnswers.push(answerTmp)
        }
    }

    function checkAnswers(event) {
        event.preventDefault()
        points = 0
        for(let i=0;i<questions.data.length;i++) {
            const answer = currentAnswers.some(e => e.question_id === questions.data[i].id)
            if(answer) {
                const currentAnswer = currentAnswers[currentAnswers.findIndex(e => e.question_id === questions.data[i].id)]
                if(currentAnswer.value === questions.data[i].correct_answer){
                    points +=1
                }
            }
        }
       setAnswered(true)
    }

    function resetQuizz(event) {
        event.preventDefault()
        setAnswered(false)
        fetch("https://opentdb.com/api.php?amount=5")
        .then(response => response.json())
        .then(data => {
            setFetchData({pending: false, data:data.results})
        })
    }

    return (
        <div className="quizz--container">
            <form id="quizz--form">
            {!questions.pending && questionsElement(questions)}
            <div className="quizz--footer">
                {answered && <p className="quizz--results">You scored {points}/{questions.data.length} correct answers</p>}
                {answered ?
                <button className="quizz--check-btn btn" onClick={(event) => resetQuizz(event)}>Play again</button>
                :
                <button className="quizz--check-btn btn" onClick={(event) =>checkAnswers(event)}>Check answers</button>}
            </div>
            </form>
        </div>
    )
}

export default Quizz
