// import { getStaticPaths } from "next";
// import { getStaticProps } from "next";

import { client } from "@/libs/client";
import  styles  from "../../styles/Home.module.scss";


//SSG
export const getStaticProps = async (context) => {
    const id = context.params.id; //contectを引数にしてるすると、URLに含まれてるブログIDを取得できる
    const data = await client.get({ endpoint: "blog", contentId: id }); //micorocms記述

    return{
        props: {
            blog: data, //contentは今回必要ない　固有のデータ入ってるので
        },
    };
};

 //pathを指定
export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "blog" }); //データをとってくる

    const paths = data.contents.map((content) => `/blog/${content.id}`); //パスを指定
    return {
        paths,
        fallback: false, //設定しないものは404に
    };
};

 //HTMLで表示
export default function BlogId({ blog }) {
    //publishedAt 自動的についてる日時
    return (
        <main className={styles.main}>
            <h1 classNmae={styles.title}>{blog.title}</h1>
            <p className={styles.publishedAt}>{blog.publishedAt}</p>
            <div
                className={styles.post}
                dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
            ></div>
        </main>
    );
};