"use client"
import React, { useEffect, useRef, useState } from 'react'
import styles from "./page.module.css"
import { sendMsgToOpenAI } from './openai'
import Link from 'next/link'

const page = () => {

  const msgEnd = useRef(null);
  const [messages, setmessages] = useState([{
    text: "hello there!",
    isbot: true
  }])

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages])

  const [input, setinput] = useState("")
  const handleSend = async () => {
    const res = await sendMsgToOpenAI(input);
    setmessages([...messages, { text: input, isbot: false }, { text: res, isbot: true }]);
    setinput("");
  }


  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <div className={styles.title}>
          <div className={styles.botpic}></div>
          <h1>ConvoAI</h1>
        </div>
        <div className={styles.links}>
          <Link href={"/"}>Home</Link>
          <a href='#'>New Chat</a>
        </div>
      </div>
      <div className={styles.container}>
        {messages.map((message, i) => {
          return (<div key={i} className={message.isbot ? styles.bot : styles.user}>
            <div className={message.isbot ? styles.botpic : styles.pic}></div>
            <p>{message.text}</p>
          </div>);
        })};
        <div ref={msgEnd} />
      </div>
      <div className={styles.prompt}>
        <input type="text" id={styles.promptinput} value={input} onChange={(e) => {
          setinput(e.target.value);

        }} />
        <button onClick={handleSend} id={styles.submit}>Submit</button>
      </div>
    </div>
  )
}

export default page
