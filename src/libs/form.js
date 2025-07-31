const DEBUG = false;
if (!DEBUG) console.log = () => {};

document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  console.log("Form submit triggered");

  const loader = document.getElementById("formLoader");
  loader.classList.remove("hidden");
  loader.classList.add("fixed");

  const formData = new FormData(this);
  console.log("FormData entries:", Object.fromEntries(formData.entries()));

  const honeypotFields = ["nome_alternativo", "sito_web", "email_secondaria", "telefono_cellulare"];
  const isBot = honeypotFields.some((field) => {
    const value = formData.get(field);
    return typeof value === "string" && value.trim() !== "";
  });
  console.log("isBot:", isBot);
  if (isBot) return;

  const postDataEmail = {
    name: formData.get("name"),
    surname: formData.get("surname"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    cap: formData.get("cap"),
    message: formData.get("message"),
    richiesta: formData.get("richiesta"),
    privacyConsent: formData.get("privacyConsent") === "on",
    cliente: "LUCAR",
  };

  // Aggiungi i campi solo se sono popolati
  const modelloAuto = formData.get("modello_auto");
  if (modelloAuto && modelloAuto.trim() !== "") {
    postDataEmail.modello_auto = modelloAuto;
  }

  const promo = formData.get("richiestaPromo");
  if (promo && promo.trim() !== "") {
    postDataEmail.promo = promo;
  }

  const car_plate = formData.get("car_plate");
  if (car_plate && car_plate.trim() !== "") {
    postDataEmail.car_plate = car_plate;
  }

  console.log("postDataEmail:", postDataEmail);

  try {
    console.log("Sending request to:", import.meta.env.PUBLIC_SMTP_URL);
    const response = await fetch("/.netlify/functions/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiUrl: `${import.meta.env.PUBLIC_SMTP_URL}`,
        requestBody: postDataEmail,
      }),
    });
    console.log("Response status:", response.status);
    setTimeout(() => {
      if (DEBUG) console.log("[Redirect] Reindirizzamento alla pagina di ringraziamento");
      window.location.href = "/ThanksYouPage";
    }, 2000);
  } catch (error) {
    console.log("Errore nel invio del form:", error);
    alert("Errore nel processo. Riprova più tardi.");
    loader.classList.remove("fixed");
    loader.classList.add("hidden");
  }
});
