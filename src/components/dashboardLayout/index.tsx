import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* md:relative md:h-screen fixed  mt-12 */}
        <div className="bg-gray-800 shadow-xl h-16 bottom-0 contentArea z-10 w-full md:w-48">
          {/* md:mt-12 md:fixed*/}
          <div className=" md:w-48  md:left-0 md:top-0 content-center md:content-start text-left justify-between">
            <ul className="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
              <li className="mr-3 flex-1">
                <Link href="/dashboard/brand">
                  <a
                    href="#"
                    className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
                  >
                    <i className="fas fa-tasks pr-0 md:pr-3"></i>
                    <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                      Brand
                    </span>
                  </a>
                </Link>
              </li>
              <li className="mr-3 flex-1">
                <Link href="/dashboard/models">
                  <a
                    href="#"
                    className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500"
                  >
                    <i className="fa fa-envelope pr-0 md:pr-3"></i>
                    <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                      Models
                    </span>
                  </a>
                </Link>
              </li>
              <li className="mr-3 flex-1">
                <Link href="/dashboard/cars">
                  <a
                    href="#"
                    className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-blue-600"
                  >
                    <i className="fas fa-chart-area pr-0 md:pr-3 text-blue-600"></i>
                    <span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                      Cars
                    </span>
                  </a>
                </Link>
              </li>
              <li className="mr-3 flex-1">
                <a
                  href="#"
                  className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500"
                >
                  <i className="fa fa-wallet pr-0 md:pr-3"></i>
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                    testes
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
          {children}
        </div>
      </div>
    </>
  );
}