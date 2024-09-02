import { useEffect, useState, useContext } from 'react';
import GeminiAPI from './data/GeminiAPI';
import { IoArrowBackOutline } from 'react-icons/io5';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';


enum SideEffect {
  idle,
  sendMessage,
}

export type Message = {
  role: string,
  content: string
}

export default function Chat({ geminiKey, systemInstructions } : { geminiKey: string, systemInstructions: string }) {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  //const [user, setUser] = useState<User | null>(null);
  const [sideEffect, setSideEffect] = useState<SideEffect>(SideEffect.idle);

  /*useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);*/

  async function sendMessage() {
    const generateContentResponse = await GeminiAPI.generateContent(systemInstructions, "", {
      contents: messages.map((message) => ({
        role: message.role,
        parts: [ { text: message.content } ]
      }))
    }, geminiKey);
    let content;
    if (generateContentResponse.error) {
      content = generateContentResponse.error.message;
    } else {
      content = generateContentResponse.candidates[0].content.parts[0].text;
    }
    setMessages([...messages, {
      role: "model",
      content: content
    }])
  }

  useEffect(() => {
    if (sideEffect === SideEffect.sendMessage) {
      sendMessage();
      setSideEffect(SideEffect.idle);
    }
  }, [sideEffect]);

  return (
    <div className='h-full flex flex-col'>
      {/* Encabezado */}
      <header className="shrink-0 leading-none flex items-center bg-botticelli rounded-t-lg py-4 px-4 text-slate-50">
        <a className="" href="./">
          <IoArrowBackOutline className='size-8'/>
        </a>
        <h1 className="text-2xl font-bold px-4">
          Empry 0.0.2
        </h1>
        <span className='grow'></span>
        <span className='bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-full text-white py-2 px-2'>Experimental</span>
      </header>

      {
        messages.length === 0 
        ? <div className='shrink-0 flex flex-row w-full p-4'>
        <button className='w-1/2 border-2 p-2 m-2 rounded-lg text-start' onClick={() => {
          const message = '¿Podrías ayudarme a calcular las Units Económics de mi Startup?';
          if (message.trim() !== '') {
            setMessages([...messages, {
              role: 'user',
              content: message
            }]);
          }
          setMessage("");
          setSideEffect(SideEffect.sendMessage)
        }}>
          ¿Podrías ayudarme a calcular las Units Económics de mi Startup?
        </button>
        <button className='w-1/2 border-2 p-2 m-2 rounded-lg text-start' onClick={() => {
          const message = '¿Podrías ayudarme a evaluar mis preguntas para ver si pasan "The Mom Test"?';
          if (message.trim() !== '') {
            setMessages([...messages, {
              role: 'user',
              content: message
            }]);
          }
          setMessage("");
          setSideEffect(SideEffect.sendMessage)
        }}>
          ¿Podrías ayudarme a evaluar mis preguntas para ver si pasan "The Mom Test"?
        </button>
      </div>
      : <></>
      }

      <ChatMessages messages={messages}/>
      {/* Campo de Entrada */}
      <footer className="shrink-0 rounded-b-lg p-4">
        <ChatInput
          message={message}
          onMessageChange={(message) => {
            setMessage(message)
          }}
          onSendMessage={() => {
            if (message.trim() !== '') {
              setMessages([...messages, {
                role: 'user',
                content: message
              }]);
            }
            setMessage("");
            setSideEffect(SideEffect.sendMessage)
          }}/>
      </footer>
    </div>
  )
}