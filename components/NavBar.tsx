'use client'
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  {
    name: "Home",
    link: "/"
  },
  {
    name: "Modal Answer",
    link: "/ModalAnswer"
  },
  {
    name: "Upload PDF",
    link: "/upload-pdf"
  },
  {
    name: "Evaluate",
    link: "/Evaluation"
  }
]

export const NavBar = ({ className }: { className?: string }) => {
  const pathname = usePathname()
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-blue-600/30 rounded-full bg-zinc-900/90 backdrop-blur-md shadow-[0px_2px_15px_-1px_rgba(37,99,235,0.2)] z-[5000] px-8 py-3 items-center justify-center space-x-4",
          className
        )}
      >
        <Link 
          href="/" 
          className="mr-2 text-xl font-bold text-white flex items-center"
        >
          <span className="text-blue-500">A</span>MPLIFY
        </Link>
        
        <div className="h-6 w-px bg-zinc-700 mx-1"></div>
        
        <div className="flex items-center space-x-2">
          {navItems.map((navItem, idx) => {
            const isActive = pathname === navItem.link
            return (
              <Link
                key={`link-${idx}`}
                href={navItem.link}
                className={cn(
                  "relative text-white items-center flex space-x-1 px-4 py-1.5 rounded-full transition-all duration-200",
                  isActive 
                    ? "bg-blue-600 text-white font-medium" 
                    : "hover:text-black hover:bg-white/90"
                )}
              >
                <span className="text-sm">{navItem.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-full rounded-full bg-blue-600 -z-10"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
