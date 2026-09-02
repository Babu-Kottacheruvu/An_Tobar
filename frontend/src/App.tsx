import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { NewsArticle } from "./pages/NewsArticle";
import { Resources } from "./pages/Resources";
import { ResourceDetail } from "./pages/ResourceDetail";
import { Competitions } from "./pages/Competitions";
import { CompetitionDetail } from "./pages/CompetitionDetail";
import { Tobghaeltacht } from "./pages/Tobghaeltacht";
import { PadletCogg } from "./pages/PadletCogg";
import { StaticInfoPage } from "./pages/StaticInfoPage";
import { GlobalSearch } from "./pages/GlobalSearch";
import { NotFound } from "./pages/NotFound";

const AdminLayout = lazy(() => import("./pages/admin/AdminLayout").then((m) => ({ default: m.AdminLayout })));
const AdminDashboard = lazy(() =>
  import("./pages/admin/AdminDashboard").then((m) => ({ default: m.AdminDashboard })),
);
const AdminResourcesPage = lazy(() =>
  import("./pages/admin/AdminResourcesPage").then((m) => ({ default: m.AdminResourcesPage })),
);
const AdminNewsPage = lazy(() => import("./pages/admin/AdminNewsPage").then((m) => ({ default: m.AdminNewsPage })));
const AdminCompetitionsPage = lazy(() =>
  import("./pages/admin/AdminCompetitionsPage").then((m) => ({ default: m.AdminCompetitionsPage })),
);
const AdminUsersPage = lazy(() => import("./pages/admin/AdminUsersPage").then((m) => ({ default: m.AdminUsersPage })));
const AdminSettingsPage = lazy(() =>
  import("./pages/admin/AdminSettingsPage").then((m) => ({ default: m.AdminSettingsPage })),
);
const AdminContentPage = lazy(() =>
  import("./pages/admin/AdminContentPage").then((m) => ({ default: m.AdminContentPage })),
);
const AdminNavigationPage = lazy(() =>
  import("./pages/admin/AdminNavigationPage").then((m) => ({ default: m.AdminNavigationPage })),
);
const AdminFiltersPage = lazy(() =>
  import("./pages/admin/AdminFiltersPage").then((m) => ({ default: m.AdminFiltersPage })),
);
const AdminFeaturedContentPage = lazy(() =>
  import("./pages/admin/AdminFeaturedContentPage").then((m) => ({ default: m.AdminFeaturedContentPage })),
);
const AdminMediaLibraryPage = lazy(() =>
  import("./pages/admin/AdminMediaLibraryPage").then((m) => ({ default: m.AdminMediaLibraryPage })),
);
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin").then((m) => ({ default: m.AdminLogin })));
const RequireAdminAuth = lazy(() =>
  import("./components/admin/RequireAdminAuth").then((m) => ({ default: m.RequireAdminAuth })),
);

const BunscoilLayout = lazy(() =>
  import("./components/bunscoil/BunscoilLayout").then((m) => ({ default: m.BunscoilLayout })),
);
const BunscoilHome = lazy(() => import("./pages/bunscoil/BunscoilHome").then((m) => ({ default: m.BunscoilHome })));
const PrimaryResourceResults = lazy(() =>
  import("./pages/bunscoil/PrimaryResourceResults").then((m) => ({ default: m.PrimaryResourceResults })),
);
const PrimaryResourceDetail = lazy(() =>
  import("./pages/bunscoil/PrimaryResourceDetail").then((m) => ({ default: m.PrimaryResourceDetail })),
);
const BunscoilComingSoon = lazy(() =>
  import("./pages/bunscoil/BunscoilComingSoon").then((m) => ({ default: m.BunscoilComingSoon })),
);
const TeacherGuide = lazy(() => import("./pages/bunscoil/TeacherGuide").then((m) => ({ default: m.TeacherGuide })));
const KidsCorner = lazy(() => import("./pages/bunscoil/KidsCorner").then((m) => ({ default: m.KidsCorner })));

const TobshaolLayout = lazy(() =>
  import("./components/tobshaol/TobshaolLayout").then((m) => ({ default: m.TobshaolLayout })),
);
const TobshaolHome = lazy(() => import("./pages/tobshaol/TobshaolHome").then((m) => ({ default: m.TobshaolHome })));
const YearGroupPage = lazy(() => import("./pages/tobshaol/YearGroupPage").then((m) => ({ default: m.YearGroupPage })));
const AonadPage = lazy(() => import("./pages/tobshaol/AonadPage").then((m) => ({ default: m.AonadPage })));
const TeacherResourcesPage = lazy(() =>
  import("./pages/tobshaol/TeacherResourcesPage").then((m) => ({ default: m.TeacherResourcesPage })),
);
const SecondaryResourceDetail = lazy(() =>
  import("./pages/tobshaol/SecondaryResourceDetail").then((m) => ({ default: m.SecondaryResourceDetail })),
);

