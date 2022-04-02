export const replaceToMuwai = (url: string) => {
  const toHttp = url.replace(/^https?:\/\//, "");
  const toMuwai = url.replace("dmzj", "muwai");
  const toWeserv = `https://images.weserv.nl?url=${toMuwai}&output=webp`;

  return toWeserv;
};
