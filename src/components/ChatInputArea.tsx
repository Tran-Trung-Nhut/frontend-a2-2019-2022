export default function ChatInputArea ({
    content,
    setContent,
    handleSendMessage
} : {
    content: string
    setContent: (content: string) => void
    handleSendMessage: () => void
}) {
    return(
        <>
            <textarea
            value={content}
            placeholder="Soạn tin nhắn"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring text-[#3f8c73] border-[#49a185] shadow-sm resize-none"
            onChange={(e) => setContent(e.target.value)}
            rows={1}
            />
            <button 
            className="px-4 py-2 bg-[#7ca89a] text-white rounded-lg hover:bg-[#49a185] transition-all transform hover:scale-110"
            onClick={() => handleSendMessage()}>
            Gửi
            </button>
        </>
    )
}