import Link from "next/link";
import React from "react";

// 미디어 항목 데이터 배열
const mediaItems = [
  {
    category: "NEWS",
    title: "대한민국 벤처 1호 비트컴퓨터 조현정 대표가 만든 창업동아리 '인하벤처클럽'",
    href: "https://magazine.hankyung.com/job-joy/article/202010193231b"
  },
  {
    category: "YOUTUBE",
    title: "동아리 방이 복층이라고?! 인하대 창업 동아리 인하벤처클럽을 만나다! (중앙 동아리)",
    href: "https://www.youtube.com/watch?v=DCJphTKqjG4"
  },
  {
    category: "YOUTUBE",
    title: "[인하대 창업 동아리] 인하벤처클럽을 만나다 [대학교 창업 동아리]",
    href: "https://www.youtube.com/watch?v=UKaTLy-sK_0"
  },
  {
    category: "NEWS",
    title: "인하대학교 창업지원단 스타트업 CEO_대한민국 벤처 1호 비트컴퓨터 조현정 대표가 만든 창업동아리 '인하벤처클럽'",
    href: "http://startup.inha.ac.kr/schedule/view.htm?pageNo=2&scale=10&menuId=520&id=540"
  },
  {
    category: "NEWS",
    title: "인하대 '인하벤처클럽' 동아리",
    href: "https://www.kihoilbo.co.kr/news/articleView.html?idxno=316319"
  },
  {
    category: "NEWS",
    title: "인하벤처클럽 \"특허 있어야 졸업\"",
    href: "http://m.itooza.com/view.php?ud=0000000000000021537"
  }
];

// 미디어 항목 컴포넌트
const MediaItem = ({ item }: { item: typeof mediaItems[number] }) => (
  <Link href={item.href} className="no-underline">
    <div className="flex justify-center py-10 items-center border-t border-white">
      <div className="justify-center w-[30%]">
        <p className="text-start text-white text-xs md:text-xl font-['SUIT_Variable'] font-bold justify-center items-center">
          {item.category}
        </p>
      </div>
      <div className="w-full">
        <p className="text-start text-white text-xs md:text-xl font-['SUIT_Variable'] font-bold justify-center items-center">
          {item.title}
        </p>
      </div>
    </div>
  </Link>
);

export default function Media() {
  return (
    <div className="w-full bg-[#1b1b1b] h-[120vh]">
      <div className="h-full px-2 flex justify-center items-center flex-col">
        <div className="pb-5 flex justify-center items-center flex-col">
          <h1 className="text-white text-5xl font-['SUIT_Variable'] font-bold mb-10">
            MEDIA
          </h1>
          
          <div className="flex flex-col">
            {mediaItems.map((item, index) => (
              <MediaItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}