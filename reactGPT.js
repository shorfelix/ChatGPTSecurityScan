import React, { useState } from "react";
import { OpenAI } from "openai-api-client";

const ChatGPT = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const api = new OpenAI({
      apiKey: "YOUR_API_KEY",
    });

    api.request("text-generation", {
      prompt: question,
      max_tokens: 100,
    })
      .then((response) => {
        setAnswer(response.choices[0].text);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your question..."
          value={question}
          onChange={handleChange}
        />
        <button type="enter ">Submit</button>
      </form>
      <h1>{answer}</h1>
    </div>
  );
};

export default ChatGPT;
