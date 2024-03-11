import React from "react";
import Header from "./Header";
import { getRecipeRequests, recipeResponse } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import PopupDialog from "./PopupDialog";

const RecipeRequest = () => {
  const [recReq, setRecReq] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const notify = (message) => toast(message);
  const [isPopupOpen, setPopup] = React.useState(false);
  const [rejectId, setrejectId] = React.useState();

  const getRequests = async () => {
    setLoading(true);
    try {
      const result = await getRecipeRequests();
      // console.log(result);
      setLoading(false);
      setRecReq(result.data.rows);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleRecipeAction = async (isAccept, id, message = "") => {
    try {
      const res = await recipeResponse(isAccept, id, message);
      console.log(res);
      notify(`Recipe ${isAccept ? "Accepted" : "Rejected"}`);
      // console.log(result);
      setrejectId("");
      getRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const closePopup = () => setPopup(false);

  React.useEffect(() => {
    getRequests();
  }, []);

  const RequestCard = ({
    id,
    image,
    culName,
    recipeName,
    cuisine,
    totalTime,
  }) => (
    <div
      className="flex items-center max-w-8/12 bg-white hover:drop-shadow-2xl relative rounded-md text-darkslategray-100"
      key={id}
    >
      <div className="h-40 p-4 rounded-lg overflow-hidden flex flex-col mr-4 rounded-md min-w-48">
        <Link className="no-underline" to={`/user/detail-recipe/${id}`}>
          <img
            src={image}
            className="h-40 w-48 rounded-md hover:bg-gray-200"
            alt="Recipe"
          />
        </Link>
      </div>
      <div className="p-10 text-xl font-semibold text-gray-900">{culName}</div>
      <div className="p-10 max-w-56 min-w-52">
        <div className="p-2 text-xl font-bold text-gray-900">
          Recipe Name: {recipeName}
        </div>
        <div className="p-2 text-base text-gray-700">Cuisine: {cuisine}</div>
        <div className="p-2 text-base text-gray-700">
          Total Time: {totalTime} minutes
        </div>
      </div>
      <div className="ml-auto flex">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-4"
          onClick={() => handleRecipeAction(true, id)}
        >
          Accept
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 mr-8"
          onClick={() => {
            setPopup(true);
            setrejectId(id);
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );

  return (
    <div className="App">
      <Header />
      <div className="items-center justify-center p-16">
        <ToastContainer />
        {isLoading ? (
          <div className="loader-container">
            <div className="loader">
              <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
            </div>
          </div>
        ) : (
          <>
            <PopupDialog
              isOpen={isPopupOpen}
              onClose={closePopup}
              onConfirm={(message) => {
                closePopup();
                handleRecipeAction(false, rejectId, message);
              }}
            />
            {recReq.map((req, index) => (
              <div
                className="py-4 flex items-center justify-center"
                key={index}
              >
                <RequestCard
                  id={req.id}
                  image={req.image}
                  culName={req.first_name}
                  recipeName={req.name}
                  cuisine={req.cuisine}
                  totalTime={req.total_time}
                />
              </div>
            ))}
          </>
        )}
        {/* <RequestCard
          image="https://static.toiimg.com/photo/52467119.cms"
          culName="Kishore"
          recipeName="Noodles"
          cuisine="Chinese"
          totalTime={2}
        /> */}
      </div>
    </div>
  );
};

export default RecipeRequest;
