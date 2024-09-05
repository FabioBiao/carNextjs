import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Brand, Model } from "../../lib/models/types";
import { fuelType, potency } from "../../lib/utils/constants";

export const doors = [
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
];

export default function CreateCarModal({ toggleModal }) {
  const [brands, setBrands] = useState<[Brand]>(null);
  const [models, setModels] = useState<[Model]>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand>(null);

  useEffect(() => {
    axios
      .get("/api/dashboard/brand")
      .then(function (res) {
        console.log(res);
        const response = res["data"]["response"];
        setBrands(res["data"]["response"]);
        setSelectedBrand(response[0]);
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
        .get("/api/dashboard/model?brand=" + selectedBrand)
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

  function brandChange(e) {
    console.log(e);
    setSelectedBrand(JSON.parse(e));
    console.log("changed selectedBrand");
    console.log(selectedBrand);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function saveCar(data) {
    console.log("Save Car function");
    console.log(data);
    axios
      .post("/api/dashboard/car", data, {withCredentials: true})
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
  console.log(errors); // errors of form

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
          <span className="font-bold block text-2xl mb-3">Create Car</span>

          <form className="w-full " onSubmit={handleSubmit(saveCar)}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Brand:
                </label>
                <select
                  name="brands"
                  id="brands"
                  {...register("brand", { required: true })}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={(e) => brandChange(e.target.value)}
                >
                  {brands ? (
                    brands &&
                    brands.map((brand, index) => {
                      return (
                        <option key={index} value={brand.id}>
                          {brand.name}
                        </option>
                      );
                    })
                  ) : (
                    <option key={1} value={"All"}>
                      No Brands created
                    </option>
                  )}
                </select>
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Models:
                </label>
                <select
                  name="models"
                  id="models"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  {...register("model", { required: true })}
                >
                  {models
                    ? models &&
                      models.map((model, index) => {
                        return (
                          <option key={index} value={model.id}>
                            {model.name}
                          </option>
                        );
                      })
                    : models && (
                        <option key={0} value={""}>
                          Pick a Brand
                        </option>
                      )}
                </select>
              </div>

              {/* <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                />
                <p className="text-gray-600 text-xs italic">
                  Make it as long and as crazy as you'd like
                </p>
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              </div> */}
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="inline-flex items-center mt-3">
                  <input
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    {...register("published", {})}
                  />
                  <label
                    className="ml-2 text-gray-700"
                    htmlFor="flexCheckDefault"
                  >
                    Published
                  </label>
                </label>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">year</div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Fuel Type:
                </label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  {...register("fuel", { required: true })}
                >
                  {fuelType &&
                    fuelType.map((fuel, index) => {
                      return (
                        <option key={index} value={fuel.value}>
                          {fuel.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            {/* miles, cilindrada potency */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Miles / kilometers:
                </label>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Cilindrada:
                </label>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Potency:
                </label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  {...register("Fuel Type", { required: true })}
                >
                  {potency &&
                    potency.map((pot, index) => {
                      return (
                        <option key={index} value={pot.value}>
                          {pot.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            {/* color , number of doors, price */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Color
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                    focus:bg-white focus:outline-none"
                  {...register("color", {})}
                ></input>
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Door
                </label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  {...register("doors", { required: true })}
                >
                  {doors &&
                    doors.map((door, index) => {
                      return (
                        <option key={index} value={door.value}>
                          {door.value}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Price
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                    focus:bg-white focus:outline-none"
                  {...register("price", { required: true })}
                ></input>
              </div>
            </div>

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
