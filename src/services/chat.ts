import { isMockMode, simulateDelay, apiClient } from './client';
import type { ChatMessage, FAQEntry } from '@/types';
import faqData from './mock-data/faq.json';

const faq = faqData.faq as FAQEntry[];

export async function sendChatMessage(
  message: string,
  conversationHistory: ChatMessage[]
): Promise<{ response: string }> {
  if (isMockMode()) {
    await simulateDelay();
    const reply = generateMockResponse(message, faq);
    return { response: reply };
  }

  const res = await apiClient.post<{ response: string }>('/chat', {
    message,
    history: conversationHistory,
  });
  return res;
}

function generateMockResponse(message: string, faq: FAQEntry[]): string {
  const lower = message.toLowerCase();

  // Simple keyword matching
  for (const entry of faq) {
    const keywords = entry.question.toLowerCase().split(' ');
    if (keywords.some(k => lower.includes(k))) {
      return entry.answer;
    }
  }

  // Default response
  return `I'm here to help with AI Club inquiries! You can ask me about:
- Upcoming hackathons and competitions
- Our achievements and certifications
- Current projects and research
- Club facilities and resources
- How to join or collaborate

What would you like to know?`;
}

export async function getFAQ(): Promise<FAQEntry[]> {
  if (isMockMode()) {
    await simulateDelay();
    return faq;
  }
  const res = await apiClient.get<{ data: FAQEntry[] }>('/chat/faq');
  return res.data;
}