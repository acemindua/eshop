import { computed, unref, mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Ckeditor } from "@ckeditor/ckeditor5-vue";
import { Plugin, Superscript, ButtonView, Command, ClassicEditor, FindAndReplace, Undo, Heading, RemoveFormat, Bold, Italic, Underline, Strikethrough, Code, Subscript, Link, Table, TableToolbar, TableProperties, TableCellProperties, List, ListProperties, Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, ImageInsert, LinkImage, SimpleUploadAdapter, BlockQuote, Alignment, Indent, IndentBlock, SourceEditing, Fullscreen, Font, MediaEmbed, SpecialCharacters, SpecialCharactersEssentials, Emoji, Mention } from "ckeditor5";
import "@wiris/mathtype-ckeditor5/dist/index.js";
const footnoteIcon = '<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\n<svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 10h-8a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h.93a2 2 0 0 1 1.664.89l.574.862a1 1 0 0 0 1.664 0l.574-.861A2 2 0 0 1 19.07 20H20a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2zm-6-3V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h.93a2 2 0 0 1 1.664.89L7 13.5"/></svg>';
class FootnoteCommand extends Command {
  refresh() {
    this.isEnabled = this.editor.model.document.selection.rangeCount > 0 && !this.editor.model.document.selection.isCollapsed;
  }
  _getNextFootnoteIndex() {
    const model = this.editor.model;
    const root = model.document.getRoot();
    let maxIndex = 0;
    const walker = model.createRangeIn(root).getWalker();
    for (const { item } of walker) {
      if (item.is("$textProxy") && item.hasAttribute("superscript")) {
        const text = item.data;
        const match = text.match(/^\[(\d+)\]$/);
        if (match) {
          const currentIndex = parseInt(match[1], 10);
          if (!isNaN(currentIndex))
            maxIndex = Math.max(maxIndex, currentIndex);
        }
      }
    }
    return maxIndex + 1;
  }
  execute() {
    if (!this.isEnabled) return;
    const editor = this.editor;
    const model = editor.model;
    const selection = model.document.selection;
    const existingTitle = selection.getAttribute("title");
    const range = selection.getFirstRange();
    const promptMessage = editor.t(
      existingTitle ? "Відредагуйте текст виноски (Очистіть для видалення):" : "Введіть текст виноски:"
    );
    const footnoteText = prompt(promptMessage, existingTitle || "");
    if (footnoteText === null) return;
    const trimmedText = footnoteText.trim();
    let index;
    if (!existingTitle && trimmedText) index = this._getNextFootnoteIndex();
    const marker = index ? `[${index}]` : "";
    const insertPosition = range.end;
    model.change((writer) => {
      if (trimmedText) {
        writer.setAttribute("title", trimmedText, range);
        if (!existingTitle) {
          const markerAttrs = { superscript: true };
          writer.insertText(marker, markerAttrs, insertPosition);
          const newPos = insertPosition.getShiftedBy(marker.length);
          writer.setSelection(newPos);
        } else writer.setSelection(range);
      } else if (existingTitle) {
        writer.removeAttribute("title", range);
        const searchRange = writer.createRange(
          insertPosition,
          insertPosition.getShiftedBy(5)
        );
        const nextNode = searchRange.start.nodeAfter;
        if (nextNode && nextNode.is("$text") && nextNode.data.match(/^\[\d+\]$/) && nextNode.hasAttribute("superscript")) {
          writer.remove(writer.createRangeOn(nextNode));
        }
        writer.setSelection(range.start);
      }
    });
  }
}
class Footnote extends Plugin {
  static get requires() {
    return [Superscript];
  }
  static get pluginName() {
    return "Footnote";
  }
  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.extend("$text", { allowAttributes: ["superscript", "title"] });
  }
  _defineConverters() {
    const conversion = this.editor.conversion;
    conversion.for("downcast").attributeToElement({
      model: "title",
      view: (value, { writer }) => writer.createAttributeElement("span", {
        "data-tooltip": value,
        class: "footnote-anchor"
      }),
      converterPriority: "high"
    });
    conversion.for("upcast").elementToAttribute({
      view: "sup",
      model: "superscript",
      converterPriority: "low"
    });
    conversion.for("upcast").elementToAttribute({
      view: {
        name: "span",
        classes: "footnote-anchor",
        attributes: { "data-tooltip": true }
      },
      model: {
        key: "title",
        value: (viewElement) => viewElement.getAttribute("data-tooltip")
      },
      converterPriority: "high"
    });
  }
  init() {
    this._defineSchema();
    this._defineConverters();
    const editor = this.editor;
    editor.commands.add("insertFootnote", new FootnoteCommand(editor));
    editor.ui.componentFactory.add("insertFootnote", (locale) => {
      const command = editor.commands.get("insertFootnote");
      const button = new ButtonView(locale);
      button.set({
        label: editor.t("Вставити виноску"),
        icon: footnoteIcon,
        tooltip: true
      });
      button.bind("isEnabled").to(command, "isEnabled");
      button.on("execute", () => editor.execute("insertFootnote"));
      return button;
    });
  }
}
class CKEditor extends ClassicEditor {
}
CKEditor.builtinPlugins = [
  FindAndReplace,
  Undo,
  Heading,
  RemoveFormat,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Subscript,
  Superscript,
  Link,
  Table,
  TableToolbar,
  TableProperties,
  TableCellProperties,
  Footnote,
  List,
  ListProperties,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageInsert,
  LinkImage,
  SimpleUploadAdapter,
  BlockQuote,
  Alignment,
  Indent,
  IndentBlock,
  SourceEditing,
  Fullscreen,
  Font,
  MediaEmbed,
  SpecialCharacters,
  SpecialCharactersEssentials,
  Emoji,
  Mention
  //MathType,
];
CKEditor.defaultConfig = {
  licenseKey: "GPL",
  language: "en",
  plugins: CKEditor.builtinPlugins,
  heading: {
    options: [
      {
        model: "paragraph",
        title: "Paragraph",
        class: "ck-heading_paragraph"
      },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1"
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2"
      },
      {
        model: "heading3",
        view: "h3",
        title: "Heading 3",
        class: "ck-heading_heading3"
      }
    ]
  },
  table: {
    //defaultHeadings: { rows: 1, columns: 1 },
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableProperties",
      // ← Додано до контекстної панелі таблиці
      "tableCellProperties"
      // ← Додано до контекстної панелі таблиці
    ]
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true
    }
  },
  image: {
    insert: {
      integrations: ["upload", "url"]
    },
    toolbar: [
      "imageStyle:block",
      "imageStyle:side",
      "|",
      "toggleImageCaption",
      "imageTextAlternative",
      "|",
      "linkImage"
    ]
  },
  simpleUpload: {
    uploadUrl: route("api.upload.image"),
    withCredentials: true
  },
  emoji: {
    dropdownLimit: 5,
    skinTone: "medium"
  },
  fontSize: {
    options: [
      10,
      12,
      14,
      16,
      { title: "Default", model: "18px" },
      // Встановлюємо 18px як опцію "Default"
      20,
      22,
      24,
      26,
      36,
      48
    ],
    supportAllValues: true
  },
  toolbar: [
    "findAndReplace",
    "|",
    "undo",
    "redo",
    "|",
    "removeFormat",
    "heading",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "code",
    "|",
    //"MathType",
    //"ChemType",
    "subscript",
    "superscript",
    "|",
    "fontSize",
    "fontFamily",
    "fontColor",
    "fontBackgroundColor",
    "|",
    "alignment",
    "outdent",
    "indent",
    "|",
    "insertFootnote",
    "link",
    "insertTable",
    "insertImage",
    //"mediaEmbed",
    "|",
    "emoji",
    "specialCharacters",
    "blockQuote",
    "bulletedList",
    "numberedList",
    "|",
    "sourceEditing",
    "|",
    "fullscreen"
  ]
};
const _sfc_main = {
  __name: "TextEditor",
  __ssrInlineRender: true,
  props: ["modelValue"],
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const editorHtml = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Ckeditor), mergeProps({
        modelValue: editorHtml.value,
        "onUpdate:modelValue": ($event) => editorHtml.value = $event,
        editor: unref(CKEditor)
      }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/TextEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
