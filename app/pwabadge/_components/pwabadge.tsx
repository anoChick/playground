"use client";

export const PWABadge = () => {
  const handleClickSetBadge = async () => {
    if (navigator.setAppBadge) {
      await navigator.setAppBadge(42);
    }
  };

  const handleClickClearBadge = async () => {
    if (navigator.clearAppBadge) {
      await navigator.clearAppBadge();
    }
  };
  return (
    <div className="">
      <h1>PWA Badge</h1>
      <button
        className={`p-2 m-2  text-white rounded bg-blue-400`}
        onClick={handleClickSetBadge}
      >
        Set Badge
      </button>
      <button
        className={`p-2 m-2  text-white rounded bg-blue-400`}
        onClick={handleClickClearBadge}
      >
        ClearBadge
      </button>
    </div>
  );
};
