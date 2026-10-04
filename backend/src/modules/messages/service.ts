import { prisma } from '../../lib/prisma';
import { AppError } from '../../lib/errors';
import { buildMeta, parsePagination } from '../../lib/pagination';

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  role?: string;
  message: string;
}

export async function createMessage(input: ContactInput) {
  const row = await prisma.contactMessage.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      message: input.message,
    },
  });
  return { id: row.id, status: 'received', createdAt: row.createdAt };
}

export async function listMessages(query: Record<string, unknown>) {
  const { page, limit, skip } = parsePagination(query);
  const where: Record<string, unknown> = {};
  if (typeof query.read === 'boolean') where.read = query.read;
  if (typeof query.q === 'string' && query.q) {
    where.OR = [
      { name: { contains: query.q, mode: 'insensitive' } },
      { email: { contains: query.q, mode: 'insensitive' } },
      { message: { contains: query.q, mode: 'insensitive' } },
    ];
  }
  const [total, rows] = await Promise.all([
    prisma.contactMessage.count({ where }),
    prisma.contactMessage.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: limit }),
  ]);
  return { items: rows, meta: buildMeta(page, limit, total) };
}

export async function setMessageRead(id: number, read: boolean) {
  const existing = await prisma.contactMessage.findUnique({ where: { id } });
  if (!existing) throw AppError.notFound('Message not found');
  return prisma.contactMessage.update({ where: { id }, data: { read } });
}

export async function removeMessage(id: number) {
  const existing = await prisma.contactMessage.findUnique({ where: { id } });
  if (!existing) throw AppError.notFound('Message not found');
  await prisma.contactMessage.delete({ where: { id } });
  return { deleted: true };
}