import { createSSRApp, h } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => resolvePageComponent(
      `./Pages/${name}.vue`,
      /* @__PURE__ */ Object.assign({ "./Pages/Admin/Commerce/Categories/Create.vue": () => import("./assets/Create-BNobCdJn.js"), "./Pages/Admin/Commerce/Categories/Edit.vue": () => import("./assets/Edit-U7-Kj_bb.js"), "./Pages/Admin/Commerce/Categories/Index.vue": () => import("./assets/Index-DpnGCr6F.js"), "./Pages/Admin/Commerce/Categories/Partials/DataForm.vue": () => import("./assets/DataForm-B3QXRLbV.js"), "./Pages/Admin/Commerce/Categories/Partials/DataTable.vue": () => import("./assets/DataTable-PSUq8oPU.js"), "./Pages/Admin/Commerce/Categories/Partials/GeneralForm.vue": () => import("./assets/GeneralForm-CnGI8lpM.js"), "./Pages/Admin/Commerce/Categories/Partials/SEOForm.vue": () => import("./assets/SEOForm-s1BicO37.js"), "./Pages/Admin/Commerce/Categories/Show.vue": () => import("./assets/Show-H5O3S51y.js"), "./Pages/Admin/Commerce/Items/Create.vue": () => import("./assets/Create-Fh1k7ga9.js"), "./Pages/Admin/Commerce/Items/Edit.vue": () => import("./assets/Edit-uyP65haN.js"), "./Pages/Admin/Commerce/Items/Index.vue": () => import("./assets/Index-CS7Gj8RY.js"), "./Pages/Admin/Commerce/Items/Partials/DataForm.vue": () => import("./assets/DataForm-CO_vufZN.js"), "./Pages/Admin/Commerce/Items/Partials/DataTable.vue": () => import("./assets/DataTable-B1dq5Sks.js"), "./Pages/Admin/Commerce/Items/Partials/GeneralForm.vue": () => import("./assets/GeneralForm-Bk1ybhgP.js"), "./Pages/Admin/Commerce/Items/Partials/MediaForm.vue": () => import("./assets/MediaForm-Qqh1aNzJ.js"), "./Pages/Admin/Commerce/Items/Partials/SEOForm.vue": () => import("./assets/SEOForm-CMu4sIYF.js"), "./Pages/Admin/Commerce/Items/Show.vue": () => import("./assets/Show-DqpT9OtY.js"), "./Pages/Admin/Commerce/Manufacturers/Create.vue": () => import("./assets/Create-Ce2w_izw.js"), "./Pages/Admin/Commerce/Manufacturers/Edit.vue": () => import("./assets/Edit-BxDNSweU.js"), "./Pages/Admin/Commerce/Manufacturers/Index.vue": () => import("./assets/Index-BU-D2LDH.js"), "./Pages/Admin/Commerce/Manufacturers/Partials/DataForm.vue": () => import("./assets/DataForm-Dge5wuvW.js"), "./Pages/Admin/Commerce/Manufacturers/Partials/DataTable.vue": () => import("./assets/DataTable-DFPiZH-M.js"), "./Pages/Admin/Commerce/Manufacturers/Partials/GeneralForm.vue": () => import("./assets/GeneralForm-DHX6vFD4.js"), "./Pages/Admin/Commerce/Manufacturers/Partials/SEOForm.vue": () => import("./assets/SEOForm-BvI4G_Kw.js"), "./Pages/Admin/Commerce/Manufacturers/Show.vue": () => import("./assets/Show-Dm21z19N.js"), "./Pages/Admin/Dashboard.vue": () => import("./assets/Dashboard-BTTQdzOG.js"), "./Pages/Admin/Pages/Create.vue": () => import("./assets/Create-hJ7SD4sz.js"), "./Pages/Admin/Pages/Edit.vue": () => import("./assets/Edit-D9L4wf1Q.js"), "./Pages/Admin/Pages/Index.vue": () => import("./assets/Index-CKZeM0A6.js"), "./Pages/Admin/Pages/Partials/DataForm.vue": () => import("./assets/DataForm-DnEeoE_V.js"), "./Pages/Admin/Pages/Partials/DataTable.vue": () => import("./assets/DataTable-B0fCQbDE.js"), "./Pages/Admin/Pages/Partials/GeneralForm.vue": () => import("./assets/GeneralForm-CQbKESUd.js"), "./Pages/Admin/Pages/Partials/SEOForm.vue": () => import("./assets/SEOForm-C2R59pZk.js"), "./Pages/Admin/Pages/Show.vue": () => import("./assets/Show-q1GU5OEO.js"), "./Pages/Admin/Settings.vue": () => import("./assets/Settings-DN6THUy1.js"), "./Pages/Admin/Users/Edit.vue": () => import("./assets/Edit-Dgd2jbaL.js"), "./Pages/Admin/Users/Index.vue": () => import("./assets/Index-CW1J916e.js"), "./Pages/Admin/Users/Partials/DataTable.vue": () => import("./assets/DataTable-Ct81Zt11.js"), "./Pages/Admin/Users/Partials/GeneralForm.vue": () => import("./assets/GeneralForm-ClKKxoZl.js"), "./Pages/Admin/Users/Show.vue": () => import("./assets/Show-BDoZKAnB.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-CxP7Eqx8.js"), "./Pages/Public/Account/Index.vue": () => import("./assets/Index-B8RYXPsp.js"), "./Pages/Public/Commerce/CategoryShow.vue": () => import("./assets/CategoryShow-DvkbET_o.js"), "./Pages/Public/Commerce/Item.vue": () => import("./assets/Item-BgR8GvBK.js"), "./Pages/Public/Commerce/ItemView.vue": () => import("./assets/ItemView-CKtBeqA_.js"), "./Pages/Public/Commerce/View.vue": () => import("./assets/View-B8wPYB7K.js"), "./Pages/Public/Home.vue": () => import("./assets/Home-ted1I6u5.js"), "./Pages/Public/Index.vue": () => import("./assets/Index-DmnuOvnn.js"), "./Pages/Public/PageShow.vue": () => import("./assets/PageShow-Dooc1Jw4.js"), "./Pages/Public/Search.vue": () => import("./assets/Search-CioF9rEo.js") })
    ),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin);
    }
  })
);
