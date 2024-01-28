import Quill from "react-quill";

export const addCustomKeyBindings = (quillInstance) => {
  const Keyboard = Quill.import("modules/keyboard");

  const bindings = {
    bold: {
      key: "B",
      shortKey: true,
      handler: function (range, context) {
        this.quill.format("bold", !context.format.bold);
      },
    },
    italic: {
      key: "I",
      shortKey: true,
      handler: function (range, context) {
        this.quill.format("italic", !context.format.italic);
      },
    },
    underline: {
      key: "U",
      shortKey: true,
      handler: function (range, context) {
        this.quill.format("underline", !context.format.underline);
      },
    },
    alignLeft: {
      key: "L",
      shortKey: true,
      handler: function (range, context) {
        this.quill.format("align", "left");
      },
    },
    alignCenter: {
      key: "C",
      shortKey: true,
      handler: function (range, context) {
        this.quill.format("align", "center");
      },
    },
    alignRight: {
      key: "R",
      shortKey: true,
      handler: function (range, context) {
        this.quill.format("align", "right");
      },
    },
  };

  const keyboardModule = quillInstance.getModule("Keyboard");
  Object.keys(bindings).forEach((name) => {
    keyboardModule.addBinding(bindings[name]);
  });
};

export const richTextEditorModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link", "image", "video"],
    ["clean"],
  ],
  keyboard: {
    bindings: addCustomKeyBindings,
  },
};

export const categories = [
  "Science & Technology",
  "Mathematics",
  "Literature",
  "History",
  "Geography",
  "Languages",
  "Arts & Music",
  "Health & Fitness",
  "Business & Finance",
  "Programming & Computer Science",
  "Philosophy & Psychology",
  "Education & Teaching",
  "Engineering & Architecture",
  "Law & Government",
  "Medicine & Healthcare",
];

export const copyToClipboard = async (baseUrl, id) => {
  const url = `${baseUrl}/${id}`;
  try {
    await navigator.clipboard.writeText(url);
    alert(`${url} copied to clipboard`);
  } catch (err) {
    console.error("Failed to copy URL: ", err);
  }
};
