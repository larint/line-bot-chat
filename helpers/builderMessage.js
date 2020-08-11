"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuilderMessage = void 0;
class BuilderMessage {
}
exports.BuilderMessage = BuilderMessage;
BuilderMessage.getAnswerBot = async (messageReceive, profile) => {
    let patternMsg = BuilderMessage.getBotMessage();
    let answer = '';
    patternMsg.forEach((item) => {
        if (messageReceive.includes(item.key)) {
            let text = '';
            if (Array.isArray(item.answer)) {
                let idx = Math.floor(Math.random() * item.answer.length);
                text = item.answer[idx];
            }
            else {
                text = item.answer;
            }
            answer = text.replace(':name', profile.displayName);
            return;
        }
    });
    return answer;
};
BuilderMessage.getBotMessage = () => {
    return [
        { 'key': 'hello', 'answer': ['Hello :name!', 'Tell me something', 'How can i help you?', 'Hi, I\'m bot LINE.'] },
        { 'key': 'hi', 'answer': ['Hello :name!', 'Tell me something', 'How can i help you?', 'Hi, I\'m bot LINE.'] },
        { 'key': 'how are you', 'answer': 'i\'m fine! thank you.' },
        { 'key': 'how are you doing', 'answer': 'i\'m fine! thank you.' },
        { 'key': 'good morning', 'answer': 'Good morning :name.' },
        { 'key': 'evening', 'answer': 'Good evening :name.' },
        { 'key': 'afternoon', 'answer': 'Good afternoon :name.' },
        { 'key': 'night', 'answer': 'Good night :name.' },
        { 'key': 'are you human', 'answer': 'i am not human' },
        { 'key': 'are you robot', 'answer': 'i am a robot' },
        { 'key': 'your name', 'answer': 'My name: Pikachu' },
        { 'key': 'old are you', 'answer': 'i am 1 years old' },
        { 'key': 'can you speak', 'answer': 'i can speak english' },
        { 'key': 'you live', 'answer': 'i live in USA' },
        { 'key': 'weather', 'answer': 'the weather today very nice' },
        { 'key': 'your location', 'answer': 'Here my location:' },
    ];
};
BuilderMessage.createMessageCv = () => {
    return {
        "type": "flex",
        "altText": "Q1. Which is the API to create chatbot?",
        "contents": {
            "type": "bubble",
            "body": {
                "type": "box",
                "layout": "vertical",
                "spacing": "md",
                "contents": [
                    {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "Covid19",
                                "align": "center",
                                "size": "xxl",
                                "weight": "bold"
                            },
                            {
                                "type": "text",
                                "text": "Thống kê dịch Covid19 ở Việt Nam",
                                "wrap": true,
                                "weight": "bold",
                                "margin": "lg"
                            }
                        ]
                    },
                    {
                        "type": "separator"
                    },
                    {
                        "type": "box",
                        "layout": "vertical",
                        "margin": "lg",
                        "contents": [
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": "Ca nhiễm: ",
                                        "flex": 6,
                                        "weight": "bold",
                                        "color": "#666666"
                                    },
                                    {
                                        "type": "text",
                                        "text": 11,
                                        "size": "lg",
                                        "wrap": true,
                                        "flex": 4,
                                        "color": "#FF0000"
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": "Đang điều trị: ",
                                        "flex": 6,
                                        "weight": "bold",
                                        "color": "#666666"
                                    },
                                    {
                                        "type": "text",
                                        "text": "123",
                                        "size": "lg",
                                        "wrap": true,
                                        "flex": 4,
                                        "color": "#FF0000"
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": "Phục hồi:",
                                        "flex": 6,
                                        "weight": "bold",
                                        "color": "#666666"
                                    },
                                    {
                                        "type": "text",
                                        "text": "12312",
                                        "size": "lg",
                                        "wrap": true,
                                        "flex": 4,
                                        "color": "#FF0000"
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": "Tử vong: ",
                                        "flex": 6,
                                        "weight": "bold",
                                        "color": "#666666"
                                    },
                                    {
                                        "type": "text",
                                        "text": "123213",
                                        "size": "lg",
                                        "wrap": true,
                                        "flex": 4,
                                        "color": "#FF0000"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            "footer": {
                "type": "box",
                "layout": "horizontal",
                "spacing": "sm",
                "contents": [
                    {
                        type: 'button',
                        action: {
                            type: 'uri',
                            label: 'Bộ  Y Tế',
                            uri: 'https://ncov.moh.gov.vn/',
                        },
                    }
                ]
            }
        }
    };
};
