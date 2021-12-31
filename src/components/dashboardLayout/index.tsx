import Link from "next/link";
import { useRouter } from "next/router";

export const routes = [
  {
    href: "/dashboard/brand",
    key: "Brand",
    // icon: <FiHome />,
  },
  {
    href: "/dashboard/models",
    key: "models",
    // icon: <FiFilter />,
  },
  {
    href: "/dashboard/cars",
    key: "Cars",
    // icon: <FiMessageSquare />,
  },
  {
    href: "/dashboard/test",
    key: "test",
    // icon: <FiMessageSquare />,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* md:relative md:h-screen fixed  mt-12 */}
        <div className="bg-gray-800 shadow-xl h-16 bottom-0 contentArea z-10 w-full md:w-48">
          {/* md:mt-12 md:fixed*/}
          <div className=" md:w-48  md:left-0 md:top-0 content-center md:content-start text-left justify-between">
            <ul className="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
              <li className="mr-3 flex-1">
                {routes.map((route, i) => {
                  return (
                    <Link key={route.key} href={route.href}>
                      <a
                        className={`${
                          router.pathname === route.href
                            ? "border-blue-600"
                            : ""
                        } block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500`}
                      >
                        {route.key}
                      </a>
                    </Link>
                  );
                })}
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
