import React, { useState, useRef, useEffect } from "react";
import { generateResponse } from "../../utils/AiService";
import ReactMarkdown from "react-markdown";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isAiWriting, setIsAiWriting] = useState(false);
  const chatBoxRef = useRef(null);

  const handleSend = async () => {
    setIsAiWriting(true);
    setMessages([
      ...messages,
      { text: input, sender: "user" },
      { text: "", sender: "AI" },
    ]);
    setInput("");

    const aiResponse = await generateResponse(
      input,
      messages.map((message) => ({
        role: message.sender,
        message: message.text,
      }))
    );
    let aiMessage = "";

    for (let i = 0; i < aiResponse.length; i++) {
      setTimeout(() => {
        aiMessage += aiResponse[i];
        setMessages((prevMessages) => {
          let newMessages = [...prevMessages];
          newMessages[newMessages.length - 1] = {
            text: aiMessage,
            sender: "AI",
          };
          return newMessages;
        });
        if (i === aiResponse.length - 1) {
          setIsAiWriting(false);
        }
      }, 50 * (i + 1));
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const askInitialQuestion = async () => {
      const initialQuestion = "What concept are you trying to understand";
      const response = await generateResponse(initialQuestion);
      setMessages([{ text: response, sender: "AI" }]);
    };
    askInitialQuestion();
  }, []);

  return (
    <div className="w-screen flex justify-center border-8 h-full ">
      <div className="flex flex-col items-center justify-center w-full h-full  p-4 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-green-700">Neural</span> Feeder
        </h1>

        <div
          ref={chatBoxRef}
          className="overflow-y-auto h-full mb-4 w-full border  border-gray-200 rounded p-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${
                message.sender === "user" ? "text-right" : ""
              }`}>
              <span className="font-bold mr-2">{message.sender}:</span>
              <div
                className={`inline-block max-w-[50%] ${
                  message.sender === "user"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-black"
                } rounded px-2 py-1`}>
                {message.sender === "AI" ? (
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                ) : (
                  message.text
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex ">
          <textarea
            className="flex-grow border border-gray-200 rounded p-2 mr-2 resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            onClick={isAiWriting ? null : handleSend}
            disabled={isAiWriting}>
            {isAiWriting ? "AI is writing..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
