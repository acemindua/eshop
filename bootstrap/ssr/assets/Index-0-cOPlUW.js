import { ref, computed, withCtx, unref, createVNode, toDisplayString, withDirectives, vModelText, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./SettingsAdminLayout-BSMTJHiX.js";
import "./AdminLayout-Dz4Fusn0.js";
import "@tabler/icons-vue";
import "./ApplicationLogo-DsJOFw9w.js";
import "./ImageDataView-C9GsQUU8.js";
import "./UserStatus-DfjMQc-4.js";
import "./Breadcrumbs-Be9A5eey.js";
import "pinia";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: { translations: Array, locales: Array },
  setup(__props) {
    const props = __props;
    const form = useForm({ items: props.translations });
    const search = ref("");
    const filtered = computed(
      () => form.items.filter(
        (i) => i.key.toLowerCase().includes(search.value.toLowerCase()) || Object.values(i.values).some(
          (v) => String(v).toLowerCase().includes(search.value.toLowerCase())
        )
      )
    );
    const submit = () => form.post(route("admin.translations.update_all"), { preserveScroll: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 bg-white rounded-lg shadow"${_scopeId}><div class="flex justify-between mb-4"${_scopeId}><h1 class="text-xl font-bold"${_scopeId}>Локалізація (JSON)</h1><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(form).processing ? "..." : "Зберегти")}</button></div><input${ssrRenderAttr("value", search.value)} placeholder="Пошук..." class="w-full mb-4 border-gray-300 rounded"${_scopeId}><div class="overflow-auto max-h-[70vh]"${_scopeId}><table class="w-full text-left border-collapse"${_scopeId}><thead class="sticky top-0 bg-gray-100"${_scopeId}><tr${_scopeId}><th class="p-2 border"${_scopeId}>Ключ</th><!--[-->`);
            ssrRenderList(__props.locales, (l) => {
              _push2(`<th class="p-2 border uppercase"${_scopeId}>${ssrInterpolate(l)}</th>`);
            });
            _push2(`<!--]--></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(filtered.value, (item) => {
              _push2(`<tr class="${ssrRenderClass({
                "bg-red-50": Object.values(item.values).some(
                  (v) => !v
                )
              })}"${_scopeId}><td class="p-2 border font-mono text-xs"${_scopeId}>${ssrInterpolate(item.key)}</td><!--[-->`);
              ssrRenderList(__props.locales, (l) => {
                _push2(`<td class="p-2 border"${_scopeId}><textarea rows="1" class="w-full border-0 focus:ring-1 p-1 text-sm resize-none"${_scopeId}>${ssrInterpolate(item.values[l])}</textarea></td>`);
              });
              _push2(`<!--]--></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 bg-white rounded-lg shadow" }, [
                createVNode("div", { class: "flex justify-between mb-4" }, [
                  createVNode("h1", { class: "text-xl font-bold" }, "Локалізація (JSON)"),
                  createVNode("button", {
                    onClick: submit,
                    disabled: unref(form).processing,
                    class: "bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
                  }, toDisplayString(unref(form).processing ? "..." : "Зберегти"), 9, ["disabled"])
                ]),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => search.value = $event,
                  placeholder: "Пошук...",
                  class: "w-full mb-4 border-gray-300 rounded"
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelText, search.value]
                ]),
                createVNode("div", { class: "overflow-auto max-h-[70vh]" }, [
                  createVNode("table", { class: "w-full text-left border-collapse" }, [
                    createVNode("thead", { class: "sticky top-0 bg-gray-100" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "p-2 border" }, "Ключ"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.locales, (l) => {
                          return openBlock(), createBlock("th", {
                            key: l,
                            class: "p-2 border uppercase"
                          }, toDisplayString(l), 1);
                        }), 128))
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(filtered.value, (item) => {
                        return openBlock(), createBlock("tr", {
                          key: item.key,
                          class: {
                            "bg-red-50": Object.values(item.values).some(
                              (v) => !v
                            )
                          }
                        }, [
                          createVNode("td", { class: "p-2 border font-mono text-xs" }, toDisplayString(item.key), 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.locales, (l) => {
                            return openBlock(), createBlock("td", {
                              key: l,
                              class: "p-2 border"
                            }, [
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => item.values[l] = $event,
                                rows: "1",
                                class: "w-full border-0 focus:ring-1 p-1 text-sm resize-none",
                                onInput: (e) => {
                                  e.target.style.height = "auto";
                                  e.target.style.height = e.target.scrollHeight + "px";
                                }
                              }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                [vModelText, item.values[l]]
                              ])
                            ]);
                          }), 128))
                        ], 2);
                      }), 128))
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Translations/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
