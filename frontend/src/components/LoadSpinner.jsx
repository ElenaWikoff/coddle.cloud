import Spinner from "react-bootstrap/Spinner";

const LoadSpinner = ({ loading, message }) => {
   return loading ? (
      <div className="spinner-wrapper">
         <Spinner className="spinner" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
         </Spinner>
         {message && <p className="text-align-center mt-4">{message}</p>}
      </div>
   ) : null;
};

export default LoadSpinner;
