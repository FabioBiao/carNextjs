import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateModelModal({ toggleModal, brand }) {
  const [pickedBrand] = useState(brand);
  console.log(brand);
  console.log(pickedBrand);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function saveModel(data) {
    console.log("Save model function");
    console.log(data);
    axios
      .post("/api/dashboard/model", data)
      .then(function (response) {
        console.log(response["data"]);
        // this.brands = response["data"].response;
        toggleModal();
      })
      .catch((err) => {
        console.log(err.response);
        toggleModal();
      });
  }
  console.log(errors);

  return (
    <div className="m-10">
      <div
        x-show="showModal"
        className="fixed text-gray-500 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0"
      >
        <div
          x-show="showModal"
          className="bg-white rounded-xl shadow-2xl p-6 sm:w-10/12 mx-10"
        >
          <span className="font-bold block text-2xl mb-3">Create a Model</span>
          <form onSubmit={handleSubmit(saveModel)}>
            <p className="mb-5 w-3/6">
              <span>Brand id:</span>
              <input
                readOnly
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                    focus:bg-white focus:outline-none"
                {...register("brandId", {
                  required: "Please insert Brand Name",
                  min: 0,
                  value: pickedBrand.id,
                })}
              />
            </p>
            <p className="mb-5 w-3/6">
              <span>Brand name:</span>
              <input
                value={pickedBrand.name}
                readOnly
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                    focus:bg-white focus:outline-none"
              />
            </p>
            <p className="mb-5">
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                    focus:bg-white focus:outline-none"
                {...register("modelName", {
                  required: "Please insert Model Name",
                })}
              />
            </p>
            {errors.brandName && errors.brandName.type === "required" && (
              <p className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                Brand Name is required
              </p>
            )}

            <div className="text-right space-x-5 mt-5">
              <button
                onClick={toggleModal}
                className="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
