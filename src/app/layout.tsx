'use client'
 
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import useQuiz from "./store";
const LazyQuiz = React.lazy(() => import('./@quiz/page')); 


const inter = Inter({ subsets: ["latin"] });

interface LayoutProps{
  children: React.ReactNode,
  quiz: React.ReactNode
}

export default function RootLayout({children}:LayoutProps ){

  const config = useQuiz((state:any)=>state.config)
  let render = config.status === 'start' ? <LazyQuiz/> :children;

  console.log(render)
  return (
    <html lang="en">
      <body className={inter.className}>{render}
      </body>
    </html>
  );
}
