export const replaceToMuwai = (url: string) => {
  const toHttp = url.replace(/^https?:\/\//, "http://");
  const toMuwai = toHttp.replace("dmzj", "muwai");
  // const domain = toMuwai.split("/")[2];
  // const pictureUrl = toMuwai.replace("http://images.muwai.com/", "");
  // const finalImage = `https://cdn.statically.io/img/${domain}/f=webp,q=20/${pictureUrl}`;
  return toMuwai;
};
