import { asyncHandler, sendData } from '../../lib/http';
import * as service from './service';

export const home = asyncHandler(async (_req, res) => {
  sendData(res, await service.getHome());
});

export const getLayout = asyncHandler(async (_req, res) => {
  sendData(res, await service.getLayout());
});

export const replaceLayout = asyncHandler(async (req, res) => {
  const layout = await service.replaceLayout(req.body.sections, req.user?.id ?? null);
  sendData(res, layout);
});