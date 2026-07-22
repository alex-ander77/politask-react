import { useEffect, useRef, useState } from "react";
import "./Chatbot.css";

import { modelPoliBot } from "../../firebase";

const FAQ_QUESTIONS = [
  "¿Cómo publico una tarea?",
  "¿Cómo funcionan los puntos?",
  "¿Qué recompensa puedo canjear?",
  "¿Cómo modifico una tarea?",
];

function Chatbot() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "¡Hola! Soy PoliBot 🤖. ¿En qué te puedo ayudar hoy?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      chatEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, isTyping, open]);

  const handleSend = async (queryText = "") => {
    const textToSend = queryText || input;

    if (!textToSend.trim() || isTyping) {
      return;
    }

    const userMessage = textToSend.trim();

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");
    setIsTyping(true);

    try {
      const prompt = `
        El usuario de PoliTask pregunta:

        "${userMessage}"

        Responde en español, de forma breve, clara y amable.
      `;

      const result = await modelPoliBot.generateContent(prompt);

      const responseText = result.response.text();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            responseText ||
            "No pude generar una respuesta en este momento.",
        },
      ]);
    } catch (error) {
      console.error("Error al consultar Gemini:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "No pude conectarme con la inteligencia artificial. Inténtalo nuevamente.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      <button
        className="chatbot-toggle"
        onClick={() => setOpen(!open)}
      >
        {open ? "✕" : "💬 PoliBot"}
      </button>

      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>PoliBot 🤖</h3>
            <p>Asistente virtual de Poli-Task</p>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={`${msg.sender}-${index}`}
                className={`chat-message ${msg.sender}`}
              >
                <div className="message-bubble">
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message bot">
                <div className="message-bubble typing-indicator">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <div className="chatbot-faqs">
            <p>Preguntas frecuentes:</p>

            <div className="faq-buttons">
              {FAQ_QUESTIONS.map((question, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={isTyping}
                  onClick={() => handleSend(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <form
            className="chatbot-input-area"
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={input}
              disabled={isTyping}
              onChange={(event) =>
                setInput(event.target.value)
              }
            />

            <button
              type="submit"
              disabled={isTyping}
            >
              {isTyping ? "Pensando..." : "Enviar"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;