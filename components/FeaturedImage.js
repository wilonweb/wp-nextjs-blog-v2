import Image from "next/image";
import Link from "next/link";

export default function FeaturedImage({ post }) {
  let img = "";

  const defaultFeaturedImage =
    "http://nextjstest1.local/wp-content/uploads/2022/12/travel_icy-polar_022K.jpg";

  const defaultWidth = "300";
  const defaultHeight = "200";

  if (post.FeaturedImage) {
    let size = post.FeaturedImage.node.mediaDetails.sizes[0];
    img = {
      src: size.sourceUrl,
      width: size.width,
      height: size.height,
    };
  } else
    img = {
      src: defaultFeaturedImage,
      width: defaultWidth,
      height: defaultHeight,
    };
  return (
    <Link href={`/blog/${post.slug}`}>
      <Image
        src={img.src}
        width={img.width}
        height={img.height}
        alt={post.title}
      />
    </Link>
  );
}
