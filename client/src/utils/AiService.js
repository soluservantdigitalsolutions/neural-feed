import axios from "axios";

const apiKey = import.meta.env.COHERE_API_KEY;


export const generateResponse = async (input, chatHistory) => {
  const options = {
    method: "POST",
    url: "https://api.cohere.ai/v1/chat",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: "Bearer KKWx17o3Ef90oDE3OjhLfhG3wT4MLN3PJExLggG4",
    },
    data: {
      message: input,
      model: "command",
      chat_history: chatHistory,
    },
  };

  const response = await axios.request(options);
  console.log(response);
  return response.data.text;
};

export const getSourceUrl = async (query) => {
  const options = {
    method: "POST",
    url: "https://google-api31.p.rapidapi.com/websearch",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "260dd5e289mshdb96ae4cccefbfap11a919jsn5685b58126c9",
      "X-RapidAPI-Host": "google-api31.p.rapidapi.com",
    },
    data: {
      text: query,
      safesearch: "off",
      timelimit: "",
      region: "wt-wt",
      max_results: 1,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.results[0].url;
  } catch (error) {
    console.error(error);
    return "No source found";
  }
};