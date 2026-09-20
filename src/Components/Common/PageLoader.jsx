export default function PageLoader() {
  return (
    <div
      className="flex min-h-[50vh] w-full items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="loader" aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
