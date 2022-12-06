import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';


const Home = () => {
const [userInput, setUserInput] = useState('');
const [apiOutput, setApiOutput] = useState('');
const [isGenerating, setIsGenerating] = useState(false);

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}


const onUserChangedText = (event) => {
  setUserInput(event.target.value);
}


  return (
    <div className="root">
      <Head>
        <title>Jurnee 🤓</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Ace this semester with ease 😎</h1>
          </div>
          <div className="header-subtitle">
            <h2>Jurnee is your AI-powered study buddy, helping you effortlessly breeze through assignments, craft top-notch papers, and achieve your best grades yet.</h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
        <textarea placeholder='Ask or paste your question here' 
        className='prompt-box'
        value={userInput}
        onChange={onUserChangedText}/>
        <div>
          <a 
          className={isGenerating ? 'generate-button-loading' : 'generate-button'}
          onClick={callGenerateEndpoint}>
            <div className='generate'>
              {isGenerating ? <span className='loader'></span> : <p>🪄 Jurnee work your magic</p>}
            </div>
          </a>
        </div>
        {apiOutput && (
        <div className='output'>
           <div className='output-header-container'>
             <div className='output-header'>
              <h3>Output</h3>
             </div>
           </div>
           <div className='output-content'>
            <p>{apiOutput}</p>
           </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Home;
