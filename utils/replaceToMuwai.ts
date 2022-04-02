export const replaceToMuwai = (url: string) => {
  const toHttps = url.replace(/^http?:\/\//, "https://");
  const toMuwai = toHttps.replace("dmzj", "muwai");
  const toWeserv = `https://images.weserv.nl?url=${toMuwai}&output=webp`;

  return toWeserv;
};
