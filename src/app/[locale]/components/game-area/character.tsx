"use client";

import { useEffect, useState } from "react";
import { useTypingStore } from "@/store/use-typing-store";
import { useCharacterStore } from "@/store/use-character-store";
import HpAndMp from "../hp-mp-ui/hp-mp";
import useCharacterSituationStore from "@/store/use-character-situation-store";

const Character = () => {
  const [frame, setFrame] = useState(0);

  const typingSpeed = useTypingStore(state => state.cpm);

  const { totalFrames, frameWidth, frameHeight, frameDuration, characterImage, updateCharacterSettings, reduceHp } = useCharacterStore(state => ({
      totalFrames: state.totalFrames,
      frameWidth: state.frameWidth,
      frameHeight: state.frameHeight,
      frameDuration: state.frameDuration,
      characterImage: state.characterImage,
      updateCharacterSettings: state.updateCharacterSettings,
      reduceHp: state.reduceHp,
  }));

  const { setCharacterSituations } = useCharacterSituationStore(state => ({
    setCharacterSituations: state.setCharacterSituations
  }));

  useEffect(() => {
    // 타이핑 속도가 변경될 때 상태 업데이트 호출
    updateCharacterSettings();
  }, [typingSpeed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % totalFrames);
    }, frameDuration);

    return () => clearInterval(interval); 
  }, [frameDuration, totalFrames]);
  
  return (
    <>
      <div className="flex w-full h-full relative">
        <div className="absolute top-12 left-[70px] z-50">
          <HpAndMp />
        </div>
        <div
          className="absolute left-10 top-0 bottom-0 right-10"
          style={{  
            width: `${frameWidth}px`,
            height: `${frameHeight}px`,
            backgroundImage: `${characterImage}`,
            backgroundPosition: `-${frame * frameWidth}px 0px`, // 프레임에 따라 위치 변경
            backgroundSize: `${frameWidth * totalFrames}px 200px`, // 전체 스프라이트 시트 크기
          }}
        />
      </div>
    </>
  )
}

export default Character;