export function KeyboardHint() {
  return (
    <div className="fixed bottom-6 right-8 z-20 hidden items-center gap-2 text-bone/30 lg:flex">
      <Key>↑</Key>
      <Key>↓</Key>
      <span className="text-[0.65rem] uppercase tracking-[0.2em]">navigate</span>
      <span className="mx-1 h-3 w-px bg-bone/15" />
      <Key>K</Key>
      <span className="text-[0.65rem] uppercase tracking-[0.2em]">contact</span>
    </div>
  );
}

function Key({ children }: { children: string }) {
  return (
    <kbd className="grid h-5 min-w-[1.25rem] place-items-center rounded border border-bone/15 px-1 font-sans text-[0.65rem] text-bone/50">
      {children}
    </kbd>
  );
}
