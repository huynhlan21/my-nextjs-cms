import Script from "next/script";
import { getMarkup } from "~/libs/utils";

export default async function Home() {
  const hero = await getMarkup("app/content", "hero.md");

  if (!hero) {
    return null;
  }

  const { data } = hero;

  return (
    <>
      {/* Enables registering from this page */}
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <main>
        <div className="mt-10 flex flex-col items-center">
          <h1 className="text-2xl">{data.title}</h1>
          <p className="text-lg">{data.subtitle}</p>
          <button>{data.buttonText}</button>
        </div>
      </main>
    </>
  );
}
