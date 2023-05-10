const express = require("express");
const bodyParser = require("body-parser")
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const langKey = process.env.LANG_KEY;
const langEndpoint = process.env.LANG_ENDPOINT;

const textAnalyticsClient = new TextAnalyticsClient(langEndpoint, new AzureKeyCredential(langKey));

const app = express();
app.use(bodyParser.json());
const port = 3000;


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "System Integration Final Project",
            description: "System Integration Final Project - Sentimental Analysis",
            contact: {
                name: "Nikhil Konda",
                email: "nkonda@uncc.edu"
            },
            servers: ["http://0.0.0.0:3000"]
        }
    },
    apis: ["index.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/', (req, res) => {
    res.redirect('/docs');
})


/**
 * @swagger
 * /sentiment/:
 *   post:
 *     summary: Identifies the sentiments of input text
 *     description: Input the conversation to identify the sentiments
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfuully proccess the request
 *       400:
 *         description: Error is parsing the inputs
 *       500:
 *         description: Problem with the server
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Text"
 *       required: true
 *       schema:
 *         properties:
 *           text:
 *             type: string
 *             example: "I'm glad for having you as my friend"
 */
app.post("/sentiment/", (req, res) => {
    const data = req.body;
    if (data.text) {
        sentimentAnalysis(data.text)
            .then(result => res.status(200).send(result))
            .catch(err => res.status(500).send({ 'status_code': 500, 'error': err }));
    } else {
        res.status(400).send({ 'status_code': 400, 'error': 'Expecting only text attributes in the JSON object' })
    }

});

sentimentAnalysis = (text) => {

    return new Promise((resolve, reject) => {
        const sentimentInput = [{ text: text, id: "0", language: "en" }];
        textAnalyticsClient.analyzeSentiment(sentimentInput, { includeOpinionMining: true })
            .then(results => {
                let data = {}
                for (let i = 0; i < results.length; i++) {
                    const result = results[i];
                    if (!result.error) {
                        data['sentiment'] = result.sentiment;
                        data['confidenceScores'] = result.confidenceScores;
                        data['sentences'] = [];
                        for (const { sentiment, confidenceScores, opinions, text } of result.sentences) {
                            let sentence = {};
                            sentence['text'] = text;
                            sentence['sentiment'] = sentiment;
                            sentence['confidenceScores'] = confidenceScores;
                            data['sentences'].push(sentence);
                        }
                    } else {
                        data['error'] = result.error;
                    }
                }
                resolve(data);
            })
            .catch(error => reject(error));
    });
}

app.listen(port, () => {
    console.log("Started Server")
});
