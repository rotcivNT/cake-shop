export const CartItemLoading = () => (
  <div>
    <div className="flex mt-5 animate-pulse">
      <div className="flex-1 flex items-center gap-5">
        <div className="size-[160px] bg-gray-200"></div>
        <div className="flex flex-col gap-5 flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
      <div className="flex-1 flex-col gap-3 sm:gap-0 sm:flex-row flex justify-center sm:justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-24"></div>
        <div className="flex items-center gap-2">
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
    <hr className="mt-5" />
  </div>
);
