
```javascript
const Anthropic = require("@anthropic-ai/sdk");
const readline = require("readline");

const client = new Anthropic();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function searchNews(topic) {
  console.log(`\n🔍 Buscando noticias sobre: "${topic}"\n`);

  const systemPrompt = `Eres un experto buscador de noticias y analista de información. 
Tu tarea es proporcionar información sobre noticias actuales y relevantes sobre los temas de interés del usuario.
Proporciona noticias en formato estructurado con:
- Titular de la noticia
- Fecha aproximada
- Resumen breve (2-3 líneas)
- Relevancia para el tema
- Palabras clave relacionadas

Si es posible, menciona fuentes confiables donde se podría encontrar más información.
Intenta proporcionar al menos 3-5 noticias relevantes sobre el tema.`;

  const userMessage = `Busca y proporciona información sobre noticias recientes relacionadas con: "${topic}"
Sé específico y proporciona detalles útiles que ayuden al usuario a entender la situación actual del tema.`;

  try {
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const newsContent = response.content[0];
    if (newsContent.type === "text") {
      console.log("📰 NOTICIAS ENCONTRADAS:\n");
      console.log("=".repeat(60));
      console.log(newsContent.text);
      console.log("=".repeat(60));
      return newsContent.text;
    }
  } catch (error) {
    console.error("Error al buscar noticias:", error);
    throw error;
  }
}

async function analyzeTrends(topics) {
  console.log(`\n📊 Analizando tendencias en temas: ${topics.join(", ")}\n`);

  const systemPrompt = `Eres un analista de tendencias experto en medios de comunicación y noticias.
Tu tarea es identificar patrones, tendencias emergentes y conexiones entre diferentes temas de noticias.
Proporciona análisis estructurado con:
- Tendencias principales identificadas
- Conexiones entre temas
- Impacto potencial
- Palabras clave emergentes
- Predicciones basadas en datos actuales`;

  const userMessage = `Analiza las tendencias y patrones en las siguientes áreas de noticias: ${topics.join(", ")}
¿Cuáles son las tendencias emergentes? ¿Hay conexiones entre estos temas?
Proporciona un análisis profundo y útil.`;

  try {
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const analysisContent = response.content[0];
    if (analysisContent.type === "text") {
      console.log("📈 ANÁLISIS DE TENDENCIAS:\n");
      console.log("=".repeat(60));
      console.log(analysisContent.text);
      console.log("=".repeat(60));
      return analysisContent.text;
    }
  } catch (error) {
    console.error("Error al analizar tendencias:", error);
    throw error;
  }
}

async function getNewsAlert(topic, keywords) {
  console.log(
    `\n🚨 Configurando alerta para: "${topic}" con palabras clave: ${keywords.join(", ")}\n`
  );

  const systemPrompt = `Eres un experto en configuración de alertas de noticias y monitoreo de información.
Tu tarea es ayudar a configurar alertas inteligentes para temas de interés.
Proporciona:
- Palabras clave recomendadas para monitorear
- Fuentes sugeridas para seguimiento
- Frecuencia recomendada de actualizaciones
- Criterios de relevancia
- Estrategia de notificación`;

  const userMessage = `Configura una alerta de noticias para: "${topic}"
Palabras clave de interés: ${keywords.join(", ")}
¿Cuál es la mejor estrategia para monitorear este tema?
¿Qué otras palabras clave deberían ser consideradas?
¿Cuáles son las fuentes más confiables?`;

  try {
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const alertContent = response.content[0];
    if (alertContent.type === "text") {
      console.log("⚙️ CONFIGURACIÓN DE ALERTA:\n");
      console.log("=".repeat(60));
      console.log(alertContent.text);
      console.log("=".repeat(60));
      return alertContent.text;
    }
  } catch (error) {
    console.error("Error al configurar alerta:", error);
    throw error;
  }
}

async function main