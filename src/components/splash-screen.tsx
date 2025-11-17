"use client";

import { motion } from "motion/react";

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Outer Rings */}
        <div className="absolute inset-0 -m-24 animate-ping opacity-20">
          <div className="h-full w-full rounded-full border-2 border-foreground" />
        </div>
        <motion.div
          className="relative h-32 w-32"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: [0, 180, 360],
          }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="w-full h-full"
          >
            <rect width="256" height="256" fill="none" />

            <motion.line
              x1="208"
              y1="128"
              x2="128"
              y2="208"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                pathLength: { duration: 1.5, ease: "easeInOut" },
                opacity: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />

            <motion.line
              x1="192"
              y1="40"
              x2="40"
              y2="192"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                pathLength: { duration: 1.5, delay: 0.3, ease: "easeInOut" },
                opacity: {
                  duration: 2,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          </svg>
        </motion.div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">PlayCN</h1>
        </div>
      </div>

      {/* Floating Elements */}
      <div
        className="absolute top-20 left-20 w-3 h-3 bg-foreground rounded-full opacity-20 animate-bounce"
        style={{ animationDelay: "0ms", animationDuration: "3s" }}
      />
      <div
        className="absolute top-40 right-32 w-2 h-2 bg-foreground rounded-full opacity-20 animate-bounce"
        style={{ animationDelay: "500ms", animationDuration: "2.5s" }}
      />
      <div
        className="absolute bottom-32 left-40 w-2 h-2 bg-foreground rounded-full opacity-20 animate-bounce"
        style={{ animationDelay: "1000ms", animationDuration: "3.5s" }}
      />
      <div
        className="absolute bottom-20 right-20 w-3 h-3 bg-foreground rounded-full opacity-20 animate-bounce"
        style={{ animationDelay: "1500ms", animationDuration: "2.8s" }}
      />
    </div>
  );
}
