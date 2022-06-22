
const Document = new Schema({
  _id: String,
  data: [
    {
      id: String,
      content: {
        type: String,
        historyIgnore: true,
      },
      children: [],
      parent: String,
      contentType: String,
      level: Number,
      attributes: {
        bold: Boolean,
        italic: Boolean,
      },
    },
  ],
});
