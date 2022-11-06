import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const AZURE_STORAGE_URL = "https://playoutstorage.blob.core.windows.net";
const api = axios.create({
  baseURL: AZURE_STORAGE_URL,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username, uuid } = req.query as Record<string, string>;
    const request = await api.get(`/assets/${username}/${uuid}`, {
      method: "GET",
      responseType: "stream",
    });
    const contentType = (request.headers as any).getContentType();
    const contentLength = (request.headers as any).getContentLength();
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Length", contentLength);
    res.setHeader("Cache-Control", "public, max-age=604800");
    res.status(request.status);
    res.send(request.data);
  } catch (err) {
    res.status(404);
    res.end();
  }
}
