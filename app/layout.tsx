import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오늘 뭐 먹지? · 직장인 점심 메뉴 추천",
  description: "매일 반복되는 점심 고민을 3초 만에 해결해주는 메뉴 추천 서비스",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
