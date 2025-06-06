import { LinkButton } from './LinkButton';
export default async function Recruit() {
  return (
    <div className="w-full bg-[#1b1b1b] flex flex-col items-center justify-center text-[calc(10px+2vmin)] text-[#bd3232] min-h-screen bg-[url('/IVC_BG1.gif')] bg-center bg-no-repeat bg-[length:100vh]">
      <div className="flex flex-col items-center justify-center pt-8">
        <div className="flex flex-col items-center justify-center pb-5">
          <h1 className="text-white text-5xl font-suit font-bold">RECRUIT</h1>

          <div className="flex flex-col items-center justify-center max-w-[750px] pb-10">
            <div className="flex">
              <p className="text-white text-3xl md:text-5xl font-suit pt-8">당신의 &nbsp;</p>
              <p className="text-white text-3xl md:text-5xl font-suit font-bold pt-8">
                새로운 도전에
              </p>
            </div>
            <div className="flex">
              <p className="text-white text-3xl md:text-5xl font-suit font-bold pt-3">
                인하벤처클럽이 &nbsp;
              </p>
              <p className="text-white text-3xl md:text-5xl font-suit pt-3">함께하기를</p>
            </div>
          </div>

          <div className="flex">
            {
              <div className="pr-3 md:pr-5">
                <LinkButton>{'지원서 다운로드'}</LinkButton>
              </div>
            }

            {
              <div>
                <a className="no-underline text-inherit">
                  <LinkButton>{'지원서 제출'}</LinkButton>
                </a>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
