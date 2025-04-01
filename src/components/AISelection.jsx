import React from "react";

const AISelection = ({ selectedAI, setSelectedAI, apiKey, setApiKey }) => {
  return (
    <div className="ai-selection">
      <label>Select AI:</label>
      <select value={selectedAI} onChange={(e) => setSelectedAI(e.target.value)}>
        <option value="">Human vs. Human</option>
        <option value="Gemini">Gemini</option>
        <option value="GPT">OpenAI GPT</option>
        <option value="Cohere">Cohere</option>
      </select>

      {selectedAI && (
        <>
          <label>Enter API Key:</label>
          <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
        </>
      )}
    </div>
  );
};

export default AISelection;
