import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NProgressProvider from "@/components/NProgressProvider"; // <-- thêm dòng này
import { Toaster } from "react-hot-toast";
// import '/tinymce/skins/ui/oxide/content.min.css';
// Bai Jamjuree (thay thế Inter)
const baiJamjuree = localFont({
  src: [
    {
      path: "../../public/fonts/bai-jamjuree/BaiJamjuree-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/bai-jamjuree/BaiJamjuree-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/bai-jamjuree/BaiJamjuree-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/bai-jamjuree/BaiJamjuree-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/bai-jamjuree/BaiJamjuree-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/bai-jamjuree/BaiJamjuree-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/bai-jamjuree/BaiJamjuree-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/bai-jamjuree/BaiJamjuree-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/bai-jamjuree/BaiJamjuree-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/bai-jamjuree/BaiJamjuree-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/bai-jamjuree/BaiJamjuree-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/bai-jamjuree/BaiJamjuree-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-brandon", // Giữ nguyên tên biến cũ để không phải sửa CSS
});

// Giữ nguyên Alter font local
const alter = localFont({ src: '../../public/fonts/Alter.ttf', display: 'swap', variable: "--font-alter" });

export const metadata: Metadata = {
  title: "Saigon247 - Tour Du Lịch Úc Chất Lượng Cao | Giá Tốt Hàng Đầu",
  description: "Saigon247 chuyên cung cấp tour du lịch Úc chất lượng, giá tốt. Khám phá Sydney, Melbourne, đảo san hô & nhiều điểm đến hấp dẫn khác.",
  keywords: [
    "tour Úc", "du lịch Úc", "Saigon247", "tour Úc giá rẻ", "tour Sydney", "tour Melbourne", 
    "tour Australia", "du lịch nước ngoài", "tour Úc cao cấp"
  ],
  authors: [{ name: "Saigon247", url: "https://saigon247.com.au" }],
  creator: "Saigon247",
  publisher: "Saigon247",
  metadataBase: new URL("https://saigon247.com.au"),
  openGraph: {
    title: "Saigon247 - Tour Du Lịch Úc Chất Lượng Cao | Giá Tốt Hàng Đầu",
    description: "Khám phá nước Úc cùng Saigon247 với các tour hấp dẫn, dịch vụ tận tâm và giá ưu đãi nhất.",
    url: "https://saigon247.com.au",
    siteName: "Saigon247",
    locale: "vi_VN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Saigon247 - Tour Du Lịch Úc Chất Lượng Cao | Giá Tốt Hàng Đầu",
    description: "Tour Úc trọn gói cùng Saigon247 - Khám phá những hành trình không thể bỏ lỡ.",
  },
  alternates: {
    canonical: "https://saigon247.com.au"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body
        className={`${baiJamjuree.variable} ${alter.variable} antialiased`}
      >
         <NProgressProvider />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
