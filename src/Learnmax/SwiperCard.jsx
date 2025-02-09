import React, { useState} from "react";
import { Navigation, A11y, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IoMdShare } from "react-icons/io";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { GoBookmarkFill } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";


export default function SwiperCard({ content }) {
  const [onSave, setOnSave] = useState(false);
  const [onPlay, setOnPlay] = useState(false);
  const access_token = import.meta.env.HUGGING_FACE_ACCESS
  const [currentPage, setCurrentPage] = useState(1);

  // Handle save and unsave
  const handleSave = () => {
    setOnSave(true);
  }
  const handleSaveX = () => {
    setOnSave(false);
  }


  // Play and Stop Text-to-Speech
  const handlePlay = (textContent) => {

    setOnPlay(true);
    console.log(`playing ... ${onPlay}`)
    const speech = new SpeechSynthesisUtterance();
    speech.text = textContent;
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);

  };
  const handleStopPlay = () => {
    setOnPlay(false);
    window.speechSynthesis.cancel();

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      console.log("Audio playback stopped.");
    } else {
      console.log("No audio is playing.");
    }
  };

// TTS api call

const convertText = async (data)=>{
  try{

    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/speecht5_tts",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    const result = await response.blob();
    const audioUrl = URL.createObjectURL(result)

    const audio = new Audio(audioUrl);
    audio.play();

  }catch{
    handlePlay(data)
  }
}


  return (
    <div className="w-full">
      <Swiper
        className="swiper-container grid place-items-center w-full"
        modules={[Navigation, Pagination, A11y,]}
        onSlideChange={(swiper) => setCurrentPage(swiper.activeIndex + 1)}
        spaceBetween={20}
        slidesPerView={1}
        
      >
        {content.map((item) => (
          <SwiperSlide key={item.id}
            >
              <div className="my-4 text-lg font-semibold">
        Page {currentPage} / {content.length}
      </div>
            <div
              className="card-container shadow-lg rounded-lg p-4 flex flex-col justify-between relative m-auto"
              id="trans-bg"
              style={{
                height:'60dvh',
              }}
            >
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <br />
              <p className="text-2xl mt-2 overflow-y-scroll overflow-ellipsis line-clamp-6"
                style={{
                  height: '90%'
                }}
              >
                {item.content}
              </p>
              <div className="flex items-center justify-evenly mt-4">
                {onSave ? (
                  <GoBookmarkFill onClick={handleSaveX} className="icon" />
                ) : (
                  <CiBookmark onClick={handleSave} className="icon" />
                )}

                {onPlay ? (
                  <FaPauseCircle
                    onClick={handleStopPlay}
                    className=" text-3xl cursor-pointer"
                  />
                ) : (
                  <FaPlayCircle
                    onClick={() => convertText(item.content)}
                    className=" text-3xl cursor-pointer"
                  />
                )}

               <IoMdShare/>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
