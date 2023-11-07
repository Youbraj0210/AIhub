
const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true
});

export const sendMsgToOpenAI = async (message)=>{
    const chatCompletion = await openai.chat.completions.create({
        model:"gpt-3.5-turbo-0613",
        messages:[{"role":"user","content": message}],
    });
    return (chatCompletion.choices[0].message.content);
};

