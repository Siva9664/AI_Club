/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request } from 'express';
import { asyncHandler, sendData, sendList } from '../http';
import type { ResourceService } from './service';
import type { ActorContext } from './types';

const actorFrom = (req: Request): ActorContext => ({ userId: req.user?.id ?? null });

/** Builds the set of Express handlers shared by every managed resource. */
export function createResourceController(service: ResourceService) {
  return {
    /* --------------------------- public --------------------------- */
    publicList: asyncHandler(async (req, res) => {
      const { items, meta } = await service.publicList(req.query as any);
      sendList(res, items, meta);
    }),

    publicGet: asyncHandler(async (req, res) => {
      const key = String(req.params.key ?? req.params.slug ?? req.params.id);
      const item = await service.publicGet(key);
      sendData(res, item);
    }),

    /* ---------------------------- admin --------------------------- */
    adminList: asyncHandler(async (req, res) => {
      const { items, meta } = await service.adminList(req.query as any);
      sendList(res, items, meta);
    }),

    adminGet: asyncHandler(async (req, res) => {
      const item = await service.adminGetById(Number(req.params.id));
      sendData(res, item);
    }),

    create: asyncHandler(async (req, res) => {
      const item = await service.create(req.body, actorFrom(req));
      sendData(res, item, 201);
    }),

    update: asyncHandler(async (req, res) => {
      const item = await service.update(Number(req.params.id), req.body, actorFrom(req));
      sendData(res, item);
    }),

    remove: asyncHandler(async (req, res) => {
      const item = await service.softDelete(Number(req.params.id), actorFrom(req));
      sendData(res, item);
    }),

    restore: asyncHandler(async (req, res) => {
      const item = await service.restore(Number(req.params.id), actorFrom(req));
      sendData(res, item);
    }),

    setStatus: asyncHandler(async (req, res) => {
      const { status, reason } = req.body;
      const item = await service.setStatus(Number(req.params.id), status, reason, actorFrom(req));
      sendData(res, item);
    }),

    setFeatured: asyncHandler(async (req, res) => {
      const { featured } = req.body;
      const item = await service.setFeatured(Number(req.params.id), featured, actorFrom(req));
      sendData(res, item);
    }),

    reorder: asyncHandler(async (req, res) => {
      const result = await service.reorder(req.body.orderedIds, actorFrom(req));
      sendData(res, result);
    }),

    bulk: asyncHandler(async (req, res) => {
      const { ids, action, reason } = req.body;
      const result = await service.bulk(ids, action, reason, actorFrom(req));
      sendData(res, result);
    }),
  };
}

export type ResourceController = ReturnType<typeof createResourceController>;
