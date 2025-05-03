import Link from "next/link";
import image1 from "@/app/image/KakaoTalk_Photo_2022-12-18-17-09-30+025.jpeg";
import image2 from "@/app/image/KakaoTalk_Photo_2022-12-18-17-12-45+001.jpeg";
import image3 from "@/app/image/KakaoTalk_Photo_2022-12-18-17-25-45+005.jpeg";
import Image from "next/image"; 

const cards = [image1, image2, image3];
const cards_title = ["정기 총회 및 네트워킹","10만원 프로젝트","우린 스타트업"];
const cards_content = ["창업에 대한 기본적인","10만원 예산 내에서","린 스타트업에 대해 학습,"];
const cards_content1 = ["지식 학습 및 실행하는 과정","최고의 성과를 내기위해 경쟁"," 그리고 실전창업"];

export default function Main() {

    return (
      <main>
            <div className="min-h-screen w-full bg-[url('/IVC_BG1.gif')] bg-center bg-no-repeat bg-[length:100vh] flex flex-col items-center justify-center text-[#bd3232] text-[calc(10px+2vmin)]">

                <div className="w-full text-[30px] font-bold animate-[fadeInUp_2.5s] motion-reduce:animate-none flex justify-center items-center md:text-[50px] sm:text-[40px]">
                    Accelerate your INVENtion
                </div>
                
                <div className="text-[50px] font-bold animate-[fadeInUpDelayed_3.7s] motion-reduce:animate-none flex justify-center items-center md:text-[100px] sm:text-[50px]">
                    With IVC
                </div>
            </div>
            <div className="container mx-auto flex items-center justify-center">
                <div className="flex flex-col items-center justify-between w-full">
                    <h2 className="text-white text-3xl font-bold py-2">
                        인하벤처클럽은,
                    </h2>
                    <div className="w-full h-[80vh] min-h-[60vh]">
                        <div className="text-center flex justify-between items-center flex-row h-[60vh]">
                            <div className="flex justify-center h-[80%] w-full items-center flex-col border-r border-white">
                                <h3 className="text-white text-sm md:text-3xl font-bold">
                                    인하대학교 대표
                                </h3>
                                <h3 className="text-white text-sm md:text-3xl font-bold">
                                    창업동아리
                                </h3>
                                <div className="pt-8">
                                    <h3 className="text-white text-sm md:text-3xl font-bold">
                                        창업지원단 소속
                                    </h3>
                                    <h3 className="text-white text-sm md:text-3xl font-bold pt-1.5">
                                        인하대학교 직할
                                    </h3>
                                    <h3 className="text-white text-sm md:text-3xl font-bold pt-1.5">
                                        창업동아리
                                    </h3>
                                </div>
                            </div>
                            <div className="flex justify-center h-full w-full items-center flex-col pl-1">
                                <div>
                                    <h3 className="text-white text-sm md:text-3xl font-bold pt-5">
                                        전통이 있는 동아리
                                    </h3>
                                    <p className="text-white text-xs md:text-lg pt-1">
                                        1997년 조현정 회장님에 의해 설립
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-white text-sm md:text-3xl font-bold pt-5">
                                        창업에 강한 동아리
                                    </h3>
                                    <p className="text-white text-xs md:text-lg pt-1">
                                        매년 3팀 이상의 창업
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-white text-sm md:text-3xl font-bold pt-5">
                                        능력있는 사람들의
                                    </h3>
                                    <h3 className="text-white text-sm md:text-3xl font-bold">
                                        모임
                                    </h3>
                                    <p className="text-white text-xs md:text-lg pt-1">
                                        2022년 20개 이상의 수상
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-white text-3xl font-bold pt-8">
                        주요 활동
                    </h2>
                    <div className="py-5">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-0 md:px-5 py-5 w-full">
                            {cards.map((card, index) => (
                            <div className="px-3 py-4" key={index}>
                                <div className="h-full flex flex-col bg-foreground rounded-lg shadow-md overflow-hidden">
                                    <Image
                                        className="w-full"
                                        src={cards[index]}
                                        alt="활동 이미지"
                                    />
                                    <div className="p-4 flex-grow bg-background">
                                        <h3 className="text-xl font-medium mb-2 text-foreground">
                                            {cards_title[index]}
                                        </h3>
                                        <p className="text-lg text-foreground">
                                            {cards_content[index]}
                                        </p>
                                        <p className="text-lg text-foreground">
                                            {cards_content1[index]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-white text-2xl md:text-3xl font-bold pt-8">
                        신입부원 모집
                    </h2>

                    <div className="flex max-w-[750px] justify-center flex-col items-center">
                        <div className="flex">
                            <p className="text-white text-xl md:text-2xl pt-8">
                                당신의&nbsp;
                            </p>
                            <p className="text-white text-xl md:text-2xl font-bold pt-8">
                                새로운 도전에
                            </p>
                        </div>
                        <div className="flex"> 
                            <p className="text-white text-xl md:text-2xl font-bold pt-3">
                                인하벤처클럽이&nbsp;
                            </p>
                            <p className="text-white text-xl md:text-2xl pt-3">
                                함께하기를
                            </p>
                        </div>
                    </div>
                    <div className="pb-10 px-10 pt-7">
                        <Link href="/recruit" className="no-underline" passHref>
                            <button 
                                className="bg-white hover:bg-gray-100 text-black text-xl md:text-2xl font-bold px-6 py-3 rounded transition-colors"
                            >
                                지원하기
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}