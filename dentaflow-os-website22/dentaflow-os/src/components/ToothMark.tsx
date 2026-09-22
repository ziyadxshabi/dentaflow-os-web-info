/** DentaFlow mark: a minimal line-art tooth with a gentle inner curve.
 *  Reads as tooth + smile + flow line. Stroke follows currentColor. */
export function ToothMark({
  className = '',
  strokeWidth = 1.6,
}: {
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M16 5.2 C12.4 5.2 11 3.2 8.2 3.6 C4.8 4.1 3.6 8 4.6 11.6 C5.5 14.9 7 16.8 7.5 20.8 C8 24.8 9 28.4 11.2 28.4 C13.6 28.4 12.6 22.8 16 22.8 C19.4 22.8 18.4 28.4 20.8 28.4 C23 28.4 24 24.8 24.5 20.8 C25 16.8 26.5 14.9 27.4 11.6 C28.4 8 27.2 4.1 23.8 3.6 C21 3.2 19.6 5.2 16 5.2 Z" />
      <path d="M8.5 12.5 C10.5 14.5 13 15.2 16 15.2 C19 15.2 21.5 14.5 23.5 12.5" />
    </svg>
  )
}
