
function Home (prop) {
    return (
    <div className="home--container">
        <h1 className="home--title">Quizzical</h1>
        <h3 className="home--subtitle">Test your knowledge on any subject!</h3>
        <button className="home--start-btn btn" onClick={prop.startGame}>Start quiz</button>
    </div>
    )
}

export default Home