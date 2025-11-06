interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({ message, onRetry, className = "" }: ErrorMessageProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="max-w-md w-full bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          {/* آیکون خطا */}
          <div className="mb-4 relative">
            <div className="absolute inset-0 bg-red-100 rounded-full opacity-75 animate-ping" />
            <div className="relative bg-red-100 rounded-full p-4">
              <svg
                className="h-12 w-12 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* عنوان */}
          <h3 className="text-xl font-bold text-red-800 mb-2">اوه! مشکلی پیش آمده</h3>

          {/* پیام خطا */}
          <p className="text-sm text-red-700 mb-6 leading-relaxed">{message}</p>

          {/* دکمه تلاش مجدد */}
          {onRetry && (
            <button
              onClick={onRetry}
              className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                تلاش مجدد
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
