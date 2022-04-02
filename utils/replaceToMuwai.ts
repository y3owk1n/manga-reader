export const replaceToMuwai = (url: string) => {
  const toHttp = url.replace(/^https?:\/\//, "");
  const toMuwai = toHttp.replace("dmzj", "muwai");
  const toWeserv = `//images.weserv.nl?url=${toMuwai}&output=webp`;

  return toWeserv;
};
