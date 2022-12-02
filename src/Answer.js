
import {nanoid} from "nanoid"

function Answer(prop) {

    const id = nanoid()

    return (
        <div className="answer--container">
                <input type="radio" disabled = {prop.disabled} id={id} name={prop.id} className="answer"/>
                <label 
                className={prop.answered ? "answered " + (prop.checked ? "checked " : "unchecked ") + (prop.validity ? "valid " : "invalid ")
                 : ""}
                id={nanoid()} 
                htmlFor={id} 
                onClick={(event)=> prop.handleAnswer(event,prop.id,prop.value)}>
                {prop.value}
                </label>
        </div>
    )
}

export default Answer