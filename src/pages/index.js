import Head from "next/head";
import Style from "../styles/Home.module.css";
import Image from "next/image";
import { GraphQLClient, gql } from "graphql-request";
import Link from "next/link";

const url =
  "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cld3i52fm0lpi01up5mpk5v3i/master";

  // instantiating a graphql client...
const graphConnect = new GraphQLClient(url);

const query = gql`
  query {
    blogposts {
      title
      slug
      coverPhoto {
        url
      }
      excerpt
      id
      author {
        authorName
      }
    }
  }
`;

export async function getServerSideProps() {

  // making request to hygraph for posts
  const { blogposts } = await graphConnect.request(query);

  return { props: { blogposts } };
}

function Homepage({ blogposts }) {
  return (
    <>
      <Head>
        <title>Blog Tutorial</title>
      </Head>
      <main className={Style.postcontainer}>
  {/* using array.map() method to iterate each post returned from hygraph */}
        {blogposts.map((blogposts) => {
          return (
            <div  key={blogposts.id}>
              <div className={Style.inside}>
                <div className={Style.img}>
                  <Image
                    src={blogposts.coverPhoto.url}
                    alt="featured text"
                    fill
                  />
                </div>
                <div className={Style.container}>
                  <Link href={blogposts.slug}>
                    <h2>{blogposts.title}</h2>
                  </Link>
                  <p>{blogposts.excerpt}</p>
                  <p>By {blogposts.author.authorName}</p>
                  <Link href={blogposts.slug}>
                    <button className={Style.readButton}>Read More</button>{" "}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        ;
      </main>

   
    </>
  );
}

export default Homepage;
