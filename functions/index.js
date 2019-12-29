const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

/**
 * Steps
 *
 * 1. `batch.update()` the new user to have `userDataPopulated: true`
 * 2. Get all the colors
 * 3. Filter `inboxColor` from all the app colors
 * 4. Filter `otherColors` from all the app colors
 * 5. Get an empty `doc()` ref to the inbox project
 * 6. Get an empty `doc()` ref to the demo project
 * 7. Get an empty `doc()` ref to the demo label
 * 8. `batch.set()` inbox project
 * 9. `batch.set()` demo project
 * 10. `batch.set()` demo label
 * 11. `batch.set()` demo todos
 * 12. batch.commit()
 */

const COLLECTIONS = {
  users: "users",
  projects: "projects",
  labels: "labels",
  todos: "todos",
  colors: "colors",
  inboxColorIdentifier: "isInboxColor",
  inboxProjectIdentifier: "isInbox",
  defaultUserProjectName: "Inbox",
};

exports.onCreateUser = functions.firestore
  .document(`${COLLECTIONS.users}/{userId}`)
  .onCreate(async (snapshot, ctx) => {
    const { userId } = ctx.params;

    // const userData = snapshot.data();

    let batch = firestore.batch();

    const userRef = firestore.collection(COLLECTIONS.users).doc(userId);

    batch.update(userRef, { userDataPopulated: true });

    // 1. Get all colors from firestore
    const colorSnapshot = await firestore
      .collection(COLLECTIONS.colors)
      .limit(40)
      .get();

    if (colorSnapshot.empty || colorSnapshot.size < 2) {
      throw new Error("No colors were found");
    }

    const colorsData = colorSnapshot.docs.reduce(
      (docs, currDoc) => [...docs, { id: currDoc.id, ...currDoc.data() }],
      [],
    );

    const inboxColor = colorsData.filter(
      (color) => color[COLLECTIONS.inboxColorIdentifier] === true,
    );

    const otherColors = colorsData.filter(
      (color) => color[COLLECTIONS.inboxColorIdentifier] === false,
    );

    // Empty doc ref
    const inboxProjectRef = firestore
      .collection(COLLECTIONS.users)
      .doc(userId)
      .collection(COLLECTIONS.projects)
      .doc();

    // Empty doc ref
    const demoProjectRef = firestore
      .collection(COLLECTIONS.users)
      .doc(userId)
      .collection(COLLECTIONS.projects)
      .doc();

    // Empty doc ref
    const demoLabelRef = firestore
      .collection(COLLECTIONS.users)
      .doc(userId)
      .collection(COLLECTIONS.labels)
      .doc();

    const newInboxProject = {
      uid: userId,
      name: COLLECTIONS.defaultUserProjectName,
      [COLLECTIONS.inboxProjectIdentifier]: true,
      color: {
        colorID: inboxColor[0].id,
        colorName: inboxColor[0].colorName,
        colorValue: inboxColor[0].colorValue,
      },
    };

    console.log({ newInboxProject });

    batch.set(inboxProjectRef, newInboxProject);

    const newDemoProject = {
      uid: userId,
      name: "Welcome",
      [COLLECTIONS.inboxProjectIdentifier]: false,
      color: {
        colorID: otherColors[0].id,
        colorName: otherColors[0].colorName,
        colorValue: otherColors[0].colorValue,
      },
    };

    console.log({ newDemoProject });

    batch.set(demoProjectRef, newDemoProject);

    const newDemoLabel = {
      uid: userId,
      name: "personal",
      color: {
        colorID: otherColors[1].id,
        colorName: otherColors[1].colorName,
        colorValue: otherColors[1].colorValue,
      },
    };

    console.log({ newDemoLabel });

    batch.set(demoLabelRef, newDemoLabel);

    const demoTodo1Ref = firestore
      .collection(COLLECTIONS.users)
      .doc(userId)
      .collection(COLLECTIONS.todos)
      .doc();

    const demoTodo1 = {
      uid: userId,
      name: "Create your first todo",
      completed: false,
      dueDate: null,
      withTime: false,
      labels: null,
      project: {
        projectID: inboxProjectRef.id,
        colorName: newInboxProject.color.colorName,
        colorValue: newInboxProject.color.colorValue,
        name: newInboxProject.name,
        [COLLECTIONS.inboxProjectIdentifier]: true,
      },
    };

    console.log({ demoTodo1 });

    batch.set(demoTodo1Ref, demoTodo1);

    const demoTodo2Ref = firestore
      .collection(COLLECTIONS.users)
      .doc(userId)
      .collection(COLLECTIONS.todos)
      .doc();

    var todoDate = new Date();

    const demoTodo2 = {
      uid: userId,
      name: "Create a todo with a due date",
      completed: false,
      dueDate: new Date(todoDate.setHours(todoDate.getHours() + 6)),
      withTime: true,
      labels: null,
      project: {
        projectID: demoProjectRef.id,
        colorName: newDemoProject.color.colorName,
        colorValue: newDemoProject.color.colorValue,
        name: newDemoProject.name,
        [COLLECTIONS.inboxProjectIdentifier]: false,
      },
    };

    console.log({ demoTodo2 });

    batch.set(demoTodo2Ref, demoTodo2);

    const demoTodo3Ref = firestore
      .collection(COLLECTIONS.users)
      .doc(userId)
      .collection(COLLECTIONS.todos)
      .doc();

    const demoTodo3 = {
      uid: userId,
      name: "Create your first project",
      completed: false,
      dueDate: new Date(todoDate.setDate(todoDate.getDate() + 1)),
      withTime: false,
      labels: [
        {
          labelID: demoLabelRef.id,
          colorName: newDemoLabel.color.colorName,
          colorValue: newDemoLabel.color.colorValue,
          name: newDemoLabel.name,
        },
      ],
      project: {
        projectID: inboxProjectRef.id,
        colorName: newInboxProject.color.colorName,
        colorValue: newInboxProject.color.colorValue,
        name: newInboxProject.name,
        [COLLECTIONS.inboxProjectIdentifier]: true,
      },
    };

    console.log({ demoTodo3 });

    batch.set(demoTodo3Ref, demoTodo3);

    return (
      batch
        .commit()
        //eslint-disable-next-line
        .then(() => {
          console.log("Batch complete");
        })
        .catch((error) => {
          console.log("Batch failed");
          console.log(error);
        })
    );
  });
