import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

function ContactAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-white font-bold text-xl md:text-3xl">
          창업 관련 스펙이 없어도 괜찮은가요?
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-white text-sm md:text-xl">
            그럼요! 인하벤처클럽에서는 창업에 관심만 있으면 OK 입니다!
          </p>
          <p className="text-white text-sm md:text-xl">
            창업을 꿈꾼다면 누구나 인하벤처클럽에서 같이 활동할 수 있어요
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger className="text-white font-bold text-xl md:text-3xl">
          활동기간이 어떻게 되나요?
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-white text-sm md:text-xl">활동 기간은 한 학기입니다!</p>
          <p className="text-white text-sm md:text-xl">
            1학기에 지원하셨다면 03~06월 까지 활동하게 됩니다.
          </p>
          <p className="text-white text-sm md:text-xl">
            2학기에 지원하셨다면 09~12월 까지 활동하게 됩니다.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger className="text-white font-bold text-xl md:text-3xl">
          회비는 얼마인가요?
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-white text-sm md:text-xl">부회원의 한 학기 회비는 50,000원 입니다</p>
          <p className="text-white text-sm md:text-xl">정회원의 한 학기 회비는 30,000원 입니다</p>
          <p className="text-white text-sm md:text-xl">명예회원 회비는 10,000원입니다</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function Contact() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-[#1b1b1b]">
      <div className="flex flex-col items-start justify-start pt-30 w-full">
        <div className="pb-10">
          <p className="text-white text-4xl font-bold">Email</p>
          <p className="text-white text-xl font-bold">inha.venture.club@gmail.com</p>
        </div>
        <div className="pb-10">
          <p className="text-white text-4xl font-bold">Instagram</p>
          <p className="text-white text-xl font-bold">@ivc_inha</p>
        </div>
        <div className="pb-10">
          <p className="text-white text-4xl font-bold">KakaoTalk</p>
          <p className="text-white text-xl font-bold">준비중...</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center pb-24 w-full">
        <h1 className="text-white text-5xl font-bold pb-12">FAQ</h1>
        <ContactAccordion />
      </div>
    </div>
  );
}
