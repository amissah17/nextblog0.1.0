
import { GraphQLClient, gql } from "graphql-request";
import Head from "next/head";
import Style from "../styles/SinglePost.module.css";
import Image from "next/image";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

const url =
  "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cld3i52fm0lpi01up5mpk5v3i/master";

const graphConnect = new GraphQLClient(url);

const query = gql`
  query MyQuery($slug: String!) {
    blogpost(where: { slug: $slug }) {
      title
      author {
        authorName
      }
      content {
        markdown
      }
      coverPhoto {
        alt
        url
      }
    }
  }
`;

export async function getStaticPaths() {
  const { blogposts } = await graphConnect.request(gql`
    query {
      blogposts {
        slug
      }
    }
  `);

  return {
    paths: blogposts.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { blogpost } = await graphConnect.request(query, { slug: params.slug });
  const content = blogpost.content.markdown;
  const MdxSource = await serialize(content);
  return { props: { post: blogpost, source: MdxSource } };
}

function SinglePost({ post, source }) {
  console.log(post);


  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <div className={Style.main}>
        <div className={Style.header}>
          <h1>{post.title}</h1>
          <h3>Author: {post.author.authorName}</h3>
        </div>
        <div className={Style.img}>
           <Image
          src={post.coverPhoto.url}
          alt={post.coverPhoto.alt}
         fill
          
        />
        </div>
       
        <div className={Style.mdxs}>
          <MDXRemote {...source} />
        </div>
      </div>
    </>
  );
}

export default SinglePost;
