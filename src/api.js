export const fetchAIMove = async (fen, aiType, apiKey) => {
    let url, payload;
  
    if (!apiKey) {
      alert("API Key is required!");
      return null;
    }
  
    switch (aiType) {
      case "Gemini":
        url = "https://api.gemini.com/v1/move";
        payload = { boardState: fen };
        break;
        case "GPT":
            url = "https://api.openai.com/v1/chat/completions";
            payload = {
              model: "gpt-3.5-turbo", // Changed from gpt-4 to gpt-3.5-turbo
              messages: [{ role: "user", content: `Suggest a move for this position: ${fen}` }],
            };
          
        break;
      case "Cohere":
        url = "https://api.cohere.ai/generate";
        payload = { prompt: `Suggest a chess move for position: ${fen}` };
        break;
      default:
        return null;
    }
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("AI Move Response Data:", data);
  
      // Handle response based on AI provider
      if (aiType === "Gemini" && data.move) {
        return data.move; // Expecting a 'move' field with 'from' and 'to'
      } 
      if (aiType === "GPT" && data.choices && data.choices[0]?.message?.content) {
        const move = data.choices[0].message.content.match(/[a-h][1-8]-[a-h][1-8]/);
        if (move) {
          return { from: move[0].slice(0, 2), to: move[0].slice(3) }; // Extract move
        }
      }
      if (aiType === "Cohere" && data?.text) {
        // Check if response is valid
        if (data.text.toLowerCase().includes("unable")) {
          console.error("AI unable to provide a move.");
          return null;
        }
  
        const move = data.text.match(/[a-h][1-8]-[a-h][1-8]/);
        if (move) {
          return { from: move[0].slice(0, 2), to: move[0].slice(3) }; // Extract move
        }
      }
  
      return null; // Return null if no valid move is found
    } catch (error) {
      console.error("AI Move Fetch Error:", error);
      return null;
    }
  };
  