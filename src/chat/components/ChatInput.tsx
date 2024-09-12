export default function ChatInput({ 
  message, 
  onMessageChange, 
  onSendMessage 
} : {
  message: string,
  onMessageChange: (message: string) => void,
  onSendMessage: () => void
}) {
  return (
    <div className="flex">
      <textarea className="flex-grow p-2 h-10 rounded-lg border border-gray-300 text-slate-900 focus:ring-2 focus:ring-blue-500" placeholder="Platica con Empry" value={message} onChange={(e) => onMessageChange(e.target.value)} />
      <button className="h-10 px-6 font-semibold rounded-md text-white" onClick={onSendMessage}>Enviar</button>
    </div>
  );
}