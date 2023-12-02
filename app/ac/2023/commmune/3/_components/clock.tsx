"use client";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import satori from "satori";
import { createIntlSegmenterPolyfill } from "intl-segmenter-polyfill";

export const Clock = () => {
  const fontDataRef = useRef<ArrayBuffer | null>(null);
  const [svg, setSVG] = useState<string | null>(null);

  const init = async () => {
    const [font, Segmenter] = await Promise.all([
      fetch("/Roboto-Regular.ttf").then((res) => res.arrayBuffer()),
      !globalThis.Intl || !globalThis.Intl.Segmenter
        ? createIntlSegmenterPolyfill(fetch("/break_iterator.wasm"))
        : null,
    ]);
    if (Segmenter) {
      globalThis.Intl = globalThis.Intl || {};
      (globalThis.Intl as any).Segmenter = Segmenter;
    }

    fontDataRef.current = font;
  };
  const renderSatori = async (data: ArrayBuffer) => {
    const svg = await satori(
      <div
        style={{
          color: "black",
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "2px",
            width: "100%",

            display: "flex",
          }}
        >
          <div
            style={{
              height: "2px",
              width: `${dayjs().millisecond() / 10}%`,
              backgroundColor: "black",

              display: "flex",
            }}
          ></div>
        </div>
        <div
          style={{
            fontSize: "36px",
            display: "flex",
          }}
        >
          {dayjs().format("ss")}
        </div>
        <div style={{ fontSize: "26px", display: "flex" }}>
          {dayjs().format("HH:mm")}
        </div>
      </div>,
      {
        width: 64,
        height: 64,
        fonts: [
          {
            name: "Roboto",
            data: data,
            weight: 400,
            style: "normal",
          },
        ],
      }
    );
    setSVG(svg);
    const meta: HTMLLinkElement | null = document.querySelector("[rel=icon]");
    if (meta) {
      meta.href = `data:image/svg+xml;charset=utf8,${encodeURIComponent(svg)}`;
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      if (!fontDataRef.current) return;
      renderSatori(fontDataRef.current);
    }, 34);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    init();
  }, []);

  if (!svg) {
    return <>loading...</>;
  }

  return (
    <div
      className="border"
      dangerouslySetInnerHTML={{
        __html: svg,
      }}
    />
  );
};
