# ITIS-6177 Final Project

This API is a wrapper to the [Sentiment Analysis API](https://learn.microsoft.com/en-us/azure/cognitive-services/language-service/sentiment-opinion-mining/quickstart?pivots=programming-language-java&tabs=windows) with the [language detection](https://learn.microsoft.com/en-us/azure/cognitive-services/language-service/overview)

[Sentimental Analysis](https://en.wikipedia.org/wiki/Sentiment_analysis) API is a programming interface that gives developers the ability to use algorithms based on machine learning to analyse the sentiment of input text. Businesses can use it to classify text as good, negative, or neutral and glean insightful information about how the public views it and customer feedback.

![image](https://github.com/nikhilkonda/ITIS-6177-FinalProject/assets/35331266/5ac54fe8-4ece-41f1-ae65-dfa2652e6bb1)
ref: https://connectjaya.com/azure-cognitive-servicestext-mining-and-sentiment-analysis/

# Development

A Sentiment Analysis API is developed using several important steps. A training data set must first be gathered and trained, and it typically consists of text documents with predefined sentiment labels. A sentiment analysis machine learning model is then trained using this data. On the text data, feature extraction is used to find elements that are important to sentiment analysis, like word frequencies and parts of speech. Then, a model that is capable of accurately predicting sentiment labels for fresh, unknown text material is created using the labeled training data.
Once the model has been trained, it can be used for sentiment analysis tasks by other software programs or provided as a RESTful API. The sentiment analysis API must be continuously monitored and improved in order to ensure that it maintains to be reliable and useful over time. 
Data collection, feature extraction, machine learning model training, API deployment, and continuous maintenance and improvement are all steps in the development of a sentiment analysis API.

**Environment And Libraries Used**

Sentiment Analysis API comprises of the following Environment and Libraries:

- API checker - Swagger
- Libraries - swagger-jsdoc, swagger-ui-express, @azure/ai-text-analytics
- Development - Node.js, Express.js
- Protocol : HTTP

# Try Out

For testing and functionality tests, the API is presently hosted on a Digital Ocean droplet, although this is only a temporary solution.


### Server Endpoint

```
http://178.128.159.37:3000/
```

### API Endpoint

```
http://178.128.159.37:3000/sentiment/
```

### Swagger

```
http://178.128.159.37:3000/docs/
```

### Post Request Body

```JSON
{"text": "<Input the conversation to identify the sentiments>"}
```

## Possible Responses :

| Response code | Description             |
| ------------- | ----------------------- |
| 200           | Successfuully proccess the request |                      |
| 400           | Error is parsing the inputs |
| 500           | Problem with the server   |

#

### Output:

It comprises sentiment labels or scores for the given input text, indicating the Confidence Scores (positive, negative, or neutral).

# Setup in Local

1. Create [Azure language resource](https://azure.microsoft.com/en-us/products/cognitive-services/language-service/#overview) and then Key and Endpoint are copied.
2. Key and Endpoint are set to the enviroment variables with variable names as LANG_KEY and LANG_ENDPOINT
3. Download and install the latest version of node
4. Repository to local machine shall be cloned.
5. Now terminal has to be opened and run the command "npm install"
6. Command "node app.js" has to be used to run the server in local.
7. Using the endpoint "http://localhost:3000/" server can be tested.
8. Send the post request to the following endpoint "http://localhost:3000/sentiment/" with the payload containing the text to do sentimental analysis in order to test the API.
9. In order to obtain swagger docs, use the following endpoint "http://localhost:3000/docs"

# Usage:

**Request:**

```
curl -X 'POST' \
  'http://178.128.159.37:3000/sentiment/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "text": "Happy to be a part of System Integration course. Everything went well in this semester"
}
```

**Response:**

```JSON
{
  "sentiment": "positive",
  "confidenceScores": {
    "positive": 1,
    "neutral": 0,
    "negative": 0
  },
  "sentences": [
    {
      "text": "Happy to be a part of System Integration course. ",
      "sentiment": "positive",
      "confidenceScores": {
        "positive": 1,
        "neutral": 0,
        "negative": 0
      }
    },
    {
      "text": "Everything went well in this semester",
      "sentiment": "positive",
      "confidenceScores": {
        "positive": 1,
        "neutral": 0,
        "negative": 0
      }
    }
  ]
}
```

**Request:**

```
curl -X 'POST' \
  'http://178.128.159.37:3000/sentiment/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "text": "I am happy to be having you as my best friend"
}'

```

**Response:**

```JSON
{
  "sentiment": "positive",
  "confidenceScores": {
    "positive": 1,
    "neutral": 0,
    "negative": 0
  },
  "sentences": [
    {
      "text": "I am happy to be having you as my best friend",
      "sentiment": "positive",
      "confidenceScores": {
        "positive": 1,
        "neutral": 0,
        "negative": 0
      }
    }
  ]
}
```
