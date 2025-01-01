// export const popupCenter = (url: string, title: string) => {
//   const dualScreenLeft = window.screenLeft ?? window.screenX;
//   const dualScreenTop = window.screenTop ?? window.screenY;

//   const width =
//     window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

//   const height =
//     window.innerHeight ??
//     document.documentElement.clientHeight ??
//     screen.height;

//   const systemZoom = width / window.screen.availWidth;

//   const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
//   const top = (height - 550) / 2 / systemZoom + dualScreenTop;

//   const newWindow = window.open(
//     url,
//     title,
//     `width=${500 / systemZoom},height=${
//       550 / systemZoom
//     },top=${top},left=${left}`
//   );

//   newWindow?.focus();
// };

export const popupCenter = (url: string, title: string) => {
  const dualScreenLeft = window.screenLeft ?? window.screenX;
  const dualScreenTop = window.screenTop ?? window.screenY;

  const width =
    window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

  const height =
    window.innerHeight ??
    document.documentElement.clientHeight ??
    screen.height;

  const popupWidth = 500; // Set your desired popup width
  const popupHeight = 550; // Set your desired popup height

  const left = dualScreenLeft + (width - popupWidth) / 2;
  const top = dualScreenTop + (height - popupHeight) / 2;

  const newWindow = window.open(
    url,
    title,
    `width=${popupWidth},height=${popupHeight},top=${top},left=${left},scrollbars=yes,resizable=yes`
  );

  if (newWindow) {
    newWindow.focus();
  } else {
    console.error("Failed to open popup window.");
  }
};
