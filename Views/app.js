const API_BASE_URL = window.location.origin + "/api";

function showAlert(container, message, type = "success") {
  container.innerHTML = "";
  const alert = document.createElement("div");
  alert.style.padding = "8px 10px";
  alert.style.marginBottom = "8px";
  alert.style.borderRadius = "6px";
  alert.style.fontSize = "13px";
  alert.style.color = type === "success" ? "#0f5132" : "#842029";
  alert.style.backgroundColor = type === "success" ? "#d1e7dd" : "#f8d7da";
  alert.textContent = message;
  container.appendChild(alert);
}
function buildUI() {
  localStorage.removeItem("token");
  localStorage.removeItem("chatUserName");

  const root = document.getElementById("root");

  document.body.style.margin = "0";
  document.body.style.fontFamily =
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  document.body.style.background = "#020b2b";
  document.body.style.color = "#fff";

  // estilos globales
  document.body.style.margin = "0";
  document.body.style.fontFamily =
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  document.body.style.background = "#020b2b";
  document.body.style.color = "#fff";

  const page = document.createElement("div");
  page.style.minHeight = "100vh";
  page.style.display = "flex";
  page.style.flexDirection = "column";
   document.body.style.margin = "0";
  document.body.style.fontFamily =
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  document.body.style.background = "#020b2b";
  document.body.style.color = "#fff";

  const topBar = document.createElement("header");
  topBar.style.display = "flex";
  topBar.style.justifyContent = "space-between";
  topBar.style.alignItems = "center";
  topBar.style.padding = "12px 32px";
  topBar.style.background = "#020824";

  const leologo = document.createElement("img");
  leologo.src = "logs/udeg-leo.png";
  leologo.alt = "LEO";
  leologo.style.height = "100px";
  leologo.style.objectFit = "contain";

  const udgLogo = document.createElement("img");
  udgLogo.src = "logs/logo-udg.png";
  udgLogo.alt = "Universidad de Guadalajara";
  udgLogo.style.height = "100px";
  udgLogo.style.objectFit = "contain";

  topBar.appendChild(leologo);
  topBar.appendChild(udgLogo);


  const hero = document.createElement("main");
  hero.style.flex = "1";
  hero.style.display = "flex";

  const left = document.createElement("section");
  left.style.flex = "2";
  left.style.padding = "40px 48px";
  left.style.background =
    "radial-gradient(circle at top, #0b4ea2 0%, #020b2b 55%, #000 100%)";
  left.style.display = "flex";
  left.style.flexDirection = "column";
  left.style.justifyContent = "space-between";

  const heroContent = document.createElement("div");
  heroContent.style.maxWidth = "600px";

  const badge = document.createElement("span");
  badge.textContent = "Universidad de Guadalajara";
  badge.style.display = "inline-block";
  badge.style.background = "#ffffff22";
  badge.style.padding = "4px 12px";
  badge.style.borderRadius = "999px";
  badge.style.fontSize = "13px";
  badge.style.marginBottom = "12px";

  const title = document.createElement("h1");
  title.textContent = "¿Ya probaste nuestra nueva inteligencia artificial?";
  title.style.fontSize = "32px";
  title.style.fontWeight = "700";
  title.style.margin = "0 0 8px";

  const text = document.createElement("p");
  text.textContent =
    "Ingresa y habla con AsistUDG";
  text.style.fontSize = "16px";
  text.style.opacity = "0.9";

  heroContent.appendChild(badge);
  heroContent.appendChild(title);
  heroContent.appendChild(text);

  const heroImage = document.createElement("div");
  heroImage.style.marginTop = "32px";
  heroImage.style.height = "220px";
  heroImage.style.borderRadius = "20px";
  heroImage.style.background =
    "linear-gradient(135deg, #e63946, #f1fa8c)";
  heroImage.style.display = "flex";
  heroImage.style.alignItems = "center";
  heroImage.style.justifyContent = "center";
  heroImage.style.color = "#111";
  heroImage.style.fontWeight = "600";
  heroImage.textContent = "";

  left.appendChild(heroContent);
  left.appendChild(heroImage);
  const right = document.createElement("section");
  right.style.flex = "1.1";
  right.style.padding = "40px";
  right.style.display = "flex";
  right.style.alignItems = "center";
  right.style.justifyContent = "center";

  const card = document.createElement("div");
  card.style.width = "100%";
  card.style.maxWidth = "380px";
  card.style.background = "#f7f7f7";
  card.style.color = "#222";
  card.style.borderRadius = "18px";
  card.style.padding = "24px 24px 28px";
  card.style.boxShadow = "0 16px 30px rgba(0,0,0,0.35)";

  const cardTitle = document.createElement("h2");
  cardTitle.textContent = "Iniciar sesión";
  cardTitle.style.fontSize = "22px";
  cardTitle.style.marginBottom = "16px";

  const alertContainer = document.createElement("div");
  alertContainer.id = "alert-container";
  alertContainer.style.marginBottom = "10px";

  const loginForm = document.createElement("form");
  loginForm.id = "login-form";

  const loginEmailGroup = document.createElement("div");
  loginEmailGroup.style.marginBottom = "12px";

  const emailLabel = document.createElement("label");
  emailLabel.textContent = "Código";
  emailLabel.style.fontSize = "14px";
  emailLabel.style.display = "block";
  emailLabel.style.marginBottom = "4px";

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.name = "email";
  emailInput.placeholder = "Ingresa tu código";
  emailInput.required = true;
  emailInput.style.width = "100%";
  emailInput.style.borderRadius = "999px";
  emailInput.style.border = "1px solid #ccc";
  emailInput.style.padding = "8px 9px";
  emailInput.style.fontSize = "14px";

  loginEmailGroup.appendChild(emailLabel);
  loginEmailGroup.appendChild(emailInput);

  const loginPassGroup = document.createElement("div");
  loginPassGroup.style.marginBottom = "12px";

  const passLabel = document.createElement("label");
  passLabel.textContent = "NIP";
  passLabel.style.fontSize = "14px";
  passLabel.style.display = "block";
  passLabel.style.marginBottom = "4px";

  const passInput = document.createElement("input");
  passInput.type = "password";
  passInput.name = "password";
  passInput.placeholder = "Ingresa tu NIP";
  passInput.required = true;
  passInput.style.width = "100%";
  passInput.style.borderRadius = "999px";
  passInput.style.border = "1px solid #ccc";
  passInput.style.padding = "8px 9px";
  passInput.style.fontSize = "14px";

  loginPassGroup.appendChild(passLabel);
  loginPassGroup.appendChild(passInput);

  const forgotDiv = document.createElement("div");
  forgotDiv.style.display = "flex";
  forgotDiv.style.justifyContent = "flex-end";
  forgotDiv.style.marginBottom = "12px";

  const forgotLink = document.createElement("a");
  forgotLink.href = "#";
  forgotLink.textContent = "¿Olvidaste tu contraseña?";
  forgotLink.style.fontSize = "13px";
  forgotLink.style.color = "#d7263d";

  forgotDiv.appendChild(forgotLink);

  const loginBtn = document.createElement("button");
  loginBtn.type = "submit";
  loginBtn.textContent = "Ingresar";
  loginBtn.style.width = "100%";
  loginBtn.style.border = "none";
  loginBtn.style.cursor = "pointer";
  loginBtn.style.borderRadius = "999px";
  loginBtn.style.padding = "9px 16px";
  loginBtn.style.fontSize = "15px";
  loginBtn.style.fontWeight = "600";
  loginBtn.style.background = "#e3342f";
  loginBtn.style.color = "#fff";

  loginForm.appendChild(loginEmailGroup);
  loginForm.appendChild(loginPassGroup);
  loginForm.appendChild(forgotDiv);
  loginForm.appendChild(loginBtn);

  const toggleRegisterBtn = document.createElement("button");
  toggleRegisterBtn.type = "button";
  toggleRegisterBtn.textContent = "¿No tienes cuenta? Regístrate";
  toggleRegisterBtn.style.marginTop = "8px";
  toggleRegisterBtn.style.background = "transparent";
  toggleRegisterBtn.style.border = "none";
  toggleRegisterBtn.style.color = "#0b4ea2";
  toggleRegisterBtn.style.fontSize = "14px";
  toggleRegisterBtn.style.cursor = "pointer";
  toggleRegisterBtn.style.textDecoration = "underline";

  const registerForm = document.createElement("form");
  registerForm.id = "register-form";
  registerForm.style.marginTop = "12px";
  registerForm.style.display = "none";

  const regTitle = document.createElement("h3");
  regTitle.textContent = "Crear cuenta";
  regTitle.style.fontSize = "18px";
  regTitle.style.marginBottom = "8px";

  function createRegInput(labelText, type, name, placeholder) {
    const group = document.createElement("div");
    group.style.marginBottom = "10px";

    const label = document.createElement("label");
    label.textContent = labelText;
    label.style.display = "block";
    label.style.fontSize = "14px";
    label.style.marginBottom = "4px";

    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    input.required = true;
    input.style.width = "100%";
    input.style.borderRadius = "999px";
    input.style.border = "1px solid #ccc";
    input.style.padding = "8px 9px";
    input.style.fontSize = "14px";

    group.appendChild(label);
    group.appendChild(input);
    return group;
  }

  const regNameGroup = createRegInput(
    "Nombre",
    "text",
    "name",
    "Tu nombre completo"
  );
  const regEmailGroup = createRegInput(
    "Correo institucional",
    "email",
    "email",
    "correo@alumno.udg.mx"
  );
  const regPassGroup = createRegInput(
    "Contraseña",
    "password",
    "password",
    "Mínimo 6 caracteres"
  );
  const regPass2Group = createRegInput(
    "Confirmar contraseña",
    "password",
    "passwordConfirmation",
    "Repite tu contraseña"
  );

  const regBtn = document.createElement("button");
  regBtn.type = "submit";
  regBtn.textContent = "Registrarse";
  regBtn.style.width = "100%";
  regBtn.style.border = "none";
  regBtn.style.cursor = "pointer";
  regBtn.style.borderRadius = "999px";
  regBtn.style.padding = "9px 16px";
  regBtn.style.fontSize = "15px";
  regBtn.style.fontWeight = "600";
  regBtn.style.background = "#198754";
  regBtn.style.color = "#fff";

  registerForm.appendChild(regTitle);
  registerForm.appendChild(regNameGroup);
  registerForm.appendChild(regEmailGroup);
  registerForm.appendChild(regPassGroup);
  registerForm.appendChild(regPass2Group);
  registerForm.appendChild(regBtn);

  card.appendChild(cardTitle);
  card.appendChild(alertContainer);
  card.appendChild(loginForm);
  card.appendChild(toggleRegisterBtn);
  card.appendChild(registerForm);

  right.appendChild(card);

  hero.appendChild(left);
  hero.appendChild(right);

  page.appendChild(topBar);
  page.appendChild(hero);
  root.appendChild(page);

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      email: emailInput.value,
      password: passInput.value,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        showAlert(
          alertContainer,
          data.message || "Error al iniciar sesión",
          "danger"
        );
        return;
      }

      const token = data.data?.token || data.token;
      if (token) localStorage.setItem("token", token);

      if (payload.email) {
        localStorage.setItem("chatUserEmail", payload.email);
      }
      if (data.user && data.user.name) {
        localStorage.setItem("chatUserName", data.user.name);
      }

      showAlert(
        alertContainer,
        data.message || "Login correcto ✅, redirigiendo al chat...",
        "success"
      );

      setTimeout(() => {
        window.location.href = "chat.html";
      }, 1000);
    } catch (err) {
      console.error(err);
      showAlert(
        alertContainer,
        "Error de conexión con el servidor",
        "danger"
      );
    }
  });

  toggleRegisterBtn.addEventListener("click", () => {
    if (registerForm.style.display === "none") {
      registerForm.style.display = "block";
      toggleRegisterBtn.textContent = "Ocultar formulario de registro";
    } else {
      registerForm.style.display = "none";
      toggleRegisterBtn.textContent = "¿No tienes cuenta? Regístrate";
    }
  });

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        showAlert(
          alertContainer,
          data.message || "Error al registrarse",
          "danger"
        );
        return;
      }

      showAlert(
        alertContainer,
        data.message || "Registro exitoso 🎉, redirigiendo al chat...",
        "success"
      );

      if (payload.name) {
        localStorage.setItem("chatUserName", payload.name);
      }
      if (payload.email) {
        localStorage.setItem("chatUserEmail", payload.email);
      }

      setTimeout(() => {
        window.location.href = "chat.html";
      }, 1200);
    } catch (err) {
      console.error(err);
      showAlert(
        alertContainer,
        "Error de conexión con el servidor",
        "danger"
      );
    }
  });
}
window.addEventListener("DOMContentLoaded", buildUI);