function App() {
  return (
    <LanguageProvider>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/nuacht" element={<News />} />
            <Route path="/nuacht/:slug" element={<NewsArticle />} />
            <Route path="/acmhainni" element={<Resources />} />
            <Route path="/acmhainni/:slug" element={<ResourceDetail />} />
            <Route path="/comortais" element={<Competitions />} />
            <Route path="/comortais/:slug" element={<CompetitionDetail />} />
            <Route path="/tobghaeltacht" element={<Tobghaeltacht />} />
            <Route path="/cuardach" element={<GlobalSearch />} />
            <Route path="/padlet-cogg" element={<PadletCogg />} />
            <Route
              path="/inrochtaineacht"
              element={
                <StaticInfoPage
                  titleKey="footer.accessibility"
                  body={{
                    en: "An Tobar is designed and built to meet WCAG 2.1 AA guidelines, including keyboard navigation, visible focus states and sufficient colour contrast. If you encounter an accessibility barrier, please contact us so we can address it.",
                    ga: "Tá An Tobar deartha agus tógtha chun treoirlínte WCAG 2.1 AA a chomhlíonadh, lena n-áirítear nascleanúint méarchláir, stádais fócais infheicthe agus codarsnacht dhóthanach datha. Má thagann tú ar bhac inrochtaineachta, déan teagmháil linn le do thoil ionas gur féidir linn é a réiteach.",
                  }}
                />
              }
            />
            <Route
              path="/priobhaideacht"
              element={
                <StaticInfoPage
                  titleKey="footer.privacy"
                  body={{
                    en: "An Tobar collects only the information needed to provide our services, such as school registration details for competitions and Tobghaeltacht bookings. We do not sell or share personal data with third parties for marketing purposes.",
                    ga: "Ní bhailíonn An Tobar ach an t-eolas is gá chun ár seirbhísí a chur ar fáil, mar shonraí clárúcháin scoile do chomórtais agus do chuir in áirithe Tobghaeltacht. Ní dhíolann ná ní roinnimid sonraí pearsanta le tríú páirtithe chun críocha margaíochta.",
                  }}
                />
              }
            />
            <Route
              path="/fianain"
              element={
                <StaticInfoPage
                  titleKey="footer.cookies"
                  body={{
                    en: "An Tobar uses only essential cookies needed to remember your language preference and keep the site secure. We do not use tracking or advertising cookies.",
                    ga: "Ní úsáideann An Tobar ach fianáin riachtanacha atá ag teastáil chun do rogha teanga a chuimhneamh agus an suíomh a choinneáil slán. Ní úsáidimid fianáin rianaithe ná fógraíochta.",
                  }}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/bunscoil" element={<BunscoilLayout />}>
            <Route index element={<BunscoilHome />} />
            <Route path="acmhainni" element={<PrimaryResourceResults />} />
            <Route path="acmhainni/:slug" element={<PrimaryResourceDetail />} />
            <Route path="treoir-an-muinteora" element={<TeacherGuide />} />
            <Route
              path="suaitheantais"
              element={
                <BunscoilComingSoon titleKey="bunscoil.nav.badges" bodyKey="bunscoil.stub.badgesBody" />
              }
            />
            <Route path="cuinne-na-bpaisti" element={<KidsCorner />} />
          </Route>

          <Route path="/iar-bhunscoil" element={<TobshaolLayout />}>
            <Route index element={<TobshaolHome />} />
            <Route path="bliain-1" element={<YearGroupPage yearGroupId="bliain-1" />} />
            <Route path="bliain-1/aonad-1" element={<AonadPage yearGroupId="bliain-1" unitId="aonad-1" />} />
            <Route path="muinteoiri" element={<TeacherResourcesPage />} />
            <Route path="acmhainni/:slug" element={<SecondaryResourceDetail />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<RequireAdminAuth />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="abhar" element={<AdminContentPage />} />
              <Route path="acmhainni" element={<AdminResourcesPage />} />
              <Route path="nascleanuint" element={<AdminNavigationPage />} />
              <Route path="scagairi" element={<AdminFiltersPage />} />
              <Route path="nuacht" element={<AdminNewsPage />} />
              <Route path="comortais" element={<AdminCompetitionsPage />} />
              <Route path="ar-barr" element={<AdminFeaturedContentPage />} />
              <Route path="meain" element={<AdminMediaLibraryPage />} />
              <Route path="usaideoiri" element={<AdminUsersPage />} />
              <Route path="socruithe" element={<AdminSettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </LanguageProvider>
  );
}

export default App;
