import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import { kidsCategories } from "../../data/bunscoil/kidsCategories";
import { getWordOfTheDay, vocabularyWords } from "../../data/bunscoil/vocabularyWords";
import { primaryResources } from "../../data/bunscoil/resources";
import { Breadcrumbs } from "../../components/layout/Breadcrumbs";
import { KidsCategoryCard } from "../../components/bunscoil/KidsCategoryCard";
import { VocabularyCard } from "../../components/bunscoil/VocabularyCard";
import { TryItActivity } from "../../components/bunscoil/TryItActivity";
import { PrimaryResourceCard } from "../../components/bunscoil/PrimaryResourceCard";

function ResourceRow({
  resources,
  favourites,
  onToggleFavourite,
}: {
  resources: typeof primaryResources;
  favourites: string[];
  onToggleFavourite: (id: string) => void;
}) {
  const navigate = useNavigate();

  if (resources.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <PrimaryResourceCard
          key={resource.id}
          resource={resource}
          isFavourite={favourites.includes(resource.id)}
          onToggleFavourite={onToggleFavourite}
          onView={(target) => navigate(`/bunscoil/acmhainni/${target.slug}`)}
        />
      ))}
    </div>
  );
}

export function KidsCorner() {
  const { t } = useLanguage();
  const [favourites, setFavourites] = useState<string[]>([]);

  const toggleFavourite = (id: string) =>
    setFavourites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  const wordOfTheDay = useMemo(() => getWordOfTheDay(), []);
  const newWords = useMemo(
    () => vocabularyWords.filter((word) => word.id !== wordOfTheDay.id).slice(0, 6),
    [wordOfTheDay],
  );

  const games = useMemo(
    () => primaryResources.filter((resource) => resource.topic === "cluichi").slice(0, 3),
    [],
  );
  const videos = useMemo(
    () => primaryResources.filter((resource) => resource.resourceType === "videos").slice(0, 3),
    [],
  );
  const songs = useMemo(
    () =>
      primaryResources
        .filter((resource) => resource.titleGa.includes("Amhrán") || resource.titleEn.includes("Song"))
        .slice(0, 3),
    [],
  );

  return (
    <>
      <Breadcrumbs
        items={[
          { label: t("home.entryBunscoilTitle"), path: "/bunscoil" },
          { label: t("bunscoil.nav.kidsCorner") },
        ]}
      />

      <div className="bg-linear-to-br from-brand-gold-50 via-white to-brand-green-50 py-12 text-center sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-4xl font-black text-brand-navy-900 sm:text-5xl">
            {t("bunscoil.nav.kidsCorner")}
          </h1>
          <p className="mt-3 text-xl font-bold text-brand-green-700">{t("kidsCorner.tagline")}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {kidsCategories.map((category) => (
            <KidsCategoryCard key={category.id} category={category} />
          ))}
        </div>

        <section className="mt-14 text-center">
          <h2 className="text-2xl font-black text-brand-navy-900">{t("kidsCorner.wordOfDay")}</h2>
          <div className="mx-auto mt-5 max-w-xs">
            <VocabularyCard word={wordOfTheDay} size="large" />
          </div>
        </section>

        <section id="kids-games" className="mt-16 scroll-mt-20">
          <h2 className="text-2xl font-black text-brand-navy-900">{t("kidsCorner.gamesHeading")}</h2>
          {games.length > 0 ? (
            <div className="mt-5">
              <ResourceRow resources={games} favourites={favourites} onToggleFavourite={toggleFavourite} />
            </div>
          ) : (
            <p className="mt-4 text-brand-navy-800/70">{t("kidsCorner.storiesComingSoon")}</p>
          )}
        </section>

        <section id="kids-videos" className="mt-16 scroll-mt-20">
          <h2 className="text-2xl font-black text-brand-navy-900">{t("kidsCorner.videosHeading")}</h2>
          {videos.length > 0 ? (
            <div className="mt-5">
              <ResourceRow resources={videos} favourites={favourites} onToggleFavourite={toggleFavourite} />
            </div>
          ) : (
            <p className="mt-4 text-brand-navy-800/70">{t("kidsCorner.storiesComingSoon")}</p>
          )}
        </section>

        <section id="kids-songs" className="mt-16 scroll-mt-20">
          <h2 className="text-2xl font-black text-brand-navy-900">{t("kidsCorner.songsHeading")}</h2>
          {songs.length > 0 ? (
            <div className="mt-5">
              <ResourceRow resources={songs} favourites={favourites} onToggleFavourite={toggleFavourite} />
            </div>
          ) : (
            <p className="mt-4 text-brand-navy-800/70">{t("kidsCorner.storiesComingSoon")}</p>
          )}
        </section>

        <section id="kids-stories" className="mt-16 scroll-mt-20">
          <h2 className="text-2xl font-black text-brand-navy-900">{t("kidsCorner.storiesHeading")}</h2>
          <p className="mt-4 rounded-xl border-2 border-dashed border-brand-navy-800/15 p-8 text-center text-brand-navy-800/70">
            {t("kidsCorner.storiesComingSoon")}
          </p>
        </section>

        <section id="kids-new-words" className="mt-16 scroll-mt-20">
          <h2 className="text-2xl font-black text-brand-navy-900">{t("kidsCorner.newWordsHeading")}</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {newWords.map((word) => (
              <VocabularyCard key={word.id} word={word} />
            ))}
          </div>
        </section>

        <section id="kids-try-it" className="mt-16 scroll-mt-20">
          <h2 className="text-2xl font-black text-brand-navy-900">{t("kidsCorner.tryItHeading")}</h2>
          <div className="mx-auto mt-5 max-w-xl">
            <TryItActivity />
          </div>
        </section>
      </div>
    </>
  );
}
