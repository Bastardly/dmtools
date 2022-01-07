export function useClassName(...args: (string | boolean | undefined)[]) {
  const filteredArgs = args?.filter(Boolean);
  if (!filteredArgs?.length) {
    return;
  }

  return args.filter(Boolean).join(" ");
}
