import { Copyright, DotIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="container mx-auto">
      {/* hero section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-end h-[50vh] gap-10"
      >
        <div className="text-6xl font-bold text-center">
          Welcome to <span className="text-gradient ">NoteSpace</span>
        </div>
        <p className="text-gray-500 w-2/3 text-center text-pretty">
          NoteSpace is an AI-powered app that transforms PDFs into structured
          notes, with summaries, interactive graphs, and a community to share
          and bookmark insights.
        </p>
        <Link
          to="/login"
          className="bg-primary text-secondary  px-6 py-3 rounded-md"
        >
          Get Started
        </Link>
      </motion.div>

      {/* homepage demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        exit={{ opacity: 0, y: -20 }}
        className="flex flex-col items-center justify-center mt-10 "
      >
        <div className="w-[80%] h-[60vh] rounded-xl relative bg-neutral-900 border border-white/40 overflow-hidden">
          <img
            src="/Landing-main.png"
            alt="Landing main image"
            className="absolute top-15 left-1/2 w-[85%] object-cover translate-x-[-50%] rounded-lg"
          />
        </div>
        <div className="text-secondary/50 mt-8">
          NoteSpace — Your AI-Powered Note-Taking Universe
        </div>
      </motion.div>

      {/*  section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        exit={{ opacity: 0, y: -20 }}
        className="flex justify-center items-center gap-10 mt-40 w-[90%] mx-auto"
      >
        <div className="w-[60%] h-[50vh] rounded-xl relative bg-neutral-900 border border-white/40 overflow-hidden">
          <img
            src="/home.webp"
            alt="#"
            className="absolute top-15 left-1/2 w-full h-full object-cover translate-x-[-50%] rounded-lg"
          />
        </div>
        <div className="w-1/3 h-[50vh] flex flex-col items-start justify-around">
          <div>
            <div className="text-2xl mb-8">
              Organize your notes, Smarter and
            </div>
            <div className="text-gray-400">
              Capture ideas, Organize Notes, and boost productivity with Ai.
            </div>
          </div>
          <div className="flex flex-col items-start justify-around">
            <div className="text-primary pr-4 py-2 rounded-full flex items-center gap-2">
              <DotIcon /> Note Management
            </div>
            <div className="text-primary pr-4 py-2 rounded-full flex items-center gap-2">
              <DotIcon /> Import PDF
            </div>
            <div className="text-primary pr-4 py-2 rounded-full flex items-center gap-2">
              <DotIcon /> Bookmark
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        exit={{ opacity: 0, y: -20 }}
        className="flex justify-center items-center gap-10 mt-40 w-[90%] mx-auto"
      >
        <div className="w-1/3 h-[50vh] flex flex-col items-start justify-around">
          <div>
            <div className="text-2xl mb-8">
              Discover other people notes and add to your workflow
            </div>
            <div className="text-gray-400">
              Capture ideas, Organize Notes, and boost productivity with Ai.
            </div>
          </div>
          <div className="flex flex-col items-start justify-around">
            <div className="text-primary pr-4 py-2 rounded-full flex items-center gap-2">
              <DotIcon /> Smart Search
            </div>
            <div className="text-primary pr-4 py-2 rounded-full flex items-center gap-2">
              <DotIcon /> Discover Trends
            </div>
          </div>
        </div>

        <div className="w-[60%] h-[50vh] rounded-xl relative bg-neutral-900 border border-white/40 overflow-hidden">
          <img
            src="/explore.webp"
            alt="#"
            className="absolute top-15 left-1/2 w-full h-full object-cover translate-x-[-50%] rounded-lg"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        exit={{ opacity: 0, y: -20 }}
        className="flex justify-center items-center gap-10 mt-40 w-[90%] mx-auto"
      >
        <div className="w-[60%] h-[50vh] rounded-xl relative bg-neutral-900 border border-white/40 overflow-hidden">
          <img
            src="/Landing-main.png"
            alt="Landing main image"
            className="absolute top-15 left-1/2 w-[85%] object-cover translate-x-[-50%] rounded-lg"
          />
        </div>
        <div className="w-1/3 h-[50vh] flex flex-col items-start justify-around">
          <div>
            <div className="text-2xl mb-8">
              Visualize your ideas like never before
            </div>
            <div className="text-gray-400">
              Build a living network of thoughts. Map your notes, connect
              concepts, and uncover new insights effortlessly.
            </div>
          </div>
          <div className="flex flex-col items-start justify-around">
            <div className="text-primary pr-4 py-2 rounded-full flex items-center gap-2">
              <DotIcon /> Interactive Graph
            </div>
            <div className="text-primary pr-4 py-2 rounded-full flex items-center gap-2">
              <DotIcon /> Idea Expansion
            </div>
          </div>
        </div>
      </motion.div>

      {/* features section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        exit={{ opacity: 0, y: -20 }}
        className="flex flex-col items-center justify-center w-[95%] mx-auto mt-20 "
      >
        <div className="text-3xl font-bold mb-18">
          How our features deliver effectively in this app
        </div>
        <div className="flex justify-center items-center w-[90%] h-[50vh] gap-6">
          <div className="w-1/3 h-full bg-neutral-900  border border-white/40 rounded-xl text-center flex flex-col justify-center items-center">
            <div>
              <img src="/hugeicons_note.png" alt="" />
            </div>
            <h1 className="text-2xl font-bold mt-2  ">Ai - Powered Notes</h1>
            <div className="text-sm text-neutral-400 text-pretty mt-4">
              AI-powered notes with effortless organization and search
            </div>
          </div>
          <div className="w-1/3 h-full bg-neutral-900 border border-white/40 rounded-xl text-center flex flex-col justify-center items-center">
            <div>
              <img src="/material-symbols-light_graph-3.png" alt="" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Visual Graph Summaries</h1>
            <div className="text-sm text-neutral-400 text-pretty mt-4 w-[80%]">
              Auto-convert notes into visual graphs or mind maps
            </div>
          </div>
          <div className="w-1/3 h-full bg-neutral-900 border border-white/40 rounded-xl text-center flex flex-col justify-center items-center">
            <div>
              <img src="/hugeicons_ai-magic.png" alt="" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Ai assistant chat</h1>
            <div className="text-sm text-neutral-400 text-pretty mt-4 w-[80%]">
              Chat with AI to refine, expand, or simplify your notes
            </div>
          </div>
        </div>
      </motion.div>
      <div className="bg-tertiary border-t border-gray-500 w-full flex justify-center items-center mt-20 py-4 text-sm font-light tracking-tight">
        {" "}
        <Copyright size={16} />
        &nbsp;copyright 2025 IT Dhoke Htoe
      </div>
    </div>
  );
};

export default LandingPage;
