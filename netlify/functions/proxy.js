export async function handler(event) {
  try {
    const { apiUrl, requestBody } = JSON.parse(event.body);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: event.headers.authorization
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Errore nella Netlify Function:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Errore nella Netlify Function",
        error: error.message
      })
    };
  }
}
