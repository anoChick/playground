"use client";

import {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useIntersectionObserver } from "../_hooks/useIntersectionObserver";

const maxXCount = 8;
const maxYCount = 5;
const blockWidth = 42;
const blockHeight = 12;
const blockMargin = 8;

type HitBoxPosition = "top" | "bottom" | "left" | "right";
const HitBoxPositions = ["top", "bottom", "left", "right"] as const;
type BallHitboxProps = {
  position: HitBoxPosition;
  hitboxRef: MutableRefObject<HTMLDivElement | null>;
  fieldElemRef: MutableRefObject<HTMLDivElement | null>;
  onHit: (position: HitBoxPosition) => void;
};

const BallHitbox = ({
  position,
  fieldElemRef,
  hitboxRef,
  onHit,
}: BallHitboxProps) => {
  const entry = useIntersectionObserver(hitboxRef, {
    root: fieldElemRef.current,
    threshold: 0,
  });

  useEffect(() => {
    if (!entry?.isIntersecting) {
      onHit(position);
    }
  }, [entry, onHit, position]);
  return (
    <div
      ref={hitboxRef}
      className={`hitbox h-4 w-4 absolute ${
        position === "top"
          ? "-top-4 left-0"
          : position === "bottom"
          ? "-bottom-4 left-0"
          : position === "left"
          ? "top-0 -left-4"
          : position === "right"
          ? "top-0 -right-4"
          : ""
      }`}
    />
  );
};

type BallProps = {
  fieldElemRef: RefObject<HTMLDivElement>;
  hitboxRefsRef: {
    [key in HitBoxPosition]: RefObject<HTMLDivElement>;
  };
};
// eslint-disable-next-line react/display-name
const Ball = ({ hitboxRefsRef, fieldElemRef }: BallProps) => {
  const ballElemRef = useRef<HTMLDivElement | null>(null);

  const tick = () => {
    const ballElem = ballElemRef.current;
    if (!ballElem) return;

    const vY = Number(ballElem.dataset.vy ?? 0);
    const vX = Number(ballElem.dataset.vx ?? 0);
    const top = Number(ballElem.style.top?.replace("px", "") ?? 0);
    const left = Number(ballElem.style.left?.replace("px", "") ?? 0);
    ballElem.style.top = `${top + vY * 2}px`;
    ballElem.style.left = `${left + vX * 2}px`;
  };

  useEffect(() => {
    const id = setInterval(tick, 16);
    return () => clearInterval(id);
  }, []);

  const handleHit = (position: HitBoxPosition) => {
    const ballElem = ballElemRef.current;

    if (!ballElem) return;
    if (position === "top" || position === "bottom") {
      ballElem.dataset.vy = (Number(ballElem.dataset.vy) * -1).toString();
    } else if (position === "left" || position === "right") {
      ballElem.dataset.vx = (Number(ballElem.dataset.vx) * -1).toString();
    }
  };

  return (
    <div
      className="ball bg-white h-4 w-4 absolute"
      style={{
        top: `${(blockHeight + blockMargin) * maxYCount}px`,
        left: `-${(blockWidth + blockMargin) * maxXCount}px`,
      }}
      data-vx={1}
      data-vy={1}
      ref={ballElemRef}
    >
      {HitBoxPositions.map((position) => {
        return (
          <BallHitbox
            hitboxRef={hitboxRefsRef[position]}
            key={position}
            position={position}
            fieldElemRef={fieldElemRef}
            onHit={handleHit}
          />
        );
      })}
    </div>
  );
};

export const Breakout = () => {
  const fieldElemRef = useRef<HTMLDivElement | null>(null);
  const hitboxRefsRef = useRef<{
    [key in HitBoxPosition]: RefObject<HTMLInputElement>;
  }>({
    top: useRef<HTMLInputElement>(null),
    bottom: useRef<HTMLInputElement>(null),
    left: useRef<HTMLInputElement>(null),
    right: useRef<HTMLInputElement>(null),
  });

  return (
    <div className="__block absolute top-0 left-0 w-full h-full pt-12 pointer-events-none">
      <div
        className="w-full h-full bg-black relative overflow-hidden"
        ref={fieldElemRef}
      >
        {/* block area */}
        <div className="w-full relative">
          <BlockRecursive
            x={0}
            y={0}
            hitboxRefsRef={hitboxRefsRef.current}
            fieldElemRef={fieldElemRef}
          />
        </div>
      </div>
    </div>
  );
};
type BlockRecursiveProps = {
  x: number;
  y: number;
  hitboxRefsRef: {
    [key in HitBoxPosition]: RefObject<HTMLDivElement>;
  };
  fieldElemRef: RefObject<HTMLDivElement>;
};

const BlockRecursive = ({
  x,
  y,
  hitboxRefsRef,
  fieldElemRef,
}: BlockRecursiveProps) => {
  const nextX = x === maxXCount ? 0 : x + 1;
  const nextY = nextX === 0 ? y + 1 : y;
  const blockElemRef = useRef<HTMLDivElement | null>(null);

  const [broken, setBroken] = useState(false);
  const [init, setInit] = useState(false);

  const hitboxRefs = hitboxRefsRef;

  const entryTop = useIntersectionObserver(hitboxRefs?.top, {
    threshold: 0,
    root: blockElemRef.current,
  });
  const entryBottom = useIntersectionObserver(hitboxRefs?.bottom, {
    threshold: 0,
    root: blockElemRef.current,
  });
  const entryLeft = useIntersectionObserver(hitboxRefs?.left, {
    threshold: 0,
    root: blockElemRef.current,
  });
  const entryRight = useIntersectionObserver(hitboxRefs?.right, {
    threshold: 0,
    root: blockElemRef.current,
  });
  const entries = [entryTop, entryBottom, entryLeft, entryRight];

  useEffect(() => {
    const hitCount = entries.filter((entry) => entry?.isIntersecting).length;
    if (hitCount >= 2) {
      if (!init) {
        setInit(true);
        return;
      }
      setBroken(true);
    }
  }, entries);
  useEffect(() => {
    if (!broken) return;
    const ballElem = entryTop?.target.parentElement as HTMLDivElement;

    ballElem.dataset.vy = entryTop?.isIntersecting ? "1" : "-1";
    ballElem.dataset.vx = entryLeft?.isIntersecting ? "1" : "-1";
  }, [broken]);

  if (nextY === maxYCount && x === 0)
    return (
      <>
        <Ball hitboxRefsRef={hitboxRefsRef} fieldElemRef={fieldElemRef} />
      </>
    );

  return (
    <div
      ref={blockElemRef}
      className={`absolute ${broken ? "bg-black" : "bg-white"}`}
      style={{
        width: `${blockWidth}px`,
        height: `${blockHeight}px`,
        left:
          x === 0 && y !== 0
            ? `-${(blockWidth + blockMargin) * maxXCount}px`
            : `${blockWidth + blockMargin}px`,
        top: x === 0 ? `${blockHeight + blockMargin}px` : "0px",
      }}
    >
      <BlockRecursive
        x={nextX}
        y={nextY}
        hitboxRefsRef={hitboxRefsRef}
        fieldElemRef={fieldElemRef}
      />
    </div>
  );
};
