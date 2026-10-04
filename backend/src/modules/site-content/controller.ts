import { asyncHandler, sendData } from '../../lib/http';
import type { ContentKey } from './schema';
import * as service from './service';

export const list = asyncHandler(async (_req, res) => {
  sendData(res, await service.getAllContent());
});

export const getOne = asyncHandler(async (req, res) => {
  sendData(res, await service.getContent(req.params.key as ContentKey));
});

export const update = asyncHandler(async (req, res) => {
  const item = await service.setContent(
    req.params.key as ContentKey,
    req.body.value,
    req.user?.id ?? null
  );
  sendData(res, item);
});

export const club = asyncHandler(async (_req, res) => {
  sendData(res, await service.getClub());
});