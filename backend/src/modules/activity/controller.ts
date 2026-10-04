import { asyncHandler, sendList } from '../../lib/http';
import * as service from './service';

export const list = asyncHandler(async (req, res) => {
  const { items, meta } = await service.listActivity(req.query as Record<string, unknown>);
  sendList(res, items, meta);
});