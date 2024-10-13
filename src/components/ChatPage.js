import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import { FaPaperPlane } from "react-icons/fa";
import { HfInference } from "@huggingface/inference";
import "../index.css";

const ChatPage = ({ chatMessages, setChatMessages }) => {
  const { isDarkMode } = useTheme();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(chatMessages || []);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");

  const inference = new HfInference(process.env.REACT_APP_HUGGING_FACE_API_KEY);

  useEffect(() => {
    const storedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(storedMessages);
  }, []);

  const saveMessagesToLocalStorage = (messages) => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  };

  const sendMessage = async () => {
    if (message.trim()) {
      const userMessage = { text: message, user: "You" };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      saveMessagesToLocalStorage(updatedMessages);
      setMessage("");
      setLoading(true);

      try {
        let aiResponse = "";
        const chefInstruction =
          "Imagine you are a professional chef who knows only cooking and recipe sharing. Please respond only with cooking-related answers.";

        const promptWithRole = [
          { role: "system", content: chefInstruction },
          { role: "user", content: message },
        ];

        for await (const chunk of inference.chatCompletionStream({
          model: "mistralai/Mistral-Nemo-Instruct-2407",
          messages: promptWithRole,
          max_tokens: 500,
        })) {
          aiResponse += chunk.choices[0]?.delta?.content || "";
        }

        if (aiResponse.includes("silence")) {
          aiResponse =
            "I'm sorry, I couldn't generate a meaningful response. Please try rephrasing your question.";
        }
        if (aiResponse.includes("illementillement")) {
          aiResponse =
            "I'm sorry, I couldn't generate a meaningful response. Please try rephrasing your question.";
        }

        const aiMessage = { text: aiResponse.trim(), user: "AI" };
        const finalMessages = [...updatedMessages, aiMessage];
        setMessages(finalMessages);
        saveMessagesToLocalStorage(finalMessages);
      } catch (error) {
        console.error("Error fetching AI response:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 300);
      return () => clearInterval(interval);
    }
    setDots("");
  }, [loading]);

  return (
    <div
      className={`h-[84vh] flex flex-col ${isDarkMode ? "dark" : ""}`}
      style={{ overflowX: "hidden" }}
    >
      <div className="flex flex-row flex-1">
        {/* Chat messages area */}
        <div className="flex-1 p-4 bg-gray-100 dark:bg-[#140f00] text-black dark:text-white">
          <div className="max-w-screen-md w-full mx-auto">
            {messages.map((msg, index) => (
              <div key={index} className="mb-4 flex">
                {msg.user === "You" ? (
                  <div
                    className="ml-auto p-3 rounded-lg shadow-lg"
                    style={{
                      backgroundColor: isDarkMode ? "#2b2b2b" : "#e0e0e0",
                      color: isDarkMode ? "white" : "black",
                      maxWidth: "75%",
                      whiteSpace: "pre-wrap",
                      overflowWrap: "normal",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {msg.text}
                  </div>
                ) : (
                  <div
                    className="mr-auto p-3 rounded-lg shadow-lg"
                    style={{
                      backgroundColor: isDarkMode ? "#1b1b1b" : "#f1f1f1",
                      color: isDarkMode ? "white" : "black",
                      maxWidth: "75%",
                      whiteSpace: "pre-wrap",
                      overflowWrap: "normal",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {msg.text}
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex items-center mb-4 p-2 rounded-lg self-start text-left mr-auto dark:text-white w-full sm:max-w-md">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                </div>
                <span className="ml-2">AI is generating a response{dots}</span>{" "}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input area with button inside */}
      <div className="p-4 bg-white dark:bg-[#140f00] flex items-center max-w-screen-md w-full mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="w-full p-3 pr-12 border rounded-lg bg-gray-200 dark:bg-[#140f00] text-black dark:text-white"
            style={{ minWidth: "0" }}
          />
          <button
            onClick={sendMessage}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2"
            title="Send"
          >
            <FaPaperPlane size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
