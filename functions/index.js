const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

exports.getAllTodos = functions.https.onRequest(async (request, response) => {
  const snapshot = await firestore.collection("colors").get();

  const colors = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  response.json({ colors });
});
