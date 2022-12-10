import Head from 'next/head';
import { useState } from 'react';


const Home = () => {
const [userInput, setUserInput] = useState('');
const [userQuestionType, setUserQuestionType] = useState('');
const [userSubject, setUserSubject] = useState('');
const [apiOutput, setApiOutput] = useState('');
const [isGenerating, setIsGenerating] = useState(false);
const [show, setShow] = useState(false);

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput, userQuestionType, userSubject }),
  });

  const data = await response.json();
  const { output } = data;

  setApiOutput(`${output.text}`);
  console.log({apiOutput});
  setIsGenerating(false);
  setShow(true);
}


const onUserChangedText = (event) => {
  setUserInput(event.target.value);
  console.log({userInput});
}

const selectQuestionType = (event) => {
  setUserQuestionType(event.target.value);
  console.log({userQuestionType});
}

const enterSubject = (event) => {
  setUserSubject(event.target.value);
  console.log({userSubject});
}

const clearForm = (event) => {
  setUserInput('');
  setShow(false);
  setApiOutput('');
  setIsGenerating(false);
}


  return (
    <div className="page">
      <div className="topHalfPage">
        <div>
          <a 
          className={isGenerating ? 'generate-button-loading' : 'generate-button'}
          onClick={callGenerateEndpoint}>
            <div className='generate'>
              {isGenerating ? <span className='loader'></span> : <p>🪄 Jurnee work your magic</p>}
            </div>
          </a>
        </div>
      </div>
     <div className="bottomHalfPage">
        <div className="inputs">
        <div className="question">
              <div>
                <label>What's your question?</label>
              </div>
              <div>
              < textarea placeholder='Ask or paste your question here' 
                className='prompt-box'
                value={userInput}
                 onChange={onUserChangedText}/>
              </div>
          </div>
          <div className="type">
            <div>
              <label> What type of question do you need help with?</label>
            </div>
            <div>
              <select style={{width: "337px", height: "30px"}} onChange={selectQuestionType}>
                <option value='True or false'>True or false</option>
                <option value='Multiple choice'>Multiple choice</option>
                <option value='Short essay'>Short essay</option>
                <option value='Fill in the blank'>Fill in the blank</option>
                <option value='Math problem'>Math problem</option>
              </select>
            </div>
          </div>
          <div className="subject">
              <div>
                <label>What course is this for?</label>
              </div>
              <div>
                <input style={{width: "337px", height: "30px"}} type='text' name='course' onChange={enterSubject}/>
              </div>
          </div>
          <div className='clearInputs'
          onClick={clearForm}>
            <button>clear inputs</button>
          </div>
        </div>
        <div className="outputs">
          <div className={show ? 'whatToExpectHide' : 'whatToExpect'}>
            <div className='whatToExpectHeadline'>
              <p>What to expect from Jurnee 🔮</p>
            </div>
            <div className={show ? 'whatToExpectSubHeadlineHide' : 'whatToExpectSubHeadline'}>
              <p className='subheadlineCopy'>When you ask Jurnee questions, you will get answers that are unique and most find exceptional. 
                Jurnee is a computer program that can think and write like a person because 
                it has read a lot of information online.</p>
            </div>
          </div>
          <div className={show ? 'questionOutput' : 'questionOutputHide'}>
            <p>👀 {userInput}</p>
          </div>
          <div className={show ? 'responseHeading' : 'responseHeadingHide'}>
            <p>🤖's thoughts:</p>
          </div>
          <div className={show ? 'aiResponse' : 'aiResponseHide'}>
            <p>{apiOutput}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
