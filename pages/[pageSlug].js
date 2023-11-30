import { getPageSlugs, getSinglePage } from "@/lib/page";

import Head from "next/head";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export async function getStaticProps({ params }) {
  const pageData = await getSinglePage(params.pageSlug);

  return {
    props: {
      pageData,
    },
  };
}

export async function getStaticPaths() {
  const pageSlugs = await getPageSlugs();

  return {
    paths: pageSlugs.map((s) => ({
      params: {
        pageSlug: s.slug,
      },
    })),
    fallback: false,
  };
}
export default function Page({ pageData }) {
  return (
    <>
      <Head>
        <title>{pageData.title}</title>
      </Head>
      <section className="bg-slate-700">
        <SiteHeader className="header-page z-10 relative" />
      </section>
      <section>
        <article>
          <h1 className="text-6xl text-center text-slate-700 relative py-8">
            {pageData.title}
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: pageData.content }}
            className="post-content container mx-auto lg:max-w-4xl"
          ></div>
        </article>
      </section>
      <SiteFooter />
    </>
  );
}
