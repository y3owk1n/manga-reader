// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UpdatedComicSwrRes } from "@/types/swrResponse.interface";
import { fetchDmzjGetText } from "@/utils/apiHelper";
import { decryptBase64V4 } from "@/utils/decoder";
import { lookupTypeUpdatedComicResponse } from "@/utils/decryption";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<UpdatedComicSwrRes>
) => {
  const { page, type } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({
      code: 405,
      data: [],
      message: "Not Allowed",
    });
  }

  if (!page || !type) {
    return res.status(405).json({
      code: 405,
      data: [],
      message: "Page and type are both required",
    });
  }

  try {
    const baseUrl = `https://nnv4api.muwai.com`;
    const comicListUrl = `${baseUrl}/comic/update/list/${type}/${page}`;

    const comicListData = await fetchDmzjGetText(comicListUrl);

    const decryptedComicListData = decryptBase64V4(comicListData);

    const comicListResult = lookupTypeUpdatedComicResponse().decode(
      decryptedComicListData
    );

    res.status(200).json({
      code: 200,
      data: comicListResult.data,
      message: "Ok",
    });
  } catch (error: any) {
    return res.status(500).json({
      code: 500,
      data: [],
      message: error.message,
    });
  }
};

export default handler;
