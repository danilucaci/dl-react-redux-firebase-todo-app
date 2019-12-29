/**
 *
 * @param {Object} firestore firestore instance
 */
async function seedColors(firestore) {
  const colors = [
    {
      colorName: "Grey",
      colorValue: "#B8B8B8",
      isInboxColor: true,
    },
    {
      colorName: "Light Pink",
      colorValue: "#FFB6C1",
      isInboxColor: false,
    },
    {
      colorName: "Dim Gray",
      colorValue: "#696969",
      isInboxColor: false,
    },
    {
      colorName: "Coral",
      colorValue: "#FF7F50",
      isInboxColor: false,
    },
    {
      colorName: "Powder Blue",
      colorValue: "#B0E0E6",
      isInboxColor: false,
    },
    {
      colorName: "Medium Violet Red",
      colorValue: "#C71585",
      isInboxColor: false,
    },
    {
      colorName: "Amethyst",
      colorValue: "#9966CC",
      isInboxColor: false,
    },
    {
      colorName: "Light Salmon",
      colorValue: "#FFA07A",
      isInboxColor: false,
    },
    {
      colorName: "Steel Blue",
      colorValue: "#4682B4",
      isInboxColor: false,
    },
    {
      colorName: "Saddle Brown",
      colorValue: "#8B4513",
      isInboxColor: false,
    },
    {
      colorName: "Orange",
      colorValue: "#FFA500",
      isInboxColor: false,
    },
    {
      colorName: "Medium Aquamarine",
      colorValue: "#66CDAA",
      isInboxColor: false,
    },
    {
      colorName: "Dark Sea Green",
      colorValue: "#8FBC8F",
      isInboxColor: false,
    },
    {
      colorName: "Orange Red",
      colorValue: "#FF4500",
      isInboxColor: false,
    },
    {
      colorName: "Teal",
      colorValue: "#008080",
      isInboxColor: false,
    },
    {
      colorName: "Dark Magenta",
      colorValue: "#8B008B",
      isInboxColor: false,
    },
    {
      colorName: "Navajo White",
      colorValue: "#FFDEAD",
      isInboxColor: false,
    },
    {
      colorName: "Green",
      colorValue: "#008000",
      isInboxColor: false,
    },
    {
      colorName: "Deep Pink",
      colorValue: "#FF1493",
      isInboxColor: false,
    },
  ];

  await Promise.all(
    colors.map((color) => firestore.collection("colors").add(color)),
  );
}

export default seedColors;
