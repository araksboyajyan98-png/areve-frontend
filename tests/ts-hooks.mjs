/*
 * Resolve-хук для тестов.
 *
 * Исходники фронтенда импортируют соседние модули без расширения
 * («./defineSection»): так их разрешает Vite. Node этого не умеет — для него
 * относительный путь обязан быть полным. Хук дописывает «.ts», когда обычное
 * разрешение не сработало.
 *
 * Нужен только тестам. Ни сборка, ни сервер его не используют.
 */
export async function resolve(specifier, context, next) {
  try {
    return await next(specifier, context);
  } catch (error) {
    const looksRelative = specifier.startsWith("./") || specifier.startsWith("../");
    const hasExtension = /\.[a-zA-Z0-9]+$/.test(specifier);

    if (looksRelative && !hasExtension) {
      return next(`${specifier}.ts`, context);
    }
    throw error;
  }
}
