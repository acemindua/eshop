import { Plugin, ButtonView, Command, Superscript } from "ckeditor5";
import footnoteIcon from "./icons/footnote-icon.svg?raw";

class FootnoteCommand extends Command {
    refresh() {
        this.isEnabled =
            this.editor.model.document.selection.rangeCount > 0 &&
            !this.editor.model.document.selection.isCollapsed;
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
            existingTitle
                ? "Відредагуйте текст виноски (Очистіть для видалення):"
                : "Введіть текст виноски:"
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

                if (
                    nextNode &&
                    nextNode.is("$text") &&
                    nextNode.data.match(/^\[\d+\]$/) &&
                    nextNode.hasAttribute("superscript")
                ) {
                    writer.remove(writer.createRangeOn(nextNode));
                }

                writer.setSelection(range.start);
            }
        });
    }
}

export default class Footnote extends Plugin {
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

        // Downcast: модель -> view (span + data-tooltip)
        conversion.for("downcast").attributeToElement({
            model: "title",
            view: (value, { writer }) =>
                writer.createAttributeElement("span", {
                    "data-tooltip": value,
                    class: "footnote-anchor",
                }),
            converterPriority: "high",
        });

        // Upcast: view -> model
        conversion.for("upcast").elementToAttribute({
            view: "sup",
            model: "superscript",
            converterPriority: "low",
        });

        conversion.for("upcast").elementToAttribute({
            view: {
                name: "span",
                classes: "footnote-anchor",
                attributes: { "data-tooltip": true },
            },
            model: {
                key: "title",
                value: (viewElement) =>
                    viewElement.getAttribute("data-tooltip"),
            },
            converterPriority: "high",
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
                tooltip: true,
            });
            button.bind("isEnabled").to(command, "isEnabled");
            button.on("execute", () => editor.execute("insertFootnote"));

            return button;
        });
    }
}
