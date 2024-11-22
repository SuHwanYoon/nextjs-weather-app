//client component
'use client'
// 메인 페이지 컴포넌트
import Navbar from "@/components/Navbar"; // 네비게이션 바 컴포넌트 임포트
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import Image from "next/image"; 

// https://api.openweathermap.org/data/2.5/forecast?q=tokyo&appid=c9f84443cfcfa927cc155002a2cdb685&cnt=2
// API 날씨 데이터를 기반으로 만든 interface

interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: City;
}

interface WeatherData {
  dt: number;
  main: MainWeather;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Sys {
  pod: string;
}

interface City {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coordinates {
  lat: number;
  lon: number;
}

export default function Home() {
  //ReactQuery를 사용한 API 호출 확인 함수
  //<WeatherData> 타입지정
  // useQuery는 WeatherResponse 제네릭
  // data.main, data.weather 등의 속성에 안전하게 접근 가능
  const { isPending, error, data } = useQuery<WeatherResponse>({
    queryKey: ["repoData"],
    queryFn: async () => {
      // Axios get으로 API를 가져옴
      const { data } = await axios.get(
        //${}를 위한 ``
        `https://api.openweathermap.org/data/2.5/forecast?q=tokyo&appid=${process.env.NEXT_PUBLIC_WHATHER_APP}&cnt=2`
      );
      //API 데이터 return
      return data;
    },
  });
  // fetch 대신 axios를 사용
  // fetch(
  //   "https://api.openweathermap.org/data/2.5/forecast?q=tokyo&appid=c9f84443cfcfa927cc155002a2cdb685&cnt=2"
  // ).then((res) => res.json()),

  console.log('WeatherResponse',data)

  //API를 가져오는 로딩시에 함수
  if (isPending) 
    return (
      //element를 가운데 위치시키기
      <div className="flex items-center min-h-screen justify-center">
        {/* 로딩 문자 */}
        {/* ESLint 규칙으로인한 {} */}
        <p className="animate-bounce text-5xl">{'Loading...'}</p>
      </div>
    
  )
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
