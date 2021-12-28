import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { FiHome, FiMessageSquare, FiFilter } from "react-icons/fi";
import styles from "./header.module.scss";

import { signOut } from "next-auth/react";
import useLoggedUser from "../../utils/loggedUser";

export const routes = [
  {
    href: "/",
    key: "home",
    // icon: <FiHome />,
  },
  {
    href: "/cars",
    key: "cars",
    // icon: <FiFilter />,
  },
  {
    href: "/about",
    key: "about",
    // icon: <FiMessageSquare />,
  },
];

export default function Header() {
  const router = useRouter();
  const { user, setUser } = useLoggedUser();
  const { status, data } = useSession();

  function redirectToLogin() {
    router.push("/auth/login");
  }
  function logoutUser() {
    signOut({ callbackUrl: '/auth/login' });
  }

  return (
    <header className="bg-white px-8 pt-2 shadow-md">
      {/* absolute text-gray-600 body-font  w-full z-10 bg-gray-200*/}
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl">Tailblocks</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {routes.map((route, i) => {
            return (
              <Link key={route.key} href={route.href}>
                <a
                  className={`${
                    router.pathname === route.href ? "underline" : ""
                  } mr-5 hover:text-gray-900`}
                >
                  {route.key}
                </a>
              </Link>
            );
          })}
          {data && (
            <Link href="/dashboard">
              <a
                className={`${
                  router.pathname === "/dashboard" ? "underline" : ""
                } mr-5 hover:text-gray-900`}
              >
                Dashboard
              </a>
            </Link>
          )}
          {/* <a className="mr-5 hover:text-gray-900">First Link</a>
          <a className="mr-5 hover:text-gray-900">Second Link</a>
          <a className="mr-5 hover:text-gray-900">Third Link</a>
          <a className="mr-5 hover:text-gray-900">Fourth Link</a> */}
        </nav>

        {data && (
          <button
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            onClick={logoutUser}
          >
            Logout
          </button>
        )}
        {!data && (
          <button
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            onClick={redirectToLogin}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}

// export function headerLinkTeste(){

//     return(
//         <div></div>
//     );
// }
