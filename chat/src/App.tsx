import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: "user" | "model";
  parts: { text: string }[];
}

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", parts: [{ text: input }] };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages
        }),
      });

      const data = await response.json();

      const botMsg: Message = {
        role: "model",
        parts: [{ text: data.response }]
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cleanHistory = () => {
    if (isLoading) return;
    if (messages.length === 0) return;
    confirm("Tem certeza que deseja limpar o histórico de mensagens?")
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-slate-800 text-white p-4 shadow-md text-center">
        <h1 className="text-xl font-bold tracking-widest">KUROBOT</h1>
        <p className="text-xs text-slate-400">Powered by <a className="underline" target='_blank' rel="noreferrer" href="https://github.com/MiguelRAlves/">MiguelRAlves</a></p>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${msg.role === 'user'
              ? 'bg-blue-600 text-white rounded-tr-none'
              : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
              }`}>
              {msg.role === 'user' ? (
                msg.parts[0].text
              ) : (
                <div className="prose prose-sm sm:prose-base max-w-none prose-pre:bg-slate-900 prose-pre:text-slate-100">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.parts[0].text}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Indicador de Digitação */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm">
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.3s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.5s]"></span>
              </span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </main>

      {/* Input Area */}
      <footer className="p-4 flex bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            className="flex-1 p-3 min-w-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Pergunte qualquer coisa ao Kurobot..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors shadow-lg"
          >
            Enviar
          </button>
        </div>
        <div className="flex justify-end mt-2">
          <button
            onClick={cleanHistory}
            className="bg-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-lg"
          >
            Limpar Histórico
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;