import React, { useContext, useRef } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
    const { onSent, showResult, setInput, recentPrompt, resultData, loading, input } = useContext(Context);
    const inputRef = useRef(null);  // Reference for input field

    // Focus the input when the send button is clicked
    const handleButtonFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleSend = () => {
        if (input.trim() !== '') {
            onSent();  // Call the send function
            setInput('');  // Immediately clear the input field
            handleButtonFocus(); // Focus back on input after sending
        }
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User Icon" />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet" style={{ marginTop: "-35px"}}>
                            <p style={{marginLeft:"-72%"}}><span>Hello, Dev.</span></p>
                            <p style={{marginLeft:"-34%"}}>How can I help you today?</p>
                        </div>
                        <div className="cards" style={{marginTop:"-80px"}}>
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="Compass Icon" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="Bulb Icon" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="Message Icon" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="Code Icon" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="User Icon" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="Gemini Icon" />
                            {loading ? (
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            ref={inputRef}  // Attach the ref to the input field
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder='Enter a prompt here'
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()} // Handle Enter key to send prompt
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="Gallery Icon" />
                            <img src={assets.mic_icon} alt="Mic Icon" />
                            <button
                                onClick={handleSend}  // Use the handleSend function
                                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                            >
                                {input ? <img src={assets.send_icon} alt="Send Icon" /> : null}
                            </button>
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Gemini may display inaccurate info, including about people, so double-check its responses. <u>Your privacy & Gemini Apps</u>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
