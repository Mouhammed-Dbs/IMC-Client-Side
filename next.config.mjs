/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_API_URL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5000"
        : "https://39e9-5-0-227-210.ngrok-free.app",
  },
  async headers() {
    return [
      {
        source:
          process.env.NODE_ENV === "development"
            ? "//localhost:5000(.)"
            : "//39e9-5-0-227-210.ngrok-free.app(.)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NODE_ENV === "development"
                ? "http://localhost:3000"
                : "http://39e9-5-0-227-210.ngrok-free.app",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
