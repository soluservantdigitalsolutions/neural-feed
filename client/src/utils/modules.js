export const richTextEditorModules = {
  toolbar: [
    // Add other toolbar options as needed
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    // Add the alignment options
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],

    // Add other groups of options as needed
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    ["link", "image", "video"], // links and media

    ["clean"], // remove formatting button
  ],
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