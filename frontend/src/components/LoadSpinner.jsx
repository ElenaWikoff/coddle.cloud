import Spinner from "react-bootstrap/Spinner";

const LoadSpinner = ({ loading }) => {
   return loading ? (
      <div className="spinner-wrapper">
         <Spinner className="spinner" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
         </Spinner>
      </div>
   ) : null;
};

export default LoadSpinner;
