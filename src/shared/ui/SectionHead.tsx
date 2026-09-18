/** Заголовок секции и необязательный подзаголовок под ним. */
export const SectionHead = ({ title, text }: { title: string; text?: string }) => (
  <div className="mb-8 max-w-2xl sm:mb-12">
    <h2 className="text-3xl sm:text-4xl">{title}</h2>
    {text && <p className="mt-3 max-w-[38ch] text-ink-soft">{text}</p>}
  </div>
);
