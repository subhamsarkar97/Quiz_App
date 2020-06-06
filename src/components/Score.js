import React from "react";

const Score = ({score,playAgain}) => {
    return(
        <div className = "score-board">
            <div className = "score">
                You scored {score}/10 correct answers
            </div>
            <button className = "playBtn" onClick = {playAgain} >PLay Again!</button>
        </div>
    )
}
    



export default Score