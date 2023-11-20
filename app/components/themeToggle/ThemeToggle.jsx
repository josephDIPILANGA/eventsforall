"use client"

import React from 'react'
import Image from 'next/image'
import styles from "./themeToggle.module.css"
import { useContext } from 'react'
import {ThemeContext} from "@/context/ThemeContext"

const ThemeToggle = () => {

  const {toggle, theme} = useContext(ThemeContext)

  return (
    <div 
    className={styles.container} 
    onClick={toggle}
    style={theme === "dark" ? 
    {backgroundColor: "black"} : 
    {backgroundColor: "#0f172a"}}
    >
      <Image src='/moon.png' width={14} height={14} />
      <div className={styles.ball} style={theme === "dark" ? {background:"white"} : {background: "#0f172a"}}></div>
      <Image src='/sun.png' width={14} height={14} />
    </div>
  )
}

export default ThemeToggle
