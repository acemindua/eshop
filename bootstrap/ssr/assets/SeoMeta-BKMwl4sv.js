import { computed, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, Fragment, renderList, useSSRContext, toDisplayString, createCommentVNode } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { usePage, Head } from "@inertiajs/vue3";
const _sfc_main$1 = {
  __name: "SchemaMarkup",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const schemas = computed(() => {
      const data = page.props.seo?.schema || [];
      return (Array.isArray(data) ? data : [data]).map((s) => JSON.stringify(s));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Head), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(schemas.value, (jsonStr, index) => {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent("script"), {
                key: index,
                type: "application/ld+json"
              }, null), _parent2, _scopeId);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(schemas.value, (jsonStr, index) => {
                return openBlock(), createBlock(resolveDynamicComponent("script"), {
                  key: index,
                  type: "application/ld+json",
                  innerHTML: jsonStr
                }, null, 8, ["innerHTML"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SchemaMarkup.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "SeoMeta",
  __ssrInlineRender: true,
  setup(__props) {
    const seo = computed(() => usePage().props.seo);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(seo.value.title)}</title><meta name="description"${ssrRenderAttr("content", seo.value.description)}${_scopeId}>`);
            if (seo.value.keywords) {
              _push2(`<meta name="keywords"${ssrRenderAttr("content", seo.value.keywords)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:site_name"${ssrRenderAttr("content", seo.value.site_name)}${_scopeId}><meta property="og:type"${ssrRenderAttr("content", seo.value.type)}${_scopeId}><meta property="og:url"${ssrRenderAttr("content", seo.value.url)}${_scopeId}><meta property="og:title"${ssrRenderAttr("content", seo.value.title)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", seo.value.description)}${_scopeId}><meta property="og:image"${ssrRenderAttr("content", seo.value.og_image)}${_scopeId}><meta name="robots"${ssrRenderAttr("content", seo.value.robots)}${_scopeId}><link rel="canonical"${ssrRenderAttr("href", seo.value.canonical)}${_scopeId}><!--[-->`);
            ssrRenderList(seo.value.hreflangs, (url, lang) => {
              _push2(`<link rel="alternate"${ssrRenderAttr("hreflang", lang)}${ssrRenderAttr("href", url)}${_scopeId}>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode("title", null, toDisplayString(seo.value.title), 1),
              createVNode("meta", {
                name: "description",
                content: seo.value.description
              }, null, 8, ["content"]),
              seo.value.keywords ? (openBlock(), createBlock("meta", {
                key: 0,
                name: "keywords",
                content: seo.value.keywords
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:site_name",
                content: seo.value.site_name
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:type",
                content: seo.value.type
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:url",
                content: seo.value.url
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:title",
                content: seo.value.title
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: seo.value.description
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:image",
                content: seo.value.og_image
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: seo.value.robots
              }, null, 8, ["content"]),
              createVNode("link", {
                rel: "canonical",
                href: seo.value.canonical
              }, null, 8, ["href"]),
              (openBlock(true), createBlock(Fragment, null, renderList(seo.value.hreflangs, (url, lang) => {
                return openBlock(), createBlock("link", {
                  key: lang,
                  rel: "alternate",
                  hreflang: lang,
                  href: url
                }, null, 8, ["hreflang", "href"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SeoMeta.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
