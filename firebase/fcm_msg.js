/*
var message = {
    notification: {
        title: '$GOOG up 1.43% on the day',
        body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.'
    },
    data: {
        score: '850',
        time: '2:45'
    },
    token: registrationToken,
    topic: topic,
    condition = "'stock-GOOG' in topics || 'industry-tech' in topics",

    android: {
        ttl: 3600 * 1000, // 1 hour in milliseconds
        priority: 'normal',
        collapseKey,
        restrictedPackageName,
        data,
        notification: {
            title: '$GOOG up 1.43% on the day',
            body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.',
            icon: 'stock_ticker_update',
            color: '#f45342'
        },
        sound,
        tag,
        clickAction,
        bodyLocKey,
        bodyLocArgs,
        titleLocKey,
        titleLocArgs,
    },


    apns: {
        headers: {
            'apns-priority': '10'
        },
        payload: {
            aps: {
                alert: {
                    title: '$GOOG up 1.43% on the day',
                    body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.',
                },
                badge: 42,
            }
        }
    }
};
*/

function FcmMsg ( regToken, data, topic, condition,
                  notificationTitle, notificationBody, 
                  priority, notificationSound, notificationColor, notificationImgUrl) {
    
    this.android = { priority: priority || 'high'};
    this.android.notification = {};
    this.android.notification.sound = notificationSound || "default";
    this.android.notification.color = notificationColor || "#ffffff";
    this.apns = { headers: { 'apns-priority': priority === 'normal' ? '5' : '10' } };
	this.data = {};
	
    if(regToken)
        this.token = regToken;
    if(data)
        this.data = data;
        
    this.notification = {};
    this.notification.title = notificationTitle;
    this.notification.body = notificationBody;
    this.data.imgUrl = notificationImgUrl

    if(topic)
        this.topic = topic;
    if(condition)
        this.condition = condition;
};

module.exports = FcmMsg;