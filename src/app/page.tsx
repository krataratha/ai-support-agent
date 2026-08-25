"use client";

import { useState } from "react";

type Message = {
  role: "user" | "agent";
  content: string;
};

export default function Home() {
  const [customerId, setCustomerId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!customerId.trim()) {
      alert("Please enter a customer ID.");
      return;
    }

    if (!message.trim()) {
      return;
    }

    const userMessage = message;

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          message: userMessage,
          history: messages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "agent",
          content: data.response,
        },
      ]);

      setLogs(data.logs || []);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      setMessages((previous) => [
        ...previous,
        {
          role: "agent",
          content: `Error: ${errorMessage}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ marginBottom: "8px" }}>
          AI Customer Support Agent
        </h1>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          Refund support powered by an AI agent and strict refund policy.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
          }}
        >
          {/* Chat */}
          <section
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2>Customer Chat</h2>

            <label
              style={{
                display: "block",
                marginTop: "15px",
                marginBottom: "6px",
                fontWeight: "bold",
              }}
            >
              Customer ID
            </label>

            <input
              value={customerId}
              onChange={(event) =>
                setCustomerId(event.target.value)
              }
              placeholder="Enter customer ID"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            />

            <div
              style={{
                minHeight: "350px",
                maxHeight: "450px",
                overflowY: "auto",
                marginTop: "20px",
                marginBottom: "20px",
                padding: "10px",
                background: "#f8f9fb",
                borderRadius: "8px",
              }}
            >
              {messages.length === 0 && (
                <p
                  style={{
                    textAlign: "center",
                    color: "#888",
                    marginTop: "150px",
                  }}
                >
                  Start a conversation about a refund.
                </p>
              )}

              {messages.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent:
                      item.role === "user"
                        ? "flex-end"
                        : "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "75%",
                      padding: "12px 15px",
                      borderRadius: "10px",
                      background:
                        item.role === "user"
                          ? "#111827"
                          : "#e5e7eb",
                      color:
                        item.role === "user"
                          ? "white"
                          : "#111",
                    }}
                  >
                    <strong>
                      {item.role === "user"
                        ? "You"
                        : "AI Agent"}
                    </strong>

                    <div style={{ marginTop: "5px" }}>
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <p style={{ color: "#666" }}>
                  AI Agent is processing...
                </p>
              )}
            </div>

            <textarea
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey
                ) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Example: I want a refund because my product arrived damaged."
              rows={4}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "13px",
                border: "none",
                borderRadius: "8px",
                background: loading ? "#999" : "#111827",
                color: "white",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
                fontWeight: "bold",
              }}
            >
              {loading ? "Processing..." : "Send Message"}
            </button>
          </section>

          {/* Admin logs */}
          <section
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2>Agent Logs</h2>

            <p
              style={{
                color: "#666",
                fontSize: "14px",
              }}
            >
              Live activity from the refund agent.
            </p>

            <div
              style={{
                background: "#111827",
                color: "#fff",
                padding: "15px",
                borderRadius: "8px",
                minHeight: "300px",
                fontSize: "13px",
                overflowY: "auto",
              }}
            >
              {logs.length === 0 ? (
                <p style={{ color: "#9ca3af" }}>
                  No agent activity yet.
                </p>
              ) : (
                logs.map((log, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <span style={{ color: "#22c55e" }}>
                      ✓
                    </span>{" "}
                    {log}
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}