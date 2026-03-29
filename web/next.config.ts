import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/theory", destination: "/deep/theory", permanent: true },
      { source: "/theory-math", destination: "/deep/theory/math", permanent: true },
      { source: "/theory-code", destination: "/deep/theory/code", permanent: true },
      { source: "/lab", destination: "/deep/lab", permanent: true },
      {
        source: "/lab/activation-function",
        destination: "/deep/lab/activation-function",
        permanent: true,
      },
      {
        source: "/lab/back-propagation",
        destination: "/deep/lab/back-propagation",
        permanent: true,
      },
      {
        source: "/activation",
        destination: "/deep/lab/activation-function",
        permanent: true,
      },
      {
        source: "/backprop",
        destination: "/deep/lab/back-propagation",
        permanent: true,
      },
      {
        source: "/machine/theory/math",
        destination: "/machine/lab/r-basic",
        permanent: true,
      },
      {
        source: "/machine/theory/program-r",
        destination: "/machine/theory/code",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
