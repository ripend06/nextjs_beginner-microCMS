import { client } from '@/libs/client';
import styles from '@/styles/Home.module.scss';
import Link from 'next/link';

//SSG
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  console.log(data);
  return {
    props: {
      blog: data.contents,
    },
  };
};

//propsでblog渡す
//map関数でひとつひとつ取り出す　キー必須
export default function Home({ blog }) {
  return (
    <>
    <div className={styles.container}>
      {blog.map((blog) => (
        <li key={blog.id}>
          <Link href={`blog/${blog.id}`}>
            {blog.title}
          </Link>
        </li>
      ))}
    </div>
    </>
  )
}
