import React, { useState } from "react";
import { TypeAnimation } from 'react-type-animation';


const pageStyles = {
  color: "#232129",
  paddingLeft: 96,
  paddingRight: 96,
  paddingTop: 40,
  fontFamily: "SF Compact Display, Roboto, sans-serif, serif",
  height: "100vh"
};

const headingStyles = {
  marginTop: 0,
  marginBottom: 24,
  maxWidth: "100%"
};

const headingAccentStyles = {
  color: "#663399"
};

const subHeadingAccentStyles = {
  color: "#ff624"
};
const heroText = {
  color: "#663399"}
const IndexPage = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingMessage, setTypingMessage] = useState("");
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async () => {
    try {
      const userMessage = { text: prompt, fromUser: true };
      setPrompt(""); // Clearing prompt input
      setMessages(prevMessages => [...prevMessages, userMessage]); // Appending user message
      setLoading(true)
      
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "orca-mini",
        prompt: prompt
      })
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const responseData = await response.text(); // Read response as text
    const formattedResponse = `[${responseData.replace(/\n/g, ',')}]`; // Concatenate JSON objects into an array
    const parsedResponse = JSON.parse(formattedResponse); // Parse the JSON

    const responses = parsedResponse.map(data => data.response);
    // Appending API responses after user message
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        ...responses.map(response => ({ text: response, fromUser: false }))
      ]);
    }, 0);
    setLoading(false)
  } catch (error) {
    console.error("Error:", error);
  }
  };
  
  return (
    <main
      style={pageStyles}
      className="flex flex-col items-start justify-between bg-slate-white h-screen"
    >
      <h1 className="font-semibold flex-col items-center justify-between w-full" style={headingStyles}>
        <div>
        <div className="flex items-center justify-start w-content">
          <div className="text-2xl">orca mini</div>
          <img
            alt="Gatsby G Logo"
            src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
          />
        </div>

        <div className="text-sm text-black focus:text-black ">
          <a href="#" onClick={(e) => {}}>Login</a>
        </div>
        </div>
        <hr className="h-2 w-full" />

      </h1>
      
      {(messages.length>0)?<>
      <div className="messages-container w-full h-full overflow-y-scroll">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start justify-${message.fromUser ? 'start' : 'start'} my-3`}>
            {message.fromUser && <img className="w-7 rounded-full shadow mr-3" src="static/upstream_1.png" alt="" />}
            <span className={`text-md font-semibold p-1 ${message.fromUser ? 'bg-slate-200' : ''}`}>{message.text}</span>
            {!message.fromUser && <img className="w-7 rounded-full shadow ml-3" src="static/vibrent_25.png" alt="" />}
          </div>
        ))}
        {loading?<>Loading</>:<></>}
        {typingMessage && (
          <div className="flex items-start justify-start my-3">
            <span className="text-md font-semibold p-1">{typingMessage}</span>
          </div>
        )}
      </div>
      </> : <>
      <div class="hero-landing w-full h-full">
        <div class="text-xl font-semibold flex items-center justify-center w-full h-full">
          
                <TypeAnimation
              sequence={[
                'One', // Types 'One'
                1000, // Waits 1s
                'Two', // Deletes 'One' and types 'Two'
                2000, // Waits 2s
                'Two Three', // Types 'Three' without deleting 'Two'
                () => {
                  console.log('Sequence completed');
                },
              ]}
              
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={heroText}
            />

        </div>
      </div>
      </>}

      <div className="input-container w-full mb-5 p-2 ">
        <hr className="h-2" />
        <div className=" flex rounded items-center">
          <input
            className="bg-white rounded-sm focus:border-purple-400 shadow  placeholder-slate-400 border border-slate-300 w-full p-2 mr-2 focus:border-transparent text-lg font-regular "
            type="text"
            placeholder="Enter prompt"
            required
            columns={1}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="focus:border-purple-400 rounded-full bg-purple-800 text-white w-10 h-10 text-lg ml-2 flex items-center justify-center shadow"
            onClick={handleSubmit}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
      
    </main>
  );
};

export default IndexPage;
