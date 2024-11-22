import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

//조건부 스타일링과 CSS클래스 충돌을 해결하기 위한 유틸리티 함수
//clsx 조건부 결합
//twMerge 마지막에 선언된것을 우선 적용
//parameter에는 tailwind-css keyword가 들어간다
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(...inputs))
}