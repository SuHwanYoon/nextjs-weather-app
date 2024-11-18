// 메인 페이지 컴포넌트
import Navbar from "@/components/Navbar"; // 네비게이션 바 컴포넌트 임포트
import Image from "next/image"; // Next.js의 최적화된 이미지 컴포넌트 임포트 (현재 미사용)

export default function Home() {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      {/* 
      메인 컨테이너:
      - flex flex-col: 세로 방향 플렉스박스 레이아웃
      - gap-4: 자식 요소들 사이 1rem(16px) 간격
      - bg-gray-100: 연한 회색 배경
      - min-h-screen: 최소 높이를 화면 전체 높이로 설정
    */}
      <Navbar /> 
    </div>
  );
}
