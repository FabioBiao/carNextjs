import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import DashboardLayout from "../../components/dashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateModelModal from "../../components/modal/createModel";
import { Brand, Model } from "../../lib/models/Car";

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
    console.log('selectedBrand changed');
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
