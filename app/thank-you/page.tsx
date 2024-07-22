import Link from "next/link";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-500 px-4 py-8 text-center">
          <svg
            className="w-24 h-24 text-white mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-4xl font-bold text-white mt-4">Cảm ơn bạn!</h1>
          <p className="text-white text-xl mt-2">
            Đơn hàng của bạn đã được xác nhận
          </p>
        </div>

        <div className="px-4 py-6 sm:px-8 sm:py-10 text-center">
          <p className="text-gray-700 text-lg">
            Chúng tôi đã nhận được đơn hàng của bạn và đang xử lý. Bạn sẽ nhận
            được email xác nhận trong thời gian sớm nhất.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-block bg-green-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-600 transition duration-300"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
