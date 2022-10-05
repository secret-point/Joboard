// Mock navigate and useParams when needed
// const navigate = jest.fn();
// const useParams = jest.fn();
const useLocation = jest.fn();

module.exports = {
  ...jest.requireActual("react-router-dom"),
  // useNavigate: () => navigate,
  // useParams,
  useLocation,
};
