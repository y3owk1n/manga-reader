export const replaceToMuwai = (url: string) => {
  const toHttp = url.replace(/^https?:\/\//, "http://");
  const toMuwai = toHttp.replace("dmzj", "muwai");
  const toWeserv = `https://images.weserv.nl?url=${toMuwai}&output=webp`;

  const imageKitEndPoint = `https://ik.imagekit.io/kyle`;

  const toImageKit = encodeURI(`${imageKitEndPoint}/${toMuwai}`);

  return toImageKit;
};
