"use client"
import styles from './page.module.css'
import Link from 'next/link'
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import { useEffect, useState } from 'react';

export default function Home() {

  const [value, setvalue] = useState("");

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setvalue(data.user.email);
      localStorage.setItem("email", data.user.email);

    })
  }

  useEffect(() => {
    setvalue(localStorage.getItem("email"));
  })


  const logout = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.nav}>
          <div className={styles.content}>
            <a href="/">Home</a>
            <a href="#">About</a>
            <a href="/combine">FAQ</a>

            {value ? <a onClick={logout}>logout</a> : <a onClick={handleClick}>SignUp</a>}
          </div>
          <div className={styles.logo}>
            GEN!
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.main_left}>
            <div className={styles.main_left_top}>
              <div className={styles.box_t}>
                <h1 id={styles.title}>High Quality <b>AI</b></h1>
                <div className={styles.side_img}>
                  <div className={styles.images} id={styles.img1}></div>
                  <div className={styles.images} id={styles.img2}></div>
                  <div className={styles.images} id={styles.img3}></div>
                </div>
              </div>
              <h1> Generated Images and Text</h1>
              <br />
              <p>
                "Introducing our cutting-edge AI Generation App! Unlock the power
                of artificial intelligence to effortlessly create high-quality
                content for your business, blog, or project. With our user-friendly
                platform, you can now produce engaging articles, blog posts,
                marketing copy, and much more in a matter of seconds. Say goodbye
                to writer's block and time-consuming content creation our AI-driven
                solution is your secret to efficiency and excellence. "
                <br />
                ~ConvoAI
              </p>
              <br />
              {value ? <Link href={"imgGen"} id={styles.gen}>ImageGEN</Link> : <Link href={"/"} id={styles.gen}>disabled</Link>}
              {value ? <Link href={"chatgpt"} id={styles.contact}>ConvoAI</Link> : <Link href={"/"} id={styles.contact}>disabled</Link>}
              {value ? <Link href={"combine"} id={styles.contact}>combineAI</Link> : <Link href={"/"} id={styles.contact}>disabled</Link>}
            </div>
            <div className={styles.main_left_bottom}>
              <div className={styles.row}>
                <div className={styles.disImage} id={styles.tutorial}>
                  <h3>Do you need a tutorial?</h3>
                  <p>A video has been prepared for you.</p>
                  <i className="fa-solid fa-play"></i>
                </div>
              </div>
              <div className={styles.pop} id={styles.creativity}>
                <h1>Unlock your CREATIVITY</h1>
              </div>
            </div>
          </div>
          <div className={styles.main_right}>
            <div className={styles.allimg}>
              <div className={styles.disImage} id={styles.dimage1}></div>
              <div className={styles.disImage} id={styles.dimage2}></div>
              <div className={styles.disImage} id={styles.dimage3}></div>
              <div className={styles.disImage} id={styles.dimage4}></div>
              <div className={styles.disImage} id={styles.dimage5}></div>
              <div className={styles.disImage} id={styles.dimage6}></div>
              <div className={styles.disImage} id={styles.dimage7}></div>
              <div className={styles.disImage} id={styles.dimage8}></div>
            </div>
          </div>
        </div>

      </div>

      <div className={styles.scroller}>
        <div className={styles.taglist} id={styles.scrollinner}>
          <h3>ImageGEN</h3>
          <h3>ConvoAI</h3>
          <h3>REACTjs</h3>
          <h3>Firebase</h3>
        </div>
      </div>
      <div className={styles.footer}>
          <h2>CREATORS</h2>
        <div className={styles.footerleft}>
          <a href='https://www.instagram.com/pratishtha_51/' target='_blank'>PRATISHTHA TIWARI</a>
          <a href='https://www.instagram.com/mayank_singh2700/' target='_blank'>MAYANK SINGH</a>
          <a href='https://www.instagram.com/sahil_sunil03/' target='_blank'>SAHIL SUNIL</a>
          <a href='https://github.com/Youbraj0210' target='_blank'>YOUBRAJ SINGH</a>
        </div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </div>
    </>
  )
}
