import React, { useState, useRef } from "react";
import SwiperCard from "./SwiperCard";
import { IoSend } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import Idle from "./Idle";
import { CiMenuBurger } from "react-icons/ci";
import Notes from "./Notes";
import Quiz from "./Quiz";
import * as pdfjsLib from "pdfjs-dist/webpack";



export default function TextInputProcessor() {
  const [textInput, setTextInput] = useState("");
  const [contentTitle, setContentTitle] =  useState('')
  const [content, setContent] = useState([]);
  const [openNav, setOpenNav] = useState(false);
  const [active, setActive] = useState(false);
  const [x, setX] = useState('')
  const [pdfFile, setPdfFile] = useState(null);  
  const access_token = import.meta.env.HUGGING_FACE_ACCESS
  const [summarized, setSummarized] = useState('')
  const fileInputRef = useRef(null);
 //upload icon function 
  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    
    reader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
  
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(" ");
            text += pageText + "\n";
        }
  
        setTextInput(text)
    };
  
    reader.readAsArrayBuffer(file);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      extractTextFromPDF(file);
  } else {
      alert("Please select a valid PDF file.");
  }
};
//summarize text
  const summarizeText = async ()=>{
    try{
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
          headers: {
          Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(textInput), 
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();

      setSummarized(result)
  
      splitText({data: result})
    } catch {
      splitText({data: textInput})
    }
  };
//split text in chunks
  const splitText = ({data}) => {
    setActive(true)
   
    const words = data.trim().split(/\s+/); // Trim and split by spaces
    const chunks = []; 
    let chunkNumber = 1; // Counter for naming chunks
  
    // Create chunks of 100 words each
    for (let i = 0; i < words.length; i += 100) {
      const chunk = words.slice(i, i + 100).join(" ");
      chunks.push({ name: `Split ${chunkNumber}`, content: chunk });
      chunkNumber++;
    }
  
    setContent(chunks); // Update state with the chunks array
    console.log(content)
    setTextInput([])
  };   
//component rendering 
  const renderComponet = ()=>{
    switch  (x){
      case  "component1":
        return <Notes content={contentTitle}/>;
      case  "component2":
        return <Quiz/>;

    }
  }
//scrape text function
  const scrapeText = ()=>{
  alert('under construction')
  }
// allmigthy function to handle all functions😎
  const omega = ()=>{
    if(content.length  > 0 ){
      summarizeText()
    }
    if(pdfFile){
      extractTextFromPDF()
    }
    if(textInput.includes('https//')){
      scrapeText()
    }
  }

  return (
    <div className="w-4/5 max-sm:w-full max-sm:px-3 maintext-pro relative m-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mt-3">
        <h2 className="bold-txt" onClick={()=>setOpenNav(!openNav)}><CiMenuBurger /></h2>
      </div>

      {openNav && (
      <div className="w-3/5 p-4 absolute shadow-lg left-0 nav-container bg-gray-800">
        <p onClick={()=>setOpenNav(false)} className="float-end">✖</p>
        <ul>
          <li onClick={()=>setX('component1')}>add notes</li>
          <li onClick={()=>setX('component2')}>quiz</li>
          <li>add friend</li>
        </ul>
      </div>)}

  <div onClick={()=>setOpenNav(false)} >
  {active ? 
  <SwiperCard content={content} /> 
  : 
  <Idle />}
  {renderComponet()}
  </div>

    
      {/* Input Section */}
      <div className="input-text text-gray-200 flex items-center justify-between rounded-full px-4 w-full absolute bottom-0 left-0 right-0 " id="trans-bg">
      <input type="file" accept="application/pdf" ref={fileInputRef} className="hidden" onChange={handleFileChange}/>
      <button className=" p-2 rounded-full hover:bg-gray-500 me-2" onClick={handleIconClick}>
      <IoMdAttach />
      </button>
      <textarea
        type="text"
        placeholder="Summarize Text...."
        className="bg-transparent outline-none trans-input w-full"
        onChange={(e)=>setTextInput(e.target.value)}
        value={textInput}
      />
        <button className="text-white bg-gray-600 p-2 rounded-full hover:bg-gray-500" onClick={omega}>
        <IoSend />
        </button>
    </div>
    </div>
  );
}
