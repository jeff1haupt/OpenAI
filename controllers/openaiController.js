const openai = require('../config/openaiConfig');

const generateMeta = async (req, res) => {
    const { title } = req.body
    const description = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: `Come up with a description for a YouTube video called ${title}`
            }
        ],
        max_tokens: 100
    })
    res.status(200).json({
        description: description.choices[0].message.content
    })

    const tags = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: `Come up with 10 keywords for a YouTube video called ${title}`
            }
        ],
        max_tokens: 100
    })

    console.log(tags.choices[0].message.content)
}

const generateImage = async (req, res) => {
    const image = await openai.images.generate({
        model: "dall-e-3",
        size: "1024x1024",
        prompt: req.body.prompt
    })
    
    res.status(200).json({
        url: image.data[0].url
    })
 
}

module.exports = { generateMeta, generateImage }