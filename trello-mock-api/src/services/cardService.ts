// カード登録
export async function create(title: string, listId: string) {
  const result = await cardRepository.create(title, listId);
  return result;
}