import { asyncHandler, sendData, sendList } from '../../lib/http';
import * as service from './service';

export const submit = asyncHandler(async (req, res) => {
  const result = await service.createMessage(req.body);
  sendData(res, result, 201);
});

export const list = asyncHandler(async (req, res) => {
  const { items, meta } = await service.listMessages(req.query as Record<string, unknown>);
  sendList(res, items, meta);
});

export const markRead = asyncHandler(async (req, res) => {
  const read = req.body.read ?? true;
  sendData(res, await service.setMessageRead(Number(req.params.id), read));
});

export const remove = asyncHandler(async (req, res) => {
  sendData(res, await service.removeMessage(Number(req.params.id)));
});