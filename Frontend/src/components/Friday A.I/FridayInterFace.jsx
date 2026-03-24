import { useState, useRef, useEffect } from "react";
import styles from "./FridayInterface.module.css";
import { FaPlus } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import useFeatureTrack from '../../utils/useFeatureTrack';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function FridayInterFace() {
  useFeatureTrack('free-resources');

  const [question,      setQuestion]      = useState("");
  const [messages,      setMessages]      = useState([]);
  const [typing,        setTyping]        = useState(false);
  const [history,       setHistory]       = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [sidebarOpen,   setSidebarOpen]   = useState(false);

  const chatEndRef = useRef(null);

  // ── Auto scroll ──
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // ── Load history from localStorage ──
  useEffect(() => {
    const userId = localStorage.getItem("email"); // ✅ email use karo
    if (!userId) return;
    const savedHistory = localStorage.getItem(`history_${userId}`);
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      setHistory(parsed);
      // Pehli chat automatically load karo
      if (parsed.length > 0) {
        setCurrentChatId(parsed[0].id);
        setMessages(parsed[0].messages);
      }
    }
  }, []);

  // ── New Chat ──
  const handleNewChat = () => {
    const newChat = {
      id:       Date.now(),
      title:    'New Chat',
      messages: []
    };
    setCurrentChatId(newChat.id);
    setMessages([]);

    setHistory(prev => {
      const updated = [newChat, ...prev];
      const userId = localStorage.getItem("email");
      if (userId) {
        localStorage.setItem(`history_${userId}`, JSON.stringify(updated));
      }
      return updated;
    });

    setSidebarOpen(false);
  };

  // ── Send Message ──
  const handleSend = async () => {
    if (question.trim() === "") return;

    // Agar koi chat nahi hai toh auto naya banao
    let chatId = currentChatId;
    if (!chatId) {
      const newChat = {
        id:       Date.now(),
        title:    question.slice(0, 30) + (question.length > 30 ? '…' : ''),
        messages: []
      };
      chatId = newChat.id;
      setCurrentChatId(chatId);
      setHistory(prev => {
        const updated = [newChat, ...prev];
        const userId = localStorage.getItem("email");
        if (userId) {
          localStorage.setItem(`history_${userId}`, JSON.stringify(updated));
        }
        return updated;
      });
    }

    const userQuestion = question;
    setMessages(prev => [...prev, { type: "question", text: userQuestion }]);
    setQuestion("");
    setTyping(true);

    try {
      const res = await fetch("http://localhost:5000/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userQuestion })
      });

      const data = await res.json();
      setTyping(false);
      const answerText = data.answer;

      setMessages(prev => [...prev, { type: "answer", text: answerText }]);

      // ── History save karo ──
      const userId = localStorage.getItem("email");
      setHistory(prev => {
        const updated = prev.map(chat =>
          chat.id === chatId
            ? {
                ...chat,
                // Pehle message se title set karo
                title: chat.messages.length === 0
                  ? userQuestion.slice(0, 30) + (userQuestion.length > 30 ? '…' : '')
                  : chat.title,
                messages: [
                  ...chat.messages,
                  { type: "question", text: userQuestion },
                  { type: "answer",   text: answerText }
                ]
              }
            : chat
        );
        if (userId) {
          localStorage.setItem(`history_${userId}`, JSON.stringify(updated));
        }
        return updated;
      });

    } catch (error) {
      setTyping(false);
      setMessages(prev => [
        ...prev,
        { type: "answer", text: "⚠ Server Error. Try again later." }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // ── Delete chat ──
  const handleDeleteChat = (e, chatId) => {
    e.stopPropagation();
    const userId = localStorage.getItem("email");
    setHistory(prev => {
      const updated = prev.filter(c => c.id !== chatId);
      if (userId) {
        localStorage.setItem(`history_${userId}`, JSON.stringify(updated));
      }
      return updated;
    });
    // Agar yahi chat open thi toh clear karo
    if (currentChatId === chatId) {
      setMessages([]);
      setCurrentChatId(null);
    }
  };

  return (
    <div className={styles.wrapper}>

      {/* ── Overlay ── */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── LEFT PANEL ── */}
      <div className={`${styles.SettingPannel} ${sidebarOpen ? styles.sidebarOpen : ''}`}>

        {/* Mobile close button */}
        <button
          className={styles.closeBtn}
          onClick={() => setSidebarOpen(false)}
        >
          ✕ Close
        </button>

        {/* New Chat Button */}
        <div className={styles.NewChat} onClick={handleNewChat}>
          <FaPlus />
          <span>New Chat</span>
        </div>

        {/* History Label */}
        <div style={{
          fontSize: '.7rem',
          color: '#475569',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          padding: '4px 2px',
          fontWeight: 600
        }}>
          Recent Chats
        </div>

        {/* Chat History List */}
        <div className={styles.HistoryChats}>
          {history.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '24px 10px',
              color: '#475569',
              fontSize: '.82rem',
              lineHeight: 1.6
            }}>
              📭 No chats yet.<br />
              Start a new chat!
            </div>
          ) : (
            history.map(chat => (
              <div
                key={chat.id}
                className={`${styles.historyItem} ${
                  currentChatId === chat.id ? styles.historyItemActive : ''
                }`}
                onClick={() => {
                  setCurrentChatId(chat.id);
                  setMessages(chat.messages);
                  setSidebarOpen(false);
                }}
              >
                {/* Chat title */}
                <div style={{
                  fontSize: '.84rem',
                  fontWeight: 500,
                  marginBottom: 3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  paddingRight: 20,
                }}>
                  💬 {chat.title || 'New Chat'}
                </div>
                {/* Messages count */}
                <div style={{
                  fontSize: '.72rem',
                  color: '#475569',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>{chat.messages.length} messages</span>
                  {/* Delete button */}
                  <button
                    onClick={(e) => handleDeleteChat(e, chat.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#475569',
                      cursor: 'pointer',
                      fontSize: '.8rem',
                      padding: '2px 4px',
                      borderRadius: 4,
                      lineHeight: 1,
                      transition: 'color .15s'
                    }}
                    onMouseEnter={e => e.target.style.color = '#ef4444'}
                    onMouseLeave={e => e.target.style.color = '#475569'}
                    title="Delete chat"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className={styles.OutputPannel}>

        {/* Mobile Header */}
        <div className={styles.mobileHeader}>
          <button
            className={styles.sidebarToggle}
            onClick={() => setSidebarOpen(true)}
          >
            ☰ Chats
          </button>
          <span className={styles.mobileTitle}>🤖 Friday AI</span>
        </div>

        {/* Chat Messages */}
        <div className={styles.DisplayScreen}>

          {/* Welcome message */}
          {messages.length === 0 && (
            <div style={{
              textAlign: 'center',
              margin: 'auto',
              color: '#475569',
              padding: '40px 20px'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>🤖</div>
              <div style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#94a3b8',
                marginBottom: 8
              }}>
                Friday AI
              </div>
              <div style={{ fontSize: '.85rem', color: '#475569' }}>
                Ask any IT or Computer Science question!
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.type === "question"
                  ? styles.userMessage
                  : styles.botMessage
              }
            >
              {msg.type === "answer" ? (
                <div>
                  <h2 className={styles.answerHeading}>AI Answer</h2>
                  <ReactMarkdown
                    components={{
                      code({ inline, className, children }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline ? (
                          <div style={{ position: "relative" }}>
                            <button
                              onClick={() =>
                                navigator.clipboard.writeText(children)
                              }
                              style={{
                                position: "absolute",
                                right: "10px", top: "10px",
                                background: "#333", color: "#fff",
                                border: "none", padding: "4px 8px",
                                cursor: "pointer", fontSize: "12px",
                                borderRadius: "4px"
                              }}
                            >
                              Copy
                            </button>
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match ? match[1] : "javascript"}
                              PreTag="div"
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code className={className}>{children}</code>
                        );
                      }
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              ) : (
                msg.text
              )}
            </div>
          ))}

          {typing && (
            <div className={styles.botMessage}>
              🤖 Friday is thinking...
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className={styles.InputPannel}>
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask IT / Computer Science question..."
            className={styles.InputBox}
          />
          <button className={styles.SendButton} onClick={handleSend}>
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default FridayInterFace;