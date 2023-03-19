import { GraphQLClient, gql } from "graphql-request";
import Head from "next/head";
import Style from "../styles/SinglePost.module.css";
import Image from "next/image";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

const url = `${process.env.ENDPOINT}`;


  //instantiating a graphqlclient...
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

  // querying for slugs from hygraph...
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
  // making request to hygraph for each post matching a slug
  const { blogpost } = await graphConnect.request(query, { slug: params.slug });
  const content = blogpost.content.markdown;

  //serializing my markdown response from the rich text field
  const MdxSource = await serialize(content);

  //passing the post together with the serialized post.
  return { props: { post: blogpost, source: MdxSource } };
}

function SinglePost({ post, source }) {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>

      <main className={Style.main}>
        <div className={Style.header}>
          <h1>{post.title}</h1>
          <h3>Author: {post.author.authorName}</h3>
        </div>
        <div className={Style.img}>
          <Image src={post.coverPhoto.url} alt={post.coverPhoto.alt} fill />
        </div>

        <div className={Style.mdxs}>
          <MDXRemote {...source} />
        </div>
      </main>
    </>
  );
}

export default SinglePost;
