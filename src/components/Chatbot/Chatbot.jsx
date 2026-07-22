import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const FAQ_RESPONSES = {
  '¿Cómo publico una tarea?': 'Para publicar una tarea, ve a la sección "Nueva Tarea", completa el formulario y haz clic en Publicar.',
  '¿Cómo funcionan los puntos?': 'Ganas puntos asignados a cada tarea una vez que el creador apruebe tu entrega.',
  '¿Qué recompensa puedo canjear?': 'Puedes canjear tus puntos acumulados en la sección Rewards por beneficios exclusivos.',
  '¿Cómo modifico una tarea?': 'En tu Dashboard, busca la tarea en la lista y selecciona la opción Editar.'
};

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Hola! Soy PoliBot 🤖. ¿En qué te puedo ayudar hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, open]);

  const handleSend = (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    // 1. Agregar mensaje del usuario
    const newMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    if (!queryText) setInput('');

    // 2. Simular respuesta del bot
    setIsTyping(true);

    setTimeout(() => {
      const responseText =
        FAQ_RESPONSES[textToSend] ||
        'Lo siento, aún estoy aprendiendo. Intenta seleccionar una de las preguntas frecuentes arriba o reformula tu duda.';

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: responseText }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="chatbot-wrapper">
      {/* Botón flotante para abrir/cerrar */}
      <button className="chatbot-toggle" onClick={() => setOpen(!open)}>
        {open ? '✕' : '💬 PoliBot'}
      </button>

      {/* Ventana de Chat */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>PoliBot 🤖</h3>
            <p>Asistente virtual de Poli-Task</p>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message bot">
                <div className="message-bubble typing-indicator">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Opciones Rápidas (FAQs) */}
          <div className="chatbot-faqs">
            <p>Preguntas frecuentes:</p>
            <div className="faq-buttons">
              {Object.keys(FAQ_RESPONSES).map((question, i) => (
                <button key={i} onClick={() => handleSend(question)}>
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Formulario de Input */}
          <form
            className="chatbot-input-area"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;