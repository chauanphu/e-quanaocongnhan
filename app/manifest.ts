import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: "CTY TNHH May Đồng phục Trần Gia Phát",
    name: "Đồng phục Trần Gia Phát",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "images/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
