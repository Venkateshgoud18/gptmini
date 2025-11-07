import "dotenv/config";

const getOpenAIAPIResponce=async (messages)=> {
    const options={
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages:[{
            role: "user",
            content: messages
          }]
        })
      }
      try{
        const response=await fetch('https://api.openai.com/v1/chat/completions',options);
        const data=await response.json();
        console.log(data);
        return data;
      }
      catch(error){
        console.error('Error:', error);
        throw new Error('An error occurred while processing your request.');
      }
}

export default getOpenAIAPIResponce;