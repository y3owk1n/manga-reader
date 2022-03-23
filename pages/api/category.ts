// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CategoryData } from "@/types/dmzj.interface";
import { CategorySwrRes } from "@/types/swrResponse.interface";
import { fetchDmzjGetJSON } from "@/utils/apiHelper";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CategorySwrRes>
) => {
  if (req.method !== "GET") {
    return res.status(405).json({
      code: 405,
      data: [],
      message: "Not Allowed",
    });
  }

  try {
    const categoryUrl = `https://v3api.dmzj.com/classify/filter.json`;

    const categoryData: CategoryData[] = await fetchDmzjGetJSON(categoryUrl);

    res.status(200).json({
      code: 200,
      data: categoryData,
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
