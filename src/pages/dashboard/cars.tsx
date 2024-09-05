import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import DashboardLayout from "../../components/dashboardLayout";
import { CarModel } from "../../lib/models/types";
import { useState } from "react";
import CreateCarModal from "../../components/modal/createCar";

export default function Cars() {
  const router = useRouter();
  const [createCarModal, setAddCarModal] = useState(false);
  const [cars, setCars] = useState<[CarModel]>(null);

  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/auth/login");
    },
  });
 const test =  useSession();
 console.log(test);
 

  console.log(data);
  console.log(status);

  function toggleCreateModal() {
    setAddCarModal(!createCarModal);
  }

  function editCar(car) {}
  function toggleDeleteCarModal(car) {}

  if (status === "loading") {
    return "Loading or not authenticated...";
  }
  return (
    <DashboardLayout>
      <div className="container max-w-screen-lg mx-auto">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded max-w-xs mx-auto"
          onClick={toggleCreateModal}
        >
          Add new car
        </button>

        <table>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-2 text-xs text-gray-500">ID</th>
              <th className="px-6 py-2 text-xs text-gray-500">Brand</th>
              <th className="px-6 py-2 text-xs text-gray-500">Model</th>
              <th className="px-6 py-2 text-xs text-gray-500">Year</th>
              <th className="px-6 py-2 text-xs text-gray-500">Fuel Type</th>
              <th className="px-6 py-2 text-xs text-gray-500">Options</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {cars &&
              cars.map((car) => (
                <tr className="whitespace-nowrap">
                  <td className="px-6 py-4 text-sm text-gray-500">{car.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{car.brand}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{car.model}</div>
                  </td>{" "}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{car.year}</div>
                  </td>{" "}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{car.fuelType}</div>
                  </td>
                  <td>
                    <a href="#" onClick={() => editCar(car)}>
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

                    <a href="#" onClick={() => toggleDeleteCarModal(car)}>
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

      {createCarModal && <CreateCarModal toggleModal={toggleCreateModal} />}
    </DashboardLayout>
  );
}
