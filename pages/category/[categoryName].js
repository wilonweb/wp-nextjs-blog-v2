import { getCategoryDetails, getCategorySlugs, getPostList } from "@/lib/posts";

import Date from "@/components/Date";
import FeaturedImage from "@/components/FeaturedImage";
import Head from "next/head";
import Link from "next/link";
import LoadMore from "@/components/LoadMore";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useState } from "react";

export async function getStaticPaths() {
  const categories = await getCategorySlugs();

  return {
    paths: categories.map((category) => ({
      params: {
        categoryName: category.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const categoryPosts = await getPostList(null, {
    key: "categoryName",
    value: params.categoryName,
  });

  const categoryDetails = await getCategoryDetails(params.categoryName);

  return {
    props: {
      categoryPosts: categoryPosts,
      categoryDetails: categoryDetails,
    },
  };
}

export default function CategoryArchive({ categoryPosts, categoryDetails }) {
  const [posts, setPosts] = useState(categoryPosts);

  return (
    <>
      <Head>
        <title>{categoryDetails.name}</title>
      </Head>
      <div className="h-[50vh] min-h-[20rem] bg-[url('/home.jpg')] relative">
        <div className="absolute bg-slate-900 opacity-40 inset-0 z-0"></div>
        <SiteHeader className="header-category z-10 relative" />
        <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8">
          Category Archive: {categoryDetails.name}
        </h1>
        <p className="relative z-10 text-center text-slate-200 text-2xl">
          Found {categoryDetails.count} in this category
        </p>
      </div>

      <main>
        <section className="post-list mt-4">
          <div className="container mx-auto lg:max-w-5xl">
            <ul>
              {/* Mapping de la liste des articles récupérée */}
              {posts.nodes.map((post) => (
                <li key={post.slug} className="grid grid-cols-5 gap-4 mb-4">
                  <div className="col-span-2">
                    {/* Affiche de l'image à la une de l'article */}
                    <FeaturedImage post={post} />
                    {/*console.log(
                    post.featuredImage.node.mediaDetails.sizes[0].sourceUrl
                  )*/}
                  </div>
                  <div className="col-span-3">
                    <h2 className="py-4">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-blue-400 text-2xl  hover:text-blue-600"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    {/* affiche la date */}
                    <div className="py-4">
                      Published on <Date dateString={post.date} />
                    </div>
                    {/* affiche le contenu de l'extrait d'un article de manière sécurisée en utilisant React */}
                    <div
                      className="text-lg"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    ></div>
                    {/* affiche les categories de l'article avec un liens*/}
                    <div className="py-4">
                      Posted under {/* affiche post under ou publié sous*/}
                      {post.categories.nodes.map((category) => (
                        <Link
                          href={`/category/${category.slug}`}
                          key={category.slug}
                          className="text-blue-400 hover:text-blue-500"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="py-4 text-center">
              <LoadMore
                posts={posts}
                setPosts={setPosts}
                taxonomy={{
                  key: "categoryName",
                  value: categoryDetails.slug,
                }}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
