import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import DashboardLayout from "../../components/dashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateModelModal from "../../components/modal/createModel";
import { Brand, Model } from "../../lib/models/types";

export default function Models() {
  const router = useRouter();
  const [brands, setBrands] = useState<[Brand]>(null);
  const [models, setModels] = useState<[Model]>(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [createModelModal, setAddModelModal] = useState(false);

  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/auth/login");
    },
  });

  useEffect(() => {
    axios
      .get("/api/dashboard/brand")
      .then(function (res) {
        console.log(res["data"]["response"]);
        console.log("debug brands");
        const response = res["data"]["response"];
        setBrands(res["data"]["response"]);
        console.log("brands");
        console.log(brands);
        setSelectedBrand(response[0]);
        console.log("selectedBrand");
        console.log(selectedBrand);
        console.log(brands && brands.length > 0);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  }, []);

  useEffect(() => {
    console.log("selectedBrand changed");
    console.log(selectedBrand);
    getModelsOfBrand();
  }, [selectedBrand]);

  function getModelsOfBrand() {
    if (selectedBrand != null) {
      console.log(selectedBrand);

      axios
        .get("/api/dashboard/model?brand=" + selectedBrand.id)
        .then(function (res) {
          console.log(res["data"]["response"]);
          console.log("debug brands");
          setModels(res["data"]["response"]);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
        });
    }
  }

  console.log(data);
  console.log(status);

  // toggle modal add Brand
  function toggleAddModelModal() {
    setAddModelModal(!createModelModal);
  }

  function brandChange(e) {
    console.log(e);
    setSelectedBrand(JSON.parse(e));
    console.log("changed selectedBrand");
    console.log(selectedBrand);
  }

  function toggleDeleteModelModal(model) {
    // if (brand) {
    //   setSelectedBrand(brand);
    // } else {
    //   setSelectedBrand(null);
    // }
    // setDeleteBrandModal(!deleteBrandModal);
    // console.log("deleteBrandModal");
    // console.log(deleteBrandModal);
  }
  function editModel(model) {
    console.log("edit model");
    console.log(model);
  }

  if (status === "loading") {
    return "Loading or not authenticated...";
  }
  return (
    <DashboardLayout>
      <label>Choose a Brand:</label>
      {brands
        ? brands && (
            <select
              name="brands"
              id="brands"
              onChange={(e) => brandChange(e.target.value)}
            >
              {brands.map((brand, index) => {
                return (
                  <option key={index} value={JSON.stringify(brand)}>
                    {brand.name}
                  </option>
                );
              })}
            </select>
          )
        : "Please crete a Brand before creating a model"}

      {selectedBrand && (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded max-w-xs mx-auto"
            onClick={toggleAddModelModal}
          >
            Create a new model
          </button>
        </div>
      )}

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
                    <th className="px-6 py-2 text-xs text-gray-500">Options</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {models &&
                    models.map((model) => (
                      <tr className="whitespace-nowrap">
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {model.id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {model.name}
                          </div>
                        </td>
                        <td>
                          <a href="#" onClick={() => editModel(model)}>
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
                            onClick={() => toggleDeleteModelModal(model)}
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
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {createModelModal && (
        <CreateModelModal
          toggleModal={toggleAddModelModal}
          brand={selectedBrand}
        />
      )}
    </DashboardLayout>
  );
}
