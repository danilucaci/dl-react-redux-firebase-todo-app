// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);

// const firestore = admin.firestore();
// const FieldValue = admin.firestore.FieldValue;

// exports.onCreateTodo = functions.firestore
//   .document("users/{userId}/todos/{todoId}")
//   .onCreate(async (change, context) => {
//     const todoData = change.data();
//     const { userId } = context.params;
//     const todoProject = todoData.project;

//     console.log(todoData);

//     if (Array.isArray(todoData.labels)) {
//       const labels = [...todoData.labels];

//       // Promise.all gets the array of promises from labels.map().
//       await Promise.all(
//         labels.map(async (label) => {
//           const labelRef = firestore.doc(
//             `users/${userId}/labels/${label.labelID}`,
//           );

//           const snapshot = await labelRef.get().catch(console.error);

//           if (snapshot.exists) {
//             const labelData = snapshot.data();

//             console.log(labelData);

//             labelRef
//               .update({
//                 todosCount: FieldValue.increment(1),
//               })
//               .catch(console.error);
//           }
//         }),
//       ).catch(console.error);
//     }

//     try {
//       if (!todoData.project.isInbox) {
//         if (todoProject) {
//           const projectRef = firestore.doc(
//             `users/${userId}/projects/${todoProject.projectID}`,
//           );
//           const snapshot = await projectRef.get().catch(console.error);

//           if (snapshot.exists) {
//             const projectData = snapshot.data();

//             console.log(projectData);

//             return projectRef
//               .update({
//                 todosCount: FieldValue.increment(1),
//               })
//               .catch(console.error);
//           }
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }

//     return null;
//   });

// exports.onUpdateTodo = functions.firestore
//   .document("users/{userId}/todos/{todoId}")
//   .onUpdate(async (change, context) => {
//     const { userId } = context.params;
//     const previousTodoData = change.before.data();

//     // after is undefined if the doc doesn’t exist
//     const afterTodoData = change.after.data();
//     change.after.updateTime;

//     console.log(change.before.exists);
//     console.log(change.before.updateTime);
//     console.log(change.after.exists);
//     console.log(change.after.updateTime);
//     console.log(previousTodoData);
//     console.log(afterTodoData);

//     /**
//      * If the project from the previous state isn’t the same as the new one
//      * It means the projects have changed and I need to:
//      * - decrement the `todosCount` from the previous project, if it isn’t `Inbox`.
//      * - incremente the `todosCount` for the new project, if it isn’t `Inbox`.
//      */
//     if (
//       previousTodoData.project.projectID !== afterTodoData.project.projectID
//     ) {
//       // If the previous project wasn’t Inbox, decrement the `todosCount`.
//       try {
//         if (!previousTodoData.project.isInbox) {
//           const previousProjectRef = firestore.doc(
//             `users/${userId}/projects/${previousTodoData.project.projectID}`,
//           );

//           const previousSnapshot = await previousProjectRef
//             .get()
//             .catch(console.error);

//           // If the project exists
//           if (previousSnapshot.exists) {
//             const previousProjectData = previousSnapshot.data();

//             console.log(previousProjectData);

//             // Decrement the todos count from the previous project
//             if (previousProjectData.todosCount > 0) {
//               previousProjectRef
//                 .update({
//                   todosCount: FieldValue.increment(-1),
//                 })
//                 .catch(console.error);
//             }
//           }
//         }
//       } catch (error) {
//         console.error(error);
//       }

//       // Increment the `todosCount` of the new project if it’s not `Inbox`.
//       try {
//         if (!afterTodoData.project.isInbox) {
//           const afterProjectRef = firestore.doc(
//             `users/${userId}/projects/${afterTodoData.project.projectID}`,
//           );

//           const afterSnapshot = await afterProjectRef
//             .get()
//             .catch(console.error);

//           // If the project exists
//           if (afterSnapshot.exists) {
//             const afterProjectData = afterSnapshot.data();

//             console.log(afterProjectData);

//             // Increment the todos count of the new project

//             afterProjectRef
//               .update({
//                 todosCount: FieldValue.increment(1),
//               })
//               .catch(console.error);
//           }
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     return null;
//   });

// exports.onDeleteTodo = functions.firestore
//   .document("users/{userId}/todos/{todoId}")
//   .onDelete(async (change, context) => {
//     const todoData = change.data();
//     const { userId } = context.params;
//     const todoProject = todoData.project;

//     console.log(todoData);

//     if (Array.isArray(todoData.labels)) {
//       const labels = [...todoData.labels];

//       // Promise.all gets the array of promises from labels.map().
//       await Promise.all(
//         labels.map(async (label) => {
//           const labelRef = firestore.doc(
//             `users/${userId}/labels/${label.labelID}`,
//           );

//           const snapshot = await labelRef.get().catch(console.error);

//           if (snapshot.exists) {
//             const labelData = snapshot.data();

//             console.log(labelData);

//             if (labelData.todosCount > 0) {
//               labelRef
//                 .update({
//                   todosCount: FieldValue.increment(-1),
//                 })
//                 .catch(console.error);
//             }
//           }
//         }),
//       ).catch(console.error);
//     }

//     try {
//       if (!todoData.project.isInbox) {
//         if (todoProject) {
//           const projectRef = firestore.doc(
//             `users/${userId}/projects/${todoProject.projectID}`,
//           );
//           const snapshot = await projectRef.get().catch(console.error);

//           if (snapshot.exists) {
//             const projectData = snapshot.data();

//             console.log(projectData);

//             if (projectData.todosCount > 0) {
//               return projectRef
//                 .update({
//                   todosCount: FieldValue.increment(-1),
//                 })
//                 .catch(console.error);
//             }
//           }
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }

//     return null;
//   });

// exports.testOnCreateDocument = functions.https.onRequest(async (req, res) => {
//   const todo = {
//     uid: "c6vwIOronNYs1DPrQ8WYTUGltP43",
//     name: "daskasd",
//     dueDate: null,
//     completed: false,
//     project: {
//       colorName: "Lavender",
//       colorValue: "#DF9BE6",
//       projectID: "Nittx9PWXdQ8Oymsem4w",
//       name: "Personal",
//       isInbox: false,
//     },
//     labels: null,
//   };

//   const result = await firestore
//     .collection("users")
//     .doc("c6vwIOronNYs1DPrQ8WYTUGltP43")
//     .collection("todos")
//     .add(todo);

//   res.json({ result });
// });
