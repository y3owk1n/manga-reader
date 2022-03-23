export const replaceToMuwai = (url: string) => {
  const toHttp = url.replace(/^https?:\/\//, "http://");
  const toMuwai = toHttp.replace("dmzj", "muwai");
  return toMuwai;
};
