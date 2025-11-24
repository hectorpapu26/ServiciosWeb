function createMessageRow(text, type = "user") {
  const row = document.createElement("div");
  row.style.display = "flex";
  row.style.marginBottom = "8px";
  row.style.justifyContent = type === "user" ? "flex-end" : "flex-start";

  const bubble = document.createElement("div");
  bubble.textContent = text;
  bubble.style.whiteSpace = "pre-wrap";
  bubble.style.maxWidth = "70%";
  bubble.style.padding = "8px 12px";
  bubble.style.borderRadius = "12px";
  bubble.style.fontSize = "14px";
  bubble.style.lineHeight = "1.4";

  if (type === "user") {
    bubble.style.background = "#2563eb";
    bubble.style.color = "#ffffff";
    bubble.style.borderBottomRightRadius = "2px";
  } else {
    bubble.style.background = "#020617";
    bubble.style.color = "#e5e7eb";
    bubble.style.borderBottomLeftRadius = "2px";
  }

  row.appendChild(bubble);
  return row;
}

function appendMessage(messagesContainer, text, type = "user") {
  const row = createMessageRow(text, type);
  messagesContainer.appendChild(row);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

//respuesta falsa de IA
function fakeAiResponse(userText) {
  if (!userText || !userText.trim()) return "¿Me puedes decir un poco más? 😊";
  return (
    "Entiendo lo que comentas: \"" +
    userText.trim() +
    "\".\nPor ahora soy una demo, pero en la versión completa te podré ayudar con tu vida académica en la UDG 😄"
  );
}

function initChat() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html"; // o la ruta donde está app.js
    return;
  }
  //estilos globales del body
  document.body.style.margin = "0";
  document.body.style.fontFamily =
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  document.body.style.background = "#020b2b";
  document.body.style.color = "#fff";
  document.body.style.display = "block";
  document.body.style.minHeight = "100vh";

  const root = document.getElementById("root");
  root.style.width = "100vw";
  root.style.height = "100vh";
  root.style.display = "flex";
  root.style.flexDirection = "column";

  const wrapper = document.createElement("div");
  wrapper.style.width = "100vw";
  wrapper.style.maxWidth = "100vw";
  wrapper.style.height = "100vh";
  wrapper.style.background = "#0b1025";
  wrapper.style.borderRadius = "16px"; //
  wrapper.style.boxShadow = "0 16px 30px rgba(0,0,0,0.5)";
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.overflow = "hidden";

  // header
  const header = document.createElement("div");
  header.style.padding = "12px 16px";
  header.style.background = "#111832";
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";

  const title = document.createElement("div");
  title.textContent = "Chat AsistUDG";
  title.style.fontSize = "16px";
  title.style.fontWeight = "600";

  const userInfo = document.createElement("div");
  const name = localStorage.getItem("chatUserName") || "Estudiante";
  userInfo.style.fontSize = "13px";
  userInfo.style.opacity = "0.8";
  userInfo.textContent = `Sesión de: ${name}`;

  header.appendChild(title);
  header.appendChild(userInfo);

  //mensajes
  const messages = document.createElement("div");
  messages.style.flex = "1";
  messages.style.padding = "16px";
  messages.style.overflowY = "auto";

  //bienvenida
  messages.appendChild(
    createMessageRow(
      `Hola ${name}, soy AsistUDG, tu asistente virtual 😊\nDime en que te puedo ayudar el dia de hoy.`,
      "ai"
    )
  );

  const inputArea = document.createElement("div");
  inputArea.style.borderTop = "1px solid #1f2937";
  inputArea.style.padding = "8px";
  inputArea.style.display = "flex";
  inputArea.style.gap = "8px";

  const textarea = document.createElement("textarea");
  textarea.placeholder = "Massage...";
  textarea.style.flex = "1";
  textarea.style.resize = "none";
  textarea.style.borderRadius = "50px";
  textarea.style.border = "1px solid #374151";
  textarea.style.background = "#020617";
  textarea.style.color = "#e5e7eb";
  textarea.style.padding = "10px";
  textarea.style.fontFamily =
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  textarea.style.fontSize = "14px";
  textarea.rows = 2;

  const sendButton = document.createElement("button");
  sendButton.textContent = "Enviar";
  sendButton.style.border = "none";
  sendButton.style.borderRadius = "10px";
  sendButton.style.padding = "0 16px";
  sendButton.style.cursor = "pointer";
  sendButton.style.fontSize = "14px";
  sendButton.style.fontWeight = "500";
  sendButton.style.background = "#2563eb";
  sendButton.style.color = "#ffffff";
  sendButton.style.display = "flex";
  sendButton.style.alignItems = "center";
  sendButton.style.justifyContent = "center";
  sendButton.style.minWidth = "90px";

  inputArea.appendChild(textarea);
  inputArea.appendChild(sendButton);

  wrapper.appendChild(header);
  wrapper.appendChild(messages);
  wrapper.appendChild(inputArea);

  root.appendChild(wrapper);

  function handleSend() {
    const text = textarea.value.trim();
    if (!text) return;

    // mensaje del usuario
    appendMessage(messages, text, "user");
    textarea.value = "";
    setTimeout(() => {
      const aiText = fakeAiResponse(text);
      appendMessage(messages, aiText, "ai");
    }, 400);
  }

  //enviar
  sendButton.addEventListener("click", handleSend);

  //enter para enviar
  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });
}
window.addEventListener("DOMContentLoaded", initChat);
