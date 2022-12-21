export const replaceToMuwai = (url: string) => {
  const toHttp = url.replace(/^https?:\/\//, "http://");
  const toMuwai = toHttp.replace("dmzj", "muwai");
  const toWeserv = `https://images.weserv.nl?url=${toMuwai}&output=webp`;

  const imageKitEndPoint = `https://ik.imagekit.io/kyle`;

  //https://ik.imagekit.io/demo/tr:h-300,w-400,f-jpg,pr-true/medium_cafe_B1iTdD0C.jpg
  const toImageKit = encodeURI(`${imageKitEndPoint}/${toMuwai}?tr=pr-true`);

  return toImageKit;
};
