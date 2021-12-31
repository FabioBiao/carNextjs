import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboardLayout";
import axios from "axios";
import { useForm } from "react-hook-form";
import { getBrands } from "../../lib/controllers/brandController";
import CreateBrandModal from "../../components/modal/createBrand";
import DeleteBrandModal from "../../components/modal/deleteBrand";
import { Brand } from "../../lib/models/Car";

export default function BrandComp() {
  const [brands, setBrands] = useState<[Brand]>(null);

  const router = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/auth/login");
    },
  });
  const [createBrandModal, setAddBrandModal] = useState(false);
  const [deleteBrandModal, setDeleteBrandModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand>(null);

  // toggle modal add Brand
  function toggleAddBrandModal() {
    setAddBrandModal(!createBrandModal);
  }

  function editBrand(brand) {
    console.log("edit brand");
    console.log(brand);
  }

  function toggleDeleteBrandModal(brand?) {
    if (brand) {
      setSelectedBrand(brand);
    } else {
      setSelectedBrand(null);
    }
    setDeleteBrandModal(!deleteBrandModal);
    console.log("deleteBrandModal");
    console.log(deleteBrandModal);
  }

  console.log(data);
  console.log(status);
  console.log(brands);

  useEffect(() => {
    axios
      .get("/api/dashboard/brand")
      .then(function (res) {
        console.log(res["data"]["response"]);
        console.log("debug brands");
        setBrands(res["data"]["response"]);
        console.log(brands && brands.length > 0);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  }, []);

  console.log("brands");
  console.log(brands);

  if (status === "loading") {
    return "Loading or not authenticated...";
  }
  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded max-w-xs mx-auto"
          onClick={toggleAddBrandModal}
        >
          Create a new Brand
        </button>
        <div className="container flex justify-center mx-auto">
          <div className="flex flex-col">
            <div className="w-full">
              <div className="border-b border-gray-200 shadow">
                <table>
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-2 text-xs text-gray-500">ID</th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Model Name
                      </th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Options
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {brands &&
                      brands.map((brand) => (
                        <tr className="whitespace-nowrap">
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {brand.id}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {brand.name}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              <a
                                href="#"
                                onClick={() => editBrand(brand["id"])}
                              >
                                <svg
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </a>

                              <a
                                href="#"
                                onClick={() => toggleDeleteBrandModal(brand)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {createBrandModal && (
        <CreateBrandModal toggleModal={toggleAddBrandModal} />
      )}
      {deleteBrandModal && (
        <DeleteBrandModal
          toggleModal={toggleDeleteBrandModal}
          brand={selectedBrand}
        />
      )}
    </DashboardLayout>
  );
}
