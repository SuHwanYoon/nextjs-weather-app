import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


// clsx: 조건부로 클래스명을 결합해주는 유틸리티
// twMerge: TailwindCSS 클래스 충돌을 해결해주는 도구
// ClassValue[]: 여러 형태의 클래스값을 받을 수 있는 타입
//twMerge 마지막에 선언된것을 우선 적용
//parameter에는 tailwind-css keyword가 들어간다
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(...inputs))
}