import { useState, useRef, useEffect } from "react";
import styles from "./FridayInterface.module.css";
import { FaPlus } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// ── FIX 1: No more hardcoded localhost ──
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ── Markdown component overrides for professional styling ──
const mdComponents = {
  // FIX 2: No deprecated inline prop — detect block by className
  code({ node, className, children, ...props }) {
    const [copied, setCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || "");
    const isBlock = !!className || String(children).includes("\n");

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        const el = document.createElement("textarea");
        el.value = String(children).replace(/\n$/, "");
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    };

    if (isBlock) {
      return (
        <div style={{ position: "relative", margin: "12px 0" }}>
          {/* Language badge */}
          {match && (
            <div style={{
              position: "absolute", left: 12, top: 10,
              fontSize: "10px", color: "#64748b",
              textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700,
              zIndex: 2,
            }}>
              {match[1]}
            </div>
          )}
          <button
            onClick={handleCopy}
            style={{
              position: "absolute", right: 10, top: 8,
              background: "#1e293b",
              color: copied ? "#22c55e" : "#64748b",
              border: `1px solid ${copied ? "#22c55e" : "#334155"}`,
              padding: "3px 10px", cursor: "pointer",
              fontSize: "11px", borderRadius: "4px",
              zIndex: 2, transition: "all .15s", fontFamily: "inherit",
            }}
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <SyntaxHighlighter
            style={oneDark}
            language={match ? match[1] : "text"}
            PreTag="div"
            customStyle={{
              borderRadius: 10,
              fontSize: ".82rem",
              margin: 0,
              paddingTop: match ? "2rem" : "1rem",
              border: "1px solid #1e293b",
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      );
    }

    return (
      <code style={{
        background: "#0f2027",
        border: "1px solid #1e293b",
        padding: "2px 7px",
        borderRadius: 5,
        fontSize: ".83em",
        color: "#84cc16",
        fontFamily: "'Fira Code', monospace",
      }} {...props}>
        {children}
      </code>
    );
  },

  // Headings
  h1: ({ children }) => (
    <h1 style={{
      fontSize: "1.15rem", fontWeight: 700, color: "#f1f5f9",
      borderBottom: "2px solid #1e293b", paddingBottom: 6,
      margin: "16px 0 10px",
    }}>{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 style={{
      fontSize: "1rem", fontWeight: 700, color: "#84cc16",
      margin: "14px 0 8px", display: "flex", alignItems: "center", gap: 6,
    }}>
      <span style={{
        width: 3, height: 16, background: "#84cc16",
        borderRadius: 2, display: "inline-block",
      }} />
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{
      fontSize: ".92rem", fontWeight: 600, color: "#94a3b8",
      margin: "12px 0 6px",
    }}>{children}</h3>
  ),

  // Paragraph
  p: ({ children }) => (
    <p style={{
      margin: "6px 0", lineHeight: 1.75,
      fontSize: ".9rem", color: "#cbd5e1",
    }}>{children}</p>
  ),

  // Bold
  strong: ({ children }) => (
    <strong style={{ color: "#f1f5f9", fontWeight: 700 }}>{children}</strong>
  ),

  // Unordered list
  ul: ({ children }) => (
    <ul style={{
      margin: "8px 0", paddingLeft: 0, listStyle: "none",
      display: "flex", flexDirection: "column", gap: 5,
    }}>{children}</ul>
  ),

  // Ordered list
  ol: ({ children }) => (
    <ol style={{
      margin: "8px 0", paddingLeft: 20,
      display: "flex", flexDirection: "column", gap: 5,
    }}>{children}</ol>
  ),

  // List item
  li: ({ children }) => (
    <li style={{
      display: "flex", alignItems: "flex-start", gap: 8,
      fontSize: ".89rem", color: "#cbd5e1", lineHeight: 1.65,
    }}>
      <span style={{
        minWidth: 6, height: 6, borderRadius: "50%",
        background: "#84cc16", marginTop: 8, display: "inline-block",
      }} />
      <span>{children}</span>
    </li>
  ),

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote style={{
      borderLeft: "3px solid #84cc16",
      margin: "10px 0", padding: "8px 14px",
      background: "#0f172a", borderRadius: "0 8px 8px 0",
      color: "#94a3b8", fontSize: ".88rem", fontStyle: "italic",
    }}>{children}</blockquote>
  ),

  // Horizontal rule
  hr: () => (
    <hr style={{ border: "none", borderTop: "1px solid #1e293b", margin: "14px 0" }} />
  ),

  // Table
  table: ({ children }) => (
    <div style={{ overflowX: "auto", margin: "12px 0" }}>
      <table style={{
        width: "100%", borderCollapse: "collapse",
        fontSize: ".85rem", color: "#cbd5e1",
      }}>{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th style={{
      background: "#1e293b", padding: "8px 12px",
      textAlign: "left", fontWeight: 700, color: "#84cc16",
      borderBottom: "2px solid #334155",
    }}>{children}</th>
  ),
  td: ({ children }) => (
    <td style={{
      padding: "7px 12px", borderBottom: "1px solid #1e293b",
    }}>{children}</td>
  ),
};

// ── Main Component ──
function FridayInterface() {
  const [question,      setQuestion]      = useState("");
  const [messages,      setMessages]      = useState([]);
  const [typing,        setTyping]        = useState(false);
  const [history,       setHistory]       = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [sidebarOpen,   setSidebarOpen]   = useState(false);

  const chatEndRef = useRef(null);
  const inputRef   = useRef(null);

  // ── Auto scroll ──
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // ── Load history from localStorage ──
  useEffect(() => {
    const userId = localStorage.getItem("email");
    if (!userId) return;
    try {
      // FIX 4: Wrapped in try/catch — corrupt localStorage se crash nahi hoga
      const saved = localStorage.getItem(`history_${userId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setHistory(parsed);
        if (parsed.length > 0) {
          setCurrentChatId(parsed[0].id);
          setMessages(parsed[0].messages);
        }
      }
    } catch {
      // Silent fail on corrupt data
    }
  }, []);

  // ── Save history helper ──
  const saveHistory = (updated) => {
    const userId = localStorage.getItem("email");
    if (userId) {
      localStorage.setItem(`history_${userId}`, JSON.stringify(updated));
    }
  };

  // ── New Chat ──
  const handleNewChat = () => {
    const newChat = { id: Date.now(), title: "New Chat", messages: [] };
    setCurrentChatId(newChat.id);
    setMessages([]);
    setHistory(prev => {
      const updated = [newChat, ...prev];
      saveHistory(updated);
      return updated;
    });
    setSidebarOpen(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // ── Send Message ──
  const handleSend = async () => {
    if (question.trim() === "") return;

    let chatId = currentChatId;

    // Auto-create chat if none exists
    if (!chatId) {
      const newChat = {
        id: Date.now(),
        title: question.slice(0, 30) + (question.length > 30 ? "…" : ""),
        messages: [],
      };
      chatId = newChat.id;
      setCurrentChatId(chatId);
      setHistory(prev => {
        const updated = [newChat, ...prev];
        saveHistory(updated);
        return updated;
      });
    }

    const userQuestion = question;
    setMessages(prev => [...prev, { type: "question", text: userQuestion }]);
    setQuestion("");
    setTyping(true);

    try {
      // FIX 1 applied: API_URL from env
      const res = await fetch(`${API_URL}/ask-ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userQuestion }),
      });

      // FIX 5: Check res.ok before parsing JSON
      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      const answerText = data.answer || "⚠ No response received.";

      setTyping(false);
      setMessages(prev => [...prev, { type: "answer", text: answerText }]);

      // Save updated messages to history
      setHistory(prev => {
        const updated = prev.map(chat =>
          chat.id === chatId
            ? {
                ...chat,
                title:
                  chat.messages.length === 0
                    ? userQuestion.slice(0, 30) + (userQuestion.length > 30 ? "…" : "")
                    : chat.title,
                messages: [
                  ...chat.messages,
                  { type: "question", text: userQuestion },
                  { type: "answer",   text: answerText },
                ],
              }
            : chat
        );
        saveHistory(updated);
        return updated;
      });

    } catch (error) {
      setTyping(false);
      setMessages(prev => [
        ...prev,
        {
          type: "answer",
          text: `⚠ **Error:** ${error.message || "Could not reach server. Please try again."}`,
        },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Delete Chat ──
  const handleDeleteChat = (e, chatId) => {
    e.stopPropagation();
    setHistory(prev => {
      const updated = prev.filter(c => c.id !== chatId);
      saveHistory(updated);
      return updated;
    });
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

      {/* ── LEFT PANEL / SIDEBAR ── */}
      <div className={`${styles.SettingPannel} ${sidebarOpen ? styles.sidebarOpen : ""}`}>

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
          fontSize: ".7rem",
          color: "#475569",
          letterSpacing: "1px",
          textTransform: "uppercase",
          padding: "4px 2px",
          fontWeight: 600,
        }}>
          Recent Chats
        </div>

        {/* Chat History List */}
        <div className={styles.HistoryChats}>
          {history.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "24px 10px",
              color: "#475569",
              fontSize: ".82rem",
              lineHeight: 1.6,
            }}>
              📭 No chats yet.<br />Start a new chat!
            </div>
          ) : (
            history.map(chat => (
              <div
                key={chat.id}
                className={`${styles.historyItem} ${
                  currentChatId === chat.id ? styles.historyItemActive : ""
                }`}
                onClick={() => {
                  setCurrentChatId(chat.id);
                  setMessages(chat.messages);
                  setSidebarOpen(false);
                }}
              >
                {/* Chat title */}
                <div style={{
                  fontSize: ".84rem",
                  fontWeight: 500,
                  marginBottom: 3,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  paddingRight: 20,
                }}>
                  💬 {chat.title || "New Chat"}
                </div>

                {/* Messages count + delete */}
                <div style={{
                  fontSize: ".72rem",
                  color: "#475569",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span>{chat.messages.length} messages</span>
                  <button
                    onClick={(e) => handleDeleteChat(e, chat.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#475569",
                      cursor: "pointer",
                      fontSize: ".8rem",
                      padding: "2px 4px",
                      borderRadius: 4,
                      lineHeight: 1,
                      transition: "color .15s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#ef4444")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
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
              textAlign: "center",
              margin: "auto",
              color: "#475569",
              padding: "40px 20px",
            }}>
              <div style={{ fontSize: "3rem", marginBottom: 12 }}>🤖</div>
              <div style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#84cc16",
                marginBottom: 8,
              }}>
                Friday AI
              </div>
              <div style={{ fontSize: ".85rem", color: "#475569" }}>
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
                  {/* Professional answer header */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    marginBottom: 12, paddingBottom: 10,
                    borderBottom: "1px solid #1e293b",
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: "linear-gradient(135deg, #84cc16, #22c55e)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "13px", flexShrink: 0,
                    }}>🤖</div>
                    <div>
                      <div style={{
                        fontSize: ".75rem", fontWeight: 700,
                        color: "#84cc16", letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}>Friday AI</div>
                      <div style={{ fontSize: ".68rem", color: "#475569" }}>
                        IT & CS Expert
                      </div>
                    </div>
                  </div>
                  {/* Markdown rendered with professional components */}
                  <ReactMarkdown components={mdComponents}>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              ) : (
                msg.text
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className={styles.botMessage}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "linear-gradient(135deg, #84cc16, #22c55e)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px",
                }}>🤖</div>
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 7, height: 7, borderRadius: "50%",
                      background: "#84cc16", display: "inline-block",
                      animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                  <style>{`
                    @keyframes bounce {
                      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                      30% { transform: translateY(-6px); opacity: 1; }
                    }
                  `}</style>
                  <span style={{ fontSize: ".82rem", color: "#475569", marginLeft: 4 }}>
                    Friday is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className={styles.InputPannel}>
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask IT / Computer Science question..."
            className={styles.InputBox}
            disabled={typing}
          />
          {/* FIX 6: Disabled while typing — no double send */}
          <button
            className={styles.SendButton}
            onClick={handleSend}
            disabled={typing}
            style={{ opacity: typing ? 0.6 : 1 }}
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default FridayInterface;