const axios = require('axios');
const { GoogleAuth } = require('google-auth-library');

exports.handler = async function (event, context) {
  // التأكد من أن الطلب هو POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { from, to } = JSON.parse(event.body);
  const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
  const GOOGLE_CREDENTIALS_JSON_STRING = process.env.GOOGLE_CREDENTIALS_JSON;

  if (!FIREBASE_PROJECT_ID || !GOOGLE_CREDENTIALS_JSON_STRING) {
    return { statusCode: 500, body: JSON.stringify({ error: "Project ID or Google Credentials not set." }) };
  }

  const credentials = JSON.parse(GOOGLE_CREDENTIALS_JSON_STRING);

  const auth = new GoogleAuth({
    credentials,
    scopes: 'https://www.googleapis.com/auth/firebase.messaging',
  });

  try {
    // --- بداية الجزء المعدل لجلب كل التوكينات ---
    const accessToken = await auth.getAccessToken();

    // 1. جلب كل الوثائق من collection المسماة admin_tokens
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/admin_tokens`;
    
    const response = await axios.get(firestoreUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const documents = response.data.documents || [];
    const tokens = documents.map(doc => doc.fields.token.stringValue).filter(Boolean);

    if (tokens.length === 0) {
      console.log("No admin tokens found.");
      return { statusCode: 200, body: JSON.stringify({ message: "No admin tokens to send notification to." }) };
    }
    // --- نهاية الجزء المعدل ---

    // 2. إرسال الإشعار لكل توكن
    const fcmUrl = `https://fcm.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/messages:send`;
    
    const notificationPromises = tokens.map(token => {
      const messagePayload = {
        message: {
          token: token,
          notification: {
            title: "🎉 حجز جديد!",
            body: `تم استلام حجز جديد لرحلة من ${from} إلى ${to}`,
          },
          data: { // هنا نرسل بيانات إضافية للتطبيق
            from: from,
            to: to,
            click_action: "FLUTTER_NOTIFICATION_CLICK" // لتوجيه المستخدم عند الضغط على الإشعار
          }
        },
      };
      
      return axios.post(fcmUrl, messagePayload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
    });

    await Promise.all(notificationPromises);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Notification sent successfully to ${tokens.length} devices!` }),
    };
  } catch (error) {
    console.error("Error sending notification:", error.response ? error.response.data : error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send notification." }),
    };
  }
};