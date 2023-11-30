import Date from "@/components/Date";
import FeaturedImage from "@/components/FeaturedImage";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import LoadMore from "@/components/LoadMore";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getPostList } from "@/lib/posts";
import { useState } from "react";

/* Fonction asynchrone pour récupérer les données des articles */
export async function getStaticProps() {
  const allPosts = await getPostList();

  return {
    props: {
      allPosts: allPosts,
    },
  };
}

/* Définition du composant principal de la page de blog */
export default function BlogHome({ allPosts }) {
  const [posts, setPosts] = useState(allPosts);
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <div className="h-[50vh] min-h-[20rem] bg-[url('/home.jpg')] relative">
        <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>
        div.
        <div className="container lg:max-w-4xl mx-auto">
          <SiteHeader className="header-blog-home z-10 relative" />
        </div>
        <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8">
          BLOG
        </h1>
        <p className="relative z-10 text-center text-slate-200 text-2xl">
          Read our latest articles
        </p>
      </div>
      <main>
        <section className="container mx-auto lg:max-w-5xl post-list mt-4">
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
            <LoadMore posts={posts} setPosts={setPosts} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
